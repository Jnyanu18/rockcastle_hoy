import { intro } from "@/lib/siteContent";
import { Reveal } from "./motion";

/* Pale yellow statement block directly after the hero. */
export default function Intro() {
  return (
    <section aria-labelledby="intro-heading" className="bg-acid px-5 pb-28 pt-24 md:px-12 md:pb-40 md:pt-36">
      <div className="mx-auto grid max-w-[1680px] grid-cols-1 gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,2.4fr)_minmax(0,1fr)]">
        <p className="text-[12px] text-ink/80 md:col-span-1">{intro.marker}</p>
        <p className="hidden text-right text-[12px] md:col-span-1 md:block">{intro.index}</p>

        <div className="md:col-start-2 md:row-start-1 md:row-span-3">
          <Reveal>
            <h2
              id="intro-heading"
              className="text-[clamp(2rem,3.6vw,3.6rem)] font-medium leading-[1.06] tracking-[-0.025em]"
            >
              {intro.statement}
            </h2>
          </Reveal>

          <Reveal className="mt-10 max-w-[22rem] text-[clamp(1.1rem,1.5vw,1.5rem)] leading-[1.25]">
            <p>{intro.lead}</p>
          </Reveal>

          <Reveal className="mt-8 flex flex-wrap gap-3">
            <a
              href={intro.primaryCta.href}
              className="inline-flex items-center gap-2 rounded-pill bg-ink px-5 py-2.5 text-[12px] font-medium uppercase tracking-[0.08em] text-acid transition-colors hover:bg-acid hover:text-ink"
            >
              {intro.primaryCta.label} <span aria-hidden>+</span>
            </a>
            <a
              href={intro.secondaryCta.href}
              className="inline-flex items-center rounded-pill border border-ink px-5 py-2.5 text-[12px] font-medium uppercase tracking-[0.08em] transition-colors hover:bg-ink hover:text-acid"
            >
              {intro.secondaryCta.label}
            </a>
          </Reveal>
        </div>

        {/* Outlined rounded frame with sparse plus mark */}
        <Reveal className="relative aspect-[3/4] w-full max-w-[420px] rounded-[48px] border border-ink md:col-start-3 md:row-start-2 md:justify-self-end">
          <span
            aria-hidden
            className="absolute left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2 text-3xl font-light"
          >
            +
          </span>
        </Reveal>
      </div>
    </section>
  );
}
