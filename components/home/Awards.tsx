import { awards } from "@/data/home";
import { Reveal } from "../motion";

/* Editorial list, not cards: hairline rules and column alignment carry the hierarchy. */
export default function Awards() {
  return (
    <section aria-labelledby="awards-heading" className="bg-acid px-5 py-24 md:px-12 md:py-36">
      <div className="mx-auto max-w-[1680px]">
        <div className="mb-14 flex items-baseline justify-between text-[12px] md:mb-20">
          <span>{awards.index}</span>
          <span className="text-ink/70">Recognition</span>
        </div>

        <div className="grid gap-12 md:grid-cols-12 md:gap-10">
          <h2 id="awards-heading" className="text-[clamp(2.4rem,5.6vw,6rem)] font-semibold leading-[0.92] tracking-[-0.045em] md:col-span-5">
            {awards.headline.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>

          <div className="md:col-span-7">
            <ul>
              {/* Column labels */}
              <li className="hidden grid-cols-[1.4fr_1fr_1fr_0.5fr] gap-6 border-b border-ink pb-3 text-[11px] uppercase tracking-[0.12em] text-ink/60 md:grid">
                <span>Award</span>
                <span>Category</span>
                <span>Project</span>
                <span className="text-right">Year</span>
              </li>
              {awards.rows.map((row, i) => (
                <li key={i}>
                <Reveal delay={i * 0.05}>
                  <div className="group grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-1 border-b border-ink/25 py-5 md:grid-cols-[1.4fr_1fr_1fr_0.5fr] md:py-6">
                    <span className="text-[clamp(1.1rem,1.8vw,1.7rem)] font-medium transition-transform duration-500 ease-cinematic group-hover:translate-x-2">
                      {row.award}
                    </span>
                    <span className="text-right text-[12px] md:hidden">{row.year}</span>
                    <span className="text-[13px] text-ink/80 md:text-[14px]">{row.category}</span>
                    <span className="col-span-2 text-[13px] text-ink/80 md:col-span-1 md:text-[14px]">{row.project}</span>
                    <span className="hidden text-right text-[14px] md:block">{row.year}</span>
                  </div>
                </Reveal>
                </li>
              ))}
            </ul>

            <a
              href={awards.cta.href}
              className="group mt-12 inline-flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.1em]"
            >
              {awards.cta.label}
              <span aria-hidden className="transition-transform duration-500 ease-cinematic group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
