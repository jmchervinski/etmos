/**
 * ETMOS para Foundry VTT — sistema NÃO-OFICIAL, feito por fã.
 * ETMOS é criação de Rafa Reis, publicado pela Editora Balde Galáctico.
 * https://baldegalactico.com.br/jogo/etmos/
 */
import { EtmosActor } from "./documents/actor.mjs";
import { EtmosItem } from "./documents/item.mjs";
import { EtmosCharacterSheet } from "./sheets/character-sheet.mjs";
import { EtmosNpcSheet } from "./sheets/npc-sheet.mjs";
import { EtmosFamiliarSheet } from "./sheets/familiar-sheet.mjs";
import { EtmosItemSheet } from "./sheets/item-sheet.mjs";
import { ETMOS } from "./config.mjs";
import {
  CharacterDataModel,
  NpcDataModel,
  FamiliarDataModel,
  ParticulaDataModel,
  HabilidadeDataModel,
  OrigemDataModel,
  EquipamentoDataModel,
  AptidaoDataModel
} from "./data-models.mjs";

Hooks.once("init", async function () {
  console.log("Etmos | Inicializando sistema não-oficial de ETMOS (créditos: Rafa Reis / Editora Balde Galáctico)");

  // API do sistema para macros e módulos (config expõe Partículas etc.)
  game.etmos = { EtmosActor, EtmosItem, config: ETMOS };

  // Documentos customizados
  CONFIG.Actor.documentClass = EtmosActor;
  CONFIG.Item.documentClass = EtmosItem;

  // Data Models (padrão recomendado pelo Foundry)
  CONFIG.Actor.dataModels = {
    character: CharacterDataModel,
    npc: NpcDataModel,
    familiar: FamiliarDataModel
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
    },
    familiar: {
      bar: ["resources.ferimentos", "resources.estresse"],
      value: ["details.forcaPacto"]
    }
  };

  // Módulos opcionais (Familiares, Proezas): settings de mundo, também
  // controláveis pelos toggles da aba Configurações da ficha.
  for (const modulo of ETMOS.modulos) {
    game.settings.register("etmos", modulo.id, {
      name: modulo.nome,
      hint: modulo.dica,
      scope: "world",
      config: true,
      type: Boolean,
      default: false,
      onChange: () => {
        // Re-renderiza as fichas abertas para mostrar/ocultar os blocos do módulo
        for (const app of foundry.applications.instances.values()) {
          if (app.actor) app.render();
        }
      }
    });
  }

  // Iniciativa é um Teste de Corpo (2d6 + Corpo), SRD.
  CONFIG.Combat.initiative = {
    formula: "2d6 + @attributes.corpo.value",
    decimals: 0
  };

  // Sheets (ApplicationV2), registradas pelo caminho namespaced como o dnd5e faz.
  // Evita os globais depreciados Actors/Items e as classes appv1, que mudam entre versões.
  const { DocumentSheetConfig } = foundry.applications.apps;
  DocumentSheetConfig.registerSheet(Actor, "etmos", EtmosCharacterSheet, {
    types: ["character"], makeDefault: true, label: "ETMOS.SheetCharacter"
  });
  DocumentSheetConfig.registerSheet(Actor, "etmos", EtmosNpcSheet, {
    types: ["npc"], makeDefault: true, label: "ETMOS.SheetNpc"
  });
  DocumentSheetConfig.registerSheet(Actor, "etmos", EtmosFamiliarSheet, {
    types: ["familiar"], makeDefault: true, label: "ETMOS.SheetFamiliar"
  });
  DocumentSheetConfig.registerSheet(Item, "etmos", EtmosItemSheet, {
    makeDefault: true, label: "ETMOS.SheetItem"
  });

  // Helpers do Handlebars
  Handlebars.registerHelper("eq", (a, b) => a === b);
  Handlebars.registerHelper("gte", (a, b) => Number(a) >= Number(b));

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
