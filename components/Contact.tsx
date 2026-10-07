import { contact } from "@/lib/siteContent";
import { Reveal } from "./motion";

/* Closing section: one huge word, a pill, then an editorial contact block. */
export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="bg-ink px-5 pb-28 text-acid md:px-12 md:pb-40">
      <Reveal className="flex flex-col items-center py-24 text-center md:py-40">
        <h2
          id="contact-heading"
          className="text-[clamp(5rem,18vw,17rem)] font-medium leading-[0.85] tracking-[-0.05em]"
        >
          {contact.lead}
        </h2>
        <a
          href={contact.cta.href}
          className="mt-8 inline-flex items-center gap-2 rounded-pill bg-paper px-6 py-3 text-[12px] font-medium uppercase tracking-[0.08em] text-ink transition-colors hover:bg-acid"
        >
          {contact.cta.label}
          <span aria-hidden>+</span>
        </a>
      </Reveal>

      <div className="mx-auto grid max-w-[1680px] grid-cols-1 items-start gap-12 border-t border-acid/20 pt-16 md:grid-cols-[minmax(0,1fr)_minmax(0,2.4fr)] md:pt-24">
        <div className="flex items-start gap-6">
          <span className="text-[12px]">{contact.index}</span>
          <span className="text-[12px]">{contact.marker}</span>
        </div>
        <Reveal>
          <div className="flex flex-col gap-10 md:flex-row md:items-center">
            <div
              aria-hidden
              className="relative grid aspect-[3/4] w-full max-w-[280px] shrink-0 place-items-center rounded-[40px] border border-acid text-3xl font-light"
            >
              +
            </div>
            <p className="text-[clamp(1.6rem,3vw,3rem)] font-medium leading-[1.1] tracking-[-0.02em]">
              {contact.statement}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
