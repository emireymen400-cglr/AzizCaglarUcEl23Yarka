// /llms.txt — AI araçları için firma özeti (CLAUDE.md §5). İçerikten üretilir, build'de statik.

import { site } from "@/content/site";
import { tavuklar } from "@/content/tavuklar";
import { teslimatBilgileri } from "@/content/teslimat";
import { tamUrl } from "@/lib/schema";

export const dynamic = "force-static";

export function GET() {
  const satirlar = [
    `# ${site.ad}`,
    "",
    `> ${site.aciklama}`,
    "",
    `${site.tamAd} (${site.sahip}), ${site.adres.ilce} / ${site.adres.il} merkezli bir yumurtacı yarka (genç dişi tavuk) üreticisidir. Canlı yarka satışı yapar; fiyatlar sık değiştiği için sitede fiyat yayınlanmaz, telefon veya WhatsApp ile bilgi verilir.`,
    "",
    "## Hizmet bölgesi ve teslimat",
    "",
    ...teslimatBilgileri.map((b) => `- ${b.baslik}: ${b.metin}`),
    "",
    "## Türler",
    "",
    ...tavuklar.map((t) => `- [${t.ad}](${tamUrl(`/tavuklarimiz/${t.slug}`)}): ${t.kisaAciklama} Yumurta rengi: ${t.yumurtaRengi}.`),
    "",
    "## Sayfalar",
    "",
    `- [Tüm türler ve karşılaştırma](${tamUrl("/tavuklarimiz")})`,
    `- [Teslimat](${tamUrl("/teslimat")})`,
    `- [Sıkça sorulan sorular](${tamUrl("/sikca-sorulan-sorular")})`,
    `- [Galeri](${tamUrl("/galeri")})`,
    `- [Hakkımızda](${tamUrl("/hakkimizda")})`,
    `- [İletişim](${tamUrl("/iletisim")})`,
    "",
    "## İletişim",
    "",
    ...site.telefonlar.map((t) => `- Telefon${t.whatsapp ? " ve WhatsApp" : ""}: ${t.gorunen} (${t.e164})`),
    `- Adres: ${site.adres.tamMetin}`,
    `- Konum: ${site.konum.haritaUrl}`,
    `- Çalışma saatleri: ${site.calismaSaatleri.metin}`,
    ...site.sosyal.map((s) => `- ${s.ad}: ${s.url}`),
    "",
  ];
  return new Response(satirlar.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
