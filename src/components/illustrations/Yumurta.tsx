import { Cizim, type CizimProps } from "./Cizim";

export const yumurtaYolu = "M30 4 C46 4 56 30 56 48 C56 66 44 76 30 76 C16 76 4 66 4 48 C4 30 14 4 30 4 Z";

export function Yumurta(props: CizimProps) {
  return (
    <Cizim viewBox="0 0 60 80" {...props}>
      <path pathLength={1} d={yumurtaYolu} />
      {/* parlama */}
      <path pathLength={1} d="M16 30 C18 22 22 16 27 13" />
      {/* gölge çizgisi */}
      <path pathLength={1} d="M40 66 C46 62 50 56 51 50" />
    </Cizim>
  );
}
