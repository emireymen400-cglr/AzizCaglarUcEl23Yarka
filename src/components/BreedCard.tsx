import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Blob } from "@/components/ui/Blob";
import { gorselBoyutlari } from "@/content/media.generated";
import type { Tur } from "@/content/tavuklar";
import { cn } from "@/lib/cn";

type Props = {
  tur: Tur;
  /** Başlık seviyesi: liste sayfasında h2, ana sayfa şeridinde h3 */
  baslikSeviyesi?: "h2" | "h3";
  /** Blob şekli (kart dizisinde çeşitlilik için) */
  sira?: number;
  className?: string;
  sizes?: string;
};

/** Beyaz, 8px köşe, asimetrik gölge; fotoğrafın arkasından türe özel renk lekesi taşar. */
export function BreedCard({ tur, baslikSeviyesi: H = "h3", sira = 0, className, sizes }: Props) {
  const kapak = tur.gorseller[0];
  const b = gorselBoyutlari[kapak.src];
  // Rozetler: sadece veride olanlar (en fazla 3). Uzun verim metni kartları eşitsiz
  // yaptığı için kartta değil, detay sayfası ve karşılaştırma tablosunda gösterilir.
  const rozetler = [
    { metin: `${tur.yumurtaRengi} yumurta`, yumurta: true },
    tur.satisHaftalari ? { metin: tur.satisHaftalari, yumurta: false } : null,
    { metin: tur.kullanim, yumurta: false },
  ]
    .filter((r): r is { metin: string; yumurta: boolean } => r !== null)
    .slice(0, 3);

  return (
    <article className={cn("group relative h-full", className)}>
      <Blob
        renk={tur.accent}
        sekil={(sira % 3) as 0 | 1 | 2}
        dondur={sira * 37}
        className="absolute -right-6 -top-6 z-0 w-2/3"
      />
      <div className="relative z-10 flex h-full flex-col overflow-hidden rounded-card bg-white shadow-card transition-shadow duration-200 group-hover:shadow-[-18px_14px_56px_0_rgba(0,0,0,0.2)]">
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            src={kapak.src}
            alt={kapak.alt}
            width={b.w}
            height={b.h}
            sizes={sizes ?? "(min-width: 1024px) 280px, (min-width: 640px) 45vw, 80vw"}
            className="size-full object-cover"
          />
        </div>
        <div className="flex flex-1 flex-col gap-4 p-5">
          <H className="text-[32px] leading-none">
            {/* Kartın tamamı tıklanabilir: bağlantı alanı ::after ile kartı kaplar */}
            <Link
              href={`/tavuklarimiz/${tur.slug}`}
              className="after:absolute after:inset-0 after:z-20 after:rounded-card focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-3 focus-visible:after:outline-orange"
            >
              {tur.ad}
            </Link>
          </H>
          <ul className="flex flex-wrap gap-2">
            {rozetler.map((r) => (
              <li key={r.metin}>
                <Badge yumurtaRengi={r.yumurta ? tur.yumurtaRengi : undefined}>{r.metin}</Badge>
              </li>
            ))}
          </ul>
          <span className="mt-auto inline-flex items-center gap-2 font-label text-[13px] font-medium uppercase tracking-[0.12em] text-indigo">
            İncele
            <ArrowRight aria-hidden className="size-4 text-orange transition-transform group-hover:translate-x-1 motion-reduce:transition-none" strokeWidth={1.75} />
          </span>
        </div>
      </div>
    </article>
  );
}
