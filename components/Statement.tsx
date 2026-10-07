"use client";

import { statement } from "@/lib/content";
import SlideUpText from "@/components/ui/SlideUpText";

/* Light statement block: small label left, large body set in the right
   column, supporting line and two pills, and an outlined rounded frame.
   Rises over the sticky hero as the user scrolls. */
export default function Statement() {
  return (
    <section
      id="about"
      className="relative z-10 bg-canvas px-5 py-14 sm:px-8 sm:py-20 md:px-10 md:pt-28 md:pb-24 min-h-[100svh] shadow-[0_-25px_60px_rgba(0,0,0,0.35)]"
    >
      <div className="mx-auto max-w-[1600px]">
        <div className="flex justify-between text-xs sm:text-[13px] font-medium">
          <p className="w-1/2 sm:w-1/4">
            <SlideUpText split="words">
              {statement.label}
            </SlideUpText>
          </p>
          <p className="tabular-nums">
            <SlideUpText split="characters" delay={0.04}>
              {`[ ${statement.index} ]`}
            </SlideUpText>
          </p>
        </div>

        <div className="mt-8 sm:mt-12 grid gap-8 sm:gap-12 md:grid-cols-[27%_1fr]">
          <div aria-hidden className="hidden md:block" />
          <div>
            <h2 className="text-2xl sm:text-3xl font-medium tracking-[-0.02em] md:text-[44px] md:leading-[1.08] lg:text-[52px] text-ink mb-5 sm:mb-7">
              <SlideUpText split="words" stagger={0.02} delay={0.04}>
                {statement.title}
              </SlideUpText>
            </h2>

            <p className="text-base sm:text-xl leading-[1.4] tracking-[-0.01em] md:text-[22px] md:leading-[1.35] lg:text-[25px] text-ink/85">
              <SlideUpText split="words" stagger={0.01} delay={0.08}>
                {statement.body}
              </SlideUpText>
            </p>

            <div className="mt-8 sm:mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="max-w-xs text-base sm:text-lg leading-snug md:text-2xl">
                  <SlideUpText split="words" stagger={0.02} delay={0.12}>
                    {statement.sub}
                  </SlideUpText>
                </p>
                <div className="mt-6 sm:mt-8 flex flex-wrap gap-2.5 sm:gap-3">
                  {statement.ctas.map((cta) => (
                    <a
                      key={cta.label}
                      href={cta.href}
                      data-magnetic
                      className={
                        cta.primary
                          ? "inline-flex h-10 sm:h-11 items-center gap-2.5 sm:gap-3 rounded-full bg-ink px-5 sm:px-6 text-[11px] sm:text-xs font-medium uppercase tracking-wide text-canvas transition-transform active:scale-95"
                          : "inline-flex h-10 sm:h-11 items-center rounded-full border border-ink px-5 sm:px-6 text-[11px] sm:text-xs font-medium uppercase tracking-wide transition-transform active:scale-95"
                      }
                    >
                      {cta.label}
                      {cta.primary && <span aria-hidden>+</span>}
                    </a>
                  ))}
                </div>
              </div>

              {/* Outlined rounded frame with the sparse cross mark */}
              <div
                aria-hidden
                className="relative h-44 w-full max-w-[260px] sm:h-56 sm:max-w-[320px] md:h-[380px] md:max-w-[368px] mx-auto md:mx-0 rounded-[32px] sm:rounded-[38px] md:rounded-[42px] border border-ink/70 mt-4 md:mt-0"
              >
                <span className="absolute left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2 text-xl sm:text-2xl leading-none">
                  +
                </span>
                <span className="absolute left-[38%] top-[38%] text-xs sm:text-sm leading-none">
                  +
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
