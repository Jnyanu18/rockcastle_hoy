"use client";

import { useEffect, useRef, useState } from "react";
import { hero } from "@/lib/content";
import KineticLogo from "@/components/KineticLogo";
import SlideUpText from "@/components/ui/SlideUpText";
import HeroPlayCursor, { PlayCursorBadge } from "@/components/HeroPlayCursor";
import HeroVideoModal from "@/components/HeroVideoModal";

/* Star Orbit Ring Graphic: perspective dashed ellipse with centered 4-point star */
function StarOrbitRing() {
  return (
    <div className="relative mt-3 flex items-center justify-center">
      <svg
        width="160"
        height="44"
        viewBox="0 0 160 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
        aria-hidden="true"
      >
        {/* Outer Perspective Ellipse Ring */}
        <ellipse
          cx="80"
          cy="22"
          rx="72"
          ry="15"
          stroke="#edeea5"
          strokeWidth="0.8"
          strokeDasharray="2 3"
          strokeOpacity="0.65"
        />
        {/* Inner Concentric Perspective Ellipse */}
        <ellipse
          cx="80"
          cy="22"
          rx="60"
          ry="11"
          stroke="#edeea5"
          strokeWidth="0.5"
          strokeOpacity="0.4"
        />
        {/* Horizontal Equatorial Axis Guide */}
        <line
          x1="12"
          y1="22"
          x2="148"
          y2="22"
          stroke="#edeea5"
          strokeWidth="0.5"
          strokeDasharray="2 4"
          strokeOpacity="0.3"
        />
        {/* Center 4-Point Star (Sparkle) */}
        <g transform="translate(71, 13)">
          <path
            d="M9 0C9.4 5.5 12.5 8.6 18 9C12.5 9.4 9.4 12.5 9 18C8.6 12.5 5.5 9.4 0 9C5.5 8.6 8.6 5.5 9 0Z"
            fill="#edeea5"
          />
        </g>
      </svg>
    </div>
  );
}

/* Play Video Squircle Tile: rounded yellow squircle with + shape kinetic ticker */
function PlayVideoTile({ onPlay }: { onPlay?: () => void }) {
  return (
    <button
      type="button"
      onClick={onPlay}
      data-magnetic
      aria-label="Play video"
      className="group relative transition-transform duration-300 active:scale-95 hover:scale-105 cursor-pointer"
    >
      <PlayCursorBadge className="scale-90" />
    </button>
  );
}

/* Full-bleed sticky hero with video background:
   - Mobile: Centered HOY letter unit, welcome headline, play video tile, and star orbit ring
   - Desktop: Kept identical with original 3x3 letter grid and left/right copy
*/
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    const video = videoRef.current;
    if (!el || !video) return;

    if (isVideoModalOpen) {
      video.pause();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isVideoModalOpen]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="sticky top-0 h-[100svh] min-h-[640px] w-full overflow-hidden bg-ink text-canvas z-0"
    >
      {/* Background Video */}
      <video
        ref={videoRef}
        src="/rockcastle.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Dark tint overlay for visual contrast */}
      <div
        aria-hidden
        className="absolute inset-0 bg-black/45 pointer-events-none"
      />

      {/* ========================================================
          MOBILE HERO VIEW (< md)
          ======================================================== */}
      <div className="flex md:hidden absolute inset-0 z-10 flex-col items-center justify-center px-4 pt-14 pb-6 pointer-events-auto">
        {/* Mobile Center Kinetic Logo (replaces HOY letter stack) */}
        <div className="relative mb-3 flex items-center justify-center h-24 w-full">
          <KineticLogo className="!relative !top-auto !left-auto !translate-x-0 !translate-y-0 pointer-events-auto" />
        </div>

        {/* Mobile Welcome & Headline Copy */}
        <div className="mt-3 flex flex-col items-center text-center px-2">
          <p className="text-xs font-semibold tracking-wide text-[#edeea5]">
            <SlideUpText split="words" delay={0.2} stagger={0.02}>
              {hero.label}
            </SlideUpText>
          </p>
          <p className="mt-1.5 max-w-[290px] text-[13px] leading-relaxed font-medium text-white/95">
            <SlideUpText split="words" delay={0.35} stagger={0.015}>
              {hero.headline}
            </SlideUpText>
          </p>
        </div>

        {/* Mobile Play Video Button & Celestial Star Orbit Ring */}
        <div className="mt-5 flex flex-col items-center">
          <PlayVideoTile onPlay={() => setIsVideoModalOpen(true)} />
          <StarOrbitRing />
        </div>
      </div>

      {/* ========================================================
          DESKTOP HERO VIEW (>= md): KineticLogo in Center
          ======================================================== */}
      {/* Clickable Desktop Hit-Zone (opens video modal on click) */}
      <div
        onClick={() => setIsVideoModalOpen(true)}
        aria-label="Play full video"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsVideoModalOpen(true);
          }
        }}
        className="hidden md:block absolute inset-0 z-10 cursor-pointer"
      />

      {/* Hero Custom Play Cursor (Floating Yellow Squircle with Rotating Spoke Text) */}
      <HeroPlayCursor
        containerRef={sectionRef}
        onOpen={() => setIsVideoModalOpen(true)}
      />

      {/* Center Kinetic Logo (replaces 3x3 HOY letter grid) */}
      <div className="hidden md:flex absolute inset-0 items-center justify-center z-20 pointer-events-none">
        <KineticLogo className="pointer-events-auto" />
      </div>

      {/* Primary headline: desktop at left-center */}
      <div className="hidden md:block absolute md:top-1/2 md:-translate-y-1/2 md:left-10 md:max-w-[24rem] z-20 pointer-events-none">
        <p className="mb-2 md:mb-3 text-xs font-medium">
          <SlideUpText split="words" delay={0.2} stagger={0.02}>
            {hero.label}
          </SlideUpText>
        </p>
        <p className="text-lg leading-snug md:text-xl lg:text-2xl">
          <SlideUpText split="words" delay={0.35} stagger={0.015}>
            {hero.headline}
          </SlideUpText>
        </p>
      </div>

      {/* Supporting copy: desktop right-center */}
      <div className="hidden md:block absolute top-1/2 -translate-y-1/2 right-4 max-w-[18rem] lg:max-w-[20rem] text-right text-[15px] lg:text-base leading-relaxed z-20 md:right-10 pointer-events-none">
        <p>
          <SlideUpText split="words" delay={0.45} stagger={0.015}>
            {hero.aside}
          </SlideUpText>
        </p>
      </div>

      {/* ========================================================
          FULLSCREEN VIDEO MODAL (Matches Reference Image 2)
          ======================================================== */}
      <HeroVideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoSrc="/rockcastle.mp4"
        title="Rock Castle — Experiences Un-Ltd."
      />
    </section>
  );
}

