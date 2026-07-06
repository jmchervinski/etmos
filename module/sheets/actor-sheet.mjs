import { COMPLEXIDADES } from "../documents/actor.mjs";
import { ETMOS } from "../config.mjs";

export class EtmosActorSheet extends ActorSheet {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["etmos", "sheet", "actor"],
      width: 760,
      height: 860,
      tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "ficha" }]
    });
  }

  /** @override */
  get template() {
    return `systems/etmos/templates/actors/${this.actor.type}-sheet.html`;
  }

  /** @override */
  getData() {
    const context = super.getData();
    const sys = this.actor.system;
    context.system = sys;
    context.complexidades = Object.keys(COMPLEXIDADES);

    // Itens agrupados
    context.itemsByType = {};
    for (const item of this.actor.items) {
      (context.itemsByType[item.type] ??= []).push(item);
    }
    const habs = context.itemsByType.habilidade ?? [];
    context.habilidadesPraticas = habs.filter(i => i.system.categoria === "Prática");
    context.habilidadesTeoricas = habs.filter(i => i.system.categoria === "Teórica");

    if (this.actor.type !== "character") return context;

    // --- Trilhas de quadradinhos (visual da ficha oficial) ---

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
  activateListeners(html) {
    super.activateListeners(html);
    if (!this.isEditable) return;

    html.find(".pip-clicavel").click(this._onPipClick.bind(this));
    html.find(".test-atributo").click(this._onRollAttribute.bind(this));
    html.find(".test-conjuracao").click(() => this.actor.rollConjuracaoSimples());
    html.find(".conjurar-magia").click(this._onConjurar.bind(this));
    html.find(".descanso-parcial").click(() => this.actor.descansar({ completo: false }));
    html.find(".descanso-completo").click(() => this.actor.descansar({ completo: true }));
    html.find(".item-edit").click(this._onItemEdit.bind(this));
    html.find(".item-delete").click(this._onItemDelete.bind(this));
    html.find(".item-create").click(this._onItemCreate.bind(this));
    html.find(".item-chat").click(this._onItemChat.bind(this));
  }

  /**
   * Trilhas de quadradinhos clicáveis (atributos e marcos), como na ficha oficial.
   * Clique define o valor; clicar no quadrado já preenchido de maior valor zera até ele - 1.
   */
  async _onPipClick(event) {
    event.preventDefault();
    const el = event.currentTarget;
    const path = el.dataset.path;
    const value = Number(el.dataset.value);
    const atual = foundry.utils.getProperty(this.actor, path);
    const novo = atual === value ? value - 1 : value;
    await this.actor.update({ [path]: novo });
  }

  async _onRollAttribute(event) {
    event.preventDefault();
    const key = event.currentTarget.dataset.attribute;
    const label = event.currentTarget.dataset.label ?? key;
    const bonus = this.actor.system.attributes?.[key]?.value ?? 0;
    await this.actor.rollTest(label, bonus);
  }

  async _onConjurar(event) {
    event.preventDefault();
    const form = event.currentTarget.closest(".conjuracao-box");
    const complexidade = form.querySelector("[name=complexidade]")?.value ?? "Regular";
    const fraseMagica = form.querySelector("[name=fraseMagica]")?.value ?? "";
    const rankTotem = Number(form.querySelector("[name=rankTotem]")?.value ?? 0);
    await this.actor.conjurarMagia({ complexidade, fraseMagica, rankTotem });
  }

  _onItemEdit(event) {
    event.preventDefault();
    const li = event.currentTarget.closest(".item");
    this.actor.items.get(li.dataset.itemId)?.sheet.render(true);
  }

  _onItemDelete(event) {
    event.preventDefault();
    const li = event.currentTarget.closest(".item");
    this.actor.items.get(li.dataset.itemId)?.delete();
  }

  _onItemChat(event) {
    event.preventDefault();
    const li = event.currentTarget.closest(".item");
    this.actor.items.get(li.dataset.itemId)?.roll();
  }

  async _onItemCreate(event) {
    event.preventDefault();
    const type = event.currentTarget.dataset.type;
    const categoria = event.currentTarget.dataset.categoria;
    const data = { name: `Novo(a) ${type}`, type };
    if (categoria) data.system = { categoria };
    await this.actor.createEmbeddedDocuments("Item", [data]);
  }
}
