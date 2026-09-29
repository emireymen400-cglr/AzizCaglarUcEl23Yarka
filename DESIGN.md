# DESIGN.md — Üçel 23 Yarka Tasarım Dili

Referans: Refero "Pa'lais" stili — https://styles.refero.design/style/5ef5e1ff-3cb3-4383-9f66-26474409d9ae

Orijinal stil bir bitki bazlı gıda markası için "bala batırılmış botanik eskiz defteri". Biz bunu bir yarka çiftliğine uyarlıyoruz:

> **"Çiftlik defteri, yumurta sarısına batırılmış."**
> Krem kâğıt zemin, lacivert kalemle çizilmiş çiftlik illüstrasyonları (buğday başağı, tüy, yumurta, tavuk silueti, ahşap çit), yumurta sarısı ve mera yeşili organik lekeler. Yoğun, dar, büyük harfli başlıklar ve el yazısı bir ikinci ses.

Amaç: "Wix tavuk sitesi" değil, güvenilir ve bakımlı bir aile çiftliği markası. Ama köylü müşteriyi yabancılaştıracak kadar "butik" de değil — bilgi her zaman net ve okunur.

## 1. Renkler

| Token | Hex | Bizdeki anlamı | Kullanım |
|---|---|---|---|
| `--color-indigo` | `#234386` | Marka sesi | Tüm başlıklar, linkler, nav, DOLU birincil buton, koyu bölümler, footer |
| `--color-yolk` | `#ffc400` | Yumurta sarısı | SADECE organik leke (blob) ve illüstrasyon vurgusu. Asla buton ya da metin rengi değil |
| `--color-orange` | `#ed7328` | Güneş / sıcaklık | Çerçeveli ikincil buton, tam genişlik "Tavuklarımız" bandı, büyük başlık vurguları |
| `--color-sky` | `#6aa8dc` | Gökyüzü | İllüstrasyon çizgileri ve arka plan lekeleri |
| `--color-straw` | `#d2b68c` | Saman | Küçük illüstrasyon detayları, ince ayraçlar |
| `--color-pasture` | `#a2d3a6` | Mera | Organik lekeler, "sağlıklı/aşılı" gibi güven rozetlerinin arka planı |
| `--color-ink` | `#000000` | Metin | Gövde metni, 1px çizgi ayraçlar |
| `--color-white` | `#ffffff` | Kart | Kartlar, koyu zemin üstü metin |
| `--color-cream` | `#fbf9f6` | Kâğıt | Sayfa zemini |

Renk kuralları:
- Lacivert tek soğuk renktir. Başka mavi/lacivert tonu ekleme.
- Sıcak renkler (sarı, turuncu, yeşil, saman) yapısal değil dekoratiftir. Gövde metninde kullanma.
- Gri yüzey YOK (`#f5f5f5` gibi). Katmanlar: krem → beyaz kart → turuncu bant → lacivert footer.
- Gradyan YOK. Her leke tek düz renk.
- **Erişilebilirlik:** `#ed7328` krem/beyaz üstünde küçük metin için kontrast testini geçmez. Turuncu metni sadece 24px+ başlıklarda veya kalın 18px+ metinde kullan; çerçeveli butonda metni lacivert yap ya da turuncuyu metin için `#b8561a`'ya koyulaştır. Turuncu bant üstündeki metin beyaz ve büyük olmalı.
- WhatsApp butonu istisnadır: tanınırlık için WhatsApp yeşili (`#25D366`) + beyaz ikon. Sadece yüzen buton ve mobil alt çubukta.

## 2. Tipografi

Tüm fontlar `next/font/google`, `subsets: ["latin", "latin-ext"]`. Her fontu `ĞÜŞİÖÇ ğüşıöç İ ı` ile test et; bir glif eksikse yedeğe geç.

| Rol | Font | Yedek | Kullanım |
|---|---|---|---|
| Display | **Bebas Neue** 400 | Oswald 700 | h1, h2 — BÜYÜK HARF, lacivert, `letter-spacing: 0.04em`, `line-height: 0.9–1.0` |
| Etiket / nav | **Jost** 500 | Futura, sans | Nav, buton, küçük etiketler — büyük harf, `letter-spacing: 0.12–0.2em`, 12–14px |
| Gövde | **Inter** 400/600 | system-ui | Paragraflar, tablolar, SSS. 16–17px, `line-height: 1.6`, harf aralığı normal |
| El yazısı | **Caveat** 500 | — | Duygusal alt başlık, sayfa başına en fazla 1–2 kez. Asla butonda/etikette değil |

Tip ölçeği (mobil → masaüstü, `clamp()` ile):

| Token | Mobil | Masaüstü | Font |
|---|---|---|---|
| `display` | 40px | 96px | Bebas Neue |
| `h1` | 34px | 64px | Bebas Neue |
| `h2` | 30px | 48px | Bebas Neue |
| `h3` | 22px | 32px | Bebas Neue |
| `script` | 26px | 36px | Caveat |
| `body` | 16px | 17px | Inter |
| `small` | 14px | 14px | Inter |
| `label` | 12px | 13px | Jost, tracked |

