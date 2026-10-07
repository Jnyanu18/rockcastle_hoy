import { brand, contact, footer, navigation, social } from "@/data/site";

/* Global footer: minimal, after the contact climax. */
export default function Footer() {
  return (
    <footer className="bg-ink px-5 pb-8 pt-16 text-acid md:px-12 md:pt-20">
      <div className="mx-auto grid max-w-[1680px] grid-cols-2 gap-x-8 gap-y-12 text-[13px] md:grid-cols-4">
        <div className="col-span-2 md:col-span-1">
          <p className="text-[clamp(1.6rem,2.6vw,2.4rem)] font-semibold leading-none tracking-[-0.03em]">{brand.name}</p>
          <p className="mt-3 text-[12px] uppercase tracking-[0.12em] opacity-70">{brand.tagline}</p>
        </div>

        <div>
          <p className="mb-3 text-[11px] uppercase tracking-[0.12em] opacity-60">Navigate</p>
          <ul className="space-y-1">
            {navigation.map((n) => (
              <li key={n.label}>
                <a href={n.href} className="hover:underline underline-offset-4">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-3 text-[11px] uppercase tracking-[0.12em] opacity-60">Contact</p>
          <ul className="space-y-1">
            <li>
              <a href={`mailto:${contact.email}`} className="hover:underline underline-offset-4">
                {contact.email}
              </a>
            </li>
            <li>{contact.phone}</li>
            <li>{contact.location}</li>
          </ul>
        </div>

        <div>
          <p className="mb-3 text-[11px] uppercase tracking-[0.12em] opacity-60">Social</p>
          <ul className="space-y-1">
            {social.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:underline underline-offset-4">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-16 flex max-w-[1680px] flex-col gap-4 border-t border-acid/20 pt-5 text-[12px] md:flex-row md:items-center md:justify-between">
        <p>{footer.copyright}</p>
        <ul className="flex gap-6">
          {footer.legal.map((l) => (
            <li key={l.label}>
              <a href={l.href} className="hover:underline underline-offset-4">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
