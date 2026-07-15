/**
 * ═══════════════════════════════════════════════════════════════
 * ETMOS · Conjurar Frase Mágica (seleção + revelação de partículas)
 * ───────────────────────────────────────────────────────────────
 * Abre uma janela com todas as partículas do baralho, agrupadas por
 * categoria (Função / Objeto / Característica / Complemento). O
 * jogador marca as partículas NA ORDEM em que quer revelar — um
 * selo numerado aparece em cada uma conforme é marcada — e clica em
 * Revelar. As cartas são reveladas na ordem escolhida, pra mesa toda.
 *
 * Funciona com QUALQUER UM destes módulos de revelação:
 *   • "Epic 3D Card Reveal" — revela todas de uma vez, em leque 3D.
 *   • "Orcnog Card Viewer"  — revela uma carta por vez, em sequência
 *                             (requer também o módulo "socketlib").
 * Se os dois estiverem ativos, a macro pergunta qual usar.
 *
 * PRÉ-REQUISITOS (fazer uma vez, como Mestre):
 *   1. Instalar e ativar UM dos módulos acima.
 *   2. Importar o compêndio "Etmos: Baralho de Partículas (SRD)"
 *      pra dentro do mundo (arraste da aba Cards da compendium
 *      pra Cards Directory, ou clique direito → Import).
 *   3. Conferir o nome exato do baralho importado (ele aparece na
 *      Cards Directory) e ajustar DECK_NAME abaixo se for diferente.
 *   4. Dar aos jogadores permissão de OBSERVER (no mínimo) nesse
 *      baralho: botão direito no baralho → Configure Ownership.
 * ═══════════════════════════════════════════════════════════════
 */

// ====================== CONFIGURAÇÃO ======================
const DECK_NAME = "Baralho de Partículas (SRD)"; // ajuste se o nome no seu mundo for diferente
const MIN_PARTICULAS = 2;                         // mínimo de partículas pra formar uma frase
const REVELADOR = "auto";     // "auto" | "epic" | "orcnog" — força um módulo, se quiser
const PAUSA_ORCNOG_MS = 900;  // intervalo entre cartas no Orcnog Card Viewer
// ============================================================

const temEpic = game.modules.get("epic-3d-card-reveal")?.active === true;
const temOrcnog = game.modules.get("orcnog-card-viewer")?.active === true;

if (!temEpic && !temOrcnog) {
  ui.notifications.error("Nenhum módulo de revelação ativo. Ative o \"Epic 3D Card Reveal\" ou o \"Orcnog Card Viewer\".");
  return;
}
if (REVELADOR === "epic" && !temEpic) {
  ui.notifications.error("REVELADOR está fixado em \"epic\", mas o módulo Epic 3D Card Reveal não está ativo.");
  return;
}
if (REVELADOR === "orcnog" && !temOrcnog) {
  ui.notifications.error("REVELADOR está fixado em \"orcnog\", mas o módulo Orcnog Card Viewer não está ativo.");
  return;
}

const deck = game.cards.getName(DECK_NAME);
if (!deck) {
  ui.notifications.error(`Baralho "${DECK_NAME}" não encontrado. Confira o nome exato na Cards Directory e ajuste DECK_NAME no topo da macro.`);
  return;
}
if (!deck.cards.size) {
  ui.notifications.warn(`O baralho "${DECK_NAME}" está vazio.`);
  return;
}

// Agrupa as cartas por categoria (campo "suit": Função/Objeto/Característica/Complemento)
const porCategoria = {};
for (const c of deck.cards.contents.sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0))) {
  const cat = c.suit || "Outras";
  (porCategoria[cat] ??= []).push(c);
}

