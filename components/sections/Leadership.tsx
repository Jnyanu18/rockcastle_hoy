"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SlideUpText from "@/components/ui/SlideUpText";
import "@/components/sections/Leadership.css";

gsap.registerPlugin(ScrollTrigger);

const people = [
  {
    num: "01",
    track: "Strategy & Direction",
    name: "Alok Nagpal",
    role: "Founder & Managing Director",
    years: "16",
    quote: "Every experience must transcend ordinary event production — we build living brand worlds that leave indelible marks.",
    photo: "/team/alok-nagpal.png",
  },
  {
    num: "02",
    track: "Concept & Experiences",
    name: "Pooja Dugar",
    role: "Director & Head of Experiences",
    years: "14",
    quote: "A true experience is felt in every detail — from the first spatial impression to the final standing ovation.",
    photo: "/team/pooja-dugar.png",
  },
  {
    num: "03",
    track: "Spatial & Stage Production",
    name: "Technical & Stage Direction",
    role: "Architecture & Fabrication",
    years: "15",
    quote: "Precision engineering on the ground turns impossible creative blueprints into flawless reality.",
    photo: "/team/technical-stage-direction.png",
  },
];

/** Pinned, scroll-driven "chapters": the section sticks to the screen and walks
 * through the three leaders — arch portrait, orbiting badge, name index and
 * quote all change together. Below 900px it falls back to a simple stack. */
export default function Leadership() {
  const ref = useRef<HTMLElement>(null);
  const stRef = useRef<ScrollTrigger | null>(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 901px)", () => {
      const st = ScrollTrigger.create({
        trigger: root,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          root.style.setProperty("--p", String(self.progress));
          const idx = Math.min(people.length - 1, Math.floor(self.progress * people.length));
          if (idx !== activeRef.current) {
            activeRef.current = idx;
            setActive(idx);
          }
        },
      });
      stRef.current = st;
      return () => {
        st.kill();
        stRef.current = null;
      };
    });

    return () => mm.revert();
  }, []);

  const jumpTo = (i: number) => {
    const st = stRef.current;
    if (!st) {
      setActive(i);
      return;
    }
    const y = st.start + ((i + 0.5) / people.length) * (st.end - st.start);
    if (window.__lenis) window.__lenis.scrollTo(y, { duration: 1.1 });
    else window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <section className="leadership" id="leadership" ref={ref} aria-label="Leadership">
      {/* ---------- Desktop: pinned stage ---------- */}
      <div className="leadership__sticky">
        <div className="leadership__top">
          <span className="leadership__label">[ TEAM ]</span>
          <span className="leadership__counter">
            0{active + 1} <i>/</i> 0{people.length}
          </span>
        </div>
        <div className="leadership__progress" aria-hidden="true">
          <span />
        </div>

        <div className="leadership__stage">
          <div className="leadership__bgnums" aria-hidden="true">
            {people.map((p, i) => (
              <span key={p.num} className={i === active ? "is-active" : ""}>
                {p.num}
              </span>
            ))}
          </div>

          {/* left: heading + name index */}
          <div className="leadership__col leadership__col--left">
            <h2 className="leadership__title">
              <SlideUpText split="words" stagger={0.03} inView once>
                The people behind the experience
              </SlideUpText>
            </h2>

            <ul className="leadership__names">
              {people.map((p, i) => (
                <li key={p.name}>
                  <button
                    type="button"
                    className={`leadership__name-btn${i === active ? " is-active" : ""}`}
                    onClick={() => jumpTo(i)}
                    aria-current={i === active}
                  >
                    <i className="leadership__marker" aria-hidden="true" />
                    <span>{p.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* centre: arch portraits + orbiting badge */}
          <div className="leadership__col leadership__col--centre">
            <div className="leadership__arch">
              {people.map((p, i) => (
                <div key={p.name} className={`leadership__arch-item${i === active ? " is-active" : ""}`}>
                  <div className="leadership__photo" style={{ backgroundImage: `url(${p.photo})` }} />
                </div>
              ))}

              <div className="leadership__badge" aria-hidden="true">
                {people.map((p, i) => (
                  <svg key={p.name} viewBox="0 0 200 200" className={i === active ? "is-active" : ""}>
                    <defs>
                      <path id={`lb-${i}`} d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
                    </defs>
                    <circle cx="100" cy="100" r="98" className="leadership__badge-bg" />
                    <text className="leadership__badge-text">
                      <textPath href={`#lb-${i}`} textLength="486" lengthAdjust="spacing">
                        {`${p.years}+ YEARS • ${p.track.toUpperCase()} • `}
                      </textPath>
                    </text>
                  </svg>
                ))}
                <i className="leadership__badge-dot" />
              </div>
            </div>
          </div>

          {/* right: intro + details for the active person */}
          <div className="leadership__col leadership__col--right">
            <p className="leadership__subtitle">
              No layers of separation. Every benchmark experience, spatial architecture and live stage is directed by our leadership, from the first blueprint to the final cue.
            </p>

            <div className="leadership__details">
              {people.map((p, i) => (
                <div key={p.name} className={`leadership__detail${i === active ? " is-active" : ""}`}>
                  <span className="leadership__pill">{p.track}</span>
                  <h3 className="leadership__role">{p.role}</h3>
                  <p className="leadership__quote">&ldquo;{p.quote}&rdquo;</p>
                  <div className="leadership__years">
                    <b>{p.years}+</b>
                    <span>years of experience</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ---------- Mobile / tablet: simple stack ---------- */}
      <div className="leadership__mobile">
        <div className="leadership__top">
          <span className="leadership__label">[ TEAM ]</span>
          <span className="leadership__counter">(03)</span>
        </div>
        <h2 className="leadership__title leadership__title--m">The people behind the experience</h2>
        <p className="leadership__subtitle leadership__subtitle--m">
          No layers of separation. Every benchmark experience, spatial architecture and live stage is directed by our leadership, from the first blueprint to the final cue.
        </p>
        {people.map((p) => (
          <article className="leadership__mcard" key={p.name}>
            <div className="leadership__march">
              <div className="leadership__photo is-static" style={{ backgroundImage: `url(${p.photo})` }} />
            </div>
            <span className="leadership__pill">{p.track}</span>
            <h3 className="leadership__mname">{p.name}</h3>
            <span className="leadership__mrole">
              {p.role} · {p.years}+ yrs
            </span>
            <p className="leadership__quote">&ldquo;{p.quote}&rdquo;</p>
          </article>
        ))}
      </div>
    </section>
  );
}
