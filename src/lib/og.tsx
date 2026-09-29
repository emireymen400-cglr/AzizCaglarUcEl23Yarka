// Dinamik OG görselleri için ortak düzen (1200×630). Build sırasında statik üretilir.
// Satori sadece flexbox ve ttf/otf/woff font destekler; WebP okuyamadığı için fotoğraflar
// sharp ile JPEG'e çevrilip data URL olarak gömülür.

import { readFile } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";
import { site } from "@/content/site";

export const ogBoyut = { width: 1200, height: 630 };
export const ogTur = "image/png";

const renk = {
  indigo: "#234386",
  yolk: "#ffc400",
  orange: "#ed7328",
  sky: "#6aa8dc",
  straw: "#d2b68c",
  pasture: "#a2d3a6",
  cream: "#fbf9f6",
} as const;
export type OgRenk = keyof typeof renk;

const blobYolu =
  "M44.7,-58.3C57.3,-49.2,66.3,-34.8,70.4,-18.8C74.5,-2.8,73.8,14.8,66.3,28.8C58.8,42.8,44.6,53.2,29.1,60.7C13.6,68.2,-3.2,72.8,-19.6,69.6C-36,66.4,-52,55.4,-61.6,40.4C-71.2,25.4,-74.4,6.4,-70.4,-10.6C-66.4,-27.6,-55.2,-42.6,-41.1,-51.5C-27,-60.4,-13.5,-63.2,1.4,-65C16.3,-66.8,32.1,-67.4,44.7,-58.3Z";

const blobSvg = (dolgu: string) =>
  `data:image/svg+xml;base64,${Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-75 -75 150 150"><path d="${blobYolu}" fill="${dolgu}"/></svg>`,
  ).toString("base64")}`;

export async function ogFontlari() {
  const bebas = await readFile(join(process.cwd(), "assets/fonts/BebasNeue-Regular.ttf"));
  return [{ name: "Bebas Neue", data: bebas, style: "normal" as const, weight: 400 as const }];
}

/** public/ altındaki bir görseli kırpıp JPEG data URL'e çevirir. */
async function fotograf(publicYol: string, w: number, h: number) {
  const buf = await sharp(join(process.cwd(), "public", publicYol))
    .resize(w * 2, h * 2, { fit: "cover", position: "attention" })
    .jpeg({ quality: 82 })
    .toBuffer();
  return `data:image/jpeg;base64,${buf.toString("base64")}`;
}

async function logo() {
  const buf = await sharp(join(process.cwd(), "public", "logo.png")).resize(200).png().toBuffer();
  return `data:image/png;base64,${buf.toString("base64")}`;
}

type Duzen = {
  /** Büyük başlık (Türkçe büyük harfe çevrilir) */
  baslik: string;
  /** Başlık üstü küçük etiket */
  ust?: string;
  /** Başlık altı satırı */
  alt?: string;
  foto: string;
  leke: OgRenk;
};

const tr = (s: string) => s.toLocaleUpperCase("tr-TR");

export async function ogDuzeni({ baslik, ust, alt, foto, leke }: Duzen) {
  const [fotoUrl, logoUrl] = await Promise.all([fotograf(foto, 400, 500), logo()]);
  const uzun = baslik.length > 18;

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", background: renk.cream, fontFamily: "Bebas Neue", position: "relative" }}>
      {/* sol: metin */}
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "56px 0 0 64px", width: 700 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- Satori */}
          <img src={logoUrl} width={96} height={84} alt="" />
          <span style={{ fontSize: 34, letterSpacing: 2, color: renk.indigo }}>{tr(site.ad)}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {ust ? <span style={{ fontSize: 30, letterSpacing: 4, color: renk.orange }}>{tr(ust)}</span> : null}
          <span style={{ fontSize: uzun ? 104 : 132, lineHeight: 0.92, letterSpacing: 2, color: renk.indigo, marginTop: 8 }}>{tr(baslik)}</span>
          {alt ? <span style={{ fontSize: 36, letterSpacing: 2, color: renk.indigo, marginTop: 18, opacity: 0.85 }}>{tr(alt)}</span> : null}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: renk.indigo,
            color: "white",
            fontSize: 30,
            letterSpacing: 3,
            height: 84,
            margin: "0 0 0 -64px",
            padding: "0 40px 0 64px",
            width: 764,
          }}
        >
          <span>{tr("Türkiye geneli kapıya teslim")}</span>
          <span>{site.telefonlar[0].gorunen}</span>
        </div>
      </div>
      {/* sağ: leke + fotoğraf */}
      {/* eslint-disable-next-line @next/next/no-img-element -- Satori */}
      <img src={blobSvg(renk[leke])} width={620} height={620} alt="" style={{ position: "absolute", right: -150, top: -120 }} />
      {/* eslint-disable-next-line @next/next/no-img-element -- Satori */}
      <img
        src={fotoUrl}
        width={400}
        height={500}
        alt=""
        style={{ position: "absolute", right: 64, top: 64, borderRadius: 8, border: "8px solid white", transform: "rotate(-2deg)" }}
      />
    </div>
  );
}
