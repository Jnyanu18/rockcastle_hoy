"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SlideUpText from "@/components/ui/SlideUpText";
import FlipCard from "@/components/ui/FlipCard";
import { brand, footer } from "@/lib/content";
import "@/components/sections/Leadership.css";

gsap.registerPlugin(ScrollTrigger);

const founders = [
  {
    num: "01",
    track: "STRATEGY & DIRECTION",
    name: "Alok Nagpal",
    tag: "FOUNDER & MANAGING DIRECTOR",
    credential: "16+ YRS",
    quote: "Every experience must transcend ordinary event production — we build living brand worlds that leave indelible marks.",
    photo: "/team/alok-nagpal.png",
  },
  {
    num: "02",
    track: "CONCEPT & EXPERIENCES",
    name: "Pooja Dugar",
    tag: "DIRECTOR & HEAD OF EXPERIENCES",
    credential: "14+ YRS",
    quote: "A true experience is felt in every detail — from the first spatial impression to the final standing ovation.",
    photo: "/team/pooja-dugar.png",
  },
  {
    num: "03",
    track: "SPATIAL & STAGE PRODUCTION",
    name: "Technical & Stage Direction",
    tag: "ARCHITECTURE & FABRICATION",
    credential: "15+ YRS",
    quote: "Precision engineering on the ground turns impossible creative blueprints into flawless reality.",
    photo: "/team/technical-stage-direction.png",
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
          },
        });
      }
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section className="leadership bg-[#f4f6f9]" id="leadership" ref={ref} aria-label="Leadership">
      <div className="leadership__inner">
        <div className="leadership__head">
          <div className="leadership__meta-bar">
            <SlideUpText split="characters" stagger={0.015} inView once className="leadership__tag">
              [ TEAM ]
            </SlideUpText>
            <SlideUpText split="words" stagger={0.02} delay={0.05} inView once className="leadership__coords">
              {footer.office.lines.slice(1).join(", ").toUpperCase()}
            </SlideUpText>
          </div>

          <h2 className="leadership__title">
            <SlideUpText split="words" stagger={0.03} inView once>
              THE PEOPLE BEHIND THE EXPERIENCE
            </SlideUpText>
          </h2>

          <p className="leadership__subtitle">
            <SlideUpText split="words" stagger={0.014} delay={0.1} inView once>
              No layers of separation. No diluted vision. Every benchmark experience, spatial architecture, and live stage is directed directly by our leadership from initial blueprint to final cue.
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
                flipOnClick={false}
                flipOnHover
                draggable={false}
                tilt={false}
                glare={false}
                hoverScale={1}
                perspective={1800}
                stiffness={130}
                damping={24}
                width={280}
                height={360}
                radius={16}
                background="#ffffff"
                color="var(--black)"
                shadow
                shadowColor="#000000"
                shadowOpacity={0.16}
                ariaLabel={`${f.name} - ${f.tag}`}
                className="leadership__flipcard"
                front={
                  <div
                    className="leadership__card-front leadership__card-front--photo"
                    style={{ backgroundImage: `url(${f.photo})` }}
                  >
                    <span className="leadership__card-credential">{f.credential}</span>

                    <div className="leadership__card-front-info">
                      <h3 className="leadership__card-name">
                        <SlideUpText split="words" inView once delay={0.08}>
                          {f.name}
                        </SlideUpText>
                      </h3>
                    </div>
                  </div>
                }
                back={
                  <div className="leadership__card-back">
                    <div className="leadership__card-back-header">
                      <span className="leadership__card-back-cred">{f.credential}</span>
                    </div>

                    <div className="leadership__card-back-body">
                      <span className="leadership__quote-mark">&ldquo;</span>
                      <p className="leadership__card-quote">{f.quote}</p>

                      <div className="leadership__card-back-divider" />
                      <h4 className="leadership__card-back-name">{f.name}</h4>
                      <span className="leadership__card-back-role">EXECUTIVE LEADERSHIP // {brand.shortName}</span>
                    </div>
                  </div>
                }
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