Kısıtlamalar:
- Display fontu 24px altında ve gövde metninde kullanma.
- Tracked büyük harf etiket her başlığın üstüne konmaz; yalnızca gerçekten bilgi taşıdığında (ör. tür kartında "16 HAFTA", "KAHVERENGİ YUMURTA").
- Başlıkta tek kelimeyi farklı renge boyama gibi numaralar yapma. Vurguyu display + script ikilisi zaten yapıyor.
- Satır uzunluğu en fazla ~70 karakter (`max-w-prose`).

## 3. Şekil, boşluk, gölge

- Taban birim 4px. İçerik genişliği `max-w-[1200px]`, yan boşluk mobilde 20px.
- Bölüm arası: mobil 64px, masaüstü 96px.
- Radius: butonlar `32px` (hap), kartlar ve inputlar `8px`, etiket/rozet `16px`. Bu zıtlık bilinçli; her şeye aynı radius verme.
- Gölge sadece tür kartlarında: `-14px 10px 49px rgba(0,0,0,0.16)` (sağ-aşağı kayan, asimetrik). Buton ve nav'da gölge yok.
- Ayraç: 1px siyah çizgi ya da organik dalga — ikisi aynı yerde değil.

## 4. İllüstrasyon ve organik şekiller

İmza unsuru bu. Görsel cesaret burada harcanır; geri kalan sade kalır.

**Çizgi illüstrasyonlar** (inline SVG bileşenleri, `src/components/illustrations/`):
- Konular: buğday başağı, tek tüy, yumurta (tek ve yuvada), tavuk siluet profili, ahşap çit parçası, yem kabı, küçük civciv, güneş.
- Stil: gravür/toile hissi, sadece kontur, `stroke-width: 1.25`, dolgu YOK, renk `#234386` veya `#6aa8dc`.
- Yerleşim: kutuya hapsetme. Bölüm kenarından taşsın, içeriğin arkasına kısmen girsin, ±5–10° döndür. Büyüklükler değişken.
- Basit tut. 6–8 adet temiz, tekrar kullanılabilir çizim yeterli; karmaşık, kötü çizilmiş illüstrasyon hiç olmamasından kötüdür.
- Dekoratif olanlar `aria-hidden="true"`.

**Organik lekeler (blob):** Düz renk SVG path. Yumurta sarısı, turuncu, mera yeşili. Fotoğrafların arkasında, bölüm köşelerinde. Tek lekede tek renk.

**Dalga ayraç:** Bölümler arasında 80–200px yüksekliğinde organik SVG dalga, dolgu = alttaki bölümün rengi.

## 5. Fotoğraf

- Gerçek çiftlik fotoğrafları kahramandır. Stok fotoğraf KULLANABİLİRSİN (eski sitedeki Unsplash görselleri çıkarılacak).
- Tür fotoğrafları: kartlarda 4:5 oran, `object-cover`, hafif sıcak ton. Filtre/duotone yok.
- Fotoğrafların arkasına bir renk lekesi yerleştir (tür başına sabit bir leke rengi — `tavuklar.ts` içinde `accent` alanı).
- Tüm görseller WebP/AVIF, `sizes` doğru ayarlı.

## 6. Bileşenler

### Birincil buton
Lacivert zemin, beyaz metin, radius 32px, `px-8 py-4` (mobil) / `px-12 py-5`, Jost 13px büyük harf `tracking-[0.12em]`. Gölge yok. Hover: zemin %8 koyulaşır. Görünür `focus-visible` halkası (turuncu, 2px, offset 3px).
Metin eylemi söyler: "WhatsApp'tan Sipariş Ver", "Hemen Ara", "Türleri İncele".

### İkincil buton
Şeffaf zemin, 2px turuncu çerçeve, lacivert metin (erişilebilirlik), radius 32px. Sağda küçük ok ikonu (lucide `ArrowRight`), metne "→" karakteri eklenmez.

### Header
Krem zemin, scroll'da beyaz + 1px alt çizgi. Sol: logo. Orta: nav (TAVUKLARIMIZ · TESLİMAT · GALERİ · SSS · İLETİŞİM) Jost tracked lacivert. Sağ: telefon numarası (masaüstünde görünür) + birincil buton. Mobil: hamburger → tam ekran krem menü, büyük Bebas Neue linkler.

### Tür kartı
Beyaz, radius 8px, asimetrik gölge. Üstte 4:5 fotoğraf (arkasında renk lekesi taşar). Altında: tür adı (Bebas Neue 32px lacivert), 2–3 bilgi rozeti (yumurta rengi, yıllık verim, satış haftası — veride varsa), "İncele" ikincil link. Kartın tamamı tıklanabilir.

### Karşılaştırma tablosu (`/tavuklarimiz`)
Türler satırda, sütunlar: yumurta rengi, yıllık verim, ilk yumurta haftası, iklim dayanıklılığı, satış haftaları. Mobilde yatay kaydırılabilir kap. Veride olmayan hücre "—".

