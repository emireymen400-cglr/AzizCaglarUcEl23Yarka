import Image from "next/image";
import Link from "next/link";
import { preload } from "react-dom";
import { BreedCard } from "@/components/BreedCard";
import { CtaBolumu } from "@/components/CtaBolumu";
import { FaqAccordion } from "@/components/FaqAccordion";
import { GuvenSatiri } from "@/components/GuvenSatiri";
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
import { tavuklar, turSayisi } from "@/content/tavuklar";
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
  // Hero posteri LCP öğesi: erken yükle
  preload(hero.poster, { as: "image", fetchPriority: "high" });

  return (
    <>
      {/* ---------------------------------------------------------------- HERO */}
      <section className="relative overflow-hidden bg-cream">
        <Container className="grid items-center gap-10 pb-16 pt-8 md:pb-20 md:pt-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pb-24">
          <div className="relative z-10">
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
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button href={whatsappLinki(mesajlar.genel)} olay={olaylar.whatsapp} ikon={<WhatsAppIkon className="size-4.5" />}>
                WhatsApp&apos;tan Sipariş Ver
              </Button>
              <Button href="/tavuklarimiz" tur="secondary">
                Türleri İncele
              </Button>
            </div>
            <GuvenSatiri className="mt-8 border-t border-ink/15 pt-5" />
          </div>

          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <Blob renk="yolk" sekil={0} belir className="absolute -right-24 -top-16 w-[115%] md:-right-32" />
            <Blob renk="pasture" sekil={2} dondur={40} belir className="gecikmeli absolute -bottom-14 -left-16 w-1/2" />
            <div className="relative overflow-hidden rounded-card border-[6px] border-white bg-white lg:-rotate-2">
              <HeroVideo src={hero.src} poster={hero.poster} className="aspect-[4/3] w-full object-cover lg:aspect-[4/5]" />
            </div>
            <BugdayBasagi ciz className="absolute -bottom-10 -left-6 w-16 rotate-[-8deg] text-indigo md:w-20 lg:-left-12" />
          </div>
        </Container>
      </section>

      {/* ---------------------------------------------------------------- TAVUKLARIMIZ */}
      <WaveDivider ust="krem" alt="turuncu" />
      <section className="-mt-px bg-orange pb-16 pt-8 text-white md:pb-24" aria-labelledby="turler-baslik">
        <Container>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 id="turler-baslik" className="text-h1 text-white">
                Tavuklarımız
              </h2>
              <p className="mt-3 max-w-prose text-lg text-white">
                {turSayisi} türden yumurtacı yarka: kahverengi, beyaz ve krem yumurta verenler, gezen tavuğa uygun olanlar.
              </p>
            </div>
            <Button href="/tavuklarimiz" tur="acik" className="self-start md:self-auto">
              Tümünü karşılaştır
            </Button>
          </div>
        </Container>
        <ul className="serit mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-6 pt-8 md:px-8 xl:px-[max(2rem,calc((100vw-1200px)/2+2rem))]">
          {tavuklar.map((t, i) => (
            <li key={t.slug} className="w-[74%] max-w-[290px] shrink-0 snap-start sm:w-[42%] lg:w-[270px]">
              <BreedCard tur={t} sira={i} sizes="(min-width: 1024px) 270px, 74vw" />
            </li>
          ))}
        </ul>
      </section>
      <WaveDivider ust="turuncu" alt="krem" ters />

      {/* ---------------------------------------------------------------- NEDEN ÜÇEL 23 */}
      <Section aria-labelledby="neden-baslik">
        <div className="grid items-center gap-12 md:grid-cols-2 lg:gap-20">
          <div className="relative">
            <Blob renk="pasture" sekil={1} dondur={-20} className="absolute -left-10 -top-10 w-3/4" />
            <Image
              src={neden}
              alt="Çayırda serbestçe dolaşan kahverengi yumurtacı tavuk sürüsü"
              width={gorselBoyutlari[neden].w}
              height={gorselBoyutlari[neden].h}
              sizes="(min-width: 768px) 45vw, 100vw"
              className="relative aspect-[4/5] w-full rounded-card object-cover"
            />
            <YuvadaYumurtalar className="absolute -bottom-8 -right-4 w-36 rotate-6 text-indigo md:-right-10 md:w-44" />
          </div>
          <div>
            <h2 id="neden-baslik" className="text-h2">
              Neden Üçel 23?
            </h2>
            <ul className="mt-8 divide-y divide-ink border-y border-ink">
              {nedenler.map((n) => (
                <li key={n.baslik} className="py-5">
                  <h3 className="font-body text-lg font-semibold normal-case tracking-normal text-indigo">{n.baslik}</h3>
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

      <CtaBolumu />
      <IletisimAraclari mesaj={mesajlar.genel} />
    </>
  );
}
