"use client";

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Footer.css'

gsap.registerPlugin(ScrollTrigger)

export default function Footer({ reveal = true }) {
  const footerRef = useRef(null)
  const pathname = usePathname() || '/'

  const sitemapLinks = [
    { label: 'What We Produce', href: '/#capabilities' },
    { label: 'Who We Are', href: '/#about' },
    { label: 'Leadership', href: '/#leadership' },
    { label: 'Client Stories', href: '/stories' },
    { label: 'Connect', href: '/contact' },
  ]

  const handleSitemapClick = (e, href) => {
    const targetMap = {
      '/#capabilities': 'capabilities',
      '/capabilities': 'capabilities',
      '/#what-we-produce': 'capabilities',
      '/#about': 'about',
      '/about': 'about',
      '/#who-we-are': 'about',
      '/#leadership': 'leadership',
      '/leadership': 'leadership',
      '/stories': 'recent-experiences',
      '/#stories': 'recent-experiences',
      '/connect': 'contact',
      '/contact': 'contact',
    }

    const targetId = targetMap[href] || (href.includes('#') ? href.split('#')[1] : null)
    if (targetId && pathname === '/') {
      const el = document.getElementById(targetId)
      if (el) {
        e.preventDefault()
        if (window.__lenis) {
          window.__lenis.scrollTo(el, { duration: 1.2, offset: -20 })
        } else {
          el.scrollIntoView({ behavior: 'smooth' })
        }
      }
    }
  }

  useEffect(() => {
    if (!reveal) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const footerEl = footerRef.current
    if (!footerEl) return

    const mainEl = document.querySelector('main')
    if (!mainEl) return

    let ro = null
    let ctx = null

    const initReveal = () => {
      // Degrade gracefully on small screens if footer is taller than viewport
      const isMobile = window.innerWidth < 768 || footerEl.offsetHeight > window.innerHeight
      if (isMobile) {
        footerEl.classList.remove('footer--reveal')
        footerEl.style.visibility = 'visible'
        footerEl.style.pointerEvents = 'auto'
        mainEl.style.marginBottom = ''
        return
      }

      footerEl.classList.add('footer--reveal')
      const h = footerEl.offsetHeight
      const targetMargin = `${h}px`
      if (mainEl.style.marginBottom !== targetMargin) {
        mainEl.style.marginBottom = targetMargin
      }

      if (ctx) ctx.revert()

      ctx = gsap.context(() => {
        // Gated visibility: only activate when near bottom of main
        ScrollTrigger.create({
          trigger: mainEl,
          start: () => `bottom bottom+=${Math.min(window.innerHeight, 700)}`,
          onEnter: () => {
            footerEl.style.visibility = 'visible'
            footerEl.style.pointerEvents = 'auto'
          },
          onEnterBack: () => {
            footerEl.style.visibility = 'visible'
            footerEl.style.pointerEvents = 'auto'
          },
          onLeaveBack: () => {
            footerEl.style.visibility = 'hidden'
            footerEl.style.pointerEvents = 'none'
          },
          onToggle: (self) => {
            const isVisible = self.isActive || self.progress > 0
            footerEl.style.visibility = isVisible ? 'visible' : 'hidden'
            footerEl.style.pointerEvents = isVisible ? 'auto' : 'none'
          },
        })

        // Immediate check in case main is already within bottom threshold on short pages
        const rect = mainEl.getBoundingClientRect()
        const isNearBottom = rect.bottom <= window.innerHeight + Math.min(window.innerHeight, 700)
        footerEl.style.visibility = isNearBottom ? 'visible' : 'hidden'
        footerEl.style.pointerEvents = isNearBottom ? 'auto' : 'none'
      })

      ScrollTrigger.refresh()
    }

    const timer = setTimeout(() => {
      initReveal()
    }, 60)

    let roTimer = null
    ro = new ResizeObserver(() => {
      if (roTimer) clearTimeout(roTimer)
      roTimer = setTimeout(() => {
        initReveal()
      }, 150)
    })
    ro.observe(footerEl)

    window.addEventListener('resize', initReveal)

    return () => {
      clearTimeout(timer)
      if (roTimer) clearTimeout(roTimer)
      if (ro) ro.disconnect()
      window.removeEventListener('resize', initReveal)
      if (ctx) ctx.revert()
      if (mainEl) mainEl.style.marginBottom = ''
      footerEl.classList.remove('footer--reveal')
      footerEl.style.visibility = ''
      footerEl.style.pointerEvents = ''
    }
  }, [reveal, pathname])

  return (
    <footer ref={footerRef} className="footer" id="footer" aria-label="Site Footer">
      <div className="footer__inner">
        {/* Top CTA Strip: Newsletter / Contact Prompt */}
        <div className="footer__cta">
          <p className="footer__cta-heading">Have a project in mind?</p>
          <div className="footer__cta-row">
            <a href="mailto:info@rockcastle.in" className="footer__cta-email">info@rockcastle.in</a>
            <Link href="/contact" className="footer__cta-btn">Start a Conversation</Link>
          </div>
        </div>

        {/* Main Studio Grid: Office (Far Left), Contact, Center Logo, Sitemap, Social, Movement (Far Right) */}
        <div className="footer__grid">
          {/* Column 1: Office (Far Left) */}
          <div className="footer__col footer__col--office">
            <h4 className="footer__col-heading">Office</h4>
            <div className="footer__col-content">
              <p>1st Floor, Plus Offices</p>
              <p>Landmark Cyber Park, Sector 67</p>
              <p>Gurugram, Haryana 122018</p>
            </div>
          </div>

          {/* Column 2: Contact */}
          <div className="footer__col footer__col--contact">
            <h4 className="footer__col-heading">Contact</h4>
            <div className="footer__col-content">
              <a href="tel:+919717733823" className="footer__link">+91 97177 33823</a>
              <a href="tel:+919810222642" className="footer__link">+91 98102 22642</a>
              <a href="mailto:info@rockcastle.in" className="footer__link">info@rockcastle.in</a>
              <div className="footer__indicator" aria-hidden="true" />
            </div>
          </div>

          {/* Center Column: Rock Castle Logo */}
          <div className="footer__col footer__col--center">
            <Link href="/" className="footer__logo-link" aria-label="Rock Castle Home">
              <img
                src="/rockcastle-logo.jpg"
                alt="Rock Castle"
                className="footer__logo-img"
              />
            </Link>
          </div>

          {/* Column 3: Sitemap */}
          <div className="footer__col footer__col--sitemap">
            <h4 className="footer__col-heading">Sitemap</h4>
            <nav className="footer__nav" aria-label="Footer Sitemap">
              {sitemapLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="footer__link footer__link--nav"
                  onClick={(e) => handleSitemapClick(e, item.href)}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Column: Social */}
          <div className="footer__col footer__col--social">
            <h4 className="footer__col-heading">Follow</h4>
            <div className="footer__col-content footer__socials">
              <a
                href="https://www.linkedin.com/company/rock-castle-entertainment-pvt-ltd"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__link footer__social-link"
              >
                <svg className="footer__social-icon" viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                  <circle cx="4.98" cy="4.98" r="2.5" />
                  <rect x="2.5" y="9.5" width="4.96" height="12" rx="0.5" />
                  <path d="M14.5 9.5c-2.4 0-3.5 1.3-4.1 2.2V9.5H6.2c.05 1 0 12 0 12h4.2v-6.7c0-.36.03-.72.13-.98.28-.72.93-1.47 2.03-1.47 1.43 0 2 1.09 2 2.69V21.5h4.2v-7.2c0-3.86-2.06-5.8-4.26-5.8z" />
                </svg>
                LinkedIn
              </a>
              <a
                href="https://www.instagram.com/rockcastle.experiences"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__link footer__social-link"
              >
                <svg
                  className="footer__social-icon"
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
                Instagram
              </a>
            </div>
          </div>

          {/* Column 4: Join the movement (Far Right) */}
          <div className="footer__col footer__col--movement">
            <h4 className="footer__col-heading footer__col-heading--movement">
              <span className="footer__plus">+</span> Join the movement
            </h4>
            <div className="footer__col-content">
              <p className="footer__movement-text">
                Architects of the untold —<br />
                monumental builds worldwide.
              </p>
            </div>
          </div>
        </div>

        {/* Desktop Bottom Legal / Copyright Bar */}
        <div className="footer__bottom footer__bottom--desktop">
          <span className="footer__copyright">
            © {new Date().getFullYear()} Rock Castle Entertainment Pvt. Ltd. · Regd. Office: Sector 12, Dwarka, New Delhi 110075
          </span>
          <div className="footer__bottom-links">
            <a href="#privacy-policy" className="footer__bottom-link">Privacy Policy</a>
            <span className="footer__bottom-sep">/</span>
            <a href="#terms" className="footer__bottom-link">Terms</a>
            <span className="footer__bottom-sep">/</span>
            <a href="#cookies" className="footer__bottom-link">Cookies</a>
            <span className="footer__bottom-sep">/</span>
            <span className="footer__bottom-motto">Experiences Un-ltd.</span>
          </div>
        </div>

        {/* Mobile Bottom Bar (Matches reference image) */}
        <div className="footer__bottom footer__bottom--mobile">
          <div className="footer__mobile-links">
            <a href="#privacy-policy" className="footer__mobile-cookie">Privacy Policy</a>
            <a href="#terms" className="footer__mobile-cookie">Terms</a>
            <a href="#cookies" className="footer__mobile-cookie">Cookies</a>
          </div>
          <p className="footer__mobile-copy">© {new Date().getFullYear()} Rock Castle</p>
        </div>
      </div>
    </footer>
  )
}
