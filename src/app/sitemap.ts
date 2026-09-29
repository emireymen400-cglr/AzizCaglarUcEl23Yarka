import type { MetadataRoute } from "next";
import { tamUrl } from "@/lib/schema";
import { tavuklar } from "@/content/tavuklar";

// İçerik değiştiğinde güncellenir (içerik dosyalarında tarih tutulmadığı için tek tarih).
const SON_GUNCELLEME = new Date("2026-09-29");

export default function sitemap(): MetadataRoute.Sitemap {
  const sayfalar: { yol: string; oncelik: number }[] = [
    { yol: "/", oncelik: 1 },
    { yol: "/tavuklarimiz", oncelik: 0.9 },
    { yol: "/teslimat", oncelik: 0.8 },
    { yol: "/galeri", oncelik: 0.6 },
    { yol: "/sikca-sorulan-sorular", oncelik: 0.7 },
    { yol: "/hakkimizda", oncelik: 0.5 },
    { yol: "/iletisim", oncelik: 0.7 },
    { yol: "/kvkk", oncelik: 0.2 },
    { yol: "/cerez-politikasi", oncelik: 0.2 },
  ];
  return [
    ...sayfalar.map((s) => ({ url: tamUrl(s.yol), lastModified: SON_GUNCELLEME, priority: s.oncelik })),
    ...tavuklar.map((t) => ({
      url: tamUrl(`/tavuklarimiz/${t.slug}`),
      lastModified: SON_GUNCELLEME,
      priority: 0.8,
      images: t.gorseller.map((g) => tamUrl(g.src)),
    })),
  ];
}
