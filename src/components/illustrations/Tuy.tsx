import { Cizim, type CizimProps } from "./Cizim";

export function Tuy(props: CizimProps) {
  return (
    <Cizim viewBox="0 0 70 170" {...props}>
      {/* sap */}
      <path pathLength={1} d="M26 166 C28 130 34 80 50 6" />
      {/* bayrak (sol ve sağ kenar) */}
      <path pathLength={1} d="M50 6 C30 26 18 62 20 98 C21 116 24 128 28 138" />
      <path pathLength={1} d="M50 6 C62 34 62 72 50 104 C44 120 38 130 30 140" />
      {/* lifler */}
      <path pathLength={1} d="M45 30 C38 34 32 40 28 48" />
      <path pathLength={1} d="M42 50 C34 56 27 62 23 70" />
      <path pathLength={1} d="M38 74 C31 80 25 86 22 94" />
      <path pathLength={1} d="M49 38 C54 44 57 50 58 58" />
      <path pathLength={1} d="M45 62 C51 68 54 76 55 84" />
      <path pathLength={1} d="M40 88 C45 94 48 100 48 108" />
      {/* kopuk lif */}
      <path pathLength={1} d="M27 120 L20 126" />
    </Cizim>
  );
}
