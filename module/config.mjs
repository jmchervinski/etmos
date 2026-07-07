/**
 * Configuração do sistema Etmos (não-oficial).
 * Lista de Partículas conforme o SRD ETMOS 1.1 (Rafa Reis / Ed. Balde Galáctico),
 * usada para gerar a checklist do Grimório igual à ficha oficial.
 */
export const ETMOS = {};

ETMOS.particulas = {
  funcoes: [
    { id: "alterar", nome: "Alterar", abrev: "Al" },
    { id: "aprisionar", nome: "Aprisionar", abrev: "Ar" },
    { id: "atacar", nome: "Atacar/Ferir", abrev: "Im" },
    { id: "atrair", nome: "Atrair/Repelir", abrev: "Ir" },
    { id: "banir", nome: "Banir", abrev: "En" },
    { id: "controlar", nome: "Controlar", abrev: "Et" },
    { id: "destruir", nome: "Destruir", abrev: "As" },
    { id: "empoderar", nome: "Empoderar", abrev: "Em" },
    { id: "enfraquecer", nome: "Enfraquecer", abrev: "In" },
    { id: "invocar", nome: "Invocar/Criar", abrev: "Ev" },
    { id: "juntar", nome: "Juntar/Conectar", abrev: "Un" },
    { id: "marcar", nome: "Marcar", abrev: "Es" },
    { id: "proteger", nome: "Proteger", abrev: "Am" },
    { id: "restaurar", nome: "Restaurar", abrev: "An" },
    { id: "revelar", nome: "Revelar", abrev: "Il" },
    { id: "transmitir", nome: "Transmitir", abrev: "Or" },
    { id: "transportar", nome: "Transportar", abrev: "It" }
  ],
  objetos: [
    { id: "abstrato", nome: "Abstrato", abrev: "Ala" },
    { id: "alma", nome: "Alma", abrev: "Ani" },
    { id: "animais", nome: "Animais", abrev: "Ali" },
    { id: "aura", nome: "Aura", abrev: "Iro" },
    { id: "cadaver", nome: "Cadáver", abrev: "Eva" },
    { id: "clima", nome: "Clima", abrev: "Ayu" },
    { id: "comida", nome: "Comida", abrev: "Ibo" },
    { id: "construcao", nome: "Construção", abrev: "Omu" },
    { id: "elemento", nome: "Elemento", abrev: "Eli" },
    { id: "explosao", nome: "Explosão", abrev: "Epi" },
    { id: "inanimado", nome: "Inanimado", abrev: "Exa" },
    { id: "informacao", nome: "Informação", abrev: "Azi" },
    { id: "mente", nome: "Mente/Pensamento", abrev: "Imu" },
    { id: "pessoa", nome: "Pessoa", abrev: "Ivi" },
    { id: "sentido", nome: "Sentido", abrev: "Una" },
    { id: "tecnologia", nome: "Tecnologia", abrev: "Ina" },
    { id: "tempo", nome: "Tempo", abrev: "Anu" },
    { id: "terreno", nome: "Terreno", abrev: "Era" },
    { id: "vegetacao", nome: "Vegetação/Flora", abrev: "Ora" }
  ],
  caracteristicas: [
    { id: "acido", nome: "Ácido", abrev: "Dum" },
    { id: "agua", nome: "Água", abrev: "Quan" },
    { id: "ar", nome: "Ar", abrev: "Aer" },
    { id: "armas", nome: "Armas", abrev: "Impe" },
    { id: "cheiro", nome: "Cheiro", abrev: "Kar" },
    { id: "corpo", nome: "Corpo", abrev: "Phys" },
    { id: "dimensional", nome: "Dimensional", abrev: "Rat" },
    { id: "eletrico", nome: "Elétrico", abrev: "Triz" },
    { id: "emocao", nome: "Emoção", abrev: "Bhas-" },
    { id: "escuridao", nome: "Escuridão", abrev: "Ten" },
    { id: "fogo", nome: "Fogo", abrev: "Ig" },
    { id: "forca", nome: "Força", abrev: "Vib" },
    { id: "gravidade", nome: "Gravidade", abrev: "Ym" },
    { id: "idioma", nome: "Idioma", abrev: "Hin" },
    { id: "ilusao", nome: "Ilusão", abrev: "Alui" },
    { id: "loucura", nome: "Loucura", abrev: "Mok" },
    { id: "luz", nome: "Luz", abrev: "Lum" },
    { id: "magia", nome: "Magia", abrev: "Mag" },
    { id: "movimento", nome: "Movimento", abrev: "Tum" },
    { id: "municao", nome: "Munição", abrev: "Sag" },
    { id: "necrotico", nome: "Necrótico", abrev: "Necro" },
    { id: "nojento", nome: "Nojento/Secreção", abrev: "Apu" },
    { id: "paladar", nome: "Paladar", abrev: "Gus" },
    { id: "pedra", nome: "Pedra", abrev: "Roc" },
    { id: "radiacao", nome: "Radiação", abrev: "Cand" },
    { id: "reflexo", nome: "Reflexo/Espelho", abrev: "Kan" },
    { id: "sangue", nome: "Sangue", abrev: "Hem" },
    { id: "som", nome: "Som", abrev: "Mul" },
    { id: "sono", nome: "Sono", abrev: "Cysg" },
    { id: "tecido", nome: "Tecido", abrev: "Tuni" },
    { id: "terra", nome: "Terra", abrev: "Mun" },
    { id: "velocidade", nome: "Velocidade", abrev: "Ast" },
    { id: "veneno", nome: "Veneno", abrev: "Tox" },
    { id: "visao", nome: "Visão", abrev: "Ocul" }
  ],
  complementos: [
    { id: "maior", nome: "Maior", abrev: "Mor", nivel: 1 },
    { id: "menor", nome: "Menor", abrev: "Min", nivel: 1 },
    { id: "formaCirculo", nome: "Forma: Círculo/Redoma/Esfera", abrev: "San", nivel: 1 },
    { id: "formaParede", nome: "Forma: Parede/Barreira/Muralha", abrev: "Sar", nivel: 1 },
    { id: "formaObjeto", nome: "Forma: Objeto em geral", abrev: "Sin", nivel: 1 },
    { id: "adicao", nome: "Adição", abrev: "Ag", nivel: 2 },
    { id: "variacao", nome: "Variação", abrev: "Ada-", nivel: 3 },
    { id: "negacao", nome: "Negação", abrev: "No-", nivel: 3 },
    { id: "derivacao", nome: "Derivação", abrev: "Mut-", nivel: 3 },
    { id: "inerte", nome: "Inerte", abrev: "Itam", nivel: 4 }
  ]
};

