"use client";

import SlideUpText from "@/components/ui/SlideUpText";
import DotPattern from "@/components/ui/DotPattern";
import "@/components/sections/Leadership.css";

type RockMember = {
  id: string;
  letter: "R" | "O" | "C" | "K";
  color: string;
  name: string;
  role: string;
  photo: string;
  letterPath: string;
  clipPath: string;
  img: {
    x: number;
    y: number;
    width: number;
    height: number;
    preserveAspectRatio: string;
  };
};

const TEAM_MEMBERS: RockMember[] = [
  {
    id: "rock-r",
    letter: "R",
    color: "#ee7d2e",
    name: "Alok Nagpal",
    role: "Founder & Managing Director",
    photo: "/team/alok-cutout.png",
    // Chunky rounded display R with D-counter hole (viewBox 0 0 260 300)
    letterPath:
      "M 38 12 L 154 12 C 216 12, 246 44, 246 96 C 246 134, 228 158, 198 168 C 228 180, 246 206, 246 240 C 246 270, 220 288, 184 288 L 72 288 C 34 288, 14 268, 14 234 L 14 36 C 14 20, 22 12, 38 12 Z M 92 70 L 92 124 L 138 124 C 158 124, 168 114, 168 97 C 168 80, 158 70, 138 70 Z",
    // Open upper region so head/hair stand freely over letter & counter; bottom matches R's outer rounded contour
    clipPath:
      "M 0 0 H 260 V 185 H 246 V 240 C 246 270, 220 288, 184 288 L 72 288 C 34 288, 14 268, 14 234 V 185 H 0 Z",
    img: { x: 16, y: 48, width: 228, height: 240, preserveAspectRatio: "xMidYMin slice" },
  },
  {
    id: "rock-o",
    letter: "O",
    color: "#ee7d2e",
    name: "Pooja Dugar",
    role: "Director & Head of Experiences",
    photo: "/team/pooja-cutout.png",
    // Bold rounded stadium O with central oval counter hole
    letterPath:
      "M 130 12 C 212 12, 248 56, 248 150 C 248 244, 212 288, 130 288 C 48 288, 12 244, 12 150 C 12 56, 48 12, 130 12 Z M 130 74 C 100 74, 86 98, 86 150 C 86 202, 100 226, 130 226 C 160 226, 174 202, 174 150 C 174 98, 160 74, 130 74 Z",
    // Bottom half clips flush along O's exact outer elliptical arc
    clipPath:
      "M 0 0 H 260 V 150 H 248 C 248 244, 212 288, 130 288 C 48 288, 12 244, 12 150 H 0 Z",
    img: { x: 26, y: 52, width: 208, height: 236, preserveAspectRatio: "xMidYMin slice" },
  },
  {
    id: "rock-c",
    letter: "C",
    color: "#f4a454",
    name: "Stage & Technical",
    role: "Architecture & Fabrication",
    photo: "/team/stage-cutout.png",
    // Bold chunky rounded C with open right mouth
    letterPath:
      "M 232 114 C 242 114, 246 106, 244 94 C 236 38, 194 12, 132 12 C 48 12, 12 58, 12 150 C 12 242, 48 288, 132 288 C 196 288, 238 260, 245 204 C 247 192, 242 184, 232 184 L 172 184 C 162 184, 158 190, 154 202 C 148 218, 138 224, 126 224 C 102 224, 92 200, 92 150 C 92 100, 102 76, 126 76 C 138 76, 148 82, 154 98 C 158 108, 162 114, 172 114 Z",
    // Bottom half clips flush along C's exact outer bottom arc
    clipPath:
      "M 0 0 H 260 V 150 H 248 C 248 242, 198 288, 132 288 C 48 288, 12 242, 12 150 H 0 Z",
    img: { x: 16, y: 44, width: 228, height: 244, preserveAspectRatio: "xMidYMax meet" },
  },
  {
    id: "rock-k",
    letter: "K",
    color: "#ee7d2e",
    name: "Live Production",
    role: "Experiential Execution",
    photo: "/team/live-cutout.png",
    // Bold chunky rounded K with upper V-notch, side waist cut, and smooth rounded base
    letterPath:
      "M 36 12 L 74 12 C 88 12, 96 20, 96 34 L 96 106 L 158 26 C 166 16, 176 12, 190 12 L 228 12 C 244 12, 250 24, 240 38 L 178 136 C 172 145, 172 153, 178 162 L 242 252 C 250 266, 242 288, 214 288 L 58 288 C 26 288, 14 268, 14 236 L 14 34 C 14 20, 22 12, 36 12 Z",
    // Bottom clips cleanly along K's lower diagonal edge and rounded base
    clipPath:
      "M 0 0 H 260 V 180 H 192 L 242 252 C 250 266, 242 288, 214 288 L 58 288 C 26 288, 14 268, 14 236 V 180 H 0 Z",
    img: { x: 10, y: 82, width: 240, height: 206, preserveAspectRatio: "xMidYMax slice" },
  },
];

export default function Leadership() {
  return (
    <section className="leadership" id="leadership" aria-label="Leadership">
      <DotPattern variant="peach" />

      <div className="leadership__inner">
        {/* Centered Header (Matches Reference) */}
        <header className="leadership__header">
          <div className="leadership__accent-bar" aria-hidden="true" />
          <h2 className="leadership__title">
            <span className="leadership__title-line">
              <SlideUpText split="words" stagger={0.02} inView once>
                Meet the creative minds
              </SlideUpText>
            </span>
            <span className="leadership__title-line">
              <SlideUpText split="words" stagger={0.02} delay={0.08} inView once>
                behind Rock Castle
              </SlideUpText>
            </span>
          </h2>
          <p className="leadership__kicker">
            <span>Our Team</span>
            <span className="leadership__kicker-dot" aria-hidden="true" />
            <span>Our Strength</span>
          </p>
        </header>

        {/* 4 Giant Bold Letters spelling R O C K with Cutout Portraits */}
        <div className="leadership__rock-grid" role="list">
          {TEAM_MEMBERS.map((member) => (
            <article key={member.id} className="leadership__member" role="listitem">
              <div className="leadership__letter-stage">
                <svg
                  className="leadership__letter-svg"
                  viewBox="0 0 260 300"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  aria-label={`${member.letter} — ${member.name}, ${member.role}`}
                >
                  <defs>
                    <clipPath id={`clip-${member.id}`}>
                      <path d={member.clipPath} />
                    </clipPath>
                  </defs>

                  {/* Giant Colored Display Letter Backdrop */}
                  <path
                    className="leadership__letter-shape"
                    d={member.letterPath}
                    fill={member.color}
                    fillRule="evenodd"
                  />

                  {/* Transparent Portrait Cutout Clipped Cleanly to Letter Base */}
                  <g clipPath={`url(#clip-${member.id})`}>
                    <g className="leadership__portrait-group">
                      <image
                        href={member.photo}
                        x={member.img.x}
                        y={member.img.y}
                        width={member.img.width}
                        height={member.img.height}
                        preserveAspectRatio={member.img.preserveAspectRatio}
                      />
                    </g>
                  </g>
                </svg>
              </div>

              <h3 className="leadership__member-name">{member.name}</h3>
              <p className="leadership__member-role">{member.role}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
