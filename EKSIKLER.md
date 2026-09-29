# EKSIKLER.md — Kullanıcıdan beklenen bilgiler

Son güncelleme: 2026-09-29 (yayın öncesi denetim sonrası).

## Açık kalanlar (sonra sorulacak / hatırlatılacak)

- [ ] **Barındırma:** Kullanıcı Vercel'i seçti (2026-09-29). Not: Vercel Hobby koşullarında "ürün/hizmet satışının tanıtımı" ticari kullanım sayılıyor; kullanıcı bilgilendirildi. Emin olmak için Vercel Support'a sorulabilir (vercel.com/help). Gerekirse ücretsiz alternatif: Cloudflare Pages (statik dışa aktarım).
- [ ] **TikTok / YouTube** — hesaplar açılınca eklenecek (şu an sitede GÖSTERİLMEYECEK).
- [ ] **EN SON YAPILACAK — YouTube:** Kullanıcı YouTube kanalı açacak. Açılınca `ciftlik-kahverengi-yumurtacilar-01` (100 sn) ve `-03` (85 sn) YouTube'a taşınacak, `lite-youtube` ile gömülecek, VideoObject'e YouTube URL'si eklenecek; kanal linki `site.ts` sosyal hesaplara eklenecek. Şimdilik CRF 32 ile 8,9 / 7,6 MB olarak sitede.
- [ ] **Vercel kotası:** Uygulandı: videolar tıklayınca yüklenir (hero hariç, o da sayfa yüklendikten sonra), galeri hazır küçük görseller (360/640px) kullanır, next/image yalnızca ~40 görsel için. Yayından sonra Vercel → Usage sayfası kontrol edilecek.
- [ ] **Yayından sonra PageSpeed Insights:** Yerel Lighthouse (HTTP/1.1, gzip) mobil Performance: ana sayfa 88, tür 92–93, galeri 85–86. Vercel'de (HTTP/2, Brotli, CDN) pagespeed.web.dev ile tekrar ölçülecek; 90 altı kalırsa hero posteri ve galeri ilk satırı yeniden ele alınacak.
- [ ] **GA4 panel ayarı:** Admin → Özel tanımlar: `sayfa_yolu` ve `tur` etkinlik kapsamlı boyut olarak eklenmeli; Vercel'e `NEXT_PUBLIC_GA_ID` ortam değişkeni girilmeli.
- [ ] **KVKK ve çerez metni:** Genel şablon; yayından önce hukukçu kontrolü önerilir.

## Yayından sonra yapılacaklar (sonra bakılacak)

### A. Eski alan adını yeni siteye yönlendirme
Eski: `üçel23tavukçuluk.com` (`xn--el23tavukuluk-hgbj93a.com`, Wix). Yeni: `ucel23yarka.com`.
Sayfa bazlı yönlendirmeler (`/kurumsal` → `/hakkimizda` vb.) sitede hazır (`next.config.ts`, 308 kalıcı).

- [ ] Eski alan adının yenilemesini **iptal etme**; taşımadan sonra en az 1 yıl (tercihen daha uzun) tut.
- [ ] Wix'te eski alan adını Wix sitesinden ayır (site planı sonra iptal edilebilir, alan adı kaydı kalmalı).
- [ ] Vercel → Proje → Settings → Domains → `xn--el23tavukuluk-hgbj93a.com` ve `www.xn--el23tavukuluk-hgbj93a.com` ekle → "Redirect to ucel23yarka.com" seç.
- [ ] Vercel'in gösterdiği DNS kayıtlarını (A ve CNAME) Wix → Alan Adları → DNS'e gir.
- [ ] Test: tarayıcıda `üçel23tavukçuluk.com/kurumsal` → `ucel23yarka.com/hakkimizda`; `/ataks` → `/tavuklarimiz/atak-s`; `/tavuklarımız` → `/tavuklarimiz`.

### B. Search Console (kullanıcı yeni mülkü kurdu)
- [ ] Yeni mülk (`ucel23yarka.com`): Site Haritaları → `https://ucel23yarka.com/sitemap.xml` gönder.
- [ ] Eski alan adını ayrı mülk olarak ekle ve DNS TXT kaydıyla doğrula (Wix DNS).
- [ ] Eski mülk → Ayarlar → **Adres değişikliği** → yeni mülkü seç (yönlendirmeler çalışır durumdayken).
- [ ] Birkaç hafta boyunca yeni mülkte "Sayfalar" raporunu izle; eski URL'lerin yenilerle yer değiştirdiğini kontrol et.

