// _kaynaklar/ içindeki medyayı işleyip public/ altına yazar, boyut listesini ve rapor üretir.
//
// Kullanım:
//   pnpm media            → sadece eksik çıktıları üretir
//   pnpm media --yeniden  → hepsini baştan üretir
//
// Çıktılar:
//   public/images/tavuklar/<slug>/<slug>-yarka-NN.webp   (tür klasörleri)
//   public/images/galeri/galeri-NN.webp                  (_kaynaklar/resimler = "karışık")
//   public/images/ciftlik/*.webp                          (Google İşletme, gerçek çiftlik)
//   public/images/anasayfa/*.webp                         (ana sayfa seçkisi)
//   public/videos/<ad>.mp4 + <ad>-poster.webp
//   public/logo.png, public/og-logo.png, src/app/{favicon.ico,icon.png,apple-icon.png}
//   src/content/media.generated.ts
//   _kaynaklar/medya-raporu.json (özet, bulanık/düşük çözünürlük listesi)

import { spawnSync } from "node:child_process";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import ffmpegPath from "ffmpeg-static";
import sharp, { type Color } from "sharp";

const KOK = path.resolve(import.meta.dirname, "..");
const KAYNAK = path.join(KOK, "_kaynaklar");
const PUB = path.join(KOK, "public");
const YENIDEN = process.argv.includes("--yeniden");

const MAKS_KENAR = 1600;
const KALITE = 80;
const VIDEO_SINIR_MB = 10;

// ---------------------------------------------------------------- tanımlar

/** Kaynak klasör adı → slug (CLAUDE.md §3 tablosu) */
const turKlasorleri: Record<string, string> = {
  "PLEYMUT": "pleymut",
  "PLEYMUT HOROZ": "pleymut-horoz",
  "LİGORİN": "ligorin",
  "LOHMAN BROWN": "lohmann-brown",
  "LOHMAN SANDY": "lohmann-sandy",
  "SUSSEX": "sussex",
  "TİNTED CORAL": "tinted-coral",
  "ATAKS": "atak-s",
  "BLACK NICK": "black-nick",
};

/** Tür klasörlerine ek olarak galeriden türe atanan görseller (tür başına en az 2 görsel için) */
const turEkleri: [string, string][] = [["lohmann-sandy", "pexels-sametkaplan-16718833.jpg"]];

/** Galeriye ALINMAYACAK dosyalar */
const galeriHaric: Record<string, string> = {
  "esular-ataks-tavuk-2_png.avif": "başka bir firmanın sitesinden alınmış, telif riski",
};

/** Google İşletme fotoğrafları (gerçek çiftlik) */
const WA = (saat: string) => `WhatsApp Image 2026-09-29 at ${saat}.jpeg`;
const ciftlikGorselleri: [string, string][] = [
  ["resmmm.webp", "ucel23-ciftlik-kumes-binasi"],
  [WA("13.11.37 (1)"), "yarka-teslimat-araci-sepetler"],
  [WA("13.11.37"), "kumeste-beyaz-yarkalar-01"],
  [WA("13.11.38 (1)"), "kumeste-beyaz-yarkalar-02"],
  [WA("13.11.38"), "kumeste-beyaz-yarkalar-03"],
  [WA("13.12.05 (1)"), "beyaz-yarkalar-yemlik-hatti-01"],
  [WA("13.12.05 (2)"), "beyaz-yarkalar-yemlik-hatti-02"],
  [WA("13.12.05"), "beyaz-yarkalar-yemlik-hatti-03"],
  [WA("13.12.06 (1)"), "koyu-renkli-yarkalar-kumeste-01"],
  [WA("13.12.06 (2)"), "koyu-renkli-yarkalar-kumeste-02"],
  [WA("13.12.06"), "koyu-renkli-yarkalar-kumeste-03"],
];

/** Ana sayfa seçkisi (stok, kullanıcı isteğiyle) — kaynak: _kaynaklar/resimler */
const anasayfaGorselleri: [string, string][] = [
  ["ZZDFG.jpg", "cayirda-kahverengi-yarka-surusu"],
  ["AA.jpg", "yesil-cayirda-kahverengi-tavuklar"],
  ["pexels-steven-van-elk-9757164-18474427.jpg", "cimenlikte-yumurtaci-tavuklar"],
  ["pexels-hiepez-18715277.jpg", "cuval-uzerinde-kahverengi-yumurtalar"],
  ["BNHT.jpg", "folluktaki-kahverengi-yumurtalar"],
  ["pexels-enginakyurt-1769279.jpg", "farkli-renkte-tavuklar"],
];

