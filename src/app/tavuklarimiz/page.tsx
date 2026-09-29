import { BreedCard } from "@/components/BreedCard";
import { CtaBolumu } from "@/components/CtaBolumu";
import { Tuy } from "@/components/illustrations";
import { IletisimAraclari } from "@/components/layout/IletisimAraclari";
import { KarsilastirmaTablosu } from "@/components/KarsilastirmaTablosu";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/ui/Section";
import { tavuklar, turSayisi } from "@/content/tavuklar";
import { sayfaMeta } from "@/lib/metadata";
import { mesajlar } from "@/lib/whatsapp";

export const metadata = sayfaMeta({
  baslik: "Tavuklarımız: Yumurtacı Yarka Türleri",
  aciklama: `${turSayisi} yumurtacı yarka türü: Lohmann Brown, Atak-S, Black Nick, Ligorin, Tinted Coral ve diğerleri. Yumurta rengi ve özelliklere göre karşılaştırın.`,
  yol: "/tavuklarimiz",
});

export default function Tavuklarimiz() {
  return (
    <>
      <PageHeader
        baslik="Tavuklarımız"
        kirintilar={[{ ad: "Tavuklarımız", yol: "/tavuklarimiz" }]}
        leke="orange"
        cizim={<Tuy />}
        giris={
          <p>
            Yumurta verimleriyle kendini kanıtlamış yumurtacı yarkalar sunuyoruz. Yumurta rengine, kümesinize ve yetiştirme şeklinize göre seçim
            yapabilirsiniz; kararsız kalırsanız bize yazın, birlikte seçelim.
          </p>
        }
      />

      <Section className="pt-4 md:pt-6" aria-label="Türler">
        <ul className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {tavuklar.map((t, i) => (
            <li key={t.slug}>
              <BreedCard tur={t} sira={i} baslikSeviyesi="h2" sizes="(min-width: 1024px) 270px, (min-width: 640px) 45vw, 90vw" />
            </li>
          ))}
        </ul>
      </Section>

      <Section zemin="beyaz" aria-labelledby="karsilastirma">
        <h2 id="karsilastirma" className="text-h2">
          Türleri karşılaştırın
        </h2>
        <p className="mt-3 max-w-prose">
          Verim ve yumurtlama yaşı bakım, besleme ve kümes koşullarına göre değişir. Bilgisi kesin olmayan alanları boş bıraktık;
          sorularınız için bize yazın.
        </p>
        <div className="mt-8">
          <KarsilastirmaTablosu turler={tavuklar} />
        </div>
      </Section>

      <CtaBolumu ustZemin="beyaz" mesaj={mesajlar.tavuklarimiz} />
      <IletisimAraclari mesaj={mesajlar.tavuklarimiz} />
    </>
  );
}
