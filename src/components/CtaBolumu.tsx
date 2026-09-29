import { Phone } from "lucide-react";
import { Gunes } from "@/components/illustrations";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { WhatsAppIkon } from "@/components/ui/MarkaIkonlari";
import type { Zemin } from "@/components/ui/Section";
import { WaveDivider } from "@/components/ui/WaveDivider";
import { birincilTelefon, mesajlar, olaylar, telLinki, whatsappLinki } from "@/lib/whatsapp";

type Props = {
  baslik?: string;
  metin?: string;
  mesaj?: string;
  tur?: string;
  /** Üstteki bölümün rengi (dalga için) */
  ustZemin?: Zemin;
};

/** Lacivert kapanış bölümü: WhatsApp + Ara. Her sayfanın sonunda; footer ile tek lacivert blok oluşturur. */
export function CtaBolumu({
  baslik = "Kümesiniz için doğru yarkayı birlikte seçelim",
  metin = "Kümesinizi, bölgenizi ve beklentinizi anlatın; size uygun türü, güncel fiyatı ve teslimat planını hemen iletelim.",
  mesaj = mesajlar.genel,
  tur,
  ustZemin = "krem",
}: Props) {
  return (
    <>
    <WaveDivider ust={ustZemin} alt="lacivert" ters />
    <section className="relative overflow-hidden bg-indigo -mt-px py-16 text-white md:py-24" aria-labelledby="cta-baslik">
      <Gunes className="pointer-events-none absolute -right-10 -top-10 w-48 text-sky md:right-10 md:top-8 md:w-56" />
      <Container className="relative">
        <h2 id="cta-baslik" className="max-w-[18ch] text-h2 text-white">
          {baslik}
        </h2>
        <p className="mt-5 max-w-prose text-white/90">{metin}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href={whatsappLinki(mesaj)} tur="whatsapp" olay={olaylar.whatsapp} olayTur={tur} ikon={<WhatsAppIkon className="size-4.5" />}>
            WhatsApp&apos;tan Yazın
          </Button>
          <Button href={telLinki()} tur="acik" olay={olaylar.telefon} olayTur={tur} ikon={<Phone aria-hidden className="size-4" strokeWidth={1.75} />}>
            Hemen Ara<span className="hidden whitespace-nowrap sm:inline"> · {birincilTelefon.gorunen}</span>
          </Button>
        </div>
      </Container>
    </section>
    </>
  );
}
