// Tür içerikleri. Kaynak: _kaynaklar/<TÜR>/hakkında.txt (üslup sadeleştirildi, yeni bilgi eklenmedi).
// Sayısal veriler yalnızca doğrulanabilen kaynaklardan gelir; bilinmeyen alan boş bırakılır ("—").

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

export type SayisalVeri = {
  /** Ör. "140–145. gün" */
  ilkYumurta?: string;
  /** Ör. "72. haftaya kadar 321 yumurta" */
  verim?: string;
  yumurtaAgirligi?: string;
  /** Verinin kaynağı; varsa sayfada gösterilir */
  kaynak?: { ad: string; url?: string };
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
  tip: "Hibrit" | "Saf ırk" | "Yerli hibrit";
  kullanim: "Yumurtacı" | "Yumurta ve et";
  yumurtaRengi: string;
  /** Kart ve meta description için tek cümle */
  ozet: string;
  /** Detay sayfası giriş paragrafları */
  aciklama: string[];
  ozellikler: Ozellik[];
  /** Kısa rozet listesi ("Üçel Yarka ürün kartı") */
  kart: string[];
  veri: SayisalVeri;
  /** Uygun yetiştirme sistemleri (karşılaştırma tablosu için) */
  sistem: string;
  accent: Accent;
  gorseller: Gorsel[];
  whatsappMesaji: string;
  ekBolum?: EkBolum;
};

const img = (slug: string, no: number, alt: string): Gorsel => ({
  src: `/images/turler/${slug}-yarka-${String(no).padStart(2, "0")}.webp`,
  alt,
});