type VideoTanim = { kaynak: string; ad: string; sessiz: boolean; sureSn?: number; not: string };
const WV = (saat: string) => path.join("google-isletme", `WhatsApp Video 2026-09-29 at ${saat}.mp4`);
const videolar: VideoTanim[] = [
  { kaynak: "videolar/2.mp4", ad: "hero-cayirda-tavuklar", sessiz: true, sureSn: 10, not: "Stok · ana sayfa hero (döngü)" },
  { kaynak: "videolar/4.mp4", ad: "dag-eteginde-serbest-tavuklar", sessiz: true, not: "Stok · ana sayfa video bölümü" },
  { kaynak: "videolar/1.mp4", ad: "bahcede-karisik-tavuklar", sessiz: true, not: "Stok · galeri" },
  { kaynak: "videolar/3.mp4", ad: "horoz-ve-tavuklar", sessiz: false, not: "Stok · galeri" },
  { kaynak: "videolar/5.mp4", ad: "toprakta-eselenen-tavuklar", sessiz: true, not: "Stok · galeri" },
  { kaynak: WV("13.14.48"), ad: "ciftlik-kahverengi-yumurtacilar-01", sessiz: false, not: "Çiftlik" },
  { kaynak: WV("13.14.53"), ad: "ciftlik-kahverengi-yumurtacilar-02", sessiz: false, not: "Çiftlik" },
  { kaynak: WV("13.15.22"), ad: "ciftlik-kahverengi-yumurtacilar-03", sessiz: false, not: "Çiftlik" },
  { kaynak: WV("13.16.29"), ad: "ciftlik-koyu-renkli-yarkalar-01", sessiz: false, not: "Çiftlik" },
  { kaynak: WV("13.16.50 (2)"), ad: "ciftlik-koyu-renkli-yarkalar-02", sessiz: false, not: "Çiftlik" },
  { kaynak: WV("13.16.30"), ad: "ciftlik-beyaz-yarkalar-01", sessiz: false, not: "Çiftlik" },
  { kaynak: WV("13.16.50"), ad: "ciftlik-beyaz-yarkalar-02", sessiz: false, not: "Çiftlik" },
  { kaynak: WV("13.16.50 (1)"), ad: "ciftlik-beyaz-yarkalar-03", sessiz: false, not: "Çiftlik" },
  { kaynak: WV("13.16.47"), ad: "ciftlik-beyaz-tavuklar", sessiz: false, not: "Çiftlik" },
  { kaynak: WV("13.16.38"), ad: "ciftlik-kahverengi-yarkalar", sessiz: false, not: "Çiftlik" },
];

// ---------------------------------------------------------------- yardımcılar

type Boyut = { w: number; h: number };
type KaliteNotu = { dosya: string; kaynak: string; neden: string };

const boyutlar: Record<string, Boyut> = {};
const kaliteNotlari: KaliteNotu[] = [];
const keskinlikler: { dosya: string; kaynak: string; deger: number }[] = [];
const ozet: Record<string, { adet: number; kb: number }> = {};

const IMG_UZANTI = /\.(jpe?g|png|webp|avif)$/i;
const siraliDosyalar = (klasor: string) =>
  fs.readdirSync(klasor).filter((f) => IMG_UZANTI.test(f)).sort((a, b) => a.localeCompare(b, "tr", { numeric: true }));
const iki = (n: number) => String(n).padStart(2, "0");
const md5 = (dosya: string) => crypto.createHash("md5").update(fs.readFileSync(dosya)).digest("hex");

/**
 * Bulanıklık ölçüsü: 800px gri görüntüde Laplace filtresi, 4×4 döşemenin en keskin olanının
 * standart sapması. (Arka planı flu, öznesi net fotoğrafları haksız yere işaretlememek için
 * en keskin döşeme kullanılır.) Düşük değer = bulanık.
 */
async function keskinlik(dosya: string): Promise<number> {
  const { data, info } = await sharp(dosya)
    .rotate()
    .resize(800, 800, { fit: "inside" })
    .greyscale()
    .convolve({ width: 3, height: 3, kernel: [0, 1, 0, 1, -4, 1, 0, 1, 0], offset: 128 })
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width: W, height: H } = info;
  let enIyi = 0;
  for (let ty = 0; ty < 4; ty++) {
    for (let tx = 0; tx < 4; tx++) {
      let n = 0, top = 0, kare = 0;
      for (let y = Math.floor((ty * H) / 4); y < Math.floor(((ty + 1) * H) / 4); y++) {
        for (let x = Math.floor((tx * W) / 4); x < Math.floor(((tx + 1) * W) / 4); x++) {
          const v = data[y * W + x];
          n++; top += v; kare += v * v;
        }
      }
      const ort = top / n;
      enIyi = Math.max(enIyi, Math.sqrt(kare / n - ort * ort));
    }
  }
  return enIyi;
}

