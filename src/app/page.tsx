// FAZ 1 GEÇİCİ SAYFA: Tasarım tokenlarını, fontları ve ana sayfa için seçilen medyayı onaya sunar.
// Faz 2'de gerçek ana sayfa ile değiştirilecek.

import type { Metadata } from "next";
import Image from "next/image";
import { gorselBoyutlari, videoDosyalari } from "@/content/media.generated";
import { tavuklar, turSayisi } from "@/content/tavuklar";

export const metadata: Metadata = {
  title: "Faz 1 önizleme",
  robots: { index: false, follow: false },
};

const renkler = [
  ["indigo", "#234386"],
  ["yolk", "#ffc400"],
  ["orange", "#ed7328"],
  ["sky", "#6aa8dc"],
  ["straw", "#d2b68c"],
  ["pasture", "#a2d3a6"],
  ["cream", "#fbf9f6"],
  ["whatsapp", "#25d366"],
] as const;

const anasayfaGorselleri = [
  ["/images/anasayfa/cayirda-kahverengi-yarka-surusu.webp", "Neden Üçel 23 bölümü"],
  ["/images/anasayfa/yesil-cayirda-kahverengi-tavuklar.webp", "Hero yedeği / paylaşım görseli"],
  ["/images/anasayfa/cimenlikte-yumurtaci-tavuklar.webp", "Kapanış (CTA) bölümü"],
  ["/images/anasayfa/farkli-renkte-tavuklar.webp", "Tavuklarımız bandı"],
  ["/images/anasayfa/cuval-uzerinde-kahverengi-yumurtalar.webp", "SSS / dekor"],
  ["/images/anasayfa/folluktaki-kahverengi-yumurtalar.webp", "Teslimat bölümü"],
] as const;


export default function Onizleme() {
  const hero = videoDosyalari["hero-cayirda-tavuklar"];
  const bolum = videoDosyalari["dag-eteginde-serbest-tavuklar"];

  return (
    <main className="mx-auto max-w-[1200px] px-5 py-16">
      <p className="font-tracked text-label text-indigo">Faz 1 · Önizleme</p>
      <h1 className="mt-2 text-h1">Sağlıklı yarka, kapınıza kadar</h1>
      <p className="font-script text-script text-indigo">Konya&apos;daki çiftliğimizden kümesinize</p>

      <p className="mt-4 text-sm">
        Font testi için: <a className="text-indigo underline" href="/font-test">/font-test</a>
      </p>

      <section className="mt-16">
        <h2 className="text-h2">Renkler</h2>
        <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {renkler.map(([ad, hex]) => (
            <li key={ad} className="rounded-card border border-ink/10 bg-white p-3">
              <span className="block h-14 rounded-card" style={{ background: hex }} />
              <span className="mt-2 block text-sm">
                {ad} · {hex}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16">
        <h2 className="text-h2">Ana sayfa videoları</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <figure>
            <video className="w-full rounded-card" src={hero.src} poster={hero.poster} muted loop playsInline autoPlay />
            <figcaption className="mt-2 text-sm">
              Hero arka plan videosu (sessiz, döngü) · {hero.sureSn} sn · {hero.boyutKb} KB
            </figcaption>
          </figure>
          <figure>
            <video className="w-full rounded-card" src={bolum.src} poster={bolum.poster} controls preload="none" />
            <figcaption className="mt-2 text-sm">
              Video bölümü · {bolum.sureSn} sn · {bolum.boyutKb} KB
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-h2">Ana sayfa görselleri</h2>
        <ul className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
          {anasayfaGorselleri.map(([src, yer]) => (
            <li key={src}>
              <Image
                src={src}
                alt=""
                width={gorselBoyutlari[src].w}
                height={gorselBoyutlari[src].h}
                sizes="(min-width: 768px) 33vw, 50vw"
                className="aspect-[4/5] w-full rounded-card object-cover"
              />
              <p className="mt-2 text-sm">{yer}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16">
        <h2 className="text-h2">Tür kapakları ({turSayisi} tür)</h2>
        <ul className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-4">
          {tavuklar.map((t) => {
            const g = t.gorseller[0];
            return (
              <li key={t.slug} className="overflow-hidden rounded-card bg-white shadow-card">
                <Image
                  src={g.src}
                  alt={g.alt}
                  width={gorselBoyutlari[g.src].w}
                  height={gorselBoyutlari[g.src].h}
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="aspect-[4/5] w-full object-cover"
                />
                <div className="p-4">
                  <h3 className="text-h3">{t.ad}</h3>
                  <p className="font-tracked mt-1 text-[12px]">{t.yumurtaRengi} yumurta</p>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}
