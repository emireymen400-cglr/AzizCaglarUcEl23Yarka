import { Cizim, type CizimProps } from "./Cizim";

export function Civciv(props: CizimProps) {
  return (
    <Cizim viewBox="0 0 100 96" {...props}>
      {/* baş ve gövde */}
      <path
        pathLength={1}
        d="M33 40 C28 30 32 16 46 14 C58 12 66 22 64 34 C78 38 88 50 86 64 C84 78 70 86 54 86 C38 86 26 76 26 62 C26 52 29 45 33 40"
      />
      {/* gaga */}
      <path pathLength={1} d="M33 26 L23 29 L32 33" />
      {/* göz */}
      <circle pathLength={1} cx="42" cy="25" r="1.6" />
      {/* tepe tüyü */}
      <path pathLength={1} d="M46 14 C44 8 48 5 51 9" />
      {/* kanat */}
      <path pathLength={1} d="M50 58 C58 50 72 52 74 62 C66 68 56 68 50 62" />
      {/* ayaklar */}
      <path pathLength={1} d="M48 86 L46 93 M46 93 L41 95 M46 93 L50 95" />
      <path pathLength={1} d="M60 86 L62 93 M62 93 L57 95 M62 93 L67 94" />
    </Cizim>
  );
}
