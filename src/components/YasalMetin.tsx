import type { ReactNode } from "react";

/** KVKK / çerez gibi uzun metinler için okunaklı tipografi (max ~70 karakter satır). */
export function YasalMetin({ children, guncelleme }: { children: ReactNode; guncelleme: string }) {
  return (
    <div className="max-w-prose space-y-4 text-[16.5px] leading-relaxed [&_a]:text-indigo [&_a]:underline [&_a]:underline-offset-2 [&_h2]:mt-10 [&_h2]:font-body [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:normal-case [&_h2]:tracking-normal [&_li]:ml-5 [&_li]:list-disc [&_li]:pl-1 [&_ul]:space-y-2">
      <p className="text-sm text-ink/70">Son güncelleme: {guncelleme}</p>
      {children}
    </div>
  );
}
