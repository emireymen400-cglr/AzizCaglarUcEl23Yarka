import Link from "next/link";
import { CtaBolumu } from "@/components/CtaBolumu";
import { IletisimAraclari } from "@/components/layout/IletisimAraclari";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/ui/Section";
import { YasalMetin } from "@/components/YasalMetin";
import { site } from "@/content/site";
import { sayfaMeta } from "@/lib/metadata";

// TODO(geliştirme): Çerez onay bandı ve GA4 henüz eklenmedi. Eklenince "Tercihlerinizi değiştirme"
// bölümüne tercih paneli linki konacak ve çerez adları (_ga, _ga_<ID>) doğrulanacak.
// TODO(hukuk): Yayından önce hukukçu kontrolü önerilir.

export const metadata = sayfaMeta({
  baslik: "Çerez Politikası",
  aciklama: "Üçel 23 Yarka web sitesinde kullanılan çerezler: zorunlu çerez yok, analitik çerezler yalnızca onayınızla, harita yalnızca istediğinizde yüklenir.",
  yol: "/cerez-politikasi",
});

export default function CerezPolitikasi() {
  return (
    <>
      <PageHeader baslik="Çerez politikası" kirintilar={[{ ad: "Çerez Politikası", yol: "/cerez-politikasi" }]} leke="straw" />
      <Section className="pt-0 md:pt-0" aria-label="Çerez politikası metni">
        <YasalMetin guncelleme="29 Eylül 2026">
          <p>
            Bu politika, {site.domain.replace("https://", "")} adresindeki web sitesinde çerezlerin nasıl kullanıldığını açıklar. Veri
            sorumlusu: {site.veriSorumlusu}.
          </p>

          <h2>Çerez nedir?</h2>
          <p>
            Çerezler, bir web sitesini ziyaret ettiğinizde tarayıcınıza kaydedilen küçük metin dosyalarıdır. Siteyi tekrar
            ziyaret ettiğinizde sizi tanımaya veya ziyaret istatistiklerini ölçmeye yarar.
          </p>

          <h2>Hangi çerezleri kullanıyoruz?</h2>
          <ul>
            <li>
              <strong>Zorunlu çerezler:</strong> Sitemiz çalışmak için çerez kullanmaz. Form veya üyelik yoktur; talepleriniz telefon ve
              WhatsApp üzerinden alınır.
            </li>
            <li>
              <strong>Analitik çerezler (Google Analytics):</strong> Yalnızca onay vermeniz hâlinde, sitenin nasıl kullanıldığını
              anonim istatistiklerle ölçmek için kullanılır. Onay vermezseniz yüklenmez.
            </li>
            <li>
              <strong>Harita:</strong> İletişim sayfasındaki Google Haritalar yalnızca &quot;Haritayı göster&quot; düğmesine
              bastığınızda yüklenir; bu durumda Google kendi çerezlerini kullanabilir.
            </li>
            <li>
              <strong>WhatsApp ve sosyal medya bağlantıları:</strong> Bu bağlantılara tıkladığınızda ilgili hizmetin sitesine
              yönlendirilirsiniz; o sitelerde kendi çerez politikaları geçerlidir.
            </li>
          </ul>

          <h2>Tercihlerinizi değiştirme</h2>
          <p>
            Tarayıcınızın ayarlarından çerezleri silebilir veya engelleyebilirsiniz. Analitik çerezlere verdiğiniz onayı dilediğiniz
            zaman geri alabilirsiniz.
          </p>

          <h2>Kişisel verileriniz</h2>
          <p>
            Kişisel verilerinizin işlenmesine ilişkin ayrıntılar için <Link href="/kvkk">KVKK Aydınlatma Metni</Link>&apos;ni
            inceleyebilirsiniz.
          </p>
        </YasalMetin>
      </Section>
      <CtaBolumu />
      <IletisimAraclari />
    </>
  );
}
