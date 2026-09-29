// Kaynak medyayı (_kaynaklar/) işleyip public/ altına yazar ve boyut listesini üretir.
// Kullanım: node scripts/medya.mjs            (sadece eksik çıktıları üretir)
//           node scripts/medya.mjs --yeniden  (hepsini baştan üretir)

import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import ffmpeg from "ffmpeg-static";

const KOK = path.resolve(import.meta.dirname, "..");
const K = (...p) => path.join(KOK, "_kaynaklar", ...p);
const P = (...p) => path.join(KOK, "public", ...p);
const YENIDEN = process.argv.includes("--yeniden");

// ---------- Görseller: [kaynak, çıktı (public/images altında)] ----------
const WA = (saat) => K("google-isletme", `WhatsApp Image 2026-09-29 at ${saat}.jpeg`);
const R = (dosya) => K("resimler", dosya);

const gorseller = [
  // Türler
  [K("LOHMAN BROWN", "1.jpg"), "turler/lohmann-brown-yarka-01.webp"],
  [K("LOHMAN BROWN", "2.jpg"), "turler/lohmann-brown-yarka-02.webp"],
  [K("LOHMAN BROWN", "3.jpg"), "turler/lohmann-brown-yarka-03.webp"],
  [K("LOHMAN BROWN", "4.jpg"), "turler/lohmann-brown-yarka-04.webp"],
  [K("ATAKS", "1.jpg"), "turler/atak-s-yarka-01.webp"],
  [K("ATAKS", "2.jpg"), "turler/atak-s-yarka-02.webp"],
  [K("BLACK NICK", "1.jpg"), "turler/black-nick-yarka-01.webp"],
  [K("BLACK NICK", "2.jpg"), "turler/black-nick-yarka-02.webp"],
  [K("BLACK NICK", "3.jpg"), "turler/black-nick-yarka-03.webp"],
  [K("BLACK NICK", "4.jpg"), "turler/black-nick-yarka-04.webp"],
  [K("BLACK NICK", "5.jpg"), "turler/black-nick-yarka-05.webp"],
  [K("LİGORİN", "1.jpg"), "turler/ligorin-yarka-01.webp"],
  [K("LİGORİN", "2.jpg"), "turler/ligorin-yarka-02.webp"],
  [K("TİNTED CORAL", "1.jpg"), "turler/tinted-coral-yarka-01.webp"],
  [K("TİNTED CORAL", "2.jpg"), "turler/tinted-coral-yarka-02.webp"],
  [K("TİNTED CORAL", "3.jpg"), "turler/tinted-coral-yarka-03.webp"],
  [K("LOHMAN SANDY", "1.jpg"), "turler/lohmann-sandy-yarka-01.webp"],
  [R("pexels-sametkaplan-16718833.jpg"), "turler/lohmann-sandy-yarka-02.webp"],
  [K("SUSSEX", "1.jpg"), "turler/sussex-yarka-01.webp"],
  [K("SUSSEX", "2.jpg"), "turler/sussex-yarka-02.webp"],
  [K("PLEYMUT", "2.jpg"), "turler/pleymut-yarka-01.webp"],
  [K("PLEYMUT", "1.jpg"), "turler/pleymut-yarka-02.webp"],
  [K("PLEYMUT HOROZ", "1.jpg"), "turler/pleymut-horoz-yarka-01.webp"],
  [K("PLEYMUT HOROZ", "2.jpg"), "turler/pleymut-horoz-yarka-02.webp"],

  // Ana sayfa (stok, kullanıcı isteğiyle)
  [R("ZZDFG.jpg"), "anasayfa/cayirda-kahverengi-yarka-surusu.webp"],
  [R("AA.jpg"), "anasayfa/yesil-cayirda-kahverengi-tavuklar.webp"],
  [R("pexels-steven-van-elk-9757164-18474427.jpg"), "anasayfa/cimenlikte-yumurtaci-tavuklar.webp"],
  [R("pexels-hiepez-18715277.jpg"), "anasayfa/cuval-uzerinde-kahverengi-yumurtalar.webp"],
  [R("BNHT.jpg"), "anasayfa/folluktaki-kahverengi-yumurtalar.webp"],
  [R("pexels-enginakyurt-1769279.jpg"), "anasayfa/farkli-renkte-tavuklar.webp"],

  // Gerçek çiftlik fotoğrafları (Google İşletme)
  [K("google-isletme", "resmmm.webp"), "ciftlik/ucel23-ciftlik-kumes-binasi.webp"],
  [WA("13.11.37 (1)"), "ciftlik/yarka-teslimat-araci-sepetler.webp"],
  [WA("13.11.37"), "ciftlik/kumeste-beyaz-yarkalar-01.webp"],
  [WA("13.11.38 (1)"), "ciftlik/kumeste-beyaz-yarkalar-02.webp"],
  [WA("13.11.38"), "ciftlik/kumeste-beyaz-yarkalar-03.webp"],
  [WA("13.12.05 (1)"), "ciftlik/beyaz-yarkalar-yemlik-hatti-01.webp"],
  [WA("13.12.05 (2)"), "ciftlik/beyaz-yarkalar-yemlik-hatti-02.webp"],
  [WA("13.12.05"), "ciftlik/beyaz-yarkalar-yemlik-hatti-03.webp"],
  [WA("13.12.06 (1)"), "ciftlik/koyu-renkli-yarkalar-kumeste-01.webp"],
  [WA("13.12.06 (2)"), "ciftlik/koyu-renkli-yarkalar-kumeste-02.webp"],
  [WA("13.12.06"), "ciftlik/koyu-renkli-yarkalar-kumeste-03.webp"],

  // Galeri (stok seçkisi)
  [R("AAD.jpg"), "galeri/cayirda-karisik-tavuklar.webp"],
  [R("ASX.jpg"), "galeri/kahverengi-tavuk-yakin-plan.webp"],
  [R("IOP.jpg"), "galeri/cimenlikte-kahverengi-tavuk.webp"],
  [R("VGFJF.jpg"), "galeri/kahverengi-tavuk-portre.webp"],
  [R("UYYTUH.jpg"), "galeri/civcivleriyle-tavuk.webp"],
  [R("ÖMJ.jpg"), "galeri/kahverengi-tavuk-surusu.webp"],
  [R("SD.jpg"), "galeri/siyah-tavuk-yakin-plan.webp"],
  [R("pexels-alexasfotos-34185946.jpg"), "galeri/tunekte-kahverengi-tavuklar.webp"],
  [R("pexels-alexasfotos-38672948.jpg"), "galeri/kahverengi-tavuklar-yakin-plan.webp"],
  [R("pexels-erik-karits-2093459-22816182.jpg"), "galeri/cimende-beyaz-tavuk.webp"],
  [R("pexels-erwin-bosman-118283-39258052.jpg"), "galeri/yemlikte-siyah-tavuk-ve-civcivler.webp"],
  [R("pexels-framesbyeline-28241464.jpg"), "galeri/tel-orgu-arkasinda-tavuklar.webp"],
  [R("pexels-jennelope-1646996719-38444271.jpg"), "galeri/tavuk-portresi.webp"],
  [R("pexels-rahimegul-36660082.jpg"), "galeri/zeytinlikte-serbest-tavuklar.webp"],
  [R("pexels-steven-van-elk-9757164-18474429.jpg"), "galeri/cimende-kahverengi-tavuklar.webp"],
  [R("pexels-sukru-celik-26649333-39317189.jpg"), "galeri/cizgili-tavuk-portresi.webp"],
  [R("pexels-tivasee-17374727-10867269.jpg"), "galeri/elde-taze-yumurtalar.webp"],
  [R("pexels-zehra-ozdemi-r-61826705-8079050.jpg"), "galeri/kumeste-karisik-suru.webp"],
];