### Teslimat süreci
Gerçek bir sıra olduğu için burada numaralı adımlar uygundur: 1 Sipariş (WhatsApp) → 2 Aşı ve sağlık kontrolü → 3 Özel araçla yola çıkış → 4 Kapınızda teslim. Her adımda küçük çizgi illüstrasyon.

### SSS akordiyonu
Native `<details>/<summary>` (JS'siz, erişilebilir). Soru Inter 600 18px lacivert, cevap Inter 16px siyah. Aralarında 1px siyah çizgi. Açılma animasyonu kısa, `prefers-reduced-motion`'da yok.

### Galeri
Masonry ya da düzensiz ızgara (farklı oranlar karışık). Tıklayınca lightbox, klavyeyle gezilebilir, ESC ile kapanır. Videolar poster + oynat ikonu ile aynı ızgarada.

### Yüzen WhatsApp + mobil alt çubuk
Masaüstü: sağ alt 56px yuvarlak WhatsApp butonu. Mobil: ekran altında sabit iki eşit buton — "Ara" (lacivert) ve "WhatsApp" (yeşil). İçerik bu çubuğun altında kalmasın (`padding-bottom` + `env(safe-area-inset-bottom)`).

### Footer
Lacivert zemin, beyaz metin. Üstünde turuncu veya krem dalga ayraç. Logo, kısa tanım, iletişim bilgileri, hızlı linkler, sosyal ikonlar (sadece linki olanlar), KVKK/çerez linkleri. Arka planda büyük, çok soluk (%8 opaklık) beyaz çizgi tavuk illüstrasyonu taşar.

## 7. Sayfa ritmi (ana sayfa)

```
[ HEADER — krem ]
[ HERO — krem ]
  Sol: BÜYÜK BAŞLIK (Bebas, lacivert)          Sağ: çiftlik fotoğrafı/kısa video
       el yazısı alt başlık (Caveat)                arkasında sarı + mera yeşili leke
       2 buton: WhatsApp (dolu) · Türleri İncele (çerçeveli)
       küçük güven satırı: "Türkiye geneli kapıya teslim · Aşılı · Veteriner kontrollü"
  Sol ile sağ arasında organik leke ayraç; kenardan buğday başağı illüstrasyonu taşar
~~~ dalga (turuncu) ~~~
[ TAVUKLARIMIZ — turuncu bant ] beyaz başlık, yatay kaydırmalı tür kartları
~~~ dalga (krem) ~~~
[ NEDEN ÜÇEL 23 — krem ] 2 sütun: gerçek fotoğraf + 3–4 somut madde (uydurma sayı yok)
[ TESLİMAT SÜRECİ — beyaz kartlar krem üstünde ] 4 numaralı adım
[ VİDEO — krem ] tek büyük video (çiftlik ya da teslimat), yanında kısa metin
[ SSS ÖZETİ — krem ] en çok sorulan 5 soru + "Tüm sorular" linki
[ CTA — lacivert bölüm ] "Kümesiniz için doğru yarkayı birlikte seçelim" + WhatsApp & Ara
~~~ dalga ~~~
[ FOOTER — lacivert ]
```

Hero başlığı önerisi (kullanıcı onaylasın): **"SAĞLIKLI YARKA, KAPINIZA KADAR"** + script: *"Konya'daki çiftliğimizden kümesinize"*

## 8. Hareket

- Tek orkestre an: hero yüklenirken lekeler yumuşakça belirir, illüstrasyon çizgileri kendini çizer (`stroke-dashoffset`, ~1.2s). Başka hiçbir yerde otomatik animasyon yok.
- Her bölüme fade-up EKLEME. Kartlarda abartılı hover yok; sadece gölge hafifçe büyür.
- `prefers-reduced-motion: reduce` → tüm animasyonlar kapalı.

## 9. Kalite tabanı

- 360px genişliğe kadar kusursuz. Yatay taşma yok.
- Tüm etkileşimli öğelerde görünür klavye odağı. Dokunma hedefleri ≥ 44px.
- Kontrast WCAG AA.
- Son kontrol (Chanel kuralı): bitmiş bir sayfaya bak ve bir dekoratif öğeyi çıkar.

## 10. Tailwind v4 başlangıç tokenları

```css
@import "tailwindcss";

@theme {
  --color-indigo: #234386;
  --color-yolk: #ffc400;
  --color-orange: #ed7328;
  --color-orange-text: #b8561a;
  --color-sky: #6aa8dc;
  --color-straw: #d2b68c;
  --color-pasture: #a2d3a6;
  --color-ink: #000000;
  --color-cream: #fbf9f6;
  --color-whatsapp: #25d366;

  --font-display: var(--font-bebas), "Oswald", sans-serif;
  --font-label: var(--font-jost), "Futura", sans-serif;
  --font-body: var(--font-inter), system-ui, sans-serif;
  --font-script: var(--font-caveat), cursive;

  --radius-card: 8px;
  --radius-tag: 16px;
  --radius-button: 32px;

  --shadow-card: -14px 10px 49px 0 rgba(0, 0, 0, 0.16);
  --shadow-hover: 0 20px 27px 0 rgba(0, 0, 0, 0.05);
}
```
