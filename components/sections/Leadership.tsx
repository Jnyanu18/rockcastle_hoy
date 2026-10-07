"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SlideUpText from "@/components/ui/SlideUpText";
import FlipCard from "@/components/ui/FlipCard";
import { brand, footer } from "@/lib/content";
import "@/components/sections/Leadership.css";

gsap.registerPlugin(ScrollTrigger);

const PLACEHOLDER_IMAGES = ["/rx/placeholder-1.svg", "/rx/placeholder-2.svg", "/rx/placeholder-3.svg"];

const founders = [
  {
    num: "01",
    track: "STRATEGY & DIRECTION",
    name: "Founder & Creative Director",
    tag: "BRIEF → STRATEGY",
    credential: "12 YRS",
    quote: "Every brief gets interrogated until the idea can survive contact with a deadline.",
    image: PLACEHOLDER_IMAGES[0],
  },
  {
    num: "02",
    track: "CONCEPT & PRODUCTION",
    name: "Head of Production",
    tag: "CONCEPT → SHOOT",
    credential: "9 YRS",
    quote: "A concept that only works as a mood board is not a concept — it's a wish.",
    image: PLACEHOLDER_IMAGES[1],
  },
  {
    num: "03",
    track: "EDIT & DELIVERY",
    name: "Head of Post-Production",
    tag: "EDIT → DELIVERY",
    credential: "10 YRS",
    quote: "The edit is only as good as the footage still on the drive at midnight.",
    image: PLACEHOLDER_IMAGES[2],
  },
];

/** Three studio leads as 3D flip cards, with a kinetic ticker leading into
 * the clients section below. Cards fan out slightly as this section scrolls
 * past, then the ticker scrubs across the screen. */
export default function Leadership() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const cards = root.querySelectorAll<HTMLElement>(".leadership__founder-item");
      const head = root.querySelector<HTMLElement>(".leadership__head");
      const ticker = root.querySelector<HTMLElement>(".leadership__transition-ticker");

      if (cards.length) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.16,
            ease: "power2.out",
            scrollTrigger: {
              trigger: root,
              start: "top 78%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }

      if (!prefersReduced && cards.length >= 3) {
        ScrollTrigger.create({
          trigger: root,
          start: "bottom 92%",
          end: "bottom top",
          scrub: 0.8,
          onUpdate: (self) => {
            const p = self.progress;
            gsap.set(cards[0], { y: -80 * p, rotateZ: -3 * p, scale: 1 - 0.04 * p, opacity: 1 - 0.35 * p });
            gsap.set(cards[1], { y: -105 * p, scale: 1 - 0.05 * p, opacity: 1 - 0.35 * p });
            gsap.set(cards[2], { y: -80 * p, rotateZ: 3 * p, scale: 1 - 0.04 * p, opacity: 1 - 0.35 * p });

            if (head) gsap.set(head, { y: -45 * p, opacity: 1 - 0.45 * p });
            if (ticker) gsap.set(ticker, { xPercent: -22 * p });
          },
        });
      }
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section className="leadership" id="leadership" ref={ref} aria-label="Leadership">
      <div className="leadership__inner">
        <div className="leadership__head">
          <div className="leadership__meta-bar">
            <SlideUpText split="characters" stagger={0.015} inView once className="leadership__tag">
              [ EXECUTIVE DIRECTION ]
            </SlideUpText>
            <SlideUpText split="words" stagger={0.02} delay={0.05} inView once className="leadership__coords">
              {footer.office.lines.slice(1).join(", ").toUpperCase()}
            </SlideUpText>
          </div>

          <h2 className="leadership__title">
            <SlideUpText split="words" stagger={0.03} inView once>
              Three leads personally sign off on every project we ship
            </SlideUpText>
          </h2>

          <p className="leadership__subtitle">
            <SlideUpText split="words" stagger={0.014} delay={0.1} inView once>
              No account managers in between. No diluted briefs. Every film, shoot and edit is steered
              directly by our three studio partners from concept note to final delivery.
            </SlideUpText>
          </p>
        </div>

        <div className="leadership__grid">
          {founders.map((f) => (
            <div className="leadership__founder-item" key={f.name}>
              <div className="leadership__card-header-track">
                <span className="leadership__track-num">{f.num}</span>
                <span className="leadership__track-sep">//</span>
                <SlideUpText split="words" inView once className="leadership__track-label">
                  {f.track}
                </SlideUpText>
              </div>

              <FlipCard
                axis="y"
                flipOnClick
                draggable
                dragDistance={0}
                tilt
                tiltMax={12}
                glare
                glareOpacity={0.24}
                hoverScale={1.03}
                perspective={1100}
                stiffness={170}
                damping={20}
                width={280}
                height={360}
                radius={24}
                background="#141413"
                color="#f5f5f5"
                shadow
                shadowColor="#0c0d0c"
                shadowOpacity={0.35}
                ariaLabel={`${f.name} - ${f.tag}`}
                className="leadership__flipcard"
                front={
                  <div className="leadership__card-front">
                    <img src={f.image} alt={f.name} className="leadership__card-img" />
                    <div className="leadership__card-front-overlay" />
                    <span className="leadership__card-credential">{f.credential}</span>

                    <div className="leadership__card-front-info">
                      <span className="leadership__card-tag">[ {f.tag} ]</span>
                      <h3 className="leadership__card-name">
                        <SlideUpText split="words" inView once delay={0.08}>
                          {f.name}
                        </SlideUpText>
                      </h3>
                      <div className="leadership__card-flip-hint">
                        <span>DRAG OR CLICK TO FLIP</span>
                        <span className="leadership__card-flip-icon">↻</span>
                      </div>
                    </div>
                  </div>
                }
                back={
                  <div className="leadership__card-back">
                    <div className="leadership__card-back-header">
                      <span className="leadership__card-back-tag">[ {f.tag} ]</span>
                      <span className="leadership__card-back-cred">{f.credential}</span>
                    </div>

                    <div className="leadership__card-back-body">
                      <span className="leadership__quote-mark">&ldquo;</span>
                      <p className="leadership__card-quote">{f.quote}</p>

                      <div className="leadership__card-back-divider" />
                      <h4 className="leadership__card-back-name">{f.name}</h4>
                      <span className="leadership__card-back-role">EXECUTIVE LEADERSHIP // {brand.shortName}</span>
                    </div>

                    <div className="leadership__card-back-action">
                      <span>CLICK TO FLIP BACK</span>
                      <span className="leadership__card-flip-icon">↺</span>
                    </div>
                  </div>
                }
              />
            </div>
          ))}
        </div>

        <div className="leadership__transition-wrap" aria-hidden="true">
          <div className="leadership__transition-divider">
            <span className="leadership__transition-dot" />
            <span className="leadership__transition-line" />
            <span className="leadership__transition-badge">SCROLL ↓</span>
            <span className="leadership__transition-line" />
            <span className="leadership__transition-dot" />
          </div>

          <div className="leadership__transition-ticker-track">
            <div className="leadership__transition-ticker">
              {Array.from({ length: 2 }).map((_, i) => (
                <span key={i} style={{ display: "contents" }}>
                  <span>FROM EXECUTIVE SIGN-OFF</span>
                  <span className="leadership__ticker-bullet">✦</span>
                  <span>TO THE EDIT BAY</span>
                  <span className="leadership__ticker-bullet">✦</span>
                  <span>ZERO OUTSOURCING</span>
                  <span className="leadership__ticker-bullet">✦</span>
                  <span>100% IN-HOUSE CREW</span>
                  <span className="leadership__ticker-bullet">✦</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
