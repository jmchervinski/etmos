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
    position: { width: 480, height: 560 },
    window: { resizable: true },
    form: { submitOnChange: true },
    actions: {
      editImage: EtmosItemSheet.onEditImage
    }
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
    context.enrichedDescription = await foundry.applications.ux.TextEditor.implementation.enrichHTML(
      this.item.system.description,
      { secrets: this.document.isOwner, relativeTo: this.item }
    );
    return context;
  }

  /** Abre o FilePicker para trocar a imagem do item. */
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
}
