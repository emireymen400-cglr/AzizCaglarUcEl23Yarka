import { Cizim, type CizimProps } from "./Cizim";

/** Yan profilden tavuk (sola bakar). */
export function TavukSiluet(props: CizimProps) {
  return (
    <Cizim viewBox="0 0 200 160" {...props}>
      {/* gaga */}
      <path pathLength={1} d="M46 43 L34 47 L46 51" />
      {/* ibik */}
      <path pathLength={1} d="M50 30 C49 22 55 19 58 25 C60 17 68 16 69 24 C73 19 80 23 76 31" />
      {/* baş ve sırt */}
      <path pathLength={1} d="M46 43 C46 34 52 28 62 28 C72 28 76 36 76 44 C80 52 88 58 102 58 C120 58 132 48 142 36" />
      {/* kuyruk */}
      <path pathLength={1} d="M142 36 C150 26 162 22 170 28 C178 40 178 60 170 76" />
      <path pathLength={1} d="M154 30 C166 38 170 52 166 68" />
      <path pathLength={1} d="M170 28 C182 30 188 44 184 58" />
      {/* göğüs ve karın */}
      <path pathLength={1} d="M46 51 C50 66 54 80 62 92 C72 108 92 116 112 114 C138 112 160 98 170 76" />
      {/* sakal */}
      <path pathLength={1} d="M50 54 C47 62 53 66 56 58" />
      {/* göz */}
      <circle pathLength={1} cx="58" cy="39" r="1.8" />
      {/* kanat */}
      <path pathLength={1} d="M86 74 C102 68 124 70 136 82 C124 94 102 96 90 88" />
      <path pathLength={1} d="M100 80 C110 78 120 80 126 84" />
      {/* bacaklar */}
      <path pathLength={1} d="M96 115 L94 140 M94 140 L84 145 M94 140 L100 146" />
      <path pathLength={1} d="M112 114 L114 140 M114 140 L106 146 M114 140 L122 145" />
      {/* zemin */}
      <path pathLength={1} d="M70 148 C100 150 130 150 150 148" />
    </Cizim>
  );
}
