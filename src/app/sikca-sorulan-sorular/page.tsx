import { CtaBolumu } from "@/components/CtaBolumu";
import { FaqAccordion } from "@/components/FaqAccordion";
import { YuvadaYumurtalar } from "@/components/illustrations";
import { JsonLd } from "@/components/JsonLd";
import { IletisimAraclari } from "@/components/layout/IletisimAraclari";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/ui/Section";
import { kategoriler, sorular } from "@/content/sss";
import { sayfaMeta } from "@/lib/metadata";
import { sssSchema } from "@/lib/schema";
import { mesajlar } from "@/lib/whatsapp";

export const metadata = sayfaMeta({
  baslik: "Sıkça Sorulan Sorular",
  aciklama: "Yarka türleri, sipariş, fiyat, teslimat, aşı ve bakım hakkında en çok sorulan soruların cevapları. Bulamadığınızı WhatsApp'tan sorun.",
  yol: "/sikca-sorulan-sorular",
});

export default function Sss() {
  const dolu = kategoriler.filter((k) => sorular.some((s) => s.kategori === k.id));

  return (
    <>
      <PageHeader
        baslik="Sıkça sorulan sorular"
        kirintilar={[{ ad: "Sıkça Sorulan Sorular", yol: "/sikca-sorulan-sorular" }]}
        leke="yolk"
        cizim={<YuvadaYumurtalar />}
        giris={<p>Yarka çeşitleri, sipariş, teslimat ve yetiştiricilik hakkında en sık sorulan soruların cevapları.</p>}
      />

      <Section className="pt-0 md:pt-0" aria-label="Sorular">
        <nav aria-label="Soru kategorileri" className="mb-12">
          <ul className="flex flex-wrap gap-2">
            {dolu.map((k) => (
              <li key={k.id}>
                <a
                  href={`#${k.id}`}
                  className="inline-flex min-h-11 items-center rounded-tag border border-ink/25 bg-white px-4 font-label text-[12px] font-medium uppercase tracking-[0.12em] text-indigo hover:border-indigo"
                >
                  {k.ad}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="space-y-16">
          {dolu.map((k) => (
            <section key={k.id} id={k.id} aria-labelledby={`${k.id}-baslik`} className="grid scroll-mt-28 gap-6 lg:grid-cols-[1fr_2fr] lg:gap-10">
              <h2 id={`${k.id}-baslik`} className="text-h2">
                {k.ad}
              </h2>
              <FaqAccordion sorular={sorular.filter((s) => s.kategori === k.id)} />
            </section>
          ))}
        </div>
      </Section>

      <CtaBolumu baslik="Sorunuzun cevabını bulamadınız mı?" metin="Bize doğrudan yazın ya da arayın; hemen yanıtlayalım." mesaj={mesajlar.sss} />
      <IletisimAraclari mesaj={mesajlar.sss} />
      <JsonLd veri={sssSchema(sorular)} />
    </>
  );
}
