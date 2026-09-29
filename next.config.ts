import type { NextConfig } from "next";

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

const nextConfig: NextConfig = {
  async redirects() {
    return eskiYollar.flatMap(([eski, yeni]) => {
      const kodlu = encodeURI(eski);
      const kaynaklar = kodlu === eski ? [eski] : [eski, kodlu];
      return kaynaklar.map((source) => ({ source, destination: yeni, permanent: true }));
    });
  },
};

export default nextConfig;
