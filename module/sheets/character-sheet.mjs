import { EtmosBaseActorSheet } from "./base-actor-sheet.mjs";
import { COMPLEXIDADES } from "../documents/actor.mjs";
import { ETMOS } from "../config.mjs";

export class EtmosCharacterSheet extends EtmosBaseActorSheet {
  static DEFAULT_OPTIONS = {
    classes: ["etmos-sheet", "etmos-ficha-oficial"],
    actions: {
      pipClick: EtmosCharacterSheet.onPipClick,
      descansoParcial: EtmosCharacterSheet.onDescansoParcial,
      descansoCompleto: EtmosCharacterSheet.onDescansoCompleto
    }
  };

  static PARTS = {
    header: { template: "systems/etmos/templates/actors/parts/character-header.html" },
    tabs: { template: "templates/generic/tab-navigation.hbs", classes: ["sheet-tabs"] },
    ficha: { template: "systems/etmos/templates/actors/parts/character-ficha.html", scrollable: [""] },
    conceito: { template: "systems/etmos/templates/actors/parts/character-conceito.html", scrollable: [""] },
    grimorio: { template: "systems/etmos/templates/actors/parts/character-grimorio.html", scrollable: [""] },
    configuracoes: { template: "systems/etmos/templates/actors/parts/character-configuracoes.html", scrollable: [""] },
    footer: { template: "systems/etmos/templates/actors/parts/actor-footer.html" }
  };

  static TABS = {
    primary: {
      tabs: [
        { id: "ficha", label: "ETMOS.TabFicha" },
        { id: "conceito", label: "ETMOS.TabConceito" },
        { id: "grimorio", label: "ETMOS.TabGrimorio" },
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
}
