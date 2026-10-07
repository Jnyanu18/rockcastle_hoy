import { hero } from "@/lib/content";

/* Full-bleed sticky hero with video background:
   - Sticky top-0 so it stays anchored as the About section slides up over it
   - Original text sizes and left-center / right-center alignment
   - Original letter grid and play tile
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
        className="absolute inset-0 bg-black/40 pointer-events-none"
      />

      {/* Center 3x3 letter grid with Play tile in top-left cell */}
      <div className="absolute inset-x-0 top-0 flex h-full items-center justify-center z-10 pointer-events-none">
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

      {/* Left-center: welcome + headline */}
      <div className="absolute top-1/2 -translate-y-1/2 left-4 max-w-[24rem] z-10 md:left-10 pointer-events-auto">
        <p className="mb-3 text-xs font-medium">{hero.label}</p>
        <p className="text-xl leading-snug md:text-2xl">{hero.headline}</p>
      </div>

      {/* Right-center: supporting copy */}
      <p className="absolute top-1/2 -translate-y-1/2 right-4 max-w-[15rem] text-right text-[13px] leading-relaxed z-10 md:right-10 pointer-events-auto">
        {hero.aside}
      </p>
    </section>
  );
}
