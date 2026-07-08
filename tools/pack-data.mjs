/**
 * Conteúdo dos compêndios (SRD ETMOS 1.1 — "Exemplo de Habilidades",
 * "Exemplo de Origens" e "Exemplo de Aptidões" — e o guia de criação de
 * personagem da comunidade, documento por Decciuzz com artes de
 * Leonardo A. @leo_and).
 * Fonte de verdade: edite aqui e rode `npm run build:packs`.
 *
 * ETMOS © Rafa Reis / Editora Balde Galáctico. Textos do SRD, distribuído
 * gratuitamente pela editora.
 */

import { ETMOS } from "../module/config.mjs";

const p = txt => `<p>${txt}</p>`;

/* ------------------------------------------------------------------ */
/* Pack: etmos-habilidades                                              */
/* ------------------------------------------------------------------ */

export const habilidades = {
  folders: [
    { _id: "etmosfolhabprat0", name: "Habilidades Práticas", folder: null, sort: 100000 },
    { _id: "etmosfolhabteor0", name: "Habilidades Teóricas", folder: null, sort: 200000 },
    { _id: "etmosfolhabconh0", name: "Conhecimento", folder: "etmosfolhabteor0", sort: 100000 }
  ],
  items: [
    {
      _id: "etmoshab00000001", name: "Conjuração Silenciosa (P)", folder: "etmosfolhabprat0",
      img: "icons/svg/silenced.svg",
      system: {
        categoria: "Prática", bonus: 0,
        description: p("O conjurador é capaz de realizar suas magias sussurrando, devendo aumentar 1 ponto de estresse acumulado ao conjurar a magia.")
      }
    },
    {
      _id: "etmoshab00000002", name: "Armas Brancas (P)", folder: "etmosfolhabprat0",
      img: "icons/svg/combat.svg",
      system: {
        categoria: "Prática", bonus: 2,
        description: p("A personagem adquire a habilidade de lutar com armas brancas, como facas, espadas, martelos, etc. Você pode escolher essa habilidade mais de uma vez. A cada vez em que a escolher, some +2 ao teste de ataque feito com armas brancas.")
      }
    },
    {
      _id: "etmoshab00000003", name: "Diplomacia (P)", folder: "etmosfolhabprat0",
      img: "icons/svg/village.svg",
      system: {
        categoria: "Prática", bonus: 2,
        description: p("Habilidade de convencer ou negociar com palavras. Você pode escolher essa habilidade mais de uma vez. Para cada vez em que for escolhida, some +2 nos testes da habilidade.")
      }
    },
    {
      _id: "etmoshab00000004", name: "Performance (P)", folder: "etmosfolhabprat0",
      img: "icons/svg/sound.svg",
      system: {
        categoria: "Prática", bonus: 2,
        description: p("Trata-se da capacidade artística em geral. Ao escolher essa habilidade, escolha também um ofício artístico (dança, canto, instrumento musical, teatro etc.). Essa habilidade pode ser escolhida mais de uma vez. A cada vez em que a escolher, escolha também um novo ofício artístico e some +2 nos testes da habilidade.")
      }
    },
    {
      _id: "etmoshab00000005", name: "Treinamento Mágico (T)", folder: "etmosfolhabteor0",
      img: "icons/svg/book.svg",
      system: {
        categoria: "Teórica", bonus: 0,
        description: p("Você estudou e adquiriu conhecimento de uma nova Característica. Você pode escolher essa habilidade até 3 vezes. A cada vez, escolha uma Característica diferente para adicionar a seu Grimório.")
      }
    },
    {
      _id: "etmoshab00000006", name: "Artes de Combate (T)", folder: "etmosfolhabteor0",
      img: "icons/svg/sword.svg",
      system: {
        categoria: "Teórica", bonus: 0,
        description: p("Seja por estudo próprio, ensinamentos de um mestre, ou a própria vida, você aprendeu lições sobre como melhor se portar em um confronto direto. Quando fosse fazer uma rolagem de iniciativa, ao invés você pode optar por não realizar nenhuma rolagem e se colocar onde desejar na Ordem de Iniciativa.")
      }
    },
    {
      _id: "etmoshab00000007", name: "Conhecimento: História (T)", folder: "etmosfolhabconh0",
      img: "icons/svg/book.svg",
      system: {
        categoria: "Teórica", bonus: 2,
        description: p("Estudo de eventos históricos, pessoas, lugares, conflitos políticos e militares etc. Você pode escolher essa habilidade mais de uma vez. Para cada vez em que for escolhida, some +2 nos testes da habilidade.")
      }
    },
    {
      _id: "etmoshab00000008", name: "Conhecimento: Geografia (T)", folder: "etmosfolhabconh0",
      img: "icons/svg/direction.svg",
      system: {
        categoria: "Teórica", bonus: 2,
        description: p("Estudo acerca da topologia do Mundano e do Fantástico, bem como de eventos físicos e climáticos. Você pode escolher essa habilidade mais de uma vez. Para cada vez em que for escolhida, some +2 nos testes da habilidade.")
      }
    },
    {
      _id: "etmoshab00000009", name: "Conhecimento: Zoologia (T)", folder: "etmosfolhabconh0",
      img: "icons/svg/pawprint.svg",
      system: {
        categoria: "Teórica", bonus: 2,
        description: p("Estudo acerca da fisiologia e do comportamento dos animais, sejam Mundanos ou Fantásticos. Você pode escolher essa habilidade mais de uma vez. Para cada vez em que for escolhida, some +2 nos testes da habilidade.")
      }
    },
    {
      _id: "etmoshab00000010", name: "Conhecimento: Herbologia (T)", folder: "etmosfolhabconh0",
      img: "icons/svg/oak.svg",
      system: {
        categoria: "Teórica", bonus: 2,
        description: p("Estudo acerca da flora Mundana e Fantástica, desde plantas cotidianas a ervas raras e mágicas. Você pode escolher essa habilidade mais de uma vez. Para cada vez em que for escolhida, some +2 nos testes da habilidade.")
      }
    },
    {
      _id: "etmoshab00000011", name: "Conhecimento: Medicina (T)", folder: "etmosfolhabconh0",
      img: "icons/svg/regen.svg",
      system: {
        categoria: "Teórica", bonus: 2,
        description: p("Estudo da fisiologia de pessoas e de como tratar suas aflições físicas. Você pode escolher essa habilidade mais de uma vez. Para cada vez em que for escolhida, some +2 nos testes da habilidade.")
      }
    },
    {
      _id: "etmoshab00000012", name: "Conhecimento: Mecânica e Engenharia (T)", folder: "etmosfolhabconh0",
      img: "icons/svg/clockwork.svg",
      system: {
        categoria: "Teórica", bonus: 2,
        description: p("Estudo e aplicação de conhecimentos básicos sobre máquinas em geral. Você pode escolher essa habilidade mais de uma vez. Para cada vez em que for escolhida, some +2 nos testes da habilidade.")
      }
    },
    {
      _id: "etmoshab00000013", name: "Conhecimento: Computação (T)", folder: "etmosfolhabconh0",
      img: "icons/svg/lightning.svg",
      system: {
        categoria: "Teórica", bonus: 2,
        description: p("Estudo e aplicação de conhecimentos básicos sobre computadores (hacking, criptografia e uso de sistemas e softwares). Você pode escolher essa habilidade mais de uma vez. Para cada vez em que for escolhida, some +2 nos testes da habilidade.")
      }
    },
    {
      _id: "etmoshab00000014", name: "Aparar (P)", folder: "etmosfolhabprat0",
      img: "icons/svg/mage-shield.svg",
      system: {
        categoria: "Prática", bonus: 2,
        description: p("Você possui a aptidão em combates mundanos para cauterizar ataques. A dificuldade para que te acertem com ataques corporais ou a distância sobe em 02.")
      }
    },
    {
      _id: "etmoshab00000015", name: "Armas de Longo Alcance (P)", folder: "etmosfolhabprat0",
      img: "icons/svg/target.svg",
      system: {
        categoria: "Prática", bonus: 2,
        description: p("Você tem habilidade para executar ataques com armas de longo alcance. Some +2 nos testes da habilidade.")
      }
    },
    {
      _id: "etmoshab00000016", name: "Perspicácia (P)", folder: "etmosfolhabprat0",
      img: "icons/svg/eye.svg",
      system: {
        categoria: "Prática", bonus: 2,
        description: p("Seus olhos são treinados para perceber detalhes. Some +2 nos testes de habilidade para perceber os detalhes a sua volta, investigar o que está oculto, ou identificar detalhes com os seus 05 sentidos.")
      }
    },
    {
      _id: "etmoshab00000017", name: "Enganar (P)", folder: "etmosfolhabprat0",
      img: "icons/svg/mystery-man.svg",
      system: {
        categoria: "Prática", bonus: 2,
        description: p("O conjunto de habilidades que compõem um manipulador. Mentir, persuadir, enganar, etc. Some +2 nos testes da habilidade.")
      }
    },
    {
      _id: "etmoshab00000018", name: "Exceder os Limites (P)", folder: "etmosfolhabprat0",
      img: "icons/svg/upgrade.svg",
      system: {
        categoria: "Prática", bonus: 0,
        description: p("Uma vez por dia, você pode conjurar uma magia de Complexidade uma categoria acima de seu limite, gerando 2 pontos de Estresse extra além do valor normal para aquela Complexidade.")
      }
    },
    {
      _id: "etmoshab00000019", name: "Expert em Oratória (P)", folder: "etmosfolhabprat0",
      img: "icons/svg/sound.svg",
      system: {
        categoria: "Prática", bonus: 2,
        description: p("Quando o assunto é falar em ETMOS, você é um profissional. Quando você ganha essa Habilidade você escolhe uma Função que você possua. Todos os Testes de Conjuração e Contestados das magias que você faz com essa Função escolhida ganham um bônus de +2.")
      }
    },
    {
      _id: "etmoshab00000020", name: "Ladinagem (P)", folder: "etmosfolhabprat0",
      img: "icons/svg/invisible.svg",
      system: {
        categoria: "Prática", bonus: 2,
        description: p("O conjunto de habilidades que compõem um bom ladrão. Furtividade, roubar sem ser visto, destrancar fechaduras, etc. Some +2 nos testes da habilidade.")
      }
    },
    {
      _id: "etmoshab00000021", name: "Sobrevivência (P)", folder: "etmosfolhabprat0",
      img: "icons/svg/oak.svg",
      system: {
        categoria: "Prática", bonus: 2,
        description: p("Conhecimento e treinamento para sobreviver em lugares inóspitos. Some +2 nos testes da habilidade em testes relacionados.")
      }
    },
    {
      _id: "etmoshab00000022", name: "Pronto para Ação (P)", folder: "etmosfolhabprat0",
      img: "icons/svg/combat.svg",
      system: {
        categoria: "Prática", bonus: 3,
        description: p("Você está preparado para começar um conflito. Você recebe um bônus de +3 em sua rolagem de Iniciativa.")
      }
    },
    {
      _id: "etmoshab00000023", name: "Agilidade Mental (T)", folder: "etmosfolhabteor0",
      img: "icons/svg/lightning.svg",
      system: {
        categoria: "Teórica", bonus: 0,
        description: p("Você pode realizar duas reações entre seus turnos, ao invés de apenas uma. A segunda reação que você executa dessa forma acumula 03 pontos de estresse adicional.")
      }
    },
    {
      _id: "etmoshab00000024", name: "Conhecimento: Culinária (T)", folder: "etmosfolhabconh0",
      img: "icons/svg/tankard.svg",
      system: {
        categoria: "Teórica", bonus: 0,
        description: p("Uma vez por dia, cada personagem que coma dos pratos que você preparar recupera 1 Ferimento a mais durante o próximo descanso.")
      }
    },
    {
      _id: "etmoshab00000025", name: "Dedicado (T)", folder: "etmosfolhabteor0",
      img: "icons/svg/upgrade.svg",
      system: {
        categoria: "Teórica", bonus: 0,
        description: p("Você é uma pessoa que se empenha em todos seus objetivos. A primeira vez em cada dia que você fosse ganhar um Dado de Empenho, você ganha 1 dado extra.")
      }
    },
    {
      _id: "etmoshab00000026", name: "Linguista (T)", folder: "etmosfolhabteor0",
      img: "icons/svg/book.svg",
      system: {
        categoria: "Teórica", bonus: 0,
        description: p("Ao entrar em contato com uma língua que não seja de seu conhecimento pela primeira vez no dia, faça um teste de Mente para definir se você já sabe falar aquela língua. Dificuldade 4 para línguas próximas às que você sabe, 6 para distantes, 8 para línguas antigas e 10 para línguas esquecidas.")
      }
    },
    {
      _id: "etmoshab00000027", name: "Memória Fotográfica (T)", folder: "etmosfolhabteor0",
      img: "icons/svg/daze.svg",
      system: {
        categoria: "Teórica", bonus: 0,
        description: p("Uma vez por dia, você pode recordar de um acontecimento que você tenha testemunhado mesmo que por poucos instantes. Você lembra dos mínimos detalhes e pode realizar um Teste de Mente com uma dificuldade à escolha do narrador para tentar identificar algo que deixou passar naquele exato momento.")
      }
    },
    {
      _id: "etmoshab00000028", name: "Reconhecer Sinais (T)", folder: "etmosfolhabteor0",
      img: "icons/svg/temple.svg",
      system: {
        categoria: "Teórica", bonus: 0,
        description: p("Se você estiver em uma cidade que lhe seja familiar, você sempre sabe a localização de Portais do Meio próximos a você. Do contrário, você pode fazer uma pesquisa rápida de 10 minutos (através da internet, em uma biblioteca, ou conversando com moradores locais).")
      }
    },
    {
      _id: "etmoshab00000029", name: "Inspirador (T)", folder: "etmosfolhabteor0",
      img: "icons/svg/light.svg",
      system: {
        categoria: "Teórica", bonus: 0,
        description: p("Durante seu turno, como opção a sua Ação de Interagir com o Ambiente, você inspira um aliado de algum modo artístico ou social e lhe confere um Dado de Empenho. Cada pessoa só pode ser afetada por essa Habilidade uma única vez por dia.")
      }
    },
    {
      _id: "etmoshab00000030", name: "Fanático por Mundanos (T)", folder: "etmosfolhabteor0",
      img: "icons/svg/village.svg",
      system: {
        categoria: "Teórica", bonus: 2,
        description: p("Você recebe um bônus de +2 para qualquer Teste que faça que envolva seres Mundanos diferentes de você.")
      }
    },
    {
      _id: "etmoshab00000031", name: "Comunicação de Intenção (T)", folder: "etmosfolhabteor0",
      img: "icons/svg/sound.svg",
      system: {
        categoria: "Teórica", bonus: 0,
        description: p("Você consegue distinguir intenções, ideias e emoções simples de qualquer criatura, independente de idioma. Você pode fazer um Teste de Alma Dificuldade 8, para entender e se fazer entendido por qualquer criatura, mesmo que não compartilhem um idioma em comum.")
      }
    }
  ].map(i => ({ ...i, type: "habilidade" }))
};

