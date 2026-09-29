// JSON-LD üreticileri. Tüm veriler src/content/ altından okunur.

import { site } from "@/content/site";

type JsonLd = Record<string, unknown>;

const url = (yol = "/") => new URL(yol, site.domain).toString();

export function isletmeSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    "@id": url("/#isletme"),
    name: site.ad,
    alternateName: site.tamAd,
    description: site.aciklama,
    url: url("/"),
    logo: url("/logo.png"),
    image: url("/opengraph-image"),
    founder: { "@type": "Person", name: site.sahip },
    telephone: site.telefonlar.map((t) => t.e164),
    address: {
      "@type": "PostalAddress",
      streetAddress: site.adres.sokak,
      addressLocality: site.adres.ilce,
      addressRegion: site.adres.il,
      addressCountry: site.adres.ulke,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.konum.lat,
      longitude: site.konum.lng,
    },
    hasMap: site.konum.haritaUrl,
    areaServed: { "@type": "Country", name: "Türkiye", identifier: "TR" },
    openingHours: site.calismaSaatleri.schema,
    sameAs: site.sosyal.map((s) => s.url),
  };
}

export function breadcrumbSchema(adimlar: { ad: string; yol: string }[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ ad: "Ana Sayfa", yol: "/" }, ...adimlar].map((a, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: a.ad,
      item: url(a.yol),
    })),
  };
}

/** Sunucu tarafında <script type="application/ld+json"> içine basmak için güvenli metin. */
export function jsonLdMetni(veri: JsonLd | JsonLd[]): string {
  return JSON.stringify(veri).replace(/</g, "\\u003c");
}
