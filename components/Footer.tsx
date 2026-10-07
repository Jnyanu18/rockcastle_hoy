import { footer, site } from "@/lib/siteContent";

/* Pale yellow footer: four compact columns around a centred stacked mark. */
export default function Footer() {
  return (
    <footer className="bg-acid px-5 pb-8 pt-16 text-ink md:px-12 md:pt-20">
      <div className="mx-auto grid max-w-[1680px] grid-cols-2 gap-x-8 gap-y-12 text-[13px] md:grid-cols-[1fr_auto_1fr] md:items-center">
        {/* Left column pair */}
        <div className="flex flex-col gap-10">
          <Column title={footer.office.title} lines={footer.office.lines} />
          <Column title={footer.contact.title} lines={footer.contact.lines} />
        </div>

        {/* Centre: stacked mark */}
        <a
          href="#top"
          aria-label={`${site.name} back to top`}
          className="order-first col-span-2 justify-self-center text-center md:order-none md:col-span-1"
        >
          <span className="block text-[clamp(4rem,9vw,8rem)] font-semibold leading-[0.85] tracking-[-0.04em]">
            {site.name}
          </span>
          <span className="mt-2 block text-[11px] uppercase tracking-[0.2em]">{site.descriptor}</span>
        </a>

        {/* Right column pair */}
        <div className="flex flex-col gap-10 md:items-end md:text-right">
          <div>
            <p className="mb-3 font-medium">{footer.sitemap.title}</p>
            <ul className="space-y-1">
              {footer.sitemap.links.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="hover:underline underline-offset-4">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-3 font-medium">{footer.join.label}</p>
            <p className="max-w-[16rem] md:ml-auto">{footer.join.note}</p>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-16 flex max-w-[1680px] items-center justify-between border-t border-ink pt-5 text-[12px] md:mt-24">
        <p>{footer.copyright}</p>
        <a href="#top" className="hover:underline underline-offset-4">
          {footer.legal}
        </a>
      </div>
    </footer>
  );
}

function Column({ title, lines }: { title: string; lines: string[] }) {
  return (
    <div>
      <p className="mb-3 font-medium">{title}</p>
      {lines.map((l) => (
        <p key={l}>{l}</p>
      ))}
    </div>
  );
}
