// Tür içerikleri.
// Kaynak: _kaynaklar/<TÜR>/hakkında.txt ve EKSIKLER.md'deki kullanıcı cevapları.
// Metinlerin üslubu sadeleştirildi, yeni bilgi eklenmedi. Kaynakta olmayan alan undefined kalır.

export type Accent = "yolk" | "orange" | "pasture" | "sky" | "straw";

export type Gorsel = {
  /** public/ altındaki yol */
  src: string;
  alt: string;
};

export type Ozellik = {
  baslik: string;
  metin: string;
};

export type Kaynak = { ad: string; url?: string };

/** Örnek: { tutar: 1250, birim: "adet", not: "16 haftalık" } → "1.250 ₺ / adet" */
export type Fiyat = {
  /** Türk lirası, sadece rakam (nokta/virgül yok): 1250 */
  tutar: number;
  birim: string;
  /** İsteğe bağlı kısa not: yaş, adet koşulu vb. */
  not?: string;
};

export type EkBolum = {
  baslik: string;
  metin: string;
  ozellikler: string[];
  gorseller: Gorsel[];
};

export type Tur = {
  slug: string;
  ad: string;
  /** Metinde bir kez doğal geçecek arama varyantı (ör. "Lohman Brown") */
  aramaVaryanti?: string;
  /** Kaynak metindeki tanım */
  tip: "Hibrit" | "Irk" | "Yerli ırk";
  kullanim: "Yumurtacı" | "Yumurta ve et";
  /** Kart ve liste için tek cümle */
  kisaAciklama: string;
  /** Detay sayfası paragrafları */
  uzunAciklama: string[];
  yumurtaRengi: string;
  yillikVerim?: string;
  ilkYumurtaHaftasi?: string;
  satisHaftalari?: string;
  iklim?: string;
  /** Sayısal verinin kaynağı (varsa sayfada gösterilir) */
  veriKaynagi?: Kaynak;
  ozellikler: Ozellik[];
  /** Kısa rozet listesi (.txt'deki "Üçel Yarka ürün kartı") */
  kart: string[];
  /** Uygun yetiştirme sistemleri */
  sistem: string;
  gorseller: Gorsel[];
  accent: Accent;
  /**
   * Şu an hiçbir türde yok (fiyatlar sık değiştiği için; EKSIKLER.md #3).
   * Girilirse tür sayfasında ve karşılaştırma tablosunda görünür, Google'a Offer olarak bildirilir.
   */
  fiyat?: Fiyat;
  seo: { title: string; description: string };
  whatsappMesaji: string;
  ekBolum?: EkBolum;
};

const img = (slug: string, no: number, alt: string): Gorsel => ({
  src: `/images/tavuklar/${slug}/${slug}-yarka-${String(no).padStart(2, "0")}.webp`,
  alt,
});

