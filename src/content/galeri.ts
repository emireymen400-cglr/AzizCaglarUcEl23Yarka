// Galeri içeriği: gerçek çiftlik fotoğrafları, karışık görseller ve videolar.
// Görsel dosyaları ve boyutları scripts/process-media.ts tarafından üretilir.

import { gorselBoyutlari, videoDosyalari, type VideoAdi } from "./media.generated";

export type GaleriGorseli = {
  src: string;
  alt: string;
  w: number;
  h: number;
  /** Gerçek çiftlik fotoğrafı mı (Google İşletme) */
  ciftlik: boolean;
};

export type GaleriVideosu = {
  ad: VideoAdi;
  src: string;
  poster: string;
  w: number;
  h: number;
  sureSn: number;
  /** VideoObject name */
  baslik: string;
  /** VideoObject description */
  aciklama: string;
  ciftlik: boolean;
  /** Galeri sayfasında gösterilsin mi (ana sayfa videoları hariç tutulabilir) */
  galeride: boolean;
};

/** Videoların siteye eklendiği tarih (VideoObject uploadDate) */
export const VIDEO_YUKLEME_TARIHI = "2026-09-29";

const boyut = (src: string) => {
  const b = gorselBoyutlari[src];
  if (!b) throw new Error(`Boyut bulunamadı: ${src}`);
  return b;
};

// ---------------------------------------------------------------- çiftlik (gerçek)

const ciftlikListesi: [string, string][] = [
  ["yarka-teslimat-araci-sepetler", "Sepetlere yerleştirilmiş yarkalarla yüklü teslimat aracı"],
  ["kumeste-beyaz-yarkalar-01", "Kümeste bir arada duran beyaz yarkalar"],
  ["kumeste-beyaz-yarkalar-02", "Suluk hattının yanında beyaz yarkalar"],
  ["kumeste-beyaz-yarkalar-03", "Geniş kümeste kalabalık beyaz yarka sürüsü"],
  ["beyaz-yarkalar-yemlik-hatti-01", "Yemlik hattı boyunca dizilmiş beyaz yarkalar"],
  ["beyaz-yarkalar-yemlik-hatti-02", "Kırmızı yemliğin çevresinde beyaz yarkalar"],
  ["beyaz-yarkalar-yemlik-hatti-03", "Talaşlı zeminde yakından beyaz yarkalar"],
  ["koyu-renkli-yarkalar-kumeste-01", "Kümeste suluk hattının yanında koyu renkli yarkalar"],
  ["koyu-renkli-yarkalar-kumeste-02", "Kırmızı yemlik ve suluklarla koyu renkli yarka sürüsü"],
  ["koyu-renkli-yarkalar-kumeste-03", "Kümeste bir arada koyu kahverengi ve siyah yarkalar"],
  ["ucel23-ciftlik-kumes-binasi", "Üçel 23 çiftliğinde kümes binası ve önündeki taşıma kasaları"],
];

export const ciftlikGorselleri: GaleriGorseli[] = ciftlikListesi.map(([ad, alt]) => {
  const src = `/images/ciftlik/${ad}.webp`;
  return { src, alt, ...boyut(src), ciftlik: true };
});

// ---------------------------------------------------------------- karışık (galeri-NN)

