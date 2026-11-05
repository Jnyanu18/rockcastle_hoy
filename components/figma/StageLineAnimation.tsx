"use client";

import { useEffect, useRef, useState } from "react";
import { STAGE_PATH, STAGE_PIECES } from "./stagePath";
import "./StageLineAnimation.css";

interface StageLineAnimationProps {
  className?: string;
  centered?: boolean;
}

export default function StageLineAnimation({ className = "", centered = false }: StageLineAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.35 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`stage-line-animation-wrapper ${centered ? "stage-line--centered" : ""} ${isInView ? "is-active" : ""} ${className}`}
      aria-hidden="true"
    >
      <div className={`stage-baseline-bar ${centered ? "stage-baseline-bar--centered" : ""}`}>
        {/* Stage Vector Illustration - 100% Exact Reference Vector Graphic */}
        <div className={`stage-svg-container ${centered ? "stage-svg-container--centered" : ""}`}>
          <svg
            viewBox="0 0 1514 650"
            xmlns="http://www.w3.org/2000/svg"
            className="stage-svg"
            preserveAspectRatio="xMidYMax meet"
          >
<g className="stage-pen" fill="none">
              {STAGE_PIECES.map((piece, i) => (
                <path key={i} d={piece} pathLength={1} style={{ ["--d" as string]: `${(i * 2.2) / STAGE_PIECES.length}s` }} />
              ))}
            </g>
            <path className="stage-ink" d={STAGE_PATH} fillRule="evenodd" />
          </svg>
        </div>
      </div>
    </div>
  );
}
