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

const SESSION_KEY = "rc-cine-intro";
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

    const finish = () => {
      html.classList.remove("cine-intro");
      lenis()?.start();
      markIntroSeen();
      setShow(false);
      onDone();
    };

    const tl = gsap.timeline({ onComplete: finish });
    tl.set(hero, { "--cine-zoom": 1.18 })
      .fromTo(q("[data-word]"), { yPercent: 110 }, { yPercent: 0, duration: 0.9, ease: EXPO_OUT, stagger: 0.08 }, 0.15)
      .fromTo(q("[data-rule]"), { scaleX: 0 }, { scaleX: 1, duration: 1.0, ease: EXPO_IN_OUT }, 0.25)
      .fromTo(q("[data-count]"), { opacity: 0 }, { opacity: 1, duration: 0.4 }, 0.2)
      .to(
        tc,
        {
          f: 48,
          duration: 1.3,
          ease: "none",
          onUpdate: () => {
            if (!counter) return;
            const f = Math.round(tc.f);
            counter.textContent = `00:00:${String(Math.floor(f / 24)).padStart(2, "0")}:${String(f % 24).padStart(2, "0")}`;
          },
        },
        0.2
      )
      // Title leaves, then the frame splits open like a gate.
      .to(q("[data-word]"), { yPercent: -110, duration: 0.5, ease: "expo.in", stagger: 0.04 }, 1.45)
      .to(q("[data-rule], [data-count]"), { opacity: 0, duration: 0.3 }, 1.5)
      .to(q("[data-half='top']"), { yPercent: -101, duration: 1.1, ease: EXPO_IN_OUT }, 1.75)
      .to(q("[data-half='bottom']"), { yPercent: 101, duration: 1.1, ease: EXPO_IN_OUT }, 1.75)
      // Camera push: the hero settles from a tight frame to its resting framing.
      .to(hero, { "--cine-zoom": 1, duration: 2.0, ease: EXPO_OUT }, 1.95);

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
      <div className="cine-intro-title">
        <span className="cine-intro-mask">
          <span data-word className="cine-intro-word">
            {brand.name}
          </span>
        </span>
        <span data-rule className="cine-intro-rule" />
        <span className="cine-intro-mask">
          <span data-word className="cine-intro-tag">
            {brand.tagline}
          </span>
        </span>
      </div>
      <div className="cine-intro-count">
        <span>Reel 01</span>
        <span data-count>00:00:00:00</span>
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

    /* 3. Follow-spot across the dark sections (fine pointers only). */
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      ["about", "recent-experiences", "contact"].forEach((id) => {
        const section = document.getElementById(id);
        if (!section) return;
        const spot = document.createElement("div");
        spot.className = "cine-spot";
        spot.setAttribute("aria-hidden", "true");
        section.appendChild(spot);

        // Eased follow: the light trails the pointer slightly, like an operator.
        const target = { x: 0, y: 0 };
        const pos = { x: 0, y: 0 };
        const tick = () => {
          pos.x += (target.x - pos.x) * 0.12;
          pos.y += (target.y - pos.y) * 0.12;
          spot.style.setProperty("--spot-x", `${pos.x.toFixed(1)}px`);
          spot.style.setProperty("--spot-y", `${pos.y.toFixed(1)}px`);
        };
        gsap.ticker.add(tick);
        const move = (e: PointerEvent) => {
          const r = section.getBoundingClientRect();
          target.x = e.clientX - r.left;
          target.y = e.clientY - r.top;
        };
        const enter = () => spot.classList.add("is-on");
        const leave = () => spot.classList.remove("is-on");
        section.addEventListener("pointermove", move);
        section.addEventListener("pointerenter", enter);
        section.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          section.removeEventListener("pointermove", move);
          section.removeEventListener("pointerenter", enter);
          section.removeEventListener("pointerleave", leave);
          gsap.ticker.remove(tick);
          spot.remove();
        });
      });
    }

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
