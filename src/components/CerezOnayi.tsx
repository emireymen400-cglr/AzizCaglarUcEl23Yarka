"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useSyncExternalStore } from "react";
import { analitigiKapat, onayaAbone, onayOku, onayYaz, type Onay } from "@/lib/cerez";

type Gtag = (...args: unknown[]) => void;

// Sunucuda ve ilk hidrasyonda "bilinmiyor": bant SSR'da basılmaz, sayfa zıplamaz.
const sunucuDegeri = () => "bilinmiyor" as const;

/** Sayfa yolundan tür slug'ı (/tavuklarimiz/<slug>) */
function yoldanTur(yol: string): string | undefined {
  const m = yol.match(/^\/tavuklarimiz\/([^/]+)/);
  return m?.[1];
}

/**
 * KVKK uyumlu çerez bandı + GA4. GA yalnızca "Kabul et" sonrası yüklenir.
 * whatsapp_click / phone_click olayları data-olay özniteliğinden, sayfa yolu ve tür slug'ıyla gönderilir.
 */
export function CerezOnayi({ gaId }: { gaId?: string }) {
  const onay = useSyncExternalStore<Onay | null | "bilinmiyor">(onayaAbone, onayOku, sunucuDegeri);

  // Tıklama olayları: tek dinleyici, tüm data-olay'lı linkler için
  useEffect(() => {
    const tikla = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>("[data-olay]");
      if (!el || onayOku() !== "kabul") return;
      const gtag = (window as unknown as { gtag?: Gtag }).gtag;
      if (!gtag) return;
      const yol = window.location.pathname;
      gtag("event", el.dataset.olay, {
        sayfa_yolu: yol,
        tur: el.dataset.tur ?? yoldanTur(yol) ?? "(yok)",
        link_url: (el as HTMLAnchorElement).href,
        transport_type: "beacon",
      });
    };
    document.addEventListener("click", tikla, { capture: true });
    return () => document.removeEventListener("click", tikla, { capture: true });
  }, []);

  const karar = (d: Onay) => {
    if (d === "red" && gaId) analitigiKapat(gaId);
    onayYaz(d);
  };

  return (
    <>
      {onay === "kabul" && gaId ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
          <Script id="ga4-baslat" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;window['ga-disable-${gaId}']=false;gtag('js',new Date());gtag('config','${gaId}');`}
          </Script>
        </>
      ) : null}

      {onay === null ? (
        <div
          role="region"
          aria-label="Çerez tercihi"
          className="fixed inset-x-3 bottom-[calc(4.75rem+env(safe-area-inset-bottom))] z-40 rounded-card border border-ink/15 bg-white p-5 text-[15px] leading-relaxed lg:inset-x-auto lg:bottom-6 lg:left-6 lg:max-w-md"
        >
          <p>
            Sitemizin nasıl kullanıldığını ölçmek için, <strong>onay verirseniz</strong> Google Analytics çerezleri kullanırız.
            Siteyi kullanmak için zorunlu çerez yoktur.{" "}
            <Link href="/cerez-politikasi" className="text-indigo underline underline-offset-2">
              Çerez Politikası
            </Link>
          </p>
          {/* İki seçenek eşit ağırlıkta: aynı boyut, aynı stil */}
          <div className="mt-4 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => karar("red")}
              className="min-h-11 rounded-button border-2 border-indigo bg-white font-label text-[12.5px] font-medium uppercase tracking-[0.12em] text-indigo hover:bg-indigo/5"
            >
              Reddet
            </button>
            <button
              type="button"
              onClick={() => karar("kabul")}
              className="min-h-11 rounded-button border-2 border-indigo bg-white font-label text-[12.5px] font-medium uppercase tracking-[0.12em] text-indigo hover:bg-indigo/5"
            >
              Kabul et
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
