import type { Metadata } from "next";
import { site } from "@/content/site";

type SayfaMeta = {
  /** ≤ 44 karakter (şablon " | Üçel 23 Yarka" ekler, toplam ≤ 60) */
  baslik: string;
  /** ≤ 155 karakter */
  aciklama: string;
  yol: string;
  gorsel?: { src: string; alt: string; w?: number; h?: number };
  indekslenmesin?: boolean;
  /** Başlık şablonu uygulanmayan sayfalar için (ana sayfa: şablon kendi segmentine uygulanmaz) */
  mutlak?: boolean;
};

const VARSAYILAN_GORSEL = { src: "/og-logo.png", alt: site.ad, w: 1200, h: 630 };

export function sayfaMeta({ baslik, aciklama, yol, gorsel, indekslenmesin, mutlak }: SayfaMeta): Metadata {
  const g = gorsel ?? VARSAYILAN_GORSEL;
  const images = [{ url: g.src, alt: g.alt, width: g.w, height: g.h }];
  return {
    title: mutlak ? { absolute: `${baslik} | ${site.ad}` } : baslik,
    description: aciklama,
    alternates: { canonical: yol },
    openGraph: {
      type: "website",
      locale: "tr_TR",
      siteName: site.ad,
      title: `${baslik} | ${site.ad}`,
      description: aciklama,
      url: yol,
      images,
    },
    twitter: { card: "summary_large_image", title: `${baslik} | ${site.ad}`, description: aciklama, images },
    ...(indekslenmesin ? { robots: { index: false, follow: false } } : {}),
  };
}