### C. Linkleri güncelleme
- [ ] Google İşletme Profili → web sitesi: `https://ucel23yarka.com`
- [ ] Instagram, Facebook, Sahibinden profillerindeki site linki.

## Üçüncü cevap turu (2026-09-29)

- **Hakkımızda:** 1992'den beri bu faaliyet yürütülüyor. Fotoğraf verilmeyecek. → site.ts `kurulusYili`, Hakkımızda, footer, Organization `foundingDate`.
- **Facebook:** `facebook.com/share/r/1DPdBjTeEA/` kalıcı link olarak kabul edildi.
- **Sahibinden:** Tarayıcıda açılıyor; ikon olarak kullanıcının sarı logosu kullanılıyor. 3 sosyal ağ ana sayfanın altında ayrı bölümde.
- **KVKK veri sorumlusu:** "Aziz Çağlar – Üçel 23 Yarka".
- **Alan adı:** ucel23yarka.com alındı; Search Console ve GA4 (G-0167JEGVL4) kullanıcı tarafından kuruldu. GitHub ve Vercel kurulumunu kullanıcı yapacak.
- **Maliyet:** Kullanıcı hiçbir ödeme çıkmamasını istiyor → font kaynakları repodan çıkarıldı (git dışı), barındırma planı soruldu.

## İkinci cevap turu (2026-09-29)

- **Alan adı:** `ucel23yarka.com` (kesin).
- **Konum:** https://www.google.com/maps?q=37.79174,32.6687905&z=17&hl=tr → geo 37.79174, 32.6687905. Adres metni: Erler, 14666 Sokak No:21, Karatay/Konya.
- **Facebook:** Kullanıcının verdiği link kullanılacak: https://www.facebook.com/share/r/1DPdBjTeEA/
- **Vergi:** Konya Karatay Mevlana Vergi Dairesi, 212 448 01956. Not: 11 hane (TC kimlik numarası olabilir). Kişisel veri olduğu için sitede herkese açık YAYINLANMAYACAK. KVKK metninde gerekli değil; sadece veri sorumlusu adı ve adresi yazılacak.
- **Google İşletme medyası:** `_kaynaklar/google-isletme/` klasörüne eklendi (11 fotoğraf, 10 video, hepsi gerçek çiftlik). Kullanım: galeri, teslimat, hakkımızda.
- **Ana sayfa medyası:** Kullanıcının isteği üzerine stok görsel ve videolardan, en güzel görünenler seçilecek. Kullanıcı beğenmezse değiştirilecek.
- **Sayısal veri:** Sadece üreticinin resmi sitesinden doğrulanan değerler eklendi:
  - Lohmann Brown: %50 verime 140–145. gün, 72. haftaya kadar tavuk başına 321 yumurta, ortalama yumurta ağırlığı 63,3 g. Kaynak: lohmann-breeders.com, "Lohmann Brown-Classic Alternative Housing" sayfası.
  - Tinted Coral: yumurtlamaya 17–20. hafta civarı başlar (kullanıcının kendi metninden).
  - Diğer türler: Doğrulanamadı, "—" kaldı. Lohmann Sandy sayfasındaki veri damızlık sürüye ait göründüğü için kullanılmadı; Atak-S'nin resmi sitesine erişilemedi.

## Cevaplanan sorular

1. **Alan adı:** Yeni domain alınacak, `ucel23yarka.com` (kesinleşti).
2. **Telefonlar:**
   - 0536 396 47 97 → hem arama hem WhatsApp. Birincil numara (`wa.me/905363964797`).
   - 0536 475 00 21 → sadece arama, ikincil numara. Header, iletişim sayfası ve footer'da ikinci sırada.
