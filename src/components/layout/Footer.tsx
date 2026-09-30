import { MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CerezTercihleriButonu } from "@/components/CerezTercihleriButonu";
import { TavukSiluet } from "@/components/illustrations";
import { Container } from "@/components/ui/Container";
import { SosyalIkon, WhatsAppIkon } from "@/components/ui/MarkaIkonlari";
import { altMenu, anaMenu } from "@/content/navigasyon";
import { site } from "@/content/site";
import { tavuklar } from "@/content/tavuklar";
import { mesajlar, olaylar, telLinki, whatsappLinki } from "@/lib/whatsapp";

const baslik = "font-tracked text-[12px] text-white/70";
const link = "text-white hover:underline underline-offset-4";

export function Footer() {
  return (
    <footer className="relative mt-auto">
      {/* Üstündeki dalga, her sayfanın sonundaki CtaBolumu'nde (krem → lacivert) */}
      <div className="footer-ic relative overflow-hidden border-t border-white/15 bg-indigo pb-10 pt-14 text-white">
        {/* Arka planda %8 opak büyük tavuk çizimi (DESIGN.md §6) */}
        <TavukSiluet className="pointer-events-none absolute -bottom-10 -right-16 w-[520px] text-white opacity-[0.08] md:-right-6 md:w-[640px]" />
        <Container className="relative">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
            <div>
              <Image src="/logo.png" alt={site.ad} width={842} height={737} sizes="110px" className="h-24 w-auto" />
              <p className="mt-5 max-w-xs text-white/85">
                {site.kurulusYili}&apos;den beri Konya Karatay&apos;daki çiftliğimizden Türkiye&apos;nin tüm il ve ilçelerine
                yumurtacı yarka.
              </p>
            </div>

            <nav aria-label="Tavuklarımız">
              <h2 className={baslik}>Tavuklarımız</h2>
              <ul className="mt-4 space-y-2">
                {tavuklar.map((t) => (
                  <li key={t.slug}>
                    <Link href={`/tavuklarimiz/${t.slug}`} className={link}>
                      {t.ad}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Sayfalar">
              <h2 className={baslik}>Sayfalar</h2>
              <ul className="mt-4 space-y-2">
                {anaMenu.map((m) => (
                  <li key={m.yol}>
                    <Link href={m.yol} className={link}>
                      {m.ad}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <h2 className={baslik}>İletişim</h2>
              <ul className="mt-4 space-y-3">
                {site.telefonlar.map((t) => (
                  <li key={t.e164}>
                    <a href={telLinki(t)} data-olay={olaylar.telefon} className={`${link} inline-flex items-center gap-2.5 tabular-nums`}>
                      <Phone aria-hidden className="size-4" strokeWidth={1.75} />
                      {t.gorunen}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href={whatsappLinki(mesajlar.genel)}
                    target="_blank"
                    rel="noopener"
                    data-olay={olaylar.whatsapp}
                    className={`${link} inline-flex items-center gap-2.5`}
                  >
                    <WhatsAppIkon className="size-4" />
                    WhatsApp&apos;tan yazın
                  </a>
                </li>
                <li>
                  <a href={site.konum.haritaUrl} target="_blank" rel="noopener" className={`${link} inline-flex gap-2.5`}>
                    <MapPin aria-hidden className="mt-1 size-4 shrink-0" strokeWidth={1.75} />
                    <span>{site.adres.tamMetin}</span>
                  </a>
                </li>
                <li className="text-white/85">{site.calismaSaatleri.metin}</li>
              </ul>
              <ul className="mt-6 flex flex-wrap gap-3" aria-label="Sosyal medya">
                {site.sosyal.map((s) => (
                  <li key={s.ad}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener"
                      aria-label={s.ad}
                      title={s.ad}
                      className="inline-flex size-11 items-center justify-center rounded-full border border-white/40 hover:bg-white/10"
                    >
                      <SosyalIkon ad={s.ad} className="size-5" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-14 flex flex-col gap-4 border-t border-white/20 pt-6 text-sm text-white/75 md:flex-row md:items-center md:justify-between">
            <p>
              © {new Date().getFullYear()} {site.tamAd} · {site.sahip}
            </p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {altMenu.map((m) => (
                <li key={m.yol}>
                  <Link href={m.yol} className="hover:underline underline-offset-4">
                    {m.ad}
                  </Link>
                </li>
              ))}
              <li>
                <CerezTercihleriButonu className="hover:underline underline-offset-4" />
              </li>
            </ul>
          </div>
        </Container>
      </div>
    </footer>
  );
}
