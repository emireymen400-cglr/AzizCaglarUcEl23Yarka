"use client";

import { Menu, Phone, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { WhatsAppIkon } from "@/components/ui/MarkaIkonlari";
import { anaMenu } from "@/content/navigasyon";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { birincilTelefon, mesajlar, olaylar, telLinki, whatsappLinki } from "@/lib/whatsapp";

export function Header() {
  const yol = usePathname();
  const [kaydi, setKaydi] = useState(false);
  const [acik, setAcik] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const dugmeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const f = () => setKaydi(window.scrollY > 8);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);

  // Sayfa değişince menüyü kapat (render sırasında durum ayarı; effect gerekmez)
  const [oncekiYol, setOncekiYol] = useState(yol);
  if (yol !== oncekiYol) {
    setOncekiYol(yol);
    setAcik(false);
  }

  // Menü açıkken: sayfa kaydırması kilitli, ESC kapatır, odak menü içinde kalır
  useEffect(() => {
    if (!acik) return;
    const dugme = dugmeRef.current;
    document.body.style.overflow = "hidden";
    const odaklanabilir = () =>
      Array.from(menuRef.current?.querySelectorAll<HTMLElement>("a, button") ?? []);
    odaklanabilir()[0]?.focus();
    const tus = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAcik(false);
      if (e.key === "Tab") {
        const el = odaklanabilir();
        const ilk = el[0];
        const son = el[el.length - 1];
        if (e.shiftKey && document.activeElement === ilk) {
          e.preventDefault();
          son?.focus();
        } else if (!e.shiftKey && document.activeElement === son) {
          e.preventDefault();
          ilk?.focus();
        }
      }
    };
    document.addEventListener("keydown", tus);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", tus);
      dugme?.focus();
    };
  }, [acik]);

  const aktif = (hedef: string) => yol === hedef || (hedef !== "/" && yol.startsWith(`${hedef}/`));

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition-colors",
        kaydi ? "border-ink/15 bg-white" : "border-transparent bg-cream",
      )}
    >
      <a
        href="#icerik"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-tag focus:bg-white focus:px-4 focus:py-2 focus:text-indigo"
      >
        İçeriğe geç
      </a>
      <div className="mx-auto flex h-18 max-w-[1200px] items-center justify-between gap-4 px-5 md:h-20 md:px-8">
        <Link href="/" className="shrink-0" aria-label={`${site.ad} – Ana sayfa`}>
          <Image src="/logo.png" alt="" width={842} height={737} loading="eager" sizes="70px" className="h-13 w-auto md:h-15" />
        </Link>

        <nav aria-label="Ana menü" className="hidden lg:block">
          <ul className="flex items-center gap-5 xl:gap-7">
            {anaMenu.map((m) => (
              <li key={m.yol}>
                <Link
                  href={m.yol}
                  aria-current={aktif(m.yol) ? "page" : undefined}
                  className={cn(
                    "font-tracked py-2 text-[13px] text-indigo underline-offset-8 hover:underline",
                    aktif(m.yol) && "underline decoration-orange decoration-2",
                  )}
                >
                  {m.ad}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 md:gap-5">
          <a
            href={telLinki()}
            data-olay={olaylar.telefon}
            className="hidden items-center gap-2 font-semibold text-indigo tabular-nums hover:underline xl:inline-flex"
          >
            <Phone aria-hidden className="size-4" strokeWidth={1.75} />
            {birincilTelefon.gorunen}
          </a>
          <a
            href={whatsappLinki(mesajlar.genel)}
            target="_blank"
            rel="noopener"
            data-olay={olaylar.whatsapp}
            className="hidden min-h-11 items-center gap-2 rounded-button bg-indigo px-6 font-label text-[12.5px] font-medium uppercase tracking-[0.12em] text-white hover:bg-indigo-dark md:inline-flex"
          >
            <WhatsAppIkon className="size-4" />
            Sipariş Ver
          </a>
          <button
            ref={dugmeRef}
            type="button"
            onClick={() => setAcik(true)}
            aria-expanded={acik}
            aria-controls="mobil-menu"
            className="inline-flex size-11 items-center justify-center rounded-full text-indigo hover:bg-indigo/5 lg:hidden"
          >
            <Menu aria-hidden className="size-6" strokeWidth={1.75} />
            <span className="sr-only">Menüyü aç</span>
          </button>
        </div>
      </div>

      {acik ? (
        <div
          ref={menuRef}
          id="mobil-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menü"
          className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-cream px-5 pb-10 pt-4 lg:hidden"
        >
          <div className="flex items-center justify-between">
            <Image src="/logo.png" alt="" width={842} height={737} sizes="60px" className="h-13 w-auto" />
            <button
              type="button"
              onClick={() => setAcik(false)}
              className="inline-flex size-11 items-center justify-center rounded-full text-indigo hover:bg-indigo/5"
            >
              <X aria-hidden className="size-7" strokeWidth={1.5} />
              <span className="sr-only">Menüyü kapat</span>
            </button>
          </div>
          <nav aria-label="Mobil menü" className="mt-8">
            <ul className="space-y-1">
              {anaMenu.map((m) => (
                <li key={m.yol}>
                  <Link
                    href={m.yol}
                    aria-current={aktif(m.yol) ? "page" : undefined}
                    className="block py-2 font-display text-[44px] uppercase leading-none tracking-[0.04em] text-indigo aria-[current=page]:text-orange-text"
                  >
                    {m.ad}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/hakkimizda" className="block py-2 font-display text-[44px] uppercase leading-none tracking-[0.04em] text-indigo">
                  Hakkımızda
                </Link>
              </li>
            </ul>
          </nav>
          <div className="mt-auto space-y-3 pt-10">
            {site.telefonlar.map((t) => (
              <a
                key={t.e164}
                href={telLinki(t)}
                data-olay={olaylar.telefon}
                className="flex items-center gap-3 text-lg font-semibold text-indigo tabular-nums"
              >
                <Phone aria-hidden className="size-5" strokeWidth={1.75} />
                {t.gorunen}
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
