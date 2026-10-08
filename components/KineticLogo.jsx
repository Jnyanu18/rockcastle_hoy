import './KineticLogo.css'

/**
 * Geometric Vector Glyphs crafted to match the exact House of Yellow
 * typography: thick uniform strokes, soft rounded outer corners,
 * and the iconic squircle "O" with a squarish cutout.
 */
function GlyphO({ className = '' }) {
  return (
    <svg viewBox="0 0 68 68" className={`kl-glyph kl-glyph--o ${className}`} aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M 18 0 H 50 C 60 0 68 8 68 18 V 50 C 68 60 60 68 50 68 H 18 C 8 68 0 60 0 50 V 18 C 0 8 8 0 18 0 Z M 22 20 H 46 C 47.5 20 48 20.5 48 22 V 46 C 48 47.5 47.5 48 46 48 H 22 C 20.5 48 20 47.5 20 46 V 22 C 20 20.5 20.5 20 22 20 Z"
        fill="currentColor"
      />
    </svg>
  )
}

function GlyphR({ className = '' }) {
  return (
    <svg viewBox="0 0 68 68" className={`kl-glyph kl-glyph--r ${className}`} aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M 0 4 C 0 1.8 1.8 0 4 0 H 46 C 58.2 0 68 9.8 68 22 C 68 32.8 60.2 41.8 49.5 43.5 L 65.5 65.2 C 66.8 67 65.5 68 63.2 68 H 43 L 28 44 H 20 V 65 C 20 66.8 18.2 68 16 68 H 4 C 1.8 68 0 66.8 0 65 V 4 Z M 20 16 H 44 C 47.3 16 50 18.7 50 22 C 50 25.3 47.3 28 44 28 H 20 V 16 Z"
        fill="currentColor"
      />
    </svg>
  )
}

function GlyphC({ className = '' }) {
  return (
    <svg viewBox="0 0 68 68" className={`kl-glyph kl-glyph--c ${className}`} aria-hidden="true">
      <path
        d="M 66 0 C 67.1 0 68 0.9 68 2 V 18 C 68 19.1 67.1 20 66 20 H 22 C 20.9 20 20 20.9 20 22 V 46 C 20 47.1 20.9 48 22 48 H 66 C 67.1 48 68 48.9 68 50 V 66 C 68 67.1 67.1 68 66 68 H 18 C 8 68 0 60 0 50 V 18 C 0 8 8 0 18 0 Z"
        fill="currentColor"
      />
    </svg>
  )
}

function GlyphK({ className = '' }) {
  return (
    <svg viewBox="0 0 68 68" className={`kl-glyph kl-glyph--k ${className}`} aria-hidden="true">
      <path
        d="M 0 3 C 0 1.3 1.3 0 3 0 H 17 C 18.7 0 20 1.3 20 3 V 24 L 43.5 0.5 C 44.5 -0.5 46 0 47 0 H 64 C 66.2 0 67.2 2.5 65.8 4 L 37 33.5 L 66.5 63.8 C 67.8 65.2 66.8 68 64.8 68 H 47.5 C 46.2 68 45 67.2 44.2 66.2 L 20 40 V 65 C 20 66.7 18.7 68 17 68 H 3 C 1.3 68 0 66.7 0 65 V 3 Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default function KineticLogo({ className = '' }) {
  return (
    <div className={`kinetic-logo-wrapper ${className}`} aria-label="Rock Castle Kinetic Emblem">
      <div className="kl-stage">
        <div className="kl-container">
          <div className="kl-grid-stage">
            {/* 4 Orbiting Letters: R, O, C, K */}
            <div className="kl-orbit-letter kl-orbit-letter--r" title="R">
              <GlyphR />
            </div>
            <div className="kl-orbit-letter kl-orbit-letter--o" title="O">
              <GlyphO />
            </div>
            <div className="kl-orbit-letter kl-orbit-letter--c" title="C">
              <GlyphC />
            </div>
            <div className="kl-orbit-letter kl-orbit-letter--k" title="K">
              <GlyphK />
            </div>

            {/* Central Anchored Squircle O */}
            <div className="kl-center-anchor" title="O (Center)">
              <GlyphO className="kl-glyph--center" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
