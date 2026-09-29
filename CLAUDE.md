@AGENTS.md

# CLAUDE.md — Üçel 23 Yarka Web Sitesi

Bu dosya projenin kalıcı hafızasıdır. Her oturumun başında oku. Tasarım kuralları `DESIGN.md` dosyasındadır; görsel bir iş yapmadan önce onu da oku.

## 1. Proje özeti

- **Firma:** Üçel 23 Tavukçuluk / Üçel 23 Yarka — Aziz Çağlar
- **Ne satıyor:** Yumurtacı tavuk yarkası (genç dişi tavuk). Canlı hayvan satışı.
- **Nerede:** Erler, 14666 Sokak No:21, Karatay / KONYA
- **Hizmet bölgesi:** Türkiye geneli, kapıya kadar teslim
- **Telefonlar:** 0536 475 00 21 · 0536 396 47 97 (hangisinin WhatsApp olduğunu kullanıcıya SOR)
- **Eski site:** https://www.xn--el23tavukuluk-hgbj93a.com (Wix — üçel23tavukçuluk.com)
- **Sitenin tek ana işi:** Ziyaretçiyi WhatsApp'tan ya da telefonla sipariş/bilgi talebine götürmek. Her kararı buna göre ver.
- **Hedef kitle:** Köy/hobi kümesi sahipleri, küçük ve orta ölçekli yumurta üreticileri. Çoğu mobilden geliyor, teknik terim değil net bilgi (fiyat, hafta, teslimat, verim) istiyor.

## 2. Teknoloji

- Next.js 16 (App Router) + TypeScript (strict) + Tailwind CSS v4 (`@theme` ile token)
- Paket yöneticisi: `pnpm` (yoksa npm)
- Fontlar: `next/font/google`, `subsets: ["latin", "latin-ext"]` (Türkçe karakterler için ŞART)
- Görseller: `next/image`, kaynak görseller `sharp` ile WebP/AVIF'e çevrilir
- Deploy: GitHub → Vercel (main = production, diğer dallar = preview)
- Veritabanı YOK. İçerik `src/content/` altında tipli TypeScript dosyalarında durur.
- Ağır UI kütüphanesi ekleme (MUI, Chakra vb. yok). İkonlar için `lucide-react` yeterli. Galeri lightbox için hafif bir çözüm (ör. `yet-another-react-lightbox`) veya kendi yazdığın basit dialog.

## 3. Kaynak dosyalar (kullanıcının yüklediği)

Kullanıcı kaynakları repo kökündeki `_kaynaklar/` klasörüne koyacak. Bu klasör `.gitignore`'a eklenir; sadece işlenmiş çıktılar `public/` altına girer.

```
_kaynaklar/
├── Pleymut/          → resimler + bilgi .txt
├── Ligorin/
├── Lohman Brown/
├── Lohman Sandy/
├── Sussex/
├── Tinted Coral/
├── Ataks/
├── Black Nick/
├── karışık/          → karışık tür resimleri (galeri)
├── videolar/         → çiftlik/teslimat videoları
└── sosyal medya logo ve linkleri/
    ├── logo.jpeg
    ├── sık sorulan sorular.txt
    └── (sosyal medya linkleri)
```

Kurallar:
- Klasör adlarındaki yazımları olduğu gibi ALMA. Sitede doğru yazımı kullan (aşağıdaki tablo).
- Her `.txt` dosyasını oku, içeriği `src/content/tavuklar.ts` içine tipli veriye dönüştür. Metinde olmayan bir bilgiyi (verim, fiyat, hafta vb.) UYDURMA; boş bırak ve kullanıcıya listele.
- Görselleri SEO dostu adlarla yeniden adlandır: `lohmann-brown-yarka-01.webp`. Alt metinleri Türkçe ve betimleyici yaz ("Kümeste kahverengi Lohmann Brown yarkaları").
- Logo `.jpeg` ise: şeffaf PNG/SVG versiyonu yoksa kullanıcıdan iste; geçici olarak jpeg'i kullan. Favicon ve apple-icon'u logodan üret.

### Tür adları ve slug'lar

| Klasör | Sitede görünen ad | Slug | Not |
|---|---|---|---|
| Pleymut | Pleymut (Plymouth Rock) | `pleymut` | Türkiye'de "pleymut" diye aranıyor, ikisini de metinde geçir |
| Ligorin | Ligorin | `ligorin` | |
| Lohman Brown | Lohmann Brown | `lohmann-brown` | Metinde "Lohman Brown" arama varyantını bir kez doğal şekilde geçir |
| Lohman Sandy | Lohmann Sandy | `lohmann-sandy` | Aynı not |
| Sussex | Sussex | `sussex` | |
| Tinted Coral | Tinted Coral | `tinted-coral` | |
| Ataks | Atak-S | `atak-s` | |
| Black Nick | Black Nick | `black-nick` | |

