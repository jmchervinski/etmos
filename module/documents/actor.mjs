/**
 * Implementação do Actor de Etmos (não-oficial).
 * Regras conforme SRD ETMOS 1.1:
 * - Testes: 2d6 + bônus; sucesso se >= Dificuldade (base 6).
 * - Teste de Conjuração: 2d6 + Alma.
 * - Estresse por Complexidade: Trivial 0, Regular 1, Difícil 2, Complexa 4, Milagre 7.
 * - Exausto: ao conjurar não-trivial, rola 2d6; se > Corpo+4, a magia falha (Estresse acumula).
 * - Esgotado: ao conjurar não-trivial, rola 2d6; se > Corpo+3, morre após a conjuração (efeito acontece).
 */

export const COMPLEXIDADES = {
  Trivial: { estresse: 0, ordem: 0 },
  Regular: { estresse: 1, ordem: 1 },
  "Difícil": { estresse: 2, ordem: 2 },
  Complexa: { estresse: 4, ordem: 3 },
  Milagre: { estresse: 7, ordem: 4 }
};

export class EtmosActor extends Actor {
  /** Rola 2d6 + bônus contra uma Dificuldade (base 6 no SRD). */
  async rollTest(label, bonus = 0, dificuldade = 6) {
    const roll = new Roll("2d6 + @bonus", { bonus });
    await roll.evaluate();
    const sucesso = roll.total >= dificuldade;
    await roll.toMessage({
      speaker: ChatMessage.getSpeaker({ actor: this }),
      flavor: `<b>${label}</b> — Dificuldade ${dificuldade}: ${sucesso ? "✅ Sucesso" : "❌ Falha"}`
    });
    return roll;
  }

  /** Teste de Conjuração: 2d6 + Alma (SRD). */
  async rollConjuracaoSimples(dificuldade = 6) {
    const alma = this.system.attributes.alma.value;
    return this.rollTest("Teste de Conjuração (2d6 + Alma)", alma, dificuldade);
  }

  /** Iniciativa é um Teste de Corpo (SRD). */
  getInitiativeRoll() {
    return new Roll("2d6 + @attributes.corpo.value", this.getRollData());
  }

  /**
   * Conjura uma magia com uma dada Complexidade, aplicando toda a cadeia do SRD:
   * verificação de Complexidade Máxima, teste de Fadiga (Exausto/Esgotado),
   * Teste de Conjuração e acúmulo de Estresse (+ Rank de Totem/Santuário, se houver).
   */
  async conjurarMagia({ complexidade = "Regular", fraseMagica = "", rankTotem = 0, dificuldade = 6 } = {}) {
    const dados = COMPLEXIDADES[complexidade];
    if (!dados) return ui.notifications.error(`Complexidade inválida: ${complexidade}`);

    const sys = this.system;
    const maxima = COMPLEXIDADES[sys.complexidadeMaxima] ?? COMPLEXIDADES.Regular;
    const mensagens = [];
    const naoTrivial = dados.ordem > 0;

    // 1. Complexidade Máxima (definida por Mente)
    if (dados.ordem > maxima.ordem) {
      return ui.notifications.warn(
        `${this.name} não pode conjurar magias de Complexidade ${complexidade} ` +
        `(máxima: ${sys.complexidadeMaxima}, definida por Mente ${sys.attributes.mente.value}).`
      );
    }

    // 2. Estados de Fadiga (apenas para magias NÃO triviais)
    let magiaFalhou = false;
    let morte = false;
    if (naoTrivial && sys.fadiga === "Exausto") {
      const teste = new Roll("2d6");
      await teste.evaluate();
      const alvo = sys.attributes.corpo.value + 4;
      if (teste.total > alvo) {
        magiaFalhou = true;
        mensagens.push(`⚠️ <b>Exausto:</b> rolou ${teste.total} > Corpo+4 (${alvo}). A magia FALHA (Estresse acumula mesmo assim).`);
      } else {
        mensagens.push(`<b>Exausto:</b> rolou ${teste.total} ≤ Corpo+4 (${alvo}). A magia acontece.`);
      }
    } else if (naoTrivial && sys.fadiga === "Esgotado") {
      const teste = new Roll("2d6");
      await teste.evaluate();
      const alvo = sys.attributes.corpo.value + 3;
      if (teste.total > alvo) {
        morte = true;
        mensagens.push(`💀 <b>Esgotado:</b> rolou ${teste.total} > Corpo+3 (${alvo}). A personagem MORRE após a conjuração (o efeito ainda acontece).`);
      } else {
        mensagens.push(`<b>Esgotado:</b> rolou ${teste.total} ≤ Corpo+3 (${alvo}). A personagem sobrevive.`);
      }
    }

    // 3. Teste de Conjuração (2d6 + Alma)
    const conjuracao = new Roll("2d6 + @alma", { alma: sys.attributes.alma.value });
    await conjuracao.evaluate();
    if (!magiaFalhou) {
      mensagens.push(`<b>Teste de Conjuração:</b> ${conjuracao.total} (2d6 + Alma ${sys.attributes.alma.value})`);
    }

    // 4. Estresse acumulado APÓS a conjuração (SRD), mesmo se a magia falhar.
    //    Totens/Santuários somam seu Rank em magias não-triviais.
    const estresseGanho = dados.estresse + (naoTrivial ? Number(rankTotem || 0) : 0);
    const novoEstresse = sys.resources.estresse.value + estresseGanho;
    await this.update({ "system.resources.estresse.value": novoEstresse });

    const excesso = novoEstresse - sys.resources.estresse.max;
    mensagens.push(
      `<b>Estresse:</b> +${estresseGanho} → ${novoEstresse}/${sys.resources.estresse.max}` +
      (excesso > 0 ? ` (${excesso} acima do Limite — estado: <b>${this.system.fadiga}</b>)` : "")
    );

    // 5. Carta no chat
    const titulo = fraseMagica
      ? `🗣️ <b>${this.name}</b> conjura <i>${fraseMagica}</i> (${complexidade})`
      : `🗣️ <b>${this.name}</b> conjura uma magia ${complexidade}`;
    await conjuracao.toMessage({
      speaker: ChatMessage.getSpeaker({ actor: this }),
      flavor: `${titulo}<br>${mensagens.join("<br>")}`
    });

    if (morte) {
      ui.notifications.warn(`${this.name} morreu por Esgotamento após conjurar a magia.`);
    }
    return conjuracao;
  }

