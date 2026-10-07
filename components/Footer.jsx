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
      mainEl.style.marginBottom = `${h}px`

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

    ro = new ResizeObserver(() => {
      initReveal()
    })
    ro.observe(footerEl)
    ro.observe(mainEl)

    window.addEventListener('resize', initReveal)

    return () => {
      clearTimeout(timer)
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
        {/* Main 5-Column Studio Grid: Office (Far Left), Contact, Center Logo, Sitemap, Movement (Far Right) */}
        <div className="footer__grid">
          {/* Column 1: Office (Far Left) */}
          <div className="footer__col footer__col--office">
            <h4 className="footer__col-heading">Corporate Office</h4>
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
                src="/rockcastle-logo-black.png"
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

        {/* Bottom Legal / Copyright Bar */}
        <div className="footer__bottom">
          <span className="footer__copyright">
            © {new Date().getFullYear()} Rock Castle Entertainment Pvt. Ltd. · Regd. Office: Sector 12, Dwarka, New Delhi 110075
          </span>
          <div className="footer__bottom-links">
            <a href="#cookies" className="footer__bottom-link">Cookies</a>
            <span className="footer__bottom-sep">/</span>
            <span className="footer__bottom-motto">Experiences Un-ltd.</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