const karisikAltlar: Record<number, string> = {
  1: "Yeşil çayırda iki kahverengi tavuk",
  2: "Çimenlikte çizgili, beyaz ve kahverengi tavuklar bir arada",
  3: "Kahverengi tavuğun yakın çekimi",
  4: "Kucağında kahverengi tavuk taşıyan kadın, kümes önünde",
  5: "Samanlı yuvada kahverengi yumurtalar",
  6: "Hasır sepetten yumurta toplayan el",
  7: "Karlı zeminde kahverengi tavuk",
  8: "Kasadaki yumurtalardan birini alan el",
  9: "Kış gününde kahverengi tavuk portresi",
  10: "Samanlıkta civcivleriyle gezen kahverengi tavuk",
  11: "Yeşil çimenlikte yürüyen kahverengi tavuk",
  12: "Kümeste benekli tüylü tavuklar",
  13: "Hasır sepette saman arasında yumurtalar",
  14: "Beyaz horozun yakın çekimi",
  15: "Çimenlikte duran kahverengi tavuk",
  16: "Bir arada kahverengi tavukların yakın çekimi",
  17: "Beyaz tavuğun yakın çekimi",
  18: "Samanın içinde iki kahverengi yumurta",
  19: "Bahçede çizgili ve beyaz tavuklar",
  20: "Sıcak ışıkta kümesteki kahverengi tavuklar",
  21: "Kalabalık kahverengi tavuk sürüsü",
  22: "Kahverengi tavuğun yakın çekimi",
  23: "Ahşap tünekte dinlenen kahverengi tavuklar",
  24: "Ahşap tünek altında kahverengi tavuklar",
  25: "Horozla birlikte kahverengi tavuk sürüsü",
  26: "Toprak avluda kahverengi tavuklar",
  27: "Açık alanda gezen kahverengi tavuk sürüsü",
  28: "Toprakta dinlenen kahverengi tavuklar",
  29: "Kahverengi tavukların yakın çekimi",
  30: "Avluda kahverengi tavuklar",
  31: "Toprakta yan yana dinlenen kahverengi tavuklar",
  32: "Kahverengi tavuğun yakından görünümü",
  33: "Toprak avluda iki kahverengi tavuk",
  34: "Kümeste samanın üzerinde kahverengi tavuk",
  35: "Avluda duran kahverengi tavuk",
  36: "Farklı renklerde kalabalık tavuk sürüsü",
  37: "Bahçede sarı-kahverengi tavuk",
  38: "Civcivleriyle siyah tavuk",
  39: "Kahverengi tavuk portresi",
  40: "Taş kümes önünde iki beyaz tavuk",
  41: "Ahşap kümeste tünekte tavuklar",
  42: "Benekli tüylü horoz",
  43: "Kümeste koyu renkli tavuk",
  44: "Kuru toprakta kahverengi tavuk",
  45: "Kümeste koyu renkli tavuklar",
  46: "Beton avluda farklı renklerde tavuklar",
  47: "Beton kenarında kahverengi tavuk",
  48: "Bahçede yeşillikler arasında tavuklar",
  49: "Yamaçta gezinen kahverengi tavuklar",
  50: "Çimenlikte horoz ve tavuk",
  51: "Karanlık kümeste tahta tünek üzerinde tavuklar",
  52: "Kahverengi tavuğun yan profilden görünümü",
  53: "Kümeste kahverengi tavuklar",
  54: "Samandaki yumurtalar",
  55: "Sepetten yumurta alan el",
  56: "Ahşap kümeste beyaz ve kahverengi tavuklar",
  57: "Kümeste beyaz ve kahverengi tavuklar",
  58: "Bahçede horoz ve tavuklar",
  59: "Yeşillikler arasında dinlenen tavuklar",
  60: "Loş bahçede benekli tavuk",
  61: "Yem yiyen beyaz ve benekli tavuk",
  62: "Tel örgü arkasında kahverengi tavuk",
  63: "Tel örgü arkasında farklı renklerde tavuklar",
  64: "Bahçede siyah, gri ve beyaz tavuklar",
  65: "Avluda beyaz tavuklar",
  66: "Yosunlu toprakta açık renkli tavuk",
  67: "Çizgili tüylü tavuğun yakın çekimi",
  68: "Sarı-kahverengi tavuğun yakın çekimi",
  69: "Yeşil arka planda beyaz tavuk",
  70: "Çizgili tüylü tavuk",
  71: "Yem kabının başında siyah tavuk ve civcivler",
  72: "Koyu arka planda beyaz tavuk",
  73: "Mavi gökyüzü altında çiftlikte gezen tavuklar",
  74: "Tel örgü arkasında kahverengi tavuklar",
  75: "Gün batımında tel örgü arkasındaki kahverengi tavuklar",
  76: "Taşlı zeminde çizgili tavuk",
  77: "Bahçede civcivleriyle tavuklar",
  78: "Tahta masada çuval üzerinde yumurtalar",
  79: "Taş duvar üstünde tavuklar",
  80: "Çimenlikte kahverengi tavuk",
  81: "Tel örgü arkasında kahverengi tavuklar",
  82: "Çimenlikte siyah tavuk",
  83: "Bahçede beyaz tavuklar",
  84: "Kahverengi tavuğun yakın çekimi",
  85: "Dallar arasında tavuk",
  86: "Benekli tavuğun yakın çekimi",
  87: "Kahverengi tavuğun ibiğinin yakın çekimi",
  88: "Suluk yanında kahverengi tavuk",
  89: "Tel çit arkasında kahverengi tavuklar",
  90: "Kümeste açık renkli tavuklar",
  91: "Toprakta renkli tavuklar",
  92: "Tel örgü arkasında beyaz tavuklar",
  93: "Çakıllı zeminde kahverengi tavuk",
  94: "Taşın üzerinde kahverengi tavuk",
  95: "Yem kabının başında kahverengi tavuklar",
  96: "Sıcak ışıkta kahverengi tavuk",
  97: "Kahverengi tavukların yakın çekimi",
  98: "Pencere önünde siyah tavuk",
  99: "Çimenlikte renkli tavuklar",
  100: "Beyaz horozun yakından görünümü",
  101: "Yeşil bitkiler arasında beyaz tavuk",
  102: "Toprakta civcivleriyle beyaz tavuk",
  103: "Otlar arasında horoz ve tavuk",
  104: "Kümes içinde beyaz tüylü, koyu boyunlu tavuk",
  105: "Ağaç altında beyaz ve kahverengi tavuklar",
  106: "Yeşil arka planda kahverengi tavuk",
  107: "Toprak avluda kızıl kahverengi tavuklar",
  108: "Karda yürüyen kızıl kahverengi tavuk",
  109: "Tel çit yanında yalağın başındaki tavuklar",
  110: "Çayırda serbest dolaşan kahverengi tavuk",
  111: "Zeytin ağaçlarının altında serbest dolaşan tavuklar",
  112: "Tuğla duvar önünde civcivle yürüyen tavuk",
  113: "Çimenlikte yem arayan renkli tavuklar",
  114: "Otların arasında dinlenen kahverengi tavuk",
  115: "Tel çitle çevrili avluda kahverengi tavuk sürüsü",
  116: "Deniz kıyısında yel değirmeni önünde gri tavuk",
  117: "Çimenlikte yürüyen kahverengi tavuk",
  118: "Duvar kenarında çizgili tüylü tavuk",
  119: "Kuru otlu bahçede siyah tavuk",
  120: "Kafes önünde civcivlerini koruyan kahverengi tavuk",
  121: "Çimende kahverengi tavuklar",
  122: "Çayırda gezinen kahverengi yumurtacı tavuklar",
  123: "Yeşil çimde bir arada kahverengi tavuklar",
  124: "Benekli tüylü tavuğun yakın çekimi",
  125: "Toprak zeminde koyu renkli tavuk",
  126: "Avluda beyaz tavuk ve ördekler",
  127: "Tahta kümes kapağını açan el",
  128: "Avuç içinde taze yumurtalar",
  129: "Ahşap kapı önünde iki tavuk",
  130: "Tel örgü yanında çizgili tüylü horoz",
  131: "Samanlı avluda iki koyu renkli tavuk",
  132: "Toprak avluda kahverengi tavuklar",
  133: "Samanda kahverengi tavuğu besleyen kişi",
  134: "Çimenlikte koşan beyaz tavuk",
  135: "Kahverengi tavuğun portresi",
  136: "Siyah tavuğun yakın çekimi",
  137: "Kümeste yumurta sepeti ve tavuklar",
  138: "Çimenlikte iki kahverengi tavuk",
  139: "Samanlıkta civcivleriyle kahverengi tavuk",
  140: "Yeşil arka planda kahverengi tavuk",
  141: "Kış gününde iki kahverengi tavuk",
  142: "Çayırda kahverengi yumurtacı tavuk sürüsü",
};

