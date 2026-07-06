/**
 * Data Models do sistema Etmos (não-oficial), seguindo o padrão recomendado em
 * https://foundryvtt.com/article/system-development/ e
 * https://foundryvtt.com/article/system-data-models/
 *
 * Regras baseadas no SRD ETMOS 1.1 (Editora Balde Galáctico / Rafa Reis).
 */
import { TODAS_PARTICULAS } from "./config.mjs";

const { HTMLField, NumberField, SchemaField, StringField, BooleanField } = foundry.data.fields;

/* -------------------------------------------- */
/*  Helpers                                     */
/* -------------------------------------------- */

const atributo = (initial = 1) =>
  new SchemaField({
    value: new NumberField({ required: true, integer: true, min: 0, max: 6, initial })
  });

const recurso = (max = 4) =>
  new SchemaField({
    value: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),
    max: new NumberField({ required: true, integer: true, min: 0, initial: max })
  });


/** Gera um SchemaField de booleans para todas as Partículas do SRD (checklist do Grimório). */
const grimorioSchema = () => {
  const campos = {};
  for (const p of TODAS_PARTICULAS) {
    campos[p.id] = new BooleanField({ required: true, initial: false });
  }
  return new SchemaField(campos);
};

/* -------------------------------------------- */
/*  Actor Models                                */
/* -------------------------------------------- */

class BaseActorModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      attributes: new SchemaField({
        corpo: atributo(),
        mente: atributo(),
        alma: atributo()
      }),
      // Ferimentos e Estresse ACUMULAM (de 0 até o Limite), conforme o SRD.
      resources: new SchemaField({
        ferimentos: recurso(4),
        estresse: recurso(5)
      }),
      biography: new HTMLField({ required: true, blank: true }),
      notes: new HTMLField({ required: true, blank: true })
    };
  }

  /**
   * Deriva a Complexidade Máxima de conjuração a partir de Mente.
   * SRD: Mente 2+ = Difícil; Mente 4+ = Complexa; Mente 6 = Milagre.
   */
  _derivarComplexidade() {
    const mente = this.attributes.mente.value;
    if (mente >= 6) return "Milagre";
    if (mente >= 4) return "Complexa";
    if (mente >= 2) return "Difícil";
    return "Regular";
  }

  /**
   * Deriva o Estado de Fadiga a partir do Estresse acumulado acima do Limite.
   * SRD: Cansado 1–5 acima; Exausto 6–8 acima; Esgotado 9+ acima.
   */
  _derivarFadiga() {
    const excesso = this.resources.estresse.value - this.resources.estresse.max;
    if (excesso >= 9) return "Esgotado";
    if (excesso >= 6) return "Exausto";
    if (excesso >= 1) return "Cansado";
    return "Normal";
  }

  /**
   * Estado de consciência derivado dos Ferimentos.
   * SRD: acima do Limite = inconsciente; Limite + 4 = morte.
   */
  _derivarConsciencia() {
    const f = this.resources.ferimentos;
    if (f.value >= f.max + 4) return "Morto";
    if (f.value > f.max) return "Inconsciente";
    return "Consciente";
  }

  prepareDerivedData() {
    super.prepareDerivedData();
    this.complexidadeMaxima = this._derivarComplexidade();
    this.fadiga = this._derivarFadiga();
    this.consciencia = this._derivarConsciencia();
  }
}

export class CharacterDataModel extends BaseActorModel {
  static defineSchema() {
    return {
      ...super.defineSchema(),
      details: new SchemaField({
        nivel: new NumberField({ required: true, integer: true, min: 1, max: 6, initial: 1 }),
        anoEscolar: new StringField({ required: true, blank: true, initial: "1º" }),
        idade: new NumberField({ required: true, integer: true, min: 0, initial: 15 }),
        tipo: new StringField({
          required: true,
          initial: "Mundano",
          choices: ["Mundano", "Fantástico"]
        })
      }),
      empenho: new SchemaField({
        dados: new NumberField({ required: true, integer: true, min: 0, initial: 0 })
      }),
      // Marcos de Crescimento: 3 categorias, 5 pontos cada por nível (SRD).
      marcos: new SchemaField({
        fisicos: new NumberField({ required: true, integer: true, min: 0, max: 5, initial: 0 }),
        mentais: new NumberField({ required: true, integer: true, min: 0, max: 5, initial: 0 }),
        emocionais: new NumberField({ required: true, integer: true, min: 0, max: 5, initial: 0 })
      }),
      jogador: new StringField({ required: true, blank: true }),
      // Página "Conceito" da ficha oficial
      conceito: new SchemaField({
        basico: new StringField({ required: true, blank: true }),
        aparencia: new StringField({ required: true, blank: true }),
        pontosImportancia: new StringField({ required: true, blank: true }),
        futuro: new StringField({ required: true, blank: true }),
        // Eixos de Valores e Comportamento (ex: Aventura <-o-> Segurança)
        eixo1esq: new StringField({ required: true, blank: true }),
        eixo1dir: new StringField({ required: true, blank: true }),
        eixo1pos: new NumberField({ required: true, integer: true, min: 0, max: 100, initial: 50 }),
        eixo2esq: new StringField({ required: true, blank: true }),
        eixo2dir: new StringField({ required: true, blank: true }),
        eixo2pos: new NumberField({ required: true, integer: true, min: 0, max: 100, initial: 50 })
      }),
      // Grimório como checklist de Partículas (igual à página 2 da ficha oficial)
      grimorio: grimorioSchema()
    };
  }