const BULANIK_ESIK = 9; // deneysel; 800px üzerinde en keskin döşeme std sapması
const DUSUK_COZUNURLUK = 1200; // en uzun kenar

async function gorselIsle(kaynak: string, hedefGoreli: string, grup: string) {
  const hedef = path.join(PUB, hedefGoreli);
  fs.mkdirSync(path.dirname(hedef), { recursive: true });
  if (YENIDEN || !fs.existsSync(hedef)) {
    // sharp varsayılan olarak EXIF/GPS/ICC dahil tüm metaveriyi atar (withMetadata çağrılmıyor).
    await sharp(kaynak)
      .rotate() // EXIF yönünü piksellere uygula, sonra metaveri atılır
      .resize(MAKS_KENAR, MAKS_KENAR, { fit: "inside", withoutEnlargement: true })
      .webp({ quality: KALITE, effort: 5 })
      .toFile(hedef);
  }
  const m = await sharp(hedef).metadata();
  const url = "/" + hedefGoreli.split(path.sep).join("/");
  boyutlar[url] = { w: m.width!, h: m.height! };

  const km = await sharp(kaynak).metadata();
  const enUzun = Math.max(km.width ?? 0, km.height ?? 0);
  if (enUzun < DUSUK_COZUNURLUK) kaliteNotlari.push({ dosya: url, kaynak: path.relative(KAYNAK, kaynak), neden: `düşük çözünürlük (${km.width}×${km.height})` });
  const k = await keskinlik(kaynak);
  keskinlikler.push({ dosya: url, kaynak: path.relative(KAYNAK, kaynak), deger: +k.toFixed(1) });
  if (k < BULANIK_ESIK) kaliteNotlari.push({ dosya: url, kaynak: path.relative(KAYNAK, kaynak), neden: `bulanık olabilir (keskinlik ${k.toFixed(1)})` });

  const o = (ozet[grup] ??= { adet: 0, kb: 0 });
  o.adet++;
  o.kb += fs.statSync(hedef).size / 1024;
}

function ff(args: string[]) {
  if (!ffmpegPath) throw new Error("ffmpeg bulunamadı");
  const r = spawnSync(ffmpegPath, ["-hide_banner", "-loglevel", "error", "-y", ...args], { stdio: "inherit" });
  if (r.status !== 0) throw new Error(`ffmpeg hata: ${args.join(" ")}`);
}

function sureSaniye(dosya: string): number {
  const r = spawnSync(ffmpegPath!, ["-hide_banner", "-i", dosya]).stderr.toString();
  const m = r.match(/Duration: (\d+):(\d+):([\d.]+)/);
  return m ? Math.round(+m[1] * 3600 + +m[2] * 60 + +m[3]) : 0;
}

/** ICO kabı içine PNG gömer (Vista+ tarayıcılar destekler). */
function pngdenIco(png: Buffer, boyut: number): Buffer {
  const h = Buffer.alloc(22);
  h.writeUInt16LE(0, 0); h.writeUInt16LE(1, 2); h.writeUInt16LE(1, 4);
  h.writeUInt8(boyut >= 256 ? 0 : boyut, 6); h.writeUInt8(boyut >= 256 ? 0 : boyut, 7);
  h.writeUInt16LE(1, 10); h.writeUInt16LE(32, 12);
  h.writeUInt32LE(png.length, 14); h.writeUInt32LE(22, 18);
  return Buffer.concat([h, png]);
}

// ---------------------------------------------------------------- adımlar

async function turler() {
  const hashler = new Set<string>();
  for (const [klasor, slug] of Object.entries(turKlasorleri)) {
    const dizin = path.join(KAYNAK, klasor);
    const dosyalar = siraliDosyalar(dizin).map((f) => path.join(dizin, f));
    for (const [ekSlug, ek] of turEkleri) if (ekSlug === slug) dosyalar.push(path.join(KAYNAK, "resimler", ek));
    let no = 0;
    for (const d of dosyalar) {
      hashler.add(md5(d));
      await gorselIsle(d, path.join("images", "tavuklar", slug, `${slug}-yarka-${iki(++no)}.webp`), "Tür görselleri");
    }
  }
  return hashler;
}

