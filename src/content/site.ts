// Site genel ayarları. Telefon, adres, sosyal link ve domain SADECE buradan okunur.

export type Telefon = {
  /** Ekranda görünen biçim */
  gorunen: string;
  /** E.164 biçimi (tel: ve JSON-LD için) */
  e164: string;
  whatsapp: boolean;
};

export type SosyalHesap = {
  ad: "Instagram" | "Facebook" | "Sahibinden";
  url: string;
};

export const site = {
  ad: "Üçel 23 Yarka",
  tamAd: "Üçel 23 Tavukçuluk",
  sahip: "Aziz Çağlar",
  domain: "https://ucel23yarka.com",
  eskiDomain: "https://www.xn--el23tavukuluk-hgbj93a.com",
  aciklama:
    "Konya'daki çiftliğimizden Türkiye'nin tüm il ve ilçelerine yumurtacı yarka. Lohmann Brown, Atak-S, Black Nick, Ligorin ve diğer türler kendi araçlarımızla kapınıza.",
  telefonlar: [
    { gorunen: "0536 396 47 97", e164: "+905363964797", whatsapp: true },
    { gorunen: "0536 475 00 21", e164: "+905364750021", whatsapp: false },
  ] satisfies Telefon[],
  adres: {
    sokak: "Erler, 14666 Sokak No:21",
    ilce: "Karatay",
    il: "Konya",
    ulke: "TR",
    tamMetin: "Erler, 14666 Sokak No:21, Karatay / Konya",
  },
  konum: {
    lat: 37.79174,
    lng: 32.6687905,
    haritaUrl: "https://www.google.com/maps?q=37.79174,32.6687905&z=17&hl=tr",
  },
  calismaSaatleri: {
    metin: "Haftanın 7 günü, 24 saat ulaşabilirsiniz",
    /** schema.org openingHours */
    schema: "Mo-Su 00:00-23:59",
  },
  sosyal: [
    { ad: "Instagram", url: "https://www.instagram.com/ucel23yarka/" },
    { ad: "Facebook", url: "https://www.facebook.com/share/r/1DPdBjTeEA/" },
    { ad: "Sahibinden", url: "https://ucel23tavukculuk.sahibinden.com/" },
  ] satisfies SosyalHesap[],
  googleIsletme: "https://share.google/T7QTrXCC1Dnaex3oc",
  /** KVKK veri sorumlusu. Vergi/kimlik numarası bilerek yayınlanmıyor. */
  veriSorumlusu: "Aziz Çağlar – Üçel 23 Tavukçuluk",
  gaId: process.env.NEXT_PUBLIC_GA_ID,
} as const;

export const birincilTelefon = site.telefonlar[0];
export const whatsappTelefon = site.telefonlar.find((t) => t.whatsapp) ?? birincilTelefon;

/** Sayfaya özel hazır mesajla wa.me linki üretir. */
export function whatsappLinki(mesaj = "Merhaba, yarka hakkında bilgi almak istiyorum."): string {
  const numara = whatsappTelefon.e164.replace("+", "");
  return `https://wa.me/${numara}?text=${encodeURIComponent(mesaj)}`;
}

export function telLinki(telefon: Telefon = birincilTelefon): string {
  return `tel:${telefon.e164}`;
}
