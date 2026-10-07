import { brand, footer } from "@/data/content";
import Sparkle from "@/components/ui/Sparkle";
import { StackedMark } from "@/components/ui/Wordmark";

/** Pale footer: four columns around a stacked mark, then divider and legal line. */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-pale px-[var(--gutter)] pb-10 pt-[calc(var(--section-y)*0.6)] text-night">
      <div className="grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-12">
        <div className="md:col-span-2 md:col-start-1">
          <p className="text-[0.8125rem] font-medium">Office</p>
          <address className="mt-3 not-italic text-[clamp(14px,1.1vw,17px)] leading-[1.35]">
            {footer.office.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
        </div>

        <div className="md:col-span-2 md:col-start-3">
          <p className="text-[0.8125rem] font-medium">Contact</p>
          <div className="mt-3 text-[clamp(14px,1.1vw,17px)] leading-[1.35]">
            <a href={`tel:${footer.contact.phone.replace(/\s/g, "")}`} className="block hover:underline">
              {footer.contact.phone}
            </a>
            <a href={`mailto:${footer.contact.email}`} className="block hover:underline">
              {footer.contact.email}
            </a>
          </div>
        </div>

        <div className="flex justify-center md:col-span-2 md:col-start-6">
          <StackedMark />
        </div>

        <div className="md:col-span-2 md:col-start-8">
          <p className="text-[0.8125rem] font-medium">Sitemap</p>
          <ul className="mt-3 space-y-1 text-[clamp(14px,1.1vw,17px)] leading-[1.35]">
            {footer.sitemap.map((item) => (
              <li key={item.label}>
                <a href={item.href} className="hover:underline">
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a href={brand.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">
                LinkedIn
              </a>
            </li>
            <li>
              <a href={brand.instagram} target="_blank" rel="noopener noreferrer" className="hover:underline">
                Instagram
              </a>
            </li>
          </ul>
        </div>

        <div className="md:col-span-2 md:col-start-11 md:text-right">
          <p className="flex items-center gap-2 text-[0.8125rem] font-medium md:justify-end">
            <Sparkle size={14} />
            {footer.join.label}
          </p>
          <p className="mt-3 whitespace-pre-line text-[clamp(14px,1.1vw,17px)] leading-[1.35]">
            {footer.join.body}
          </p>
        </div>
      </div>

      <div className="mt-[clamp(48px,6vw,96px)] h-px w-full bg-night" />

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-[0.8125rem]">
        <p>
          © {year} {brand.name}
        </p>
        <a href={footer.cookies.href} className="hover:underline">
          {footer.cookies.label}
        </a>
      </div>
    </footer>
  );
}
