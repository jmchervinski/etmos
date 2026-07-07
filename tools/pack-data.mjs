/**
 * Conteúdo dos compêndios (SRD ETMOS 1.1 — "Exemplo de Habilidades",
 * "Exemplo de Origens" e "Exemplo de Aptidões").
 * Fonte de verdade: edite aqui e rode `npm run build:packs`.
 *
 * ETMOS © Rafa Reis / Editora Balde Galáctico. Textos do SRD, distribuído
 * gratuitamente pela editora.
 */

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
