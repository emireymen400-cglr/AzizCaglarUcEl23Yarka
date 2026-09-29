import { ImageResponse } from "next/og";
import { site } from "@/content/site";
import { ogBoyut, ogDuzeni, ogFontlari, ogTur } from "@/lib/og";

export const alt = `${site.ad} – Sağlıklı yarka, kapınıza kadar`;
export const size = ogBoyut;
export const contentType = ogTur;

export default async function Image() {
  return new ImageResponse(
    await ogDuzeni({
      ust: "Yumurtacı yarka",
      baslik: "Sağlıklı yarka, kapınıza kadar",
      alt: "Konya'daki çiftliğimizden kümesinize",
      foto: "/images/anasayfa/yesil-cayirda-kahverengi-tavuklar.webp",
      leke: "yolk",
    }),
    { ...size, fonts: await ogFontlari() },
  );
}