## 4. Site haritası

Tüm URL'ler küçük harf, Türkçe karaktersiz, tireli.

| Yol | Sayfa | Amaç |
|---|---|---|
| `/` | Ana sayfa | Hero, türler, neden biz, teslimat süreci, video, SSS özeti, CTA |
| `/tavuklarimiz` | Tüm türler | Kart ızgarası + karşılaştırma tablosu (verim, yumurta rengi, hafta) |
| `/tavuklarimiz/[slug]` | Tür detay | Galeri, özellikler, sipariş CTA, ilgili SSS, diğer türler |
| `/galeri` | Galeri | `karışık/` resimleri + videolar |
| `/teslimat` | Türkiye geneli teslimat | Süreç adımları, taşıma, belgeler, bölgeler, SSS |
| `/hakkimizda` | Biz kimiz | Aziz Çağlar, çiftlik, deneyim, gerçek fotoğraflar |
| `/sikca-sorulan-sorular` | SSS | `sık sorulan sorular.txt` içeriği, kategorili |
| `/iletisim` | İletişim | Telefon, WhatsApp, adres, harita embed, çalışma saatleri |
| `/kvkk` | KVKK aydınlatma metni | |
| `/cerez-politikasi` | Çerez politikası | |
| `/blog` (Faz 2) | Rehber yazılar | Şimdilik iskelet; içerik kullanıcıdan gelince |

## 5. SEO gereksinimleri (hepsi zorunlu)

- `app/layout.tsx`: `<html lang="tr">`, `metadataBase`, başlık şablonu `%s | Üçel 23 Yarka`, varsayılan OG görseli
- Her sayfada `generateMetadata`: benzersiz title (≤60 karakter), description (≤155 karakter), canonical, OpenGraph, Twitter
- `app/sitemap.ts` → içerikten otomatik (türler dahil, `lastModified` ile)
- `app/robots.ts` → her şeye izin, sitemap adresi; preview ortamlarında (`VERCEL_ENV !== "production"`) `noindex`
- `public/llms.txt` → firma özeti, hizmet bölgesi, türlerin kısa listesi ve linkleri, iletişim. (Google kullanmaz; AI araçları için bonus.)
- `app/manifest.ts`, favicon, `apple-icon`
- `app/opengraph-image.tsx` ve tür sayfaları için dinamik OG görseli (tür adı + fotoğraf, marka renklerinde)
- JSON-LD (`<script type="application/ld+json">`, sunucu tarafında):
  - Kök layout: `Organization` + `LocalBusiness` (adres, geo, telefon, `areaServed: "TR"`, `sameAs` sosyal hesaplar, logo)
  - Tür sayfaları: `Product` (+ fiyat kullanıcıdan gelirse `Offer`: `priceCurrency: TRY`, `availability`, `shippingDetails`). Fiyat yoksa `Offer` EKLEME, uydurma fiyat koyma.
  - Tüm alt sayfalar: `BreadcrumbList`
  - SSS: `FAQPage` (zengin sonuç beklenmez ama içerik değeri için ekle)
  - Videolar: `VideoObject` (name, description, thumbnailUrl, uploadDate, contentUrl)
- Başlık hiyerarşisi: sayfa başına tek `h1`
- Tüm görsellerde anlamlı `alt`, `width/height`, hero görselinde `priority`
- Hedef: mobil Lighthouse Performance ≥ 90, SEO = 100, Accessibility ≥ 95

## 6. Eski siteden 301 yönlendirmeleri

`next.config.ts` → `redirects()` içinde, hepsi `permanent: true`. Türkçe karakterli yolları hem ham hem yüzde-kodlanmış haliyle ekle ve `curl -I` ile test et.

| Eski | Yeni |
|---|---|
| `/kurumsal` | `/hakkimizda` |
| `/tavuklarımız` (`/tavuklar%C4%B1m%C4%B1z`) | `/tavuklarimiz` |
| `/blacknick` | `/tavuklarimiz/black-nick` |
| `/lohmannsandy` | `/tavuklarimiz/lohmann-sandy` |
| `/lohmannbrown` | `/tavuklarimiz/lohmann-brown` |
| `/ligorin` | `/tavuklarimiz/ligorin` |
| `/tintedcoral` | `/tavuklarimiz/tinted-coral` |
| `/ataks` | `/tavuklarimiz/atak-s` |
| `/çiftliğimiz` (`/%C3%A7iftli%C4%9Fimiz`) | `/galeri` |
| `/contact-6` | `/iletisim` |

Not: Eski sitede "Brown Nick" türü de vardı. Kullanıcıya hâlâ satılıp satılmadığını sor; satılmıyorsa eski URL'si varsa `/tavuklarimiz`'e yönlendir.

