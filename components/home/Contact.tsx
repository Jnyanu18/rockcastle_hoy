import { contact, brand } from "@/data/site";
import { contactSection } from "@/data/home";
import { Reveal } from "../motion";

/* The climax: oversized type, generous space, then the three ways in. No form up front. */
export default function Contact() {
  const details = [
    { label: "Email", value: contact.email, href: `mailto:${contact.email}` },
    { label: "Phone", value: contact.phone, href: `tel:${contact.phone.replace(/\s/g, "")}` },
    { label: "Location", value: contact.location },
  ];

  return (
    <section id="contact" aria-labelledby="contact-heading" className="bg-acid px-5 py-28 md:px-12 md:py-44">
      <div className="mx-auto max-w-[1680px]">
        <div className="mb-14 flex items-baseline justify-between text-[12px] md:mb-20">
          <span>{contactSection.index}</span>
          <span className="text-ink/70">Contact · {brand.name}</span>
        </div>

        <Reveal>
          <h2
            id="contact-heading"
            className="text-[clamp(2.8rem,8.4vw,9.5rem)] font-semibold leading-[0.88] tracking-[-0.055em]"
          >
            {contactSection.headline.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
        </Reveal>

        <div className="mt-20 grid grid-cols-1 gap-12 md:mt-28 md:grid-cols-12 md:gap-10">
          <ul className="grid grid-cols-1 gap-8 sm:grid-cols-3 md:col-span-7 md:gap-10">
            {details.map((d) => (
              <li key={d.label} className="border-t border-ink pt-4">
                <p className="text-[11px] uppercase tracking-[0.12em] text-ink/60">{d.label}</p>
                {d.href ? (
                  <a href={d.href} className="mt-3 block text-[16px] font-medium underline-offset-4 hover:underline">
                    {d.value}
                  </a>
                ) : (
                  <p className="mt-3 text-[16px] font-medium">{d.value}</p>
                )}
              </li>
            ))}
          </ul>

          <div className="md:col-span-5 md:flex md:justify-end">
            <a
              href={contactSection.cta.href}
              className="group inline-flex items-center gap-4 rounded-pill bg-ink px-8 py-5 text-[14px] font-semibold uppercase tracking-[0.1em] text-acid transition-colors duration-500 hover:bg-acid hover:text-ink"
            >
              {contactSection.cta.label}
              <span aria-hidden className="text-lg transition-transform duration-500 ease-cinematic group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
