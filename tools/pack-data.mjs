/**
 * Conteúdo dos compêndios: Origens e Habilidades conforme o capítulo de
 * Criação de Personagem do livro oficial de ETMOS, mais as Aptidões de
 * Antagonista e o baralho de Partículas do SRD.
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
      _id: "etmoshab00000024", name: "Culinária (T)", folder: "etmosfolhabteor0",
      img: "icons/svg/tankard.svg",
      system: {
        categoria: "Teórica", bonus: 0,
        description: p("Você estudou e aprendeu a cozinhar de verdade. Uma vez por dia, cada personagem que coma dos pratos que você preparar recupera 1 Ferimento a mais durante o próximo descanso. Com ingredientes mágicos, você também pode conferir a quem partilhar da comida ou +1 ao Limite de Estresse, ou +1 ao Limite de Ferimentos.")
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
        description: p("Você aprendeu 2 novos idiomas quaisquer. Você pode escolher essa habilidade mais de uma vez.")
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
        categoria: "Teórica", bonus: 1,
        description: p("Você ganha um bônus de +1 para qualquer Teste que faça que envolva seres Mundanos diferentes de você.")
      }
    },
    {
      _id: "etmoshab00000031", name: "Comunicação de Intenção (T)", folder: "etmosfolhabteor0",
      img: "icons/svg/sound.svg",
      system: {
        categoria: "Teórica", bonus: 0,
        description: p("Você consegue distinguir intenções, ideias e emoções simples de qualquer criatura, independente de idioma. Você pode fazer um Teste de Alma Dificuldade 8, para entender e se fazer entendido por qualquer criatura, mesmo que não compartilhem um idioma em comum.")
      }
    },
    {
      _id: "etmoshab00000032", name: "Artista (P)", folder: "etmosfolhabprat0",
      img: "icons/svg/sound.svg",
      system: {
        categoria: "Prática", bonus: 0,
        description: p("A personagem pode realizar uma performance artística com duração de pelo menos 10 minutos. Todos que assistirem à apresentação recuperam 3 Pontos de Estresse. Uma pessoa só pode usufruir desse efeito uma vez por dia.")
      }
    },
    {
      _id: "etmoshab00000033", name: "Aperfeiçoamento Corporal (P)", folder: "etmosfolhabprat0",
      img: "icons/svg/upgrade.svg",
      system: {
        categoria: "Prática", bonus: 0,
        description: p("A personagem treinou seus músculos e aperfeiçoou seu corpo. Ao sofrer Ferimentos, você pode optar por reduzi-los em 1, até um mínimo de 1. Você pode usar essa Habilidade um número de vezes igual ao seu valor de Corpo −1, recuperando os usos ao final do próximo Descanso Completo.")
      }
    },
    {
      _id: "etmoshab00000034", name: "Artesão (P)", folder: "etmosfolhabprat0",
      img: "icons/svg/anvil.svg",
      system: {
        categoria: "Prática", bonus: 0,
        description: p("Você treinou para criar Encantamentos. Ao escolher essa Habilidade, escolha a Especialização de Artífice (Veículos Persistentes) ou Alquimista (Veículos Consumíveis) — cada escolha dá +1 no bônus de Preparo para o tipo de Veículo correspondente. Pode ser escolhida até 3 vezes; a cada vez, sobe a categoria de item mágico que pode criar (Simples, Sofisticado ou Primoroso).")
      }
    },
    {
      _id: "etmoshab00000035", name: "Direção e Montaria (P)", folder: "etmosfolhabprat0",
      img: "icons/svg/direction.svg",
      system: {
        categoria: "Prática", bonus: 2,
        description: p("Você aprendeu a dirigir veículos e cavalgar montarias terrestres. Ao escolher novamente, torna-se hábil também com veículos e montarias voadores e aquáticos. Some +2 nos Testes dessa Habilidade para cada vez em que foi escolhida.")
      }
    },
    {
      _id: "etmoshab00000036", name: "Expert à Distância (P)", folder: "etmosfolhabprat0",
      img: "icons/svg/target.svg",
      system: {
        categoria: "Prática", bonus: 0,
        description: p("Ataques de arma à Distância passam a causar 1 Ferimento extra. Você pode escolher essa habilidade mais de uma vez; a cada vez, aumente o Ferimento causado em +1.")
      }
    },
    {
      _id: "etmoshab00000037", name: "Expert Corpo-a-Corpo (P)", folder: "etmosfolhabprat0",
      img: "icons/svg/combat.svg",
      system: {
        categoria: "Prática", bonus: 0,
        description: p("Ataques corporais passam a causar 1 Ferimento extra. Você pode escolher essa habilidade até 2 vezes; a cada vez, aumente o Ferimento causado em +1.")
      }
    },
    {
      _id: "etmoshab00000038", name: "Protetor (P)", folder: "etmosfolhabprat0",
      img: "icons/svg/mage-shield.svg",
      system: {
        categoria: "Prática", bonus: 1,
        description: p("Você ganha um bônus de +1 em Testes que realize em decorrência de uma Reação feita para proteger uma criatura diferente de você.")
      }
    },
    {
      _id: "etmoshab00000039", name: "Reflexos Mágicos (P)", folder: "etmosfolhabprat0",
      img: "icons/svg/lightning.svg",
      system: {
        categoria: "Prática", bonus: 0,
        description: p("A personagem pode utilizar qualquer Complexidade de magia para uma Reação de Defesa contra ataques corpo a corpo ou à distância não mágicos, desde que tenha o valor de Mente necessário para essa Complexidade.")
      }
    },
    {
      _id: "etmoshab00000040", name: "Rituais de Adivinhação (P)", folder: "etmosfolhabprat0",
      img: "icons/svg/eye.svg",
      system: {
        categoria: "Prática", bonus: 0,
        description: p("A personagem executa um ritual para questionar as forças da natureza, espíritos ou ver o futuro. Faça um ritual de Alma Dificuldade 10; num sucesso, faça uma pergunta de Sim ou Não ao Narrador, que responde de forma simbólica, críptica ou direta. Acumula 4 Pontos de Estresse e só pode ser feito uma vez por sessão de jogo.")
      }
    },
    {
      _id: "etmoshab00000041", name: "Acuidade Mágica (T)", folder: "etmosfolhabteor0",
      img: "icons/svg/daze.svg",
      system: {
        categoria: "Teórica", bonus: 0,
        description: p("Sua personagem reconhece mais rápido magias conjuradas. Você ganha um bônus de +1 nos testes de Conjuração ao realizar magias como Reação a outra conjurada.")
      }
    },
    {
      _id: "etmoshab00000042", name: "Fanático por Fantásticos (T)", folder: "etmosfolhabteor0",
      img: "icons/svg/pawprint.svg",
      system: {
        categoria: "Teórica", bonus: 1,
        description: p("Escolha um tipo de Ficha Base de criatura. Você ganha um bônus de +1 para qualquer Teste que faça que envolva tal tipo de criatura.")
      }
    },
    {
      _id: "etmoshab00000043", name: "Magia Entre Nós (T)", folder: "etmosfolhabteor0",
      img: "icons/svg/aura.svg",
      system: {
        categoria: "Teórica", bonus: 2,
        description: p("A personagem aprendeu a encontrar magia no Mundano. Você pode escolher essa Habilidade mais de uma vez; a cada vez, some +2 nos Testes para localizar itens mágicos, santuários ou sinais de magia.")
      }
    },
    {
      _id: "etmoshab00000044", name: "Pesquisador (T)", folder: "etmosfolhabteor0",
      img: "icons/svg/book.svg",
      system: {
        categoria: "Teórica", bonus: 1,
        description: p("A personagem sabe as melhores formas de obter conhecimento e informações acadêmicas. Ganha um bônus de +1 em qualquer Teste de Habilidade ou de Atributo que envolva obtenção de informação.")
      }
    },
    {
      _id: "etmoshab00000045", name: "Técnicas de Apoio (T)", folder: "etmosfolhabteor0",
      img: "icons/svg/regen.svg",
      system: {
        categoria: "Teórica", bonus: 0,
        description: p("A personagem estudou as melhores formas de auxiliar outros magicamente. Ao conjurar uma magia em uma criatura voluntária, a magia acumula 1 ponto de Estresse a menos do que o normal, até um mínimo de 1.")
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
    { _id: "etmosfolorifant0", name: "Origens Fantásticas", folder: null, sort: 200000 },
    { _id: "etmosfoloriambos", name: "Origens (Mundano e Fantástico)", folder: null, sort: 300000 }
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
        description: p("Desde cedo, sua personagem demonstrou aptidão para lidar com o Fantástico e o Etmos, sendo um verdadeiro prodígio. Você começa o jogo com uma Característica adicional em seu Grimório.")
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
        categoria: "Mundana", exclusiva: true,
        description: p("Durante sua educação formal, você sempre foi um bom aluno e aprendeu os melhores métodos para absorver informações e aprender. Você começa o jogo com a Habilidade \"Conhecimento em...\".")
      }
    },
    {
      _id: "etmosori00000008", name: "Ensino Formal Mundano", folder: "etmosfolorimund0",
      img: "icons/svg/village.svg",
      system: {
        categoria: "Mundana", exclusiva: false,
        description: p("Você foi instruído nos meios Mundanos. Sempre que fizer um teste de Habilidade para obter informações ou para interagir com o Mundo Mundano, ganhará um bônus de +1. Não se aplica para afetar seres Mundanos com magias.")
      }
    },
    {
      _id: "etmosori00000009", name: "Viajado", folder: "etmosfoloriambos",
      img: "icons/svg/direction.svg",
      system: {
        categoria: "Ambos", exclusiva: false,
        description: p("Você passou boa parte de sua criação e formação viajando. Você pode começar o jogo com uma das seguintes Habilidades:") +
          "<ul><li>Linguista;</li><li>Sobrevivência;</li><li>Culinária.</li></ul>"
      }
    },
    {
      _id: "etmosori00000010", name: "Criado em Dois Mundos", folder: "etmosfoloriambos",
      img: "icons/svg/temple.svg",
      system: {
        categoria: "Ambos", exclusiva: false,
        description: p("Desde sempre você sabia da existência de ambos os mundos, tendo sido criado nos dois. Você ganha um bônus de +1 em seus Testes que envolvem interagir socialmente com seres Mundanos que estejam no Fantástico, ou com seres Fantásticos que estejam no Mundano.")
      }
    },
    {
      _id: "etmosori00000011", name: "Criado no Fantástico", folder: "etmosfolorifant0",
      img: "icons/svg/eye.svg",
      system: {
        categoria: "Fantástica", exclusiva: false,
        description: p("Você cresceu no Mundo Fantástico e tem mais facilidade para compreender como ele funciona. Sempre que fizer um teste de Habilidade para obter informações ou para interagir com o Mundo Fantástico, ganhará um bônus de +1. Não se aplica para afetar seres Fantásticos com magias.")
      }
    },
    {
      _id: "etmosori00000012", name: "Charme Fantástico", folder: "etmosfolorifant0",
      img: "icons/svg/angel.svg",
      system: {
        categoria: "Fantástica", exclusiva: true,
        description: p("Há um encanto natural que te acompanha. Você pode tentar influenciar uma pessoa com quem esteja conversando cara a cara. O alvo realiza um teste de Mente, dificuldade 7; com uma falha, torna-se receptivo a você — não é compelido a seguir seus desejos, mas fica propenso a ajudar ou fornecer informações. O efeito cessa após 5 minutos, e o alvo não entende que foi afetado. Você acumula 1 ponto de Estresse ao usar essa Característica.")
      }
    },
    {
      _id: "etmosori00000013", name: "Espírito Forte", folder: "etmosfolorifant0",
      img: "icons/svg/aura.svg",
      system: {
        categoria: "Fantástica", exclusiva: false, ajusteEstresse: 2,
        description: p("Seja por ter treinado ou nascido dessa forma, você possui um espírito mais forte que o normal. Aumente seu Limite de Estresse em 2.")
      }
    },
    {
      _id: "etmosori00000014", name: "Sortudo", folder: "etmosfolorifant0",
      img: "icons/svg/sun.svg",
      system: {
        categoria: "Fantástica", exclusiva: false,
        description: p("Dotado de uma sorte sobrenatural, sua personagem sempre pareceu favorecida pelo acaso. Uma vez por dia, você pode rerrolar 1d6 de um Teste que tenha feito e optar pelo melhor resultado.")
      }
    },
    {
      _id: "etmosori00000015", name: "Afinidade Natural", folder: "etmosfolorifant0",
      img: "icons/svg/fire.svg",
      system: {
        categoria: "Fantástica", exclusiva: true,
        description: p("A fisiologia de seu ser Fantástico lhe garante certa afinidade com um elemento da natureza (Fogo, Eletricidade, Água, Terra ou Venenoso). Sempre que sofrer Ferimentos provenientes desse elemento, reduza o Ferimento em 1, até um mínimo de 1.")
      }
    },
    {
      _id: "etmosori00000016", name: "Audição Sensível", folder: "etmosfolorifant0",
      img: "icons/svg/sound.svg",
      system: {
        categoria: "Fantástica", exclusiva: false,
        description: p("Você discerne ruídos e sussurros com clareza e ouve com perfeição sons de baixa frequência. Se estiver no Mundano ao usar essa Habilidade, acumula 1 ponto de Estresse a cada 10 minutos de uso.")
      }
    },
    {
      _id: "etmosori00000017", name: "Mão na Massa", folder: "etmosfolorifant0",
      img: "icons/svg/anvil.svg",
      system: {
        categoria: "Fantástica", exclusiva: false,
        description: p("Sua personagem teve contato muito cedo com formas de Encantamento. Você começa o jogo com a Habilidade \"Artesão\".")
      }
    },
    {
      _id: "etmosori00000018", name: "Meio Humano", folder: "etmosfolorifant0",
      img: "icons/svg/portal.svg",
      system: {
        categoria: "Fantástica", exclusiva: true,
        description: p("Apesar de ser considerada Fantástica, um dos pais da personagem é humano. Você pode cruzar Portais do Meio e existir no Mundano sem um Totem ou Santuário, por um número de horas igual ao seu valor de Corpo +1. Após esse tempo, desaparece do Mundano e retorna ao Fantástico, sofrendo Ferimentos e acumulando Estresse até ficar no limite de ambos. Você ainda precisa de um Totem ou Santuário para conjurar magias.")
      }
    },
    {
      _id: "etmosori00000019", name: "Memória Fotográfica", folder: "etmosfoloriambos",
      img: "icons/svg/daze.svg",
      system: {
        categoria: "Ambos", exclusiva: false,
        description: p("Você relembra imagens com muita precisão após vê-las uma única vez, ganhando um bônus de +2 em Testes para lembrar informações. Além disso, uma vez por sessão de jogo, você pode perguntar ao Narrador se lembra de alguma informação relevante sobre a história corrente; o Narrador pode solicitar um Teste de Mente com Dificuldade decidida por ele.")
      }
    },
    {
      _id: "etmosori00000020", name: "Metamorfo", folder: "etmosfolorifant0",
      img: "icons/svg/pawprint.svg",
      system: {
        categoria: "Fantástica", exclusiva: true,
        description: p("A fisiologia de seu ser Fantástico permite alterar sua aparência física. Cada transformação acumula 2 pontos de Estresse. Você deve manter sua anatomia geral e estatura. O efeito dura até 8 horas, ou até você decidir encerrá-lo para voltar à forma original.")
      }
    },
    {
      _id: "etmosori00000021", name: "Piloto", folder: "etmosfolorimund0",
      img: "icons/svg/direction.svg",
      system: {
        categoria: "Mundana", exclusiva: true,
        description: p("Em algum momento de sua vida, você aprendeu a pilotar veículos terrestres. Você começa o jogo com a Habilidade \"Direção e Montaria\".")
      }
    },
    {
      _id: "etmosori00000022", name: "Treinamento Formal em Combate", folder: "etmosfolorimund0",
      img: "icons/svg/sword.svg",
      system: {
        categoria: "Mundana", exclusiva: true,
        description: p("Você conhece técnicas de combate desarmado, com armas corporais ou à distância. Você começa o jogo com uma das seguintes Habilidades:") +
          "<ul><li>Armas Brancas;</li><li>Armas de Longo Alcance.</li></ul>"
      }
    },
    {
      _id: "etmosori00000023", name: "Visão no Escuro", folder: "etmosfolorifant0",
      img: "icons/svg/eye.svg",
      system: {
        categoria: "Fantástica", exclusiva: false,
        description: p("Você enxerga em tons de cinza na escuridão completa, a até 30 m de distância, mas não distingue cores. Se estiver no Mundano ao usá-la, acumula 1 ponto de Estresse a cada 10 minutos de uso.")
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
 * Baralho de Partículas usando a arte oficial do baralho "Etmos Spells",
 * distribuído gratuitamente pela Editora Balde Galáctico. Cada carta usa a
 * imagem em assets/particulas/<id>.png (categoria, nome e abreviação
 * impressos na arte) e o verso comum _verso.png. Os dados (nome, abreviação,
 * categoria) vêm de ETMOS.particulas.
 */
const FACE = id => `systems/etmos/assets/particulas/${id}.png`;
const VERSO_CARTA = "systems/etmos/assets/particulas/_verso.png";

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
    back: { name: `${part.nome} - ${part.abrev}`, text: "", img: VERSO_CARTA },
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
          "para sortear/combinar ao montar Frases Mágicas. Arte do baralho \"Etmos Spells\", " +
          "distribuído gratuitamente pela Editora Balde Galáctico.</p>",
        img: VERSO_CARTA,
        cards: baralhoParticulas()
      }
    ]
  }
};

/* ------------------------------------------------------------------ */
/* Macro Pack: etmos-macros                                            */
/* ------------------------------------------------------------------ */

/**
 * Macros úteis. O comando de cada macro é lido de um arquivo em macros/
 * pelo build (tools/build-packs.mjs), mantendo o JS editável e limpo.
 */
export const MACRO_PACKS = {
  "etmos-macros": {
    macros: [
      {
        _id: "etmosmacroconjur",
        name: "Conjurar Frase Mágica (Epic 3D Card Reveal)",
        img: "icons/svg/book.svg",
        file: "macros/conjurar-frase-magica.js"
      }
    ]
  }
};
