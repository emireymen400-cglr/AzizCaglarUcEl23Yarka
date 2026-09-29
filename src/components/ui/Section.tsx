import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container } from "./Container";

export type Zemin = "krem" | "beyaz" | "turuncu" | "lacivert";

export const zeminSinifi: Record<Zemin, string> = {
  krem: "bg-cream text-ink",
  beyaz: "bg-white text-ink",
  turuncu: "bg-orange text-white",
  lacivert: "bg-indigo text-white",
};

type Props = {
  children: ReactNode;
  zemin?: Zemin;
  id?: string;
  className?: string;
  /** İçeriği Container'a sarmadan ver (tam genişlik şeritler için) */
  tamGenislik?: boolean;
  "aria-labelledby"?: string;
};

/** Bölüm arası: mobil 64px, masaüstü 96px (DESIGN.md §3) */
export function Section({ children, zemin = "krem", id, className, tamGenislik, ...aria }: Props) {
  return (
    <section id={id} className={cn("relative py-16 md:py-24", zeminSinifi[zemin], className)} {...aria}>
      {tamGenislik ? children : <Container>{children}</Container>}
    </section>
  );
}
