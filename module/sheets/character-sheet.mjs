import { EtmosBaseActorSheet } from "./base-actor-sheet.mjs";
import { COMPLEXIDADES } from "../documents/actor.mjs";
import { ETMOS, moduloAtivo } from "../config.mjs";

export class EtmosCharacterSheet extends EtmosBaseActorSheet {
  static DEFAULT_OPTIONS = {
    classes: ["etmos-sheet", "etmos-ficha-oficial"],
    actions: {
      descansoParcial: EtmosCharacterSheet.onDescansoParcial,
      descansoCompleto: EtmosCharacterSheet.onDescansoCompleto,
      rollProeza: EtmosCharacterSheet.onRollProeza,
      conjurarViaFamiliar: EtmosCharacterSheet.onConjurarViaFamiliar,
      editarLimites: EtmosCharacterSheet.onEditarLimites,
      criarItemEncantado: EtmosCharacterSheet.onCriarItemEncantado
    }
  };

  static PARTS = {
    header: { template: "systems/etmos/templates/actors/parts/character-header.html" },
    tabs: { template: "templates/generic/tab-navigation.hbs", classes: ["sheet-tabs"] },
    ficha: { template: "systems/etmos/templates/actors/parts/character-ficha.html", scrollable: [""] },
    conceito: { template: "systems/etmos/templates/actors/parts/character-conceito.html", scrollable: [""] },
    grimorio: { template: "systems/etmos/templates/actors/parts/character-grimorio.html", scrollable: [""] },
    progressao: { template: "systems/etmos/templates/actors/parts/character-progressao.html", scrollable: [""] },
    encantamento: { template: "systems/etmos/templates/actors/parts/character-encantamento.html", scrollable: [""] },
    configuracoes: { template: "systems/etmos/templates/actors/parts/character-configuracoes.html", scrollable: [""] },
    footer: { template: "systems/etmos/templates/actors/parts/actor-footer.html" }
  };

  static TABS = {
    primary: {
      tabs: [
        { id: "ficha", label: "ETMOS.TabFicha" },
        { id: "conceito", label: "ETMOS.TabConceito" },
        { id: "grimorio", label: "ETMOS.TabGrimorio" },
        { id: "progressao", label: "ETMOS.TabProgressao" },
        { id: "encantamento", label: "ETMOS.TabEncantamento" },
        { id: "configuracoes", label: "ETMOS.TabConfiguracoes" }
      ],
      initial: "ficha"
    }
  };

  /** @override */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    const sys = this.actor.system;

    context.tabs = this._prepareTabs("primary");

    // Atributos (ordem oficial: Corpo, Alma, Mente), 6 quadrados cada
    context.atributosView = ["corpo", "alma", "mente"].map(key => ({
      key,
      label: key.charAt(0).toUpperCase() + key.slice(1),
      value: sys.attributes[key].value,
      pips: Array.fromRange(6).map(i => ({ value: i + 1, filled: sys.attributes[key].value >= i + 1 }))
    }));

    // Estados de Fadiga: excesso de Estresse (1-5 Cansado, 6-8 Exausto, 9+ Esgotado)
    const excesso = Math.max(0, sys.resources.estresse.value - sys.resources.estresse.max);
    context.fadigaView = Array.fromRange(9).map(i => {
      const n = i + 1;
      return {
        n,
        filled: excesso >= n,
        zona: n <= 5 ? "cansado" : n <= 8 ? "exausto" : "esgotado"
      };
    });
    context.fadigaExtra = Math.max(0, excesso - 9);

    // Complexidade Máxima de Magia (Trivial → Milagre)
    const ordemAtual = COMPLEXIDADES[sys.complexidadeMaxima]?.ordem ?? 1;
    context.complexView = Object.entries(COMPLEXIDADES).map(([nome, d]) => ({
      nome,
      atingida: d.ordem <= ordemAtual,
      atual: nome === sys.complexidadeMaxima
    }));

