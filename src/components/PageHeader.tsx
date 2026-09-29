import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Blob, type BlobRenk } from "@/components/ui/Blob";
import { Container } from "@/components/ui/Container";
import type { Kirinti } from "@/lib/schema";

type Props = {
  baslik: string;
  /** El yazısı alt başlık (sayfa başına en fazla 1–2 kez) */
  script?: string;
  giris?: ReactNode;
  kirintilar: Kirinti[];
  leke?: BlobRenk;
  /** Sağ üstte kenardan taşan çizim */
  cizim?: ReactNode;
};

/** Alt sayfaların başı: kırıntı, tek h1, isteğe bağlı script ve giriş. */
export function PageHeader({ baslik, script, giris, kirintilar, leke = "yolk", cizim }: Props) {
  return (
    <div className="relative overflow-hidden pb-10 pt-6 md:pb-16 md:pt-10">
      <Blob renk={leke} sekil={1} dondur={-12} className="absolute -right-36 -top-36 w-64 opacity-90 md:-right-10 md:-top-28 md:w-96" />
      {cizim ? (
        <div className="pointer-events-none absolute right-2 top-16 hidden w-28 rotate-6 text-indigo md:block lg:right-16 lg:w-36">{cizim}</div>
      ) : null}
      <Container className="relative">
        <Breadcrumbs adimlar={kirintilar} />
        <h1 className="mt-6 max-w-[16ch] text-h1">{baslik}</h1>
        {script ? <p className="mt-2 font-script text-script text-indigo">{script}</p> : null}
        {giris ? <div className="mt-4 max-w-prose leading-relaxed md:mt-5 md:text-[17px]">{giris}</div> : null}
      </Container>
    </div>
  );
}
