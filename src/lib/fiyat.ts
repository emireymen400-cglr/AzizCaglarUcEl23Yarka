import type { Fiyat } from "@/content/tavuklar";

/** "1.250 ₺ / adet" (CLAUDE.md §10: tr-TR biçimi) */
export function fiyatMetni(f: Fiyat): string {
  return `${new Intl.NumberFormat("tr-TR").format(f.tutar)} ₺ / ${f.birim}`;
}
