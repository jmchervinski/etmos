/**
 * Implementação do Actor de Etmos (não-oficial).
 * Regras conforme SRD ETMOS 1.1:
 * - Testes: 2d6 + bônus; sucesso se >= Dificuldade (base 6).
 * - Teste de Conjuração: 2d6 + Alma.
 * - Estresse por Complexidade: Trivial 0, Regular 1, Difícil 2, Complexa 4, Milagre 7.
 * - Exausto: ao conjurar não-trivial, rola 2d6; se > Corpo+4, a magia falha (Estresse acumula).
 * - Esgotado: ao conjurar não-trivial, rola 2d6; se > Corpo+3, morre após a conjuração (efeito acontece).
 */

import { ETMOS } from "../config.mjs";

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

  /**
   * Abre o diálogo de configuração do teste (bônus situacional, Dificuldade e
   * Dados de Empenho) e rola. Regra do SRD para Empenho: cada Dado gasto
   * re-rola um d6 do teste já realizado, mantendo o melhor resultado.
   */
  async rollTestDialog(label, bonus = 0) {
    const empenhoDisponivel = this.system.empenho?.dados ?? 0;
    const campoEmpenho = empenhoDisponivel > 0
      ? `<div class="form-group">
           <label>Dados de Empenho (disponíveis: ${empenhoDisponivel})</label>
           <input type="number" name="empenho" value="0" min="0" max="${empenhoDisponivel}" step="1" />
         </div>`
      : "";
    const data = await foundry.applications.api.DialogV2.prompt({
      window: { title: `${label} — ${this.name}` },
      content: `
        <div class="form-group">
          <label>Bônus situacional</label>
          <input type="number" name="situacional" value="0" step="1" autofocus />
        </div>
        ${campoEmpenho}
        <div class="form-group">
          <label>Dificuldade</label>
          <input type="number" name="dificuldade" value="6" step="1" />
        </div>
        <p class="hint">Cada Dado de Empenho re-rola um d6 do teste, mantendo o melhor resultado (SRD).</p>`,
      rejectClose: false,
      ok: {
        label: "Rolar",
        icon: "fa-solid fa-dice",
        callback: (event, button) => ({
          situacional: Number(button.form.elements.situacional?.value ?? 0) || 0,
          empenho: Number(button.form.elements.empenho?.value ?? 0) || 0,
          dificuldade: Number(button.form.elements.dificuldade?.value ?? 6) || 6
        })
      }
    });
    if (!data) return null;
    return this.executarTeste({
      label,
      bonus,
      situacional: data.situacional,
      dificuldade: data.dificuldade,
      empenho: data.empenho
    });
  }

  /**
   * Executa um teste 2d6 + bônus contra a Dificuldade, com suporte a Dados
   * de Empenho (cada um re-rola o menor d6, mantendo o melhor — SRD) e a
   * linhas extras na carta do chat (usado pelo Teste de Proeza).
   */
  async executarTeste({ label, bonus = 0, situacional = 0, dificuldade = 6, empenho = 0, linhasExtras = [] } = {}) {
    const empenhoDisponivel = this.system.empenho?.dados ?? 0;
    const bonusTotal = bonus + situacional;
    const gastar = Math.min(Math.max(0, Math.floor(empenho)), empenhoDisponivel);
    const rotuloBonus = situacional
      ? ` (bônus ${bonus >= 0 ? "+" : ""}${bonus}, situacional ${situacional >= 0 ? "+" : ""}${situacional})`
      : "";
    const extras = linhasExtras.length ? `${linhasExtras.join("<br>")}<br>` : "";

    const base = new Roll("2d6 + @bonus", { bonus: bonusTotal });
    await base.evaluate();

    // Sem Empenho: carta de rolagem padrão.
    if (!gastar) {
      const sucesso = base.total >= dificuldade;
      await base.toMessage({
        speaker: ChatMessage.getSpeaker({ actor: this }),
        flavor: `<b>${label}</b>${rotuloBonus} — Dificuldade ${dificuldade}: ${sucesso ? "✅ Sucesso" : "❌ Falha"}${extras ? `<br>${linhasExtras.join("<br>")}` : ""}`
      });
      return { total: base.total, sucesso };
    }

    // Com Empenho: cada dado gasto re-rola o menor d6 atual, mantendo o melhor.
    const dados = base.dice[0].results.map(r => r.result);
    const originais = [...dados];
    const rerolls = [];
    const linhas = [];
    for (let i = 0; i < gastar; i++) {
      const rr = new Roll("1d6");
      await rr.evaluate();
      rerolls.push(rr);
      const menor = Math.min(...dados);
      const idx = dados.indexOf(menor);
      const manteve = Math.max(menor, rr.total);
      linhas.push(`<b>Empenho ${i + 1}:</b> re-rolou o ${menor} → tirou ${rr.total} (mantém ${manteve})`);
      dados[idx] = manteve;
    }
    const total = dados[0] + dados[1] + bonusTotal;
    const sucesso = total >= dificuldade;

    await this.update({ "system.empenho.dados": empenhoDisponivel - gastar });
    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: this }),
      rolls: [base, ...rerolls],
      sound: CONFIG.sounds?.dice,
      flavor: `<b>${label}</b>${rotuloBonus} — Dificuldade ${dificuldade}: ${sucesso ? "✅ Sucesso" : "❌ Falha"}`,
      content:
        `<div class="dice-roll"><div class="dice-result">` +
        `<div class="dice-formula">2d6 [${originais.join(", ")}] + ${bonusTotal}</div>` +
        extras +
        `<div>${linhas.join("<br>")}</div>` +
        `<div class="dice-formula">Dados finais: [${dados.join(", ")}] — Dados de Empenho restantes: ${empenhoDisponivel - gastar}</div>` +
        `<h4 class="dice-total">${total}</h4>` +
        `</div></div>`
    });
    return { total, sucesso };
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
  async conjurarMagia({ complexidade = "Regular", fraseMagica = "", rankTotem = 0, dificuldade = 6, estresseExtra = 0, atravesDe = "" } = {}) {
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
    //    Conjurar através do Familiar acumula +1 (estresseExtra, módulo).
    const estresseGanho = dados.estresse + (naoTrivial ? Number(rankTotem || 0) : 0) + Number(estresseExtra || 0);
    const novoEstresse = sys.resources.estresse.value + estresseGanho;
    await this.update({ "system.resources.estresse.value": novoEstresse });

    const excesso = novoEstresse - sys.resources.estresse.max;
    mensagens.push(
      `<b>Estresse:</b> +${estresseGanho} → ${novoEstresse}/${sys.resources.estresse.max}` +
      (excesso > 0 ? ` (${excesso} acima do Limite — estado: <b>${this.system.fadiga}</b>)` : "")
    );

    // 5. Carta no chat
    const via = atravesDe ? ` através de <b>${atravesDe}</b>` : "";
    const titulo = fraseMagica
      ? `🗣️ <b>${this.name}</b> conjura <i>${fraseMagica}</i> (${complexidade})${via}`
      : `🗣️ <b>${this.name}</b> conjura uma magia ${complexidade}${via}`;
    await conjuracao.toMessage({
      speaker: ChatMessage.getSpeaker({ actor: this }),
      flavor: `${titulo}<br>${mensagens.join("<br>")}`
    });

    if (morte) {
      ui.notifications.warn(`${this.name} morreu por Esgotamento após conjurar a magia.`);
    }
    return conjuracao;
  }

  /**
   * Módulo de Proezas: abre o diálogo do Teste de Proeza.
   * Rola 2d6 + Atributo do tipo (Física=Corpo, Mental=Mente, Mágica=Alma)
   * + bônus, com Dados de Empenho, e acumula Estresse pela Complexidade
   * (Trivial 0 / Regular 1 / Difícil 2 / Complexa 4 / Milagre 7; Composta +1).
   * Rudimentos treinados são a justificativa da Proeza e vão para a carta.
   */
  async rollProezaDialog() {
    const sys = this.system;
    const empenhoDisponivel = sys.empenho?.dados ?? 0;

    const treinados = ETMOS.rudimentos.filter(r => sys.rudimentos?.[r.id]);
    const rudimentosHtml = treinados.length
      ? treinados.map(r =>
          `<label class="checkbox"><input type="checkbox" name="rud-${r.id}" /> ${r.nome}</label>`
        ).join(" ")
      : `<p class="hint">Nenhum Rudimento treinado (marque-os na ficha).</p>`;
    const tiposHtml = ETMOS.tiposProeza.map(t =>
      `<option value="${t.id}">${t.nome} (${t.atributo.charAt(0).toUpperCase() + t.atributo.slice(1)})</option>`
    ).join("");
    const complexHtml = Object.keys(COMPLEXIDADES).map(c =>
      `<option value="${c}" ${c === "Regular" ? "selected" : ""}>${c} (${COMPLEXIDADES[c].estresse} Estresse)</option>`
    ).join("");
    const campoEmpenho = empenhoDisponivel > 0
      ? `<div class="form-group"><label>Dados de Empenho (disponíveis: ${empenhoDisponivel})</label>
         <input type="number" name="empenho" value="0" min="0" max="${empenhoDisponivel}" step="1" /></div>`
      : "";

    const data = await foundry.applications.api.DialogV2.prompt({
      window: { title: `Teste de Proeza — ${this.name}` },
      content: `
        <div class="form-group"><label>Tipo de Proeza</label><select name="tipo">${tiposHtml}</select></div>
        <div class="form-group"><label>Rudimentos usados</label><div class="etmos-rudimentos-dialogo">${rudimentosHtml}</div></div>
        <div class="form-group"><label>Complexidade</label><select name="complexidade">${complexHtml}</select></div>
        <div class="form-group"><label class="checkbox"><input type="checkbox" name="composta" /> Proeza Composta (+1 Estresse)</label></div>
        <div class="form-group"><label>Bônus situacional</label><input type="number" name="situacional" value="0" step="1" /></div>
        ${campoEmpenho}
        <div class="form-group"><label>Dificuldade</label><input type="number" name="dificuldade" value="9" step="1" /></div>
        <p class="hint">Dificuldades: Simples &lt;6 · Fácil 6–8 · Mediano 9–11 · Árduo 12–16 · Difícil 16+</p>`,
      rejectClose: false,
      ok: {
        label: "Rolar Proeza",
        icon: "fa-solid fa-dice",
        callback: (event, button) => {
          const f = button.form.elements;
          return {
            tipo: f.tipo?.value ?? "fisica",
            complexidade: f.complexidade?.value ?? "Regular",
            composta: f.composta?.checked ?? false,
            situacional: Number(f.situacional?.value ?? 0) || 0,
            empenho: Number(f.empenho?.value ?? 0) || 0,
            dificuldade: Number(f.dificuldade?.value ?? 9) || 9,
            rudimentos: treinados.filter(r => f[`rud-${r.id}`]?.checked).map(r => r.nome)
          };
        }
      }
    });
    if (!data) return null;

    // Complexidade Máxima (Mente) vale para Proezas como para magias.
    const dadosComplex = COMPLEXIDADES[data.complexidade] ?? COMPLEXIDADES.Regular;
    const maxima = COMPLEXIDADES[sys.complexidadeMaxima] ?? COMPLEXIDADES.Regular;
    if (dadosComplex.ordem > maxima.ordem) {
      return ui.notifications.warn(
        `${this.name} não pode realizar Proezas de Complexidade ${data.complexidade} ` +
        `(máxima: ${sys.complexidadeMaxima}, definida por Mente ${sys.attributes.mente.value}).`
      );
    }

    const tipo = ETMOS.tiposProeza.find(t => t.id === data.tipo) ?? ETMOS.tiposProeza[0];
    const bonus = sys.attributes[tipo.atributo]?.value ?? 0;

    // Estresse da Proeza (Composta: +1)
    const estresseGanho = dadosComplex.estresse + (data.composta ? 1 : 0);
    const novoEstresse = sys.resources.estresse.value + estresseGanho;
    if (estresseGanho > 0) await this.update({ "system.resources.estresse.value": novoEstresse });

    const linhasExtras = [
      `<b>Proeza ${tipo.nome}</b> (${data.complexidade}${data.composta ? ", Composta" : ""})` +
      (data.rudimentos.length ? ` — Rudimentos: ${data.rudimentos.join(", ")}` : ""),
      `<b>Estresse:</b> +${estresseGanho} → ${novoEstresse}/${sys.resources.estresse.max}` +
      (this.system.fadiga !== "Normal" ? ` (estado: <b>${this.system.fadiga}</b>)` : "")
    ];

    return this.executarTeste({
      label: `Teste de Proeza (2d6 + ${tipo.atributo.charAt(0).toUpperCase() + tipo.atributo.slice(1)})`,
      bonus,
      situacional: data.situacional,
      dificuldade: data.dificuldade,
      empenho: data.empenho,
      linhasExtras
    });
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
