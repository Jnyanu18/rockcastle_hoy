"use client";

import { useEffect, useRef, useState } from "react";
import { hero } from "@/lib/content";
import KineticLogo from "@/components/KineticLogo";
import SlideUpText from "@/components/ui/SlideUpText";
import HeroPlayCursor, { PlayCursorBadge } from "@/components/HeroPlayCursor";
import HeroVideoModal from "@/components/HeroVideoModal";
import DotPattern from "@/components/ui/DotPattern";
import StageLineAnimation from "@/components/figma/StageLineAnimation";

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

      {/* Halftone / Black Dot Matrix Texture Overlay (Matches Reference Figma Design) */}
      <DotPattern variant="hero" />

      {/* ========================================================
          MOBILE HERO VIEW (< md)
          ======================================================== */}
      <div className="flex md:hidden absolute inset-0 z-10 flex-col items-center justify-center px-4 pt-14 pb-8 pointer-events-auto">
        {/* Mobile Center Kinetic Logo */}
        <div className="relative mb-3 flex items-center justify-center h-24 w-full">
          <KineticLogo className="!relative !top-auto !left-auto !translate-x-0 !translate-y-0 pointer-events-auto" />
        </div>

        {/* Mobile Welcome & Headline Copy */}
        <div className="mt-2 flex flex-col items-center text-center px-3 max-w-[340px]">
          <p className="text-[15px] font-medium text-[#ffffff] tracking-tight mb-1">
            <SlideUpText split="words" delay={0.2} stagger={0.02}>
              {hero.welcome || "Welcome!"}
            </SlideUpText>
          </p>
          <p className="text-[12px] leading-[1.42] font-normal text-[#ffffff]/90">
            <SlideUpText split="words" delay={0.3} stagger={0.01}>
              {hero.headline}
            </SlideUpText>
          </p>
          <p className="mt-2 text-[12.5px] font-medium text-[#ffffff]">
            <SlideUpText split="words" delay={0.42} stagger={0.015}>
              {hero.subline || "Big ideas. Brought to life."}
            </SlideUpText>
          </p>
        </div>

        {/* Mobile Play Video Button */}
        <div className="mt-4 flex flex-col items-center">
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

      {/* Center Kinetic Logo */}
      <div className="hidden md:flex absolute inset-0 items-center justify-center z-20 pointer-events-none">
        <KineticLogo className="pointer-events-auto" />
      </div>

      {/* Left Text Section: "Welcome!", main paragraph, and "Big ideas. Brought to life." */}
      <div className="hidden md:block absolute top-1/2 -translate-y-1/2 left-[clamp(60px,9vw,175px)] w-max z-20 pointer-events-none text-left">
        <p className="text-[14px] lg:text-[15px] font-medium text-[#ffffff] tracking-normal mb-2 md:mb-2.5">
          <SlideUpText split="words" delay={0.2} stagger={0.02}>
            {hero.welcome || "Welcome!"}
          </SlideUpText>
        </p>
        <div className="text-[16px] md:text-[17px] lg:text-[20px] xl:text-[23px] leading-[1.28] font-medium tracking-[-0.01em] text-[#ffffff]">
          {(hero.headlineLines || [hero.headline]).map((line, idx) => (
            <span key={idx} className="block whitespace-nowrap">
              <SlideUpText split="words" delay={0.3 + idx * 0.03} stagger={0.01}>
                {line}
              </SlideUpText>
            </span>
          ))}
        </div>
        <p className="mt-3.5 md:mt-4 text-[14px] md:text-[15px] lg:text-[16px] xl:text-[17px] font-medium text-[#ffffff]">
          <SlideUpText split="words" delay={0.52} stagger={0.015}>
            {hero.subline || "Big ideas. Brought to life."}
          </SlideUpText>
        </p>
      </div>

      {/* Right Text Section: Left-aligned supporting copy */}
      <div className="hidden md:block absolute top-1/2 -translate-y-1/2 right-[clamp(60px,10vw,210px)] w-max text-left z-20 pointer-events-none text-[#ffffff]">
        <div className="text-[12px] md:text-[12.5px] lg:text-[13.5px] xl:text-[14px] leading-relaxed font-normal text-[#ffffff]/90">
          {(hero.asideLines || [hero.aside]).map((line, idx) => (
            <span key={idx} className="block whitespace-nowrap">
              <SlideUpText split="words" delay={0.36 + idx * 0.03} stagger={0.01}>
                {line}
              </SlideUpText>
            </span>
          ))}
        </div>
      </div>

      {/* StageLineAnimation at bottom center matching reference image */}
      <StageLineAnimation centered className="hero-stage-line" />

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

