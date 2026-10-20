/* Hand-drawn line art from the client Figma. Strokes draw in when an ancestor has `.is-in` (set by Section). */
const base = { fill: "none", stroke: "currentColor", strokeWidth: 1.4, strokeLinecap: "round", strokeLinejoin: "round" } as const;

export function LoungeDrawing({ className = "" }: { className?: string }) {
  return (
    <svg className={`rcf-draw ${className}`} viewBox="0 0 720 270" aria-hidden="true" {...base}>
      <path pathLength={1} d="M8 239h704" />

      <path pathLength={1} d="M82 239V132q0-13 11-19l59-31M638 239V132q0-13-11-19l-59-31" />
      <path pathLength={1} d="M100 224V137q0-10 9-16l36-22M620 224v-87q0-10-9-16l-36-22" />
      <path pathLength={1} d="M145 220V132q0-11 12-10c91 15 225 15 406 0q12-1 12 10v88q0 11-12 11H157q-12 0-12-11Z" />
      <path pathLength={1} d="M153 215v-78q0-7 8-7c95 13 219 13 398 0q8 0 8 7v78q0 8-9 8H162q-9 0-9-8Z" />

      <path pathLength={1} d="M128 229c38-11 95-16 232-16s194 5 232 16c17 5 18 18 0 22-75 17-389 17-464 0-18-4-17-17 0-22Z" />
      <path pathLength={1} d="M230 246c-8 2-10 8-4 11 25 10 243 10 268 0 6-3 4-9-4-11M220 257c-11 2-13 8-5 11 31 10 257 10 288 0 8-3 6-9-5-11" />

      <path pathLength={1} d="M144 91c38 23 111 34 216 34s178-11 216-34" />
      <path pathLength={1} d="M146 88c-2-19 5-32 19-39 14-7 30-2 44 6M574 88c2-19-5-32-19-39-14-7-30-2-44 6" />
      <path pathLength={1} d="M151 50c29 14 60 25 92 31 15 3 16 12 1 12-17 0-38-9-56-19M569 50c-29 14-60 25-92 31-15 3-16 12-1 12 17 0 38-9 56-19" />
      <path pathLength={1} d="M145 91c0-4 4-7 8-7s8 3 8 7-4 7-8 7-8-3-8-7ZM559 91c0-4 4-7 8-7s8 3 8 7-4 7-8 7-8-3-8-7Z" />

      {[188, 270, 352, 434, 516].map((x, i) => {
        const y = 101 + Math.round(Math.abs(x - 352) * 0.035);
        const tilt = i < 2 ? -5 : i > 2 ? 5 : 0;
        return (
          <g key={x}>
            <path pathLength={1} d={`M${x} ${y - 4}v10`} />
            <path pathLength={1} d={`M${x - 5} ${y + 6}q5-5 10 0l4 16q-7 7-18 0z`} transform={`rotate(${tilt} ${x} ${y + 14})`} />
            <path pathLength={1} d={`M${x - 3} ${y + 24}h6`} transform={`rotate(${tilt} ${x} ${y + 14})`} />
          </g>
        );
      })}

      <path pathLength={1} d="M82 239c-7 7-7 12 0 15s14-2 18-9M638 239c7 7 7 12 0 15s-14-2-18-9" />
      <path pathLength={1} d="M60 147v77m600-77v77" />
      <circle pathLength={1} cx="60" cy="145" r="2.5" />
      <circle pathLength={1} cx="660" cy="145" r="2.5" />
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
