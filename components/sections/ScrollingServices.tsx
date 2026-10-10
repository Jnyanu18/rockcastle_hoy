"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SlideUpText from "@/components/ui/SlideUpText";
import "@/components/sections/ScrollingServices.css";

gsap.registerPlugin(ScrollTrigger);

type DeckItem = {
  index: string;
  line1: string;
  line2?: string;
  desc: string;
  buttonText?: string;
  link?: string;
  images?: string[];
};

// Reuses the original project images and services split into two balanced headline lines
const DEFAULT_ITEMS: DeckItem[] = [
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
    line1: "EXPERIENCES UN-LTD —",
    line2: "SPATIAL & PRODUCTION",
    desc: "360-degree event architecture, cutting-edge stage engineering, immersive AV technology, and turnkey fabrication built to transform any venue into an extraordinary world.",
    buttonText: "Our Capabilities",
    link: "#contact",
    images: ["/rx/service-06-1.jpg", "/rx/service-06-2.jpg", "/rx/cover-3.jpg", "/rx/cover-2.jpg"],
  },
  {
    index: "07",
    line1: "AWARDS & RECOGNITION —",
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
 * Scrolling services deck: only the active card is visible and interactive.
 * Non-active cards are hidden and cannot be clicked or hovered over.
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

    // Read natural content heights
    const readDimensions = () => {
      gsap.set(itemEls, { clearProps: "height,transform,opacity,visibility" });

      const innerHeights = itemEls.map((item) => {
        const inner = item.querySelector(".innerItem");
        return inner ? Math.ceil(inner.getBoundingClientRect().height) : 560;
      });

      const containerH = itemsEl.clientHeight || 850;

      return { innerHeights, containerH };
    };

    let { innerHeights, containerH } = readDimensions();
    let lastActiveIndex = -1;

    // Timeline keyframes:
    // 0.00 - 0.20: Card 0 active and fully visible; Cards 1 & 2 hidden
    // 0.20 - 0.48: Transition 0 -> 1 (Card 1 rises smoothly from bottom to top; Card 0 fades out)
    // 0.48 - 0.60: Card 1 active and fully visible; Cards 0 & 2 hidden
    // 0.60 - 0.88: Transition 1 -> 2 (Card 2 rises smoothly from bottom to top; Card 1 fades out)
    // 0.88 - 1.00: Card 2 active and fully visible; Cards 0 & 1 hidden

    const DWELL_1 = 0.20;
    const TRANS_1_2_END = 0.48;
    const DWELL_2 = 0.60;
    const TRANS_2_3_END = 0.88;

    const updateCards = (progress: number) => {
      const p = Math.max(0, Math.min(1, progress));
      const currentContainerH = containerH;

      // Determine active index for class tagging
      let activeIndex = 0;
      if (p >= 0.74) {
        activeIndex = 2;
      } else if (p >= 0.34) {
        activeIndex = 1;
      } else {
        activeIndex = 0;
      }

      const inner0 = innerHeights[0] || 560;
      const inner1 = innerHeights[1] || 560;
      const inner2 = innerHeights[2] || 560;

      // Card 0
      let c0_y = 0;
      let c0_height = inner0;
      let c0_opacity = 0;
      if (p <= DWELL_1) {
        c0_y = 0;
        c0_opacity = 1;
      } else if (p < TRANS_1_2_END) {
        const t = (p - DWELL_1) / (TRANS_1_2_END - DWELL_1);
        c0_y = -Math.round(40 * t);
        c0_opacity = 1 - t;
      } else {
        c0_y = -40;
        c0_opacity = 0;
      }

      // Card 1
      let c1_y: number;
      let c1_height = inner1;
      let c1_opacity: number;
      if (p <= DWELL_1) {
        c1_y = currentContainerH;
        c1_opacity = 0;
      } else if (p < TRANS_1_2_END) {
        const t = (p - DWELL_1) / (TRANS_1_2_END - DWELL_1);
        c1_y = Math.round(currentContainerH * (1 - t));
        c1_opacity = t;
      } else if (p <= DWELL_2) {
        c1_y = 0;
        c1_opacity = 1;
      } else if (p < TRANS_2_3_END) {
        const t = (p - DWELL_2) / (TRANS_2_3_END - DWELL_2);
        c1_y = -Math.round(40 * t);
        c1_opacity = 1 - t;
      } else {
        c1_y = -40;
        c1_opacity = 0;
      }

      // Card 2
      let c2_y: number;
      let c2_height = inner2;
      let c2_opacity: number;
      if (p <= DWELL_2) {
        c2_y = currentContainerH;
        c2_opacity = 0;
      } else if (p < TRANS_2_3_END) {
        const t = (p - DWELL_2) / (TRANS_2_3_END - DWELL_2);
        c2_y = Math.round(currentContainerH * (1 - t));
        c2_opacity = t;
      } else {
        c2_y = 0;
        c2_opacity = 1;
      }

      const states = [
        { y: c0_y, height: c0_height, opacity: c0_opacity },
        { y: c1_y, height: c1_height, opacity: c1_opacity },
        { y: c2_y, height: c2_height, opacity: c2_opacity },
      ];

      const activeIndexChanged = activeIndex !== lastActiveIndex;
      if (activeIndexChanged) {
        lastActiveIndex = activeIndex;
      }

      itemEls.forEach((item, i) => {
        const state = states[i];
        if (!state) return;

        const isVisible = state.opacity > 0.005;
        const isActive = activeIndex === i && state.opacity >= 0.85;

        gsap.set(item, {
          y: Math.round(state.y),
          height: Math.round(state.height),
          opacity: state.opacity,
          visibility: isVisible ? "visible" : "hidden",
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
        ({ innerHeights } = readDimensions());
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
        ({ innerHeights, containerH } = readDimensions());
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
    <section className="servicesBlock bg-[#0A192F]" id={id} ref={sectionRef} style={{ backgroundColor: "#0A192F" }}>
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
                        <div className="normalTitle">
                          <div className="normalTitleLine normalTitleLine--1">
                            <span className="numIndex">
                              <SlideUpText split="characters" inView once stagger={0.02}>
                                {`[ ${item.index} ]`}
                              </SlideUpText>
                            </span>
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
