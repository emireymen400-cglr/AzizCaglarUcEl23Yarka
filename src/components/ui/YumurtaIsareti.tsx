import { yumurtaYolu } from "@/components/illustrations";
import { cn } from "@/lib/cn";

/** Yumurta rengi metnini palette içi bir tona çevirir (yeni renk eklemeden). */
export function yumurtaTonu(renk: string): string {
  const r = renk.toLocaleLowerCase("tr-TR");
  if (r.startsWith("beyaz")) return "fill-white";
  if (r.includes("krem") || r.includes("bej") || r.includes("açık")) return "fill-straw";
  return "fill-orange-text";
}

/** Küçük dolu yumurta: kartlarda yumurta rengini görsel olarak gösterir. */
export function YumurtaIsareti({ renk, className }: { renk: string; className?: string }) {
  return (
    <svg viewBox="0 0 60 80" aria-hidden focusable="false" className={cn("h-3.5 w-auto shrink-0", className)}>
      <path d={yumurtaYolu} className={yumurtaTonu(renk)} stroke="currentColor" strokeOpacity={0.45} strokeWidth={5} />
    </svg>
  );
}
