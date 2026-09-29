import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { YumurtaIsareti } from "./YumurtaIsareti";

type Props = {
  children: ReactNode;
  /** bilgi: beyaz/çerçeveli · guven: mera yeşili zemin ("aşılı" gibi) */
  tur?: "bilgi" | "guven";
  /** Verilirse başa yumurtanın gerçek tonunda küçük yumurta işareti eklenir */
  yumurtaRengi?: string;
  className?: string;
};

export function Badge({ children, tur = "bilgi", yumurtaRengi, className }: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-tag px-3 py-1.5 font-label text-[11.5px] font-medium uppercase leading-none tracking-[0.12em] text-ink",
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
