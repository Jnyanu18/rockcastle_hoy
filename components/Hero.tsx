import { hero } from "@/lib/content";
import KineticLogo from "@/components/KineticLogo";

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
      data-magnetic
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
          MOBILE HERO VIEW (< md)
          ======================================================== */}
      <div className="flex md:hidden absolute inset-0 z-10 flex-col items-center justify-center px-4 pt-14 pb-6 pointer-events-auto">
        {/* Mobile Center Kinetic Logo (replaces HOY letter stack) */}
        <div className="relative mb-3 flex items-center justify-center h-24 w-full">
          <KineticLogo className="!relative !top-auto !left-auto !translate-x-0 !translate-y-0 pointer-events-auto" />
        </div>

        {/* Mobile Welcome & Headline Copy */}
        <div className="mt-3 flex flex-col items-center text-center px-2">
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
          DESKTOP HERO VIEW (>= md): KineticLogo in Center
          ======================================================== */}
      {/* Center Kinetic Logo (replaces 3x3 HOY letter grid) */}
      <div className="hidden md:flex absolute inset-0 items-center justify-center z-10 pointer-events-none">
        <KineticLogo className="pointer-events-auto" />
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

