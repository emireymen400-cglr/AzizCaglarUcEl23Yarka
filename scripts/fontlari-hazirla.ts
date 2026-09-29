// Fontları yalnızca Latin + Türkçe karakterlere kırpar ve kullanılan ağırlıklara sabitler.
// Google'ın latin-ext alt kümesi sayfa başına ~230 KB font indiriyordu (mobil LCP'yi geciktiriyordu).
// Kullanım: pnpm fontlar   → src/fonts/*.woff2
// Kaynaklar (OFL lisanslı): assets/fonts/ ve assets/fonts/kaynak/

import fs from "node:fs";
import path from "node:path";
import subsetFont from "subset-font";

const KOK = path.resolve(import.meta.dirname, "..");
const CIKTI = path.join(KOK, "src", "fonts");

// Temel Latin, Latin-1 ek (Ü Ö Ç â î û ·), Türkçe (Ğ ğ İ ı Ş ş), tipografik işaretler ve ₺
const araliklar: [number, number][] = [
  [0x20, 0x7e],
  [0xa0, 0xff],
  [0x11e, 0x11f],
  [0x130, 0x131],
  [0x15e, 0x15f],
  [0x2013, 0x2014],
  [0x2018, 0x201e],
  [0x2022, 0x2022],
  [0x2026, 0x2026],
  [0x20ba, 0x20ba],
];
const karakterler = araliklar.flatMap(([a, b]) => Array.from({ length: b - a + 1 }, (_, i) => String.fromCodePoint(a + i))).join("");

const fontlar: { kaynak: string; cikti: string; eksenler?: Record<string, number | { min: number; max: number }> }[] = [
  { kaynak: "assets/fonts/BebasNeue-Regular.ttf", cikti: "bebas-neue-400.woff2" },
  // Inter: gövde metni 400–600, optik boyut metin için sabit
  { kaynak: "assets/fonts/kaynak/Inter[opsz,wght].ttf", cikti: "inter-400-600.woff2", eksenler: { opsz: 14, wght: { min: 400, max: 600 } } },
  { kaynak: "assets/fonts/kaynak/Jost[wght].ttf", cikti: "jost-500.woff2", eksenler: { wght: 500 } },
  { kaynak: "assets/fonts/kaynak/Caveat[wght].ttf", cikti: "caveat-500.woff2", eksenler: { wght: 500 } },
];

fs.mkdirSync(CIKTI, { recursive: true });
for (const f of fontlar) {
  const kaynak = fs.readFileSync(path.join(KOK, f.kaynak));
  const sonuc = await subsetFont(kaynak, karakterler, { targetFormat: "woff2", ...(f.eksenler ? { variationAxes: f.eksenler } : {}) });
  fs.writeFileSync(path.join(CIKTI, f.cikti), sonuc);
  console.log(`${f.cikti.padEnd(24)} ${(kaynak.length / 1024).toFixed(0).padStart(5)} KB → ${(sonuc.length / 1024).toFixed(1)} KB`);
}