// ---------- Videolar: [kaynak, çıktı adı (public/videos), sesli mi, ayarlar] ----------
// Telefon videoları (gürültülü, titrek) daha yüksek CRF ile sıkıştırılır; hedef dosya başına < 10 MB.
const TELEFON = { crf: 32, fps: 24 };
const WV = (saat) => K("google-isletme", `WhatsApp Video 2026-09-29 at ${saat}.mp4`);
const videolar = [
  // Stok
  [K("videolar", "2.mp4"), "hero-cayirda-tavuklar", false, { sureSn: 10 }],
  [K("videolar", "4.mp4"), "dag-eteginde-serbest-tavuklar", false],
  [K("videolar", "1.mp4"), "bahcede-karisik-tavuklar", false],
  [K("videolar", "3.mp4"), "horoz-ve-tavuklar", true],
  [K("videolar", "5.mp4"), "toprakta-eselenen-tavuklar", false],
  // Gerçek çiftlik
  [WV("13.14.48"), "ciftlik-kahverengi-yumurtacilar-01", true, TELEFON],
  [WV("13.14.53"), "ciftlik-kahverengi-yumurtacilar-02", true, TELEFON],
  [WV("13.15.22"), "ciftlik-kahverengi-yumurtacilar-03", true, TELEFON],
  [WV("13.16.29"), "ciftlik-koyu-renkli-yarkalar-01", true, TELEFON],
  [WV("13.16.50 (2)"), "ciftlik-koyu-renkli-yarkalar-02", true, TELEFON],
  [WV("13.16.30"), "ciftlik-beyaz-yarkalar-01", true, TELEFON],
  [WV("13.16.50"), "ciftlik-beyaz-yarkalar-02", true, TELEFON],
  [WV("13.16.50 (1)"), "ciftlik-beyaz-yarkalar-03", true, TELEFON],
  [WV("13.16.47"), "ciftlik-beyaz-tavuklar", true, TELEFON],
  [WV("13.16.38"), "ciftlik-kahverengi-yarkalar", true, TELEFON],
];

