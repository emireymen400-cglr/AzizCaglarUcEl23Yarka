import type { Metadata } from "next";
import { CtaBolumu } from "@/components/CtaBolumu";
import { Tuy } from "@/components/illustrations";
import { IletisimAraclari } from "@/components/layout/IletisimAraclari";
import { Blob } from "@/components/ui/Blob";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Sayfa bulunamadı",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <section className="relative overflow-hidden py-20 md:py-32">
        <Blob renk="yolk" sekil={2} dondur={20} className="absolute -right-24 -top-24 w-80 md:w-[28rem]" />
        <Container className="relative grid items-center gap-10 md:grid-cols-[1fr_auto]">
          <div>
            <p className="font-tracked text-[12px] text-ink/70">Hata 404</p>
            <h1 className="mt-3 max-w-[14ch] text-h1">Aradığınız sayfa bulunamadı</h1>
            <p className="mt-2 font-script text-script text-indigo">Bir tüy kadar hafif uçup gitmiş olmalı</p>
            <p className="mt-6 max-w-prose">Sayfa taşınmış ya da kaldırılmış olabilir. Tavuklarımıza göz atabilir ya da ana sayfaya dönebilirsiniz.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/tavuklarimiz">Tavuklarımız</Button>
              <Button href="/" tur="secondary">
                Ana Sayfa
              </Button>
            </div>
          </div>
          <Tuy className="mx-auto w-24 rotate-12 text-indigo md:w-32" />
        </Container>
      </section>
      <CtaBolumu />
      <IletisimAraclari />
    </>
  );
}
