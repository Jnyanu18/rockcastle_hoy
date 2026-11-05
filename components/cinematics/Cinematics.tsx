"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { brand } from "@/lib/content";
import "./cinematics.css";

gsap.registerPlugin(ScrollTrigger);

/* -------------------------------------------------------------------------- */
/*  Cinematic layer for the home page. It adds motion on top of the existing  */
/*  components without changing their markup or styling:                      */
/*   1. Opening title sequence (once per browser session)                     */
/*   2. Hero camera push on open, then the hero recedes as "Who are we" rises */
/*   3. Follow-spot that tracks the pointer across the dark sections          */
/*   4. Statement emblem: frame wipes in, star turns with scroll              */
/*   5. Work plates: the lens settles as each plate arrives                   */
/*   6. Client marquee picks up momentum from scroll speed                    */
/*   7. Contact lifts away and the footer rises into focus                    */
/*   8. A fine film grain over everything                                     */
/*  Everything is skipped under prefers-reduced-motion (the grain stays still).*/
/* -------------------------------------------------------------------------- */

const SESSION_KEY = "rc-cine-intro-v3";
const EXPO_IN_OUT = "expo.inOut";
const EXPO_OUT = "expo.out";

type LenisLike = { stop: () => void; start: () => void };
const lenis = () => (window as unknown as { __lenis?: LenisLike }).__lenis;

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function seenIntro() {
  try {
    return sessionStorage.getItem(SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

function markIntroSeen() {
  try {
    sessionStorage.setItem(SESSION_KEY, "1");
  } catch {
    /* private mode: the intro simply plays again next load */
  }
}

/* ---------------------------- 1. Title sequence --------------------------- */

function TitleSequence({ onDone }: { onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    if (seenIntro() || reducedMotion()) {
      setShow(false);
      onDone();
      return;
    }

    const html = document.documentElement;
    html.classList.add("cine-intro");
    lenis()?.stop();
    window.scrollTo(0, 0);

    const hero = document.getElementById("home");
    const q = gsap.utils.selector(el);
    const counter = el.querySelector<HTMLElement>("[data-count]");
    const tc = { f: 0 };

    // Measure SVG handwriting stroke lengths and prime strokeDasharray/offset
    const strokes = el.querySelectorAll<SVGPathElement>("[data-write-stroke]");
    strokes.forEach((p) => {
      const len = p.getTotalLength();
      p.style.strokeDasharray = `${len}`;
      p.style.strokeDashoffset = `${len}`;
    });

    const finish = () => {
      html.classList.remove("cine-intro");
      lenis()?.start();
      markIntroSeen();
      setShow(false);
      onDone();
    };

    const tl = gsap.timeline({ onComplete: finish });
    tl.set(hero, { "--cine-zoom": 1.18 })
      .fromTo(q("[data-count]"), { opacity: 0 }, { opacity: 1, duration: 0.35 }, 0.1)
      // 1. Write out "ROCK" handwritten brush script stroke-by-stroke
      .to(
        q("[data-rock-stroke]"),
        {
          strokeDashoffset: 0,
          duration: 0.34,
          ease: "power2.inOut",
          stagger: 0.16,
        },
        0.15
      )
      // 2. Reveal "CASTLE" bold block letters sequentially
      .fromTo(
        q("[data-castle-letter]"),
        { scaleY: 0, attr: { y: 466 } },
        {
          scaleY: 1,
          attr: { y: 278 },
          duration: 0.38,
          ease: EXPO_OUT,
          stagger: 0.055,
        },
        0.85
      )
      // 3. Swipe the signature brush underline and pop the exclamation dot
      .to(
        q("[data-underline-stroke]"),
        {
          strokeDashoffset: 0,
          duration: 0.42,
          ease: "power3.out",
        },
        1.22
      )
      .to(
        q("[data-underline-dot]"),
        {
          strokeDashoffset: 0,
          duration: 0.18,
          ease: "back.out(2)",
        },
        1.54
      )
      // 4. Write out "experiences un-ltd." tagline underneath
      .fromTo(
        q("[data-tagline]"),
        { clipPath: "inset(0 100% 0 0)", opacity: 0.4 },
        { clipPath: "inset(0 0% 0 0)", opacity: 1, duration: 0.55, ease: "power2.out" },
        1.38
      )
      // Counter ticks up to 100% and orange loading bar fills across the logo writing sequence
      .fromTo(
        q("[data-progress-fill]"),
        { scaleX: 0 },
        { scaleX: 1, duration: 1.85, ease: "power2.inOut" },
        0.15
      )
      .to(
        tc,
        {
          f: 100,
          duration: 1.85,
          ease: "power2.inOut",
          onUpdate: () => {
            if (!counter) return;
            counter.textContent = `${String(Math.round(tc.f)).padStart(3, "0")}%`;
          },
        },
        0.15
      )
      // Logo scales gently and fades out as the gate splits open
      .to(
        q("[data-logo-stage]"),
        { scale: 1.04, opacity: 0, duration: 0.45, ease: "power2.in" },
        2.15
      )
      .to(q("[data-count-bar]"), { opacity: 0, duration: 0.3 }, 2.15)
      .to(q("[data-half='top']"), { yPercent: -101, duration: 1.05, ease: EXPO_IN_OUT }, 2.35)
      .to(q("[data-half='bottom']"), { yPercent: 101, duration: 1.05, ease: EXPO_IN_OUT }, 2.35)
      // Camera push: the hero settles from a tight frame to its resting framing.
      .to(hero, { "--cine-zoom": 1, duration: 1.9, ease: EXPO_OUT }, 2.5);

    return () => {
      tl.kill();
      html.classList.remove("cine-intro");
      lenis()?.start();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!show) return null;

  return (
    <div ref={root} className="cine-intro-layer" aria-hidden="true">
      <div data-half="top" className="cine-intro-half cine-intro-half--top" />
      <div data-half="bottom" className="cine-intro-half cine-intro-half--bottom" />

      <div className="cine-intro-title" data-logo-stage>
        <svg
          className="cine-intro-logo-svg"
          viewBox="0 0 1144 615"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Convert black logo PNG pixels to crisp white while preserving alpha */}
            <filter id="rc-intro-white" colorInterpolationFilters="sRGB">
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 1
                        0 0 0 0 1
                        0 0 0 0 1
                        0 0 0 1 0"
              />
            </filter>

            {/* Per-letter clip regions for ROCK script */}
            <clipPath id="rc-clip-r">
              <rect x="0" y="0" width="398" height="305" />
            </clipPath>
            <clipPath id="rc-clip-o">
              <rect x="398" y="0" width="257" height="315" />
            </clipPath>
            <clipPath id="rc-clip-c">
              <rect x="655" y="0" width="153" height="335" />
            </clipPath>
            <clipPath id="rc-clip-k">
              <rect x="805" y="0" width="339" height="325" />
            </clipPath>
            <clipPath id="rc-clip-under">
              <rect x="0" y="466" width="1144" height="149" />
            </clipPath>

            {/* Master handwriting mask revealing ROCK, CASTLE, and underline */}
            <mask id="rc-logo-write-mask" maskUnits="userSpaceOnUse">
              <rect x="0" y="0" width="1144" height="615" fill="black" />

              {/* ROCK — R */}
              <g clipPath="url(#rc-clip-r)" fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round">
                <path
                  data-write-stroke
                  data-rock-stroke
                  d="M 148 52 L 128 292"
                  strokeWidth="64"
                />
                <path
                  data-write-stroke
                  data-rock-stroke
                  d="M 28 76 C 110 18, 330 18, 372 72 C 392 128, 220 192, 52 204 C 135 225, 255 272, 392 298"
                  strokeWidth="96"
                />
              </g>

              {/* ROCK — O */}
              <g clipPath="url(#rc-clip-o)" fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round">
                <path
                  data-write-stroke
                  data-rock-stroke
                  d="M 545 78 C 460 32, 412 115, 422 215 C 432 295, 515 315, 575 265 C 625 205, 615 52, 525 48 C 465 48, 455 185, 525 245 C 585 280, 635 215, 642 122"
                  strokeWidth="105"
                />
              </g>

              {/* ROCK — C */}
              <g clipPath="url(#rc-clip-c)" fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round">
                <path
                  data-write-stroke
                  data-rock-stroke
                  d="M 792 145 L 796 55 C 740 35, 675 95, 678 215 C 680 315, 765 330, 804 228"
                  strokeWidth="98"
                />
              </g>

              {/* ROCK — K */}
              <g clipPath="url(#rc-clip-k)" fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round">
                <path
                  data-write-stroke
                  data-rock-stroke
                  d="M 882 52 L 886 318"
                  strokeWidth="64"
                />
                <path
                  data-write-stroke
                  data-rock-stroke
                  d="M 1068 48 L 822 238 L 995 298"
                  strokeWidth="95"
                />
              </g>

              {/* CASTLE — 6 block letters (C, A, S, T, L, E) */}
              <g fill="white">
                <rect data-castle-letter x="35"  y="278" width="180" height="188" />
                <rect data-castle-letter x="215" y="278" width="205" height="188" />
                <rect data-castle-letter x="420" y="278" width="176" height="188" />
                <rect data-castle-letter x="596" y="278" width="194" height="188" />
                <rect data-castle-letter x="790" y="278" width="164" height="188" />
                <rect data-castle-letter x="954" y="278" width="175" height="188" />
              </g>

              {/* Brush Underline + Dot */}
              <g clipPath="url(#rc-clip-under)" fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round">
                <path
                  data-write-stroke
                  data-underline-stroke
                  d="M 162 588 Q 520 518 905 498"
                  strokeWidth="84"
                />
                <path
                  data-write-stroke
                  data-underline-dot
                  d="M 960 515 L 1005 478"
                  strokeWidth="84"
                />
              </g>
            </mask>
          </defs>

          <image
            href="/rockcastle-logo-black.png"
            width="1144"
            height="615"
            filter="url(#rc-intro-white)"
            mask="url(#rc-logo-write-mask)"
          />
        </svg>

        <p data-tagline className="cine-intro-written-tag">
          experiences un-ltd.
        </p>

        <div className="cine-intro-progress" data-progress-track>
          <span className="cine-intro-progress__fill" data-progress-fill />
        </div>
      </div>

      <div data-count-bar className="cine-intro-count">
        <span>Rock Castle</span>
        <span data-count>000%</span>
      </div>
      <noscript>
        <style>{`.cine-intro-layer{display:none}`}</style>
      </noscript>
    </div>
  );
}

/* --------------------------- 2-8. Scroll layer --------------------------- */

function useScrollCinematics(enabled: boolean) {
  useEffect(() => {
    if (!enabled || reducedMotion()) return;

    const cleanups: Array<() => void> = [];
    const ctx = gsap.context(() => {
      /* 2. Hero recedes as the statement curtain rises over it. */
      const hero = document.getElementById("home");
      const statement = document.getElementById("about");
      if (hero && statement) {
        const dim = document.createElement("div");
        dim.className = "cine-hero-dim";
        dim.setAttribute("aria-hidden", "true");
        hero.appendChild(dim);
        cleanups.push(() => dim.remove());

        gsap.fromTo(
          hero,
          { "--cine-zoom": 1, "--cine-dim": 0, "--cine-drift": "0px", "--cine-fade": 1 },
          {
            "--cine-zoom": 1.12,
            "--cine-dim": 0.6,
            "--cine-drift": "-90px",
            "--cine-fade": 0.2,
            ease: "none",
            immediateRender: false,
            scrollTrigger: {
              trigger: statement,
              start: "top bottom",
              end: "top top",
              scrub: true,
            },
          }
        );
      }

      /* 4. Statement emblem: frame wipes down, star turns with scroll. */
      const frame = document.querySelector<HTMLElement>(".hoy-box-frame");
      if (frame) {
        gsap.fromTo(
          frame,
          { clipPath: "inset(0% 0% 100% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.3,
            ease: EXPO_IN_OUT,
            clearProps: "clipPath",
            scrollTrigger: { trigger: frame, start: "top 85%", toggleActions: "restart none restart none" },
          }
        );
        gsap.fromTo(
          frame.querySelectorAll(".hoy-box-plus-top, .hoy-box-plus-bottom"),
          { rotate: -90, opacity: 0 },
          {
            rotate: 0,
            opacity: 1,
            duration: 1.1,
            ease: EXPO_OUT,
            delay: 0.4,
            stagger: 0.1,
            scrollTrigger: { trigger: frame, start: "top 85%", toggleActions: "restart none restart none" },
          }
        );
        const star = frame.querySelector(".hoy-box-star-center svg");
        if (star) {
          gsap.fromTo(
            star,
            { rotate: 0 },
            {
              rotate: 180,
              ease: "none",
              transformOrigin: "50% 50%",
              scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: 0.6 },
            }
          );
        }
      }

      /* 5. Work plates: each image starts long and settles as the plate lands. */
      const rail = document.querySelector<HTMLElement>(".rx-plate__media")?.closest("section");
      const plateImgs = gsap.utils.toArray<HTMLElement>(".rx-plate__media img");
      if (rail && plateImgs.length) {
        gsap.fromTo(
          plateImgs,
          { "--cine-lens": 1.22 },
          {
            "--cine-lens": 1,
            duration: 1.8,
            ease: EXPO_OUT,
            stagger: 0.09,
            scrollTrigger: { trigger: rail, start: "top 75%", toggleActions: "restart none restart none" },
          }
        );
      }

      /* 6. Client marquee borrows momentum from scroll speed. */
      const rows = gsap.utils.toArray<HTMLElement>(".cl-row");
      const clients = document.getElementById("clients");
      if (rows.length && clients) {
        const anims = () => rows.flatMap((r) => r.getAnimations());
        const speed = { rate: 1 };
        const apply = () => anims().forEach((a) => (a.playbackRate = speed.rate));
        ScrollTrigger.create({
          trigger: clients,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            const boost = Math.min(Math.abs(self.getVelocity()) / 350, 6);
            gsap.to(speed, {
              rate: 1 + boost,
              duration: 0.25,
              ease: "power2.out",
              overwrite: true,
              onUpdate: apply,
              onComplete: () =>
                gsap.to(speed, { rate: 1, duration: 1.2, ease: "power3.out", onUpdate: apply }),
            });
          },
        });
        cleanups.push(() => anims().forEach((a) => (a.playbackRate = 1)));
      }

      /* 7. Contact lifts away; the footer rises into focus behind it. */
      const contact = document.getElementById("contact");
      const contactInner = contact?.firstElementChild as HTMLElement | null;
      const footerInner = document.querySelector<HTMLElement>("#footer .footer__inner");
      const footer = document.getElementById("footer");
      if (contact && contactInner) {
        gsap.fromTo(
          contactInner,
          { y: 0, opacity: 1 },
          {
            y: -70,
            opacity: 0.35,
            ease: "none",
            immediateRender: false,
            scrollTrigger: { trigger: contact, start: "bottom bottom", end: "bottom top", scrub: true },
          }
        );
      }
      if (contact && footer && footerInner) {
        gsap.fromTo(
          footerInner,
          { y: 90, opacity: 0.2 },
          {
            y: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: contact,
              start: "bottom bottom",
              end: () => `bottom ${Math.max(0, window.innerHeight - footer.offsetHeight)}px`,
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
        );
      }
    });

    /* 3. Follow-spot removed per user request */

    const refresh = setTimeout(() => ScrollTrigger.refresh(), 300);

    return () => {
      clearTimeout(refresh);
      ctx.revert();
      cleanups.forEach((fn) => fn());
    };
  }, [enabled]);
}

export default function Cinematics() {
  const [introDone, setIntroDone] = useState(false);
  useScrollCinematics(introDone);

  return (
    <>
      <TitleSequence onDone={() => setIntroDone(true)} />
      <div className="cine-grain" aria-hidden="true" />
    </>
  );
}