    // Marcos de Crescimento (ordem oficial: Físicos, Emocionais, Mentais), 5 cada
    context.marcosView = [
      { key: "fisicos", label: "Físicos" },
      { key: "emocionais", label: "Emocionais" },
      { key: "mentais", label: "Mentais" }
    ].map(m => ({
      ...m,
      pips: Array.fromRange(5).map(i => ({ value: i + 1, filled: sys.marcos[m.key] >= i + 1 }))
    }));

    // Grimório: checklist de Partículas com estado marcado
    const marcar = lista => lista.map(p => ({ ...p, checked: sys.grimorio?.[p.id] === true }));
    context.grimorio = {
      funcoes: marcar(ETMOS.particulas.funcoes),
      objetos: marcar(ETMOS.particulas.objetos),
      caracteristicas: marcar(ETMOS.particulas.caracteristicas),
      complementosPorNivel: [1, 2, 3, 4].map(nivel => ({
        nivel,
        itens: marcar(ETMOS.particulas.complementos.filter(c => c.nivel === nivel))
      }))
    };

    // Aba Progressão: opções de Bônus por transição de nível, com estado
    // marcado e destaque para a transição do nível atual.
    context.progressaoView = ETMOS.progressao.map(t => ({
      ...t,
      atual: sys.details.nivel === t.de,
      opcoes: t.opcoes.map(o => ({
        ...o,
        campo: `${t.id}${o.id}`,
        checked: sys.progressao?.[`${t.id}${o.id}`] === true
      }))
    }));

    // Tabela de Referência de Crescimento (níveis 1-6; 3 Marcos por nível)
    context.referenciaCrescimento = Array.fromRange(6).map(i => ({
      nivel: i + 1,
      marcos: i < 5 ? [1, 2, 3] : []
    }));

    // Aba Encantamento: calcula PP acumulados vs. requeridos (SRD)
    const enc = sys.encantamento ?? {};
    const grauSel = ETMOS.encantamento.graus.find(g => g.id === enc.grau) ?? ETMOS.encantamento.graus[0];
    let ppAcumulado = 0;
    const fatoresView = ETMOS.encantamento.fatores.map(f => {
      const escolhido = enc[f.id] ?? f.padrao;
      const opcoes = f.opcoes.map(o => ({ ...o, selected: o.id === escolhido }));
      const opSel = f.opcoes.find(o => o.id === escolhido) ?? f.opcoes[0];
      ppAcumulado += opSel?.pp ?? 0;
      return { ...f, opcoes, ppAtual: opSel?.pp ?? 0 };
    });
    context.encantamentoView = {
      dados: enc,
      graus: ETMOS.encantamento.graus.map(g => ({ ...g, selected: g.id === grauSel.id })),
      fatores: fatoresView,
      ppRequerido: grauSel.pp,
      ppAcumulado,
      suficiente: ppAcumulado >= grauSel.pp,
      sessoesLabel: (ETMOS.encantamento.fatores.find(f => f.id === "sessoes").opcoes
        .find(o => o.id === (enc.sessoes ?? "s5")) ?? {}).nome ?? ""
    };

    // Módulos e homebrews (aba Configurações; só o GM altera settings de mundo)
    context.isGM = game.user?.isGM ?? false;
    context.modulos = ETMOS.modulos.map(m => ({ ...m, ativo: moduloAtivo(m.id) }));

    // Módulo de Familiares: seleção do Familiar vinculado
    context.moduloFamiliares = moduloAtivo("moduloFamiliares");
    if (context.moduloFamiliares) {
      context.familiares = game.actors
        .filter(a => a.type === "familiar")
        .map(a => ({ id: a.id, name: a.name, selected: a.id === sys.familiar }));
      context.familiarVinculado = sys.familiar
        ? game.actors.get(sys.familiar) ?? null
        : null;
    }

    // Módulo de Proezas: checklist de Rudimentos
    context.moduloProezas = moduloAtivo("moduloProezas");
    if (context.moduloProezas) {
      context.rudimentosView = ETMOS.rudimentos.map(r => ({
        ...r,
        checked: sys.rudimentos?.[r.id] === true
      }));
    }