const MAKS_KENAR = 1800;

async function gorselIsle(kaynak, cikti) {
  const hedef = P("images", cikti);
  if (!YENIDEN && fs.existsSync(hedef)) return;
  fs.mkdirSync(path.dirname(hedef), { recursive: true });
  await sharp(kaynak)
    .rotate()
    .resize(MAKS_KENAR, MAKS_KENAR, { fit: "inside", withoutEnlargement: true })
    .webp({ quality: 78, effort: 5 })
    .toFile(hedef);
}

function ff(args) {
  const r = spawnSync(ffmpeg, ["-hide_banner", "-loglevel", "error", "-y", ...args], { stdio: "inherit" });
  if (r.status !== 0) throw new Error(`ffmpeg hata: ${args.join(" ")}`);
}

async function videoIsle(kaynak, ad, sesli, ayar = {}) {
  const { crf = 28, fps = 30, sureSn } = ayar;
  const hedef = P("videos", `${ad}.mp4`);
  const poster = P("videos", `${ad}-poster.webp`);
  fs.mkdirSync(path.dirname(hedef), { recursive: true });
  if (YENIDEN || !fs.existsSync(hedef)) {
    // 720p sınırı (kısa kenar), büyütme yok, H.264 CRF 28, faststart
    const olcek = "scale='if(gt(iw,ih),-2,min(720,iw))':'if(gt(iw,ih),min(720,ih),-2)'";
    ff([
      "-i", kaynak,
      ...(sureSn ? ["-t", String(sureSn)] : []),
      "-vf", `${olcek},fps=${fps}`,
      "-c:v", "libx264", "-preset", "slow", "-crf", String(crf), "-pix_fmt", "yuv420p",
      ...(sesli ? ["-c:a", "aac", "-b:a", "64k", "-ac", "1"] : ["-an"]),
      "-movflags", "+faststart",
      hedef,
    ]);
  }
  if (YENIDEN || !fs.existsSync(poster)) {
    const tmp = poster.replace(/\.webp$/, ".png");
    ff(["-ss", "1", "-i", hedef, "-frames:v", "1", tmp]);
    await sharp(tmp).webp({ quality: 75 }).toFile(poster);
    fs.rmSync(tmp);
  }
}

function sure(dosya) {
  const r = spawnSync(ffmpeg, ["-hide_banner", "-i", dosya]).stderr.toString();
  const m = r.match(/Duration: (\d+):(\d+):([\d.]+)/);
  return m ? Math.round(+m[1] * 3600 + +m[2] * 60 + +m[3]) : 0;
}

async function main() {
  for (const [k, c] of gorseller) {
    if (!fs.existsSync(k)) throw new Error(`Kaynak yok: ${k}`);
    await gorselIsle(k, c);
    process.stdout.write(".");
  }
  console.log(`\n${gorseller.length} görsel hazır`);

  for (const [k, ad, sesli, ayar] of videolar) {
    if (!fs.existsSync(k)) throw new Error(`Kaynak yok: ${k}`);
    await videoIsle(k, ad, sesli, ayar);
    console.log(`video: ${ad}`);
  }

  // Boyut listesi (next/image width/height ve VideoObject için)
  const boyutlar = {};
  for (const [, c] of gorseller) {
    const m = await sharp(P("images", c)).metadata();
    boyutlar[`/images/${c}`] = { w: m.width, h: m.height };
  }
  const videoBilgi = {};
  for (const [, ad] of videolar) {
    const dosya = P("videos", `${ad}.mp4`);
    const m = await sharp(P("videos", `${ad}-poster.webp`)).metadata();
    videoBilgi[ad] = {
      src: `/videos/${ad}.mp4`,
      poster: `/videos/${ad}-poster.webp`,
      w: m.width,
      h: m.height,
      sureSn: sure(dosya),
      boyutKb: Math.round(fs.statSync(dosya).size / 1024),
    };
  }
  const ts =
    "// Bu dosya scripts/medya.mjs tarafından üretilir. Elle düzenlemeyin.\n\n" +
    `export const gorselBoyutlari: Record<string, { w: number; h: number }> = ${JSON.stringify(boyutlar, null, 2)};\n\n` +
    `export const videoDosyalari = ${JSON.stringify(videoBilgi, null, 2)} as const;\n\n` +
    "export type VideoAdi = keyof typeof videoDosyalari;\n";
  fs.writeFileSync(path.join(KOK, "src", "content", "medya.generated.ts"), ts);
  console.log("src/content/medya.generated.ts yazıldı");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
