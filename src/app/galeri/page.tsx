import { CtaBolumu } from "@/components/CtaBolumu";
import { GaleriIzgarasi, type GaleriOgesi } from "@/components/GaleriIzgarasi";
import { Civciv } from "@/components/illustrations";
import { JsonLd } from "@/components/JsonLd";
import { IletisimAraclari } from "@/components/layout/IletisimAraclari";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/ui/Section";
import { ciftlikGorselleri, galeriVideolari, karisikGorseller, type GaleriGorseli, type GaleriVideosu } from "@/content/galeri";
import { sayfaMeta } from "@/lib/metadata";
import { videoSchema } from "@/lib/schema";
import { mesajlar } from "@/lib/whatsapp";

export const metadata = sayfaMeta({
  baslik: "Galeri: Çiftliğimiz ve Yarkalarımız",
  aciklama: "Konya Karatay'daki çiftliğimizden yarka fotoğrafları ve videoları: beyaz, kahverengi ve koyu renkli yarka sürüleri, teslimat aracımız.",
  yol: "/galeri",
});

const kucukYol = (src: string) => src.replace(/\/([^/]+)$/, "/kucuk/$1");

const gorselOgesi = (g: GaleriGorseli): GaleriOgesi => ({ tur: "gorsel", kucuk: kucukYol(g.src), buyuk: g.src, alt: g.alt, w: g.w, h: g.h });
const videoOgesi = (v: GaleriVideosu): GaleriOgesi => ({ tur: "video", src: v.src, poster: v.poster, baslik: v.baslik, w: v.w, h: v.h });

export default function Galeri() {
  const ciftlikVideolari = galeriVideolari.filter((v) => v.ciftlik);
  const digerVideolar = galeriVideolari.filter((v) => !v.ciftlik);

  // Çiftlik: fotoğraf ve videolar karışık dizilir
  const ciftlik: GaleriOgesi[] = [];
  const f = ciftlikGorselleri.map(gorselOgesi);
  const v = ciftlikVideolari.map(videoOgesi);
  for (let i = 0; i < Math.max(f.length, v.length); i++) {
    if (f[i]) ciftlik.push(f[i]);
    if (v[i]) ciftlik.push(v[i]);
  }
  const karisik: GaleriOgesi[] = [...digerVideolar.map(videoOgesi), ...karisikGorseller.map(gorselOgesi)];

  return (
    <>
      <PageHeader
        baslik="Galeri"
        script="Kümesten kareler"
        kirintilar={[{ ad: "Galeri", yol: "/galeri" }]}
        leke="pasture"
        cizim={<Civciv />}
        giris={<p>Çiftliğimizden fotoğraflar ve videolar. Büyütmek için bir görsele dokunun; ok tuşlarıyla gezinebilir, Esc ile kapatabilirsiniz.</p>}
      />

      <Section className="pt-4 md:pt-6" aria-labelledby="ciftlikten">
        <h2 id="ciftlikten" className="text-h2">
          Çiftliğimizden
        </h2>
        <div className="mt-8">
          <GaleriIzgarasi etiket="Çiftliğimizden fotoğraf ve videolar" ogeler={ciftlik} />
        </div>
      </Section>

      <Section zemin="beyaz" aria-labelledby="tavuklar">
        <h2 id="tavuklar" className="text-h2">
          Tavuklar ve yumurtalar
        </h2>
        <div className="mt-8">
          <GaleriIzgarasi etiket="Tavuk ve yumurta fotoğrafları" ogeler={karisik} />
        </div>
      </Section>

      <CtaBolumu ustZemin="beyaz" mesaj={mesajlar.galeri} />
      <IletisimAraclari mesaj={mesajlar.galeri} />
      <JsonLd veri={galeriVideolari.map(videoSchema)} />
    </>
  );
}
