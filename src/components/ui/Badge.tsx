import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { YumurtaIsareti } from "./YumurtaIsareti";

type Props = {
  children: ReactNode;
  /** bilgi: beyaz/çerçeveli · guven: mera yeşili zemin ("aşılı" gibi) */
  tur?: "bilgi" | "guven";
  /** Verilirse başa yumurtanın gerçek tonunda küçük yumurta işareti eklenir */
  yumurtaRengi?: string;
  /** Mobilde daha küçük (dar kartlar için); md ve üstünde normal boy */
  kompakt?: boolean;
  className?: string;
};

export function Badge({ children, tur = "bilgi", yumurtaRengi, kompakt, className }: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-tag font-label font-medium uppercase leading-none text-ink",
        kompakt
          ? "px-2 py-1 text-[9.5px] tracking-[0.08em] md:px-3 md:py-1.5 md:text-[11.5px] md:tracking-[0.12em]"
          : "px-3 py-1.5 text-[11.5px] tracking-[0.12em]",
        tur === "bilgi" && "border border-ink/20 bg-white",
        tur === "guven" && "bg-pasture",
        className,
      )}
    >
      {yumurtaRengi ? <YumurtaIsareti renk={yumurtaRengi} /> : null}
      {children}
    </span>
  );
}
