"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import gsap from "gsap";
import type { RecentFrame, RecentStory } from "@/data/recent-experiences";

const pad = (n: number) => String(n).padStart(2, "0");
const EASE = "expo.out";
const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

// Clip-path inset that crops the full viewport down to `rect`.
const insetFor = (rect: DOMRect, radius = 4) => {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  return `inset(${rect.top}px ${vw - rect.right}px ${vh - rect.bottom}px ${rect.left}px round ${radius}px)`;
};
const FULL = "inset(0px 0px 0px 0px round 0px)";

// Scale + origin that shrink a full-viewport cover image onto `rect`, so the
// card's media and the story's media read as one continuous object.
const collapseFor = (rect: DOMRect) => ({
  scale: Math.max(rect.width / window.innerWidth, rect.height / window.innerHeight),
  transformOrigin: `${rect.left + rect.width / 2}px ${rect.top + rect.height / 2}px`,
});

type StoryFrameProps = {
  story: RecentStory;
  frame: RecentFrame;
  active: boolean;
  paused: boolean;
  videoRef: React.MutableRefObject<HTMLVideoElement | null>;
  onVideoMeta: (duration: number) => void;
};

function StoryFrame({ story, frame, active, paused, videoRef, onVideoMeta }: StoryFrameProps) {
  const localVideo = useRef<HTMLVideoElement | null>(null);

  // Exactly one video plays: the active frame's. Leaving pauses it, and each
  // visit mounts a fresh element (keyed by frame) so it restarts from zero.
  useEffect(() => {
    const video = localVideo.current;
    if (!video) return;
    if (active && !paused) video.play().catch(() => {});
    else video.pause();
  }, [active, paused]);

  const setVideo = (el: HTMLVideoElement | null) => {
    localVideo.current = el;
    if (active) videoRef.current = el;
  };

  const hasMedia = frame.type === "image" || frame.type === "video" || frame.type === "cta";
  const stats = frame.stats ?? [];
  const facts = frame.facts ?? [];

  return (
    <div className={`story-frame story-frame--${frame.type}${frame.variant ? ` story-frame--${frame.variant}` : ""}`}>
      {hasMedia && (
        <div className="story-frame__media-wrap">
          {frame.type === "video" ? (
            <video
              ref={setVideo}
              className="story-frame__media"
              muted
              playsInline
              preload="auto"
              poster={frame.poster}
              onLoadedMetadata={(e) => active && onVideoMeta(e.currentTarget.duration)}
            >
              <source src={frame.src} type="video/mp4" />
            </video>
          ) : (
            <img
              className="story-frame__media"
              src={frame.src}
              alt={frame.type === "cta" ? "" : `${story.title} — ${frame.label}`}
              decoding="async"
              style={{ "--frame-duration": `${frame.duration}ms` } as React.CSSProperties}
            />
          )}
        </div>
      )}
      <span className="story-frame__scrim" aria-hidden="true" />

      <div className="story-frame__content">
        {frame.variant === "cover" && (
          <div className="story-frame__text story-frame__cover">
            <span className="story-frame__kicker">{frame.label}</span>
            <h3>{story.title}</h3>
            <p className="story-frame__cover-meta">
              {[story.client, story.city, story.date].filter(Boolean).map((item) => (
                <span key={item}>{item}</span>
              ))}
            </p>
          </div>
        )}

        {frame.type === "text" && (
          <div className="story-frame__text story-frame__statement">
            <span className="story-frame__kicker">{frame.label}</span>
            <p>{frame.statement}</p>
          </div>
        )}

        {frame.type === "metadata" && (
          <div className="story-frame__text story-frame__facts">
            <span className="story-frame__kicker">{frame.label}</span>
            {stats.length > 0 && (
              <ul className="story-frame__stats">
                {stats.map((stat) => (
                  <li key={stat.label}>
                    <strong>{stat.value}</strong>
                    <span>{stat.label}</span>
                  </li>
                ))}
              </ul>
            )}
            <dl>
              {facts.map(([term, value]) => (
                <div key={term}>
                  <dt>{term}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        {frame.type === "cta" && (
          <div className="story-frame__text story-frame__cta">
            <span className="story-frame__kicker">{frame.label}</span>
            <h3>{story.tagline || story.title}</h3>
          </div>
        )}
      </div>
    </div>
  );
}

type Position = { story: number; frame: number; dir: 1 | -1; newStory: boolean };
type Outgoing = { story: number; frame: number } | null;
type HoldState = { active: boolean; startedAt: number; x: number; y: number; id: number | null; timer?: ReturnType<typeof setTimeout> };

type Props = {
  stories: RecentStory[];
  startIndex: number;
  /** Where the plate for a story sits now, or null if it is off screen. */
  getOriginRect: (index: number) => DOMRect | null;
  /** Called once the close animation has finished. */
  onClosed: (index: number) => void;
};

export default function StoryViewer({ stories, startIndex, getOriginRect, onClosed }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const chromeRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const fillRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const videoDurationRef = useRef<number | null>(null);
  const transitionRef = useRef<gsap.core.Timeline | gsap.core.Tween | null>(null);
  const closingRef = useRef(false);
  const holdRef = useRef<HoldState>({ active: false, startedAt: 0, x: 0, y: 0, id: null });
  // Elapsed time survives pause/resume; it resets only when the frame changes.
  const elapsedRef = useRef({ key: "", ms: 0 });

  const [reducedMotion] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  const [position, setPosition] = useState<Position>({ story: startIndex, frame: 0, dir: 1, newStory: true });
  const [outgoing, setOutgoing] = useState<Outgoing>(null);
  // Reduced motion: never auto-advance; the visitor steps through or presses play.
  const [paused, setPaused] = useState(reducedMotion);
  const [holding, setHolding] = useState(false);
  const [opened, setOpened] = useState(false);

  const story = stories[position.story];
  const frame = story.frames[position.frame];
  const isLastOverall = position.story === stories.length - 1 && position.frame === story.frames.length - 1

  // ---- Navigation ---------------------------------------------------------
  const goTo = useCallback((storyIdx: number, frameIdx: number, dir: 1 | -1) => {
    if (closingRef.current) return;
    if (position.story === storyIdx && position.frame === frameIdx) return;
    setOutgoing({ story: position.story, frame: position.frame });
    setPosition({ story: storyIdx, frame: frameIdx, dir, newStory: position.story !== storyIdx });
  }, [position]);

  const next = useCallback(() => {
    const { story: s, frame: f } = position;
    if (f < stories[s].frames.length - 1) goTo(s, f + 1, 1);
    else if (s < stories.length - 1) goTo(s + 1, 0, 1);
    else setPaused(true); // end of the final story: hold on the CTA
  }, [goTo, position, stories]);

  const prev = useCallback(() => {
    const { story: s, frame: f } = position;
    if (f > 0) goTo(s, f - 1, -1);
    else if (s > 0) goTo(s - 1, 0, -1);
  }, [goTo, position]);

  const nextStory = useCallback(() => {
    if (position.story < stories.length - 1) goTo(position.story + 1, 0, 1);
  }, [goTo, position.story, stories.length]);

  // ---- Open: expand out of the originating card ---------------------------
  useLayoutEffect(() => {
    const stage = stageRef.current;
    const chrome = chromeRef.current;
    const backdrop = backdropRef.current;
    const rect = getOriginRect(startIndex);
    const media = stage?.querySelector(".story-frame__media-wrap");

    if (reducedMotion || !rect || !stage || !chrome || !backdrop) {
      gsap.fromTo([backdrop, stage, chrome], { opacity: 0 }, { opacity: 1, duration: 0.25, onComplete: () => setOpened(true) });
      return undefined;
    }

    const tl = gsap.timeline({ onComplete: () => setOpened(true) });
    tl.fromTo(backdrop, { opacity: 0 }, { opacity: 1, duration: 0.45, ease: "power2.out" }, 0)
      .fromTo(stage, { clipPath: insetFor(rect) }, { clipPath: FULL, duration: 1.05, ease: "expo.inOut" }, 0);
    if (media) {
      tl.fromTo(media, collapseFor(rect), { scale: 1, duration: 1.05, ease: "expo.inOut" }, 0);
    }
    tl.fromTo(chrome, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 0.7)
      .fromTo(stage.querySelectorAll(".story-frame__text > *"),
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.07, ease: EASE }, 0.75);
    return () => { tl.kill(); };
  }, []) // eslint-disable-line react-hooks/exhaustive-deps -- runs once per open

  // ---- Close: resolve back into the card for the story now showing -------
  const close = useCallback(() => {
    if (closingRef.current) return;
    closingRef.current = true;
    transitionRef.current?.kill();
    videoRef.current?.pause();
    const storyIdx = position.story;
    const rect = getOriginRect(storyIdx);
    const stage = stageRef.current;
    const done = () => onClosed(storyIdx);

    if (reducedMotion || !rect || !stage) {
      gsap.to(rootRef.current, { opacity: 0, duration: 0.2, onComplete: done });
      return;
    }

    const media = stage.querySelector('[data-layer="in"] .story-frame__media-wrap');
    const tl = gsap.timeline({ onComplete: done });
    tl.to(chromeRef.current, { opacity: 0, duration: 0.2, ease: "power1.in" }, 0)
      .to(stage.querySelectorAll('[data-layer="in"] .story-frame__text'), { opacity: 0, duration: 0.2 }, 0)
      .to(stage, { clipPath: insetFor(rect), duration: 0.8, ease: "expo.inOut" }, 0.05);
    if (media) tl.to(media, { ...collapseFor(rect), duration: 0.8, ease: "expo.inOut" }, 0.05);
    tl.to(backdropRef.current, { opacity: 0, duration: 0.35, ease: "power1.out" }, 0.5);
  }, [getOriginRect, onClosed, position.story, reducedMotion]);

  // ---- Frame transitions: directional clip + media displacement ----------
  useLayoutEffect(() => {
    if (!outgoing) return undefined;
    const stage = stageRef.current;
    const incoming = stage?.querySelector('[data-layer="in"]');
    const leaving = stage?.querySelector('[data-layer="out"]');
    transitionRef.current?.kill();
    const clear = () => setOutgoing(null);

    if (!incoming) return undefined;

    if (reducedMotion) {
      transitionRef.current = gsap.fromTo(incoming, { opacity: 0 }, { opacity: 1, duration: 0.2, onComplete: clear });
      return undefined;
    }

    const { dir, newStory } = position;
    const inMedia = incoming.querySelector(".story-frame__media-wrap");
    const outMedia = leaving?.querySelector(".story-frame__media-wrap");
    const inText = incoming.querySelectorAll(".story-frame__text > *");
    const tl = gsap.timeline({ onComplete: clear });

    if (newStory) {
      // A new event arrives as a frame expanding out of the dark.
      tl.fromTo(incoming, { clipPath: "inset(9% 11% 9% 11% round 6px)" }, { clipPath: FULL, duration: 1.1, ease: "expo.inOut" }, 0);
      if (inMedia) tl.fromTo(inMedia, { scale: 1.18 }, { scale: 1, duration: 1.3, ease: "expo.out" }, 0);
      if (leaving) tl.to(leaving, { scale: 0.92, opacity: 0, duration: 0.9, ease: "power2.inOut" }, 0);
    } else {
      // Within a story: a directional wipe with the images displaced against
      // each other, so it reads as one camera move rather than a slide swap.
      const from = dir > 0 ? "inset(0% 0% 0% 100%)" : "inset(0% 100% 0% 0%)";
      tl.fromTo(incoming, { clipPath: from }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.95, ease: "expo.inOut" }, 0);
      if (inMedia) tl.fromTo(inMedia, { xPercent: 14 * dir, scale: 1.1 }, { xPercent: 0, scale: 1, duration: 1.2, ease: "expo.out" }, 0.05);
      if (outMedia) tl.to(outMedia, { xPercent: -10 * dir, duration: 0.95, ease: "expo.inOut" }, 0);
      if (leaving) tl.to(leaving, { opacity: 0.35, duration: 0.95, ease: "power1.in" }, 0);
    }
    if (inText.length) {
      tl.fromTo(inText, { y: 46 * (newStory ? 1 : 0.8), opacity: 0 }, { y: 0, opacity: 1, duration: 0.85, stagger: 0.07, ease: EASE }, 0.35);
    }
    transitionRef.current = tl;
    return undefined;
  }, [outgoing]) // eslint-disable-line react-hooks/exhaustive-deps -- keyed on the swap itself

  const onVideoMeta = useCallback((duration: number) => {
    // Real clip length, capped so a long reel doesn't stall the story.
    if (Number.isFinite(duration) && duration > 0) videoDurationRef.current = Math.min(duration, 14);
  }, []);

  // ---- Progress + auto-advance (written to the DOM, never to React state) -
  useEffect(() => {
    const key = `${position.story}-${position.frame}`;
    const clock = elapsedRef.current;
    if (clock.key !== key) {
      clock.key = key;
      clock.ms = 0;
      videoDurationRef.current = null;
    }
    const fill = fillRefs.current[position.frame];
    if (!opened) return undefined;

    let raf = 0;
    let last = performance.now();
    const halted = () => paused || holding || document.hidden || closingRef.current;

    const step = (now: number) => {
      const dt = Math.min(now - last, 100);
      last = now;
      const video = frame.type === "video" ? videoRef.current : null;
      if (video && !videoDurationRef.current && video.readyState >= 1) onVideoMeta(video.duration);
      const clipLength = video && videoDurationRef.current;
      let amount: number;
      if (clipLength && video && !video.paused) {
        // A playing clip sets the pace: its real length, not a fixed timer.
        amount = video.currentTime / clipLength;
        clock.ms = amount * frame.duration;
      } else {
        // Images/text, or a clip that refused to play: fall back to the timer.
        if (!halted()) clock.ms += dt;
        amount = Math.max(clock.ms / frame.duration, clipLength && video ? video.currentTime / clipLength : 0);
      }
      amount = Math.min(1, amount);
      if (fill) fill.style.transform = `scaleX(${amount})`;
      if (amount >= 1 && !halted()) {
        next();
        return;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [position, paused, holding, opened, frame, next, onVideoMeta]);

  // Pause/resume the active video with the viewer state.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || frame.type !== "video") return;
    if (paused || holding || !opened) video.pause();
    else video.play().catch(() => {});
  }, [paused, holding, opened, frame.type, position]);

  // Preload the next image so the wipe never reveals a half-decoded frame.
  useEffect(() => {
    const upcoming = story.frames[position.frame + 1] || stories[position.story + 1]?.frames[0];
    if (!upcoming?.src || upcoming.type === "video") return;
    const img = new window.Image();
    img.decoding = "async";
    img.src = upcoming.src;
  }, [position, stories, story.frames]);

  // ---- Keyboard, focus trap, scroll lock ----------------------------------
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const opener = document.activeElement;
    // Focus the dialog itself (not the close button) so Space pauses and the
    // arrows navigate immediately; Tab still reaches every control.
    root.focus({ preventScroll: true });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.preventDefault(); close(); return; }
      if (e.key === "ArrowRight") { e.preventDefault(); next(); return; }
      if (e.key === "ArrowLeft") { e.preventDefault(); prev(); return; }
      if (e.key === " " && !(e.target instanceof Element && e.target.closest("a, button"))) {
        e.preventDefault();
        setPaused((p) => !p);
        return;
      }
      // Page-scrolling keys would move the document underneath the story.
      if (["PageDown", "PageUp", "Home", "End", "ArrowDown", "ArrowUp", " "].includes(e.key) && !(e.target instanceof Element && e.target.closest("a, button"))) {
        e.preventDefault();
        return;
      }
      if (e.key === "Tab") {
        const items = Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((el) => el.tabIndex >= 0 && el.offsetParent !== null);
        if (!items.length) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (!root.contains(document.activeElement) || document.activeElement === root) {
          e.preventDefault();
          (e.shiftKey ? last : first).focus();
        } else if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };

    // Lock scroll without toggling overflow: removing the scrollbar would
    // resize the page and make every ScrollTrigger pin re-measure.
    const block = (e: Event) => e.preventDefault();
    document.addEventListener("keydown", onKey);
    root.addEventListener("wheel", block, { passive: false });
    root.addEventListener("touchmove", block, { passive: false });

    return () => {
      document.removeEventListener("keydown", onKey);
      root.removeEventListener("wheel", block);
      root.removeEventListener("touchmove", block);
      if (opener instanceof HTMLElement && document.contains(opener)) opener.focus({ preventScroll: true });
    };
  }, [close, next, prev]);

  // Pause while the tab is hidden; the rAF loop also checks document.hidden.
  useEffect(() => {
    const onVis = () => { if (document.hidden) videoRef.current?.pause(); };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  // ---- Pointer: tap zones, swipe, press-and-hold to pause ----------------
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0 || (e.target instanceof Element && e.target.closest("a, button"))) return;
    holdRef.current = { active: true, startedAt: performance.now(), x: e.clientX, y: e.clientY, id: e.pointerId };
    // Holding (touch or mouse) pauses after a beat, like reading over a shoulder.
    holdRef.current.timer = setTimeout(() => setHolding(true), 220);
  };

  const onPointerUp = (e: React.PointerEvent) => {
    const h = holdRef.current;
    if (!h.active || h.id !== e.pointerId) return;
    clearTimeout(h.timer);
    h.active = false;
    const wasHold = performance.now() - h.startedAt > 220;
    setHolding(false);
    const dx = e.clientX - h.x;
    const dy = e.clientY - h.y;

    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.2) {
      if (dx < 0) next();
      else prev();
      return;
    }
    if (Math.abs(dy) > 90 && dy > 0 && e.pointerType !== "mouse") { close(); return; } // swipe down closes
    if (wasHold || Math.abs(dx) > 10 || Math.abs(dy) > 10) return;
    if (e.clientX < window.innerWidth * 0.32) prev();
    else next();
  };

  const onPointerCancel = () => {
    clearTimeout(holdRef.current.timer);
    holdRef.current.active = false;
    setHolding(false);
  };

  const layers = outgoing
    ? [{ ...outgoing, layer: "out" as const }, { story: position.story, frame: position.frame, layer: "in" as const }]
    : [{ story: position.story, frame: position.frame, layer: "in" as const }];

  const titleId = "story-viewer-title";

  return createPortal(
    <div
      className={`story-viewer${holding ? " is-holding" : ""}`}
      ref={rootRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      tabIndex={-1}
      data-lenis-prevent
    >
      <div className="story-viewer__backdrop" ref={backdropRef} aria-hidden="true" />

      <div
        className="story-viewer__stage"
        ref={stageRef}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
        onPointerLeave={onPointerCancel}
      >
        {layers.map(({ story: s, frame: f, layer }) => {
          const st = stories[s];
          const fr = st.frames[f];
          return (
            <div className="story-viewer__layer" data-layer={layer} key={`${st.id}-${fr.id}`} aria-hidden={layer === "out"}>
              <StoryFrame
                story={st}
                frame={fr}
                active={layer === "in"}
                paused={paused || holding || !opened}
                videoRef={videoRef}
                onVideoMeta={onVideoMeta}
              />
            </div>
          );
        })}
      </div>

      <div className="story-viewer__chrome" ref={chromeRef}>
        <div className="story-viewer__progress" role="group" aria-label={`${story.title}: frame ${position.frame + 1} of ${story.frames.length}`}>
          {story.frames.map((item, i) => (
            <button
              type="button"
              className="story-viewer__segment"
              key={`${story.id}-${item.id}`}
              onClick={() => goTo(position.story, i, i >= position.frame ? 1 : -1)}
              aria-label={`Frame ${i + 1}: ${item.label}`}
              aria-current={i === position.frame ? "step" : undefined}
              tabIndex={-1}
            >
              <span
                className="story-viewer__segment-fill"
                ref={(el) => { fillRefs.current[i] = el; }}
                style={i === position.frame ? undefined : { transform: `scaleX(${i < position.frame ? 1 : 0})` }}
              />
            </button>
          ))}
        </div>

        <header className="story-viewer__header">
          <div className="story-viewer__identity">
            <span className="story-viewer__index">{pad(position.story + 1)} / {pad(stories.length)}</span>
            <h2 id={titleId}>{story.title}</h2>
            <span className="story-viewer__meta">
              {[story.date, story.city, story.category].filter(Boolean).map((item) => (
                <span key={item}>{item}</span>
              ))}
            </span>
          </div>
          <div className="story-viewer__controls">
            <button
              type="button"
              className="story-viewer__btn story-viewer__pause"
              aria-pressed={paused}
              onClick={() => setPaused((p) => !p)}
            >
              <span aria-hidden="true">{paused ? "▶" : "Ⅱ"}</span>
              <span className="story-viewer__btn-label">{paused ? "Play" : "Pause"}</span>
            </button>
            <button
              type="button"
              className="story-viewer__btn story-viewer__close"
              onClick={close}
              aria-label="Close story"
            >
              <span aria-hidden="true">✕</span>
              <span className="story-viewer__btn-label">Close</span>
            </button>
          </div>
        </header>

        <footer className="story-viewer__footer">
          {/* Media frames carry their own title + caption here; text frames
              already show their label on-frame, so nothing is repeated. */}
          <p className="story-viewer__caption" aria-live="polite">
            {frame.caption && (
              <>
                <span className="story-viewer__caption-label">{frame.label}</span>
                <span>{frame.caption}</span>
              </>
            )}
          </p>

          {frame.type === "cta" && (
            <div className="story-viewer__cta">
              <Link
                href={story.projectUrl ?? "#contact"}
                className="story-viewer__cta-link"
                onClick={close}
              >
                View experience <span aria-hidden="true">↗</span>
              </Link>
              {position.story < stories.length - 1 && (
                <button type="button" className="story-viewer__btn" onClick={nextStory}>
                  Next story <span aria-hidden="true">→</span>
                </button>
              )}
            </div>
          )}

          <nav className="story-viewer__nav" aria-label="Story frames">
            <button type="button" className="story-viewer__btn story-viewer__arrow" onClick={prev} disabled={position.story === 0 && position.frame === 0} aria-label="Previous frame">←</button>
            <span className="story-viewer__count">{pad(position.frame + 1)} / {pad(story.frames.length)}</span>
            <button type="button" className="story-viewer__btn story-viewer__arrow" onClick={next} disabled={isLastOverall} aria-label="Next frame">→</button>
          </nav>
        </footer>
      </div>
    </div>,
    document.body
  );
}
