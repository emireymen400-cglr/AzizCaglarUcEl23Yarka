import { ImageResponse } from "next/og";
import { turBul, turSluglari } from "@/content/tavuklar";
import { ogBoyut, ogDuzeni, ogFontlari, ogTur } from "@/lib/og";

export const size = ogBoyut;
export const contentType = ogTur;
export const alt = "Üçel 23 Yarka tür görseli";

export function generateStaticParams() {
  return turSluglari.map((slug) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tur = turBul(slug);
  if (!tur) return new Response("Bulunamadı", { status: 404 });
  // "Pleymut (Plymouth Rock)" gibi uzun adlarda parantezi alt satıra al
  const [ad, ek] = tur.ad.split(" (");
  return new ImageResponse(
    await ogDuzeni({
      ust: `${tur.kullanim} · ${tur.yumurtaRengi} yumurta`,
      baslik: `${ad} yarka`,
      alt: ek ? ek.replace(")", "") : tur.tip,
      foto: tur.gorseller[0].src,
      leke: tur.accent,
    }),
    { ...size, fonts: await ogFontlari() },
  );
}