3. **Fiyat:** Sürekli değiştiği için sitede fiyat YOK. "Güncel fiyat için arayın / yazın" yaklaşımı kullanılacak. JSON-LD'de `Offer` eklenmeyecek.
4. **Yaş / minimum adet:** Sabit değer yok. Genelde yumurtlamaya yakın yaşta satışa çıkıyor. Detay için arayıp bilgi almaları gerekiyor.
5. **Teslimat:**
   - Sipariş alındıktan hemen sonra planlanıyor ve en kısa sürede ulaştırılıyor.
   - Tüm il ve ilçelere yapılıyor.
   - Kendi araçlarıyla, sepet içinde taşınıyor.
   - Yoldaki tüm kayıplar firmaya ait.
   - Ücret için arayın/yazın.
6. **Aşı / belgeler:** Aşılar yapılıyor. Belgeler istenirse arayarak talep edilebilir. (Eski sitede şu ifade var: "veteriner hekim onayı ve tam aşı takvimi tamamlanmadan" teslim edilmez.)
7. **Çalışma saatleri:** Esnek, 7/24 ulaşılabilir. (JSON-LD `openingHours`: Mo-Su 00:00-23:59.)
8. **Sosyal medya:** Facebook, Instagram ve Sahibinden var. TikTok ve YouTube henüz yok.
9. **Google İşletme:** https://share.google/T7QTrXCC1Dnaex3oc — içindeki resim ve videolar çiftlikten çekilmiş, kullanılabilir.
10. **Unvan / vergi:** Sonra verilecek.
11. **GA4:** `G-0167JEGVL4` (`NEXT_PUBLIC_GA_ID`). Search Console domain alınınca kurulacak.
12. **Brown Nick:** Satılmıyor, sadece Black Nick satılıyor. SSS'den ve metinlerden çıkarılacak.
13. **Harita:** https://www.google.com/maps/dir/?api=1&destination=Karatay%2FKonya%2C%20T%C3%BCrkiye → güncel pin ikinci cevap turunda. Eski siteden bilgi alınabilir.
14. **Fotoğraflar:** Telifsiz görseller (Pexels/Pixabay), kullanılabilir. İstisna: `esular-ataks-tavuk-2_png.avif` başka bir firmanın sitesinden geldiği için KULLANILMAYACAK.
15. **Geçici çözüm:** Stok görseller çözünürlükleri iyi olduğu için kullanılacak.
16. **Videolar:** Stok videolar, kullanılabilir.
17. **Pleymut Horoz:** Ayrı bir sayfası olmayacak, Pleymut sayfasının içinde bir bölüm olarak geçecek.
18. **Sayısal veriler (verim, hafta):** Kullanıcı emin değil. Karar: Sadece üreticinin resmi yayınladığı verilerden emin olunabilen değerler eklenecek (ör. Lohmann ve Atak-S resmi kaynakları). Kaynağıyla birlikte "üretici verilerine göre, uygun koşullarda" notu düşülecek. Emin olunamayan hücreler "—" olarak kalacak. Eklenen her değer kullanıcıya listelenecek.
19. **Atak-S:** "Hareketli" doğru, "sakin" ifadesi çıkarılacak.
20. **Metin düzeltme:** Açıklamaların üslubu serbestçe düzeltilebilir (yeni bilgi eklenmeden).
21. **SSS:** Soruları yeniden düzenle, tekrar edenleri birleştir ya da sil.
22. **Çiftlik ziyareti:** Gelmeden önce aranıp bilgi verilmesi yeterli.
23. **Logo:** Elde sadece 500×500 JPEG var. Kalitesi artırılmaya çalışılacak (temiz SVG'ye yeniden çizim / vektörleştirme).
24. **Hakkımızda:** Sonra tamamlanacak.
25. **Sahibinden:** Sosyal medya ikonlarının yanında duracak.
26. **Facebook:** https://www.facebook.com/share/r/1DPdBjTeEA/ (kullanılacak).

## Eski siteden doğrulanan bilgiler

- Adres: 14666 Sokak No:21 Karatay/KONYA
- Telefonlar: 0536 475 00 21 / 0536 396 47 97
- Eski sitede "10+ ırk" yazıyor ama 8 ırk listeleniyor. Yeni sitede sayı içerikten hesaplanacak.
- Eski sitede "sektörün lideri olmak" gibi kanıtsız iddialar var. Yeni sitede kullanılmayacak.

## Teknik notlar

- `ffmpeg` 9.0.2 kuruldu (winget). Yeni açılan terminalde PATH'te görünüyor.
