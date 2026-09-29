import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type ButonTuru = "primary" | "secondary" | "whatsapp" | "acik";

const tur: Record<ButonTuru, string> = {
  // Lacivert dolu; hover %8 koyu
  primary: "bg-indigo text-white hover:bg-indigo-dark border-2 border-indigo hover:border-indigo-dark",
  // Şeffaf, 2px turuncu çerçeve, lacivert metin (erişilebilirlik)
  secondary: "bg-transparent text-indigo border-2 border-orange hover:bg-orange/10",
  // Sadece yüzen buton / mobil çubuk / CTA'da (DESIGN.md §1 istisna)
  whatsapp: "bg-whatsapp text-ink border-2 border-whatsapp hover:bg-whatsapp-dark hover:border-whatsapp-dark",
  // Koyu zeminde ikincil: beyaz çerçeve, beyaz metin
  acik: "bg-transparent text-white border-2 border-white/80 hover:bg-white/10",
};

type Props = {
  href: string;
  children: ReactNode;
  tur?: ButonTuru;
  ikon?: ReactNode;
  /** GA4 olay adı (whatsapp_click / phone_click) */
  olay?: string;
  /** Olay için tür bilgisi */
  olayTur?: string;
  className?: string;
  "aria-label"?: string;
};

const temel =
  "inline-flex min-h-12 items-center justify-center gap-2.5 rounded-button px-8 py-4 md:px-10 md:py-[18px] " +
  "font-label text-[13px] font-medium uppercase tracking-[0.12em] leading-none transition-colors";

export function Button({ href, children, tur: t = "primary", ikon, olay, olayTur, className, ...aria }: Props) {
  const harici = /^(https?:|tel:|mailto:)/.test(href);
  const icerik = (
    <>
      {ikon}
      <span>{children}</span>
      {t === "secondary" || t === "acik" ? <ArrowRight aria-hidden className="size-4 shrink-0" strokeWidth={1.75} /> : null}
    </>
  );
  const sinif = cn(temel, tur[t], className);
  const veri = { "data-olay": olay, "data-tur": olayTur };

  if (harici) {
    const yeniSekme = href.startsWith("http");
    return (
      <a href={href} className={sinif} {...veri} {...aria} {...(yeniSekme ? { target: "_blank", rel: "noopener" } : {})}>
        {icerik}
      </a>
    );
  }
  return (
    <Link href={href} className={sinif} {...veri} {...aria}>
      {icerik}
    </Link>
  );
}
