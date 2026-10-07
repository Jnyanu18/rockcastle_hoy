import { brand, footer } from "@/lib/content";

/* Footer: yellow field, four information columns around a stacked wordmark,
   then a hairline and the legal row. */
export default function Footer() {
  return (
    <footer className="bg-canvas px-4 pb-8 pt-16 md:px-10">
      <div className="mx-auto grid max-w-[1600px] gap-12 text-sm md:grid-cols-4 md:gap-8">
        <div>
          <p className="mb-4 text-xs">{footer.office.title}</p>
          {footer.office.lines.map((l) => (
            <p key={l}>{l}</p>
          ))}
        </div>

        <div>
          <p className="mb-4 text-xs">{footer.contact.title}</p>
          {footer.contact.lines.map((l) => (
            <p key={l}>{l}</p>
          ))}
        </div>

        {/* Stacked wordmark, placeholder until the client logo is supplied */}
        <div className="order-first flex justify-center md:order-none">
          <p className="text-center text-6xl font-semibold leading-[0.9] tracking-tight" aria-label={`${brand.name} logo`}>
            {brand.shortName.split("").map((c, i) => (
              <span key={i} className="block">
                {c}
              </span>
            ))}
          </p>
        </div>

        <div className="md:text-right">
          <p className="mb-4 text-xs">{footer.sitemap.title}</p>
          <ul className="flex flex-col gap-1 md:items-end">
            {footer.sitemap.links.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="hover:underline underline-offset-4">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-10 flex items-center gap-2 text-xs md:justify-end">
            <span aria-hidden className="text-base leading-none">+</span>
            {footer.join.label}
          </p>
          <p className="mt-2">{footer.join.tagline}</p>
        </div>
      </div>

      <div className="mx-auto mt-16 flex max-w-[1600px] items-center justify-between border-t border-ink/40 pt-6 text-xs">
        <p>{footer.copyright}</p>
        <ul className="flex gap-6">
          {footer.legal.map((l) => (
            <li key={l.label}>
              <a href={l.href}>{l.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
