import Image from "next/image";
import Link from "next/link";
import { BreedCard } from "@/components/BreedCard";
import { CtaBolumu } from "@/components/CtaBolumu";
import { FaqAccordion } from "@/components/FaqAccordion";
import { GuvenSatiri } from "@/components/GuvenSatiri";
import { SosyalBolum } from "@/components/SosyalBolum";
import { HeroVideo } from "@/components/HeroVideo";
import { BugdayBasagi, YuvadaYumurtalar } from "@/components/illustrations";
import { IletisimAraclari } from "@/components/layout/IletisimAraclari";
import { TeslimatAdimlari } from "@/components/TeslimatAdimlari";
import { Blob } from "@/components/ui/Blob";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { WhatsAppIkon } from "@/components/ui/MarkaIkonlari";
import { Section } from "@/components/ui/Section";
import { WaveDivider } from "@/components/ui/WaveDivider";
import { VideoKutusu } from "@/components/VideoKutusu";
import { videolar } from "@/content/galeri";
import { gorselBoyutlari, videoDosyalari } from "@/content/media.generated";
import { site } from "@/content/site";
import { oneCikanSorular } from "@/content/sss";
import { tavuklar } from "@/content/tavuklar";
import { sayfaMeta } from "@/lib/metadata";
import { mesajlar, olaylar, whatsappLinki } from "@/lib/whatsapp";

export const metadata = sayfaMeta({
  baslik: "Yumurtacı Yarka Satışı, Türkiye Geneli",
  aciklama: site.aciklama,
  yol: "/",
  mutlak: true,
});

// Neden Üçel 23: yalnızca kullanıcının verdiği bilgiler (EKSIKLER.md), uydurma sayı yok.
const nedenler = [
  {
    baslik: "Kendi aracımızla, sepetlerde",
    metin: "Yarkalar kendi araçlarımızla, sepetler içinde kapınıza gelir. Yolda yaşanan tüm kayıplar bize aittir.",
  },
  {
    baslik: "Aşılı ve kontrollü",
    metin: "Aşılar yapılır, teslimattan önce sürünün sağlık durumu kontrol edilir. Belgeleri bizi arayarak isteyebilirsiniz.",
  },
  {
    baslik: "Satıştan sonra da yanınızdayız",
    metin: "Bakım, besleme ve yetiştiricilikle ilgili sorularınızı teslimattan sonra da yanıtlıyoruz.",
  },
  {
    baslik: "Her zaman ulaşın",
    metin: "Haftanın her günü, günün her saati arayabilirsiniz. Çiftliği görmek isterseniz gelmeden önce haber vermeniz yeterli.",
  },
];

const neden = "/images/anasayfa/cayirda-kahverengi-yarka-surusu.webp";

