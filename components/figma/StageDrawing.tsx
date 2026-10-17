const base = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" } as const;

const lights = [110, 190, 260, 330, 410];
const bars = [0, 1, 2, 3, 4, 5, 6];
const confetti = [92, 140, 178, 232, 288, 342, 392, 430];
const crowd = [60, 100, 140, 180, 220, 260, 300, 340, 380, 420, 460];

/** Animated stage: truss + sweeping spotlights, swaying curtains, LED wall with live equalizer, mic, confetti and a bobbing crowd. */
export default function StageDrawing({ className = "" }: { className?: string }) {
  return (
    <svg className={`rcf-stage ${className}`} viewBox="0 0 520 320" aria-hidden="true" {...base}>
      {/* truss */}
      <g className="ln">
        <path pathLength={1} d="M40 22h440M40 40h440M40 22v18M480 22v18" />
        <path pathLength={1} d="M40 40l22-18 22 18 22-18 22 18 22-18 22 18 22-18 22 18 22-18 22 18 22-18 22 18 22-18 22 18 22-18 22 18 22-18 22 18 22-18" />
      </g>

      {/* spotlight beams */}
      <g className="beams">
        {lights.map((x, i) => (
          <g key={x} className={`beam beam--${i}`} style={{ transformOrigin: `${x}px 56px` }}>
            <path d={`M${x - 7} 56L${x - 46} 262h92L${x + 7} 56z`} fill="currentColor" stroke="none" />
          </g>
        ))}
      </g>

      {/* par cans */}
      <g className="ln">
        {lights.map((x) => (
          <g key={x}>
            <path pathLength={1} d={`M${x} 40v6`} />
            <rect pathLength={1} x={x - 8} y={46} width={16} height={12} rx={3} />
          </g>
        ))}
      </g>

      {/* LED wall */}
      <g className="ln">
        <rect pathLength={1} x={150} y={78} width={220} height={108} rx={6} />
        <rect pathLength={1} x={158} y={86} width={204} height={92} rx={3} />
      </g>
      <g className="eq">
        {bars.map((b) => (
          <rect key={b} className={`eq__bar eq__bar--${b}`} x={176 + b * 25} y={118} width={12} height={56} rx={2} fill="currentColor" stroke="none" />
        ))}
      </g>

      {/* curtains */}
      <g className="curtain curtain--l ln">
        <path pathLength={1} d="M28 18c28 6 56 6 76 0v206c-20 12-48 12-76 0z" />
        <path pathLength={1} d="M48 22c10 60-10 120 0 196M68 22c10 60-10 120 0 196M88 22c8 60-8 120 0 196" />
      </g>
      <g className="curtain curtain--r ln">
        <path pathLength={1} d="M416 18c20 6 48 6 76 0v206c-28 12-56 12-76 0z" />
        <path pathLength={1} d="M432 22c10 60-10 120 0 196M452 22c10 60-10 120 0 196M472 22c8 60-8 120 0 196" />
      </g>

      {/* stage deck + steps */}
      <g className="ln">
        <path pathLength={1} d="M64 232h392l44 36H20z" />
        <path pathLength={1} d="M20 268h480v14H20z" />
        <path pathLength={1} d="M214 268v14M306 268v14M232 282h56M238 290h44" />
      </g>

      {/* mic stand + sparkles */}
      <g className="ln">
        <path pathLength={1} d="M260 252v-52M260 252l-12 12M260 252l12 12" />
        <rect pathLength={1} x={254} y={184} width={12} height={18} rx={6} />
      </g>
      <g className="spark" fill="currentColor" stroke="none">
        <path className="spark__a" d="M232 170l2.5 6 6 2.5-6 2.5-2.5 6-2.5-6-6-2.5 6-2.5z" />
        <path className="spark__b" d="M294 160l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" />
        <path className="spark__c" d="M276 140l1.6 4 4 1.6-4 1.6-1.6 4-1.6-4-4-1.6 4-1.6z" />
      </g>

      {/* confetti */}
      <g className="confetti" fill="currentColor" stroke="none">
        {confetti.map((x, i) => (
          <rect key={x} className={`confetti__p confetti__p--${i % 4}`} x={x} y={70} width={5} height={8} rx={1} style={{ animationDelay: `${i * 0.45}s` }} />
        ))}
      </g>

      {/* crowd */}
      <g className="crowd ln">
        {crowd.map((x, i) => (
          <g key={x} className="crowd__p" style={{ animationDelay: `${(i % 4) * 0.25}s` }}>
            <circle pathLength={1} cx={x} cy={306} r={8} />
          </g>
        ))}
      </g>
    </svg>
  );
}
