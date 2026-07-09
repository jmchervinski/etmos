import { EtmosBaseActorSheet } from "./base-actor-sheet.mjs";

/**
 * Ficha do Familiar (Módulo de Familiares): atributos base 1/1/1, limites
 * manuais (Ferimentos 2 / Estresse 2, alteráveis por Aptidões como Robustez),
 * Força do Pacto 1-4 e Aptidões de Familiar como itens "aptidao".
 */
export class EtmosFamiliarSheet extends EtmosBaseActorSheet {
  static DEFAULT_OPTIONS = {
    classes: ["etmos-sheet", "etmos-familiar"],
    position: { width: 620, height: 640 }
  };

  static PARTS = {
    header: { template: "systems/etmos/templates/actors/parts/familiar-header.html" },
    tabs: { template: "templates/generic/tab-navigation.hbs", classes: ["sheet-tabs"] },
    principal: { template: "systems/etmos/templates/actors/parts/npc-principal.html", scrollable: [""] },
    aptidoes: { template: "systems/etmos/templates/actors/parts/familiar-aptidoes.html", scrollable: [""] },
    biografia: { template: "systems/etmos/templates/actors/parts/npc-biografia.html", scrollable: [""] },
    footer: { template: "systems/etmos/templates/actors/parts/actor-footer.html" }
  };

  static TABS = {
    primary: {
      tabs: [
        { id: "principal", label: "Principal" },
        { id: "aptidoes", label: "Aptidões de Familiar" },
        { id: "biografia", label: "Descrição" }
      ],
      initial: "principal"
    }
  };

  /** @override */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    const sys = this.actor.system;
    context.tabs = this._prepareTabs("primary");

    // Força do Pacto (1-4) como trilha de quadradinhos
    context.forcaPactoPips = Array.fromRange(4).map(i => ({
      value: i + 1,
      filled: sys.details.forcaPacto >= i + 1
    }));
    // Aptidões permitidas = 2 + Força do Pacto
    context.aptidoesPermitidas = 2 + (sys.details.forcaPacto ?? 1);

    // Pactário: Oradores disponíveis para vínculo
    context.pactarios = game.actors
      .filter(a => a.type === "character")
      .map(a => ({ id: a.id, name: a.name, selected: a.id === sys.details.pactario }));

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
