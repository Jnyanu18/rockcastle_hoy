"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BookPlaneDrawing } from "@/components/figma/Drawings";
import SlideUpText from "@/components/ui/SlideUpText";
import "@/components/sections/ScrollingServices.css";

gsap.registerPlugin(ScrollTrigger);

type DeckItem = {
  index?: string;
  art?: boolean;
  line1: string;
  line2?: string;
  desc: string;
  buttonText?: string;
  link?: string;
  images?: string[];
};

// Reuses the same three services shown in the Services section, split into
// the two balanced headline lines this deck expects.
const DEFAULT_ITEMS: DeckItem[] = [
  {
    art: true,
    line1: "Behind every experience,",
    line2: "there’s a story.",
    desc: "From the first spark of an idea to the final moment, explore the thinking, creativity and craftsmanship behind some of our most memorable brand experiences.",
    images: ["/rx/service-07-1.jpg", "/rx/service-06-1.jpg", "/rx/service-07-3.jpg", "/rx/service-07-2.jpg"],
  },
  {
    index: "05",
    line1: "STORIES WE’VE",
    line2: "BROUGHT TO LIFE",
    desc: "From landmark corporate summits and public festivals to immersive brand pavilions — we engineer spaces that captivate thousands and create permanent brand recall.",
    buttonText: "Explore Stories",
    link: "#recent-experiences",
    images: ["/rx/cover-1.jpg", "/rx/cover-2.jpg", "/rx/cover-3.jpg", "/rx/cover-4.jpg"],
  },
  {
    index: "06",
    line1: "Awards & Recognition —",
    line2: "WORK THAT GETS NOTICED",
    desc: "Industry-celebrated IPs, EEMA-recognized experiential executions, and landmark corporate spectacles trusted by top global brands and institutions across India.",
    buttonText: "Work That Gets Noticed",
    link: "#contact",
    images: ["/rx/service-07-1.jpg", "/rx/service-07-2.jpg", "/rx/service-07-3.jpg", "/rx/service-07-4.jpg"],
  },
];

type Props = {
  items?: DeckItem[];
  id?: string;
};

/**
 * Scrolling services deck: cards stack one over another as you scroll.
 * Non-active cards are completely hidden and unclickable so they cannot
 * be triggered by hovering or clicking.
 */
