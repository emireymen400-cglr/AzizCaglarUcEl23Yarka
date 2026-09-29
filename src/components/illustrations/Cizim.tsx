import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type CizimProps = {
  className?: string;
  /** Verilirse çizim anlamlı kabul edilir ve ekran okuyucuya okunur; yoksa aria-hidden. */
  baslik?: string;
  /** Hero'daki "kendini çizme" animasyonu (DESIGN.md §8). prefers-reduced-motion'da kapalı. */
  ciz?: boolean;
};

type Props = CizimProps & { viewBox: string; children: ReactNode };

/** Tüm çizgi illüstrasyonların ortak kabı: sadece kontur, stroke 1.25, currentColor. */
export function Cizim({ viewBox, className, baslik, ciz, children }: Props) {
  return (
    <svg
      viewBox={viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("cizim overflow-visible", ciz && "cizim-animasyon", className)}
      role={baslik ? "img" : undefined}
      aria-hidden={baslik ? undefined : true}
      aria-label={baslik}
      focusable="false"
    >
      {children}
    </svg>
  );
}
