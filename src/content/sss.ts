// Sıkça sorulan sorular. Kaynak: _kaynaklar/Sık Sorulan Sorular.txt (25 soru) + kullanıcının
// 2026-09-29 cevapları. Tekrar eden sorular birleştirildi, "Brown Nick" çıkarıldı.

import { tavuklar, turSluglari } from "./tavuklar";

export type SssKategori = "turler" | "siparis" | "teslimat" | "saglik" | "bakim";

export type Soru = {
  id: string;
  soru: string;
  cevap: string;
  kategori: SssKategori;
  /** Bu sorunun gösterileceği tür sayfaları */
  turler: string[];
  /** Ana sayfadaki özet bölümde gösterilsin mi */
  oneCikan?: boolean;
};

/** Her tür için geçerli genel sorular */
const TUMU = turSluglari;
/** .txt'lerde açık alan / gezen tavuk / bahçe yetiştiriciliğine uygun denen türler */
const ACIK_ALAN = ["atak-s", "black-nick", "tinted-coral", "sussex", "pleymut"];

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
    turler: TUMU,
    oneCikan: true,
    soru: "Hangi yarka çeşitlerini satıyorsunuz?",
    cevap: `${turListesi} yarkaları sunuyoruz. Stok döneme göre değiştiği için güncel durumu telefon veya WhatsApp'tan sorabilirsiniz.`,
  },
  {
    id: "hangi-yarka-uygun",
    kategori: "turler",
    turler: TUMU,
    oneCikan: true,
    soru: "Hangi yarka benim için daha uygun? Seçerken yardım alabilir miyim?",
    cevap:
      "Evet. Seçim; yumurta rengi beklentinize, kümesinizin koşullarına, gezen tavuk mu kapalı kümes mi yetiştireceğinize, bölgenizin iklimine ve işletmenizin büyüklüğüne göre değişir. Bize bu bilgileri yazın, size uygun türü birlikte belirleyelim.",
  },
  {
    id: "en-cok-yumurta",
    kategori: "turler",
    turler: TUMU,
    soru: "Hangi tavuk ırkı daha fazla yumurta verir?",
    cevap:
      "Her ırkın genetik yapısı ve üretim performansı farklıdır. Ama bakım, besleme, kümes koşulları ve sürü yönetimi de verimi en az ırk kadar etkiler. Bu yüzden seçim yaparken sadece yumurta sayısına değil, kendi yetiştirme koşullarınıza da bakmanızı öneririz.",
  },
  {
    id: "koy-gezen-tavuk",
    kategori: "turler",
    turler: ACIK_ALAN,
    soru: "Köy ortamı ve gezen tavuk yetiştiriciliği için uygun yarka var mı?",
    cevap:
      "Evet. Uygun barınak ve bakım sağlandığında birçok tür köyde ve serbest dolaşım sisteminde yetiştirilebilir. Atak-S, Black Nick, Tinted Coral, Sussex ve Pleymut açık alana özellikle uygundur. İhtiyacınıza göre öneride bulunuruz.",
  },
  {
    id: "farkli-turler-ayni-siparis",
    kategori: "turler",
    turler: TUMU,
    soru: "Birden fazla türden aynı anda sipariş verebilir miyim?",
    cevap: "Evet. Stok durumuna göre farklı türleri aynı siparişte alabilirsiniz.",
  },

  // Sipariş ve fiyat
  {
    id: "fiyat",
    kategori: "siparis",
    turler: TUMU,
    oneCikan: true,
    soru: "Fiyatlarınız nasıl belirleniyor? Toplu alımda indirim var mı?",
    cevap:
      "Fiyat; türe, yarkanın yaşına, adede ve teslimat bölgesine göre değişir. Toplu siparişlerde adede göre ayrıca fiyat veriyoruz. Fiyat ve güncel stok bilgisi için bizi arayabilir veya WhatsApp üzerinden yazabilirsiniz. Size mevcut yarka çeşitleri ve sipariş seçenekleri hakkında güncel bilgi verelim.",
  },
  {
    id: "whatsapp-siparis",
    kategori: "siparis",
    turler: TUMU,
    soru: "WhatsApp üzerinden sipariş verebilir miyim?",
    cevap:
      "Evet. İstediğiniz türü, adedi ve teslimat adresinizi yazmanız yeterli. Size güncel stok, fiyat ve teslimat bilgisini iletiriz.",
  },
  {
    id: "minimum-adet",
    kategori: "siparis",
    turler: TUMU,
    soru: "En az kaç adet yarka alabilirim?",
    cevap:
      "Minimum adet, teslimat bölgesine ve seçtiğiniz türe göre değişir. Bulunduğunuz yeri söylerseniz size net bilgi veririz.",
  },
  {
    id: "ciftlik-ziyaret",
    kategori: "siparis",
    turler: TUMU,
    soru: "Tavukları çiftlikte görerek satın alabilir miyim?",
    cevap:
      "Evet. Gelmeden önce bizi arayıp haber vermeniz yeterli. Çiftliğimiz Karatay / Konya'dadır.",
  },

  // Teslimat
  {
    id: "hangi-iller",
    kategori: "teslimat",
    turler: TUMU,
    oneCikan: true,
    soru: "Hangi il ve ilçelere teslimat yapıyorsunuz?",
    cevap:
      "Türkiye'nin tüm il ve ilçelerine teslimat yapıyoruz. Teslimat, bulunduğunuz yere göre planlanır.",
  },
  {
    id: "nasil-tasiniyor",
    kategori: "teslimat",
    turler: TUMU,
    oneCikan: true,
    soru: "Yarkalar nasıl taşınıyor? Yolda kayıp olursa ne oluyor?",
    cevap:
      "Yarkalar kendi araçlarımızla, sepetler içinde taşınır. Yolda yaşanan tüm kayıplar firmamıza aittir.",
  },
  {
    id: "teslimat-suresi",
    kategori: "teslimat",
    turler: TUMU,
    soru: "Sipariş verdikten sonra teslimat ne zaman yapılır?",
    cevap:
      "Siparişiniz alındıktan hemen sonra teslimat planlanır ve en kısa sürede kapınıza ulaştırılır. Kesin tarih ve adres bilgisi sipariş sırasında sizinle netleştirilir.",
  },
  {
    id: "teslimat-ucreti",
    kategori: "teslimat",
    turler: TUMU,
    soru: "Teslimat ücreti ne kadar?",
    cevap: "Teslimat ücreti bölgeye ve adede göre değişir. Bilgi için bizi arayın ya da WhatsApp'tan yazın.",
  },

  // Sağlık ve yaş
  {
    id: "asili-mi",
    kategori: "saglik",
    turler: TUMU,
    oneCikan: true,
    soru: "Yarkalar aşılı ve sağlıklı mı? Belge veriyor musunuz?",
    cevap:
      "Evet. Yarkalarımızın aşıları yapılır ve teslimat öncesinde sürünün sağlık durumu kontrol edilir. Aşı ve sağlık belgelerini bizi arayarak talep edebilirsiniz.",
  },
  {
    id: "teslim-yasi",
    kategori: "saglik",
    turler: TUMU,
    soru: "Yarkalar kaç haftalıkken teslim ediliyor?",
    cevap:
      "Yarkalarımız genellikle yumurtlamaya yakın yaşta satışa çıkar. Kesin yaş; türe ve o dönemki sürüye göre değişir, sipariş öncesinde size bildirilir.",
  },
  {
    id: "yumurtlama-baslangici",
    kategori: "saglik",
    turler: TUMU,
    soru: "Yarkalar yumurtlamaya ne zaman başlar?",
    cevap:
      "Yumurtlamanın başlangıcı; türe, yaşa, bakım, besleme ve çevre koşullarına göre değişir. Aldığınız türe göre size ayrıca bilgi veririz.",
  },
  {
    id: "yetistirme-kosullari",
    kategori: "saglik",
    turler: TUMU,
    soru: "Yarkalar hangi koşullarda yetiştiriliyor?",
    cevap:
      "Yarkalarımız çiftliğimizde sağlıklı ve verimli büyümeleri gözetilerek yetiştirilir. Teslimattan önce gerekli kontroller yapılır.",
  },

  // Bakım ve destek
  {
    id: "satis-sonrasi-destek",
    kategori: "bakim",
    turler: TUMU,
    soru: "Satın aldıktan sonra bakım konusunda destek alabilir miyim?",
    cevap:
      "Evet. Teslimattan sonra da bakım, besleme ve yetiştiricilik konularında sorularınızı yanıtlıyoruz.",
  },
  {
    id: "teslimde-dikkat",
    kategori: "bakim",
    turler: TUMU,
    soru: "Yarkalar teslim edildiğinde nelere dikkat etmeliyim?",
    cevap:
      "Yeni gelen yarkaları kümese yavaş yavaş alıştırın. Temiz suya her zaman ulaşabilmeleri, uygun yem ve yeterli barınak alanı en önemli konulardır.",
  },
];

export const oneCikanSorular = sorular.filter((s) => s.oneCikan);

export function turSorulari(slug: string): Soru[] {
  return sorular.filter((s) => s.turler.includes(slug));
}
