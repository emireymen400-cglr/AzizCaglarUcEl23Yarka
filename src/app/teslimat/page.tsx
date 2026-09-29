import Image from "next/image";
import { CtaBolumu } from "@/components/CtaBolumu";
import { FaqAccordion } from "@/components/FaqAccordion";
import { Cit } from "@/components/illustrations";
import { IletisimAraclari } from "@/components/layout/IletisimAraclari";
import { PageHeader } from "@/components/PageHeader";
import { TeslimatAdimlari } from "@/components/TeslimatAdimlari";
import { Blob } from "@/components/ui/Blob";
import { Section } from "@/components/ui/Section";
import { gorselBoyutlari } from "@/content/media.generated";
import { sorular } from "@/content/sss";
import { teslimatBilgileri, teslimatGorseli } from "@/content/teslimat";
import { sayfaMeta } from "@/lib/metadata";
import { mesajlar } from "@/lib/whatsapp";

export const metadata = sayfaMeta({
  baslik: "Türkiye Geneli Yarka Teslimatı",
  aciklama: "Yarkalar Türkiye'nin tüm il ve ilçelerine kendi araçlarımızla, sepetler içinde teslim edilir. Yoldaki kayıplar bize aittir. Süreç ve sık sorulanlar.",
  yol: "/teslimat",
});

export default function Teslimat() {
  const b = gorselBoyutlari[teslimatGorseli.src];
  const teslimatSorulari = sorular.filter((s) => s.kategori === "teslimat");

  return (
    <>
      <PageHeader
        baslik="Türkiye geneli yarka teslimatı"
        script="Kendi aracımızla, kapınıza kadar"
        kirintilar={[{ ad: "Teslimat", yol: "/teslimat" }]}
        leke="yolk"
        cizim={<Cit />}
        giris={<p>Siparişinizi aldıktan hemen sonra teslimatı planlıyor, yarkalarınızı kendi araçlarımızla en kısa sürede kapınıza ulaştırıyoruz.</p>}
      />

      <Section className="pt-4 md:pt-6" aria-labelledby="nasil">
        {/* Mobilde küçük fotoğraf başlığın yanında, maddeler altta tam genişlik */}
        <div className="grid grid-cols-[40%_1fr] items-center gap-x-6 gap-y-8 lg:grid-cols-2 lg:items-start lg:gap-x-16 lg:gap-y-0">
          <div className="relative w-full lg:row-span-2">
            <Blob renk="sky" sekil={2} dondur={-10} className="absolute -left-5 -top-5 w-3/4 opacity-80 lg:-left-10 lg:-top-10" />
            <Image
              src={teslimatGorseli.src}
              alt={teslimatGorseli.alt}
              width={b.w}
              height={b.h}
              preload
              fetchPriority="high"
              sizes="(min-width: 1024px) 560px, 40vw"
              className="relative aspect-[4/5] w-full -rotate-3 rounded-card object-cover lg:rotate-0"
            />
          </div>
          <h2 id="nasil" className="text-h2">
            Nasıl taşıyoruz?
          </h2>
          <div className="col-span-2 lg:col-span-1 lg:col-start-2">
            <ul className="border-t border-ink lg:mt-8">
              {teslimatBilgileri.map((b) => (
                <li key={b.baslik} className="border-b border-ink py-5">
                  <h3 className="font-body text-base font-semibold normal-case md:text-lg tracking-normal text-indigo">{b.baslik}</h3>
                  <p className="mt-1.5">{b.metin}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section zemin="beyaz" aria-labelledby="adimlar">
        <h2 id="adimlar" className="text-h2">
          Adım adım teslimat
        </h2>
        <div className="mt-10 [&_li]:bg-cream">
          <TeslimatAdimlari />
        </div>
      </Section>

      <Section aria-labelledby="teslimat-sss">
        <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
          <h2 id="teslimat-sss" className="text-h2">
            Teslimatla ilgili sorular
          </h2>
          <FaqAccordion sorular={teslimatSorulari} />
        </div>
      </Section>

      <CtaBolumu
        baslik="Bulunduğunuz yere teslimatı konuşalım"
        metin="İl ve ilçenizi, istediğiniz tür ve adedi yazın; teslimat planını ve ücretini size iletelim."
        mesaj={mesajlar.teslimat}
      />
      <IletisimAraclari mesaj={mesajlar.teslimat} />
    </>
  );
}