/** Lista achatada de todos os ids de partícula (para gerar o schema do Grimório). */
export const TODAS_PARTICULAS = Object.values(ETMOS.particulas).flat();

/**
 * Módulos oficiais opcionais (homebrews do Mestre Rafa Reis), ativáveis
 * na aba Configurações da ficha. Cada id corresponde a um game setting
 * de mundo registrado no init.
 */
ETMOS.modulos = [
  {
    id: "moduloFamiliares",
    nome: "Módulo: Familiares",
    dica: "Pactos com criaturas: ficha de Familiar, Força do Pacto e conjuração através do Familiar (+1 Estresse)."
  },
  {
    id: "moduloProezas",
    nome: "Módulo: Proezas",
    dica: "Ações viram Proezas compostas por Rudimentos; Limite de Estresse passa a 6 + Alma."
  }
];

/** Os 10 Rudimentos do Módulo de Proezas. */
ETMOS.rudimentos = [
  { id: "expressao", nome: "Expressão" },
  { id: "furtividade", nome: "Furtividade" },
  { id: "improviso", nome: "Improviso" },
  { id: "instinto", nome: "Instinto" },
  { id: "mobilidade", nome: "Mobilidade" },
  { id: "potencia", nome: "Potência" },
  { id: "precisao", nome: "Precisão" },
  { id: "raciocinio", nome: "Raciocínio" },
  { id: "tecnica", nome: "Técnica" },
  { id: "vigor", nome: "Vigor" }
];

/** Tipos de Proeza e o atributo que cada uma usa (Módulo de Proezas). */
ETMOS.tiposProeza = [
  { id: "fisica", nome: "Física", atributo: "corpo" },
  { id: "mental", nome: "Mental", atributo: "mente" },
  { id: "magica", nome: "Mágica", atributo: "alma" }
];

/**
 * Bônus de Progressão por transição de nível (SRD). Cada Bônus adquirido
 * (a cada 5 Marcos do mesmo tipo) permite escolher UMA das 3 opções da
 * transição atual — cada opção só pode ser escolhida 1 vez por nível.
 */
ETMOS.progressao = [
  {
    id: "n1", de: 1, para: 2,
    opcoes: [
      { id: "a", texto: "Ganha +1 Objeto e +1 Característica" },
      { id: "b", texto: "+1 ponto de Atributo para distribuir onde quiser" },
      { id: "c", texto: "Ganha +1 Habilidade Prática" }
    ]
  },
  {
    id: "n2", de: 2, para: 3,
    opcoes: [
      { id: "a", texto: "Ganha +1 Função" },
      { id: "b", texto: "+1 ponto de Atributo para distribuir onde quiser" },
      { id: "c", texto: "Ganha +1 Habilidade Teórica" }
    ]
  },
  {
    id: "n3", de: 3, para: 4,
    opcoes: [
      { id: "a", texto: "Ganha +1 Objeto e +1 Característica" },
      { id: "b", texto: "+1 ponto de Atributo para distribuir onde quiser" },
      { id: "c", texto: "Ganha +1 Habilidade Prática" }
    ]
  },
  {
    id: "n4", de: 4, para: 5,
    opcoes: [
      { id: "a", texto: "Ganha +1 Função" },
      { id: "b", texto: "+1 ponto de Atributo para distribuir onde quiser" },
      { id: "c", texto: "Ganha +1 Habilidade Teórica" }
    ]
  },
  {
    id: "n5", de: 5, para: 6,
    opcoes: [
      { id: "a", texto: "Ganha +1 Função, +1 Objeto e +1 Característica" },
      { id: "b", texto: "+1 ponto de Atributo para distribuir onde quiser" },
      { id: "c", texto: "Ganha +1 Habilidade Teórica e +1 Habilidade Prática" }
    ]
  }
];

/**
 * Lê um setting de módulo com segurança: durante o init (antes do registro)
 * ou em ambientes sem settings, responde false em vez de lançar erro.
 */
export function moduloAtivo(id) {
  try {
    return game.settings.get("etmos", id) === true;
  } catch (err) {
    return false;
  }
}
