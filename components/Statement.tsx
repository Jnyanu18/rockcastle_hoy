"use client";

import { statement } from "@/lib/content";
import SlideUpText from "@/components/ui/SlideUpText";

/* Statement section: Matches House of Yellow reference design (Image 2)
   - Left column: "Who are we?" aligned directly with the top of the main headline
   - Right top: "[ 01 ]" index aligned with the top of the section
   - Main content: Headline & body set in the primary column
   - Bottom row: Supporting subhead & CTA pills on the left, large outlined rounded frame on the right
   - Rises over the sticky hero with shadow as the user scrolls.
*/
export default function Statement() {
  return (
    <section
      id="about"
      className="relative z-10 bg-canvas px-6 py-14 sm:px-10 sm:py-20 md:px-12 lg:px-16 md:pt-24 md:pb-24 min-h-[100svh] shadow-[0_-25px_60px_rgba(0,0,0,0.35)]"
    >
      <div className="relative w-full mx-auto">
        {/* Top Right Index: "[ 01 ]" aligned at the top right of the section */}
        <div className="absolute right-0 top-0 text-xs sm:text-[13px] font-medium tabular-nums z-10">
          <SlideUpText split="characters" delay={0.04}>
            {`[ ${statement.index} ]`}
          </SlideUpText>
        </div>

        {/* Main 2-Column Grid:
            - Left Column (~24%): "Who are we?"
            - Right Column (~76%): Headline, body, subhead, CTAs & outlined box element
        */}
        <div className="grid grid-cols-1 md:grid-cols-[24%_1fr] lg:grid-cols-[22%_1fr] gap-6 md:gap-8 lg:gap-12 pr-12 lg:pr-16">
          {/* Left Column: "Who are we?" */}
          <div className="text-xs sm:text-[13px] font-medium text-ink pt-1 md:pt-2">
            <SlideUpText split="words">
              {statement.label}
            </SlideUpText>
          </div>

          {/* Right Column: Main Content */}
          <div>
            {/* Title / Primary Headline */}
            <h2 className="text-2xl sm:text-3xl font-medium tracking-[-0.02em] md:text-[42px] md:leading-[1.12] lg:text-[48px] xl:text-[52px] text-ink mb-4 sm:mb-6 max-w-[1100px]">
              <SlideUpText split="words" stagger={0.02} delay={0.04}>
                {statement.title}
              </SlideUpText>
            </h2>

            {/* Body Copy */}
            <p className="text-base sm:text-xl leading-[1.42] tracking-[-0.01em] md:text-[21px] md:leading-[1.38] lg:text-[24px] xl:text-[26px] text-ink/90 font-normal max-w-[1100px]">
              <SlideUpText split="words" stagger={0.01} delay={0.08}>
                {statement.body}
              </SlideUpText>
            </p>

            {/* Bottom Row: Subhead & CTAs on the left, Large Outlined Frame on the right */}
            <div className="mt-10 sm:mt-14 md:mt-16 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 md:gap-12 lg:gap-16 items-start">
              {/* Left Subhead & CTA Pills */}
              <div className="max-w-md pt-2">
                <p className="text-base sm:text-lg leading-snug md:text-xl text-ink font-normal mb-6 sm:mb-8">
                  <SlideUpText split="words" stagger={0.02} delay={0.12}>
                    {statement.sub}
                  </SlideUpText>
                </p>

                <div className="flex flex-wrap gap-2.5 sm:gap-3">
                  {statement.ctas.map((cta) => (
                    <a
                      key={cta.label}
                      href={cta.href}
                      data-magnetic
                      className={
                        cta.primary
                          ? "inline-flex h-11 sm:h-12 items-center gap-2.5 sm:gap-3 rounded-full bg-ink px-6 sm:px-7 text-[11px] sm:text-xs font-semibold uppercase tracking-wide text-canvas transition-transform active:scale-95"
                          : "inline-flex h-11 sm:h-12 items-center rounded-full border border-ink px-6 sm:px-7 text-[11px] sm:text-xs font-semibold uppercase tracking-wide text-ink transition-transform active:scale-95 hover:bg-black/5"
                      }
                    >
                      {cta.label}
                      {cta.primary && <span aria-hidden className="text-sm font-bold">+</span>}
                    </a>
                  ))}
                </div>
              </div>

              {/* Right: Outlined Rounded Frame with Sparse Cross Marks */}
              <div
                aria-hidden
                className="relative h-64 w-full max-w-[320px] sm:h-80 sm:max-w-[380px] md:h-[400px] md:w-[400px] lg:h-[440px] lg:w-[440px] rounded-[44px] md:rounded-[52px] border border-ink/80 shrink-0"
              >
                <span className="absolute left-[38%] top-[38%] text-sm sm:text-base leading-none text-ink/70">
                  +
                </span>
                <span className="absolute left-[52%] top-[54%] text-2xl sm:text-3xl leading-none text-ink/85">
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
