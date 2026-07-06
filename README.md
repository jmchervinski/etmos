# ETMOS para Foundry VTT (Sistema Não-Oficial)

> ⚠️ **Este é um sistema NÃO-OFICIAL, feito por fã.**
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
> Conheça, baixe os materiais gratuitos (SRD, Baixe e Jogue, baralho de Partículas)
> e **apoie o jogo oficial**: https://baldegalactico.com.br/jogo/etmos/

Estrutura inspirada no sistema comunitário [morkborg-foundry-vtt](https://github.com/fvtt-fria-ligan/morkborg-foundry-vtt)
e no [guia oficial de desenvolvimento de sistemas do Foundry](https://foundryvtt.com/article/system-development/).

## Mecânicas do SRD ETMOS 1.1 implementadas

| Regra (SRD) | Implementação |
|---|---|
| Atributos Corpo/Mente/Alma (0–6) | Data Models com validação |
| Testes: 2d6 + bônus vs Dificuldade (base 6) | Botões na ficha + `actor.rollTest()` |
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
| Dados de Empenho | Campo rastreável na ficha |
| Marcos de Crescimento (Físicos/Mentais/Emocionais, 5 cada) | Aba "Marcos" |
| Criação: 6 pts de Atributo (máx 4), 2 Origens, 2+2 Habilidades, Grimório 2F/3O/4C | Lembretes nas abas da ficha |
| Fichas Base de Antagonista com Limites manuais | Ficha de NPC (ex: Curupira, Corpo 3 / Limite 7) |
| Partículas (Função/Objeto/Característica/Complemento) | Item "particula" |
| Habilidades Práticas/Teóricas, Origens (± Exclusiva), Aptidões/Ataques | Itens dedicados |

Ainda não implementado (roadmap): construtor visual de Frase Mágica combinando as
cartas do Grimório; compêndios populados com as Partículas do SRD; Encantamento de
Itens (Pontos de Preparo); Segmentos de Jogo; Teste Contestado assistido.

## Instalação local (desenvolvimento)

1. Encontre a pasta de dados do Foundry (`Data/systems`).
2. Clone este repositório lá dentro com o nome `etmos`:
   ```bash
   git clone https://github.com/jmchervinski/etmos.git etmos
   ```
3. Reinicie o Foundry e crie um mundo com o sistema **Etmos (Não-Oficial)**.

## Instalação via manifesto (após publicar release)

```
https://github.com/jmchervinski/etmos/releases/latest/download/system.json
```

## Estrutura (conforme o guia oficial do Foundry)

```
etmos/
├─ system.json            # manifesto (com documentTypes)
├─ module/
│  ├─ etmos.mjs           # entry point: registra Data Models, docs e sheets
│  ├─ data-models.mjs     # TypeDataModels (padrão recomendado, sem template.json)
│  ├─ documents/          # EtmosActor (conjuração, fadiga, descanso) e EtmosItem
│  └─ sheets/             # ActorSheet / ItemSheet
├─ templates/             # Handlebars das fichas
├─ styles/etmos.css       # paleta visual de ETMOS (roxo, lavanda, lilás, dourado)
├─ lang/                  # pt-BR e en
└─ packs/                 # compêndios (a popular)
```

## Publicando uma release

1. Atualize `version` no `system.json`.
2. Zipe o **conteúdo** da pasta como `system.zip`.
3. Crie uma Release no GitHub (tag `v0.2.0`) anexando `system.json` e `system.zip`.

## Licença e conteúdo

O **código** deste repositório está sob licença MIT (ver `LICENSE`).
Todo o **conteúdo de regras, textos, nomes, Partículas e identidade visual de ETMOS
pertence a Rafa Reis e à Editora Balde Galáctico** ("Todo material apresentado neste
site tem uso controlado"). Este repositório implementa apenas as mecânicas descritas
no **SRD ETMOS 1.1**, distribuído gratuitamente pela editora. Não redistribua o livro,
as ilustrações ou o baralho oficial junto com este sistema. Antes de publicar
compêndios com textos do jogo, consulte a editora: https://baldegalactico.com.br/fale-conosco/
