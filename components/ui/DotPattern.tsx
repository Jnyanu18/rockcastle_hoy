import React, { CSSProperties, ReactNode } from "react";

export interface DotPatternProps {
  /**
   * Predefined aesthetic variants matching the Figma design:
   * - 'peach' / 'light': Subtle black dots (~6.5% opacity) over warm peach/canvas backgrounds (e.g. Who We Are).
   * - 'hero' / 'dark': High-contrast black dots (~32% opacity) over dark video/photo backgrounds (e.g. Hero).
   * - 'custom': Use custom opacity/size.
   */
  variant?: "peach" | "light" | "orange" | "hero" | "dark" | "custom";
  /** Custom opacity (0.0 to 1.0). Overrides the variant default if provided. */
  opacity?: number;
  /** Size in pixels of the repeating 9x9 staggered dot tile (defaults to 9px). */
  size?: number;
  /** Dot radius in pixels within the tile (defaults to 1.15px). */
  dotRadius?: number;
  /** Dot color (defaults to black #000000). */
  dotColor?: string;
  /** Optional CSS class names. */
  className?: string;
  /** Optional inline CSS styles. */
  style?: CSSProperties;
  /** Optional z-index layer (defaults to 1 for light/peach, 5 for dark/hero). */
  zIndex?: number;
  /** Optional mix-blend-mode (e.g. 'multiply', 'normal'). */
  blendMode?: CSSProperties["mixBlendMode"];
  /** Optional children if wrapping content. */
  children?: ReactNode;
}

/* Staggered halftone dot SVG pattern data URI (staggered tile with center dot) */
function getDotPatternDataUri(color: string = "%23000000", radius: number = 1.6, size: number = 9.5): string {
  const half = size / 2;
  const svg = `<svg width='${size}' height='${size}' viewBox='0 0 ${size} ${size}' xmlns='http://www.w3.org/2000/svg'><circle cx='0' cy='0' r='${radius}' fill='${color}'/><circle cx='${size}' cy='0' r='${radius}' fill='${color}'/><circle cx='0' cy='${size}' r='${radius}' fill='${color}'/><circle cx='${size}' cy='${size}' r='${radius}' fill='${color}'/><circle cx='${half}' cy='${half}' r='${radius}' fill='${color}'/></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

/**
 * Reusable DotPattern component.
 *
 * Usage Examples:
 * 1. Self-closing absolute overlay inside any relative section:
 *    ```tsx
 *    <section className="relative ...">
 *      <DotPattern variant="peach" />
 *      ... content ...
 *    </section>
 *    ```
 *
 * 2. In Hero / dark video section:
 *    ```tsx
 *    <DotPattern variant="hero" />
 *    ```
 *
 * 3. As a wrapper around section content:
 *    ```tsx
 *    <DotPattern variant="peach" className="py-20">
 *      <div>Your content here</div>
 *    </DotPattern>
 *    ```
 */
export default function DotPattern({
  variant = "peach",
  opacity,
  size = 9.5,
  dotRadius = 1.6,
  dotColor = "#000000",
  className = "",
  style = {},
  zIndex,
  blendMode,
  children,
}: DotPatternProps) {
  // Determine default opacity and zIndex by variant
  let resolvedOpacity = opacity;
  let resolvedZIndex = zIndex;

  if (resolvedOpacity === undefined) {
    if (variant === "hero" || variant === "dark") {
      resolvedOpacity = 0.14;
    } else if (variant === "orange") {
      resolvedOpacity = 0.08;
    } else {
      // 'peach' or 'light'
      resolvedOpacity = 0.038;
    }
  }

  if (resolvedZIndex === undefined) {
    resolvedZIndex = variant === "hero" || variant === "dark" ? 5 : 1;
  }

  const encodedColor = dotColor.startsWith("#")
    ? dotColor.replace("#", "%23")
    : encodeURIComponent(dotColor);

  const patternBg = getDotPatternDataUri(encodedColor, dotRadius, size);

  const overlayStyle: CSSProperties = {
    backgroundImage: patternBg,
    backgroundSize: `${size}px ${size}px`,
    backgroundRepeat: "repeat",
    opacity: resolvedOpacity,
    zIndex: resolvedZIndex,
    pointerEvents: "none",
    mixBlendMode: blendMode,
    ...style,
  };

  // If children provided, act as a relative wrapper
  if (children) {
    return (
      <div className={`relative ${className}`}>
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={overlayStyle}
        />
        <div className="relative z-10">{children}</div>
      </div>
    );
  }

  // Otherwise, render as an absolute overlay for the parent container
  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={overlayStyle}
    />
  );
}
