import { contact } from "@/lib/content";

/* Dark closing call: outlined rounded frame with a cross, a yellow label, a
   large statement, and a single pill CTA. */
export default function Contact() {
  return (
    <section id="contact" className="bg-ink px-4 pb-32 pt-12 text-canvas md:px-10">
      <div className="mx-auto grid max-w-[1600px] gap-12 md:grid-cols-[27%_1fr] md:items-start">
        <div className="flex flex-col gap-8">
          <p className="text-xs tabular-nums">[ {contact.index} ]</p>
          <div aria-hidden className="relative h-72 w-full max-w-[293px] rounded-[42px] border border-canvas md:h-96">
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl leading-none">+</span>
          </div>
        </div>

        <div>
          <p className="text-sm text-canvas">{contact.label}</p>
          <p className="mt-6 text-3xl leading-[1.15] md:text-[44px] lg:text-[52px]">{contact.heading}</p>
          <a
            href={contact.href}
            className="mt-10 inline-flex h-12 items-center rounded-full bg-canvas px-8 text-xs font-medium uppercase tracking-wide text-ink transition-transform duration-300 hover:scale-[1.03]"
          >
            {contact.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
