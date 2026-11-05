import { clients } from "@/lib/content";
import "@/components/Clients.css";

/* Single marquee row of all client logos in monochrome black. */
export default function Clients() {
  const track = [...clients.logos, ...clients.logos];

  return (
    <section className="clients" id="clients" aria-labelledby="cl-title">
      <span className="sr-only" id="cl-title">{clients.label}</span>

      {/* Screen readers get one plain list; the moving row is decoration. */}
      <ul className="sr-only">
        {clients.logos.map((c) => (
          <li key={c.name}>{c.name}</li>
        ))}
      </ul>

      <div className="cl-rows" aria-hidden="true">
        <div className="cl-row">
          {track.map((c, i) => (
            <span className="cl-cell" key={`${c.name}-${i}`}>
              <img className="cl-logo" src={`${c.src}?v=black`} alt="" loading="lazy" decoding="async" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
