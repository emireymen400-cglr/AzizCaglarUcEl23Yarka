import { JsonLd } from "@/components/JsonLd";
import type { Soru } from "@/content/sss";
import { cn } from "@/lib/cn";
import { sssSchema } from "@/lib/schema";

type Props = {
  sorular: Soru[];
  /** FAQPage JSON-LD bas (sadece SSS sayfasında; tekrar eden şema olmasın) */
  schema?: boolean;
  /** Koyu zeminde renkleri çevir */
  className?: string;
};

/** Native <details>/<summary>; JS'siz ve erişilebilir (DESIGN.md §6). */
export function FaqAccordion({ sorular, schema, className }: Props) {
  return (
    <>
      <div className={cn("border-t border-ink", className)}>
        {sorular.map((s) => (
          <details key={s.id} id={s.id} className="group border-b border-ink">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-[17px] font-semibold leading-snug text-indigo md:text-lg [&::-webkit-details-marker]:hidden">
              <span>{s.soru}</span>
              {/* Artı işareti; açılınca çarpıya döner. Çizim diliyle aynı ince kontur. */}
              <svg
                viewBox="0 0 20 20"
                aria-hidden
                className="mt-1 size-5 shrink-0 stroke-indigo transition-transform duration-200 group-open:rotate-45 motion-reduce:transition-none"
                fill="none"
                strokeWidth={1.5}
                strokeLinecap="round"
              >
                <path d="M10 3v14M3 10h14" />
              </svg>
            </summary>
            <p className="max-w-prose pb-6 pr-10 text-base leading-relaxed text-ink">{s.cevap}</p>
          </details>
        ))}
      </div>
      {schema ? <JsonLd veri={sssSchema(sorular)} /> : null}
    </>
  );
}
