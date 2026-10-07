import type { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  /** solid: filled on night. light: filled on pale. white: filled white. outline: outline only. */
  variant?: "solid" | "light" | "white" | "outline";
  /** Loops the label inside a clipped window, as in the reference CTA. */
  marquee?: boolean;
  icon?: boolean;
  className?: string;
  external?: boolean;
};

const variants = {
  solid: "bg-night text-pale hover:bg-pale hover:text-night",
  light: "bg-pale text-night hover:bg-night hover:text-pale",
  white: "bg-white text-night hover:bg-night hover:text-white",
  outline: "bg-transparent hover:bg-night hover:text-pale",
};

/** Pill-shaped link used for every call to action. */
export default function Pill({
  href,
  children,
  variant = "outline",
  marquee = false,
  icon = false,
  className = "",
  external = false,
}: Props) {
  const linkProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <a
      href={href}
      className={`pill group ${variants[variant]} ${className}`}
      {...linkProps}
    >
      {marquee ? (
        <span className="pill-window" aria-hidden="true">
          <span className="pill-track">
            <span>{children}</span>
            <span>{children}</span>
          </span>
        </span>
      ) : null}
      <span className={marquee ? "sr-only" : undefined}>{children}</span>
      {icon ? (
        <span
          aria-hidden="true"
          className="inline-block transition-transform duration-500 ease-cinematic group-hover:rotate-90"
        >
          +
        </span>
      ) : null}
    </a>
  );
}
