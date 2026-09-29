import { Cizim, type CizimProps } from "./Cizim";

// Sap üzerinde karşılıklı taneler; tepede kılçıklar.
const taneler = [40, 54, 68, 82, 96];

export function BugdayBasagi(props: CizimProps) {
  return (
    <Cizim viewBox="0 0 60 170" {...props}>
      <path pathLength={1} d="M30 168 C30 140 30.5 110 30 30" />
      {taneler.map((y) => (
        <g key={y}>
          <path pathLength={1} d={`M30 ${y + 10} C21 ${y + 7} 18 ${y - 2} 21 ${y - 9} C27 ${y - 5} 30 ${y + 2} 30 ${y + 10}`} />
          <path pathLength={1} d={`M30 ${y + 10} C39 ${y + 7} 42 ${y - 2} 39 ${y - 9} C33 ${y - 5} 30 ${y + 2} 30 ${y + 10}`} />
          <path pathLength={1} d={`M21 ${y - 9} L14 ${y - 24}`} />
          <path pathLength={1} d={`M39 ${y - 9} L46 ${y - 24}`} />
        </g>
      ))}
      <path pathLength={1} d="M30 30 C27 26 27 20 30 14 C33 20 33 26 30 30" />
      <path pathLength={1} d="M30 14 L30 2" />
      <path pathLength={1} d="M30 150 C22 142 16 140 8 142" />
    </Cizim>
  );
}