/* ------------------------------------------------------------------ */
/* Pack: etmos-origens                                                  */
/* ------------------------------------------------------------------ */

export const origens = {
  folders: [
    { _id: "etmosfolorimund0", name: "Origens Mundanas", folder: null, sort: 100000 },
    { _id: "etmosfolorifant0", name: "Origens Fantásticas", folder: null, sort: 200000 }
  ],
  items: [
    {
      _id: "etmosori00000001", name: "Berço de Ouro", folder: "etmosfolorimund0",
      img: "icons/svg/chest.svg",
      system: {
        categoria: "Mundana", exclusiva: true,
        description: p("Vindo de uma família rica e opulenta, sua personagem é herdeira de uma fortuna familiar. Dinheiro não é uma preocupação. Você sempre tem fundos suficientes para adquirir quaisquer bens cotidianos e Mundanos.")
      }
    },
    {
      _id: "etmosori00000002", name: "Orador Prodígio", folder: "etmosfolorifant0",
      img: "icons/svg/daze.svg",
      system: {
        categoria: "Fantástica", exclusiva: false,
        description: p("Desde cedo, sua personagem demonstrou aptidão para lidar com o Fantástico e o Etmos, sendo um verdadeiro prodígio. Você começa o jogo com uma Característica adicional.")
      }
    },
    {
      _id: "etmosori00000003", name: "Atleta", folder: "etmosfolorimund0",
      img: "icons/svg/upgrade.svg",
      system: {
        categoria: "Mundana", exclusiva: false, ajusteFerimentos: 1,
        description: p("Sua personagem sempre mostrou aptidão aos esportes e cultiva o aprimoramento físico. Aumente seu limite de Ferimentos em 1.")
      }
    },
    {
      _id: "etmosori00000004", name: "Inteligência das Ruas", folder: "etmosfolorimund0",
      img: "icons/svg/village.svg",
      system: {
        categoria: "Mundana", exclusiva: true,
        description: p("Por qualquer situação que seja, a vida levou sua personagem a ter experiência com a realidade de sobreviver nas ruas. Você começa o jogo com uma das seguintes Habilidades, à sua escolha:") +
          "<ul><li>Ladinagem;</li><li>Enganar;</li><li>Aparar.</li></ul>"
      }
    },
    {
      _id: "etmosori00000005", name: "Voo", folder: "etmosfolorifant0",
      img: "icons/svg/wing.svg",
      system: {
        categoria: "Fantástica", exclusiva: true,
        description: p("Seja por ter asas ou capacidade de flutuação, a fisiologia de seu ser Fantástico garante a capacidade de voar. Sua personagem consegue voar livremente a uma velocidade máxima de 30 km/h. Ao usar essa capacidade no Mundano, você acumula 1 ponto de Estresse a cada 10 minutos de voo, ou a cada duas rodadas que permanecer voando durante uma cena de Combate.")
      }
    },
    {
      _id: "etmosori00000006", name: "Aluno Modelo", folder: "etmosfolorimund0",
      img: "icons/svg/book.svg",
      system: {
        categoria: "Mundana", exclusiva: false,
        description: p("Você sempre foi um bom aluno e aprendeu os melhores métodos para absorver informações e aprender. Você começa o jogo com uma Habilidade Teórica extra a sua escolha.")
      }
    },
    {
      _id: "etmosori00000007", name: "Artista", folder: "etmosfolorimund0",
      img: "icons/svg/sound.svg",
      system: {
        categoria: "Mundana", exclusiva: false,
        description: p("Uma vez por dia, você pode realizar uma apresentação de um ofício artístico para recuperar 03 de Estresse de todos os personagens que viram sua apresentação.")
      }
    },
    {
      _id: "etmosori00000008", name: "Ensino Formal Mundano", folder: "etmosfolorimund0",
      img: "icons/svg/village.svg",
      system: {
        categoria: "Mundana", exclusiva: false,
        description: p("Você foi instruído nos meios Mundanos. Sempre que você fizer um teste de Habilidade para obter informações ou para interagir com o Mundo Mundano, ganhará um bônus de +1 no teste.")
      }
    },
    {
      _id: "etmosori00000009", name: "Viajado", folder: "etmosfolorimund0",
      img: "icons/svg/direction.svg",
      system: {
        categoria: "Mundana", exclusiva: false,
        description: p("Pode começar o jogo com uma das seguintes Habilidades: Linguista, Sobrevivência ou Conhecimento Dominado: Culinária.")
      }
    },
    {
      _id: "etmosori00000010", name: "Criado em Dois Mundos", folder: "etmosfolorifant0",
      img: "icons/svg/temple.svg",
      system: {
        categoria: "Fantástica", exclusiva: false,
        description: p("Sempre que fizer um teste de Habilidade para obter informações ou para interagir com o Mundo Fantástico ou Mundano, ganhará um bônus de +1 no teste.")
      }
    },
    {
      _id: "etmosori00000011", name: "Criado no Fantástico", folder: "etmosfolorifant0",
      img: "icons/svg/eye.svg",
      system: {
        categoria: "Fantástica", exclusiva: false,
        description: p("Sempre que fizer um teste de Habilidade para obter informações ou para interagir com o Mundo Fantástico, ganhará um bônus de +2 no teste.")
      }
    },
    {
      _id: "etmosori00000012", name: "Charme Fantástico", folder: "etmosfolorifant0",
      img: "icons/svg/angel.svg",
      system: {
        categoria: "Fantástica", exclusiva: false,
        description: p("Influenciar uma pessoa com quem esteja conversando cara a cara. O alvo realiza um teste de Mente, dificuldade 7; com uma falha, torna-se receptivo a você. Esse efeito cessa após 5 minutos, e o alvo não entende que foi afetado. Você acumula 1 ponto de Estresse.")
      }
    },
    {
      _id: "etmosori00000013", name: "Espírito Forte", folder: "etmosfolorifant0",
      img: "icons/svg/aura.svg",
      system: {
        categoria: "Fantástica", exclusiva: false, ajusteEstresse: 2,
        description: p("Você é extremamente centrado, o que permitiu a você ser muito mais resistente para usar magias que os outros a sua volta. Aumente seu limite de estresse em 02.")
      }
    },
    {
      _id: "etmosori00000014", name: "Sorte Fantástica", folder: "etmosfolorifant0",
      img: "icons/svg/sun.svg",
      system: {
        categoria: "Fantástica", exclusiva: false,
        description: p("Você possui uma sorte que só pode ser explicada pelo seu contato com o fantástico. Uma vez por dia, ao fazer qualquer Teste, jogue 4d6 em vez de 2 e use os dois melhores resultados.")
      }
    }
  ].map(i => ({ ...i, type: "origem" }))
};

