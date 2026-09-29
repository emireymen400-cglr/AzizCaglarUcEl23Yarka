"use client";

import { MapPin } from "lucide-react";
import { useState } from "react";
import { site } from "@/content/site";

/**
 * Harita, kullanıcı isteyince yüklenir: Google çerezleri onaysız yüklenmez ve
 * sayfa hızı korunur. Harita linki her zaman erişilebilir.
 */
export function HaritaKutusu() {
  const [yuklu, setYuklu] = useState(false);
  const { lat, lng } = site.konum;

  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-card border border-ink/15 bg-white md:aspect-[16/10]">
      {yuklu ? (
        <iframe
          title={`${site.ad} konumu – Google Haritalar`}
          src={`https://www.google.com/maps?q=${lat},${lng}&z=15&hl=tr&output=embed`}
          className="size-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <div className="flex size-full flex-col items-center justify-center gap-4 p-6 text-center">
          <MapPin aria-hidden className="size-10 text-indigo" strokeWidth={1.25} />
          <p className="max-w-sm text-sm text-ink/80">
            Haritayı gösterdiğinizde Google Haritalar yüklenir ve Google çerez kullanabilir.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => setYuklu(true)}
              className="min-h-11 rounded-button bg-indigo px-6 font-label text-[12.5px] font-medium uppercase tracking-[0.12em] text-white hover:bg-indigo-dark"
            >
              Haritayı göster
            </button>
            <a
              href={site.konum.haritaUrl}
              target="_blank"
              rel="noopener"
              className="inline-flex min-h-11 items-center rounded-button border-2 border-orange px-6 font-label text-[12.5px] font-medium uppercase tracking-[0.12em] text-indigo hover:bg-orange/10"
            >
              Google Haritalar&apos;da aç
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
