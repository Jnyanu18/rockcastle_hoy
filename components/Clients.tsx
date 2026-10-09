import { clients } from "@/lib/content";
import "@/components/Clients.css";

/* Two slow marquee rows of client logos, looping in opposite directions. */
export default function Clients() {
  const half = Math.ceil(clients.logos.length / 2);
  const rows = [clients.logos.slice(0, half), clients.logos.slice(half)];

  return (
    <section className="clients" id="clients" aria-labelledby="cl-title">
      <span className="sr-only" id="cl-title">{clients.label}</span>

      {/* Screen readers get one plain list; the moving rows are decoration. */}
      <ul className="sr-only">
        {clients.logos.map((c) => (
          <li key={c.name}>{c.name}</li>
        ))}
      </ul>

      <div className="cl-rows" aria-hidden="true">
        {rows.map((row, r) => (
          <div className={`cl-row ${r ? "cl-row--reverse" : ""}`} key={r}>
            {/* Four copies: the two halves are identical, so a -50% loop is
                seamless, and each half is wide enough to fill wide screens. */}
            {[...row, ...row, ...row, ...row].map((c, i) => (
              <span className="cl-cell" key={`${c.name}-${i}`}>
                <img className="cl-logo" src={c.src} alt="" loading="lazy" decoding="async" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
