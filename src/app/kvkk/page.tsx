import { CtaBolumu } from "@/components/CtaBolumu";
import { IletisimAraclari } from "@/components/layout/IletisimAraclari";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/ui/Section";
import { YasalMetin } from "@/components/YasalMetin";
import { site } from "@/content/site";
import { sayfaMeta } from "@/lib/metadata";

// TODO(kullanıcı): Veri sorumlusunun resmi unvanı teyit edilmeli (şu an "Aziz Çağlar – Üçel 23 Tavukçuluk").
// TODO(hukuk): Metin genel bir şablondur; yayından önce bir hukukçuya kontrol ettirilmesi önerilir.
// Vergi / kimlik numarası bilerek yayınlanmıyor (kişisel veri).

export const metadata = sayfaMeta({
  baslik: "KVKK Aydınlatma Metni",
  aciklama: "Üçel 23 Yarka olarak telefon, WhatsApp ve web sitesi üzerinden işlenen kişisel verilere ilişkin 6698 sayılı KVKK kapsamındaki aydınlatma metni.",
  yol: "/kvkk",
});

export default function Kvkk() {
  const [birinci, ikinci] = site.telefonlar;
  return (
    <>
      <PageHeader baslik="KVKK aydınlatma metni" kirintilar={[{ ad: "KVKK Aydınlatma Metni", yol: "/kvkk" }]} leke="sky" />
      <Section className="pt-0 md:pt-0" aria-label="Aydınlatma metni">
        <YasalMetin guncelleme="29 Eylül 2026">
          <p>
            6698 sayılı Kişisel Verilerin Korunması Kanunu (&quot;KVKK&quot;) uyarınca, kişisel verileriniz veri sorumlusu sıfatıyla{" "}
            <strong>{site.veriSorumlusu}</strong> ({site.adres.tamMetin}) tarafından aşağıda açıklanan kapsamda işlenmektedir.
          </p>

          <h2>Hangi kişisel verileri işliyoruz?</h2>
          <ul>
            <li>Kimlik ve iletişim bilgileri: adınız, soyadınız, telefon numaranız.</li>
            <li>Teslimat bilgileri: teslimat adresi (il, ilçe, açık adres).</li>
            <li>Sipariş bilgileri: talep ettiğiniz tür, adet ve bizimle yaptığınız yazışmalar.</li>
            <li>Web sitesi kullanım bilgileri: yalnızca onay vermeniz hâlinde analitik çerezlerle toplanan ziyaret istatistikleri.</li>
          </ul>

          <h2>Verileri hangi amaçla işliyoruz?</h2>
          <ul>
            <li>Bilgi ve sipariş taleplerinizi yanıtlamak, fiyat ve stok bilgisi vermek.</li>
            <li>Siparişinizi hazırlamak, teslimatı planlamak ve gerçekleştirmek.</li>
            <li>Satış sonrası bakım ve yetiştiricilik desteği sağlamak.</li>
            <li>Fatura düzenlemek ve yasal yükümlülüklerimizi yerine getirmek.</li>
            <li>Onay vermeniz hâlinde web sitesinin kullanımını ölçmek ve geliştirmek.</li>
          </ul>

          <h2>Hukuki sebepler ve toplama yöntemi</h2>
          <p>
            Verileriniz; telefon görüşmeleri, WhatsApp yazışmaları ve web sitesi aracılığıyla toplanır. KVKK&apos;nın 5. maddesinde yer
            alan &quot;bir sözleşmenin kurulması veya ifasıyla doğrudan ilgili olması&quot;, &quot;veri sorumlusunun hukuki yükümlülüğünü
            yerine getirebilmesi&quot; ve &quot;meşru menfaat&quot; hukuki sebeplerine; analitik çerezler için ise açık rızanıza
            dayanılarak işlenir.
          </p>

          <h2>Verileriniz kimlere aktarılır?</h2>
          <ul>
            <li>Yasal zorunluluk hâlinde yetkili kamu kurum ve kuruluşlarına.</li>
            <li>
              WhatsApp üzerinden yazışmanız hâlinde mesajlarınız WhatsApp (Meta Platforms) altyapısı üzerinden iletilir; bu hizmetin
              sunucuları yurt dışında bulunabilir.
            </li>
            <li>
              Web sitesi yurt dışında bulunan bir barındırma hizmeti üzerinden sunulmaktadır. Analitik çerezlere onay vermeniz hâlinde
              ziyaret istatistikleri Google Analytics hizmetine aktarılır.
            </li>
          </ul>

          <h2>Saklama süresi</h2>
          <p>
            Kişisel verileriniz, işlendikleri amacın gerektirdiği süre ve ilgili mevzuatta öngörülen saklama süreleri boyunca saklanır;
            sürenin sonunda silinir, yok edilir veya anonim hâle getirilir.
          </p>

          <h2>KVKK kapsamındaki haklarınız</h2>
          <p>KVKK&apos;nın 11. maddesi uyarınca veri sorumlusuna başvurarak;</p>
          <ul>
            <li>kişisel verilerinizin işlenip işlenmediğini öğrenme ve işlenmişse bilgi talep etme,</li>
            <li>işlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme,</li>
            <li>yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme,</li>
            <li>eksik veya yanlış işlenmişse düzeltilmesini, şartları oluşmuşsa silinmesini veya yok edilmesini isteme,</li>
            <li>bu işlemlerin verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme,</li>
            <li>münhasıran otomatik sistemlerle analiz edilmesi sonucu aleyhinize bir sonucun ortaya çıkmasına itiraz etme,</li>
            <li>kanuna aykırı işleme nedeniyle zarara uğramanız hâlinde zararın giderilmesini talep etme</li>
          </ul>
          <p>haklarına sahipsiniz.</p>

          <h2>Başvuru</h2>
          <p>
            Taleplerinizi {site.adres.tamMetin} adresine yazılı olarak iletebilir veya bilgi almak için{" "}
            <a href={`tel:${birinci.e164}`}>{birinci.gorunen}</a>
            {ikinci ? (
              <>
                {" "}
                ya da <a href={`tel:${ikinci.e164}`}>{ikinci.gorunen}</a>
              </>
            ) : null}{" "}
            numaralı telefonlardan bize ulaşabilirsiniz. Başvurularınız en geç 30 gün içinde ücretsiz olarak sonuçlandırılır.
          </p>
        </YasalMetin>
      </Section>
      <CtaBolumu />
      <IletisimAraclari />
    </>
  );
}