  /** Aplica Ferimentos acumulativos, com +1 se em qualquer Estado de Fadiga (SRD). */
  async aplicarFerimentos(quantidade) {
    const sys = this.system;
    const extra = sys.fadiga !== "Normal" ? 1 : 0;
    const total = Math.max(0, Number(quantidade) + extra);
    const novo = sys.resources.ferimentos.value + total;
    await this.update({ "system.resources.ferimentos.value": novo });
    const estado = this.system.consciencia;
    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: this }),
      content:
        `<b>${this.name}</b> sofre ${total} Ferimento(s)` +
        (extra ? ` (inclui +1 por Fadiga: ${sys.fadiga})` : "") +
        ` → ${novo}/${sys.resources.ferimentos.max}.` +
        (estado !== "Consciente" ? ` <b>Estado: ${estado}!</b>` : "")
    });
  }

  /**
   * Descanso conforme SRD:
   * - Parcial: -1 Ferimento, -3 Estresse. Completo: -2 Ferimentos, todo o Estresse.
   * - Tratamento Médico: -2 Ferimentos adicionais.
   * - Sem tratamento e no Limite (ou acima): Completo vira Parcial; Parcial não surte efeito.
   * - Fora do mundo de origem: Completo vira Parcial; Parcial não surte efeito.
   */
  async descansar({ completo = false, tratamentoMedico = false, foraDoMundoDeOrigem = false } = {}) {
    const sys = this.system;
    const noLimite = sys.resources.ferimentos.value >= sys.resources.ferimentos.max;

    let efetivoCompleto = completo;
    let semEfeito = false;
    if (foraDoMundoDeOrigem || (!tratamentoMedico && noLimite)) {
      if (efetivoCompleto) efetivoCompleto = false;
      else semEfeito = true;
    }

    if (semEfeito) {
      return ChatMessage.create({
        speaker: ChatMessage.getSpeaker({ actor: this }),
        content: `<b>${this.name}</b> descansa, mas o descanso não surte efeito (condições desfavoráveis).`
      });
    }

    const curaFerimentos = (efetivoCompleto ? 2 : 1) + (tratamentoMedico ? 2 : 0);
    const novoFer = Math.max(0, sys.resources.ferimentos.value - curaFerimentos);
    const novoEst = efetivoCompleto ? 0 : Math.max(0, sys.resources.estresse.value - 3);

    await this.update({
      "system.resources.ferimentos.value": novoFer,
      "system.resources.estresse.value": novoEst
    });
    return ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: this }),
      content:
        `<b>${this.name}</b> realiza um Descanso ${efetivoCompleto ? "Completo" : "Parcial"}` +
        `${tratamentoMedico ? " com Tratamento Médico" : ""}: ` +
        `Ferimentos ${novoFer}/${sys.resources.ferimentos.max}, Estresse ${novoEst}/${sys.resources.estresse.max}.`
    });
  }
}
