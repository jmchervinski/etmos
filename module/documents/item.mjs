export class EtmosItem extends Item {
  /**
   * Envia o item para o chat como uma carta de descrição.
   */
  async roll() {
    const item = this;
    const speaker = ChatMessage.getSpeaker({ actor: this.actor });
    const rollMode = game.settings.get("core", "rollMode");
    const label = `<b>${item.name}</b> (${item.type})`;

    ChatMessage.create({
      speaker,
      rollMode,
      flavor: label,
      content: item.system.description ?? ""
    });
  }
}
