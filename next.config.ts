import type { NextConfig } from "next";
import { site } from "./src/content/site";

// Eski Wix sitesinden 301 yönlendirmeleri (CLAUDE.md §6).
// Türkçe karakterli yollar hem ham hem yüzde-kodlanmış haliyle eklenir.
const eskiYollar: [string, string][] = [
  ["/kurumsal", "/hakkimizda"],
  ["/tavuklarımız", "/tavuklarimiz"],
  ["/blacknick", "/tavuklarimiz/black-nick"],
  ["/lohmannsandy", "/tavuklarimiz/lohmann-sandy"],
  ["/lohmannbrown", "/tavuklarimiz/lohmann-brown"],
  ["/ligorin", "/tavuklarimiz/ligorin"],
  ["/tintedcoral", "/tavuklarimiz/tinted-coral"],
  ["/ataks", "/tavuklarimiz/atak-s"],
  ["/brownnick", "/tavuklarimiz"],
  ["/çiftliğimiz", "/galeri"],
  ["/contact-6", "/iletisim"],
];

// Aynı sitenin diğer adresleri tek adrese (ucel23yarka.com) toplanır. Google bu adreslerle
// listeleyince simge (favicon) göremiyor, mavi dünya çıkıyordu. Sadece production'da.
const ikincilAdresler = ["www.ucel23yarka.com", "aziz-caglar-uc-el23-yarka.vercel.app"];

const nextConfig: NextConfig = {
  // Hero posteri için 60 (mobilde fark görünmüyor, ~%30 daha küçük)
  images: { qualities: [60, 75] },
  async redirects() {
    const adresler =
      process.env.VERCEL_ENV === "production"
        ? ikincilAdresler.map((value) => ({
            source: "/:yol*",
            has: [{ type: "host" as const, value }],
            destination: `${site.domain}/:yol*`,
            permanent: true,
          }))
        : [];
    const yollar = eskiYollar.flatMap(([eski, yeni]) => {
      const kodlu = encodeURI(eski);
      const kaynaklar = kodlu === eski ? [eski] : [eski, kodlu];
      return kaynaklar.map((source) => ({ source, destination: yeni, permanent: true }));
    });
    return [...adresler, ...yollar];
  },
};

export default nextConfig;
