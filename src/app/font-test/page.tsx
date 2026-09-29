// GEÇİCİ: Font ve Türkçe karakter testi (CLAUDE.md §10). Yayından önce silinecek.

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Font testi",
  robots: { index: false, follow: false },
};

const TEST = "ĞÜŞİÖÇ ğüşıöç İSTANBUL ıi";

const satirlar = [
  { ad: "Bebas Neue 400 (display)", sinif: "font-display text-h1 tracking-[0.04em] text-indigo" },
  { ad: "Jost 500 (etiket, tracked)", sinif: "font-tracked text-label" },
  { ad: "Inter 400 (gövde)", sinif: "font-body" },
  { ad: "Inter 600 (gövde kalın)", sinif: "font-body font-semibold" },
  { ad: "Caveat 500 (el yazısı)", sinif: "font-script text-script text-indigo" },
];

export default function FontTest() {
  return (
    <main className="mx-auto max-w-[1200px] px-5 py-16">
      <h1 className="text-h1">Font testi</h1>
      <ul className="mt-10 divide-y divide-ink/15">
        {satirlar.map((s) => (
          <li key={s.ad} className="py-6">
            <p className="text-sm text-ink/60">{s.ad}</p>
            <p className={s.sinif}>{TEST}</p>
          </li>
        ))}
        <li className="py-6">
          <p className="text-sm text-ink/60">CSS text-transform: uppercase + lang=&quot;tr&quot; (&quot;tavuklarımız · iletişim · ılık&quot; → İ/I doğru olmalı)</p>
          <p className="font-tracked text-label">tavuklarımız · iletişim · ılık</p>
          <p className="font-display text-h2 uppercase text-indigo">tavuklarımız · iletişim · ılık</p>
        </li>
        <li className="py-6">
          <p className="text-sm text-ink/60">JS: toLocaleUpperCase(&quot;tr-TR&quot;)</p>
          <p className="font-body">{"tavuklarımız · iletişim".toLocaleUpperCase("tr-TR")}</p>
        </li>
      </ul>
    </main>
  );
}