/* ------------------------------------------------------------------ */
/* Pack: etmos-aptidoes (Exemplo de Aptidões — antagonistas)            */
/* ------------------------------------------------------------------ */

export const aptidoes = {
  folders: [],
  items: [
    {
      _id: "etmosapt00000001", name: "Comunicação de Intenção",
      img: "icons/svg/sound.svg",
      system: {
        ehAtaque: false, ferimentos: "",
        description: p("A criatura consegue distinguir os dialetos Mundanos, independente do idioma, pois se comunica através de intenção, mas não pode ser entendido por seres Mundanos.")
      }
    },
    {
      _id: "etmosapt00000002", name: "Bruto",
      img: "icons/svg/statue.svg",
      system: {
        ehAtaque: false, ferimentos: "",
        description: p("A criatura sofre 1 Ferimento a menos de qualquer fonte.")
      }
    },
    {
      _id: "etmosapt00000003", name: "Habitat Natural",
      img: "icons/svg/cave.svg",
      system: {
        ehAtaque: false, ferimentos: "",
        description: p("Enquanto estiver dentro do seu Habitat Natural, a criatura possui um bônus de +1 em seus testes. O Habitat da criatura pode ser: florestas, montanhas, corpos d'água, desertos ou cavernas. Você determina o Habitat da criatura quando monta sua ficha, ao escolher essa Aptidão.")
      }
    },
    {
      _id: "etmosapt00000004", name: "Resistência Fantástica",
      img: "icons/svg/mage-shield.svg",
      system: {
        ehAtaque: false, ferimentos: "",
        description: p("A criatura recebe um bônus de +2 em qualquer Teste Contestado contra um efeito mágico.")
      }
    },
    {
      _id: "etmosapt00000005", name: "Ninho",
      img: "icons/svg/cave.svg",
      system: {
        ehAtaque: false, ferimentos: "",
        description: p("A criatura pode estabelecer um ninho em um local isolado e seguro de até 200m². Enquanto estiver em seu ninho, ela trata qualquer descanso como Completo, e tem um bônus de +1 em qualquer teste.")
      }
    },
    {
      _id: "etmosapt00000006", name: "Combatente",
      img: "icons/svg/combat.svg",
      system: {
        ehAtaque: false, ferimentos: "",
        description: p("A criatura soma um de seus Atributos em suas rolagens de Ataque (Corpo, Mente ou Alma). Escolha qual Atributo será utilizado durante a montagem da ficha da criatura, ao escolher essa Aptidão.")
      }
    },
    {
      _id: "etmosapt00000007", name: "Pancada Pesada (Ataque)",
      img: "icons/svg/falling.svg",
      system: {
        ehAtaque: true, ferimentos: "2 numa Defesa Ineficaz",
        description: p("A criatura realiza um Ataque Desarmado contra um alvo em até 1m, causando 2 Ferimentos numa Defesa Ineficaz.")
      }
    },
    {
      _id: "etmosapt00000008", name: "Grito Fúnebre (Ataque)",
      img: "icons/svg/terror.svg",
      system: {
        ehAtaque: true, ferimentos: "2 numa Defesa Ineficaz (área: 30m)",
        description: p("Todas as criaturas que ouvem esse grito, em até 30m, sofrem 2 Ferimentos, em uma Defesa Ineficaz e até o final do seu próximo turno estão surdas e suas magias acumulam 1 Ponto de Estresse adicional.")
      }
    },
    {
      _id: "etmosapt00000009", name: "Explosão Mental (Ataque)",
      img: "icons/svg/daze.svg",
      system: {
        ehAtaque: true, ferimentos: "2 numa Defesa Ineficaz (+2 se acima do Limite de Estresse)",
        description: p("A criatura realiza 1 Ataque à Distância contra um alvo em até 15m; causando 2 Ferimentos numa Defesa Ineficaz. Se o alvo estiver com Estresse acumulado acima do seu limite ele sofre 2 Ferimentos a mais.")
      }
    },
    {
      _id: "etmosapt00000010", name: "Explosão Elemental (Ataque)",
      img: "icons/svg/explosion.svg",
      system: {
        ehAtaque: true, ferimentos: "3 numa Defesa Ineficaz (área: 5m, teste de Corpo Dif. 13)",
        description: p("A criatura causa uma explosão de energia elemental numa área de 5m ao seu redor. Qualquer criatura pega na explosão, realiza um teste de Corpo Dificuldade 13 e sofre 3 Ferimentos numa Defesa Ineficaz. A natureza da explosão elemental pode ser ígneo, gélida, ácida, elétrica ou venenosa.")
      }
    }
  ].map(i => ({ ...i, type: "aptidao" }))
};