export const tavuklar: Tur[] = [
  {
    slug: "lohmann-brown",
    ad: "Lohmann Brown",
    aramaVaryanti: "Lohman Brown",
    tip: "Hibrit",
    kullanim: "Yumurtacı",
    kisaAciklama: "Ticari yumurtacılıkta en yaygın hibritlerden biri; erken yumurtlar, kahverengi ve kaliteli kabuklu yumurta verir.",
    uzunAciklama: [
      "Lohmann Brown, yumurta üretimi için geliştirilmiş kahverengi yumurtacı bir hibrittir. Türkiye'de çoğu zaman \"Lohman Brown\" diye de aranır. Düzenli üretimi ve kabuk kalitesiyle özellikle yumurta üreten işletmelerin sık tercih ettiği türlerdendir.",
      "Sakin karakteri kümes yönetimini kolaylaştırır. Uygun barınak, bakım ve beslemeyle yüksek üretim potansiyeline sahiptir.",
    ],
    yumurtaRengi: "Kahverengi",
    yillikVerim: "72. haftaya kadar tavuk başına 321 yumurta",
    ilkYumurtaHaftasi: "20–21. hafta (140–145. günde %50 verim)",
    veriKaynagi: {
      ad: "Lohmann Breeders, Lohmann Brown-Classic (alternatif barınak) üretici verisi",
      url: "https://lohmann-breeders.com/strains/lohmann-brown-classic-alternative-housing/",
    },
    ozellikler: [
      { baslik: "Yüksek yumurta verimi", metin: "Yumurta üretimi için geliştirilmiş, ticari yumurtacılıkta yaygın kullanılan bir hibrittir." },
      { baslik: "Kahverengi yumurta", metin: "Kendine özgü kahverengi kabuklu yumurtalarıyla bilinir." },
      { baslik: "Erken yumurtlama", metin: "Uygun bakım ve beslemeyle erken dönemde üretime başlar." },
      { baslik: "Yumurta kalitesi", metin: "Kabuk kalitesi ve düzenli üretimiyle tercih edilir." },
      { baslik: "Yemden verimli yararlanma", metin: "Yediği yemi yumurtaya iyi dönüştürür." },
      { baslik: "Sakin ve yönetimi kolay", metin: "Sakin karakteri kümes yönetimini kolaylaştırır." },
      { baslik: "Güçlü üretim performansı", metin: "Uygun barınma, bakım ve beslemeyle yüksek üretim potansiyeline sahiptir." },
    ],
    kart: ["Yüksek yumurta verimi", "Kahverengi yumurta", "Erken yumurtlama", "İyi yem değerlendirme", "Sakin karakter", "Ticari üretime uygun"],
    sistem: "Kümes, ticari işletme",
    accent: "orange",
    gorseller: [
      img("lohmann-brown", 2, "Yakın plan kızıl kahverengi tüylü Lohmann Brown yarkası"),
      img("lohmann-brown", 1, "Toprak zeminde duran kahverengi Lohmann Brown tavuğu"),
      img("lohmann-brown", 3, "Otların arasında eşelenen Lohmann Brown tavuğunun yakın çekimi"),
      img("lohmann-brown", 4, "Kümes önünde bir arada dolaşan kahverengi yumurtacı tavuklar"),
    ],
    seo: {
      title: "Lohmann Brown Yarka – Kahverengi Yumurtacı",
      description: "Lohmann Brown yarka: erken yumurtlayan, kahverengi yumurta veren sakin hibrit. Konya'dan Türkiye'nin her yerine teslimat. Bilgi için arayın.",
    },
    whatsappMesaji: "Merhaba, Lohmann Brown yarka hakkında bilgi almak istiyorum.",
  },
  {
    slug: "atak-s",
    ad: "Atak-S",
    tip: "Yerli ırk",
    kullanim: "Yumurtacı",
    kisaAciklama: "Türkiye'de geliştirilmiş yerli yumurtacı; iklimimize uyumlu, hareketli ve gezen tavuk sistemine uygun.",
    uzunAciklama: [
      "Atak-S, Türkiye'de geliştirilmiş ve yetiştiricilikte önemli yer tutan yerli bir yumurtacı ırktır. Genellikle kahverengi kabuklu yumurta verir.",
      "Türkiye'nin farklı bölgelerindeki koşullara uyum sağlamasıyla öne çıkar. Aktif ve hareketli yapısı onu açık alan ve gezen tavuk yetiştiriciliği için iyi bir seçenek yapar. Hem ticari hem hobi amaçlı, farklı ölçeklerde yetiştirilebilir.",
    ],
    yumurtaRengi: "Kahverengi",
    iklim: "Türkiye'nin farklı bölgelerindeki koşullara uyumlu",
    ozellikler: [
      { baslik: "Yerli yumurtacı", metin: "Türkiye'de geliştirilmiş, yetiştiricilikte kullanılan önemli yumurtacılardan biridir." },
      { baslik: "Yüksek yumurta verimi", metin: "Uygun bakım ve beslemeyle yüksek üretim potansiyeline sahiptir." },
      { baslik: "Kahverengi yumurta", metin: "Genellikle kahverengi kabuklu yumurta verir." },
      { baslik: "Serbest dolaşıma uygun", metin: "Açık alan ve gezen tavuk sistemlerinde tercih edilir." },
      { baslik: "İklime uyumlu", metin: "Türkiye'nin farklı bölgelerindeki yetiştirme koşullarına uyum sağlar." },
      { baslik: "İyi yem değerlendirme", metin: "Yemi ekonomik şekilde yumurtaya dönüştürür." },
      { baslik: "Dayanıklı ve hareketli", metin: "Farklı yetiştirme sistemlerine uyum sağlar; aktif yapısı açık alana uygundur." },
    ],
    kart: ["Yerli yumurtacı ırk", "Yüksek yumurta verimi", "Kahverengi yumurta", "Gezen tavuğa uygun", "Türkiye iklimine uyumlu", "Dayanıklı yapı"],
    sistem: "Kümes, gezen tavuk, açık alan",
    accent: "pasture",
    gorseller: [
      img("atak-s", 1, "Çimenlik alanda duran koyu tüylü Atak-S yarkası"),
      img("atak-s", 2, "Bahçede serbest dolaşan Atak-S tavuğu"),
    ],
    seo: {
      title: "Atak-S Yarka – Yerli Yumurtacı Irk",
      description: "Atak-S yarka: Türkiye'de geliştirilmiş, iklimimize uyumlu, gezen tavuğa uygun yerli yumurtacı. Türkiye geneli kapıya teslim. Bilgi için arayın.",
    },
    whatsappMesaji: "Merhaba, Atak-S yarka hakkında bilgi almak istiyorum.",
  },
  {
    slug: "black-nick",
    ad: "Black Nick",
    tip: "Hibrit",
    kullanim: "Yumurtacı",
    kisaAciklama: "Koyu tüylü, sakin ve verimli bir yumurtacı hibrit; kümeste de açık alanda da yetiştirilebilir.",
    uzunAciklama: [
      "Black Nick, koyu renkli tüyleriyle diğer yumurtacılardan kolayca ayırt edilen verimli bir hibrittir. Genellikle kahverengi kabuklu yumurta verir ve erken dönemde üretime başlar.",
      "Sakin ve uyumlu karakteri sürü yönetimini kolaylaştırır. Uygun bakımla kafessiz kümes, klasik kümes ve açık alan sistemlerinde yetiştirilebilir.",
    ],
    yumurtaRengi: "Kahverengi",
    iklim: "Uygun barınakla farklı çevre koşullarına uyum sağlar",
    ozellikler: [
      { baslik: "Yüksek yumurta verimi", metin: "Yumurta üretimi için tercih edilen verimli bir hibrittir." },
      { baslik: "Kahverengi yumurta", metin: "Genellikle kahverengi kabuklu yumurta verir." },
      { baslik: "Erken yumurtlama", metin: "Uygun bakım ve beslemeyle erken dönemde üretime başlar." },
      { baslik: "İyi yem değerlendirme", metin: "Yemden verimli yararlanmasıyla öne çıkar." },
      { baslik: "Sakin ve uyumlu", metin: "Sürü yönetimini kolaylaştıran bir karaktere sahiptir." },
      { baslik: "Farklı sistemlere uygun", metin: "Kafessiz, kümes ve açık alan sistemlerinde yetiştirilebilir." },
      { baslik: "Dikkat çekici görünüm", metin: "Koyu renkli tüyleriyle kolayca tanınır." },
    ],
    kart: ["Yüksek yumurta verimi", "Kahverengi yumurta", "Erken yumurtlama", "İyi yem değerlendirme", "Sakin ve uyumlu", "Açık alana uygun"],
    sistem: "Kafessiz kümes, kümes, açık alan",
    accent: "yolk",
    gorseller: [
      img("black-nick", 1, "Kuru otların arasında duran siyah tüylü Black Nick yarkası"),
      img("black-nick", 2, "Tünek dalında duran siyah Black Nick tavuğu"),
      img("black-nick", 3, "Köy kümesinin yanında dolaşan siyah tavuklar"),
      img("black-nick", 4, "Çimlerde eşelenen parlak siyah tüylü Black Nick tavuğu"),
      img("black-nick", 5, "Dal üzerinde yürüyen siyah yumurtacı tavuk"),
    ],
    seo: {
      title: "Black Nick Yarka – Siyah Tüylü Yumurtacı",
      description: "Black Nick yarka: koyu tüylü, sakin, erken yumurtlayan kahverengi yumurtacı hibrit. Konya'dan tüm il ve ilçelere teslimat. Bilgi için arayın.",
    },
    whatsappMesaji: "Merhaba, Black Nick yarka hakkında bilgi almak istiyorum.",
  },
  {
    slug: "ligorin",
    ad: "Ligorin",
    tip: "Irk",
    kullanim: "Yumurtacı",
    kisaAciklama: "Beyaz yumurtanın bilinen ırkı; erken yumurtlar, hareketli ve yemi ekonomik kullanır.",
    uzunAciklama: [
      "Ligorin, yumurtacı ırklar arasında verimiyle öne çıkan ve dünya genelinde yaygın yetiştirilen bir ırktır. Genellikle beyaz kabuklu yumurta verir.",
      "Canlı ve hareketli bir karakteri vardır. Uygun barınak ve bakımla farklı iklimlerde yetiştirilebilir; yemi ekonomik kullandığı için ticari üretimde tercih edilir.",
    ],
    yumurtaRengi: "Beyaz",
    iklim: "Uygun barınakla farklı iklimlerde yetiştirilebilir",
    ozellikler: [
      { baslik: "Yüksek yumurta verimi", metin: "Yumurtacı ırklar arasında verimliliğiyle öne çıkar." },
      { baslik: "Erken yumurtlama", metin: "Uygun bakım ve beslemeyle erken yaşta üretime başlar." },
      { baslik: "Yemden iyi yararlanma", metin: "Ekonomik bir yumurtacı olarak bilinir." },
      { baslik: "Hareketli ve aktif", metin: "Canlı karakteriyle dikkat çeker." },
      { baslik: "Farklı iklimlere uyum", metin: "Uygun barınakla çeşitli iklimlerde yetiştirilebilir." },
      { baslik: "Beyaz yumurta", metin: "Genellikle beyaz kabuklu yumurta verir." },
      { baslik: "Ticari yumurtacılığa uygun", metin: "Dünya genelinde yumurta üretimi için yaygın olarak yetiştirilir." },
    ],
    kart: ["Yüksek yumurta verimi", "Erken yumurtlama", "Yemden iyi yararlanma", "Beyaz yumurta", "Hareketli yapı", "Ticari üretime uygun"],
    sistem: "Kümes, ticari işletme",
    accent: "sky",
    gorseller: [
      img("ligorin", 2, "Çimenlikte gezen beyaz tüylü Ligorin yarkaları"),
      img("ligorin", 1, "Kümes avlusunda dolaşan beyaz Ligorin tavukları"),
    ],
    seo: {
      title: "Ligorin Yarka – Beyaz Yumurtacı Irk",
      description: "Ligorin yarka: beyaz yumurta veren, erken yumurtlayan, yemi ekonomik kullanan yumurtacı ırk. Türkiye geneli kapıya teslimat. Bilgi için arayın.",
    },
    whatsappMesaji: "Merhaba, Ligorin yarka hakkında bilgi almak istiyorum.",
  },
  {
    slug: "tinted-coral",
    ad: "Tinted Coral",
    tip: "Hibrit",
    kullanim: "Yumurtacı",
    kisaAciklama: "Krem renkli yumurta veren, sakin ve dayanıklı bir hibrit; salma yetiştiriciliğe uygun.",
    uzunAciklama: [
      "Tinted Coral, açık krem ve kırık beyaz tonlarında yumurta veren verimli bir hibrittir. Uygun bakım ve beslemeyle yaklaşık 17–20. haftalarda yumurtlamaya başlar.",
      "Dengeli ve düşük yem tüketimi, sakin karakteri ve farklı koşullara uyumuyla bilinir. Salma (gezen tavuk) sistemleri için de iyi bir seçenektir.",
    ],
    yumurtaRengi: "Krem / kırık beyaz",
    ilkYumurtaHaftasi: "Yaklaşık 17–20. hafta",
    ozellikler: [
      { baslik: "Yüksek yumurta verimi", metin: "Yumurta üretimi için geliştirilmiş verimli bir hibrittir." },
      { baslik: "Krem renkli yumurta", metin: "Açık krem ve kırık beyaz tonlarında yumurta verir." },
      { baslik: "Ekonomik yem tüketimi", metin: "Dengeli ve düşük yem tüketimiyle bilinir." },
      { baslik: "Erken yumurtlama", metin: "Yaklaşık 17–20. haftalarda yumurtlamaya başlar." },
      { baslik: "Sakin ve uysal", metin: "Sakin karakteri sürü yönetimini kolaylaştırır." },
      { baslik: "Uyumlu ve dayanıklı", metin: "Farklı yetiştirme koşullarına uyum sağlar." },
      { baslik: "Salma yetiştiriciliğe uygun", metin: "Gezen tavuk sistemlerinde rahatlıkla yetiştirilir." },
    ],
    kart: ["Yüksek yumurta verimi", "Krem renkli yumurta", "Ekonomik yem tüketimi", "Erken yumurtlama", "Sakin ve uysal", "Salma yetiştiriciliğe uygun"],
    sistem: "Kümes, salma / gezen tavuk",
    accent: "straw",
    gorseller: [
      img("tinted-coral", 1, "Çiftlikte kameraya bakan açık renkli Tinted Coral yarkası"),
      img("tinted-coral", 2, "Kümeste bir arada duran açık tüylü Tinted Coral tavukları"),
      img("tinted-coral", 3, "Yeşil çimenlikte yem arayan beyaz tüylü tavuklar"),
    ],
    seo: {
      title: "Tinted Coral Yarka – Krem Yumurtalı Hibrit",
      description: "Tinted Coral yarka: krem renkli yumurta, 17–20. haftada yumurtlama, sakin ve salma yetiştiriciliğe uygun. Türkiye geneli teslimat. Bilgi alın.",
    },
    whatsappMesaji: "Merhaba, Tinted Coral yarka hakkında bilgi almak istiyorum.",
  },
  {
    slug: "lohmann-sandy",
    ad: "Lohmann Sandy",
    aramaVaryanti: "Lohman Sandy",
    tip: "Hibrit",
    kullanim: "Yumurtacı",
    kisaAciklama: "Açık renkli yumurtasıyla bilinen, sakin ve üretim dönemi boyunca istikrarlı bir hibrit.",
    uzunAciklama: [
      "Lohmann Sandy, krem ve bej tonlarındaki açık renkli yumurtalarıyla öne çıkan verimli bir hibrittir. \"Lohman Sandy\" olarak da aranır.",
      "Sakin ve yönetimi kolay bir yapısı vardır. Uygun kümes koşullarında farklı yetiştirme sistemlerine uyum sağlar ve üretim döneminde istikrarlı performans gösterir.",
    ],
    yumurtaRengi: "Krem / bej",
    ozellikler: [
      { baslik: "Yüksek yumurta verimi", metin: "Yumurta üretimi için geliştirilmiş verimli bir hibrittir." },
      { baslik: "Açık renkli yumurta", metin: "Krem ve bej tonlarında yumurta verir." },
      { baslik: "Erken yumurtlama", metin: "Uygun koşullarda erken dönemde üretime başlar." },
      { baslik: "İyi yem değerlendirme", metin: "Yemden verimli yararlanır." },
      { baslik: "Dayanıklı ve uyumlu", metin: "Farklı kümes sistemlerine uyum sağlar." },
      { baslik: "Sakin karakter", metin: "Yönetimi kolay bir hibrittir." },
      { baslik: "Uzun üretim dönemi", metin: "Uygun bakım ve beslemeyle istikrarlı performans gösterir." },
    ],
    kart: ["Yüksek yumurta verimi", "Açık renkli yumurta", "Erken yumurtlama", "İyi yem değerlendirme", "Sakin ve uyumlu", "Ticari üretime uygun"],
    sistem: "Kümes, ticari işletme",
    accent: "yolk",
    gorseller: [
      img("lohmann-sandy", 1, "Kümes avlusunda yürüyen beyaz tüylü Lohmann Sandy yarkası"),
      img("lohmann-sandy", 2, "Çimenlikte duran açık renkli yumurtacı tavuk"),
    ],
    seo: {
      title: "Lohmann Sandy Yarka – Açık Renkli Yumurta",
      description: "Lohmann Sandy yarka: krem-bej yumurta veren, sakin, üretimi istikrarlı yumurtacı hibrit. Konya'dan Türkiye geneline teslimat. Bilgi için arayın.",
    },
    whatsappMesaji: "Merhaba, Lohmann Sandy yarka hakkında bilgi almak istiyorum.",
  },
  {
    slug: "sussex",
    ad: "Sussex",
    tip: "Irk",
    kullanim: "Yumurta ve et",
    kisaAciklama: "Hem yumurta hem et için yetiştirilen, iri yapılı, sakin ve gösterişli bir ırk.",
    uzunAciklama: [
      "Sussex, hem yumurta hem et için tercih edilen çift amaçlı bir ırktır. Kremden açık kahverengiye uzanan tonlarda yumurta verir.",
      "Dolgun ve güçlü yapısı, uysal karakteri ve iyi yem arama yeteneğiyle açık alana uygundur. Light Sussex çeşidi beyaz tüyleri ile boyun ve kuyruktaki siyah tüyleriyle hemen tanınır. Hobi ve ticari yetiştiricilikte değerlendirilebilir.",
    ],
    yumurtaRengi: "Krem – açık kahverengi",
    iklim: "Uygun barınakla farklı iklimlerde yetiştirilebilir",
    ozellikler: [
      { baslik: "Çift amaçlı", metin: "Hem yumurta hem et üretimi için tercih edilir." },
      { baslik: "İri ve güçlü yapı", metin: "Dolgun vücut yapısına sahiptir." },
      { baslik: "İyi yumurta verimi", metin: "Uygun bakımla düzenli yumurta verir." },
      { baslik: "Açık kahverengi yumurta", metin: "Kremden açık kahverengiye uzanan tonlarda yumurta verir." },
      { baslik: "Sakin karakter", metin: "Uysal ve yönetimi kolaydır." },
      { baslik: "İyi yem arar", metin: "Açık alan yetiştiriciliğine uyum sağlayan aktif bir ırktır." },
      { baslik: "Gösterişli görünüm", metin: "Light Sussex, beyaz tüy ve siyah boyun-kuyruk deseniyle dikkat çeker." },
    ],
    kart: ["Yumurta ve et için", "İri ve güçlü yapı", "İyi yumurta verimi", "Açık kahverengi yumurta", "Sakin karakter", "Açık alana uygun"],
    sistem: "Bahçe, açık alan, hobi",
    accent: "pasture",
    gorseller: [
      img("sussex", 1, "Çimenlerin arasında duran beyaz tüylü, siyah boyunlu Light Sussex tavuğu"),
      img("sussex", 2, "Yeşil çayırda yem arayan Light Sussex tavuğu"),
    ],
    seo: {
      title: "Sussex Yarka – Yumurta ve Et İçin",
      description: "Sussex yarka: iri yapılı, sakin, açık kahverengi yumurta veren çift amaçlı ırk. Açık alana uygun. Türkiye geneli kapıya teslimat. Bilgi alın.",
    },
    whatsappMesaji: "Merhaba, Sussex yarka hakkında bilgi almak istiyorum.",
  },
  {
    slug: "pleymut",
    ad: "Pleymut (Plymouth Rock)",
    aramaVaryanti: "Plymouth Rock",
    tip: "Irk",
    kullanim: "Yumurta ve et",
    kisaAciklama: "Siyah-beyaz çizgili tüyleriyle tanınan, soğuğa dayanıklı, iri ve sakin çift amaçlı ırk.",
    uzunAciklama: [
      "Pleymut, dünyada Plymouth Rock adıyla bilinen, uzun yıllardır yetiştirilen köklü bir ırktır. Hem yumurta hem et için yetiştirilir ve genellikle büyük boy, kahverengi kabuklu yumurta verir.",
      "Siyah-beyaz çizgili tüyleriyle çok gösterişlidir. Uysal karakteri ve özellikle soğuk havaya dayanıklılığıyla bahçe ve kümes yetiştiriciliği için uygundur.",
    ],
    yumurtaRengi: "Kahverengi",
    iklim: "Soğuk havaya dayanıklı",
    ozellikler: [
      { baslik: "Çift amaçlı", metin: "Hem yumurta hem et üretimi için uygundur." },
      { baslik: "İri ve güçlü yapı", metin: "Dolgun vücut yapısıyla dikkat çeker." },
      { baslik: "İyi yumurta verimi", metin: "Uygun bakımla düzenli yumurta verir." },
      { baslik: "Kahverengi yumurta", metin: "Genellikle büyük boy, kahverengi kabuklu yumurta verir." },
      { baslik: "Soğuğa dayanıklı", metin: "Özellikle soğuk hava koşullarına dayanıklılığıyla tanınır." },
      { baslik: "Sakin karakter", metin: "Uysal ve yönetimi kolaydır." },
      { baslik: "Gösterişli görünüm", metin: "Siyah-beyaz çizgili tüyleri çok dikkat çekicidir." },
    ],
    kart: ["İri ve güçlü yapı", "Yumurta ve et için", "Kahverengi yumurta", "Sakin karakter", "Dayanıklı yapı", "Kümes ve bahçeye uygun"],
    sistem: "Bahçe, kümes, açık alan",
    accent: "sky",
    gorseller: [
      img("pleymut", 2, "Saman üzerinde duran iki siyah-beyaz çizgili Pleymut tavuğu"),
      img("pleymut", 1, "Kuru yapraklar arasında yürüyen çizgili tüylü Pleymut (Plymouth Rock) tavuğu"),
    ],
    seo: {
      title: "Pleymut (Plymouth Rock) Yarka ve Horoz",
      description: "Pleymut yarka ve horoz: çizgili tüylü, soğuğa dayanıklı, iri yapılı çift amaçlı ırk. Kahverengi yumurta. Türkiye geneli teslimat. Bilgi alın.",
    },
    whatsappMesaji: "Merhaba, Pleymut yarka hakkında bilgi almak istiyorum.",
    ekBolum: {
      baslik: "Pleymut Horoz",
      metin:
        "Pleymut horozu iri ve güçlü yapısı, hızlı gelişimi ve siyah-beyaz çizgili tüyleriyle öne çıkar. Etlik yetiştiricilikte tercih edilir, sakin karakterlidir; kümes ve açık alan sistemlerinde sürüyle birlikte yetiştirilebilir.",
      ozellikler: ["İri ve güçlü yapı", "Etlik yetiştiriciliğe uygun", "Dayanıklı ve uyumlu", "Sakin karakter", "Gösterişli görünüm", "Sürü yetiştiriciliğine uygun"],
      gorseller: [
        img("pleymut-horoz", 1, "Siyah tavukların arasında duran çizgili Pleymut horozu"),
        img("pleymut-horoz", 2, "Dalların önünde duran kırmızı ibikli çizgili Pleymut horozu"),
      ],
    },
  },
];

export const turSluglari = tavuklar.map((t) => t.slug);

export function turBul(slug: string): Tur | undefined {
  return tavuklar.find((t) => t.slug === slug);
}

/** "8 tür" gibi sayılar içerikten hesaplanır, elle yazılmaz. */
export const turSayisi = tavuklar.length;
