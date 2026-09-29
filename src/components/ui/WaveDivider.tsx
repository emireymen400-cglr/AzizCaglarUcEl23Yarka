import { cn } from "@/lib/cn";
import type { Zemin } from "./Section";

const dolgu: Record<Zemin, string> = {
  krem: "fill-cream",
  beyaz: "fill-white",
  turuncu: "fill-orange",
  lacivert: "fill-indigo",
};
const zemin: Record<Zemin, string> = {
  krem: "bg-cream",
  beyaz: "bg-white",
  turuncu: "bg-orange",
  lacivert: "bg-indigo",
};

type Props = {
  /** Dalganın üstündeki bölümün rengi */
  ust: Zemin;
  /** Dalganın altındaki bölümün rengi (dolgu = alttaki bölüm, DESIGN.md §4) */
  alt: Zemin;
  /** Dalga desenini yatayda çevir */
  ters?: boolean;
  className?: string;
};

/** Bölümler arasında 80–200px organik dalga. */
export function WaveDivider({ ust, alt, ters, className }: Props) {
  return (
    <div className={cn("relative -mb-px", zemin[ust], className)} aria-hidden>
      <svg
        viewBox="0 0 1440 160"
        preserveAspectRatio="none"
        focusable="false"
        className={cn("block h-20 w-full md:h-32", ters && "-scale-x-100")}
      >
        <path
          className={dolgu[alt]}
          d="M0 70 C180 118 360 128 560 92 C760 56 900 14 1100 30 C1260 42 1360 78 1440 96 L1440 160 L0 160 Z"
        />
      </svg>
    </div>
  );
}
