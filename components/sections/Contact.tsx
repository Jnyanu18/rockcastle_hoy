import { contact } from "@/data/content";
import Pill from "@/components/ui/Pill";
import Reveal from "@/components/ui/Reveal";
import Sparkle from "@/components/ui/Sparkle";

/** Dark lead-in: outlined frame on the left, large invitation and CTA on the right. */
export default function Contact() {
  return (
    <section id="contact" className="bg-night px-[var(--gutter)] pb-[var(--section-y)] text-pale">
      <div className="grid grid-cols-1 gap-y-12 md:grid-cols-12 md:gap-x-6">
        <p className="text-[0.8125rem] md:col-span-1">{contact.index}</p>

        <Reveal variant="clip" className="md:col-span-2 md:col-start-2">
          <div
            aria-hidden
            className="relative aspect-[293/360] w-full max-w-[293px] border border-pale"
            style={{ borderRadius: "var(--radius-frame)" }}
          >
            <Sparkle size={34} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
        </Reveal>

        <div className="md:col-span-9 md:col-start-4">
          <p className="text-[0.875rem] font-medium">{contact.label}</p>
          <Reveal delay={80}>
            <p className="mt-6 max-w-[64rem] text-[length:var(--contact-size)] leading-[1.04] tracking-[-0.015em]">
              {contact.statement}{" "}
              <span className="inline-block">{contact.closing}</span>
            </p>
            <div className="mt-10">
              <Pill href={contact.cta.href} variant="white" marquee icon>
                {contact.cta.label}
              </Pill>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
