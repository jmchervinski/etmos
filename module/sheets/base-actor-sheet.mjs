const { HandlebarsApplicationMixin } = foundry.applications.api;
const { ActorSheetV2 } = foundry.applications.sheets;

/**
 * Base compartilhada pelas fichas de Personagem e NPC (ApplicationV2):
 * ações de item (criar/editar/excluir/enviar ao chat) e o Teste de Atributo
 * (2d6 + bônus), comuns às duas fichas.
 */
export class EtmosBaseActorSheet extends HandlebarsApplicationMixin(ActorSheetV2) {
  static DEFAULT_OPTIONS = {
    classes: ["etmos-sheet"],
    position: { width: 760, height: 860 },
    window: { resizable: true },
    form: { submitOnChange: true },
    actions: {
      editImage: EtmosBaseActorSheet.onEditImage,
      rollAttribute: EtmosBaseActorSheet.onRollAttribute,
      itemEdit: EtmosBaseActorSheet.onItemEdit,
      itemDelete: EtmosBaseActorSheet.onItemDelete,
      itemCreate: EtmosBaseActorSheet.onItemCreate,
      itemChat: EtmosBaseActorSheet.onItemChat
    }
  };

  /** @override */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    const sys = this.actor.system;
    context.actor = this.actor;
    context.system = sys;
    context.editable = this.isEditable;

    context.itemsByType = {};
    for (const item of this.actor.items) {
      (context.itemsByType[item.type] ??= []).push(item);
    }
    const habs = context.itemsByType.habilidade ?? [];
    context.habilidadesPraticas = habs.filter(i => i.system.categoria === "Prática");
    context.habilidadesTeoricas = habs.filter(i => i.system.categoria === "Teórica");

    return context;
  }

  /** @override */
  async _preparePartContext(partId, context) {
    context = await super._preparePartContext(partId, context);
    if (context.tabs?.[partId]) context.tab = context.tabs[partId];
    return context;
  }

  /** Abre o FilePicker para trocar o retrato (padrão data-action="editImage" do dnd5e/core). */
  static async onEditImage(event, target) {
    const attr = target.dataset.edit ?? "img";
    const current = foundry.utils.getProperty(this.document, attr);
    const fp = new foundry.applications.apps.FilePicker.implementation({
      type: "image",
      current,
      callback: path => this.document.update({ [attr]: path })
    });
    return fp.browse();
  }

  static async onRollAttribute(event, target) {
    const key = target.dataset.attribute;
    const label = target.dataset.label ?? key;
    const bonus = this.actor.system.attributes?.[key]?.value ?? 0;
    await this.actor.rollTestDialog(label, bonus);
  }

  static onItemEdit(event, target) {
    const li = target.closest(".item");
    this.actor.items.get(li?.dataset.itemId)?.sheet.render(true);
  }

  static onItemDelete(event, target) {
    const li = target.closest(".item");
    this.actor.items.get(li?.dataset.itemId)?.delete();
  }

  static onItemChat(event, target) {
    const li = target.closest(".item");
    this.actor.items.get(li?.dataset.itemId)?.roll();
  }

  static async onItemCreate(event, target) {
    const type = target.dataset.type;
    const categoria = target.dataset.categoria;
    const data = { name: `Novo(a) ${type}`, type };
    if (categoria) data.system = { categoria };
    await this.actor.createEmbeddedDocuments("Item", [data]);
  }
}
