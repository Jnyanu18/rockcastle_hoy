"use client";

import { statement } from "@/lib/content";
import SlideUpText from "@/components/ui/SlideUpText";
import "@/components/Statement.css";

/* Statement section: Matches House of Yellow reference design (Screenshots 1 & 2)
   - Left column: "Who are we?" aligned directly with the top of the main headline
   - Right top: "[ 01 ]" index aligned with the top of the section
   - Main content: Headline & body set in the primary column (font-weight: 500, leading: 1.12)
   - Middle row: Supporting subhead & CTA pills on the left, large wireframe squircle on the right
   - "The works" row removed: it overlapped with the wireframe squircle's negative margin
   - Background color: #111925 (frosted navy, identical to RecentExperiences)
*/
export default function Statement() {
  return (
    <section id="about" className="hoy-statement">
      <div className="hoy-statement__inner">
        {/* =========================================================================
            ROW 1: Who are we? | Big Statement Headline | [ 01 ]
            ========================================================================= */}
        <div className="hoy-about-cols">
          {/* Col 1: Who are we? */}
          <div className="hoy-about-col--left">
            <span className="hoy-text-eyebrow">
              <SlideUpText split="words">{statement.label}</SlideUpText>
            </span>
          </div>

          {/* Col 2: Big Statement Headline + Subhead + Buttons */}
          <div className="hoy-about-col--center">
            <h1 className="hoy-headline">
              <SlideUpText split="words" stagger={0.012} delay={0.04}>
                {statement.body}
              </SlideUpText>
            </h1>

            <div className="hoy-subhead">
              <SlideUpText split="words" stagger={0.02} delay={0.1}>
                {statement.sub}
              </SlideUpText>
            </div>

            <div className="hoy-buttons">
              {statement.ctas.map((cta) => (
                <a
                  key={cta.label}
                  href={cta.href}
                  data-magnetic
                  className={`hoy-btn ${cta.primary ? "hoy-btn--dark" : "hoy-btn--outline"}`}
                >
                  <span>{cta.label}</span>
                  {cta.primary && <span aria-hidden className="text-sm font-bold">+</span>}
                </a>
              ))}
            </div>
          </div>

          {/* Col 3: [ 01 ] Index (Far right margin) */}
          <div className="hoy-about-col--right">
            <span className="hoy-text-index">
              <SlideUpText split="characters" delay={0.04}>
                {`[ ${statement.index} ]`}
              </SlideUpText>
            </span>
          </div>
        </div>

        {/* =========================================================================
            ROW 2 (BOX THING): Wireframe Squircle with Top +, Center ✦, Bottom +
            (Positioned at margin-left: 51.875vw, margin-top: -6.25vw)
            ========================================================================= */}
        <div aria-hidden className="hoy-box-frame">
          <span className="hoy-box-plus-top">+</span>
          <span className="hoy-box-star-center">
            <svg width="34" height="34" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 sm:w-8 sm:h-8 md:w-[2.2vw] md:h-[2.2vw]">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M38.7132 18.3933L27.2026 18.3933C23.5585 18.3933 20.6051 15.4398 20.6051 11.7958L20.6051 0.28678C20.6051 0.128559 20.4765 3.58023e-06 20.3183 3.55256e-06L18.68 3.26612e-06C18.5218 3.23846e-06 18.3933 0.128558 18.3933 0.28678L18.3933 11.7974C18.3933 15.4414 15.4398 18.3949 11.7958 18.3949L0.286777 18.3949C0.128556 18.3949 5.75951e-07 18.5235 5.48286e-07 18.6817L2.61845e-07 20.3199C2.34181e-07 20.4782 0.128555 20.6067 0.286777 20.6067L11.7974 20.6067C15.4414 20.6067 18.3949 23.5602 18.3949 27.2042L18.3949 38.7149C18.3949 38.8731 18.5235 39.0016 18.6817 39.0016L20.3199 39.0016C20.4782 39.0016 20.6067 38.8731 20.6067 38.7149L20.6067 27.2042C20.6067 23.5602 23.5602 20.6067 27.2042 20.6067L38.7149 20.6067C38.8731 20.6067 39.0016 20.4782 39.0016 20.32L39.0016 18.6817C39.0016 18.5235 38.8731 18.3949 38.7149 18.3949L38.7132 18.3933Z"
                fill="#f4f6f9"
              />
            </svg>
          </span>
          <span className="hoy-box-plus-bottom">+</span>
        </div>
      </div>
    </section>
  );
}