Alan adı değişecekse (ör. Türkçe karaktersiz yeni domain), eski domainin tamamı Vercel'de yeni domaine 301 ile yönlendirilir ve Search Console'da "Adres değişikliği" aracı kullanılır. Kullanıcıya hatırlat.

## 7. Dönüşüm (en önemli iş)

- Her sayfada sabit (sağ alt) WhatsApp butonu: `https://wa.me/90XXXXXXXXXX?text=` + sayfaya özel hazır mesaj (ör. "Merhaba, Lohmann Brown yarka hakkında bilgi almak istiyorum.")
- Mobilde alt kısımda "Ara" ve "WhatsApp" yapışkan çubuğu
- Header'da `tel:` linki
- GA4 olay takibi: `whatsapp_click`, `phone_click` (sayfa ve tür bilgisiyle). GA4 ID ortam değişkeninden: `NEXT_PUBLIC_GA_ID`. Çerez onayı verilmeden analitik yükleme.
- Form KULLANMA (şimdilik). Tüm talepler WhatsApp/telefona gider.

## 8. Eski sitedeki hatalar — tekrarlama

- WhatsApp ikonu `tel:` linkine gidiyordu → `wa.me` kullan
- Footer'da "Tavuk Çeşitlerimiz" linki `/kurumsal`'a gidiyordu
- "TİNDET CORAL", "LOHMAN" yazım hataları
- "10+ ırk" yazıp 8 ırk göstermek → sayıları içerikten otomatik hesapla
- TikTok ve YouTube ikonları linksizdi → linki olmayan hesabı gösterme

## 9. Videolar

- Videoları repoya ham koyma (GitHub 100 MB sınırı, Vercel bant genişliği). Önce `ffmpeg` ile sıkıştır: 720p, H.264, `-crf 28`, sessiz arka plan videoları için ses kanalını at, `+faststart`.
- Her video için poster (ilk kareden WebP).
- 10 MB'ı aşan videolar için kullanıcıya iki seçenek sun: YouTube'a yüklemek (SEO açısından en iyisi, `lite-youtube` ile göm) veya Vercel Blob.
- Otomatik oynatma sadece hero'daki kısa, sessiz, döngülü video için (`muted playsInline loop`, `prefers-reduced-motion`'da durdur).

## 10. Türkçe dil kuralları

- CSS `text-transform: uppercase` kullanılan her yerde `lang="tr"` doğru olmalı; yoksa "i" → "I" olur ("TAVUKLARIMIZ" değil "TAVUKLARİMİZ" hatası). JS'te büyük harf için `toLocaleUpperCase("tr-TR")`.
- Seçilen her fontta şu dizeyi test et: `ĞÜŞİÖÇ ğüşıöç İSTANBUL ıi`
- Tarih ve sayı biçimleri `tr-TR`. Fiyat: `1.250 ₺`.
- Metin tonu: sade, samimi, güven veren. "Siz" hitabı. Abartılı pazarlama dili yok ("sektörün lideri" gibi kanıtsız iddialar yok).

## 11. Çalışma kuralları

- Bilmediğin bir bilgiyi uydurma. Eksik bilgiyi `EKSIKLER.md` dosyasına yaz ve kullanıcıya sor.
- Her fazın sonunda: `pnpm build` hatasız, `pnpm lint` temiz, kısa bir özet + ekran görüntüsü (mümkünse) ver, onay bekle.
- Bileşenler `src/components/`, içerik `src/content/`, yardımcılar `src/lib/`, JSON-LD üreticileri `src/lib/schema.ts`.
- Site genel ayarları (telefon, adres, sosyal linkler, domain) tek yerde: `src/content/site.ts`. Hiçbir bileşene telefon numarası elle yazılmaz.
- Commit mesajları Türkçe ve açıklayıcı. Her faz ayrı commit.

## 12. Kullanıcıdan alınacak bilgiler (başta sor, `EKSIKLER.md`'de tut)

1. Kullanılacak alan adı (yeni domain mi, eskisi mi?)
2. WhatsApp hattı hangi numara?
3. Tür başına fiyatlar (hafta/yaşa göre) — yoksa fiyatsız "fiyat için yazın" yaklaşımı
4. Satılan yaş aralıkları (ör. 8–16 hafta) ve minimum sipariş adedi
5. Teslimat: hangi illere, ortalama kaç gün, taşıma şekli, ücret politikası, yolda kayıp olursa ne yapılıyor
6. Aşı programı ve veteriner belgeleri (hangi belgeler veriliyor)
7. Çalışma saatleri
8. Sosyal medya linkleri (TikTok ve YouTube hesapları var mı?)
9. Google İşletme Profili linki ve varsa müşteri yorumları (izinli)
10. Firma unvanı / vergi bilgisi (KVKK metni için)
11. GA4 ölçüm kimliği, Search Console erişimi
12. "Brown Nick" hâlâ satılıyor mu?
13. Harita için tam konum (Google Maps linki)
