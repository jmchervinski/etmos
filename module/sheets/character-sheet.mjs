import { EtmosBaseActorSheet } from "./base-actor-sheet.mjs";
import { COMPLEXIDADES } from "../documents/actor.mjs";
import { ETMOS } from "../config.mjs";

export class EtmosCharacterSheet extends EtmosBaseActorSheet {
  static DEFAULT_OPTIONS = {
    classes: ["etmos-sheet", "etmos-ficha-oficial"],
    actions: {
      pipClick: EtmosCharacterSheet.onPipClick,
      rollConjuracao: EtmosCharacterSheet.onRollConjuracao,
      conjurar: EtmosCharacterSheet.onConjurar,
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
    conjuracao: { template: "systems/etmos/templates/actors/parts/character-conjuracao.html", scrollable: [""] },
    footer: { template: "systems/etmos/templates/actors/parts/actor-footer.html" }
  };

  static TABS = {
    primary: {
      tabs: [
        { id: "ficha", label: "ETMOS.TabFicha" },
        { id: "conceito", label: "ETMOS.TabConceito" },
        { id: "grimorio", label: "ETMOS.TabGrimorio" },
        { id: "conjuracao", label: "ETMOS.TabConjuracao" }
      ],
      initial: "ficha"
    }
  };

  /** @override */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    const sys = this.actor.system;

    context.tabs = this._prepareTabs("primary");
    context.complexidades = Object.keys(COMPLEXIDADES);

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

  static async onRollConjuracao() {
    await this.actor.rollConjuracaoSimples();
  }

  static async onConjurar(event, target) {
    const box = target.closest(".conjuracao-box");
    const complexidade = box.querySelector("[name=complexidade]")?.value ?? "Regular";
    const fraseMagica = box.querySelector("[name=fraseMagica]")?.value ?? "";
    const rankTotem = Number(box.querySelector("[name=rankTotem]")?.value ?? 0);
    await this.actor.conjurarMagia({ complexidade, fraseMagica, rankTotem });
  }

  static async onDescansoParcial() {
    await this.actor.descansar({ completo: false });
  }

  static async onDescansoCompleto() {
    await this.actor.descansar({ completo: true });
  }
}
