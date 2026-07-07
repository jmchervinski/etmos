const { HandlebarsApplicationMixin } = foundry.applications.api;
const { ItemSheetV2 } = foundry.applications.sheets;

const CATEGORIAS = {
  particula: ["Função", "Objeto", "Característica", "Complemento"],
  habilidade: ["Prática", "Teórica"],
  origem: ["Mundana", "Fantástica"]
};

export class EtmosItemSheet extends HandlebarsApplicationMixin(ItemSheetV2) {
  static DEFAULT_OPTIONS = {
    classes: ["etmos-sheet", "etmos-item"],
    position: { width: 480, height: 420 },
    window: { resizable: true },
    form: { submitOnChange: true }
  };

  static PARTS = {
    form: { template: "systems/etmos/templates/items/item-sheet.html" }
  };

  /** @override */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    context.item = this.item;
    context.system = this.item.system;
    context.editable = this.isEditable;
    context.categorias = CATEGORIAS[this.item.type] ?? null;
    return context;
  }
}
