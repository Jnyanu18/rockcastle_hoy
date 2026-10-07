import { clients } from "@/lib/content";

/* Horizontal partner strip with hairline dividers. Names are placeholders
   until the client's logo files arrive; they take the same slot. */
export default function Clients() {
  return (
    <section aria-label={clients.label} className="bg-canvas pb-24">
      {/* Negative margins let each cell draw only its right and bottom rule */}
      <ul className="mx-4 grid grid-cols-2 overflow-hidden border-l border-t border-ink/30 md:mx-10 md:grid-cols-4 lg:grid-cols-7">
        {clients.names.map((name) => (
          <li
            key={name}
            className="flex h-24 items-center justify-center border-b border-r border-ink/30 px-4 text-center text-sm font-medium uppercase tracking-wide md:h-28"
          >
            {name}
          </li>
        ))}
      </ul>
    </section>
  );
}