  prepareDerivedData() {
    super.prepareDerivedData();
    // Personagens (Oradores) usam as fórmulas do SRD:
    // Limite de Ferimentos = 4 + 1 a cada 2 pontos de Corpo
    // Limite de Estresse   = 4 + Alma
    this.resources.ferimentos.max = 4 + Math.floor(this.attributes.corpo.value / 2);
    this.resources.estresse.max = 4 + this.attributes.alma.value;
    // Recalcula estados que dependem dos limites derivados
    this.fadiga = this._derivarFadiga();
    this.consciencia = this._derivarConsciencia();
  }
}

export class NpcDataModel extends BaseActorModel {
  static defineSchema() {
    return {
      ...super.defineSchema(),
      details: new SchemaField({
        fichaBase: new StringField({
          required: true,
          initial: "Simples",
          choices: ["Simples", "Intermediária", "Avançada", "Orador"]
        }),
        movimentacao: new StringField({ required: true, blank: true, initial: "6m" }),
        comunicacao: new BooleanField({ required: true, initial: false }),
        // Fichas Base definem limites manualmente (ex: Curupira tem Corpo 3
        // mas Limite de Ferimentos 7, fora da fórmula). Se true, usa fórmulas.
        limitesAutomaticos: new BooleanField({ required: true, initial: false })
      })
    };
  }

  prepareDerivedData() {
    super.prepareDerivedData();
    if (this.details.limitesAutomaticos) {
      this.resources.ferimentos.max = 4 + Math.floor(this.attributes.corpo.value / 2);
      this.resources.estresse.max = 4 + this.attributes.alma.value;
      this.fadiga = this._derivarFadiga();
      this.consciencia = this._derivarConsciencia();
    }
  }
}

/* -------------------------------------------- */
/*  Item Models                                 */
/* -------------------------------------------- */

class BaseItemModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      description: new HTMLField({ required: true, blank: true })
    };
  }
}

export class ParticulaDataModel extends BaseItemModel {
  static defineSchema() {
    return {
      ...super.defineSchema(),
      categoria: new StringField({
        required: true,
        initial: "Função",
        choices: ["Função", "Objeto", "Característica", "Complemento"]
      }),
      abreviacao: new StringField({ required: true, blank: true })
    };
  }
}

export class HabilidadeDataModel extends BaseItemModel {
  static defineSchema() {
    return {
      ...super.defineSchema(),
      categoria: new StringField({
        required: true,
        initial: "Prática",
        choices: ["Prática", "Teórica"]
      }),
      bonus: new NumberField({ required: true, integer: true, initial: 2 })
    };
  }
}

export class OrigemDataModel extends BaseItemModel {
  static defineSchema() {
    return {
      ...super.defineSchema(),
      categoria: new StringField({
        required: true,
        initial: "Mundana",
        choices: ["Mundana", "Fantástica"]
      }),
      exclusiva: new BooleanField({ required: true, initial: false })
    };
  }
}

export class EquipamentoDataModel extends BaseItemModel {
  static defineSchema() {
    return {
      ...super.defineSchema(),
      quantidade: new NumberField({ required: true, integer: true, min: 0, initial: 1 }),
      // Totens têm Rank 0-5: Estresse extra por magia não-trivial (SRD).
      ehTotem: new BooleanField({ required: true, initial: false }),
      rankTotem: new NumberField({ required: true, integer: true, min: 0, max: 5, initial: 0 })
    };
  }
}

export class AptidaoDataModel extends BaseItemModel {
  static defineSchema() {
    return {
      ...super.defineSchema(),
      ehAtaque: new BooleanField({ required: true, initial: false }),
      ferimentos: new StringField({ required: true, blank: true })
    };
  }
}
