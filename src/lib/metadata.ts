import type { Metadata } from "next";
import { site } from "@/content/site";

type SayfaMeta = {
  /** ≤ 44 karakter (şablon başa "Üçel 23 Yarka - " ekler, toplam ≤ 60) */
  baslik: string;
  /** ≤ 155 karakter */
  aciklama: string;
  yol: string;
  gorsel?: { src: string; alt: string; w?: number; h?: number };
  indekslenmesin?: boolean;
  /** Segmentin kendi opengraph-image dosyası varsa true (tür sayfaları) */
  kendiOgGorseli?: boolean;
  /** Başlık şablonu uygulanmayan sayfalar için (ana sayfa: şablon kendi segmentine uygulanmaz) */
  mutlak?: boolean;
};

/** Tarayıcı sekmesi ve arama sonucu başlığı: "Üçel 23 Yarka - Sayfa adı" (kullanıcı isteği, 2026-09-30) */
export function tamBaslik(baslik: string): string {
  return `${site.ad} - ${baslik}`;
}

export function sayfaMeta({ baslik, aciklama, yol, gorsel, indekslenmesin, mutlak, kendiOgGorseli }: SayfaMeta): Metadata {
  // Sayfa openGraph tanımlayınca kökteki opengraph-image miras kalmıyor; bu yüzden açıkça eklenir.
  // Segmentin kendi OG dosyası varsa (tür sayfaları) hiç görsel verilmez, dosya kullanılır.
  const images = kendiOgGorseli
    ? undefined
    : gorsel
      ? [{ url: gorsel.src, alt: gorsel.alt, width: gorsel.w, height: gorsel.h }]
      : [{ url: "/opengraph-image", alt: `${site.ad} – Sağlıklı yarka, kapınıza kadar`, width: 1200, height: 630, type: "image/png" }];
  return {
    title: mutlak ? { absolute: tamBaslik(baslik) } : baslik,
    description: aciklama,
    alternates: { canonical: yol },
    openGraph: {
      type: "website",
      locale: "tr_TR",
      siteName: site.ad,
      title: tamBaslik(baslik),
      description: aciklama,
      url: yol,
      ...(images ? { images } : {}),
    },
    twitter: { card: "summary_large_image", title: tamBaslik(baslik), description: aciklama, ...(images ? { images } : {}) },
    ...(indekslenmesin ? { robots: { index: false, follow: false } } : {}),
  };
}
