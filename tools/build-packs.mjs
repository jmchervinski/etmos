/**
 * Gera os compêndios LevelDB em packs/ a partir de tools/pack-data.mjs,
 * usando a CLI oficial do Foundry (@foundryvtt/foundryvtt-cli).
 * Uso: npm run build:packs
 */
import fs from "node:fs";
import path from "node:path";
import { compilePack } from "@foundryvtt/foundryvtt-cli";
import { PACKS, CARD_PACKS } from "./pack-data.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC = path.join(ROOT, "packs-src");
const OUT = path.join(ROOT, "packs");

const ID_RE = /^[a-zA-Z0-9]{16}$/;

fs.rmSync(SRC, { recursive: true, force: true });

for (const [packName, dados] of Object.entries(PACKS)) {
  const dir = path.join(SRC, packName);
  fs.mkdirSync(dir, { recursive: true });
  const ids = new Set();

  for (const f of dados.folders) {
    if (!ID_RE.test(f._id) || ids.has(f._id)) throw new Error(`id inválido/duplicado: ${f._id}`);
    ids.add(f._id);
    const doc = {
      _id: f._id,
      _key: `!folders!${f._id}`,
      name: f.name,
      type: "Item",
      folder: f.folder ?? null,
      sorting: "a",
      sort: f.sort ?? 0,
      color: null,
      flags: {}
    };
    fs.writeFileSync(path.join(dir, `folder-${f._id}.json`), JSON.stringify(doc, null, 2));
  }

  dados.items.forEach((i, idx) => {
    if (!ID_RE.test(i._id) || ids.has(i._id)) throw new Error(`id inválido/duplicado: ${i._id}`);
    ids.add(i._id);
    const doc = {
      _id: i._id,
      _key: `!items!${i._id}`,
      name: i.name,
      type: i.type,
      img: i.img ?? "icons/svg/item-bag.svg",
      folder: i.folder ?? null,
      system: i.system,
      effects: [],
      sort: (idx + 1) * 100000,
      flags: {},
      ownership: { default: 0 }
    };
    fs.writeFileSync(path.join(dir, `item-${i._id}.json`), JSON.stringify(doc, null, 2));
  });

  await compilePack(dir, path.join(OUT, packName), { log: false });
  console.log(`OK ${packName}: ${dados.folders.length} pastas, ${dados.items.length} itens`);
}

/* -------- Card packs (baralhos) -------- */
for (const [packName, dados] of Object.entries(CARD_PACKS ?? {})) {
  const dir = path.join(SRC, packName);
  fs.mkdirSync(dir, { recursive: true });
  const ids = new Set();

  for (const deck of dados.decks) {
    if (!ID_RE.test(deck._id) || ids.has(deck._id)) throw new Error(`id de deck inválido/duplicado: ${deck._id}`);
    ids.add(deck._id);
    // Cada carta é armazenada como entrada própria: !cards.cards!<deck>.<card>
    const cards = deck.cards.map(c => {
      if (!ID_RE.test(c._id) || ids.has(c._id)) throw new Error(`id de carta inválido/duplicado: ${c._id}`);
      ids.add(c._id);
      return { ...c, _key: `!cards.cards!${deck._id}.${c._id}` };
    });
    const doc = {
      _id: deck._id,
      _key: `!cards!${deck._id}`,
      name: deck.name,
      type: deck.type ?? "deck",
      description: deck.description ?? "",
      img: deck.img ?? "icons/svg/card-joker.svg",
      cards,
      width: null,
      height: null,
      rotation: 0,
      ownership: { default: 0 },
      flags: {},
      _stats: {}
    };
    fs.writeFileSync(path.join(dir, `cards-${deck._id}.json`), JSON.stringify(doc, null, 2));
  }

  await compilePack(dir, path.join(OUT, packName), { log: false });
  const total = dados.decks.reduce((n, d) => n + d.cards.length, 0);
  console.log(`OK ${packName}: ${dados.decks.length} deck(s), ${total} cartas`);
}

console.log("Compêndios gerados em packs/");
