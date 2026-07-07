import { EtmosBaseActorSheet } from "./base-actor-sheet.mjs";

export class EtmosNpcSheet extends EtmosBaseActorSheet {
  static DEFAULT_OPTIONS = {
    classes: ["etmos-sheet", "etmos-npc"]
  };

  static PARTS = {
    header: { template: "systems/etmos/templates/actors/parts/npc-header.html" },
    tabs: { template: "templates/generic/tab-navigation.hbs", classes: ["sheet-tabs"] },
    principal: { template: "systems/etmos/templates/actors/parts/npc-principal.html", scrollable: [""] },
    aptidoes: { template: "systems/etmos/templates/actors/parts/npc-aptidoes.html", scrollable: [""] },
    biografia: { template: "systems/etmos/templates/actors/parts/npc-biografia.html", scrollable: [""] },
    footer: { template: "systems/etmos/templates/actors/parts/actor-footer.html" }
  };

  static TABS = {
    primary: {
      tabs: [
        { id: "principal", label: "ETMOS.TabPrincipal" },
        { id: "aptidoes", label: "ETMOS.TabAptidoes" },
        { id: "biografia", label: "ETMOS.TabBiografia" }
      ],
      initial: "principal"
    }
  };

  /** @override */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    context.tabs = this._prepareTabs("primary");
    return context;
  }

  /** @override */
  async _preparePartContext(partId, context) {
    context = await super._preparePartContext(partId, context);
    if (partId === "biografia") {
      context.enrichedBiography = await foundry.applications.ux.TextEditor.implementation.enrichHTML(
        this.actor.system.biography,
        { secrets: this.document.isOwner, rollData: this.actor.getRollData(), relativeTo: this.actor }
      );
    }
    return context;
  }
}
