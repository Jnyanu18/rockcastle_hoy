"use client";

import { useState } from "react";
import SlideUpText from "@/components/ui/SlideUpText";
import DotPattern from "@/components/ui/DotPattern";
import "@/components/sections/Leadership.css";

const people = [
  {
    name: "Alok Nagpal",
    role: "Founder & Managing Director",
    photo: "/team/alok-nagpal.png",
    bg: "#d8cbb8",
  },
  {
    name: "Pooja Dugar",
    role: "Director & Head of Experiences",
    photo: "/team/pooja-dugar.png",
    bg: "#f3d5be",
  },
  {
    name: "Technical & Stage Direction",
    role: "Architecture & Fabrication",
    photo: "/team/technical-stage-direction.png",
    bg: "#dcd6ce",
  },
];

export default function Leadership() {
  const [active, setActive] = useState<number>(0);

  return (
    <section className="leadership" id="leadership" aria-label="Leadership">
      <DotPattern variant="peach" />

      <div className="leadership__inner">
        {/* Top Meta Row */}
        <div className="leadership__meta">
          <span className="leadership__eyebrow">
            Our Leadership
            <i aria-hidden="true" />
          </span>
          <span className="leadership__index">[ 05 ]</span>
        </div>

        {/* Centered Header */}
        <header className="leadership__header">
          <h2 className="leadership__title">
            <SlideUpText split="words" stagger={0.02} inView once>
              The people behind the experience
            </SlideUpText>
            <i className="leadership__title-dot" aria-hidden="true" />
          </h2>
          <p className="leadership__subtitle">
            No layers of separation. Every benchmark experience, spatial architecture and live
            stage is directed by our leadership — from the first blueprint to the final cue.
          </p>
        </header>

        {/* Smooth Expanding Pill-to-Square Hover Gallery (3 Team Images) */}
        <div className="leadership__gallery" role="list">
          {people.map((person, index) => {
            const isActive = active === index;
            return (
              <article
                key={person.name}
                role="listitem"
                tabIndex={0}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                onClick={() => setActive(index)}
                style={{ "--card-bg": person.bg } as React.CSSProperties}
                className={`leadership__pill-card${isActive ? " is-active" : ""}`}
              >
                <img
                  src={person.photo}
                  alt={person.name}
                  className="leadership__pill-img"
                  loading="lazy"
                />

                {/* Smooth bottom gradient for crisp white text legibility */}
                <div className="leadership__pill-shade" aria-hidden="true" />

                {/* Bottom Centered Name & Role (Matches Reference Image) */}
                <div className="leadership__pill-caption">
                  <h3 className="leadership__pill-name">{person.name}</h3>
                  <p className="leadership__pill-role">{person.role}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
