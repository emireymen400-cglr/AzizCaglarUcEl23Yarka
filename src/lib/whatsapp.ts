// WhatsApp ve telefon linkleri. Numara SADECE src/content/site.ts'den okunur.

import { site, type Telefon } from "@/content/site";

export const whatsappTelefon = site.telefonlar.find((t) => t.whatsapp) ?? site.telefonlar[0];
export const birincilTelefon = site.telefonlar[0];

/** Sayfaya özel hazır mesajlar */
export const mesajlar = {
  genel: "Merhaba, yarka hakkında bilgi almak istiyorum.",
  tavuklarimiz: "Merhaba, yarka türleriniz hakkında bilgi almak istiyorum.",
  teslimat: "Merhaba, bulunduğum yere yarka teslimatı hakkında bilgi almak istiyorum.",
  galeri: "Merhaba, yarkalarınız hakkında bilgi almak istiyorum.",
  sss: "Merhaba, yarkalarla ilgili bir sorum var.",
  hakkimizda: "Merhaba, çiftliğiniz ve yarkalarınız hakkında bilgi almak istiyorum.",
  iletisim: "Merhaba, yarka hakkında bilgi almak istiyorum.",
  ziyaret: "Merhaba, çiftliğinizi ziyaret etmek istiyorum. Uygun bir zaman var mı?",
} as const;

export function whatsappLinki(mesaj: string = mesajlar.genel): string {
  return `https://wa.me/${whatsappTelefon.e164.replace("+", "")}?text=${encodeURIComponent(mesaj)}`;
}

export function telLinki(telefon: Telefon = birincilTelefon): string {
  return `tel:${telefon.e164}`;
}

/**
 * GA4 olay adları (CLAUDE.md §7). Linklere data-olay / data-tur olarak yazılır;
 * analitik, çerez onayından sonra bu öznitelikleri dinleyerek olay gönderir.
 */
export const olaylar = {
  whatsapp: "whatsapp_click",
  telefon: "phone_click",
} as const;
