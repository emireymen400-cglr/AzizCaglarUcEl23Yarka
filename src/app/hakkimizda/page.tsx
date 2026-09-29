import { CtaBolumu } from "@/components/CtaBolumu";
import { GaleriIzgarasi, type GaleriOgesi } from "@/components/GaleriIzgarasi";
import { TavukSiluet } from "@/components/illustrations";
import { IletisimAraclari } from "@/components/layout/IletisimAraclari";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/ui/Section";
import { VideoKutusu } from "@/components/VideoKutusu";
import { ciftlikGorselleri, videolar } from "@/content/galeri";
import { site } from "@/content/site";
import { sayfaMeta } from "@/lib/metadata";
import { mesajlar } from "@/lib/whatsapp";

// TODO(kullanıcı): Kuruluş yılı, deneyim, sürü kapasitesi ve Aziz Çağlar fotoğrafı gelince
// "Hikâyemiz" bölümü eklenecek (EKSIKLER.md). Şimdilik yalnızca bilinen bilgiler var.

export const metadata = sayfaMeta({
  baslik: "Hakkımızda: Üçel 23 Tavukçuluk",
  aciklama: "Aziz Çağlar'ın Konya Karatay'daki çiftliğinde yumurtacı yarka yetiştiriyor, Türkiye'nin tüm il ve ilçelerine kendi aracımızla ulaştırıyoruz.",
  yol: "/hakkimizda",
});

const ilkeler = [
  {
    baslik: "Sağlık önce gelir",
    metin: "Yarkalarımızın aşıları yapılır; teslimattan önce sürünün sağlık durumu kontrol edilir. Belgeleri isteyebilirsiniz.",
  },
  {
    baslik: "Teslimatı kendimiz yaparız",
    metin: "Yarkaları kendi araçlarımızla, sepetler içinde taşırız. Yolda yaşanan kayıplar bize aittir.",
  },
  {
    baslik: "Satıştan sonra da buradayız",
    metin: "Bakım, besleme ve yetiştiricilik konusunda sorularınızı teslimattan sonra da yanıtlarız.",
  },
  {
    baslik: "Kapımız açık",
    metin: "Yarkaları görerek almak isterseniz çiftliğimize gelebilirsiniz; gelmeden önce aramanız yeterli.",
  },
];

export default function Hakkimizda() {
  const fotograflar: GaleriOgesi[] = ciftlikGorselleri
    .filter((g) => !g.src.includes("kumes-binasi"))
    .slice(0, 8)
    .map((g) => ({ tur: "gorsel", kucuk: g.src.replace(/\/([^/]+)$/, "/kucuk/$1"), buyuk: g.src, alt: g.alt, w: g.w, h: g.h }));
  const video = videolar.find((v) => v.ad === "ciftlik-beyaz-yarkalar-02")!;

  return (
    <>
      <PageHeader
        baslik="Hakkımızda"
        script="Sözümüz senettir"
        kirintilar={[{ ad: "Hakkımızda", yol: "/hakkimizda" }]}
        leke="pasture"
        cizim={<TavukSiluet />}
        giris={
          <p>
            {site.ad}, {site.sahip}&apos;ın {site.adres.ilce} / {site.adres.il}&apos;daki çiftliğinde yumurtacı yarka
            yetiştirip Türkiye&apos;nin tüm il ve ilçelerine ulaştırıyor. Amacımız, kümesinize sağlıklı ve verimli yarkaların
            güvenle ulaşması.
          </p>
        }
      />

      <Section className="pt-4 md:pt-6" aria-labelledby="ilkeler">
        <h2 id="ilkeler" className="text-h2">
          Nasıl çalışıyoruz?
        </h2>
        <ul className="mt-8 grid gap-x-10 gap-y-6 sm:grid-cols-2">
          {ilkeler.map((i) => (
            <li key={i.baslik} className="border-t border-ink pt-4">
              <h3 className="font-body text-lg font-semibold normal-case tracking-normal text-indigo">{i.baslik}</h3>
              <p className="mt-1.5">{i.metin}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section zemin="beyaz" aria-labelledby="ciftligimiz">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <h2 id="ciftligimiz" className="text-h2">
              Çiftliğimiz
            </h2>
            <p className="mt-4 max-w-prose">Kümeslerimizden gerçek kareler. Daha fazlası galeride.</p>
            <div className="mt-8 max-w-xs">
              <VideoKutusu video={video} />
            </div>
          </div>
          <GaleriIzgarasi etiket="Çiftliğimizden fotoğraflar" ogeler={fotograflar} />
        </div>
      </Section>

      <CtaBolumu ustZemin="beyaz" baslik="Çiftliğimizi görmek ister misiniz?" metin="Gelmeden önce arayın ya da yazın; uygun zamanı birlikte planlayalım." mesaj={mesajlar.ziyaret} />
      <IletisimAraclari mesaj={mesajlar.hakkimizda} />
    </>
  );
}