export default function ScrollingServices({ items, id = "capabilities" }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);
  const stRef = useRef<ScrollTrigger | null>(null);
  const data = items || DEFAULT_ITEMS;

  useEffect(() => {
    const section = sectionRef.current;
    const scrollContainer = scrollContainerRef.current;
    const itemsEl = itemsRef.current;
    if (!section || !scrollContainer || !itemsEl) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const itemEls = Array.from(section.querySelectorAll<HTMLElement>(".scrollItem"));
    if (!itemEls.length) return;

    // Read natural content heights and collapsed line 1 heights
    const readDimensions = () => {
      gsap.set(itemEls, { clearProps: "height,transform,opacity,visibility" });

      const minHeights = itemEls.map((item) => {
        const line1El = item.querySelector(".normalTitleLine--1");
        if (line1El) {
          const rect = line1El.getBoundingClientRect();
          return Math.ceil(rect.height);
        }
        return 42;
      });

      const innerHeights = itemEls.map((item) => {
        const inner = item.querySelector(".innerItem");
        return inner ? Math.ceil(inner.getBoundingClientRect().height) : 560;
      });

      const containerH = itemsEl.clientHeight || 850;

      return { minHeights, innerHeights, containerH };
    };

    let { minHeights, innerHeights, containerH } = readDimensions();
    let lastActiveIndex = -1;

    // Timeline: card 0 dwells, then each following card rises and stacks in
    // (collapsing the one before it), with a short dwell between transitions.
    const N = itemEls.length;
    const START = 0.18;
    const TRANS = 0.28;
    const DWELL = 0.12;
    const END = 0.14;
    const TOTAL = START + (N - 1) * TRANS + (N - 2) * DWELL + END;
    const tStart = itemEls.map((_, i) => (START + (i - 1) * (TRANS + DWELL)) / TOTAL);
    const tEnd = itemEls.map((_, i) => (START + (i - 1) * (TRANS + DWELL) + TRANS) / TOTAL);

    const updateCards = (progress: number) => {
      const p = Math.max(0, Math.min(1, progress));
      const gap = 8;
      const FADED_OPACITY = 0.28;

      // Active card switches at the midpoint of each transition
      let activeIndex = 0;
      for (let k = 1; k < N; k++) {
        if (p >= (tStart[k] + tEnd[k]) / 2) activeIndex = k;
      }

      const min = (i: number) => minHeights[i] || 42;
      const inner = (i: number) => innerHeights[i] || 560;
      const rise = (i: number) =>
        i === 0 ? 1 : Math.max(0, Math.min(1, (p - tStart[i]) / (tEnd[i] - tStart[i])));

      const states = itemEls.map((_, i) => {
        const tIn = rise(i);
        const collapse = i + 1 < N ? rise(i + 1) : 0;
        const e = tIn * (1 - collapse);

        let topY = 0;
        for (let j = 0; j < i; j++) topY += min(j) + gap;
        let below = 0;
        for (let j = i; j < N; j++) below += min(j);
        const botY = Math.max(topY, containerH - below - gap * (N - 1 - i));

        return {
          y: i === 0 ? 0 : botY + (topY - botY) * tIn,
          height: min(i) + (inner(i) - min(i)) * e,
          opacity: FADED_OPACITY + (1 - FADED_OPACITY) * e,
        };
      });

      const activeIndexChanged = activeIndex !== lastActiveIndex;
      if (activeIndexChanged) {
        lastActiveIndex = activeIndex;
      }

      itemEls.forEach((item, i) => {
        const state = states[i];
        if (!state) return;

        const isActive = activeIndex === i && state.opacity >= 0.85;

        gsap.set(item, {
          y: Math.round(state.y),
          height: Math.round(state.height),
          opacity: state.opacity,
          visibility: "visible",
          pointerEvents: isActive ? "auto" : "none",
        });

        if (activeIndexChanged) {
          item.classList.remove("ss__item--past", "ss__item--active", "ss__item--upcoming");
          if (i < activeIndex) {
            item.classList.add("ss__item--past");
          } else if (i === activeIndex) {
            item.classList.add("ss__item--active");
          } else {
            item.classList.add("ss__item--upcoming");
          }
        }
      });
    };

    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        trigger: scrollContainer,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          updateCards(self.progress);
        },
      });

      stRef.current = st;
      updateCards(st.progress || 0);
    }, section);

    // Re-measure after images load to ensure perfect pixel heights
    const imgs = Array.from(section.querySelectorAll("img"));
    let loadedCount = 0;
    const onImgLoad = () => {
      loadedCount++;
      if (loadedCount >= imgs.length) {
        ({ minHeights, innerHeights } = readDimensions());
        if (stRef.current) updateCards(stRef.current.progress || 0);
      }
    };

    imgs.forEach((img) => {
      if (img.complete) {
        onImgLoad();
      } else {
        img.addEventListener("load", onImgLoad, { once: true });
      }
    });

    // Debounced window resize recalculation
    let resizeTimer: ReturnType<typeof setTimeout> | null = null;
    const handleResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        ({ minHeights, innerHeights } = readDimensions());
        if (stRef.current) updateCards(stRef.current.progress || 0);
      }, 150);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (resizeTimer) clearTimeout(resizeTimer);
      ctx.revert();
    };
  }, [data.length]);

  return (
    <section className="servicesBlock bg-[#fff1e7]" id={id} ref={sectionRef} style={{ backgroundColor: "#fff1e7" }}>
      <div className="howWeRollItemsBlock">
        <div className="scrollContainer" ref={scrollContainerRef}>
          <div className="stickyWrapper">
            <span className="sideCross sideCross--left" aria-hidden="true">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0 C12 6.627 6.627 12 0 12 C6.627 12 12 17.373 12 24 C12 17.373 17.373 12 24 12 C17.373 12 12 6.627 12 0 Z" />
              </svg>
            </span>
            <span className="sideCross sideCross--right" aria-hidden="true">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0 C12 6.627 6.627 12 0 12 C6.627 12 12 17.373 12 24 C12 17.373 17.373 12 24 12 C17.373 12 12 6.627 12 0 Z" />
              </svg>
            </span>
            <div className="items" ref={itemsRef}>
              {data.map((item, i) => {
                const line1 = item.line1;
                const line2 = item.line2 || "";

                return (
                  <div
                    className={`scrollItem ${i === 0 ? "ss__item--active" : "ss__item--upcoming"}`}
                    key={item.index || i}
                    data-index={i}
                  >
                    <div className="innerContainer">
                      <div className="innerItem">
                        {item.art && <BookPlaneDrawing className="ss__art is-in" />}
                        <div className="normalTitle">
                          <div className="normalTitleLine normalTitleLine--1">
                            {item.index && (
                              <span className="numIndex">
                                <SlideUpText split="characters" inView once stagger={0.02}>
                                  {`[ ${item.index} ]`}
                                </SlideUpText>
                              </span>
                            )}
                            <span className="titleText titleText--1">
                              <SlideUpText split="words" inView once stagger={0.025}>
                                {line1}
                              </SlideUpText>
                            </span>
                          </div>

                          {line2 && (
                            <div className="normalTitleLine normalTitleLine--2">
                              <span className="titleText titleText--2">
                                <SlideUpText split="words" inView once stagger={0.025} delay={0.06}>
                                  {line2}
                                </SlideUpText>
                              </span>
                              {item.link && (
                                <span className="buttonWrapper">
                                  <Link
                                    href={item.link}
                                    data-magnetic
                                    className="arrowButton"
                                    aria-label={`Explore ${line1} ${line2}`}
                                  >
                                    <svg viewBox="0 0 24 24">
                                      <path
                                        d="M5 12h14M13 6l6 6-6 6"
                                        stroke="currentColor"
                                        strokeWidth="2.2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        fill="none"
                                      />
                                    </svg>
                                  </Link>
                                </span>
                              )}
                            </div>
                          )}
                        </div>

                        <div className="itemText">
                          <p>
                            <SlideUpText split="words" inView once stagger={0.015} delay={0.1}>
                              {item.desc}
                            </SlideUpText>
                          </p>
                          {item.buttonText && item.link && (
                            <div className="buttonRow">
                              <Link href={item.link} data-magnetic className="ss__cta-btn">
                                <span>{item.buttonText}</span>
                                <span className="ss__cta-arrow" aria-hidden="true">→</span>
                              </Link>
                            </div>
                          )}
                        </div>

                        {item.images && item.images.length > 0 && (
                          <div className="images">
                            {item.images.map((src, j) => (
                              <div className="imageWrapper" key={j} data-cursor="view">
                                <img src={src} alt={`${line1} — visual ${j + 1}`} loading="lazy" />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
