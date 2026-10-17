/* Hand-drawn line art from the client Figma. Strokes draw in when an ancestor has `.is-in` (set by Section). */
const base = { fill: "none", stroke: "currentColor", strokeWidth: 1.4, strokeLinecap: "round", strokeLinejoin: "round" } as const;

export function LoungeDrawing({ className = "" }: { className?: string }) {
  return (
    <svg className={`rcf-draw ${className}`} viewBox="0 0 420 170" aria-hidden="true" {...base}>
      <path pathLength={1} d="M60 150V60M360 150V60M60 62h300" />
      <path pathLength={1} d="M95 62c10-45 55-60 115-60s105 15 115 60" />
      <path pathLength={1} d="M80 150c0-40 10-60 30-62h200c20 2 30 22 30 62" />
      <path pathLength={1} d="M70 150h280M95 160h230" />
      <path pathLength={1} d="M120 20c40 14 140 14 180 0" />
      {[145, 185, 225, 265].map((x, i) => (
        <path key={x} pathLength={1} d={`M${x} ${28 + (i % 2) * 2}v12a5 8 0 1 0 0.1 0z`} />
      ))}
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
