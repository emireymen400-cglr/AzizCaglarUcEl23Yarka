// Logo JPEG'inden şeffaf PNG, favicon (icon.png) ve apple-icon üretir.
// Kenara bağlı beyaz zemin flood-fill ile şeffaflaştırılır; logonun içindeki beyazlar korunur.
// Kullanım: node scripts/logo.mjs

import path from "node:path";
import sharp from "sharp";

const KOK = path.resolve(import.meta.dirname, "..");
const KAYNAK = path.join(KOK, "_kaynaklar", "LOGO.jpeg");
const OLCEK = 2; // 500px → 1000px

const { data, info } = await sharp(KAYNAK)
  .resize({ width: 500 * OLCEK, kernel: "lanczos3" })
  .sharpen({ sigma: 0.8 })
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width: W, height: H } = info;
const beyazMi = (i) => data[i] > 225 && data[i + 1] > 225 && data[i + 2] > 225;

// Kenarlardan flood-fill
const ziyaret = new Uint8Array(W * H);
const yigin = [];
for (let x = 0; x < W; x++) yigin.push(x, (H - 1) * W + x);
for (let y = 0; y < H; y++) yigin.push(y * W, y * W + W - 1);
while (yigin.length) {
  const p = yigin.pop();
  if (ziyaret[p]) continue;
  ziyaret[p] = 1;
  if (!beyazMi(p * 4)) continue;
  data[p * 4 + 3] = 0;
  const x = p % W;
  if (x > 0) yigin.push(p - 1);
  if (x < W - 1) yigin.push(p + 1);
  if (p >= W) yigin.push(p - W);
  if (p < W * (H - 1)) yigin.push(p + W);
}

// Şeffaf kenara komşu açık pikselleri yumuşat (beyaz hale kalmasın)
for (let p = 0; p < W * H; p++) {
  const i = p * 4;
  if (data[i + 3] === 0) continue;
  const x = p % W;
  const komsuSeffaf =
    (x > 0 && data[i - 4 + 3] === 0) || (x < W - 1 && data[i + 4 + 3] === 0) ||
    (p >= W && data[i - W * 4 + 3] === 0) || (p < W * (H - 1) && data[i + W * 4 + 3] === 0);
  if (komsuSeffaf) {
    const parlaklik = (data[i] + data[i + 1] + data[i + 2]) / 3;
    data[i + 3] = Math.max(0, Math.min(255, Math.round((255 - parlaklik) * 2.2)));
  }
}

const seffaf = sharp(data, { raw: { width: W, height: H, channels: 4 } }).trim();
const buf = await seffaf.png().toBuffer();

await sharp(buf).png({ compressionLevel: 9 }).toFile(path.join(KOK, "public", "logo.png"));
await sharp(buf).resize(512, 512, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toFile(path.join(KOK, "src", "app", "icon.png"));
await sharp(buf)
  .resize(160, 160, { fit: "contain", background: "#fbf9f6" })
  .extend({ top: 10, bottom: 10, left: 10, right: 10, background: "#fbf9f6" })
  .flatten({ background: "#fbf9f6" })
  .png()
  .toFile(path.join(KOK, "src", "app", "apple-icon.png"));

console.log("logo.png, icon.png, apple-icon.png hazır");
