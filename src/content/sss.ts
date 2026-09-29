// Sıkça sorulan sorular. Kaynak: _kaynaklar/Sık Sorulan Sorular.txt (25 soru) + kullanıcının
// 2026-09-29 cevapları. Tekrar eden sorular birleştirildi, "Brown Nick" çıkarıldı.

import { tavuklar } from "./tavuklar";

export type SssKategori = "turler" | "siparis" | "teslimat" | "saglik" | "bakim";

export type Soru = {
  id: string;
  soru: string;
  cevap: string;
  kategori: SssKategori;
  /** Ana sayfadaki özet bölümde gösterilsin mi */
  oneCikan?: boolean;
};

export const kategoriler: { id: SssKategori; ad: string }[] = [
  { id: "turler", ad: "Türler ve seçim" },
  { id: "siparis", ad: "Sipariş ve fiyat" },
  { id: "teslimat", ad: "Teslimat" },
  { id: "saglik", ad: "Sağlık ve yaş" },
  { id: "bakim", ad: "Bakım ve destek" },
];

const turListesi = tavuklar.map((t) => t.ad.replace(/ \(.*\)$/, "")).join(", ");

export const sorular: Soru[] = [
  // Türler ve seçim
  {
    id: "hangi-turler",
    kategori: "turler",
    oneCikan: true,
    soru: "Hangi yarka çeşitlerini satıyorsunuz?",
    cevap: `${turListesi} yarkaları sunuyoruz. Stok döneme göre değiştiği için güncel durumu telefon veya WhatsApp'tan sorabilirsiniz.`,
  },
  {
    id: "hangi-yarka-uygun",
    kategori: "turler",
    oneCikan: true,
    soru: "Hangi yarka benim için daha uygun? Seçerken yardım alabilir miyim?",
    cevap:
      "Evet. Seçim; yumurta rengi beklentinize, kümesinizin koşullarına, gezen tavuk mu kapalı kümes mi yetiştireceğinize, bölgenizin iklimine ve işletmenizin büyüklüğüne göre değişir. Bize bu bilgileri yazın, size uygun türü birlikte belirleyelim.",
  },
  {
    id: "en-cok-yumurta",
    kategori: "turler",
    soru: "Hangi tavuk ırkı daha fazla yumurta verir?",
    cevap:
      "Her ırkın genetik yapısı ve üretim performansı farklıdır. Ama bakım, besleme, kümes koşulları ve sürü yönetimi de verimi en az ırk kadar etkiler. Bu yüzden seçim yaparken sadece yumurta sayısına değil, kendi yetiştirme koşullarınıza da bakmanızı öneririz.",
  },
  {
    id: "koy-gezen-tavuk",
    kategori: "turler",
    soru: "Köy ortamı ve gezen tavuk yetiştiriciliği için uygun yarka var mı?",
    cevap:
      "Evet. Uygun barınak ve bakım sağlandığında birçok tür köyde ve serbest dolaşım sisteminde yetiştirilebilir. Atak-S, Tinted Coral, Sussex ve Pleymut açık alana özellikle uygundur. İhtiyacınıza göre öneride bulunuruz.",
  },
  {
    id: "farkli-turler-ayni-siparis",
    kategori: "turler",
    soru: "Birden fazla türden aynı anda sipariş verebilir miyim?",
    cevap: "Evet. Stok durumuna göre farklı türleri aynı siparişte alabilirsiniz.",
  },

  // Sipariş ve fiyat
  {
    id: "fiyat",
    kategori: "siparis",
    oneCikan: true,
    soru: "Fiyatlarınız nasıl belirleniyor? Toplu alımda indirim var mı?",
    cevap:
      "Fiyat; türe, yarkanın yaşına, adede ve teslimat bölgesine göre değişir ve sık güncellenir. Bu yüzden sitede fiyat yazmıyoruz. Toplu siparişlerde adede göre ayrıca fiyat veriyoruz. Güncel fiyat için bizi arayın ya da WhatsApp'tan yazın.",
  },
  {
    id: "whatsapp-siparis",
    kategori: "siparis",
    soru: "WhatsApp üzerinden sipariş verebilir miyim?",
    cevap:
      "Evet. İstediğiniz türü, adedi ve teslimat adresinizi yazmanız yeterli. Size güncel stok, fiyat ve teslimat bilgisini iletiriz.",
  },
  {
    id: "minimum-adet",
    kategori: "siparis",
    soru: "En az kaç adet yarka alabilirim?",
    cevap:
      "Minimum adet, teslimat bölgesine ve seçtiğiniz türe göre değişir. Bulunduğunuz yeri söylerseniz size net bilgi veririz.",
  },
  {
    id: "ciftlik-ziyaret",
    kategori: "siparis",
    soru: "Tavukları çiftlikte görerek satın alabilir miyim?",
    cevap:
      "Evet. Gelmeden önce bizi arayıp haber vermeniz yeterli. Çiftliğimiz Karatay / Konya'dadır.",
  },

  // Teslimat
  {
    id: "hangi-iller",
    kategori: "teslimat",
    oneCikan: true,
    soru: "Hangi il ve ilçelere teslimat yapıyorsunuz?",
    cevap:
      "Türkiye'nin tüm il ve ilçelerine teslimat yapıyoruz. Teslimat, bulunduğunuz yere göre planlanır.",
  },
  {
    id: "nasil-tasiniyor",
    kategori: "teslimat",
    oneCikan: true,
    soru: "Yarkalar nasıl taşınıyor? Yolda kayıp olursa ne oluyor?",
    cevap:
      "Yarkalar kendi araçlarımızla, sepetler içinde taşınır. Yolda yaşanan tüm kayıplar firmamıza aittir.",
  },
  {
    id: "teslimat-suresi",
    kategori: "teslimat",
    soru: "Sipariş verdikten sonra teslimat ne zaman yapılır?",
    cevap:
      "Siparişiniz alındıktan hemen sonra teslimat planlanır ve en kısa sürede kapınıza ulaştırılır. Kesin tarih ve adres bilgisi sipariş sırasında sizinle netleştirilir.",
  },
  {
    id: "teslimat-ucreti",
    kategori: "teslimat",
    soru: "Teslimat ücreti ne kadar?",
    cevap: "Teslimat ücreti bölgeye ve adede göre değişir. Bilgi için bizi arayın ya da WhatsApp'tan yazın.",
  },

  // Sağlık ve yaş
  {
    id: "asili-mi",
    kategori: "saglik",
    oneCikan: true,
    soru: "Yarkalar aşılı ve sağlıklı mı? Belge veriyor musunuz?",
    cevap:
      "Evet. Yarkalarımızın aşıları yapılır ve teslimat öncesinde sürünün sağlık durumu kontrol edilir. Aşı ve sağlık belgelerini bizi arayarak talep edebilirsiniz.",
  },
  {
    id: "teslim-yasi",
    kategori: "saglik",
    soru: "Yarkalar kaç haftalıkken teslim ediliyor?",
    cevap:
      "Yarkalarımız genellikle yumurtlamaya yakın yaşta satışa çıkar. Kesin yaş; türe ve o dönemki sürüye göre değişir, sipariş öncesinde size bildirilir.",
  },
  {
    id: "yumurtlama-baslangici",
    kategori: "saglik",
    soru: "Yarkalar yumurtlamaya ne zaman başlar?",
    cevap:
      "Yumurtlamanın başlangıcı; türe, yaşa, bakım, besleme ve çevre koşullarına göre değişir. Aldığınız türe göre size ayrıca bilgi veririz.",
  },
  {
    id: "yetistirme-kosullari",
    kategori: "saglik",
    soru: "Yarkalar hangi koşullarda yetiştiriliyor?",
    cevap:
      "Yarkalarımız çiftliğimizde sağlıklı ve verimli büyümeleri gözetilerek yetiştirilir. Teslimattan önce gerekli kontroller yapılır.",
  },

  // Bakım ve destek
  {
    id: "satis-sonrasi-destek",
    kategori: "bakim",
    soru: "Satın aldıktan sonra bakım konusunda destek alabilir miyim?",
    cevap:
      "Evet. Teslimattan sonra da bakım, besleme ve yetiştiricilik konularında sorularınızı yanıtlıyoruz.",
  },
  {
    id: "teslimde-dikkat",
    kategori: "bakim",
    soru: "Yarkalar teslim edildiğinde nelere dikkat etmeliyim?",
    cevap:
      "Yeni gelen yarkaları kümese yavaş yavaş alıştırın. Temiz suya her zaman ulaşabilmeleri, uygun yem ve yeterli barınak alanı en önemli konulardır.",
  },
];

export const oneCikanSorular = sorular.filter((s) => s.oneCikan);