export const karisikGorseller: GaleriGorseli[] = Object.entries(karisikAltlar).map(([no, alt]) => {
  const src = `/images/galeri/galeri-${String(no).padStart(2, "0")}.webp`;
  return { src, alt, ...boyut(src), ciftlik: false };
});

/** Galeri sayfası sırası: önce gerçek çiftlik fotoğrafları */
export const galeriGorselleri: GaleriGorseli[] = [...ciftlikGorselleri, ...karisikGorseller];

// ---------------------------------------------------------------- videolar

const videoMetinleri: Record<VideoAdi, { baslik: string; aciklama: string; galeride: boolean }> = {
  "hero-cayirda-tavuklar": {
    baslik: "Çayırda gezinen tavuklar",
    aciklama: "Yeşil çayırda serbestçe dolaşan kahverengi ve beyaz tavuklar.",
    galeride: false,
  },
  "dag-eteginde-serbest-tavuklar": {
    baslik: "Dağ eteğinde serbest dolaşan tavuklar",
    aciklama: "Karlı dağların önünde, açık alanda yem arayan tavuk ve horozlar.",
    galeride: true,
  },
  "bahcede-karisik-tavuklar": {
    baslik: "Bahçede farklı renklerde tavuklar",
    aciklama: "Taşlı bahçede siyah, gri ve kahverengi tavuklar yem arıyor.",
    galeride: true,
  },
  "horoz-ve-tavuklar": {
    baslik: "Horoz ve tavuklar",
    aciklama: "Ahşap çit önünde, çimenlikte gezinen horoz ve tavuklar.",
    galeride: true,
  },
  "toprakta-eselenen-tavuklar": {
    baslik: "Toprakta eşelenen tavuklar",
    aciklama: "Toprak zeminde yem arayan gri ve siyah tavuklar.",
    galeride: true,
  },
  "ciftlik-kahverengi-yumurtacilar-01": {
    baslik: "Çiftliğimizde kahverengi yumurtacılar",
    aciklama: "Üçel 23 çiftliğinde kahverengi yumurtacı tavukların bulunduğu bölümden görüntüler.",
    galeride: true,
  },
  "ciftlik-kahverengi-yumurtacilar-02": {
    baslik: "Kahverengi yumurtacılar – 2",
    aciklama: "Çiftliğimizdeki kahverengi yumurtacı tavuklardan yakın görüntüler.",
    galeride: true,
  },
  "ciftlik-kahverengi-yumurtacilar-03": {
    baslik: "Kahverengi yumurtacılar – 3",
    aciklama: "Çiftliğimizde kahverengi yumurtacı tavukların bulunduğu bölümde bir tur.",
    galeride: true,
  },
  "ciftlik-koyu-renkli-yarkalar-01": {
    baslik: "Koyu renkli yarkalar",
    aciklama: "Çiftliğimizde yemlik başındaki siyah ve koyu kahverengi yarkalar.",
    galeride: true,
  },
  "ciftlik-koyu-renkli-yarkalar-02": {
    baslik: "Koyu renkli yarkalar – 2",
    aciklama: "Yemlik ve suluk hattındaki koyu renkli yarka sürüsü.",
    galeride: true,
  },
  "ciftlik-beyaz-yarkalar-01": {
    baslik: "Beyaz yarkalar",
    aciklama: "Çiftliğimizin geniş kümesinde beyaz yarka sürüsü.",
    galeride: true,
  },
  "ciftlik-beyaz-yarkalar-02": {
    baslik: "Beyaz yarkalar – 2",
    aciklama: "Talaşlı zeminde bir arada dolaşan beyaz yarkalar.",
    galeride: true,
  },
  "ciftlik-beyaz-yarkalar-03": {
    baslik: "Beyaz yarkalar – 3",
    aciklama: "Beyaz yarkalar arasından yakın görüntüler.",
    galeride: true,
  },
  "ciftlik-beyaz-tavuklar": {
    baslik: "Kümeste beyaz tavuklar",
    aciklama: "Suluk hattı yanında beyaz tavuklar; çiftliğimizden görüntüler.",
    galeride: true,
  },
  "ciftlik-kahverengi-yarkalar": {
    baslik: "Kahverengi yarkalar",
    aciklama: "Çiftliğimizde bir arada dolaşan kahverengi yarka sürüsü.",
    galeride: true,
  },
};

export const videolar: GaleriVideosu[] = (Object.keys(videoMetinleri) as VideoAdi[]).map((ad) => {
  const d = videoDosyalari[ad];
  return {
    ad,
    src: d.src,
    poster: d.poster,
    w: d.w,
    h: d.h,
    sureSn: d.sureSn,
    ciftlik: ad.startsWith("ciftlik-"),
    ...videoMetinleri[ad],
  };
});

export const galeriVideolari = videolar.filter((v) => v.galeride);
