import { hero } from "@/lib/content";

/* Full-bleed hero: media placeholder, a staggered HOY letter block, and the
   two small copy blocks pinned to the lower-left and right edges. */
export default function Hero() {
  const rows = [0, 1, 2];
  const cols = [0, 1, 2];

  return (
    <section
      id="home"
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-ink text-canvas"
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
        className="absolute inset-0 bg-black/40 pointer-events-none"
      />

      <div className="absolute inset-x-0 top-0 flex h-full items-center justify-center z-10 pointer-events-none">
        <div className="relative grid grid-cols-3 gap-2 md:gap-3 pointer-events-auto">
          {/* Play tile sits in the top-left cell, like the reference */}
          <a
            href={hero.primaryCta.href}
            aria-label={hero.primaryCta.label}
            className="col-start-1 row-start-1 flex h-16 w-16 items-center justify-center rounded-2xl bg-canvas text-[10px] font-semibold uppercase tracking-wider text-ink transition-transform duration-300 hover:scale-105 md:h-24 md:w-24 md:text-xs shadow-lg"
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
                  className="flex h-16 w-16 items-center justify-center rounded-2xl bg-canvas text-3xl font-semibold text-ink md:h-24 md:w-24 md:text-5xl shadow-lg transition-transform duration-300 hover:scale-105"
                >
                  {cell.letter}
                </span>
              );
            }),
          )}
        </div>
      </div>

      {/* Left-center: welcome + headline */}
      <div className="absolute top-1/2 -translate-y-1/2 left-4 md:left-10 lg:left-14 max-w-[16rem] md:max-w-[22rem] lg:max-w-[24rem] z-10 pointer-events-auto">
        <p className="mb-3 text-xs font-medium tracking-wide">{hero.label}</p>
        <p className="text-lg leading-snug md:text-xl lg:text-2xl font-normal">{hero.headline}</p>
      </div>

      {/* Right-center: supporting copy */}
      <div className="absolute top-1/2 -translate-y-1/2 right-4 md:right-10 lg:right-14 max-w-[13rem] md:max-w-[15rem] lg:max-w-[17rem] text-right z-10 pointer-events-auto">
        <p className="text-xs md:text-[13px] leading-relaxed opacity-90">
          {hero.aside}
        </p>
      </div>
    </section>
  );
}


