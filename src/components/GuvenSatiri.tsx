import { Fragment } from "react";
import { Yumurta } from "@/components/illustrations";
import { cn } from "@/lib/cn";

// Kaynak: SSS (aşı, veteriner kontrolü), EKSIKLER.md (tüm il ve ilçeler, kendi araçlarımızla)
const maddeler = ["Türkiye geneli kapıya teslim", "Aşılı", "Veteriner kontrollü"];

/** Tik ikonları yerine aralarda küçük yumurta konturu. */
export function GuvenSatiri({ className }: { className?: string }) {
  return (
    <p className={cn("flex flex-wrap items-center gap-x-3 gap-y-2 font-tracked text-[12px] text-indigo", className)}>
      {maddeler.map((m, i) => (
        <Fragment key={m}>
          {i > 0 ? <Yumurta className="h-3.5 w-auto text-orange" /> : null}
          <span>{m}</span>
        </Fragment>
      ))}
    </p>
  );
}
