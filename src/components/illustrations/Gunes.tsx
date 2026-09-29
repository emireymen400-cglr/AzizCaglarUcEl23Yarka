import { Cizim, type CizimProps } from "./Cizim";

// Eşit olmayan uzunlukta 12 ışın; el çizimi hissi için.
const isinlar = [52, 44, 50, 42, 54, 46, 50, 43, 53, 45, 49, 44];

export function Gunes(props: CizimProps) {
  return (
    <Cizim viewBox="0 0 120 120" {...props}>
      <circle pathLength={1} cx="60" cy="60" r="24" />
      <path pathLength={1} d="M48 52 C51 47 56 44 62 44" />
      {isinlar.map((uzunluk, i) => {
        const a = (i / isinlar.length) * Math.PI * 2 + 0.12;
        const x1 = 60 + Math.cos(a) * 32;
        const y1 = 60 + Math.sin(a) * 32;
        const x2 = 60 + Math.cos(a) * uzunluk;
        const y2 = 60 + Math.sin(a) * uzunluk;
        return <path key={i} pathLength={1} d={`M${x1.toFixed(1)} ${y1.toFixed(1)} L${x2.toFixed(1)} ${y2.toFixed(1)}`} />;
      })}
    </Cizim>
  );
}
