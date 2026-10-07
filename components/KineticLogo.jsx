import './KineticLogo.css'

export default function KineticLogo({ className = '' }) {
  return (
    <div className={`kinetic-logo-wrapper ${className}`} aria-label="Rock Castle Logo">
      <div className="kl-stage">
        {/* Main Active Logo Unit */}
        <div className="kl-container">
          <div className="kl-rock-stage">
            <span className="kl-rock-word">ROCK</span>
          </div>

          <div className="kl-castle-text">CASTLE</div>

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
