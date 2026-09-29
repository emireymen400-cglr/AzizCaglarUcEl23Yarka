import { Phone } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { BreedCard } from "@/components/BreedCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBolumu } from "@/components/CtaBolumu";
import { FaqAccordion } from "@/components/FaqAccordion";
import { GaleriIzgarasi, type GaleriOgesi } from "@/components/GaleriIzgarasi";
import { BugdayBasagi } from "@/components/illustrations";
import { JsonLd } from "@/components/JsonLd";
import { IletisimAraclari } from "@/components/layout/IletisimAraclari";
import { Badge } from "@/components/ui/Badge";
import { Blob } from "@/components/ui/Blob";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { WhatsAppIkon } from "@/components/ui/MarkaIkonlari";
import { Section } from "@/components/ui/Section";
import { gorselBoyutlari } from "@/content/media.generated";
import { sorular as tumSorular } from "@/content/sss";
import { tavuklar, turBul, turSluglari, type Gorsel, type Tur } from "@/content/tavuklar";
import { fiyatMetni } from "@/lib/fiyat";
import { sayfaMeta } from "@/lib/metadata";
import { urunSchema } from "@/lib/schema";
import { birincilTelefon, olaylar, telLinki, whatsappLinki } from "@/lib/whatsapp";

export const dynamicParams = false;

export function generateStaticParams() {
  return turSluglari.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/tavuklarimiz/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const tur = turBul(slug);
  if (!tur) return {};
  // OG görseli: ./opengraph-image.tsx (tür fotoğrafı + marka renkleri)
  return sayfaMeta({
    baslik: tur.seo.title,
    aciklama: tur.seo.description,
    yol: `/tavuklarimiz/${tur.slug}`,
    kendiOgGorseli: true,
  });
}

/** Bilgi satırları: veride olmayan satır hiç render edilmez. */
function bilgiSatirlari(t: Tur) {
  return [
    ["Fiyat", t.fiyat ? fiyatMetni(t.fiyat) + (t.fiyat.not ? ` (${t.fiyat.not})` : "") : undefined],
    ["Yumurta rengi", t.yumurtaRengi],
    ["Kullanım", t.kullanim],
    ["Tür", t.tip],
    ["Verim", t.yillikVerim],
    ["İlk yumurta", t.ilkYumurtaHaftasi],
    ["Satış haftaları", t.satisHaftalari],
    ["İklim", t.iklim],
    ["Yetiştirme", t.sistem],
  ].filter((s): s is [string, string] => Boolean(s[1]));
}

const galeriOgeleri = (gorseller: Gorsel[]): GaleriOgesi[] =>
  gorseller.map((g) => ({ tur: "gorsel", kucuk: g.src, buyuk: g.src, alt: g.alt, optimize: true, ...gorselBoyutlari[g.src] }));

/** Türe özgü sorular önce, sonra genel öne çıkanlar; en fazla 6. */
function turunSorulari(slug: string) {
  const ilgili = tumSorular.filter((s) => s.turler.includes(slug));
  const ozel = ilgili.filter((s) => s.turler.length < turSluglari.length);
  const genel = ilgili.filter((s) => s.turler.length === turSluglari.length && s.oneCikan);
  return [...ozel, ...genel].slice(0, 6);
}

