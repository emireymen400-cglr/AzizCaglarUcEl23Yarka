import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, type Kirinti } from "@/lib/schema";

/** Görünür yol + BreadcrumbList JSON-LD. Son öğe mevcut sayfadır. */
export function Breadcrumbs({ adimlar }: { adimlar: Kirinti[] }) {
  const tum = [{ ad: "Ana Sayfa", yol: "/" }, ...adimlar];
  return (
    <>
      <nav aria-label="Sayfa yolu" className="text-sm">
        <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-ink/70">
          {tum.map((a, i) => {
            const son = i === tum.length - 1;
            return (
              <li key={a.yol} className="inline-flex items-center gap-1.5">
                {i > 0 ? <ChevronRight aria-hidden className="size-3.5 text-ink/40" /> : null}
                {son ? (
                  <span aria-current="page" className="text-ink">
                    {a.ad}
                  </span>
                ) : (
                  <Link href={a.yol} className="text-indigo underline-offset-4 hover:underline">
                    {a.ad}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd veri={breadcrumbSchema(adimlar)} />
    </>
  );
}
