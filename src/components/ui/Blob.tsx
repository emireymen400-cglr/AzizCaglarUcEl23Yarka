import { cn } from "@/lib/cn";

export type BlobRenk = "yolk" | "orange" | "pasture" | "sky" | "straw";

const dolgu: Record<BlobRenk, string> = {
  yolk: "fill-yolk",
  orange: "fill-orange",
  pasture: "fill-pasture",
  sky: "fill-sky",
  straw: "fill-straw",
};

// Üç organik leke; hepsi (0,0) merkezli, viewBox -75..75
const sekiller = [
  "M44.7,-58.3C57.3,-49.2,66.3,-34.8,70.4,-18.8C74.5,-2.8,73.8,14.8,66.3,28.8C58.8,42.8,44.6,53.2,29.1,60.7C13.6,68.2,-3.2,72.8,-19.6,69.6C-36,66.4,-52,55.4,-61.6,40.4C-71.2,25.4,-74.4,6.4,-70.4,-10.6C-66.4,-27.6,-55.2,-42.6,-41.1,-51.5C-27,-60.4,-13.5,-63.2,1.4,-65C16.3,-66.8,32.1,-67.4,44.7,-58.3Z",
  "M39.5,-52.3C50.9,-45.5,59.5,-33.4,64.8,-19.4C70.1,-5.4,72.1,10.5,66.4,23.4C60.7,36.3,47.3,46.2,33.2,54.5C19.1,62.8,4.3,69.5,-11.8,69.5C-27.9,69.5,-45.3,62.8,-56.4,50.3C-67.5,37.8,-72.3,19.5,-71.4,2.1C-70.5,-15.3,-63.9,-31.8,-52.6,-38.9C-41.3,-46,-25.3,-43.7,-11.1,-50.6C3.1,-57.5,28.1,-59.1,39.5,-52.3Z",
  "M48.1,-62.9C60.4,-53,67.4,-36.6,70.9,-19.8C74.4,-3,74.4,14.2,67.2,27.6C60,41,45.6,50.6,30.3,57.7C15,64.8,-1.2,69.4,-18.3,67.6C-35.4,65.8,-53.4,57.6,-63.2,43.7C-73,29.8,-74.6,10.2,-70.7,-7.4C-66.8,-25,-57.4,-40.6,-44.4,-50.4C-31.4,-60.2,-15.7,-64.2,1.3,-65.9C18.3,-67.6,35.8,-72.8,48.1,-62.9Z",
] as const;

type Props = {
  renk: BlobRenk;
  sekil?: 0 | 1 | 2;
  /** Derece */
  dondur?: number;
  className?: string;
  /** Hero'daki yumuşak beliriş (DESIGN.md §8) */
  belir?: boolean;
};

/** Düz tek renk organik leke. Her zaman dekoratif. */
export function Blob({ renk, sekil = 0, dondur = 0, className, belir }: Props) {
  return (
    <svg
      viewBox="-75 -75 150 150"
      aria-hidden
      focusable="false"
      className={cn("pointer-events-none", belir && "leke-belir", className)}
      style={dondur ? { transform: `rotate(${dondur}deg)` } : undefined}
    >
      <path d={sekiller[sekil]} className={dolgu[renk]} />
    </svg>
  );
}
