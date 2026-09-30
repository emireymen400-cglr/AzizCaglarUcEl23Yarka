import { ArrowUpRight } from "lucide-react";
import { Civciv } from "@/components/illustrations";
import { SosyalIkon } from "@/components/ui/MarkaIkonlari";
import { Section } from "@/components/ui/Section";
import { site } from "@/content/site";

/** Ana sayfanın altında: site.ts içindeki tüm sosyal hesaplar. */
export function SosyalBolum() {
  return (
    <Section aria-labelledby="sosyal-baslik" className="pt-0 md:pt-0">
      <div className="relative">
        <Civciv className="pointer-events-none absolute -top-4 right-0 hidden w-20 -rotate-6 text-indigo md:block" />
        <h2 id="sosyal-baslik" className="text-h2">
          Bizi takip edin
        </h2>
        <p className="mt-3 max-w-prose">Yeni gelen sürüleri ve teslimatlarımızı sosyal medya hesaplarımızdan takip edebilirsiniz.</p>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-3">
          {site.sosyal.map((s) => (
            <li key={s.ad}>
              <a
                href={s.url}
                target="_blank"
                rel="noopener"
                className="group flex min-h-20 items-center gap-4 rounded-card border border-ink/15 bg-white p-5 transition-colors hover:border-indigo"
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-cream text-indigo">
                  <SosyalIkon ad={s.ad} className="size-6" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold text-indigo">{s.ad}</span>
                  <span className="block truncate text-sm text-ink/70">{s.aciklama}</span>
                </span>
                <ArrowUpRight aria-hidden className="size-5 shrink-0 text-indigo/60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none" strokeWidth={1.5} />
                <span className="sr-only">(yeni sekmede açılır)</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
