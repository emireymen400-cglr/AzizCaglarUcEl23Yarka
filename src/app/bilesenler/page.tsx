// GEÇİCİ: Bileşen vitrini. Yayından önce silinecek (robots.ts'de de engelli).

import type { Metadata } from "next";
import { Phone } from "lucide-react";
import { BreedCard } from "@/components/BreedCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FaqAccordion } from "@/components/FaqAccordion";
import { GuvenSatiri } from "@/components/GuvenSatiri";
import { BugdayBasagi, Cit, Civciv, Gunes, TavukSiluet, Tuy, Yumurta, YuvadaYumurtalar } from "@/components/illustrations";
import { IletisimAraclari } from "@/components/layout/IletisimAraclari";
import { TeslimatAdimlari } from "@/components/TeslimatAdimlari";
import { Badge } from "@/components/ui/Badge";
import { Blob } from "@/components/ui/Blob";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { WhatsAppIkon } from "@/components/ui/MarkaIkonlari";
import { Section } from "@/components/ui/Section";
import { WaveDivider } from "@/components/ui/WaveDivider";
import { oneCikanSorular } from "@/content/sss";
import { tavuklar } from "@/content/tavuklar";
import { whatsappLinki } from "@/lib/whatsapp";

export const metadata: Metadata = { title: "Bileşenler", robots: { index: false, follow: false } };

const cizimler = [
  ["Buğday başağı", BugdayBasagi],
  ["Tüy", Tuy],
  ["Yumurta", Yumurta],
  ["Yuvada yumurtalar", YuvadaYumurtalar],
  ["Tavuk siluet", TavukSiluet],
  ["Çit", Cit],
  ["Civciv", Civciv],
  ["Güneş", Gunes],
] as const;

export default function Bilesenler() {
  return (
    <>
      <Container className="py-10">
        <Breadcrumbs adimlar={[{ ad: "Bileşenler", yol: "/bilesenler" }]} />
        <h1 className="mt-6 text-h1">Bileşenler</h1>
      </Container>

      <Section aria-label="İllüstrasyonlar" className="pt-0 md:pt-0">
        <h2 className="text-h2">İllüstrasyonlar</h2>
        <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {cizimler.map(([ad, C]) => (
            <li key={ad} className="flex flex-col items-center gap-3 rounded-card bg-white p-5">
              <C className="h-28 w-auto text-indigo" />
              <span className="text-sm">{ad}</span>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex items-center gap-8 text-sky">
          <Tuy className="h-20 w-auto" />
          <Civciv className="h-20 w-auto" />
          <span className="text-sm text-ink">Gökyüzü mavisi varyant</span>
        </div>
      </Section>

      <Section zemin="beyaz" aria-label="Lekeler">
        <h2 className="text-h2">Lekeler</h2>
        <div className="mt-6 flex flex-wrap gap-6">
          <Blob renk="yolk" sekil={0} className="w-32" />
          <Blob renk="orange" sekil={1} className="w-32" />
          <Blob renk="pasture" sekil={2} className="w-32" />
          <Blob renk="sky" sekil={1} dondur={90} className="w-32" />
          <Blob renk="straw" sekil={0} dondur={45} className="w-32" />
        </div>
      </Section>
      <WaveDivider ust="beyaz" alt="turuncu" />
      <div className="-mt-px bg-orange py-10">
        <Container>
          <p className="text-h3 font-display uppercase text-white">Dalga ayraç: beyaz → turuncu → krem</p>
        </Container>
      </div>
      <WaveDivider ust="turuncu" alt="krem" ters />

      <Section aria-label="Butonlar ve rozetler">
        <h2 className="text-h2">Butonlar</h2>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button href={whatsappLinki()} ikon={<WhatsAppIkon className="size-4.5" />}>
            WhatsApp&apos;tan Sipariş Ver
          </Button>
          <Button href="/tavuklarimiz" tur="secondary">
            Türleri İncele
          </Button>
          <Button href={whatsappLinki()} tur="whatsapp" ikon={<WhatsAppIkon className="size-4.5" />}>
            WhatsApp
          </Button>
          <span className="inline-flex rounded-card bg-indigo p-3">
            <Button href="tel:+905363964797" tur="acik" ikon={<Phone aria-hidden className="size-4" />}>
              Koyu zeminde
            </Button>
          </span>
        </div>
        <h2 className="mt-12 text-h2">Rozetler</h2>
        <div className="mt-6 flex flex-wrap gap-2">
          <Badge yumurtaRengi="Kahverengi">Kahverengi yumurta</Badge>
          <Badge yumurtaRengi="Beyaz">Beyaz yumurta</Badge>
          <Badge yumurtaRengi="Krem / bej">Krem yumurta</Badge>
          <Badge tur="guven">Aşılı</Badge>
          <Badge>Gezen tavuğa uygun</Badge>
        </div>
        <GuvenSatiri className="mt-8" />
      </Section>

      <Section zemin="beyaz" aria-label="Tür kartları">
        <h2 className="text-h2">Tür kartları</h2>
        <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {tavuklar.slice(0, 4).map((t, i) => (
            <li key={t.slug}>
              <BreedCard tur={t} sira={i} />
            </li>
          ))}
        </ul>
      </Section>

      <Section aria-label="Teslimat ve SSS">
        <h2 className="text-h2">Teslimat adımları</h2>
        <div className="mt-8">
          <TeslimatAdimlari />
        </div>
        <h2 className="mt-16 text-h2">SSS akordiyonu</h2>
        <div className="mt-8">
          <FaqAccordion sorular={oneCikanSorular.slice(0, 3)} />
        </div>
      </Section>
      <IletisimAraclari />
    </>
  );
}