export default async function TurSayfasi({ params }: PageProps<"/tavuklarimiz/[slug]">) {
  const { slug } = await params;
  const tur = turBul(slug);
  if (!tur) notFound();

  const kapak = tur.gorseller[0];
  const kb = gorselBoyutlari[kapak.src];
  const bilgiler = bilgiSatirlari(tur);
  const sorular = turunSorulari(tur.slug);
  const digerleri = tavuklar.filter((t) => t.slug !== tur.slug);

  return (
    <>
      {/* ---------------------------------------------------------------- ÜST */}
      <section className="relative overflow-hidden">
        <Container className="pt-6 md:pt-10">
          <Breadcrumbs
            adimlar={[
              { ad: "Tavuklarımız", yol: "/tavuklarimiz" },
              { ad: tur.ad, yol: `/tavuklarimiz/${tur.slug}` },
            ]}
          />
          {/* Mobilde başlık ile küçük kapak fotoğrafı yan yana, metin ve butonlar altta; lg'de fotoğraf sağda iki satırı kaplar */}
          <div className="mt-6 grid grid-cols-[1fr_40%] items-center gap-x-5 gap-y-6 pb-16 sm:grid-cols-[1fr_36%] lg:mt-8 lg:grid-cols-[1fr_1.05fr] lg:gap-x-16 lg:gap-y-0 lg:pb-24">
            <h1 className="text-display lg:self-end">{tur.ad} yarka</h1>
            <div className="relative w-full lg:row-span-2 lg:mx-auto lg:max-w-md">
              <Blob renk={tur.accent} sekil={0} dondur={15} belir className="absolute -right-8 -top-6 w-[110%] lg:-right-16 lg:-top-12" />
              <Image
                src={kapak.src}
                alt={kapak.alt}
                width={kb.w}
                height={kb.h}
                preload
                fetchPriority="high"
                quality={60}
                sizes="(min-width: 1024px) 448px, 40vw"
                className="relative aspect-[4/5] w-full rotate-3 rounded-card border-4 border-white object-cover shadow-card lg:rotate-2 lg:border-0"
              />
              <BugdayBasagi className="absolute -bottom-5 -left-5 w-9 -rotate-12 text-indigo lg:-bottom-8 lg:-left-8 lg:w-14" />
            </div>
            <div className="relative col-span-2 lg:col-span-1 lg:self-start">
              <p className="max-w-prose leading-relaxed md:text-lg lg:mt-5">{tur.kisaAciklama}</p>
              <ul className="mt-6 flex flex-wrap gap-2" aria-label="Öne çıkan özellikler">
                <li>
                  <Badge yumurtaRengi={tur.yumurtaRengi}>{tur.yumurtaRengi} yumurta</Badge>
                </li>
                {tur.kart
                  .filter((k) => !/yumurta$/i.test(k) || /verim/i.test(k))
                  .slice(0, 4)
                  .map((k) => (
                  <li key={k}>
                    <Badge>{k}</Badge>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button
                  href={whatsappLinki(tur.whatsappMesaji)}
                  olay={olaylar.whatsapp}
                  olayTur={tur.slug}
                  ikon={<WhatsAppIkon className="size-4.5" />}
                >
                  Bu tür için WhatsApp&apos;tan yaz
                </Button>
                <Button
                  href={telLinki()}
                  tur="secondary"
                  olay={olaylar.telefon}
                  olayTur={tur.slug}
                  ikon={<Phone aria-hidden className="size-4" strokeWidth={1.75} />}
                >
                  {birincilTelefon.gorunen}
                </Button>
              </div>
              {tur.fiyat ? (
                <p className="mt-4 md:text-lg">
                  <span className="font-semibold text-indigo">{fiyatMetni(tur.fiyat)}</span>
                  {tur.fiyat.not ? <span className="text-ink/75"> · {tur.fiyat.not}</span> : null}
                  <span className="mt-1 block max-w-prose text-sm text-ink/75">Fiyat ve güncel stok bilgisi için bizi arayabilir veya WhatsApp üzerinden yazabilirsiniz. Size mevcut yarka çeşitleri ve sipariş seçenekleri hakkında güncel bilgi verelim.</span>
                </p>
              ) : (
                <p className="mt-4 max-w-prose text-sm text-ink/75">Fiyat ve güncel stok bilgisi için bizi arayabilir veya WhatsApp üzerinden yazabilirsiniz. Size mevcut yarka çeşitleri ve sipariş seçenekleri hakkında güncel bilgi verelim.</p>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* ---------------------------------------------------------------- HAKKINDA + BİLGİLER */}
      <Section zemin="beyaz" aria-labelledby="hakkinda">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <h2 id="hakkinda" className="text-h2">
              {tur.ad} hakkında
            </h2>
            <div className="mt-5 max-w-prose space-y-4">
              {tur.uzunAciklama.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </div>
          <div>
            <h2 className="font-tracked text-[12px] text-ink">Kısa bilgi</h2>
            <dl className="mt-3 border-t border-ink">
              {bilgiler.map(([ad, deger]) => (
                <div key={ad} className="grid grid-cols-[9rem_1fr] gap-4 border-b border-ink/20 py-3">
                  <dt className="text-ink/70">{ad}</dt>
                  <dd className="font-semibold">{deger}</dd>
                </div>
              ))}
            </dl>
            {tur.veriKaynagi ? (
              <p className="mt-3 text-sm text-ink/70">
                Verim ve ilk yumurta:{" "}
                {tur.veriKaynagi.url ? (
                  <a href={tur.veriKaynagi.url} target="_blank" rel="noopener" className="text-indigo underline underline-offset-2">
                    {tur.veriKaynagi.ad}
                  </a>
                ) : (
                  tur.veriKaynagi.ad
                )}
                . Uygun bakım ve besleme koşullarındaki hedef değerlerdir.
              </p>
            ) : null}
          </div>
        </div>
      </Section>

      {/* ---------------------------------------------------------------- ÖZELLİKLER */}
      <Section aria-labelledby="ozellikler">
        <h2 id="ozellikler" className="text-h2">
          Öne çıkan özellikler
        </h2>
        <ul className="mt-8 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          {tur.ozellikler.map((o) => (
            <li key={o.baslik} className="border-t border-ink pt-4">
              <h3 className="font-body text-base font-semibold normal-case md:text-lg tracking-normal text-indigo">{o.baslik}</h3>
              <p className="mt-1.5">{o.metin}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* ---------------------------------------------------------------- EK BÖLÜM (Pleymut Horoz) */}
      {tur.ekBolum ? (
        <Section zemin="beyaz" aria-labelledby="ek-bolum">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <h2 id="ek-bolum" className="text-h2">
                {tur.ekBolum.baslik}
              </h2>
              <p className="mt-4 max-w-prose">{tur.ekBolum.metin}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {tur.ekBolum.ozellikler.map((o) => (
                  <li key={o}>
                    <Badge>{o}</Badge>
                  </li>
                ))}
              </ul>
            </div>
            <GaleriIzgarasi etiket={`${tur.ekBolum.baslik} fotoğrafları`} ogeler={galeriOgeleri(tur.ekBolum.gorseller)} />
          </div>
        </Section>
      ) : null}

      {/* ---------------------------------------------------------------- GALERİ */}
      {tur.gorseller.length > 1 ? (
        <Section aria-labelledby="fotograflar">
          <h2 id="fotograflar" className="text-h2">
            Fotoğraflar
          </h2>
          <div className="mt-8">
            <GaleriIzgarasi etiket={`${tur.ad} fotoğrafları`} ogeler={galeriOgeleri(tur.gorseller)} />
          </div>
        </Section>
      ) : null}

      {/* ---------------------------------------------------------------- SSS */}
      {sorular.length ? (
        <Section zemin="beyaz" aria-labelledby="tur-sss">
          <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
            <h2 id="tur-sss" className="text-h2">
              {tur.ad} hakkında sorular
            </h2>
            <FaqAccordion sorular={sorular} />
          </div>
        </Section>
      ) : null}

      {/* ---------------------------------------------------------------- DİĞER TÜRLER */}
      <section className="bg-cream py-16 md:py-24" aria-labelledby="diger-turler">
        <Container>
          <h2 id="diger-turler" className="text-h2">
            Diğer türler
          </h2>
        </Container>
        <ul className="mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-6 pt-6 md:gap-6 md:pt-8 md:px-8 xl:px-[max(2rem,calc((100vw-1200px)/2+2rem))]">
          {digerleri.map((t, i) => (
            <li key={t.slug} className="w-[44%] max-w-[210px] shrink-0 snap-start sm:w-[30%] lg:w-[250px]">
              <BreedCard tur={t} sira={i + 1} sizes="(min-width: 1024px) 250px, 44vw" />
            </li>
          ))}
        </ul>
      </section>

      <CtaBolumu
        baslik={`${tur.ad} için bize yazın`}
        metin="Adet ve teslimat adresinizi yazın; güncel stok, yaş ve fiyat bilgisini hemen iletelim."
        mesaj={tur.whatsappMesaji}
        tur={tur.slug}
      />
      <IletisimAraclari mesaj={tur.whatsappMesaji} tur={tur.slug} />
      <JsonLd veri={urunSchema(tur)} />
    </>
  );
}
