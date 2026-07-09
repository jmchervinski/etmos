# ETMOS para Foundry VTT (Sistema Não-Oficial)

> ⚠️ **Sistema NÃO-OFICIAL, feito por fã.**
>
> **ETMOS** é um RPG de fantasia urbana sobre linguagem, engenhosidade e magia,
> criado por **Rafa Reis** e publicado pela **Editora Balde Galáctico**.
>
> - **Autor:** Rafa Reis
> - **Direção:** Lucas Basso Salgado
> - **Edição:** Rayana Fridlund e Vinícius Ferreira Barth
> - **Projeto Gráfico, Design e Diagramação:** Iago Pacheco
> - **Ilustração:** Vinícius Ferreira Barth
>
> Este projeto não é afiliado, endossado ou patrocinado pela Editora Balde Galáctico.
> Conheça o jogo, baixe os materiais gratuitos (SRD, Baixe e Jogue, baralho de
> Partículas) e **apoie a publicação oficial**: https://baldegalactico.com.br/jogo/etmos/

Implementação para [Foundry Virtual Tabletop](https://foundryvtt.com/) das mecânicas
descritas no **SRD ETMOS 1.1**, distribuído gratuitamente pela editora. Compatível
com o Foundry **v13** e **v14**.

## Recursos

- **Fichas de Personagem, NPC/Criatura e Familiar**, com abas de Ficha, Conceito,
  Grimório, Progressão, Encantamento e Configurações.
- **Rolagens automatizadas**: Testes de Atributo (2d6 + bônus) com diálogo de bônus
  situacional e Dados de Empenho, Teste de Conjuração e Conjuração de magias, que
  aplica toda a cadeia do SRD (Complexidade Máxima, Fadiga, acúmulo de Estresse).
- **Limites derivados** de Ferimentos e Estresse, com estados de Fadiga e de
  consciência calculados automaticamente e ajustes vindos de Origens/Habilidades
  (ex.: "Atleta" = +1 Ferimento) ou manuais (homebrews).
- **Progressão**: Marcos de Crescimento, opções de Bônus de Progressão por nível,
  tabela de referência e botão de **subir de nível** ao completar todas as categorias.
- **Encantamento de Itens** com calculadora de Pontos de Preparo (Grau, Veículo,
  Ferramentas, Frase, Habilidade Artesão e Sessões).
- **Módulos opcionais** (ativáveis na aba Configurações): **Familiares** (ficha
  própria, Força do Pacto e conjuração através do Familiar) e **Proezas**
  (Rudimentos e Teste de Proeza; Limite de Estresse 6 + Alma).
- **Compêndios do SRD**: Habilidades (Práticas e Teóricas), Origens (Mundanas e
  Fantásticas), Aptidões de Antagonista e um **baralho de Partículas** (80 cartas).

## Mecânicas do SRD ETMOS 1.1 implementadas

| Regra (SRD) | Implementação |
|---|---|
| Atributos Corpo/Mente/Alma (0–6) | Data Models com validação |
| Testes: 2d6 + bônus vs Dificuldade (base 6) | Diálogo de teste na ficha + `actor.rollTestDialog()` |
| Teste de Conjuração: 2d6 + Alma | Botão "Teste de Conjuração" |
| Limite de Ferimentos = 4 + 1 a cada 2 de Corpo | Derivado automaticamente (PJs) |
| Limite de Estresse = 4 + Alma | Derivado automaticamente (PJs) |
| Ferimentos/Estresse **acumulam** de 0 até o Limite | Modelo de dados correto (não é HP) |
| Inconsciente acima do Limite; morte a Limite+4 | Estado derivado e exibido na ficha |
| Complexidade Máxima: Mente 2+ Difícil / 4+ Complexa / 6 Milagre | Derivado de Mente |
| Estresse por magia: 0/1/2/4/7 (Trivial→Milagre) | `actor.conjurarMagia()` automatiza |
| Rank de Totem/Santuário (0–5) soma Estresse em não-triviais | Campo na conjuração e no item Equipamento |
| Fadiga: Cansado (1–5 acima), Exausto (6–8), Esgotado (9+) | Estado derivado |
| Exausto: 2d6 > Corpo+4 → magia falha (Estresse acumula) | Automatizado na conjuração |
| Esgotado: 2d6 > Corpo+3 → morte após conjurar | Automatizado na conjuração |
| +1 Ferimento sofrido em qualquer estado de Fadiga | `actor.aplicarFerimentos()` |
| Iniciativa = Teste de Corpo (2d6 + Corpo) | `CONFIG.Combat.initiative` |
| Movimento padrão 10 m | Grid padrão do sistema (10 m) |
| Descanso Parcial/Completo, Tratamento Médico, mundo de origem | `actor.descansar()` + botões |
| Dados de Empenho (re-rola d6, mantém o melhor) | Diálogo de teste na ficha |
| Marcos de Crescimento e Bônus de Progressão; subir de nível | Aba "Progressão" |
| Encantamento de Itens (Pontos de Preparo) | Aba "Encantamento" |
| Criação: 6 pts de Atributo (máx 4), 2 Origens, 2+2 Habilidades, Grimório 2F/3O/4C | Lembretes nas abas da ficha |
| Fichas Base de Antagonista com Limites manuais | Ficha de NPC (ex: Curupira, Corpo 3 / Limite 7) |
| Partículas (Função/Objeto/Característica/Complemento) | Item "particula" e baralho de Partículas |
| Habilidades Práticas/Teóricas, Origens (± Exclusiva), Aptidões/Ataques | Itens dedicados + compêndios |
| Módulos: Familiares (Pacto) e Proezas (Rudimentos) | Ativáveis na aba Configurações |

## Instalação

### Via manifesto (recomendado)

Em **Configuração → Sistemas de Jogo → Instalar Sistema**, cole a URL do manifesto:

```
https://github.com/jmchervinski/etmos/releases/latest/download/system.json
```

### Local (desenvolvimento)

Clone o repositório dentro da pasta de dados do Foundry (`Data/systems`) com o nome
`etmos`:

```bash
git clone https://github.com/jmchervinski/etmos.git etmos
```

Reinicie o Foundry e crie um mundo com o sistema **Etmos (Não-Oficial)**.

## Compêndios

Os compêndios ficam agrupados na pasta **ETMOS (SRD)** da barra lateral:

- **Etmos: Habilidades (SRD)** — Práticas e Teóricas, com a subpasta Conhecimento.
- **Etmos: Origens (SRD)** — Mundanas e Fantásticas.
- **Etmos: Aptidões de Antagonista (SRD)** — para montar criaturas.
- **Etmos: Baralho de Partículas (SRD)** — deck com as 80 Partículas.
- **Etmos: Macros** — macros úteis (ver Módulos recomendados abaixo).

O conteúdo dos compêndios é gerado a partir de `tools/pack-data.mjs`; para reconstruir
os bancos em `packs/`, rode `npm run build:packs`.

## Módulos recomendados

- **[Epic 3D Card Reveal](https://github.com/brunocalado/epic-3d-card-reveal)** —
  revela cartas em um leque 3D animado para a mesa toda. Combina muito bem com o
  **Baralho de Partículas**: o jogador escolhe as Partículas da sua Frase Mágica e
  elas são reveladas em sequência, com estilo.

### Macro: Conjurar Frase Mágica

O compêndio **Etmos: Macros** inclui a macro **"Conjurar Frase Mágica (Epic 3D Card
Reveal)"**, que abre uma janela com todas as Partículas do baralho agrupadas por
categoria; o jogador marca as Partículas **na ordem** em que quer revelar e, ao
confirmar, elas aparecem em leque 3D para a mesa.

> ⚠️ Esta macro **requer o módulo [Epic 3D Card Reveal](https://github.com/brunocalado/epic-3d-card-reveal)**
> instalado e ativo. Sem ele, a macro apenas avisa que o módulo está faltando.

Para usar (uma vez, como Narrador):

1. Instale e ative o módulo **Epic 3D Card Reveal**.
2. Importe o baralho **Etmos: Baralho de Partículas (SRD)** para o mundo (arraste da
   aba Cards do compêndio para a Cards Directory, ou clique direito → Import).
3. Importe a macro do compêndio **Etmos: Macros** para a hotbar.
4. Dê aos jogadores permissão de **Observer** (no mínimo) no baralho importado
   (botão direito no baralho → Configure Ownership).

Se você renomear o baralho no mundo, ajuste a constante `DECK_NAME` no topo da macro.

## Estrutura

```
etmos/
├─ system.json            # manifesto do sistema
├─ module/
│  ├─ etmos.mjs           # entry point: registra Data Models, documentos e sheets
│  ├─ config.mjs          # Partículas, Rudimentos, módulos e tabelas do SRD
│  ├─ data-models.mjs     # TypeDataModels (Actors e Items)
│  ├─ documents/          # EtmosActor (conjuração, fadiga, descanso) e EtmosItem
│  └─ sheets/             # fichas de Personagem, NPC, Familiar e Item
├─ templates/             # Handlebars das fichas (uma parte por aba)
├─ styles/etmos.css       # paleta visual de ETMOS (roxo, lavanda, lilás, dourado)
├─ packs/                 # compêndios (LevelDB)
├─ macros/                # macros incluídas nos compêndios
├─ tools/                 # fonte e build dos compêndios
└─ lang/                  # pt-BR e en
```

## Licença e conteúdo

O **código** deste repositório está sob licença MIT (ver `LICENSE`).

Todo o **conteúdo de regras, textos, nomes, Partículas e identidade visual de ETMOS
pertence a Rafa Reis e à Editora Balde Galáctico** ("Todo material apresentado neste
site tem uso controlado"). Este repositório implementa apenas as mecânicas descritas
no **SRD ETMOS 1.1**, distribuído gratuitamente pela editora. Não redistribua o livro,
as ilustrações ou o baralho oficial junto com este sistema. Antes de publicar
compêndios com textos do jogo, consulte a editora: https://baldegalactico.com.br/fale-conosco/
