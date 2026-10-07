"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SlideUpText from "@/components/ui/SlideUpText";
import { services } from "@/lib/content";
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

const PLACEHOLDER_IMAGES = ["/rx/placeholder-1.svg", "/rx/placeholder-2.svg", "/rx/placeholder-3.svg", "/rx/placeholder-4.svg"];

// Reuses the same three services shown in the Services section, split into
// the two balanced headline lines this deck expects.
const DEFAULT_ITEMS: DeckItem[] = [
  {
    index: "05",
    line1: "STORIES WE’VE",
    line2: "BROUGHT TO LIFE",
    desc: "From landmark corporate summits and public festivals to immersive brand pavilions — we engineer spaces that captivate thousands and create permanent brand recall.",
    buttonText: "Explore Stories",
    link: "#recent-experiences",
    images: PLACEHOLDER_IMAGES,
  },
  {
    index: "06",
    line1: "EXPERIENCES UN-LTD —",
    line2: "SPATIAL & PRODUCTION",
    desc: "360-degree event architecture, cutting-edge stage engineering, immersive AV technology, and turnkey fabrication built to transform any venue into an extraordinary world.",
    buttonText: "Our Capabilities",
    link: "#contact",
    images: PLACEHOLDER_IMAGES,
  },
  {
    index: "07",
    line1: "Awards & Recognition —",
    line2: "WORK THAT GETS NOTICED",
    desc: "Industry-celebrated IPs, EEMA-recognized experiential executions, and landmark corporate spectacles trusted by top global brands and institutions across India.",
    buttonText: "Work That Gets Noticed",
    link: "#contact",
    images: PLACEHOLDER_IMAGES,
  },
];

type Props = {
  items?: DeckItem[];
  id?: string;
};