export const PACKS = {
  "etmos-habilidades": habilidades,
  "etmos-origens": origens,
  "etmos-aptidoes": aptidoes
};

/* ------------------------------------------------------------------ */
/* Card Pack: etmos-particulas (baralho de Partículas do SRD)          */
/* ------------------------------------------------------------------ */

/**
 * Baralho de Partículas usando a arte oficial das cartas (baralho "Etmos
 * Spells", distribuído gratuitamente pela editora). Cada carta usa a imagem
 * correspondente em assets/particulas/<id>.jpg (a face traz categoria, nome e
 * abreviação) e o verso comum _verso.jpg. Os dados vêm de ETMOS.particulas.
 */
const FACE = id => `systems/etmos/assets/particulas/${id}.jpg`;
const VERSO_CARTA = "systems/etmos/assets/particulas/_verso.jpg";

function cartaParticula(part, categoria, idx, nivel) {
  const num = String(idx + 1).padStart(7, "0");
  return {
    _id: `etmoscard${num}`,
    name: `${part.nome} - ${part.abrev}`,
    description: `<p><b>${categoria}</b>${nivel ? ` — ${nivel}º Nível` : ""} · Abreviação: <b>${part.abrev}</b></p>`,
    type: "base",
    suit: categoria,
    value: nivel ?? idx + 1,
    origin: null,
    width: 1,
    height: 1,
    rotation: 0,
    drawn: false,
    sort: (idx + 1) * 1000,
    faces: [{ name: `${part.nome} - ${part.abrev}`, text: "", img: FACE(part.id) }],
    back: { name: "Partícula", text: "", img: VERSO_CARTA },
    flags: {}
  };
}

function baralhoParticulas() {
  const cartas = [];
  let idx = 0;
  const push = (lista, categoria) => {
    for (const part of lista) cartas.push(cartaParticula(part, categoria, idx++, part.nivel));
  };
  push(ETMOS.particulas.funcoes, "Função");
  push(ETMOS.particulas.objetos, "Objeto");
  push(ETMOS.particulas.caracteristicas, "Característica");
  push(ETMOS.particulas.complementos, "Complemento");
  return cartas;
}

export const CARD_PACKS = {
  "etmos-baralho-particulas": {
    decks: [
      {
        _id: "etmosdeckparticl",
        name: "Baralho de Partículas (SRD)",
        type: "deck",
        description:
          "<p>Deck com as 80 Partículas (Funções, Objetos, Características e Complementos), " +
          "para sortear/combinar ao montar Frases Mágicas. Arte do baralho oficial " +
          "\"Etmos Spells\", distribuído gratuitamente pela Editora Balde Galáctico.</p>",
        img: VERSO_CARTA,
        cards: baralhoParticulas()
      }
    ]
  }
};
