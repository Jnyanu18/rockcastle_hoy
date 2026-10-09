"use client";

import { statement } from "@/lib/content";
import SlideUpText from "@/components/ui/SlideUpText";
import "@/components/Statement.css";

/* Statement section: Matches House of Yellow reference design (Screenshots 1 & 2)
   - Left column: "Who are we?" aligned directly with the top of the main headline
   - Right top: "[ 01 ]" index aligned with the top of the section
   - Main content: Headline & body set in the primary column (font-weight: 500, leading: 1.12)
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
      </div>
    </section>
  );
}
