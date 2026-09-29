"use client";

import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

export type GaleriOgesi =
  | {
      tur: "gorsel";
      kucuk: string;
      buyuk: string;
      alt: string;
      w: number;
      h: number;
      /** true: next/image ile boyutlandır (az sayıdaki tür görseli için); yoksa hazır küçük sürüm */
      optimize?: boolean;
    }
  | { tur: "video"; src: string; poster: string; baslik: string; w: number; h: number };

// Gerçek sütun genişliği: mobilde 2 sütun, 20px kenar boşluğu + 12px aralık
const IZGARA_SIZES = "(min-width: 1200px) 280px, (min-width: 1024px) 23vw, (min-width: 768px) 31vw, calc(50vw - 26px)";
const GORSEL_SINIF = "size-full object-cover transition-transform duration-300 group-hover:scale-[1.02] motion-reduce:transition-none";
const miniYol = (kucuk: string) => kucuk.replace("/kucuk/", "/mini/");
const posterKucuk = (p: string) => p.replace("/videos/", "/videos/kucuk/");
const posterMini = (p: string) => p.replace("/videos/", "/videos/mini/");

/**
 * Düzensiz (masonry) ızgara + klavyeyle gezilebilen lightbox (<dialog>).
 * Izgarada hazır 640px küçük sürümler kullanılır (Vercel görsel dönüştürme kotası harcanmaz).
 */
/**
 * @param oncelikli İlk ekrana giren kaç görsel lazy olmasın (LCP). Sadece sayfanın ilk ızgarasında verilir.
 */
export function GaleriIzgarasi({ ogeler, etiket, oncelikli = 0 }: { ogeler: GaleriOgesi[]; etiket: string; oncelikli?: number }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [acikIndex, setAcikIndex] = useState<number | null>(null);

  const ac = (i: number) => {
    setAcikIndex(i);
    dialogRef.current?.showModal();
  };
  const kapat = useCallback(() => dialogRef.current?.close(), []);
  const git = useCallback(
    (yon: 1 | -1) => setAcikIndex((i) => (i === null ? i : (i + yon + ogeler.length) % ogeler.length)),
    [ogeler.length],
  );

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    const tus = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") git(1);
      if (e.key === "ArrowLeft") git(-1);
    };
    const kapaninca = () => setAcikIndex(null);
    d.addEventListener("keydown", tus);
    d.addEventListener("close", kapaninca);
    return () => {
      d.removeEventListener("keydown", tus);
      d.removeEventListener("close", kapaninca);
    };
  }, [git]);

  const aktif = acikIndex === null ? null : ogeler[acikIndex];

  return (
    <>
      {/* Düzensiz ızgara (DESIGN.md §6): satır sırasıyla dolar, böylece ilk ekrandaki görseller
          gerçekten listenin başındakilerdir (CSS columns ile 2. sütunun tepesi listenin ortasıydı → geç LCP).
          Dikey görseller 2 satır, yataylar 1 satır kaplar; dense akış boşlukları doldurur. */}
      <ul
        className="grid grid-flow-row-dense auto-rows-[9.5rem] grid-cols-2 gap-3 md:auto-rows-[11rem] md:grid-cols-3 md:gap-4 lg:grid-cols-4"
        aria-label={etiket}
      >
        {ogeler.map((o, i) => (
          <li key={o.tur === "gorsel" ? o.kucuk : o.src} className={o.h / o.w > 0.9 ? "row-span-2" : "row-span-1"}>
            <button
              type="button"
              onClick={() => ac(i)}
              className="group relative block size-full overflow-hidden rounded-card bg-straw/20"
              aria-label={o.tur === "gorsel" ? `Büyüt: ${o.alt}` : `Videoyu oynat: ${o.baslik}`}
            >
              {o.tur === "gorsel" && o.optimize ? (
                <Image
                  src={o.kucuk}
                  alt=""
                  width={o.w}
                  height={o.h}
                  sizes={IZGARA_SIZES}
                  className={GORSEL_SINIF}
                />
              ) : (
                // Hazır küçük sürümler (Vercel görsel dönüştürme kotası harcanmaz); ilk görseller hemen yüklenir
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={o.tur === "gorsel" ? o.kucuk : posterKucuk(o.poster)}
                  srcSet={o.tur === "gorsel" ? `${miniYol(o.kucuk)} 360w, ${o.kucuk} 640w` : `${posterMini(o.poster)} 360w, ${posterKucuk(o.poster)} 640w`}
                  sizes={IZGARA_SIZES}
                  alt=""
                  width={o.w}
                  height={o.h}
                  loading={i < oncelikli ? "eager" : "lazy"}
                  fetchPriority={i < Math.min(oncelikli, 2) ? "high" : undefined}
                  decoding="async"
                  className={GORSEL_SINIF}
                />
              )}
              {o.tur === "video" ? (
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="flex size-14 items-center justify-center rounded-full bg-white/90 text-indigo">
                    <Play aria-hidden className="ml-1 size-6 fill-current" />
                  </span>
                </span>
              ) : null}
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-label="Galeri görüntüleyici"
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-ink/95 p-0 text-white backdrop:bg-ink/80"
        onClick={(e) => {
          if (e.target === e.currentTarget) kapat();
        }}
      >
        {aktif ? (
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between px-4 py-3">
              <p className="text-sm text-white/80" aria-live="polite">
                {(acikIndex ?? 0) + 1} / {ogeler.length}
              </p>
              <button type="button" onClick={kapat} className="inline-flex size-11 items-center justify-center rounded-full hover:bg-white/10" autoFocus>
                <X aria-hidden className="size-7" strokeWidth={1.5} />
                <span className="sr-only">Kapat (Esc)</span>
              </button>
            </div>
            <figure className="flex min-h-0 flex-1 flex-col items-center justify-center px-2 pb-4 md:px-20">
              {aktif.tur === "gorsel" ? (
                // eslint-disable-next-line @next/next/no-img-element -- hazır 1600px WebP; dönüştürme kotası harcanmasın
                <img src={aktif.buyuk} alt={aktif.alt} className="max-h-full max-w-full object-contain" />
              ) : (
                <video key={aktif.src} src={aktif.src} poster={aktif.poster} controls autoPlay playsInline className="max-h-full max-w-full" />
              )}
              <figcaption className="mt-3 max-w-prose text-center text-sm text-white/85">
                {aktif.tur === "gorsel" ? aktif.alt : aktif.baslik}
              </figcaption>
            </figure>
            <button
              type="button"
              onClick={() => git(-1)}
              className="absolute left-2 top-1/2 inline-flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-ink/40 hover:bg-white/15"
            >
              <ChevronLeft aria-hidden className="size-7" strokeWidth={1.5} />
              <span className="sr-only">Önceki (sol ok)</span>
            </button>
            <button
              type="button"
              onClick={() => git(1)}
              className="absolute right-2 top-1/2 inline-flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-ink/40 hover:bg-white/15"
            >
              <ChevronRight aria-hidden className="size-7" strokeWidth={1.5} />
              <span className="sr-only">Sonraki (sağ ok)</span>
            </button>
          </div>
        ) : null}
      </dialog>
    </>
  );
}
