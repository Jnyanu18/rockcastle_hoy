import './KineticLogo.css'
import Sparkle from '@/components/ui/Sparkle'

export default function KineticLogo({ className = '' }) {
  return (
    <div className={`kinetic-logo-wrapper ${className}`} aria-label="Rock Castle Logo">
      <div className="kl-stage">
        {/* Main Active Logo Unit */}
        <div className="kl-container">
          <div className="kl-rock-stage">
            {/* R-O-C-K orbit around the badge, reading clockwise from the top */}
            <div className="kl-letter kl-l-r">R</div>
            <div className="kl-letter kl-l-o">O</div>
            <div className="kl-letter kl-l-c">C</div>
            <div className="kl-letter kl-l-k">K</div>

            {/* CASTLE repeated once per edge, forming a square seal around the center */}
            <div className="kl-castle-ring" aria-hidden="true">
              <span className="kl-castle-edge kl-castle-edge--top">CASTLE</span>
              <span className="kl-castle-edge kl-castle-edge--right">CASTLE</span>
              <span className="kl-castle-edge kl-castle-edge--bottom">CASTLE</span>
              <span className="kl-castle-edge kl-castle-edge--left">CASTLE</span>
            </div>

            <Sparkle size={22} className="kl-sparkle" />
          </div>

          <div className="kl-brush-wrap">
            <svg className="kl-brush-svg" viewBox="0 0 380 20" aria-hidden="true">
              <path d="M 8 10 C 120 7 270 3 330 2 C 342 6 332 11 316 12 C 250 14 110 16 8 10 Z" />
              <circle cx="355" cy="8" r="4.5" />
            </svg>
          </div>

          <div className="kl-tagline">experiences un-ltd.</div>
        </div>
      </div>
    </div>
  )
}