export const tavuklar: Tur[] = [
  {
    slug: "lohmann-brown",
    ad: "Lohmann Brown",
    aramaVaryanti: "Lohman Brown",
    tip: "Hibrit",
    kullanim: "Yumurtacı",
    yumurtaRengi: "Kahverengi",
    ozet: "Ticari yumurtacılıkta en yaygın hibritlerden biri; erken yumurtlar, kahverengi ve sağlam kabuklu yumurta verir.",
    aciklama: [
      "Lohmann Brown, yumurta üretimi için geliştirilmiş kahverengi yumurtacı bir hibrittir. Türkiye'de çoğu zaman \"Lohman Brown\" diye de aranır. Düzenli üretimi ve kabuk kalitesiyle hem köy kümesinde hem de ticari işletmelerde tercih edilir.",
      "Sakin karakteri sayesinde sürü yönetimi kolaydır. Uygun barınak, bakım ve beslemeyle yüksek verim potansiyeline sahiptir.",
    ],
    ozellikler: [
      { baslik: "Yüksek yumurta verimi", metin: "Yumurta üretimi için geliştirilmiş, ticari yumurtacılıkta yaygın kullanılan bir hibrittir." },
      { baslik: "Kahverengi yumurta", metin: "Kendine özgü kahverengi kabuklu yumurtalarıyla bilinir." },
      { baslik: "Erken yumurtlama", metin: "Uygun bakım ve beslemeyle erken dönemde üretime başlar." },
      { baslik: "Yumurta kalitesi", metin: "Kabuk kalitesi ve düzenli üretimiyle tercih edilir." },
      { baslik: "Yemden verimli yararlanma", metin: "Yediği yemi yumurtaya iyi dönüştürür." },
      { baslik: "Sakin ve yönetimi kolay", metin: "Sakin karakteri kümes yönetimini kolaylaştırır." },
      { baslik: "Ticari üretime uygun", metin: "Yumurta üretimi yapan işletmelerin sık tercih ettiği türlerdendir." },
    ],
    kart: ["Yüksek yumurta verimi", "Kahverengi yumurta", "Erken yumurtlama", "İyi yem değerlendirme", "Sakin karakter", "Ticari üretime uygun"],
    veri: {
      ilkYumurta: "140–145. gün (%50 verim)",
      verim: "72. haftaya kadar tavuk başına 321 yumurta",
      yumurtaAgirligi: "Ortalama 63,3 g (72. haftaya kadar)",
      kaynak: {
        ad: "Lohmann Breeders, Lohmann Brown-Classic (alternatif barınak sistemleri) üretici verisi",
        url: "https://lohmann-breeders.com/strains/lohmann-brown-classic-alternative-housing/",
      },
    },
    sistem: "Kümes, ticari işletme",
    accent: "orange",
    gorseller: [
      img("lohmann-brown", 1, "Toprak zeminde yem arayan kahverengi Lohmann Brown tavuğu"),
      img("lohmann-brown", 2, "Yakın plan kızıl kahverengi tüylü Lohmann Brown yarkası"),
      img("lohmann-brown", 3, "Otların arasında eşelenen Lohmann Brown tavuğunun yakın çekimi"),
      img("lohmann-brown", 4, "Kümes önünde bir arada dolaşan kahverengi yumurtacı tavuklar"),
    ],
    whatsappMesaji: "Merhaba, Lohmann Brown yarka hakkında bilgi almak istiyorum.",
  },
  {
    slug: "atak-s",
    ad: "Atak-S",
    tip: "Yerli hibrit",
    kullanim: "Yumurtacı",
    yumurtaRengi: "Kahverengi",
    ozet: "Türkiye'de geliştirilmiş yerli yumurtacı; iklimimize uyumlu, hareketli ve gezen tavuk sistemine uygun.",
    aciklama: [
      "Atak-S, Türkiye'de geliştirilmiş ve yetiştiricilikte yaygın kullanılan yerli bir yumurtacı genotiptir. Kahverengi kabuklu yumurta verir.",
      "Türkiye'nin farklı bölgelerindeki koşullara uyum sağlamasıyla bilinir. Aktif ve hareketli yapısı onu açık alan ve gezen tavuk yetiştiriciliği için iyi bir seçenek yapar.",
    ],
    ozellikler: [
      { baslik: "Yerli yumurtacı", metin: "Türkiye'de geliştirilmiş, yetiştiricilikte önemli yer tutan bir genotiptir." },
      { baslik: "Yüksek yumurta verimi", metin: "Uygun bakım ve beslemeyle yüksek üretim potansiyeline sahiptir." },
      { baslik: "Kahverengi yumurta", metin: "Genellikle kahverengi kabuklu yumurta verir." },
      { baslik: "Gezen tavuğa uygun", metin: "Açık alan ve serbest dolaşım sistemlerinde rahatlıkla yetiştirilir." },
      { baslik: "İklimimize uyumlu", metin: "Türkiye'nin farklı bölgelerindeki yetiştirme koşullarına uyum sağlar." },
      { baslik: "İyi yem değerlendirme", metin: "Yemi ekonomik şekilde yumurtaya dönüştürür." },
      { baslik: "Hareketli yapı", metin: "Aktif karakteri açık alan yetiştiriciliğine uygundur." },
    ],
    kart: ["Yerli yumurtacı", "Yüksek yumurta verimi", "Kahverengi yumurta", "Gezen tavuğa uygun", "Türkiye iklimine uyumlu", "Dayanıklı yapı"],
    veri: {},
    sistem: "Kümes, gezen tavuk, açık alan",
    accent: "pasture",
    gorseller: [
      img("atak-s", 1, "Çimenlik alanda duran koyu tüylü Atak-S yarkası"),
      img("atak-s", 2, "Bahçede serbest dolaşan Atak-S tavuğu"),
    ],
    whatsappMesaji: "Merhaba, Atak-S yarka hakkında bilgi almak istiyorum.",
  },
  {
    slug: "black-nick",
    ad: "Black Nick",
    tip: "Hibrit",
    kullanim: "Yumurtacı",
    yumurtaRengi: "Kahverengi",
    ozet: "Koyu tüylü, sakin ve verimli bir yumurtacı hibrit; kümeste de açık alanda da iyi sonuç verir.",
    aciklama: [
      "Black Nick, koyu renkli tüyleriyle diğer yumurtacılardan kolayca ayırt edilen verimli bir hibrittir. Kahverengi kabuklu yumurta verir ve erken dönemde üretime başlar.",
      "Sakin ve uyumlu karakteri sürü yönetimini kolaylaştırır. Kafessiz kümes, klasik kümes ve açık alan sistemlerinde yetiştirilebilir.",
    ],
    ozellikler: [
      { baslik: "Yüksek yumurta verimi", metin: "Yumurta üretimi için tercih edilen verimli bir hibrittir." },
      { baslik: "Kahverengi yumurta", metin: "Genellikle kahverengi kabuklu yumurta verir." },
      { baslik: "Erken yumurtlama", metin: "Uygun bakım ve beslemeyle erken dönemde üretime başlar." },
      { baslik: "İyi yem değerlendirme", metin: "Yemden verimli yararlanmasıyla öne çıkar." },
      { baslik: "Sakin ve uyumlu", metin: "Sürü yönetimini kolaylaştıran bir karaktere sahiptir." },
      { baslik: "Farklı sistemlere uygun", metin: "Kafessiz, kümes ve açık alan sistemlerinde yetiştirilebilir." },
      { baslik: "Dikkat çekici görünüm", metin: "Koyu renkli tüyleriyle kolayca tanınır." },
    ],
    kart: ["Yüksek yumurta verimi", "Kahverengi yumurta", "Erken yumurtlama", "Sakin ve uyumlu", "Açık alana uygun", "Ticari üretime uygun"],
    veri: {},
    sistem: "Kafessiz kümes, açık alan",
    accent: "yolk",
    gorseller: [
      img("black-nick", 1, "Kuru otların arasında duran siyah tüylü Black Nick yarkası"),
      img("black-nick", 2, "Tünek dalında duran siyah Black Nick tavuğu"),
      img("black-nick", 3, "Köy kümesinin yanında dolaşan siyah tavuklar"),
      img("black-nick", 4, "Çimlerde eşelenen parlak siyah tüylü Black Nick tavuğu"),
      img("black-nick", 5, "Dal üzerinde yürüyen siyah yumurtacı tavuk"),
    ],
    whatsappMesaji: "Merhaba, Black Nick yarka hakkında bilgi almak istiyorum.",
  },
  {
    slug: "ligorin",
    ad: "Ligorin",
    tip: "Saf ırk",
    kullanim: "Yumurtacı",
    yumurtaRengi: "Beyaz",
    ozet: "Beyaz yumurtanın klasik ırkı; erken yumurtlar, hareketli ve yemi ekonomik kullanır.",
    aciklama: [
      "Ligorin, yumurtacı ırklar arasında verimiyle öne çıkan ve dünya genelinde yaygın yetiştirilen bir ırktır. Genellikle beyaz kabuklu yumurta verir.",
      "Canlı ve hareketli bir karakteri vardır. Uygun barınak ve bakımla farklı iklimlerde yetiştirilebilir ve yemi ekonomik kullanır.",
    ],
    ozellikler: [
      { baslik: "Yüksek yumurta verimi", metin: "Yumurtacı ırklar arasında verimliliğiyle öne çıkar." },
      { baslik: "Erken yumurtlama", metin: "Uygun bakım ve beslemeyle erken yaşta üretime başlar." },
      { baslik: "Yemden iyi yararlanma", metin: "Ekonomik bir yumurtacı olarak bilinir." },
      { baslik: "Hareketli ve aktif", metin: "Canlı karakteriyle dikkat çeker." },
      { baslik: "Farklı iklimlere uyum", metin: "Uygun barınakla çeşitli iklimlerde yetiştirilebilir." },
      { baslik: "Beyaz yumurta", metin: "Genellikle beyaz kabuklu yumurta verir." },
    ],
    kart: ["Yüksek yumurta verimi", "Erken yumurtlama", "Beyaz yumurta", "Yemden iyi yararlanma", "Hareketli yapı", "Ticari üretime uygun"],
    veri: {},
    sistem: "Kümes, ticari işletme",
    accent: "sky",
    gorseller: [
      img("ligorin", 1, "Kümes avlusunda dolaşan beyaz Ligorin tavukları"),
      img("ligorin", 2, "Çimenlikte gezen beyaz tüylü Ligorin yarkaları"),
    ],
    whatsappMesaji: "Merhaba, Ligorin yarka hakkında bilgi almak istiyorum.",
  },
  {
    slug: "tinted-coral",
    ad: "Tinted Coral",
    tip: "Hibrit",
    kullanim: "Yumurtacı",
    yumurtaRengi: "Krem / kırık beyaz",
    ozet: "Krem renkli yumurta veren, sakin ve dayanıklı bir hibrit; salma yetiştiriciliğe uygun.",
    aciklama: [
      "Tinted Coral, açık krem ve kırık beyaz tonlarında yumurta veren verimli bir hibrittir. Uygun bakım ve beslemeyle yaklaşık 17–20. haftalarda yumurtlamaya başlar.",
      "Dengeli yem tüketimi, sakin karakteri ve farklı koşullara uyumuyla bilinir. Salma (gezen tavuk) sistemleri için de iyi bir seçenektir.",
    ],
    ozellikler: [
      { baslik: "Yüksek yumurta verimi", metin: "Yumurta üretimi için geliştirilmiş verimli bir hibrittir." },
      { baslik: "Krem renkli yumurta", metin: "Açık krem ve kırık beyaz tonlarında yumurta verir." },
      { baslik: "Ekonomik yem tüketimi", metin: "Dengeli ve düşük yem tüketimiyle bilinir." },
      { baslik: "Erken yumurtlama", metin: "Yaklaşık 17–20. haftalarda yumurtlamaya başlar." },
      { baslik: "Sakin ve uysal", metin: "Sürü yönetimini kolaylaştırır." },
      { baslik: "Salma yetiştiriciliğe uygun", metin: "Gezen tavuk sistemlerinde rahatlıkla yetiştirilir." },
    ],
    kart: ["Yüksek yumurta verimi", "Krem renkli yumurta", "Ekonomik yem tüketimi", "Erken yumurtlama", "Sakin ve uysal", "Salma yetiştiriciliğe uygun"],
    veri: { ilkYumurta: "Yaklaşık 17–20. hafta" },
    sistem: "Kümes, salma / gezen tavuk",
    accent: "straw",
    gorseller: [
      img("tinted-coral", 1, "Çiftlikte kameraya bakan açık renkli Tinted Coral yarkası"),
      img("tinted-coral", 2, "Kümeste bir arada duran açık tüylü Tinted Coral tavukları"),
      img("tinted-coral", 3, "Yeşil çimenlikte yem arayan beyaz tüylü tavuklar"),
    ],
    whatsappMesaji: "Merhaba, Tinted Coral yarka hakkında bilgi almak istiyorum.",
  },
  {
    slug: "lohmann-sandy",
    ad: "Lohmann Sandy",
    aramaVaryanti: "Lohman Sandy",
    tip: "Hibrit",
    kullanim: "Yumurtacı",
    yumurtaRengi: "Krem / bej",
    ozet: "Açık renkli yumurtasıyla bilinen, sakin ve uzun süre istikrarlı üreten bir hibrit.",
    aciklama: [
      "Lohmann Sandy, krem ve bej tonlarındaki açık renkli yumurtalarıyla öne çıkan verimli bir hibrittir. \"Lohman Sandy\" olarak da aranır.",
      "Sakin ve yönetimi kolay bir yapısı vardır. Uygun bakım ve beslemeyle üretim döneminde istikrarlı performans gösterir.",
    ],
    ozellikler: [
      { baslik: "Yüksek yumurta verimi", metin: "Yumurta üretimi için geliştirilmiş verimli bir hibrittir." },
      { baslik: "Açık renkli yumurta", metin: "Krem ve bej tonlarında yumurta verir." },
      { baslik: "Erken yumurtlama", metin: "Uygun koşullarda erken dönemde üretime başlar." },
      { baslik: "İyi yem değerlendirme", metin: "Yemden verimli yararlanır." },
      { baslik: "Dayanıklı ve uyumlu", metin: "Farklı kümes sistemlerine uyum sağlar." },
      { baslik: "Uzun üretim dönemi", metin: "Üretim boyunca istikrarlı performans gösterir." },
    ],
    kart: ["Yüksek yumurta verimi", "Açık renkli yumurta", "Erken yumurtlama", "İyi yem değerlendirme", "Sakin ve uyumlu", "Ticari üretime uygun"],
    veri: {},
    sistem: "Kümes, ticari işletme",
    accent: "yolk",
    gorseller: [
      img("lohmann-sandy", 1, "Kümes avlusunda yürüyen beyaz tüylü Lohmann Sandy yarkası"),
      img("lohmann-sandy", 2, "Çimenlikte duran açık renkli yumurtacı tavuk"),
    ],
    whatsappMesaji: "Merhaba, Lohmann Sandy yarka hakkında bilgi almak istiyorum.",
  },
  {
    slug: "sussex",
    ad: "Sussex",
    tip: "Saf ırk",
    kullanim: "Yumurta ve et",
    yumurtaRengi: "Krem – açık kahverengi",
    ozet: "Hem yumurta hem et için yetiştirilen, iri yapılı, sakin ve gösterişli bir ırk.",
    aciklama: [
      "Sussex, hem yumurta hem et için yetiştirilen çift amaçlı bir ırktır. Kremden açık kahverengiye uzanan tonlarda yumurta verir.",
      "Dolgun ve güçlü yapısı, uysal karakteri ve iyi yem arama yeteneğiyle açık alana çok uygundur. Light Sussex çeşidi beyaz tüyleri ile boyun ve kuyruktaki siyah tüyleriyle hemen tanınır.",
    ],
    ozellikler: [
      { baslik: "Çift amaçlı", metin: "Hem yumurta hem et üretimi için tercih edilir." },
      { baslik: "İri ve güçlü yapı", metin: "Dolgun vücut yapısına sahiptir." },
      { baslik: "İyi yumurta verimi", metin: "Uygun bakımla düzenli yumurta verir." },
      { baslik: "Açık kahverengi yumurta", metin: "Kremden açık kahverengiye uzanan tonlarda yumurta verir." },
      { baslik: "Sakin karakter", metin: "Uysal ve yönetimi kolaydır." },
      { baslik: "İyi yem arar", metin: "Açık alan yetiştiriciliğine uyum sağlayan aktif bir ırktır." },
      { baslik: "Gösterişli görünüm", metin: "Light Sussex beyaz tüy ve siyah boyun-kuyruk deseniyle dikkat çeker." },
    ],
    kart: ["Yumurta ve et için", "İri ve güçlü yapı", "İyi yumurta verimi", "Açık kahverengi yumurta", "Sakin karakter", "Açık alana uygun"],
    veri: {},
    sistem: "Bahçe, açık alan, hobi",
    accent: "pasture",
    gorseller: [
      img("sussex", 1, "Çimenlerin arasında duran beyaz tüylü, siyah boyunlu Light Sussex tavuğu"),
      img("sussex", 2, "Yeşil çayırda yem arayan Light Sussex tavuğu"),
    ],
    whatsappMesaji: "Merhaba, Sussex yarka hakkında bilgi almak istiyorum.",
  },
  {
    slug: "pleymut",
    ad: "Pleymut (Plymouth Rock)",
    aramaVaryanti: "Plymouth Rock",
    tip: "Saf ırk",
    kullanim: "Yumurta ve et",
    yumurtaRengi: "Kahverengi",
    ozet: "Siyah-beyaz çizgili tüyleriyle tanınan, soğuğa dayanıklı, iri ve sakin çift amaçlı ırk.",
    aciklama: [
      "Pleymut, dünyada Plymouth Rock adıyla bilinen, uzun yıllardır yetiştirilen köklü bir ırktır. Hem yumurta hem et için yetiştirilir ve genellikle büyük boy, kahverengi kabuklu yumurta verir.",
      "Siyah-beyaz çizgili tüyleriyle kümesin en gösterişli tavuklarındandır. Uysal karakteri ve özellikle soğuğa dayanıklılığıyla bahçe ve köy kümesleri için çok uygundur.",
    ],
    ozellikler: [
      { baslik: "Çift amaçlı", metin: "Hem yumurta hem et üretimi için uygundur." },
      { baslik: "İri ve güçlü yapı", metin: "Dolgun vücut yapısıyla dikkat çeker." },
      { baslik: "İyi yumurta verimi", metin: "Uygun bakımla düzenli yumurta verir." },
      { baslik: "Kahverengi yumurta", metin: "Genellikle büyük boy, kahverengi kabuklu yumurta verir." },
      { baslik: "Soğuğa dayanıklı", metin: "Özellikle soğuk hava koşullarına dayanıklılığıyla tanınır." },
      { baslik: "Sakin karakter", metin: "Uysal ve yönetimi kolaydır." },
      { baslik: "Gösterişli görünüm", metin: "Siyah-beyaz çizgili tüyleri çok dikkat çekicidir." },
    ],
    kart: ["Yumurta ve et için", "İri ve güçlü yapı", "Kahverengi yumurta", "Soğuğa dayanıklı", "Sakin karakter", "Bahçe kümesine uygun"],
    veri: {},
    sistem: "Bahçe, köy kümesi, açık alan",
    accent: "sky",
    gorseller: [
      img("pleymut", 1, "Saman üzerinde duran iki siyah-beyaz çizgili Pleymut tavuğu"),
      img("pleymut", 2, "Kuru yapraklar arasında yürüyen çizgili tüylü Pleymut (Plymouth Rock) tavuğu"),
    ],
    whatsappMesaji: "Merhaba, Pleymut yarka hakkında bilgi almak istiyorum.",
    ekBolum: {
      baslik: "Pleymut Horoz",
      metin:
        "Pleymut horozu iri ve güçlü yapısı, hızlı gelişimi ve siyah-beyaz çizgili tüyleriyle öne çıkar. Etlik yetiştiricilikte tercih edilir, sakin karakterlidir; kümes ve açık alan sistemlerinde sürüyle birlikte yetiştirilebilir.",
      ozellikler: ["İri ve güçlü yapı", "Etlik yetiştiriciliğe uygun", "Hızlı gelişim", "Dayanıklı ve uyumlu", "Sakin karakter", "Sürü yetiştiriciliğine uygun"],
      gorseller: [
        img("pleymut-horoz", 1, "Siyah tavukların arasında duran çizgili Pleymut horozu"),
        img("pleymut-horoz", 2, "Dalların önünde duran kırmızı ibikli çizgili Pleymut horozu"),
      ],
    },
  },
];

export function turBul(slug: string): Tur | undefined {
  return tavuklar.find((t) => t.slug === slug);
}

/** "8 tür" gibi sayılar içerikten hesaplanır, elle yazılmaz. */
export const turSayisi = tavuklar.length;
