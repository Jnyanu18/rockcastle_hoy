import "@/components/Awards.css";

const AWARDS_LIST = [
  {
    year: "2025",
    title: "Gold - Brand Experience of the Year",
  },
  {
    year: "2025",
    title: "Gold - Best Music Festival",
  },
  {
    year: "2025",
    title: "Silver - Best Use of Storytelling",
  },
  {
    year: "2025",
    title: "Bronze - Best PR/ Media Event of the Year",
  },
  {
    year: "2025",
    title: "Bronze - Enhancing Brand Experience Through Space Design",
  },
];

function RedCarpetAwardLogo() {
  return (
    <svg
      className="aw-logo"
      viewBox="0 0 240 108"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Top "e4m" mark */}
      <text
        x="120"
        y="19"
        textAnchor="middle"
        fill="#ffffff"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight="800"
        fontSize="16"
        letterSpacing="-0.4"
      >
        e4m
      </text>

      {/* Main "RedCarpet" condensed wordmark */}
      <text
        x="120"
        y="55"
        textAnchor="middle"
        fill="#ffffff"
        fontFamily="Impact, 'Arial Narrow', Arial, sans-serif"
        fontWeight="700"
        fontSize="35"
        letterSpacing="0.4"
        transform="scale(0.88 1.08)"
        style={{ transformOrigin: "120px 46px" }}
      >
        <tspan fill="#ffffff">Red</tspan>
        <tspan fill="#e2e2e2">Carpet</tspan>
      </text>

      {/* Unrolled Carpet Base Line + Left & Right Rolled Carpet Spirals */}
      <path
        d="
          M 29 48
          C 29 43, 35 43, 35 48
          C 35 54, 24 54, 24 46
          C 24 36, 40 36, 40 48
          C 40 59, 19 60, 19 46
          C 19 32, 42 32, 42 46
          M 28 60
          L 212 60
          M 211 48
          C 211 43, 205 43, 205 48
          C 205 54, 216 54, 216 46
          C 216 36, 200 36, 200 48
          C 200 59, 221 60, 221 46
          C 221 32, 198 32, 198 46
        "
        stroke="#ffffff"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Outer spiral bottom connection to the horizontal carpet line */}
      <path
        d="M 19 46 C 19 56, 23 60, 30 60 L 210 60 C 217 60, 221 56, 221 46"
        stroke="#ffffff"
        strokeWidth="3.4"
        strokeLinecap="round"
      />

      {/* Subtitle: EXPERIENTIAL MARKETING */}
      <text
        x="120"
        y="76"
        textAnchor="middle"
        fill="#ffffff"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight="800"
        fontSize="11.5"
        letterSpacing="0.9"
      >
        EXPERIENTIAL MARKETING
      </text>

      {/* Subtitle: AWARDS 2025 */}
      <text
        x="120"
        y="91"
        textAnchor="middle"
        fill="#ffffff"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight="800"
        fontSize="11.5"
        letterSpacing="1.1"
      >
        AWARDS 2025
      </text>
    </svg>
  );
}

export default function Awards() {
  /* Four copies so the two halves are identical and wide enough for seamless -50% loop */
  const track = [...AWARDS_LIST, ...AWARDS_LIST, ...AWARDS_LIST, ...AWARDS_LIST];

  return (
    <section className="awards" id="awards" aria-labelledby="aw-heading">
      <h2 className="aw-heading" id="aw-heading">
        AWARDS<i aria-hidden="true" />
      </h2>

      {/* Screen-reader accessible list */}
      <ul className="sr-only">
        {AWARDS_LIST.map((item) => (
          <li key={item.title}>
            {item.year} — {item.title}
          </li>
        ))}
      </ul>

      <div className="aw-rows" aria-hidden="true">
        <div className="aw-row">
          {track.map((item, i) => (
            <div className="aw-cell" key={`${item.title}-${i}`}>
              <RedCarpetAwardLogo />
              <p className="aw-year">{item.year}</p>
              <p className="aw-title">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

