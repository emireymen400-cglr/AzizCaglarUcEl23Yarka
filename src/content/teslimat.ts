// Teslimat içeriği. Kaynak: EKSIKLER.md (kullanıcı cevapları #5, #6, #22) ve Sık Sorulan Sorular.txt.
// Süre, ücret ve bölge listesi gibi kesin bilgiler verilmedi; "arayın / yazın" yaklaşımı kullanılır.

export type TeslimatAdimi = {
  no: number;
  baslik: string;
  metin: string;
  /** DESIGN.md: her adımda küçük çizgi illüstrasyon */
  illustrasyon: "yumurta" | "tuy" | "cit" | "tavuk";
};

export type TeslimatBilgisi = {
  baslik: string;
  metin: string;
};

/** DESIGN.md §6 "Teslimat süreci": Sipariş → Aşı ve sağlık kontrolü → Yola çıkış → Kapınızda teslim */
export const teslimatAdimlari: TeslimatAdimi[] = [
  {
    no: 1,
    baslik: "Sipariş",
    metin: "WhatsApp'tan yazın ya da arayın. İstediğiniz türü, adedi ve teslimat adresinizi iletmeniz yeterli; güncel stok, fiyat ve teslimat bilgisini size bildiririz.",
    illustrasyon: "yumurta",
  },
  {
    no: 2,
    baslik: "Aşı ve sağlık kontrolü",
    metin: "Yarkalarımızın aşıları yapılır ve teslimattan önce sürünün sağlık durumu kontrol edilir.",
    illustrasyon: "tuy",
  },
  {
    no: 3,
    baslik: "Kendi aracımızla yola çıkış",
    metin: "Siparişiniz alındıktan hemen sonra teslimat planlanır. Yarkalar kendi araçlarımızla, sepetler içinde yola çıkar.",
    illustrasyon: "cit",
  },
  {
    no: 4,
    baslik: "Kapınızda teslim",
    metin: "Yarkalarınız en kısa sürede kapınıza ulaştırılır. Tarih ve adres, sipariş sırasında sizinle netleştirilir.",
    illustrasyon: "tavuk",
  },
];

export const teslimatBilgileri: TeslimatBilgisi[] = [
  {
    baslik: "Tüm il ve ilçelere",
    metin: "Türkiye'nin tüm il ve ilçelerine teslimat yapıyoruz. Teslimat, bulunduğunuz yere göre planlanır.",
  },
  {
    baslik: "Kendi araçlarımızla, sepetlerde",
    metin: "Yarkalar kargo ile değil, kendi araçlarımızla ve sepetler içinde taşınır.",
  },
  {
    baslik: "Yoldaki kayıplar bize ait",
    metin: "Taşıma sırasında yaşanan tüm kayıplar firmamıza aittir.",
  },
  {
    baslik: "En kısa sürede",
    metin: "Teslimat, sipariş alındıktan hemen sonra planlanır ve en kısa sürede yapılır.",
  },
  {
    baslik: "Ücret",
    metin: "Teslimat ücreti bölgeye ve adede göre değişir. Bilgi için arayın ya da WhatsApp'tan yazın.",
  },
  {
    baslik: "Aşı ve sağlık belgeleri",
    metin: "Aşılar yapılır; belgeleri bizi arayarak talep edebilirsiniz.",
  },
];

/** Teslimat sayfası ve ana sayfa teslimat bölümü için gerçek çiftlik fotoğrafı */
export const teslimatGorseli = {
  src: "/images/ciftlik/yarka-teslimat-araci-sepetler.webp",
  alt: "Sepetlere yerleştirilmiş yarkalarla yüklü teslimat aracı",
};

/** SSS'de teslimatla ilgili soruların kategorisi (sss.ts) */
export const teslimatSssKategorisi = "teslimat" as const;