export default function AnaSayfa() {
  const hero = videoDosyalari["hero-cayirda-tavuklar"];
  const bolumVideosu = videolar.find((v) => v.ad === "dag-eteginde-serbest-tavuklar")!;

  return (
    <>
      {/* ---------------------------------------------------------------- HERO */}
      <section className="relative overflow-hidden bg-cream">
        {/* Mobilde başlık ile eğik video yan yana, butonlar altta tam genişlik; lg'de video sağda iki satırı kaplar */}
        <Container className="grid grid-cols-[1fr_42%] items-center gap-x-5 gap-y-8 pb-16 pt-8 sm:grid-cols-[1fr_38%] md:pb-20 md:pt-12 lg:grid-cols-[1.05fr_1fr] lg:gap-x-16 lg:gap-y-0 lg:pb-24">
          <div className="relative z-10 lg:self-end">
            <h1 className="text-display">Sağlıklı yarka, kapınıza kadar</h1>
            <p className="relative mt-3 inline-block font-script text-script text-indigo">
              Konya&apos;daki çiftliğimizden kümesinize
              {/* not defterindeki gibi videoya uzanan ok */}
              <svg
                aria-hidden
                viewBox="0 0 120 60"
                fill="none"
                className="cizim cizim-animasyon absolute -right-28 top-2 hidden w-24 text-indigo lg:block"
              >
                <path pathLength={1} d="M4 30 C30 8 70 6 104 26" stroke="currentColor" strokeWidth={1.25} strokeLinecap="round" />
                <path pathLength={1} d="M92 16 L105 27 L90 34" stroke="currentColor" strokeWidth={1.25} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </p>
          </div>

          <div className="relative w-full lg:row-span-2">
            <Blob renk="yolk" sekil={0} belir className="absolute -right-10 -top-8 w-[125%] lg:-right-32 lg:-top-16 lg:w-[115%]" />
            <Blob renk="pasture" sekil={2} dondur={40} belir className="gecikmeli absolute -bottom-6 -left-6 w-1/2 lg:-bottom-14 lg:-left-16" />
            <div className="relative rotate-[10deg] overflow-hidden rounded-card border-4 border-white bg-white shadow-card lg:rotate-[-8deg] lg:border-[6px]">
              <HeroVideo src={hero.src} poster={hero.poster} posterW={hero.w} posterH={hero.h} className="aspect-[4/5] w-full" />
            </div>
            <BugdayBasagi ciz className="absolute -bottom-8 -left-5 w-10 rotate-[-8deg] text-indigo md:w-16 lg:-bottom-10 lg:-left-12 lg:w-20" />
          </div>

          <div className="relative z-10 col-span-2 lg:col-span-1 lg:self-start">
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:mt-8">
              <Button href={whatsappLinki(mesajlar.genel)} olay={olaylar.whatsapp} ikon={<WhatsAppIkon className="size-4.5" />}>
                WhatsApp&apos;tan Sipariş Ver
              </Button>
              <Button href="/tavuklarimiz" tur="secondary">
                Türleri İncele
              </Button>
            </div>
            <GuvenSatiri className="mt-8 border-t border-ink/15 pt-5" />
          </div>
        </Container>
      </section>

      {/* ---------------------------------------------------------------- TAVUKLARIMIZ */}
      <WaveDivider ust="krem" alt="turuncu" />
      <section className="-mt-px bg-orange-deep pb-16 pt-8 text-white md:pb-24" aria-labelledby="turler-baslik">
        <Container>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 id="turler-baslik" className="text-h1 text-white">
                Tavuklarımız
              </h2>
              <p className="mt-3 max-w-prose text-white md:text-lg">
                Yumurta verimleriyle kendini kanıtlamış yumurtacı yarkalar sunuyoruz: kahverengi, beyaz ve krem yumurta verenler, gezen tavuğa uygun olanlar.
              </p>
            </div>
            <Button href="/tavuklarimiz" tur="acik" className="self-start md:self-auto">
              Tümünü karşılaştır
            </Button>
          </div>
        </Container>
        <ul className="serit mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-6 pt-6 md:mt-10 md:gap-6 md:pt-8 md:px-8 xl:px-[max(2rem,calc((100vw-1200px)/2+2rem))]">
          {tavuklar.map((t, i) => (
            <li key={t.slug} className="w-[44%] max-w-[210px] shrink-0 snap-start sm:w-[30%] lg:w-[270px]">
              <BreedCard tur={t} sira={i} sizes="(min-width: 1024px) 270px, 44vw" />
            </li>
          ))}
        </ul>
      </section>
      <WaveDivider ust="turuncu" alt="krem" ters />

      {/* ---------------------------------------------------------------- NEDEN ÜÇEL 23 */}
      <Section aria-labelledby="neden-baslik">
        {/* Mobilde küçük fotoğraf başlığın yanında, maddeler altta tam genişlik */}
        <div className="grid grid-cols-[40%_1fr] items-center gap-x-6 gap-y-8 md:grid-cols-2 md:gap-x-12 md:gap-y-0 lg:gap-x-20">
          <div className="relative md:row-span-2">
            <Blob renk="pasture" sekil={1} dondur={-20} className="absolute -left-5 -top-5 w-3/4 md:-left-10 md:-top-10" />
            <Image
              src={neden}
              alt="Çayırda serbestçe dolaşan kahverengi yumurtacı tavuk sürüsü"
              width={gorselBoyutlari[neden].w}
              height={gorselBoyutlari[neden].h}
              sizes="(min-width: 768px) 45vw, 40vw"
              className="relative aspect-[4/5] w-full -rotate-3 rounded-card object-cover md:rotate-0"
            />
            <YuvadaYumurtalar className="absolute -bottom-5 -right-3 w-20 rotate-6 text-indigo md:-bottom-8 md:-right-10 md:w-44" />
          </div>
          <h2 id="neden-baslik" className="text-h2 md:self-end">
            Neden Üçel 23?
          </h2>
          <div className="col-span-2 md:col-span-1 md:col-start-2 md:self-start">
            <ul className="divide-y divide-ink border-y border-ink md:mt-8">
              {nedenler.map((n) => (
                <li key={n.baslik} className="py-5">
                  <h3 className="font-body text-base font-semibold normal-case md:text-lg tracking-normal text-indigo">{n.baslik}</h3>
                  <p className="mt-1.5">{n.metin}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* ---------------------------------------------------------------- TESLİMAT SÜRECİ */}
      <Section aria-labelledby="teslimat-baslik" className="pt-0 md:pt-0">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h2 id="teslimat-baslik" className="text-h2">
            Siparişten kümesinize
          </h2>
          <Link href="/teslimat" className="font-semibold text-indigo underline underline-offset-4 hover:no-underline">
            Teslimat hakkında her şey
          </Link>
        </div>
        <div className="mt-10">
          <TeslimatAdimlari />
        </div>
      </Section>

      {/* ---------------------------------------------------------------- VİDEO */}
      <Section aria-labelledby="video-baslik" className="pt-0 md:pt-0">
        <div className="grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
          <VideoKutusu video={bolumVideosu} />
          <div>
            <h2 id="video-baslik" className="text-h2">
              Kümesinizin yeni sakinleri
            </h2>
            <p className="mt-4 max-w-prose">
              Yarkalarımız genellikle yumurtlamaya yakın yaşta, aşıları yapılmış olarak kümesinize gelir. Çiftliğimizden gerçek
              fotoğraf ve videoları galeride bulabilirsiniz.
            </p>
            <Button href="/galeri" tur="secondary" className="mt-6">
              Galeriye Git
            </Button>
          </div>
        </div>
      </Section>

      {/* ---------------------------------------------------------------- SSS ÖZETİ */}
      <Section aria-labelledby="sss-baslik" className="pt-0 md:pt-0">
        <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
          <div>
            <h2 id="sss-baslik" className="text-h2">
              Merak edilenler
            </h2>
            <Link
              href="/sikca-sorulan-sorular"
              className="mt-4 inline-block font-semibold text-indigo underline underline-offset-4 hover:no-underline"
            >
              Tüm sorular
            </Link>
          </div>
          <FaqAccordion sorular={oneCikanSorular.slice(0, 5)} />
        </div>
      </Section>

      <SosyalBolum />

      <CtaBolumu />
      <IletisimAraclari mesaj={mesajlar.genel} />
    </>
  );
}
