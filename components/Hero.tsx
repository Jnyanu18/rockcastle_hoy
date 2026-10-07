import { hero } from "@/lib/content";

/* Full-bleed hero: media placeholder, a staggered HOY letter block, and the
   two small copy blocks pinned to the lower-left and right edges. */
export default function Hero() {
  const rows = [0, 1, 2];
  const cols = [0, 1, 2];

  return (
    <section id="home" className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-[#2a2d33] text-canvas">
      {/* Media placeholder. Replace with <video autoPlay muted loop playsInline src="..."> */}
      <div aria-hidden className="absolute inset-0 bg-[#2a2d33]" />

      <div className="absolute inset-x-0 top-0 flex h-full items-center justify-center">
        <div className="relative grid grid-cols-3 gap-2 md:gap-3">
          {/* Play tile sits in the top-left cell, like the reference */}
          <button
            type="button"
            aria-label={hero.primaryCta.label}
            className="col-start-1 row-start-1 flex h-16 w-16 items-center justify-center rounded-2xl bg-canvas text-[10px] font-medium uppercase tracking-wide text-ink md:h-24 md:w-24 md:text-xs"
          >
            Play
          </button>
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

      {/* Lower-left: welcome + headline */}
      <div className="absolute bottom-16 left-4 max-w-[24rem] md:left-10 md:bottom-20">
        <p className="mb-3 text-xs font-medium">{hero.label}</p>
        <p className="text-xl leading-snug md:text-2xl">{hero.headline}</p>
      </div>

      {/* Lower-right: supporting copy */}
      <p className="absolute bottom-16 right-4 max-w-[15rem] text-right text-[13px] leading-relaxed md:bottom-20 md:right-10">
        {hero.aside}
      </p>
    </section>
  );
}
