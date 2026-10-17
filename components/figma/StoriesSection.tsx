"use client";

import { useState } from "react";
import Section from "./Section";
import { BookPlaneDrawing } from "./Drawings";

const filters = ["All", "Events", "Activations", "Exhibitions", "Creative Strategy"] as const;
type Filter = (typeof filters)[number];

const stories: { tag: Exclude<Filter, "All">; label: string; img: string; pill?: boolean }[] = [
  { tag: "Events", label: "Events", img: "/rx/cover-1.jpg", pill: true },
  { tag: "Activations", label: "Activation", img: "/rx/cover-2.jpg" },
  { tag: "Activations", label: "Activation", img: "/rx/cover-3.jpg" },
  { tag: "Exhibitions", label: "Exhibition", img: "/rx/cover-4.jpg" },
  { tag: "Events", label: "Events", img: "/rx/cover-1.jpg", pill: true },
  { tag: "Creative Strategy", label: "Creative Strategy", img: "/rx/cover-2.jpg" },
];

/** Stories section: "Behind every experience, there's a story." + filterable six-card grid. */
export default function StoriesSection() {
  const [active, setActive] = useState<Filter>("All");
  const shown = stories.filter((s) => active === "All" || s.tag === active);

  return (
    <Section id="stories" className="rcf-featured rcf-story-sec" threshold={0.03}>
      <div className="rcf-story-head">
        <div>
          <span className="rcf-eyebrow">Stories<i /></span>
          <h2>Behind every experience,<br />there&rsquo;s a story.</h2>
          <p className="rcf-story-head__sub">Stories we&rsquo;ve brought to life</p>
          <p className="rcf-featured__intro">
            Every experience tells our story&mdash;of passion, creativity, and the pursuit of
            excellence. A showcase of events we&rsquo;ve proudly brought to life, together with our
            clients and partners.
          </p>
        </div>
        <BookPlaneDrawing className="rcf-story-head__art" />
      </div>

      <div className="rcf-filters" role="tablist" aria-label="Filter stories">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            role="tab"
            aria-selected={active === f}
            className={active === f ? "is-active" : ""}
            onClick={() => setActive(f)}
          >
            {f}
          </button>
        ))}
        <em>[ 02 ]</em>
      </div>

      <ul className="rcf-grid">
        {shown.map((f, i) => (
          <li key={`${f.img}-${i}`} className="rcf-card">
            <div className="rcf-card__media">
              <img src={f.img} alt="" loading="lazy" decoding="async" />
              <span className="rcf-chip">{f.label} <i aria-hidden>↗</i></span>
              {f.pill && <span className="rcf-card__pill">Experience <i aria-hidden>↗</i></span>}
            </div>
            <h3>Brookfield Diwali Celebration</h3>
            <small>Lorem ipsum &nbsp; Lorem ipsum &nbsp; Lorem ipsum</small>
          </li>
        ))}
      </ul>
    </Section>
  );
}
