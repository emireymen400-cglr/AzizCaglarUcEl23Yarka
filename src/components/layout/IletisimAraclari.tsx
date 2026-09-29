import { Phone } from "lucide-react";
import { WhatsAppIkon } from "@/components/ui/MarkaIkonlari";
import { mesajlar, olaylar, telLinki, whatsappLinki } from "@/lib/whatsapp";

type Props = {
  /** Sayfaya özel hazır WhatsApp mesajı */
  mesaj?: string;
  /** GA4 olayına eklenecek tür slug'ı */
  tur?: string;
};

/** Masaüstü: sağ altta 56px yuvarlak WhatsApp butonu. Animasyon yok (DESIGN.md §8). */
export function WhatsAppFloat({ mesaj = mesajlar.genel, tur }: Props) {
  return (
    <a
      href={whatsappLinki(mesaj)}
      target="_blank"
      rel="noopener"
      data-olay={olaylar.whatsapp}
      data-tur={tur}
      aria-label="WhatsApp'tan yazın"
      title="WhatsApp'tan yazın"
      className="fixed bottom-6 right-6 z-30 hidden size-14 items-center justify-center rounded-full bg-whatsapp text-white ring-1 ring-ink/10 transition-colors hover:bg-whatsapp-dark lg:inline-flex"
    >
      <WhatsAppIkon className="size-7" />
    </a>
  );
}

/** Mobil: ekran altında sabit iki eşit buton. Body'deki alt boşluk layout'ta. */
export function MobileContactBar({ mesaj = mesajlar.genel, tur }: Props) {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-2 gap-2 border-t border-ink/10 bg-cream px-3 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] lg:hidden"
      role="region"
      aria-label="Hızlı iletişim"
    >
      <a
        href={telLinki()}
        data-olay={olaylar.telefon}
        data-tur={tur}
        className="flex min-h-12 items-center justify-center gap-2 rounded-button bg-indigo font-label text-[13px] font-medium uppercase tracking-[0.12em] text-white"
      >
        <Phone aria-hidden className="size-4.5" strokeWidth={1.75} />
        Ara
      </a>
      <a
        href={whatsappLinki(mesaj)}
        target="_blank"
        rel="noopener"
        data-olay={olaylar.whatsapp}
        data-tur={tur}
        className="flex min-h-12 items-center justify-center gap-2 rounded-button bg-whatsapp font-label text-[13px] font-medium uppercase tracking-[0.12em] text-ink"
      >
        <WhatsAppIkon className="size-4.5" />
        WhatsApp
      </a>
    </div>
  );
}

/** Her sayfa kendi mesajıyla ekler (sunucu bileşeni, istemci JS'i yok). */
export function IletisimAraclari(props: Props) {
  return (
    <>
      <WhatsAppFloat {...props} />
      <MobileContactBar {...props} />
    </>
  );
}
