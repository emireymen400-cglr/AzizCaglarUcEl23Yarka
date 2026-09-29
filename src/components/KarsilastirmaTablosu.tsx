import Link from "next/link";
import { YumurtaIsareti } from "@/components/ui/YumurtaIsareti";
import type { Tur } from "@/content/tavuklar";
import { fiyatMetni } from "@/lib/fiyat";

type Sutun = { anahtar: keyof Tur; baslik: string };

const sutunlar: Sutun[] = [
  { anahtar: "fiyat", baslik: "Fiyat" },
  { anahtar: "yumurtaRengi", baslik: "Yumurta rengi" },
  { anahtar: "kullanim", baslik: "Kullanım" },
  { anahtar: "yillikVerim", baslik: "Verim" },
  { anahtar: "ilkYumurtaHaftasi", baslik: "İlk yumurta" },
  { anahtar: "iklim", baslik: "İklim" },
  { anahtar: "satisHaftalari", baslik: "Satış haftaları" },
  { anahtar: "sistem", baslik: "Yetiştirme" },
];

// Telefonda tablo ekrana sığsın diye: kullanım hemen her türde "Yumurtacı" ve kartlarda zaten yazıyor
const mobildeGizli = (s: Sutun) => (s.anahtar === "kullanim" ? "hidden md:table-cell" : "");

/**
 * Türler satırda. Hiçbir türde verisi olmayan sütun hiç gösterilmez;
 * bazı türlerde olmayan hücre "—" (DESIGN.md §6).
 * Mobilde yatay kaydırma yerine küçük yazıyla ekrana sığar; isteyen yakınlaştırır.
 */
export function KarsilastirmaTablosu({ turler }: { turler: Tur[] }) {
  const gorunen = sutunlar.filter((s) => turler.some((t) => t[s.anahtar]));
  const kaynakli = turler.filter((t) => t.veriKaynagi);

  return (
    <div>
      <div className="-mx-3 overflow-x-auto px-3 md:mx-0 md:px-0" role="region" aria-label="Tür karşılaştırma tablosu" tabIndex={0}>
        <table className="w-full border-collapse text-left text-[9px] leading-snug break-words md:min-w-[760px] md:text-[15px] md:leading-normal">
          <caption className="sr-only">Yarka türlerinin karşılaştırması</caption>
          <thead>
            <tr className="border-b-2 border-ink">
              <th scope="col" className="py-2 pr-1 align-bottom font-label text-[8px] font-medium uppercase tracking-[0.04em] md:py-3 md:pr-4 md:text-[12px] md:tracking-[0.12em]">
                Tür
              </th>
              {gorunen.map((s) => (
                <th key={s.anahtar} scope="col" className={`${mobildeGizli(s)} py-2 pr-1 align-bottom font-label text-[8px] font-medium uppercase tracking-[0.04em] md:py-3 md:pr-4 md:text-[12px] md:tracking-[0.12em]`}>
                  {s.baslik}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {turler.map((t) => (
              <tr key={t.slug} className="border-b border-ink/20 align-top">
                <th scope="row" className="py-2 pr-1 font-semibold md:py-4 md:pr-4">
                  <Link href={`/tavuklarimiz/${t.slug}`} className="text-indigo underline-offset-4 hover:underline">
                    {t.ad}
                  </Link>
                </th>
                {gorunen.map((s) => {
                  const deger = s.anahtar === "fiyat" ? (t.fiyat ? fiyatMetni(t.fiyat) : undefined) : (t[s.anahtar] as string | undefined);
                  return (
                    <td key={s.anahtar} className={`${mobildeGizli(s)} py-2 pr-1 md:py-4 md:pr-4`}>
                      {deger ? (
                        <span className="inline-flex items-start gap-1 md:gap-2">
                          {s.anahtar === "yumurtaRengi" ? <YumurtaIsareti renk={deger} className="mt-0.5 hidden sm:block md:mt-1" /> : null}
                          {deger}
                          {t.veriKaynagi && (s.anahtar === "yillikVerim" || s.anahtar === "ilkYumurtaHaftasi") ? <sup>*</sup> : null}
                        </span>
                      ) : (
                        <span className="text-ink/50" aria-label="Bilgi yok">
                          —
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {kaynakli.map((t) => (
        <p key={t.slug} className="mt-4 text-sm text-ink/75">
          * {t.ad}: {t.veriKaynagi!.ad}. Değerler uygun bakım ve besleme koşullarındaki üretici hedefleridir.
        </p>
      ))}
    </div>
  );
}
