import { INSTA_OUTLINE, INSTA_STROKES, INSTA_VIEWBOX } from "./instaPath";

/**
 * The client's one-line Instagram drawing. The artwork is a filled outline revealed through a mask
 * of centre-line strokes, so it "draws" itself from the left tail, around the camera and out the loop.
 * Needs an ancestor with `.is-in` (set by Section) to play.
 */
export default function InstaDrawing({ className = "" }: { className?: string }) {
  return (
    <svg className={`rcf-insta-draw ${className}`} viewBox={INSTA_VIEWBOX} aria-hidden="true">
      <defs>
        <mask id="rcf-insta-mask" maskUnits="userSpaceOnUse">
          <g fill="none" stroke="#fff" strokeWidth={6} strokeLinecap="round" strokeLinejoin="round">
            {INSTA_STROKES.map((s, i) => (
              <path
                key={i}
                d={s.d}
                pathLength={1}
                className="rcf-insta-draw__stroke"
                style={{ "--d": s.delay, "--l": s.len } as React.CSSProperties}
              />
            ))}
          </g>
        </mask>
      </defs>
      <path d={INSTA_OUTLINE} fill="#1a1a1a" fillRule="evenodd" mask="url(#rcf-insta-mask)" />
    </svg>
  );
}
