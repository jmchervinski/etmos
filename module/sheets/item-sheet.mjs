export class EtmosItemSheet extends ItemSheet {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["etmos", "sheet", "item"],
      width: 480,
      height: 420
    });
  }

  /** @override */
  get template() {
    return `systems/etmos/templates/items/${this.item.type}-sheet.html`;
  }

  /** @override */
  getData() {
    const context = super.getData();
    context.system = context.item.system;
    return context;
  }
}
