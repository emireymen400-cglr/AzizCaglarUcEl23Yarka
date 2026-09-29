# Üçel 23 Yarka — Web Sitesi

**ucel23yarka.com** · Aziz Çağlar – Üçel 23 Yarka, Konya / Karatay

Yumurtacı yarka satışının tanıtım sitesi. Sitenin tek işi, ziyaretçiyi WhatsApp'a ya da telefona yönlendirmek. Sitede form veya online ödeme yok.

Bu dosyada iki bölüm var:

- **[Bölüm 1 — Kod bilmeden içerik güncelleme](#bölüm-1--kod-bilmeden-içerik-güncelleme):** Fiyat, SSS, telefon ve metinleri tarayıcıdan değiştirme.
- **[Bölüm 2 — Bilgisayarda çalışma](#bölüm-2--bilgisayarda-çalışma):** Siteyi çalıştırma, yeni tür ekleme, fotoğraf ve video işleme.

---

## Bölüm 1 — Kod bilmeden içerik güncelleme

Metinlerin çoğunu hiçbir program kurmadan, **GitHub'ın web sitesinden** değiştirebilirsiniz. Kaydettiğiniz değişiklik birkaç dakika içinde Vercel tarafından otomatik olarak yayına alınır.

### 1.1 GitHub'da bir dosyayı değiştirmek (her işlemde aynı)

1. github.com'da projenin sayfasını açın.
2. Değiştireceğiniz dosyaya tıklayın (ör. `src` → `content` → `sss.ts`).
3. Sağ üstteki **kalem** simgesine (✏️ "Edit this file") tıklayın.
4. Değişikliği yapın.
5. Sağ üstteki yeşil **Commit changes…** düğmesine basın.
6. Açılan pencerede kısa bir açıklama yazın (ör. "Atak-S fiyatı güncellendi").
   - **Emin değilseniz:** "Create a **new branch** for this commit and start a pull request" seçeneğini işaretleyin. Vercel size bir **önizleme adresi** verir. Önizlemeyi kontrol edip beğenirseniz **Merge pull request** ile yayına alırsınız. Önizleme adresleri Google'a kapalıdır.
   - **Eminseniz:** "Commit directly to the `main` branch" seçin; değişiklik doğrudan yayına gider.
7. 2–3 dakika sonra sitede değişikliği görürsünüz.

> **Bir şey bozulursa ne olur?** Değişikliğinizde bir yazım hatası varsa (ör. eksik tırnak ya da virgül), Vercel yeni sürümü **yayına almaz**; site eski hâliyle çalışmaya devam eder ve size e-posta gelir. Yani ziyaretçiler bozuk bir site görmez. Hatayı düzeltip tekrar kaydetmeniz yeterlidir.

### 1.2 Yazım kuralları

Dosyalar bir "liste" biçiminde yazılmıştır. Değiştirirken şu 4 kurala uyun:

| Kural | Doğru | Yanlış |
|---|---|---|
| Metinler çift tırnak `"…"` içinde durur | `baslik: "Aşılı ve kontrollü",` | `baslik: Aşılı ve kontrollü,` |
| Satır sonundaki virgülü silmeyin | `soru: "…",` | `soru: "…"` |
| Metnin içinde çift tırnak gerekiyorsa `\"` yazın | `"Buna \"yarka\" denir"` | `"Buna "yarka" denir"` |
| Rakamlar tırnaksız ve noktasız yazılır | `tutar: 1250,` | `tutar: "1.250",` |

Türkçe karakterleri (ç, ğ, ı, İ, ö, ş, ü) ve kesme işaretini (`'`) serbestçe kullanabilirsiniz.

### 1.3 Fiyat eklemek / değiştirmek / kaldırmak

Şu an sitede **hiçbir türün fiyatı yok**; her tür sayfasında "Fiyat ve güncel stok bilgisi için bizi arayabilir veya WhatsApp üzerinden yazabilirsiniz…" yazıyor. Bir türe fiyat girerseniz:

- Tür sayfasında "1.250 ₺ / adet" biçiminde görünür,
- /tavuklarimiz sayfasındaki karşılaştırma tablosuna "Fiyat" sütunu eklenir,
- Google'a ürün fiyatı olarak bildirilir.

**Dosya:** `src/content/tavuklar.ts`

1. Dosyada türün adını arayın (tarayıcıda **Ctrl+F**, ör. `slug: "atak-s"`).
2. O türün `yumurtaRengi: "…",` satırını bulun.
3. **Hemen altına** şu satırı ekleyin:

   ```ts
       fiyat: { tutar: 1250, birim: "adet", not: "16 haftalık" },
   ```

   - `tutar`: Türk lirası, **sadece rakam**. 1.250 ₺ için `1250` yazın.
   - `birim`: genelde `"adet"`.
   - `not`: isteğe bağlı kısa açıklama (yaş, adet koşulu). İstemiyorsanız `, not: "…"` kısmını silin: `fiyat: { tutar: 1250, birim: "adet" },`

4. **Değiştirmek için:** Sadece `1250` rakamını değiştirin.
5. **Kaldırmak için:** `fiyat: …` satırını tamamen silin.

> SSS'deki "Fiyatlarınız nasıl belirleniyor?" sorusunun cevabı fiyatın türe, yaşa ve adede göre değiştiğini söyler; fiyat eklediğinizde de geçerlidir. Değiştirmek isterseniz bkz. 1.4 (`id: "fiyat"`).

### 1.4 SSS'ye soru eklemek / değiştirmek

**Dosya:** `src/content/sss.ts`

**Var olan bir cevabı değiştirmek:** Ctrl+F ile sorunun metnini arayın ve `cevap: "…"` içindeki yazıyı değiştirin.

**Yeni soru eklemek:**

1. `export const sorular: Soru[] = [` satırını bulun.
2. Soruyu hangi kategoriye koyacağınıza karar verin. Dosyada kategoriler yorum satırlarıyla ayrılmıştır (`// Teslimat` gibi).
3. O kategorinin son sorusunun kapanış satırı `},`'den **sonra** şu bloğu yapıştırın ve doldurun:

   ```ts
     {
       id: "kisa-benzersiz-ad",
       kategori: "teslimat",
       turler: TUMU,
       soru: "Sorunuz burada mı?",
       cevap: "Cevabınız burada.",
     },
   ```

| Alan | Ne yazılır |
|---|---|
| `id` | Küçük harf, Türkçe karaktersiz, tireli, **diğerlerinden farklı** bir ad. Ör. `"kis-teslimati"` |
| `kategori` | Şunlardan biri: `"turler"` (Türler ve seçim), `"siparis"` (Sipariş ve fiyat), `"teslimat"`, `"saglik"` (Sağlık ve yaş), `"bakim"` (Bakım ve destek) |
| `turler` | Bu soru hangi tür sayfalarında da görünsün? Hepsi için `TUMU`. Belirli türler için `["atak-s", "sussex"]` |
| `oneCikan` | *(isteğe bağlı)* `oneCikan: true,` eklerseniz soru ana sayfadaki "Merak edilenler" bölümüne de aday olur (ilk 5 tanesi gösterilir) |

Tür adları (`turler` alanı için): `lohmann-brown`, `atak-s`, `black-nick`, `ligorin`, `tinted-coral`, `lohmann-sandy`, `sussex`, `pleymut`

**Silmek:** Sorunun `{` ile başlayan satırından `},` ile biten satırına kadar olan bloğun tamamını silin.

SSS sayfası, Google için hazırlanan SSS verisi ve tür sayfalarındaki sorular otomatik güncellenir.

### 1.5 Telefon, adres, çalışma saatleri, sosyal medya

**Dosya:** `src/content/site.ts`

Telefon numaraları, WhatsApp hattı, adres, harita konumu, çalışma saatleri ve sosyal medya linkleri **sadece bu dosyada** yazılıdır. Buradaki değişiklik header, footer, iletişim sayfası, WhatsApp butonları, KVKK metni ve Google bilgilerinin hepsine otomatik yansır.

- **Telefon:** `telefonlar` listesinde `gorunen` ekranda görünen biçimdir (`"0536 396 47 97"`). `e164` arama linki için kullanılır, başında `+90` olur, boşluk içermez (`"+905363964797"`). İkisini birlikte değiştirin. `whatsapp: true` olan numara WhatsApp hattıdır.
- **Yeni sosyal hesap** (TikTok, YouTube açılınca): Bu, sitede ikon eklemeyi de gerektirir; geliştiriciye iletin (bkz. `EKSIKLER.md`).

### 1.6 Tür açıklamalarını değiştirmek

**Dosya:** `src/content/tavuklar.ts`. İlgili türü Ctrl+F ile bulun.

| Alan | Nerede görünür |
|---|---|
| `kisaAciklama` | Tür kartı, tür sayfasının üstü, Google ürün açıklaması |
| `uzunAciklama` | Tür sayfasındaki "… hakkında" bölümü (her paragraf ayrı tırnak içinde) |
| `ozellikler` | "Öne çıkan özellikler" (her biri `{ baslik: "…", metin: "…" },`) |
| `kart` | Tür sayfasının üstündeki küçük etiketler |
| `seo.title` | Google'da görünen başlık (**en fazla 44 karakter**; sonuna otomatik " \| Üçel 23 Yarka" eklenir) |
| `seo.description` | Google'da başlığın altındaki açıklama (**en fazla 155 karakter**) |
| `whatsappMesaji` | O tür sayfasındaki WhatsApp butonunun hazır mesajı |

> Bilmediğiniz bir bilgiyi (verim, hafta vb.) tahminle yazmayın. Olmayan bilgi sitede hiç gösterilmez; bu bilinçli bir tercihtir.

---

## Bölüm 2 — Bilgisayarda çalışma

Yeni tür eklemek, fotoğraf/video eklemek ve siteyi yayına almadan önce görmek için bilgisayarda çalışmanız gerekir.

### 2.1 Bir kez yapılacak kurulum (Windows)

1. **Node.js** kurun (sürüm 20.9 veya üstü, "LTS" olanı): https://nodejs.org
2. **Git** kurun: https://git-scm.com
3. **VS Code** kurun (önerilir): https://code.visualstudio.com
4. Bir terminal açın (VS Code'da: Terminal → New Terminal) ve **pnpm**'i kurun:
   ```bash
   npm install -g pnpm
   ```
5. Projeyi indirin ve bağımlılıkları kurun:
   ```bash
   git clone https://github.com/<kullanici-adi>/<repo-adi>.git
   cd <repo-adi>
   pnpm install
   ```
6. `.env.example` dosyasını kopyalayıp adını `.env.local` yapın. İçinde GA4 ölçüm kimliği var. Bu dosya git'e girmez; yerelde test ederken analitiğe gerçek veri gitmesin istiyorsanız içindeki satırı silin.
7. **Kaynak klasörü:** Orijinal fotoğraflar, videolar ve font kaynakları `_kaynaklar/` klasöründedir ve **git'e yüklenmez**. Bu klasörü bilgisayarınıza ayrıca kopyalayın ve **mutlaka yedekleyin** (harici disk, Google Drive). Kaybolursa sitedeki görseller çalışmaya devam eder, ama yeniden işlenemez.

### 2.2 Günlük komutlar

| Komut | Ne yapar |
|---|---|
| `pnpm dev` | Siteyi bilgisayarınızda açar: http://localhost:3000 (değişiklikler anında görünür) |
| `pnpm build` | Yayındaki gibi derler. **Hata varsa burada görürsünüz.** Göndermeden önce çalıştırın. |
| `pnpm start` | `pnpm build` sonrası derlenmiş siteyi çalıştırır |
| `pnpm lint` | Kod kurallarını denetler |
| `pnpm media` | Fotoğraf/video işler (bkz. 2.4) |
| `pnpm fontlar` | Fontları yeniden kırpar (nadiren gerekir, bkz. 2.6) |

Değişiklikleri yayına göndermek:

```bash
pnpm build          # hata yoksa devam
git add -A
git commit -m "Kısa açıklama"
git push            # main dalına giden her push otomatik yayına alınır
```

### 2.3 Yeni tür eklemek (adım adım)

Örnek: **"Barred Rock"** adında yeni bir tür ekleyelim, adresi `/tavuklarimiz/barred-rock` olsun.

**Adım 1 — Fotoğraflar.** `_kaynaklar/` içine `BARRED ROCK` adında bir klasör açın ve fotoğrafları (jpg/png) koyun. Sıralama dosya adına göredir; **ilk fotoğraf kapak olur** (`1.jpg`, `2.jpg`… diye adlandırın). En az 2 fotoğraf önerilir.

**Adım 2 — Klasörü betiğe tanıtın.** `scripts/process-media.ts` dosyasında `const turKlasorleri` listesini bulun ve bir satır ekleyin:

```ts
  "BARRED ROCK": "barred-rock",
```

Soldaki ad klasör adıyla **birebir** aynı olmalı. Sağdaki ad küçük harf, Türkçe karaktersiz ve tireli olur.

**Adım 3 — Fotoğrafları işleyin.**

```bash
pnpm media
```

Fotoğraflar `public/images/tavuklar/barred-rock/barred-rock-yarka-01.webp, -02.webp…` olarak oluşur.

**Adım 4 — İçeriği ekleyin.** `src/content/tavuklar.ts` dosyasında son türün (`pleymut`) bloğunun kapanışı `},`'den sonra, `];` satırından **önce** şu şablonu yapıştırın ve doldurun:

```ts
  {
    slug: "barred-rock",
    ad: "Barred Rock",
    tip: "Irk",                       // "Hibrit" | "Irk" | "Yerli ırk"
    kullanim: "Yumurta ve et",        // "Yumurtacı" | "Yumurta ve et"
    kisaAciklama: "Tek cümlelik özet.",
    uzunAciklama: [
      "Birinci paragraf.",
      "İkinci paragraf.",
    ],
    yumurtaRengi: "Kahverengi",
    // Bilinmiyorsa aşağıdaki 3 satırı silin (sitede gösterilmez):
    ilkYumurtaHaftasi: "Yaklaşık 20. hafta",
    iklim: "Soğuğa dayanıklı",
    ozellikler: [
      { baslik: "Sakin karakter", metin: "Kısa açıklama." },
      { baslik: "Kahverengi yumurta", metin: "Kısa açıklama." },
    ],
    kart: ["Sakin karakter", "Kahverengi yumurta", "Bahçeye uygun"],
    sistem: "Bahçe, kümes",
    accent: "pasture",                // leke rengi: "yolk" | "orange" | "pasture" | "sky" | "straw"
    gorseller: [
      img("barred-rock", 1, "Çimenlikte duran Barred Rock tavuğu"),
      img("barred-rock", 2, "Barred Rock tavuklarının yakın çekimi"),
    ],
    seo: {
      title: "Barred Rock Yarka – Çizgili Tüylü Irk",
      description: "Barred Rock yarka: … Türkiye geneli kapıya teslimat. Bilgi için arayın.",
    },
    whatsappMesaji: "Merhaba, Barred Rock yarka hakkında bilgi almak istiyorum.",
  },
```

`gorseller` listesindeki her satır bir fotoğraftır. Sayı fotoğraf numarasıdır, tırnak içindeki metin fotoğrafı tarif eden **alt metin**dir (görme engelli kullanıcılar ve Google için).

**Adım 5 — Kontrol edin.**

```bash
pnpm dev
```

http://localhost:3000/tavuklarimiz/barred-rock adresini açın. Aşağıdakiler **otomatik** güncellenir, ayrıca bir şey yapmanız gerekmez:

- Tür kartları, karşılaştırma tablosu, footer'daki tür listesi, "Diğer türler" şeridi
- Site haritası (`sitemap.xml`), Google ürün verisi, paylaşım görseli (OG)
- SSS'deki "Hangi yarka çeşitlerini satıyorsunuz?" cevabı, `llms.txt`

**Adım 6 — Yayına gönderin** (bkz. 2.2).

### 2.4 Medya betiği (`pnpm media`)

`scripts/process-media.ts`, `_kaynaklar/` içindeki orijinal dosyaları siteye uygun hâle getirir.

**Görseller:**

- En uzun kenar 1600 px'e küçültülür, WebP'ye çevrilir (kalite 80).
- EXIF ve GPS konum bilgisi **silinir** (fotoğrafın çekildiği yer sızmaz).
- Galeri için ayrıca 640 px ve 360 px'lik küçük sürümler üretilir. Böylece telefonlar küçük dosya indirir ve Vercel'in görsel kotası harcanmaz.

**Videolar:**

- 720p, H.264'e çevrilir ve sıkıştırılır; web'de hemen oynaması için `+faststart` eklenir.
- Sessiz kullanılacak videolarda ses kanalı silinir.
- İlk kareden poster görseli (ve küçük sürümleri) üretilir.

**Diğer:** Logodan favicon, apple-icon ve paylaşım görseli üretilir.

**Boyutlar:** Her dosyanın genişlik ve yükseklik bilgisi `src/content/media.generated.ts` dosyasına yazılır. **Bu dosyayı elle düzenlemeyin.**

**Rapor:** Bulanık görünen ve düşük çözünürlüklü görseller `_kaynaklar/medya-raporu.json` dosyasında listelenir.

| Komut | Ne zaman |
|---|---|
| `pnpm media` | Yeni dosya eklediğinizde. Sadece **eksik** çıktıları üretir (hızlı). |
| `pnpm media --yeniden` | Kalite/boyut ayarı değiştiyse. Her şeyi baştan üretir (videolar yüzünden birkaç dakika sürer). |

**ffmpeg hakkında:** Videolar için ffmpeg gerekir. `pnpm install` onu otomatik kurar (`ffmpeg-static` paketi); ayrıca bir şey kurmanıza gerek yok. Windows'un **Akıllı Uygulama Denetimi** (Smart App Control), winget ile kurulan ffmpeg'i engelliyor; bu yüzden proje npm paketindeki ffmpeg'i kullanır.

#### Galeriye fotoğraf eklemek

1. Fotoğrafı `_kaynaklar/resimler/` klasörüne koyun (dosya adı önemli değil).
2. `pnpm media` çalıştırın. Betik yeni fotoğrafa sıradaki numarayı verir ve ekrana yazar:
   ```
     YENİ GALERİ FOTOĞRAFLARI — src/content/galeri.ts → karisikAltlar'a alt metin ekleyin:
       galeri-143 ← kumes-2027.jpg
   ```
   Numaralar `scripts/galeri-sira.json` dosyasında saklanır; mevcut fotoğrafların numarası hiç değişmez. **Bu dosyayı da git'e gönderin.**
3. `src/content/galeri.ts` dosyasında `const karisikAltlar` listesinin sonuna o numarayla bir satır ekleyin:
   ```ts
     143: "Yeni kümeste kahverengi yarkalar",
   ```
   **Alt metni olmayan fotoğraf galeride görünmez.**

**Galeriden fotoğraf çıkarmak:** `karisikAltlar` listesindeki satırını silmeniz yeterli (fotoğraf galeride görünmez). Tamamen kaldırmak için ayrıca `_kaynaklar/resimler/` içindeki dosyayı ve `public/images/galeri/` altındaki `galeri-NN.webp` dosyalarını silin. O numara bir daha kullanılmaz.

Gerçek çiftlik fotoğrafları için aynı mantık `_kaynaklar/google-isletme/` klasörü, `scripts/process-media.ts` içindeki `ciftlikGorselleri` ve `src/content/galeri.ts` içindeki `ciftlikListesi` ile işler.

#### Video eklemek

1. Videoyu `_kaynaklar/videolar/` veya `_kaynaklar/google-isletme/` klasörüne koyun.
2. `scripts/process-media.ts` içindeki `const videolar` listesine bir satır ekleyin (örnekleri taklit edin). `sessiz: true` arka plan videoları içindir, sesi siler.
3. `pnpm media` çalıştırın.
4. `src/content/galeri.ts` içindeki `videoMetinleri`'ne aynı adla başlık ve açıklama ekleyin. **Eklemezseniz `pnpm build` hata verir** (unutmamanız için bilinçli bir kilit).

> **Dosya boyutu:** Sıkıştırılmış video 10 MB'ı geçmemeli (Vercel bant genişliği). Uzun videolar için YouTube önerilir (bkz. `EKSIKLER.md`).

### 2.5 Klasör yapısı

```
_kaynaklar/            Orijinal fotoğraf, video, font (git DIŞI — yedekleyin!)
assets/fonts/          Paylaşım görselleri için Bebas Neue + font lisansları
public/                İşlenmiş görseller, videolar, logo (betik üretir)
scripts/
  process-media.ts     Medya betiği (pnpm media)
  galeri-sira.json     Galeri fotoğrafı → numara eşleşmesi (betik günceller)
  fontlari-hazirla.ts  Font kırpma (pnpm fontlar)
src/
  app/                 Sayfalar (her klasör bir adres: tavuklarimiz/, galeri/ …)
  components/          Görsel parçalar (buton, kart, header, footer, çizimler)
  content/             ← İÇERİK BURADA
    site.ts            Telefon, adres, sosyal medya, alan adı
    tavuklar.ts        Türler
    sss.ts             Sıkça sorulan sorular
    galeri.ts          Galeri alt metinleri, video başlıkları
    teslimat.ts        Teslimat adımları ve bilgileri
    navigasyon.ts      Menü
    media.generated.ts Görsel boyutları (betik üretir, dokunmayın)
  fonts/               Kırpılmış fontlar
  lib/                 Yardımcılar (WhatsApp linkleri, Google verisi, çerez onayı)
CLAUDE.md              Proje kuralları
DESIGN.md              Tasarım kuralları (renk, yazı tipi, bileşenler)
EKSIKLER.md            Bekleyen işler ve kullanıcı kararları
```

### 2.6 Teknik notlar

- **Teknoloji:** Next.js 16 (App Router), TypeScript, Tailwind CSS v4, pnpm. Veritabanı yok; tüm içerik `src/content/` altındaki dosyalardadır. Bütün sayfalar derleme sırasında statik olarak üretilir.
- **Ortam değişkenleri:** `NEXT_PUBLIC_GA_ID` GA4 ölçüm kimliğidir (Vercel → Settings → Environment Variables). GA4, sadece ziyaretçi çerez bandında "Kabul et"e basarsa yüklenir (KVKK). `VERCEL_ENV` Vercel'in kendi değişkenidir; `production` değilse site Google'a kapalıdır (preview adresleri).
- **Analitik olayları:** WhatsApp ve telefon tıklamaları `whatsapp_click` / `phone_click` olarak, `sayfa_yolu` ve `tur` bilgisiyle gönderilir. GA4 → Yönetici → Özel tanımlar'da bu iki adın "etkinlik kapsamlı boyut" olarak tanımlı olması gerekir.
- **Eski site yönlendirmeleri:** `next.config.ts` → `eskiYollar` (Wix adresleri → yeni adresler, kalıcı).
- **Fontlar:** Latin + Türkçe karakterlere kırpılmış yerel dosyalardır (`src/fonts/`). Yeni bir özel karakter gerekirse (ör. €), `scripts/fontlari-hazirla.ts` içindeki `araliklar` listesine ekleyip `pnpm fontlar` çalıştırın. Kaynak TTF'ler `_kaynaklar/fontlar/` içindedir; yoksa dosyada yazan adresten indirilir (OFL, ücretsiz).
- **pnpm güvenlik kuralı:** `pnpm-workspace.yaml`, yeni yayınlanmış paketleri 1 gün bekletir. Next.js paketleri bu kuraldan muaftır.

### 2.7 Sık karşılaşılan hatalar

| Hata | Çözüm |
|---|---|
| `Boyut bulunamadı: /images/...` | Görsel işlenmemiş (`pnpm media` çalıştırın) ya da silinen bir galeri fotoğrafının alt metni `karisikAltlar`'da kalmış (satırı silin). |
| `Kaynak yok: ...`, `ENOENT` ya da `Input file is missing` | Betikteki klasör/dosya adı `_kaynaklar/` içindekiyle birebir aynı değil (büyük/küçük harf, Türkçe karakter). |
| `Property 'videoMetinleri' ... is missing` | Yeni video için `src/content/galeri.ts` → `videoMetinleri`'ne başlık eklenmemiş. |
| `Expected ","` ya da `Unterminated string` | Bir satırda virgül ya da tırnak eksik (bkz. 1.2). |
| Vercel'de derleme başarısız, e-posta geldi | Site eski hâliyle yayında kalır. Vercel → Deployments → hatalı kayıt → **Build Logs** hatayı gösterir. |