/**
 * Scrolling services deck: three cards pinned in one viewport. The active
 * card shows full height with its image grid; the other two dock as dimmed
 * headline tabs at top/bottom and rise/collapse as the section scrolls.
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
      gsap.set(itemEls, { clearProps: "height,transform" });

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

      return { minHeights, innerHeights };
    };

    let { minHeights, innerHeights } = readDimensions();

    // Timeline keyframes:
    // 0.00 - 0.18: Card 0 dwell (active), Card 1 & 2 docked at the bottom of the page
    // 0.18 - 0.46: Transition 0 -> 1 (Card 1 rises smoothly from bottom up to top; Card 0 collapses)
    // 0.46 - 0.58: Card 1 dwell (active), Card 0 docked at top, Card 2 docked at the bottom of the page
    // 0.58 - 0.86: Transition 1 -> 2 (Card 2 rises smoothly from bottom up to top; Card 1 collapses)
    // 0.86 - 1.00: Card 2 dwell (active), Card 0 & 1 docked at top

    const DWELL_1 = 0.18;
    const TRANS_1_2_END = 0.46;
    const DWELL_2 = 0.58;
    const TRANS_2_3_END = 0.86;

    const updateCards = (progress: number) => {
      const p = Math.max(0, Math.min(1, progress));
      const containerH = itemsRef.current ? itemsRef.current.clientHeight : 850;
      const gap = 8;

      // Determine active index for class tagging
      let activeIndex = 0;
      if (p >= 0.7) {
        activeIndex = 2;
      } else if (p >= 0.32) {
        activeIndex = 1;
      } else {
        activeIndex = 0;
      }

      const min0 = minHeights[0] || 42;
      const min1 = minHeights[1] || 42;
      const min2 = minHeights[2] || 42;

      const inner0 = innerHeights[0] || 560;
      const inner1 = innerHeights[1] || 560;
      const inner2 = innerHeights[2] || 560;

      // Card 0: always at top: y = 0
      let c0_t = 0;
      if (p <= DWELL_1) {
        c0_t = 0;
      } else if (p < TRANS_1_2_END) {
        c0_t = (p - DWELL_1) / (TRANS_1_2_END - DWELL_1);
      } else {
        c0_t = 1;
      }
      const c0_height = inner0 - (inner0 - min0) * c0_t;
      const c0_opacity = 1 - (1 - 0.28) * c0_t;
      const c0_y = 0;

      // Card 1: top position: min0 + gap; bottom position: containerH - min2 - gap - min1
      const c1_topY = min0 + gap;
      const c1_botY = Math.max(c1_topY, containerH - min2 - gap - min1);

      let c1_y: number, c1_height: number, c1_opacity: number;
      if (p <= DWELL_1) {
        c1_y = c1_botY;
        c1_height = min1;
        c1_opacity = 0.28;
      } else if (p < TRANS_1_2_END) {
        const t = (p - DWELL_1) / (TRANS_1_2_END - DWELL_1);
        c1_y = c1_botY - (c1_botY - c1_topY) * t;
        c1_height = min1 + (inner1 - min1) * t;
        c1_opacity = 0.28 + (1 - 0.28) * t;
      } else if (p <= DWELL_2) {
        c1_y = c1_topY;
        c1_height = inner1;
        c1_opacity = 1;
      } else if (p < TRANS_2_3_END) {
        const t = (p - DWELL_2) / (TRANS_2_3_END - DWELL_2);
        c1_y = c1_topY;
        c1_height = inner1 - (inner1 - min1) * t;
        c1_opacity = 1 - (1 - 0.28) * t;
      } else {
        c1_y = c1_topY;
        c1_height = min1;
        c1_opacity = 0.28;
      }

      // Card 2: top position: min0 + gap + min1 + gap; bottom position: containerH - min2
      const c2_topY = min0 + gap + min1 + gap;
      const c2_botY = Math.max(c2_topY, containerH - min2);

      let c2_y: number, c2_height: number, c2_opacity: number;
      if (p <= DWELL_2) {
        c2_y = c2_botY;
        c2_height = min2;
        c2_opacity = 0.28;
      } else if (p < TRANS_2_3_END) {
        const t = (p - DWELL_2) / (TRANS_2_3_END - DWELL_2);
        c2_y = c2_botY - (c2_botY - c2_topY) * t;
        c2_height = min2 + (inner2 - min2) * t;
        c2_opacity = 0.28 + (1 - 0.28) * t;
      } else {
        c2_y = c2_topY;
        c2_height = inner2;
        c2_opacity = 1;
      }

      const states = [
        { y: c0_y, height: c0_height, opacity: c0_opacity },
        { y: c1_y, height: c1_height, opacity: c1_opacity },
        { y: c2_y, height: c2_height, opacity: c2_opacity },
      ];

      itemEls.forEach((item, i) => {
        const state = states[i];
        if (!state) return;

        gsap.set(item, {
          y: Math.round(state.y),
          height: Math.round(state.height),
          opacity: state.opacity,
        });

        item.classList.remove("ss__item--past", "ss__item--active", "ss__item--upcoming");
        if (i < activeIndex) {
          item.classList.add("ss__item--past");
        } else if (i === activeIndex) {
          item.classList.add("ss__item--active");
        } else {
          item.classList.add("ss__item--upcoming");
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

  // Click on a title to smoothly scroll directly to that card
  const handleTitleClick = (targetIndex: number) => {
    if (!stRef.current) return;
    const st = stRef.current;
    let targetProgress = 0.05;
    if (targetIndex === 1) {
      targetProgress = 0.52;
    } else if (targetIndex === 2) {
      targetProgress = 0.94;
    }
    const scrollY = st.start + targetProgress * (st.end - st.start);
    window.scrollTo({ top: scrollY, behavior: "smooth" });
  };

  return (
    <section className="servicesBlock" id={id} ref={sectionRef}>
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
                        <div
                          className="normalTitle"
                          onClick={() => handleTitleClick(i)}
                          title={`Jump to ${line1} ${line2}`}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              handleTitleClick(i);
                            }
                          }}
                        >
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
                                    onClick={(e) => e.stopPropagation()}
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
                              <Link href={item.link} data-magnetic className="ss__cta-btn" onClick={(e) => e.stopPropagation()}>
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