async function galeri(turHashleri: Set<string>) {
  const dizin = path.join(KAYNAK, "resimler");
  const gorulen = new Set<string>();
  const atlananlar: { dosya: string; neden: string }[] = [];
  let no = 0;
  for (const f of siraliDosyalar(dizin)) {
    const d = path.join(dizin, f);
    if (galeriHaric[f]) { atlananlar.push({ dosya: f, neden: galeriHaric[f] }); continue; }
    const h = md5(d);
    if (turHashleri.has(h)) { atlananlar.push({ dosya: f, neden: "tür klasöründeki bir görselin aynısı" }); continue; }
    if (gorulen.has(h)) { atlananlar.push({ dosya: f, neden: "galerideki başka bir görselin aynısı" }); continue; }
    gorulen.add(h);
    await gorselIsle(d, path.join("images", "galeri", `galeri-${iki(++no)}.webp`), "Galeri (karışık)");
    if (no % 20 === 0) process.stdout.write(`  galeri ${no}\n`);
  }
  return atlananlar;
}

async function digerGorseller() {
  for (const [kaynak, ad] of ciftlikGorselleri)
    await gorselIsle(path.join(KAYNAK, "google-isletme", kaynak), path.join("images", "ciftlik", `${ad}.webp`), "Çiftlik (Google İşletme)");
  for (const [kaynak, ad] of anasayfaGorselleri)
    await gorselIsle(path.join(KAYNAK, "resimler", kaynak), path.join("images", "anasayfa", `${ad}.webp`), "Ana sayfa seçkisi");
}

async function logo() {
  // Kenara bağlı beyaz zemini flood-fill ile şeffaflaştır; logonun içindeki beyazlar korunur.
  const { data, info } = await sharp(path.join(KAYNAK, "LOGO.jpeg"))
    .resize({ width: 1000, kernel: "lanczos3" })
    .sharpen({ sigma: 0.8 })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width: W, height: H } = info;
  const beyaz = (i: number) => data[i] > 225 && data[i + 1] > 225 && data[i + 2] > 225;
  const ziyaret = new Uint8Array(W * H);
  const yigin: number[] = [];
  for (let x = 0; x < W; x++) yigin.push(x, (H - 1) * W + x);
  for (let y = 0; y < H; y++) yigin.push(y * W, y * W + W - 1);
  while (yigin.length) {
    const p = yigin.pop()!;
    if (ziyaret[p]) continue;
    ziyaret[p] = 1;
    if (!beyaz(p * 4)) continue;
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
    const kenar =
      (x > 0 && data[i - 1] === 0) || (x < W - 1 && data[i + 7] === 0) ||
      (p >= W && data[i - W * 4 + 3] === 0) || (p < W * (H - 1) && data[i + W * 4 + 3] === 0);
    if (kenar) data[i + 3] = Math.max(0, Math.min(255, Math.round((255 - (data[i] + data[i + 1] + data[i + 2]) / 3) * 2.2)));
  }
  const seffaf = await sharp(data, { raw: { width: W, height: H, channels: 4 } }).trim().png().toBuffer();
  const kare = (n: number, zemin: Color) =>
    sharp(seffaf).resize(n, n, { fit: "contain", background: zemin });
  const krem = "#fbf9f6";

  await sharp(seffaf).png({ compressionLevel: 9 }).toFile(path.join(PUB, "logo.png"));
  await kare(512, { r: 0, g: 0, b: 0, alpha: 0 }).png().toFile(path.join(KOK, "src", "app", "icon.png"));
  await kare(160, krem).extend({ top: 10, bottom: 10, left: 10, right: 10, background: krem }).flatten({ background: krem }).png().toFile(path.join(KOK, "src", "app", "apple-icon.png"));
  const ico48 = await kare(48, { r: 0, g: 0, b: 0, alpha: 0 }).png().toBuffer();
  fs.writeFileSync(path.join(KOK, "src", "app", "favicon.ico"), pngdenIco(ico48, 48));
  // OG görselleri için: 1200×630 krem zemin üstünde ortalı logo (dinamik OG oluşturulana kadar yedek)
  const ogLogo = await sharp(seffaf).resize(460, 460, { fit: "inside" }).png().toBuffer();
  await sharp({ create: { width: 1200, height: 630, channels: 4, background: krem } })
    .composite([{ input: ogLogo, gravity: "center" }])
    .png()
    .toFile(path.join(PUB, "og-logo.png"));
}

type VideoSonuc = { ad: string; not: string; kaynakMb: number; mb: number; sureSn: number; boyut: string; ses: boolean };

