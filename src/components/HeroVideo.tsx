"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Props = { src: string; poster: string; posterW: number; posterH: number; className?: string };

/**
 * Hero'daki kısa, sessiz, döngülü video.
 * - LCP öğesi responsive poster görselidir (next/image, preload + fetchPriority=high); video sayfa yüklendikten
 *   ve tarayıcı boşa çıktıktan sonra indirilir, bant genişliği için posterle yarışmaz.
 * - prefers-reduced-motion veya veri tasarrufu açıksa video hiç yüklenmez (DESIGN.md §8).
 */
export function HeroVideo({ src, poster, posterW, posterH, className }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [oynuyor, setOynuyor] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const tasarruf = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    let iptal = false;

    const baslat = () => {
      if (iptal || mq.matches || tasarruf) return;
      if (!v.src) v.src = src;
      v.play().catch(() => {});
    };
    const bekle = () => ("requestIdleCallback" in window ? window.requestIdleCallback(baslat, { timeout: 2500 }) : setTimeout(baslat, 1200));

    if (document.readyState === "complete") bekle();
    else window.addEventListener("load", bekle, { once: true });

    const degisti = () => (mq.matches ? v.pause() : baslat());
    mq.addEventListener("change", degisti);
    return () => {
      iptal = true;
      window.removeEventListener("load", bekle);
      mq.removeEventListener("change", degisti);
    };
  }, [src]);

  return (
    <div className={`relative ${className ?? ""}`}>
      <Image
        src={poster}
        alt=""
        width={posterW}
        height={posterH}
        preload
        fetchPriority="high"
        quality={60}
        sizes="(min-width: 1024px) 520px, 42vw"
        className="absolute inset-0 size-full object-cover"
      />
      <video
        ref={ref}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden
        tabIndex={-1}
        onPlaying={() => setOynuyor(true)}
        className={`absolute inset-0 size-full object-cover transition-opacity duration-700 motion-reduce:transition-none ${oynuyor ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}
