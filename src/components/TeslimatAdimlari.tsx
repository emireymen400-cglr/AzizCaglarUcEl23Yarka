import { Cit, TavukSiluet, Tuy, Yumurta } from "@/components/illustrations";
import { teslimatAdimlari, type TeslimatAdimi } from "@/content/teslimat";

const cizimler: Record<TeslimatAdimi["illustrasyon"], React.ComponentType<{ className?: string }>> = {
  yumurta: Yumurta,
  tuy: Tuy,
  cit: Cit,
  tavuk: TavukSiluet,
};

/** 4 numaralı adım; aralarında elle çizilmiş kesikli yol (gökyüzü mavisi). */
export function TeslimatAdimlari({ baslikSeviyesi: H = "h3" }: { baslikSeviyesi?: "h2" | "h3" }) {
  return (
    <ol className="relative grid gap-5 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
      {/* masaüstü: adımları birleştiren kesikli yol */}
      <svg
        aria-hidden
        className="pointer-events-none absolute left-[8%] right-[8%] top-10 hidden h-10 w-[84%] text-sky lg:block"
        viewBox="0 0 1000 40"
        preserveAspectRatio="none"
        fill="none"
      >
        <path d="M0 22 C120 4 220 36 340 20 C460 4 560 34 680 18 C800 4 900 30 1000 16" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 8" vectorEffect="non-scaling-stroke" />
      </svg>
      {teslimatAdimlari.map((a) => {
        const C = cizimler[a.illustrasyon];
        return (
          <li key={a.no} className="relative rounded-card bg-white p-6 pt-5">
            <div className="flex items-end justify-between gap-4">
              <span className="font-display text-[56px] leading-none text-orange" aria-hidden>
                {String(a.no).padStart(2, "0")}
              </span>
              <C className="h-14 w-auto text-indigo" />
            </div>
            <H className="mt-4 text-h3">
              <span className="sr-only">{a.no}. adım: </span>
              {a.baslik}
            </H>
            <p className="mt-2 text-[15.5px] leading-relaxed">{a.metin}</p>
          </li>
        );
      })}
    </ol>
  );
}
