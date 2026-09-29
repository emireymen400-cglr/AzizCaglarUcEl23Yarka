"use client";

import { useEffect, useRef } from "react";

type Props = { src: string; poster: string; className?: string };

/**
 * Hero'daki kısa, sessiz, döngülü video. autoPlay özniteliği yok: sadece
 * prefers-reduced-motion kapalıysa JS ile başlatılır (DESIGN.md §8, CLAUDE.md §9).
 */
export function HeroVideo({ src, poster, className }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const uygula = () => {
      if (mq.matches) v.pause();
      else v.play().catch(() => {});
    };
    uygula();
    mq.addEventListener("change", uygula);
    return () => mq.removeEventListener("change", uygula);
  }, []);

  return (
    <video ref={ref} className={className} poster={poster} muted loop playsInline preload="metadata" aria-hidden tabIndex={-1}>
      <source src={src} type="video/mp4" />
    </video>
  );
}
