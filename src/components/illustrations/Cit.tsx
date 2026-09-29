import { Cizim, type CizimProps } from "./Cizim";

const direkler = [16, 92, 168];

/** Ahşap çit parçası: üç sivri direk, iki kuşak tahtası. */
export function Cit(props: CizimProps) {
  return (
    <Cizim viewBox="0 0 200 120" {...props}>
      {direkler.map((x) => (
        <g key={x}>
          <path pathLength={1} d={`M${x} 114 L${x} 24 L${x + 8} 14 L${x + 16} 24 L${x + 16} 114`} />
          <path pathLength={1} d={`M${x + 5} 40 C${x + 7} 52 ${x + 6} 64 ${x + 8} 76`} />
        </g>
      ))}
      {/* kuşaklar */}
      <path pathLength={1} d="M32 38 L92 42 M32 50 L92 54" />
      <path pathLength={1} d="M108 42 L168 38 M108 54 L168 50" />
      <path pathLength={1} d="M32 78 L92 84 M32 90 L92 96" />
      <path pathLength={1} d="M108 84 L168 78 M108 96 L168 90" />
      {/* zemin ve ot */}
      <path pathLength={1} d="M2 114 L198 114" />
      <path pathLength={1} d="M44 114 L40 104 M48 114 L50 102 M140 114 L136 106 M146 114 L148 104" />
    </Cizim>
  );
}
