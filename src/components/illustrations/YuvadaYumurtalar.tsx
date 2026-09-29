import { Cizim, type CizimProps } from "./Cizim";

export function YuvadaYumurtalar(props: CizimProps) {
  return (
    <Cizim viewBox="0 0 170 110" {...props}>
      {/* yumurtalar */}
      <path pathLength={1} d="M52 20 C64 20 72 38 72 52 C72 64 63 70 52 70 C41 70 32 64 32 52 C32 38 40 20 52 20 Z" />
      <path pathLength={1} d="M110 16 C123 16 132 36 132 51 C132 64 122 70 110 70 C98 70 88 64 88 51 C88 36 97 16 110 16 Z" />
      <path pathLength={1} d="M82 36 C92 36 99 50 99 60 C99 70 91 74 82 74 C73 74 65 70 65 60 C65 50 72 36 82 36 Z" />
      <path pathLength={1} d="M42 34 C43 30 45 27 48 25" />
      <path pathLength={1} d="M100 30 C101 26 104 22 107 21" />
      {/* yuva */}
      <path pathLength={1} d="M10 62 C24 100 146 100 160 62" />
      <path pathLength={1} d="M6 60 C40 72 130 72 164 60" />
      {/* samanlar */}
      <path pathLength={1} d="M18 70 C50 84 90 84 128 76" />
      <path pathLength={1} d="M40 88 C70 78 110 80 150 72" />
      <path pathLength={1} d="M26 78 C60 94 110 94 144 82" />
      <path pathLength={1} d="M4 56 L16 64" />
      <path pathLength={1} d="M166 56 L152 66" />
      <path pathLength={1} d="M150 84 L162 90" />
    </Cizim>
  );
}
