// JSON-LD üreticileri. Tüm veriler src/content/ altından okunur.

import type { GaleriVideosu } from "@/content/galeri";
import { VIDEO_YUKLEME_TARIHI } from "@/content/galeri";
import { site } from "@/content/site";
import type { Soru } from "@/content/sss";
import type { Tur } from "@/content/tavuklar";

type JsonLd = Record<string, unknown>;

export const tamUrl = (yol = "/") => new URL(yol, site.domain).toString();

export function isletmeSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    "@id": tamUrl("/#isletme"),
    name: site.ad,
    alternateName: site.tamAd,
    description: site.aciklama,
    url: tamUrl("/"),
    logo: tamUrl("/logo.png"),
    image: tamUrl("/og-logo.png"),
    founder: { "@type": "Person", name: site.sahip },
    foundingDate: String(site.kurulusYili),
    telephone: site.telefonlar.map((t) => t.e164),
    address: {
      "@type": "PostalAddress",
      streetAddress: site.adres.sokak,
      addressLocality: site.adres.ilce,
      addressRegion: site.adres.il,
      addressCountry: site.adres.ulke,
    },
    geo: { "@type": "GeoCoordinates", latitude: site.konum.lat, longitude: site.konum.lng },
    hasMap: site.konum.haritaUrl,
    areaServed: { "@type": "Country", name: "Türkiye", identifier: "TR" },
    openingHours: site.calismaSaatleri.schema,
    sameAs: site.sosyal.map((s) => s.url),
  };
}

export type Kirinti = { ad: string; yol: string };

export function breadcrumbSchema(adimlar: Kirinti[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ ad: "Ana Sayfa", yol: "/" }, ...adimlar].map((a, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: a.ad,
      item: tamUrl(a.yol),
    })),
  };
}

/** Fiyat kullanıcı kararıyla yok → Offer EKLENMEZ (CLAUDE.md §5). */
export function urunSchema(tur: Tur): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${tur.ad} yarka`,
    description: tur.kisaAciklama,
    image: tur.gorseller.map((g) => tamUrl(g.src)),
    category: "Canlı hayvan > Kanatlı > Yumurtacı yarka",
    brand: { "@type": "Brand", name: site.ad },
    url: tamUrl(`/tavuklarimiz/${tur.slug}`),
    additionalProperty: [
      { "@type": "PropertyValue", name: "Yumurta rengi", value: tur.yumurtaRengi },
      { "@type": "PropertyValue", name: "Kullanım", value: tur.kullanim },
    ],
  };
}

export function sssSchema(sorular: Soru[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: sorular.map((s) => ({
      "@type": "Question",
      name: s.soru,
      acceptedAnswer: { "@type": "Answer", text: s.cevap },
    })),
  };
}

export function videoSchema(v: GaleriVideosu): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: v.baslik,
    description: v.aciklama,
    thumbnailUrl: tamUrl(v.poster),
    uploadDate: VIDEO_YUKLEME_TARIHI,
    contentUrl: tamUrl(v.src),
    duration: `PT${v.sureSn}S`,
  };
}

/** Sunucu tarafında <script type="application/ld+json"> içine basmak için güvenli metin. */
export function jsonLdMetni(veri: JsonLd | JsonLd[]): string {
  return JSON.stringify(veri).replace(/</g, "\\u003c");
}
