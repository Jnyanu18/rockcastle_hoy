"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { statement, works } from "@/lib/content";
import SlideUpText from "@/components/ui/SlideUpText";
import "@/components/Statement.css";

gsap.registerPlugin(ScrollTrigger);

/* Statement section: Matches House of Yellow reference design (Screenshots 1 & 2)
   - Left column: "Who are we?" aligned directly with the top of the main headline
   - Right top: "[ 01 ]" index aligned with the top of the section
   - Main content: Headline & body set in the primary column (font-weight: 500, leading: 1.12)
   - Background color: #0A192F (frosted navy, identical to RecentExperiences)
*/
export default function Statement() {
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;

    // JS-driven GSAP animation isn't covered by the global reduced-motion
    // CSS kill-switch, so it needs its own check — skip straight to the
    // final visible state when reduced motion is requested.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const plusTop = box.querySelector<HTMLElement>(".hoy-box-plus-top");
    const plusBottom = box.querySelector<HTMLElement>(".hoy-box-plus-bottom");
    const sparkle = box.querySelector<HTMLElement>(".hoy-box-star-center");

    const ctx = gsap.context(() => {
      gsap.set(box, { opacity: 0, scale: 0.94, transformOrigin: "50% 50%" });
      if (plusTop) gsap.set(plusTop, { opacity: 0, y: 10 });
      if (plusBottom) gsap.set(plusBottom, { opacity: 0, y: 10 });
      if (sparkle) gsap.set(sparkle, { opacity: 0, rotate: -90, scale: 0.6, transformOrigin: "50% 50%" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: box,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      tl.to(box, { opacity: 1, scale: 1, duration: 0.9, ease: "expo.out" }, 0);
      if (plusTop) tl.to(plusTop, { opacity: 1, y: 0, duration: 0.6, ease: "expo.out" }, 0.15);
      if (plusBottom) tl.to(plusBottom, { opacity: 1, y: 0, duration: 0.6, ease: "expo.out" }, 0.25);
      if (sparkle) tl.to(sparkle, { opacity: 1, rotate: 0, scale: 1, duration: 0.8, ease: "expo.out" }, 0.3);
    }, box);

    return () => ctx.revert();
  }, []);

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
        <div aria-hidden className="hoy-box-frame" ref={boxRef}>
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

        {/* =========================================================================
            ROW 3: Section [02] The Works & Narrative (Pulled up at margin-top: -8.6875vw)
            ========================================================================= */}
        <div className="hoy-works-section">
          <div className="hoy-works-cols">
            {/* Left Block: The works + narrative */}
            <div className="hoy-works-left">
              <span className="hoy-works-eyebrow">
                <SlideUpText split="words">
                  {works.label}
                </SlideUpText>
              </span>
              <p className="hoy-works-body">
                <SlideUpText split="words" stagger={0.015} delay={0.04}>
                  {works.body}
                </SlideUpText>
              </p>
            </div>

            {/* Right Block: [ 02 ] + CTA Button */}
            <div className="hoy-works-right">
              <span className="hoy-works-index">
                <SlideUpText split="characters" delay={0.04}>
                  {`[ ${works.index} ]`}
                </SlideUpText>
              </span>
              <a
                href="#recent-experiences"
                data-magnetic
                className="hoy-btn hoy-btn--dark"
              >
                <span>{works.cta}</span>
                <span aria-hidden className="text-sm font-bold">↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