    return context;
  }

  /** @override */
  async _preparePartContext(partId, context) {
    context = await super._preparePartContext(partId, context);
    if (partId === "conceito") {
      context.enrichedNotes = await foundry.applications.ux.TextEditor.implementation.enrichHTML(
        this.actor.system.notes,
        { secrets: this.document.isOwner, rollData: this.actor.getRollData(), relativeTo: this.actor }
      );
    }
    return context;
  }

  /**
   * Trilhas de quadradinhos clicáveis (atributos e marcos), como na ficha oficial.
   * Clique define o valor; clicar no quadrado já preenchido de maior valor zera até ele - 1.
   */
  static async onPipClick(event, target) {
    const path = target.dataset.path;
    const value = Number(target.dataset.value);
    const atual = foundry.utils.getProperty(this.actor, path);
    const novo = atual === value ? value - 1 : value;
    await this.actor.update({ [path]: novo });
  }

  /**
   * Lê as características do descanso (SRD) marcadas na caixa:
   * Com/Sem Tratamento Médico e descanso fora do mundo de origem.
   * Os checkboxes não têm `name` de propósito, para não entrarem no
   * submit automático do formulário da ficha.
   */
  static #opcoesDescanso(target) {
    const box = target.closest(".descanso-box");
    return {
      tratamentoMedico: box?.querySelector(".descanso-tratamento")?.checked ?? false,
      foraDoMundoDeOrigem: box?.querySelector(".descanso-fora")?.checked ?? false
    };
  }

  static async onDescansoParcial(event, target) {
    await this.actor.descansar({ completo: false, ...EtmosCharacterSheet.#opcoesDescanso(target) });
  }

  static async onDescansoCompleto(event, target) {
    await this.actor.descansar({ completo: true, ...EtmosCharacterSheet.#opcoesDescanso(target) });
  }

  /**
   * Ajuste manual dos Limites de Ferimentos e Estresse (homebrews).
   * O valor é somado à fórmula derivada do SRD junto com os ajustes de itens.
   */
  static async onEditarLimites() {
    const sys = this.actor.system;
    const data = await foundry.applications.api.DialogV2.prompt({
      window: { title: `Ajustar Limites — ${this.actor.name}` },
      content: `
        <div class="form-group">
          <label>Ajuste no Limite de Ferimentos (±)</label>
          <input type="number" name="ajusteFerimentos" value="${sys.resources.ferimentos.ajuste ?? 0}" step="1" autofocus />
        </div>
        <div class="form-group">
          <label>Ajuste no Limite de Estresse (±)</label>
          <input type="number" name="ajusteEstresse" value="${sys.resources.estresse.ajuste ?? 0}" step="1" />
        </div>
        <p class="hint">Somado à fórmula do SRD (Ferimentos: 4 + Corpo/2 · Estresse: 4 + Alma).
        Ajustes vindos de Origens/Habilidades (ex.: Atleta +1) já são aplicados automaticamente
        e não precisam ser repetidos aqui.</p>`,
      rejectClose: false,
      ok: {
        label: "Salvar",
        icon: "fa-solid fa-check",
        callback: (event, button) => ({
          ajusteFerimentos: Number(button.form.elements.ajusteFerimentos?.value ?? 0) || 0,
          ajusteEstresse: Number(button.form.elements.ajusteEstresse?.value ?? 0) || 0
        })
      }
    });
    if (!data) return;
    await this.actor.update({
      "system.resources.ferimentos.ajuste": data.ajusteFerimentos,
      "system.resources.estresse.ajuste": data.ajusteEstresse
    });
  }

  /**
   * Cria o Item Encantado (Equipamento) no inventário a partir do
   * planejamento atual, se os Pontos de Preparo forem suficientes.
   */
  static async onCriarItemEncantado() {
    const sys = this.actor.system;
    const enc = sys.encantamento ?? {};
    const grau = ETMOS.encantamento.graus.find(g => g.id === enc.grau) ?? ETMOS.encantamento.graus[0];
    let pp = 0;
    const linhas = [];
    for (const f of ETMOS.encantamento.fatores) {
      const op = f.opcoes.find(o => o.id === (enc[f.id] ?? f.padrao)) ?? f.opcoes[0];
      pp += op.pp;
      linhas.push(`${f.nome}: ${op.nome} (${op.pp >= 0 ? "+" : ""}${op.pp} PP)`);
    }
    if (pp < grau.pp) {
      return ui.notifications.warn(
        `Pontos de Preparo insuficientes: ${pp}/${grau.pp} PP para um Encantamento ${grau.nome}.`
      );
    }
    const nome = enc.nome?.trim() || "Item Encantado";
    const consumivel = enc.veiculo === "consumivel";
    const descricao =
      `<p><b>Encantamento ${grau.nome}</b> — ${pp}/${grau.pp} PP` +
      (enc.fraseMagica ? ` · Frase: <i>${enc.fraseMagica}</i>` : "") + `</p>` +
      `<ul>${linhas.map(l => `<li>${l}</li>`).join("")}</ul>`;

    await this.actor.createEmbeddedDocuments("Item", [{
      name: nome,
      type: "equipamento",
      system: {
        quantidade: 1,
        ehTotem: false,
        rankTotem: 0,
        consumivel,
        description: descricao
      }
    }]);
    ui.notifications.info(`"${nome}" criado no inventário (${pp}/${grau.pp} PP).`);
  }

  /** Módulo de Proezas: abre o diálogo do Teste de Proeza. */
  static async onRollProeza() {
    await this.actor.rollProezaDialog();
  }

  /**
   * Módulo de Familiares: conjura através do Familiar vinculado, como se o
   * Orador estivesse no lugar dele. Acumula +1 Ponto de Estresse (módulo).
   */
  static async onConjurarViaFamiliar() {
    const familiar = game.actors.get(this.actor.system.familiar);
    if (!familiar) {
      return ui.notifications.warn("Nenhum Familiar vinculado. Selecione um na ficha.");
    }
    const complexHtml = Object.keys(COMPLEXIDADES).map(c =>
      `<option value="${c}" ${c === "Regular" ? "selected" : ""}>${c}</option>`
    ).join("");
    const data = await foundry.applications.api.DialogV2.prompt({
      window: { title: `Conjurar através de ${familiar.name}` },
      content: `
        <div class="form-group"><label>Frase Mágica</label>
          <input type="text" name="fraseMagica" placeholder="Ex: Eveli Quan (Invocar Elemento Água)" autofocus /></div>
        <div class="form-group"><label>Complexidade</label><select name="complexidade">${complexHtml}</select></div>
        <div class="form-group"><label>Rank Totem/Santuário</label>
          <input type="number" name="rankTotem" value="0" min="0" max="5" step="1" /></div>
        <p class="hint">Conjurar através do Familiar acumula +1 Ponto de Estresse (Módulo de Familiares).</p>`,
      rejectClose: false,
      ok: {
        label: "Conjurar",
        icon: "fa-solid fa-hat-wizard",
        callback: (event, button) => ({
          fraseMagica: button.form.elements.fraseMagica?.value ?? "",
          complexidade: button.form.elements.complexidade?.value ?? "Regular",
          rankTotem: Number(button.form.elements.rankTotem?.value ?? 0) || 0
        })
      }
    });
    if (!data) return;
    await this.actor.conjurarMagia({ ...data, estresseExtra: 1, atravesDe: familiar.name });
  }

  /** Liga os toggles de módulo (aba Configurações) aos game settings de mundo. */
  _onRender(context, options) {
    super._onRender?.(context, options);
    if (!game.user?.isGM) return;
    for (const el of this.element.querySelectorAll(".modulo-toggle")) {
      el.addEventListener("change", ev => {
        game.settings.set("etmos", ev.currentTarget.dataset.setting, ev.currentTarget.checked);
      });
    }
  }
}
