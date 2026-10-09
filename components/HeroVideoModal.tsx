"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";

interface HeroVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc?: string;
  title?: string;
}

function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return "00:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export default function HeroVideoModal({
  isOpen,
  onClose,
  videoSrc = "/rockcastle.mp4",
  title = "Rock Castle Showreel",
}: HeroVideoModalProps) {
  const [mounted, setMounted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isDragging, setIsDragging] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock background scroll when modal is open
  useEffect(() => {
    if (!isOpen) return;

    window.__lenis?.stop();
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
      window.__lenis?.start();
    };
  }, [isOpen]);

  // Reset video state when opened
  useEffect(() => {
    if (isOpen) {
      setIsPlaying(true);
      setShowControls(true);
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {
          setIsPlaying(false);
        });
      }
    } else {
      if (videoRef.current) {
        videoRef.current.pause();
      }
    }
  }, [isOpen]);

  // Handle auto-hiding controls during playback
  const resetControlsTimer = useCallback(() => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    if (isPlaying && !isDragging) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 2800);
    }
  }, [isPlaying, isDragging]);

  // Play / Pause toggle
  const togglePlay = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
    resetControlsTimer();
  }, [resetControlsTimer]);

  // Mute / Unmute toggle
  const toggleMute = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
    resetControlsTimer();
  }, [resetControlsTimer]);

  // Video time updates
  const handleTimeUpdate = () => {
    if (!videoRef.current || isDragging) return;
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
    setIsMuted(videoRef.current.muted);
  };

  // Timeline scrubber scrubbing
  const seekToPosition = (clientX: number) => {
    const bar = progressBarRef.current;
    const video = videoRef.current;
    if (!bar || !video || duration <= 0) return;

    const rect = bar.getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const newTime = pos * duration;
    video.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleTimelineMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDragging(true);
    seekToPosition(e.clientX);

    const onMouseMove = (moveEvent: MouseEvent) => {
      seekToPosition(moveEvent.clientX);
    };

    const onMouseUp = () => {
      setIsDragging(false);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  const handleTimelineTouchStart = (e: React.TouchEvent) => {
    e.stopPropagation();
    setIsDragging(true);
    if (e.touches.length > 0) {
      seekToPosition(e.touches[0].clientX);
    }

    const onTouchMove = (moveEvent: TouchEvent) => {
      if (moveEvent.touches.length > 0) {
        seekToPosition(moveEvent.touches[0].clientX);
      }
    };

    const onTouchEnd = () => {
      setIsDragging(false);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };

    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchend", onTouchEnd);
  };

  // Keyboard shortcut controls
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === " " || e.key === "k") {
        e.preventDefault();
        togglePlay();
      } else if (e.key === "m") {
        e.preventDefault();
        toggleMute();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        if (videoRef.current) {
          videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 5);
        }
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        if (videoRef.current) {
          videoRef.current.currentTime = Math.min(duration, videoRef.current.currentTime + 5);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, togglePlay, toggleMute, duration]);

  if (!mounted || !isOpen) return null;

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onMouseMove={resetControlsTimer}
      onClick={togglePlay}
      className="fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-black select-none overflow-hidden"
    >
      {/* ========================================================
          TOP RIGHT: Circular White Close Button with Dark Cross
          ======================================================== */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="Close video player"
        className="fixed top-5 right-5 sm:top-7 sm:right-7 z-[1000000] flex h-11 w-11 sm:h-13 sm:w-13 items-center justify-center rounded-full bg-canvas text-[#242b36] shadow-[0_6px_24px_rgba(0, 0, 0,0.55)] transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* ========================================================
          VIDEO CONTAINER: Cinematic Video Viewport
          ======================================================== */}
      <div className="relative flex h-full w-full items-center justify-center">
        <video
          ref={videoRef}
          src={videoSrc}
          autoPlay
          playsInline
          loop
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          className="h-full w-full object-contain md:object-cover"
        />

        {/* Center Floating Pill: + : PAUSE : + / + : PLAY : + (from Reference Screenshot 2) */}
        <div
          className={`pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
            showControls || !isPlaying ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <div className="pointer-events-auto flex items-center justify-center gap-3.5 rounded-full bg-[#ea7700] px-7 py-3 text-[#242b36] shadow-[0_8px_30px_rgba(0, 0, 0,0.4)] border border-black/10 transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer">
            <span className="text-base font-light select-none leading-none text-[#242b36]">+</span>
            <span className="text-[12px] sm:text-[13px] font-bold tracking-[0.2em] uppercase select-none font-sans text-[#242b36]">
              {isPlaying ? "PAUSE" : "PLAY"}
            </span>
            <span className="text-base font-light select-none leading-none text-[#242b36]">+</span>
          </div>
        </div>
      </div>

      {/* ========================================================
          BOTTOM CONTROL BAR: Play/Pause, Scrubber, Time, Mute
          ======================================================== */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`fixed bottom-0 left-0 right-0 z-[1000000] px-5 pb-6 sm:px-10 sm:pb-8 pt-10 bg-gradient-to-t from-black/85 via-black/40 to-transparent transition-opacity duration-300 ${
          showControls || !isPlaying ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center gap-4 sm:gap-6">
          {/* Play / Pause Toggle Button */}
          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause video" : "Play video"}
            className="flex h-9 w-9 items-center justify-center text-[#ea7700] transition-transform duration-150 hover:scale-110 active:scale-90 cursor-pointer"
          >
            {isPlaying ? (
              // Pause Icon (two vertical bars matching image)
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              // Play Icon (triangle)
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="6 3 20 12 6 21 6 3" />
              </svg>
            )}
          </button>

          {/* Interactive Timeline Scrubber Track */}
          <div
            ref={progressBarRef}
            onMouseDown={handleTimelineMouseDown}
            onTouchStart={handleTimelineTouchStart}
            role="slider"
            aria-label="Video scrubber"
            aria-valuemin={0}
            aria-valuemax={duration}
            aria-valuenow={currentTime}
            className="group relative flex flex-1 h-5 items-center cursor-pointer select-none"
          >
            {/* Background Track */}
            <div className="h-1 w-full rounded-full bg-canvas/25 overflow-hidden transition-all duration-150 group-hover:h-1.5" />

            {/* Filled Progress Bar */}
            <div
              className="absolute left-0 top-1/2 -translate-y-1/2 h-1 group-hover:h-1.5 rounded-full bg-[#ea7700] pointer-events-none transition-all duration-150"
              style={{ width: `${progressPercent}%` }}
            />

            {/* Scrubber Yellow Knob Thumb (Matches Reference Image 2) */}
            <div
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-3.5 w-3.5 rounded-full bg-[#ea7700] shadow-[0_2px_8px_rgba(0, 0, 0,0.5)] border border-black/10 transition-transform duration-150 group-hover:scale-125 pointer-events-none"
              style={{ left: `${progressPercent}%` }}
            />
          </div>

          {/* Time Display */}
          <div className="hidden sm:block text-[12px] font-mono tracking-wider text-canvas/80 select-none whitespace-nowrap">
            <span>{formatTime(currentTime)}</span>
            <span className="mx-1 text-canvas/40">/</span>
            <span>{formatTime(duration)}</span>
          </div>

          {/* Audio Mute / Unmute Button */}
          <button
            type="button"
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute audio" : "Mute audio"}
            className="flex h-9 w-9 items-center justify-center text-canvas/80 transition-colors duration-150 hover:text-[#ea7700] cursor-pointer"
          >
            {isMuted ? (
              // Muted Icon
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </svg>
            ) : (
              // Audio Playing Icon
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
