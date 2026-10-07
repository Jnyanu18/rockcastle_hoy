import { brand } from "@/data/content";

/** The wide wordmark with a stacked descriptor, as in the reference header. */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 leading-none ${className}`}>
      <span className="font-logo text-[2.6rem] tracking-[-0.02em]">{brand.mark.join("")}</span>
      <span className="flex flex-col text-[0.6rem] font-semibold uppercase leading-[1.05] tracking-[0.02em]">
        <span>{brand.descriptor[0]}</span>
        <span>{brand.descriptor[1]}</span>
      </span>
    </span>
  );
}

/** Stacked mark used in the footer: first letter, all letters, last letter. */
export function StackedMark({ className = "" }: { className?: string }) {
  const [a, b, c] = brand.mark;
  return (
    <div
      className={`flex flex-col items-center font-logo leading-[0.82] tracking-[-0.03em] ${className}`}
      role="img"
      aria-label={brand.name}
    >
      <span className="text-[clamp(2.25rem,4.4vw,4.25rem)]">{a}</span>
      <span className="text-[clamp(2.25rem,4.4vw,4.25rem)]">
        {a}
        {b}
        {c}
      </span>
      <span className="text-[clamp(2.25rem,4.4vw,4.25rem)]">{c}</span>
    </div>
  );
}
