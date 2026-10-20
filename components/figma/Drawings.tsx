/* Hand-drawn line art from the client Figma. Strokes draw in when an ancestor has `.is-in` (set by Section). */
const base = { fill: "none", stroke: "currentColor", strokeWidth: 1.4, strokeLinecap: "round", strokeLinejoin: "round" } as const;

export function LoungeDrawing({ className = "" }: { className?: string }) {
  return (
    <svg className={`rcf-draw ${className}`} viewBox="0 0 720 270" aria-hidden="true" {...base}>
      <path pathLength={1} d="M76 236V106c0-18 12-33 30-41l44-21 44 21c18 8 30 23 30 41v130" />
      <path pathLength={1} d="M644 236V106c0-18-12-33-30-41l-44-21-44 21c-18 8-30 23-30 41v130" />
      <path pathLength={1} d="M80 236h560" />
      <path pathLength={1} d="M140 236V121c0-13 10-24 23-28l46-16c18-7 39 1 47 18l12 27c7 16 10 33 10 50v64" />
      <path pathLength={1} d="M580 236V121c0-13-10-24-23-28l-46-16c-18-7-39 1-47 18l-12 27c-7 16-10 33-10 50v64" />
      <path pathLength={1} d="M145 220V120c0-10 8-18 18-18h394c10 0 18 8 18 18v100c0 12-10 22-22 22H167c-12 0-22-10-22-22Z" />
      <path pathLength={1} d="M152 212V123c0-6 5-11 11-11h394c6 0 11 5 11 11v89c0 8-6 14-14 14H166c-8 0-14-6-14-14Z" />
      <path pathLength={1} d="M106 236c28-18 87-28 176-28s148 10 176 28" />
      <path pathLength={1} d="M101 98c32 23 88 35 163 35 73 0 129-9 162-35" />
      <path pathLength={1} d="M134 98c0-24 14-42 35-52 19-9 42-9 60 1M586 98c0-24-14-42-35-52-19-9-42-9-60 1" />
      <path pathLength={1} d="M156 44c22 8 46 13 72 15 15 1 20 9 12 18-7 8-18 12-28 12-12 0-24-4-35-12M564 44c-22 8-46 13-72 15-15 1-20 9-12 18 7 8 18 12 28 12 12 0 24-4 35-12" />

      {[188, 270, 352, 434, 516].map((x, i) => {
        const y = 93 + Math.abs(x - 352) * 0.03;
        const tilt = i < 2 ? -5 : i > 2 ? 5 : 0;
        return (
          <g key={x}>
            <path pathLength={1} d={`M${x} ${y - 2}v10`} />
            <path pathLength={1} d={`M${x - 4} ${y + 8}q5-5 10 0l4 17q-7 7-18 0z`} transform={`rotate(${tilt} ${x} ${y + 15})`} />
            <path pathLength={1} d={`M${x - 2} ${y + 28}h4`} transform={`rotate(${tilt} ${x} ${y + 15})`} />
          </g>
        );
      })}

      <path pathLength={1} d="M144 236c39-17 95-26 214-26s175 9 214 26" />
      <path pathLength={1} d="M132 246c28 9 56 12 84 12h288c28 0 56-3 84-12" />
      <path pathLength={1} d="M84 236c-7 7-7 12 0 15s14-2 18-9M636 236c7 7 7 12 0 15s-14-2-18-9" />
      <path pathLength={1} d="M58 130v100m604-100v100" />
      <circle pathLength={1} cx="58" cy="130" r="2.5" />
      <circle pathLength={1} cx="662" cy="130" r="2.5" />
    </svg>
  );
}

export function BookPlaneDrawing({ className = "" }: { className?: string }) {
  /* Open notebook with a paper rocket lifting off its pages on a dotted trail */
  return (
    <svg className={`rcf-draw ${className}`} viewBox="0 0 300 150" aria-hidden="true" {...base}>
      <path pathLength={1} d="M20 118c24-14 62-8 96 8 34-16 72-22 96-8V70c-24-14-62-8-96 8-34-16-72-22-96-8z" />
      <path pathLength={1} d="M116 126V78M30 84c20-8 50-4 78 8M124 92c28-12 58-16 78-8" />
      <path pathLength={1} d="M40 100c18-6 44-2 66 8M130 108c22-10 48-14 66-8" />
      <path pathLength={1} d="M150 70c10-14 20-26 40-36" strokeDasharray="1 7" />
      <path pathLength={1} d="M196 36c14-6 26-18 36-30l50 6-24 52-24-14-22 22-6-26z" />
      <path pathLength={1} d="M282 12l-70 38M258 58l-24-14" />
    </svg>
  );
}

export function CameraDrawing({ className = "" }: { className?: string }) {
  /* Instagram glyph drawn as one flowing ribbon: leads in from the headline, wraps the camera, loops out the other side */
  return (
    <svg className={`rcf-draw rcf-ig ${className}`} viewBox="0 0 380 160" aria-hidden="true" {...base} strokeWidth={1.7}>
      <path pathLength={1} d="M2 104c26-12 46 14 74 2s34-30 66-30" />
      <rect pathLength={1} x="142" y="16" width="124" height="124" rx="36" />
      <rect pathLength={1} x="152" y="26" width="104" height="104" rx="28" />
      <circle pathLength={1} cx="204" cy="78" r="31" />
      <circle pathLength={1} cx="204" cy="78" r="21" />
      <path pathLength={1} className="rcf-ig__glint" d="M190 66c4-6 10-9 17-9" />
      <circle pathLength={1} cx="240" cy="44" r="5.5" />
      <path pathLength={1} d="M266 34c26-16 46 6 70-6 18-9 34 4 26 16-8 11-24 2-18-8" />
      <path pathLength={1} d="M262 116c12 14 34 8 30-6-3-10-18-8-16 2 1 6 10 6 12 0" />
      <path className="rcf-ig__spark" d="M318 74l2.4 6 6 2.4-6 2.4-2.4 6-2.4-6-6-2.4 6-2.4z" />
      <path className="rcf-ig__spark rcf-ig__spark--b" d="M118 34l1.8 4.6 4.6 1.8-4.6 1.8-1.8 4.6-1.8-4.6-4.6-1.8 4.6-1.8z" />
      <path className="rcf-ig__spark rcf-ig__spark--c" d="M346 128l1.6 4 4 1.6-4 1.6-1.6 4-1.6-4-4-1.6 4-1.6z" />
    </svg>
  );
}
