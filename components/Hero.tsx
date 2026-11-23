"use client";

import { useEffect, useRef, useState } from "react";
import KineticLogo from "@/components/KineticLogo";
import HeroPlayCursor, { PlayCursorBadge } from "@/components/HeroPlayCursor";
import HeroVideoModal from "@/components/HeroVideoModal";
import DotPattern from "@/components/ui/DotPattern";

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
          video.play().catch(() => { });
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

      {/* Cinematic dark overlay: 40% black over the video so the hero text stays legible. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-black/45 pointer-events-none"
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

