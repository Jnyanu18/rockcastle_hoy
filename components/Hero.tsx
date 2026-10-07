import { hero } from "@/lib/content";

/* Star Orbit Ring Graphic: perspective dashed ellipse with centered 4-point star */
function StarOrbitRing() {
  return (
    <div className="relative mt-3 flex items-center justify-center">
      <svg
        width="160"
        height="44"
        viewBox="0 0 160 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
        aria-hidden="true"
      >
        {/* Outer Perspective Ellipse Ring */}
        <ellipse
          cx="80"
          cy="22"
          rx="72"
          ry="15"
          stroke="#edeea5"
          strokeWidth="0.8"
          strokeDasharray="2 3"
          strokeOpacity="0.65"
        />
        {/* Inner Concentric Perspective Ellipse */}
        <ellipse
          cx="80"
          cy="22"
          rx="60"
          ry="11"
          stroke="#edeea5"
          strokeWidth="0.5"
          strokeOpacity="0.4"
        />
        {/* Horizontal Equatorial Axis Guide */}
        <line
          x1="12"
          y1="22"
          x2="148"
          y2="22"
          stroke="#edeea5"
          strokeWidth="0.5"
          strokeDasharray="2 4"
          strokeOpacity="0.3"
        />
        {/* Center 4-Point Star (Sparkle) */}
        <g transform="translate(71, 13)">
          <path
            d="M9 0C9.4 5.5 12.5 8.6 18 9C12.5 9.4 9.4 12.5 9 18C8.6 12.5 5.5 9.4 0 9C5.5 8.6 8.6 5.5 9 0Z"
            fill="#edeea5"
          />
        </g>
      </svg>
    </div>
  );
}

/* Play Video Squircle Tile: rounded yellow square with spinning circular text */
function PlayVideoTile({ href = "#recent-experiences" }: { href?: string }) {
  return (
    <a
      href={href}
      aria-label="Play video"
      className="group relative flex h-[76px] w-[76px] items-center justify-center rounded-[20px] bg-[#edeea5] text-[#1d1d1b] shadow-[0_4px_24px_rgba(237,238,165,0.22)] transition-transform duration-300 active:scale-95 hover:scale-105"
    >
      <svg
        viewBox="0 0 100 100"
        className="h-full w-full animate-[spin_10s_linear_infinite]"
        aria-hidden="true"
      >
        <defs>
          <path
            id="playCirclePath"
            d="M 50, 50 m -33, 0 a 33,33 0 1,1 66,0 a 33,33 0 1,1 -66,0"
          />
        </defs>
        <text className="text-[9px] font-bold uppercase tracking-[0.18em] fill-[#1d1d1b]">
          <textPath href="#playCirclePath" startOffset="0%">
            • PLAY VIDEO • PLAY VIDEO 
          </textPath>
        </text>
      </svg>
    </a>
  );
}

/* Full-bleed sticky hero with video background:
   - Mobile: Centered HOY letter unit, welcome headline, play video tile, and star orbit ring
   - Desktop: Kept identical with original 3x3 letter grid and left/right copy
*/
export default function Hero() {
  const rows = [0, 1, 2];
  const cols = [0, 1, 2];

  return (
    <section
      id="home"
      className="sticky top-0 h-[100svh] min-h-[640px] w-full overflow-hidden bg-ink text-canvas z-0"
    >
      {/* Background Video */}
      <video
        src="/rockcastle.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Dark tint overlay for visual contrast */}
      <div
        aria-hidden
        className="absolute inset-0 bg-black/45 pointer-events-none"
      />

      {/* ========================================================
          MOBILE HERO VIEW (< md): Exact match to reference image
          ======================================================== */}
      <div className="flex md:hidden absolute inset-0 z-10 flex-col items-center justify-center px-4 pt-14 pb-6 pointer-events-auto">
        {/* Mobile Center HOY Letter Unit */}
        <div className="relative flex flex-col items-center justify-center gap-2">
          {/* Top Row: H and Y */}
          <div className="flex w-36 items-center justify-between text-3xl font-bold tracking-wider text-white">
            <span>H</span>
            <span>Y</span>
          </div>

          {/* Center Row: [O] Squircle Tile */}
          <div className="flex items-center justify-center">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#edeea5] text-xl font-bold text-[#1d1d1b] shadow-md">
              O
            </div>
          </div>

          {/* Bottom Row: H and Y */}
          <div className="flex w-36 items-center justify-between text-3xl font-bold tracking-wider text-white">
            <span>H</span>
            <span>Y</span>
          </div>
        </div>

        {/* Mobile Welcome & Headline Copy */}
        <div className="mt-4 flex flex-col items-center text-center px-2">
          <p className="text-xs font-semibold tracking-wide text-[#edeea5]">
            {hero.label}
          </p>
          <p className="mt-1.5 max-w-[290px] text-[13px] leading-relaxed font-medium text-white/95">
            {hero.headline}
          </p>
        </div>

        {/* Mobile Play Video Button & Celestial Star Orbit Ring */}
        <div className="mt-5 flex flex-col items-center">
          <PlayVideoTile href={hero.primaryCta.href} />
          <StarOrbitRing />
        </div>
      </div>

      {/* ========================================================
          DESKTOP HERO VIEW (>= md): Kept exact same layout & sizes
          ======================================================== */}
      {/* Center 3x3 letter grid with Play tile in top-left cell */}
      <div className="hidden md:flex absolute inset-x-0 top-0 h-full items-center justify-center z-10 pointer-events-none">
        <div className="relative grid grid-cols-3 gap-2 md:gap-3 pointer-events-auto">
          {/* Play tile sits in the top-left cell, like the reference */}
          <a
            href={hero.primaryCta.href}
            aria-label={hero.primaryCta.label}
            className="col-start-1 row-start-1 flex h-16 w-16 items-center justify-center rounded-2xl bg-canvas text-[10px] font-medium uppercase tracking-wide text-ink md:h-24 md:w-24 md:text-xs"
          >
            Play
          </a>
          {rows.flatMap((r) =>
            cols.map((c) => {
              const cell = hero.letters.find((l) => l.row === r && l.col === c);
              if (!cell) return null;
              return (
                <span
                  key={`${r}-${c}`}
                  style={{ gridRow: r + 1, gridColumn: c + 1 }}
                  className="flex h-16 w-16 items-center justify-center rounded-2xl bg-canvas text-3xl font-semibold text-ink md:h-24 md:w-24 md:text-5xl"
                >
                  {cell.letter}
                </span>
              );
            }),
          )}
        </div>
      </div>

      {/* Primary headline: desktop at left-center */}
      <div className="hidden md:block absolute md:top-1/2 md:-translate-y-1/2 md:left-10 md:max-w-[24rem] z-10 pointer-events-auto">
        <p className="mb-2 md:mb-3 text-xs font-medium">{hero.label}</p>
        <p className="text-lg leading-snug md:text-xl lg:text-2xl">{hero.headline}</p>
      </div>

      {/* Supporting copy: desktop right-center */}
      <p className="hidden md:block absolute top-1/2 -translate-y-1/2 right-4 max-w-[15rem] text-right text-[13px] leading-relaxed z-10 md:right-10 pointer-events-auto">
        {hero.aside}
      </p>
    </section>
  );
}

