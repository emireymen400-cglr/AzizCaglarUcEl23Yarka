import { Clock, MapPin, Phone } from "lucide-react";
import { CtaBolumu } from "@/components/CtaBolumu";
import { HaritaKutusu } from "@/components/HaritaKutusu";
import { Gunes } from "@/components/illustrations";
import { IletisimAraclari } from "@/components/layout/IletisimAraclari";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/Button";
import { SosyalIkon, WhatsAppIkon } from "@/components/ui/MarkaIkonlari";
import { Section } from "@/components/ui/Section";
import { site } from "@/content/site";
import { sayfaMeta } from "@/lib/metadata";
import { mesajlar, olaylar, telLinki, whatsappLinki } from "@/lib/whatsapp";

export const metadata = sayfaMeta({
  baslik: "İletişim: Telefon, WhatsApp ve Adres",
  aciklama: "Üçel 23 Yarka iletişim: 0536 396 47 97 (arama ve WhatsApp), 0536 475 00 21. Erler, 14666 Sokak No:21, Karatay / Konya. 7/24 ulaşabilirsiniz.",
  yol: "/iletisim",
});

const kutu = "border-t border-ink py-6";
const kutuBaslik = "flex items-center gap-2 font-tracked text-[12px] text-ink";

export default function Iletisim() {
  return (
    <>
      <PageHeader
        baslik="İletişim"
        script="Bir telefon uzağınızdayız"
        kirintilar={[{ ad: "İletişim", yol: "/iletisim" }]}
        leke="orange"
        cizim={<Gunes />}
        giris={<p>Sipariş, fiyat ve teslimat için arayın ya da WhatsApp&apos;tan yazın. {site.calismaSaatleri.metin}.</p>}
      />

      <Section className="pt-4 md:pt-6" aria-label="İletişim bilgileri">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <div className={kutu}>
              <h2 className={kutuBaslik}>
                <Phone aria-hidden className="size-4" strokeWidth={1.75} /> Telefon
              </h2>
              <ul className="mt-3 space-y-2">
                {site.telefonlar.map((t) => (
                  <li key={t.e164}>
                    <a href={telLinki(t)} data-olay={olaylar.telefon} className="text-2xl font-semibold text-indigo tabular-nums underline-offset-4 hover:underline">
                      {t.gorunen}
                    </a>
                    <span className="ml-3 text-sm text-ink/70">{t.whatsapp ? "Arama ve WhatsApp" : "Arama"}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={kutu}>
              <h2 className={kutuBaslik}>
                <WhatsAppIkon className="size-4" /> WhatsApp
              </h2>
              <Button
                href={whatsappLinki(mesajlar.iletisim)}
                tur="whatsapp"
                olay={olaylar.whatsapp}
                className="mt-4"
                ikon={<WhatsAppIkon className="size-4.5" />}
              >
                WhatsApp&apos;tan Yazın
              </Button>
            </div>

            <div className={kutu}>
              <h2 className={kutuBaslik}>
                <MapPin aria-hidden className="size-4" strokeWidth={1.75} /> Adres
              </h2>
              <address className="mt-3 not-italic">
                <a href={site.konum.haritaUrl} target="_blank" rel="noopener" className="text-lg text-indigo underline underline-offset-4 hover:no-underline">
                  {site.adres.tamMetin}
                </a>
              </address>
              <p className="mt-2 text-sm text-ink/75">Çiftliği görmek isterseniz gelmeden önce arayıp haber vermeniz yeterli.</p>
            </div>

            <div className={kutu}>
              <h2 className={kutuBaslik}>
                <Clock aria-hidden className="size-4" strokeWidth={1.75} /> Çalışma saatleri
              </h2>
              <p className="mt-3">{site.calismaSaatleri.metin}.</p>
            </div>

            <div className={`${kutu} border-b`}>
              <h2 className={kutuBaslik}>Bizi takip edin</h2>
              <ul className="mt-4 flex flex-wrap gap-3">
                {site.sosyal.map((s) => (
                  <li key={s.ad}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener"
                      className="inline-flex min-h-11 items-center gap-2 rounded-button border border-ink/25 bg-white px-5 text-indigo hover:border-indigo"
                    >
                      <SosyalIkon ad={s.ad} className="size-5" />
                      {s.ad}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h2 className="sr-only">Harita</h2>
            <HaritaKutusu />
          </div>
        </div>
      </Section>

      <CtaBolumu mesaj={mesajlar.iletisim} />
      <IletisimAraclari mesaj={mesajlar.iletisim} />
    </>
  );
}
