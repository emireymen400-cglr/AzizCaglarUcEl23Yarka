"use client";

import { Play } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/cn";

type Props = { src: string; poster: string; baslik: string; w: number; h: number; className?: string };

const kucukPoster = (p: string, klasor: "kucuk" | "mini") => p.replace("/videos/", `/videos/${klasor}/`);

/**
 * Tıklayınca oynayan video. Önce tembel yüklenen küçük bir poster gösterilir; video ve tam boy
 * poster ancak kullanıcı oynatınca indirilir (sayfa hızı + Vercel bant genişliği).
 */
export function VideoOynatici({ src, poster, baslik, w, h, className }: Props) {
  const [acik, setAcik] = useState(false);

  if (acik) {
    return (
      <video className={cn("w-full rounded-card bg-ink", className)} width={w} height={h} controls autoPlay playsInline poster={poster} aria-label={baslik}>
        <source src={src} type="video/mp4" />
      </video>
    );
  }
  return (
    <button
      type="button"
      onClick={() => setAcik(true)}
      className={cn("group relative block w-full overflow-hidden rounded-card bg-ink/10", className)}
      style={{ aspectRatio: `${w} / ${h}` }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- hazır küçük poster sürümleri */}
      <img
        src={kucukPoster(poster, "kucuk")}
        srcSet={`${kucukPoster(poster, "mini")} 360w, ${kucukPoster(poster, "kucuk")} 640w`}
        sizes="(min-width: 1024px) 640px, 100vw"
        alt=""
        width={w}
        height={h}
        loading="lazy"
        decoding="async"
        className="size-full object-cover"
      />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex size-16 items-center justify-center rounded-full bg-white/90 text-indigo transition-transform group-hover:scale-105 motion-reduce:transition-none">
          <Play aria-hidden className="ml-1 size-7 fill-current" />
        </span>
      </span>
      <span className="sr-only">Videoyu oynat: {baslik}</span>
    </button>
  );
}