async function videoIsle(v: VideoTanim): Promise<VideoSonuc> {
  const kaynak = path.join(KAYNAK, v.kaynak);
  const hedef = path.join(PUB, "videos", `${v.ad}.mp4`);
  const poster = path.join(PUB, "videos", `${v.ad}-poster.webp`);
  fs.mkdirSync(path.dirname(hedef), { recursive: true });
  if (YENIDEN || !fs.existsSync(hedef)) {
    // 720p: kısa kenar en fazla 720 (dikey videolarda genişlik), büyütme yok
    const olcek = "scale='if(gt(iw,ih),-2,min(720,iw))':'if(gt(iw,ih),min(720,ih),-2)'";
    ff([
      "-i", kaynak,
      ...(v.sureSn ? ["-t", String(v.sureSn)] : []),
      "-map_metadata", "-1",
      "-vf", olcek,
      "-c:v", "libx264", "-preset", "slow", "-crf", "28", "-pix_fmt", "yuv420p",
      ...(v.sessiz ? ["-an"] : ["-c:a", "aac", "-b:a", "96k"]),
      "-movflags", "+faststart",
      hedef,
    ]);
  }
  if (YENIDEN || !fs.existsSync(poster)) {
    // İlk kare; tampon sınırına takılmamak için geçici dosya kullanılır
    const gecici = poster.replace(/\.webp$/, ".tmp.png");
    ff(["-i", hedef, "-frames:v", "1", gecici]);
    await sharp(gecici).webp({ quality: 78 }).toFile(poster);
    fs.rmSync(gecici);
  }
  const pm = await sharp(poster).metadata();
  return {
    ad: v.ad,
    not: v.not,
    kaynakMb: fs.statSync(kaynak).size / 1048576,
    mb: fs.statSync(hedef).size / 1048576,
    sureSn: sureSaniye(hedef),
    boyut: `${pm.width}×${pm.height}`,
    ses: !v.sessiz,
  };
}

// ---------------------------------------------------------------- ana akış

async function main() {
  if (!ffmpegPath || !fs.existsSync(ffmpegPath)) {
    console.error("ffmpeg bulunamadı. Kurulum: pnpm install (ffmpeg-static paketi) — winget sürümü Windows Smart App Control tarafından engelleniyor.");
    process.exit(1);
  }

  if (YENIDEN) for (const d of ["images", "videos"]) fs.rmSync(path.join(PUB, d), { recursive: true, force: true });

  console.log("Tür görselleri...");
  const turHashleri = await turler();
  console.log("Galeri...");
  const atlananlar = await galeri(turHashleri);
  console.log("Çiftlik ve ana sayfa görselleri...");
  await digerGorseller();
  console.log("Logo ve ikonlar...");
  await logo();

  console.log("Videolar...");
  const videoSonuclari: VideoSonuc[] = [];
  for (const v of videolar) {
    videoSonuclari.push(await videoIsle(v));
    console.log(`  ${v.ad}`);
  }

  // media.generated.ts
  const videoBilgi = Object.fromEntries(
    videoSonuclari.map((s) => {
      const [w, h] = s.boyut.split("×").map(Number);
      return [s.ad, { src: `/videos/${s.ad}.mp4`, poster: `/videos/${s.ad}-poster.webp`, w, h, sureSn: s.sureSn, boyutKb: Math.round(s.mb * 1024) }];
    }),
  );
  const ts =
    "// Bu dosya scripts/process-media.ts tarafından üretilir. Elle düzenlemeyin.\n\n" +
    `export const gorselBoyutlari: Record<string, { w: number; h: number }> = ${JSON.stringify(boyutlar, null, 2)};\n\n` +
    `export const videoDosyalari = ${JSON.stringify(videoBilgi, null, 2)} as const;\n\n` +
    "export type VideoAdi = keyof typeof videoDosyalari;\n";
  fs.writeFileSync(path.join(KOK, "src", "content", "media.generated.ts"), ts);

  const rapor = { ozet, atlananlar, kaliteNotlari, keskinlikler: [...keskinlikler].sort((a, b) => a.deger - b.deger), videolar: videoSonuclari, buyukVideolar: videoSonuclari.filter((v) => v.mb > VIDEO_SINIR_MB) };
  fs.writeFileSync(path.join(KAYNAK, "medya-raporu.json"), JSON.stringify(rapor, null, 2));

  console.log("\n=== Görseller ===");
  console.table(Object.entries(ozet).map(([grup, o]) => ({ grup, adet: o.adet, "toplam MB": +(o.kb / 1024).toFixed(1) })));
  console.log("=== Videolar ===");
  console.table(videoSonuclari.map((v) => ({ ad: v.ad, sure: v.sureSn, boyut: v.boyut, ses: v.ses, "kaynak MB": +v.kaynakMb.toFixed(1), MB: +v.mb.toFixed(1) })));
  console.log("Atlanan:", atlananlar);
  console.log("Kalite notları:", kaliteNotlari);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