// Layout em TABELA, sem nenhum atributo onclick/onchange inline no HTML —
// o Foundry bloqueia handlers inline por política de segurança (CSP), então
// os eventos são ligados via addEventListener depois que a janela renderiza
// (ver o Hooks.once("renderDialogV2", ...) mais abaixo).
const secoesHtml = Object.entries(porCategoria).map(([categoria, cartas]) => `
  <fieldset style="margin-bottom:10px;border:1px solid var(--color-border-light-tertiary,#999);border-radius:4px;">
    <legend style="padding:0 6px;font-weight:bold;">${categoria}</legend>
    <table style="width:100%;border-collapse:collapse;">
      <tbody>
        ${cartas.map(c => `
          <tr class="fm-row" data-id="${c.id}" style="cursor:pointer;">
            <td style="width:20px;text-align:center;padding:3px 2px;">
              <span class="frase-magica-badge" style="display:inline-block;width:16px;height:16px;line-height:16px;text-align:center;border-radius:50%;background:goldenrod;color:#000;font-size:10px;font-weight:bold;visibility:hidden;">0</span>
            </td>
            <td style="width:20px;padding:3px 2px;">
              <input type="checkbox" class="fm-check" data-particula-id="${c.id}">
            </td>
            <td style="width:24px;padding:3px 2px;">
              <img src="${c.faces[0].img}" width="20" height="20">
            </td>
            <td style="padding:3px 6px;font-size:12px;white-space:nowrap;">${c.name}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  </fieldset>
`).join("");

const content = `
  <p>Selecione as partículas <b>na ordem</b> em que devem ser reveladas (mínimo ${MIN_PARTICULAS}):</p>
  <div style="max-height:55vh;overflow-y:auto;padding-right:8px;">${secoesHtml}</div>
  <p id="frase-magica-contador" style="margin-top:8px;font-size:12px;color:var(--color-text-dark-secondary,#666);">
    Nenhuma partícula selecionada ainda.
  </p>
`;

// Estado da seleção, na ordem em que o jogador clica.
const ordem = [];

function atualizarLinha(row) {
  const id = row.dataset.id;
  const badge = row.querySelector(".frase-magica-badge");
  const idx = ordem.indexOf(id);
  if (idx >= 0) {
    badge.textContent = idx + 1;
    badge.style.visibility = "visible";
    row.style.background = "rgba(218,165,32,0.18)";
  } else {
    badge.textContent = "";
    badge.style.visibility = "hidden";
    row.style.background = "transparent";
  }
}

function alternar(checkbox, root) {
  const id = checkbox.dataset.particulaId;
  const pos = ordem.indexOf(id);
  if (checkbox.checked) {
    if (pos === -1) ordem.push(id);
  } else if (pos !== -1) {
    ordem.splice(pos, 1);
  }
  const contador = root.querySelector("#frase-magica-contador");
  if (contador) {
    contador.textContent = ordem.length
      ? `${ordem.length} partícula(s) selecionada(s), na ordem marcada.`
      : "Nenhuma partícula selecionada ainda.";
  }
  root.querySelectorAll("tr.fm-row").forEach(atualizarLinha);
}

// Liga os eventos assim que a janela do diálogo é desenhada — via addEventListener
// de verdade, não atributo inline, pra não ser bloqueado pela política de segurança.
Hooks.once("renderDialogV2", (app) => {
  const root = app.element;
  if (!root) return;

  root.querySelectorAll(".fm-check").forEach(cb => {
    cb.addEventListener("change", () => alternar(cb, root));
  });

  root.querySelectorAll("tr.fm-row").forEach(row => {
    row.addEventListener("click", (event) => {
      if (event.target.tagName === "INPUT") return; // o próprio checkbox já trata o "change"
      const cb = row.querySelector(".fm-check");
      cb.checked = !cb.checked;
      alternar(cb, root);
    });
  });
});

const confirmou = await foundry.applications.api.DialogV2.wait({
  window: { title: "🔮 Conjurar Frase Mágica", resizable: true },
  position: { width: 520, height: "auto" },
  content,
  buttons: [
    { action: "revelar", label: "✨ Revelar", default: true, callback: () => true },
    { action: "cancelar", label: "Cancelar", callback: () => false }
  ],
  rejectClose: false
});

console.log("ETMOS | confirmou:", confirmou, "| selecionadas:", ordem);

if (!confirmou || !ordem.length) {
  ui.notifications.warn("Nada foi selecionado (ou você cancelou).");
  return;
}

if (ordem.length < MIN_PARTICULAS) {
  ui.notifications.warn(`Selecione pelo menos ${MIN_PARTICULAS} partículas pra formar uma frase.`);
  return;
}

const idsInvalidos = ordem.filter(id => !deck.cards.get(id));
if (idsInvalidos.length) {
  console.error("ETMOS | IDs não encontrados no baralho:", idsInvalidos);
  ui.notifications.error(`${idsInvalidos.length} partícula(s) selecionada(s) não foram encontradas no baralho. Veja o console (F12).`);
  return;
}

// Define qual módulo usar: o fixado em REVELADOR, o único ativo, ou pergunta.
let usar = REVELADOR;
if (usar === "auto") {
  if (temEpic && temOrcnog) {
    usar = await foundry.applications.api.DialogV2.wait({
      window: { title: "Revelar com qual módulo?" },
      content: "<p>Os dois módulos de revelação estão ativos. Qual usar para esta conjuração?</p>",
      buttons: [
        { action: "epic", label: "Epic 3D Card Reveal (leque)", default: true, callback: () => "epic" },
        { action: "orcnog", label: "Orcnog Card Viewer (uma a uma)", callback: () => "orcnog" }
      ],
      rejectClose: false
    });
    if (!usar) return; // fechou o diálogo
  } else {
    usar = temEpic ? "epic" : "orcnog";
  }
}

// Revela as partículas escolhidas pra mesa toda, respeitando a ordem escolhida
try {
  if (usar === "epic") {
    // Epic 3D Card Reveal: todas de uma vez, em leque 3D
    await EpicCards.Dealer({ deckName: DECK_NAME }).view(ordem, false, false, true);
  } else {
    // Orcnog Card Viewer: uma carta por vez, em sequência
    // api.view(deckName, card, faceDown, whisper, share)
    const api = game.modules.get("orcnog-card-viewer")?.api;
    if (!api?.view) throw new Error("API do Orcnog Card Viewer indisponível (o módulo está ativo e atualizado?).");
    for (let i = 0; i < ordem.length; i++) {
      await api.view(DECK_NAME, ordem[i], false, false, true);
      if (i < ordem.length - 1 && PAUSA_ORCNOG_MS > 0) {
        await new Promise(r => setTimeout(r, PAUSA_ORCNOG_MS));
      }
    }
  }
} catch (err) {
  console.error("ETMOS | Erro ao revelar:", err);
  ui.notifications.error(`Erro ao revelar: ${err.message}`);
}
