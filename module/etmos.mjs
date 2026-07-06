/**
 * ETMOS para Foundry VTT — sistema NÃO-OFICIAL, feito por fã.
 * ETMOS é criação de Rafa Reis, publicado pela Editora Balde Galáctico.
 * https://baldegalactico.com.br/jogo/etmos/
 */
import { EtmosActor } from "./documents/actor.mjs";
import { EtmosItem } from "./documents/item.mjs";
import { EtmosActorSheet } from "./sheets/actor-sheet.mjs";
import { EtmosItemSheet } from "./sheets/item-sheet.mjs";
import {
  CharacterDataModel,
  NpcDataModel,
  ParticulaDataModel,
  HabilidadeDataModel,
  OrigemDataModel,
  EquipamentoDataModel,
  AptidaoDataModel
} from "./data-models.mjs";

Hooks.once("init", async function () {
  console.log("Etmos | Inicializando sistema não-oficial de ETMOS (créditos: Rafa Reis / Editora Balde Galáctico)");

  game.etmos = { EtmosActor, EtmosItem };

  // Documentos customizados
  CONFIG.Actor.documentClass = EtmosActor;
  CONFIG.Item.documentClass = EtmosItem;

  // Data Models (padrão recomendado pelo Foundry)
  CONFIG.Actor.dataModels = {
    character: CharacterDataModel,
    npc: NpcDataModel
  };
  CONFIG.Item.dataModels = {
    particula: ParticulaDataModel,
    habilidade: HabilidadeDataModel,
    origem: OrigemDataModel,
    equipamento: EquipamentoDataModel,
    aptidao: AptidaoDataModel
  };

  // Atributos rastreáveis em barras de token
  CONFIG.Actor.trackableAttributes = {
    character: {
      bar: ["resources.ferimentos", "resources.estresse"],
      value: ["empenho.dados", "details.nivel"]
    },
    npc: {
      bar: ["resources.ferimentos", "resources.estresse"],
      value: []
    }
  };

  // Iniciativa é um Teste de Corpo (2d6 + Corpo), SRD.
  CONFIG.Combat.initiative = {
    formula: "2d6 + @attributes.corpo.value",
    decimals: 0
  };

  // Sheets
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("etmos", EtmosActorSheet, { makeDefault: true });
  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("etmos", EtmosItemSheet, { makeDefault: true });

  // Helpers do Handlebars
  Handlebars.registerHelper("eq", (a, b) => a === b);

  await preloadHandlebarsTemplates();
});

async function preloadHandlebarsTemplates() {
  const paths = [
    "systems/etmos/templates/actors/parts/actor-atributos.html",
    "systems/etmos/templates/actors/parts/actor-recursos.html",
    "systems/etmos/templates/actors/parts/actor-itens.html"
  ];
  return foundry.applications.handlebars.loadTemplates(paths);
}
