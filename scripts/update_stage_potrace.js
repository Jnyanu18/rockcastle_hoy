const fs = require('fs');
const path = require('path');

const svgPath = path.join(__dirname, '..', 'public', 'stage_potrace.svg');
const svg = fs.readFileSync(svgPath, 'utf-8');

const match = svg.match(/<path d="([^"]+)"/);
if (!match) {
  console.error('Could not match path');
  process.exit(1);
}
const pathD = match[1];

const tsxContent = `"use client";

import { useEffect, useRef, useState } from "react";
import "./StageLineAnimation.css";

interface StageLineAnimationProps {
  className?: string;
}

export default function StageLineAnimation({ className = "" }: StageLineAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={\`stage-line-animation-wrapper \${isInView ? "is-active" : ""} \${className}\`}
      aria-hidden="true"
    >
      <div className="stage-baseline-bar">
        {/* Left continuous horizontal line with accent square */}
        <div className="stage-baseline-left">
          <span className="stage-accent-square" />
        </div>

        {/* Stage Vector Illustration - 100% Exact Reference Vector Graphic */}
        <div className="stage-svg-container">
          <svg
            viewBox="0 0 1514 650"
            xmlns="http://www.w3.org/2000/svg"
            className="stage-svg"
            preserveAspectRatio="xMidYMax meet"
          >
            <path
              d="${pathD}"
              fill="#ee7d2e"
              fillRule="evenodd"
            />
          </svg>
        </div>

        {/* Right extending baseline */}
        <div className="stage-baseline-right" />
      </div>
    </div>
  );
}
`;

fs.writeFileSync(path.join(__dirname, '..', 'components', 'figma', 'StageLineAnimation.tsx'), tsxContent, 'utf-8');
console.log('Successfully wrote StageLineAnimation.tsx with exact Potrace vector!');
