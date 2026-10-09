"use client";

import { useEffect, useRef, useState } from "react";
import { hero } from "@/lib/content";
import KineticLogo from "@/components/KineticLogo";
import SlideUpText from "@/components/ui/SlideUpText";
import HeroPlayCursor, { PlayCursorBadge } from "@/components/HeroPlayCursor";
import HeroVideoModal from "@/components/HeroVideoModal";

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
      {/* Background Video: slow continuous Ken-Burns drift + fade-in on mount */}
      <video
        ref={videoRef}
        src="/rockcastle.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="hero-video-kenburns absolute inset-0 h-full w-full object-cover"
      />

      {/* Vignette overlay: darker at the edges, lighter through the center,
          so the single clip reads as directed rather than a flat tint. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0, 0, 0,0.22)_0%,rgba(0, 0, 0,0.4)_55%,rgba(0, 0, 0,0.72)_100%)] pointer-events-none"
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
          <p className="text-xs font-semibold tracking-wide text-[#f4f6f9]">
            <SlideUpText split="words" delay={0.2} stagger={0.02}>
              {hero.label}
            </SlideUpText>
          </p>
          <p className="mt-1.5 max-w-[260px] text-[11px] leading-relaxed font-medium text-[#f4f6f9]">
            <SlideUpText split="words" delay={0.35} stagger={0.015}>
              {hero.headline}
            </SlideUpText>
          </p>
        </div>

        {/* Mobile Play Video Button */}
        <div className="mt-5 flex flex-col items-center">
          <PlayVideoTile onPlay={() => setIsVideoModalOpen(true)} />
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

      {/* Primary headline: desktop at left-center, matching House of Yellow reference scale exactly */}
      <div className="hidden md:block absolute md:top-1/2 md:-translate-y-1/2 md:left-6 lg:left-10 xl:left-12 md:max-w-[280px] lg:max-w-[310px] z-20 pointer-events-none">
        <p className="mb-2.5 md:mb-3 text-[14px] lg:text-[15px] font-medium text-[#f4f6f9]">
          <SlideUpText split="words" delay={0.2} stagger={0.02}>
            {hero.label}
          </SlideUpText>
        </p>
        <p className="text-[21px] md:text-[23px] lg:text-[25px] leading-[1.22] font-medium tracking-[-0.01em] text-[#f4f6f9]">
          <SlideUpText split="words" delay={0.35} stagger={0.015}>
            {hero.headline}
          </SlideUpText>
        </p>
      </div>

      {/* Supporting copy: desktop right-center, same restrained scale */}
      <div className="hidden md:block absolute top-1/2 -translate-y-1/2 right-4 max-w-[11rem] lg:max-w-[12rem] text-right text-[13px] lg:text-sm leading-relaxed z-20 md:right-8 pointer-events-none text-[#f4f6f9]">
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

