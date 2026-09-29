# EKSIKLER.md — Kullanıcıdan beklenen bilgiler

Son güncelleme: 2026-09-29 (ikinci cevap turu işlendi, Faz 1 başladı).

## Açık kalanlar (sonra sorulacak / hatırlatılacak)

- [ ] **Hakkımızda içeriği** (kuruluş yılı, deneyim, Aziz Çağlar fotoğrafı) — kullanıcı sonra verecek. HATIRLAT.
- [ ] **Search Console** — `ucel23yarka.com` alındıktan sonra kurulacak. HATIRLAT. Domain alınınca: Vercel'de eski domainden 301, Search Console "Adres değişikliği".
- [ ] **KVKK veri sorumlusu unvanı:** Vergi bilgisi geldi (aşağıda). Metinde "Aziz Çağlar – Üçel 23 Tavukçuluk" yazılacak. Resmi unvan farklıysa kullanıcı düzeltmeli.
- [ ] **TikTok / YouTube** — hesaplar açılınca eklenecek (şu an sitede GÖSTERİLMEYECEK).
- [ ] **10 MB üstü videolar:** `ciftlik-kahverengi-yumurtacilar-01` (13,4 MB, 100 sn) ve `-03` (11,9 MB, 85 sn). Seçenekler: YouTube, Vercel Blob ya da daha güçlü sıkıştırma (CRF 32 → 8,1 / 7,0 MB). Karar verilene kadar git dışında (.gitignore).

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
