import { statement } from "@/data/content";
import Pill from "@/components/ui/Pill";
import Reveal from "@/components/ui/Reveal";
import Sparkle from "@/components/ui/Sparkle";

/** Yellow statement block with the outlined rounded frame at right. */
export default function Statement() {
  return (
    <section
      id="about"
      className="relative bg-pale px-[var(--gutter)] pb-[calc(var(--section-y)*0.5)] pt-[var(--section-y)] text-night"
    >
      <p className="absolute right-[var(--gutter)] top-[calc(var(--section-y)*0.5)] text-[0.8125rem]">
        {statement.index}
      </p>

      <div className="grid grid-cols-1 gap-y-8 md:grid-cols-[26%_1fr]">
        <Reveal>
          <p className="text-[0.8125rem]">{statement.label}</p>
        </Reveal>
        <Reveal delay={80}>
          <p className="max-w-[62rem] text-[length:var(--display-size)] leading-[1.0] tracking-[-0.015em]">
            {statement.body}
          </p>
        </Reveal>
      </div>

      <div className="mt-[clamp(48px,6vw,96px)] grid grid-cols-1 gap-y-8 md:grid-cols-[26%_1fr]">
        <div aria-hidden className="hidden md:block" />
        <Reveal>
          <p className="max-w-[26rem] text-[clamp(18px,1.6vw,26px)] leading-[1.15]">
            {statement.subhead}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Pill href={statement.primary.href} variant="solid" marquee icon>
              {statement.primary.label}
            </Pill>
            <Pill href={statement.secondary.href} variant="outline">
              {statement.secondary.label}
            </Pill>
          </div>
        </Reveal>
      </div>

      {/* Outlined frame with sparkle marks, bottom right */}
      <div
        aria-hidden
        className="relative ml-auto mt-[clamp(48px,6vw,96px)] md:ml-[55%] aspect-[365/440] w-[clamp(220px,23vw,365px)] border border-night"
        style={{ borderRadius: "var(--radius-frame)" }}
      >
        <Sparkle size={44} className="absolute left-[46%] top-[42%] -translate-x-1/2 -translate-y-1/2" />
        <Sparkle size={20} className="absolute left-[38%] top-[30%]" />
        <Sparkle size={22} className="absolute left-[42%] top-[58%]" />
      </div>
    </section>
  );
}
