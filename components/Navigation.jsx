"use client";

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useMagnetic } from './hooks/useMagnetic'
import './Navigation.css'

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [navTheme, setNavTheme] = useState('dark') // 'dark' (white text) | 'light' (dark text)
  const [menuOpen, setMenuOpen] = useState(false)

  const navRef = useRef(null)
  const pathname = usePathname() || '/'
  const router = useRouter()

  useMagnetic(navRef, '.nav__link, .nav__pill-btn, .nav__social-link', 0.25)

  // Scroll detection: theme adaptation, scrolled state, and dynamic hero-to-corner spread
  useEffect(() => {
    const onScroll = () => {
      const y = window.__lenis?.scroll ?? window.scrollY
      setScrolled(y > 30)

      // Calculate scroll progress (0 at top of hero, 1 once scrolled 120px)
      const scrollDist = 120
      const progress = Math.min(1, Math.max(0, y / scrollDist))
      if (navRef.current) {
        navRef.current.style.setProperty('--nav-scroll-p', progress.toFixed(3))
      }

      // Detect background theme (light vs dark sections)
      const navMidY = 46
      const lightSectionIds = [
        'about',
        'who-we-are',
        'what-we-produce',
        'produce',
        'leadership',
        'process',
        'contact',
        'services',
        'testimonials',
        'recent-experiences',
        'clients',
        'brief',
      ]

      let isLight = false
      if (pathname === '/connect' || pathname === '/contact') {
        isLight = true
      } else if (pathname === '/how-we-work') {
        isLight = false
      } else {
        const lightElements = document.querySelectorAll(
          lightSectionIds.map((id) => `#${id}, .${id}`).join(', ')
        )

        for (const el of lightElements) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= navMidY && rect.bottom > navMidY) {
            isLight = true
            break
          }
        }
      }

      setNavTheme(isLight ? 'light' : 'dark')
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    if (window.__lenis) {
      window.__lenis.on('scroll', onScroll)
    }
    // Also retry attaching to Lenis in case it initialized slightly after
    const lenisCheckTimer = setTimeout(() => {
      if (window.__lenis) {
        window.__lenis.on('scroll', onScroll)
      }
    }, 100)

    onScroll()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.__lenis?.off('scroll', onScroll)
      clearTimeout(lenisCheckTimer)
    }
  }, [pathname, menuOpen])

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
      window.__lenis?.stop()
    } else {
      document.body.style.overflow = ''
      window.__lenis?.start()
    }
  }, [menuOpen])

  const toggleMenu = () => setMenuOpen((prev) => !prev)
  const closeMenu = () => setMenuOpen(false)

  // In-page section targets for single-page smooth scroll fallback
  const sectionMap = {
    '/': 'home',
    '/made-by-rock-castle': 'recent-experiences',
    '/stories': 'recent-experiences',
    '/how-we-work': 'process',
  }

  const handleNavClick = (e, href) => {
    closeMenu()

    // Dedicated routes that should always navigate to the page
    if (href === '/contact' || href === '/connect') {
      if (pathname === '/contact' || pathname === '/connect') {
        e.preventDefault()
        if (window.__lenis) {
          window.__lenis.scrollTo(0, { duration: 1 })
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }
        return
      }
      e.preventDefault()
      router.push('/contact')
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { immediate: true })
      } else {
        window.scrollTo(0, 0)
      }
      return
    }

    // Smooth scroll if matching target section is available on current page
    if (pathname === '/') {
      if (href === '/') {
        e.preventDefault()
        if (window.__lenis) {
          window.__lenis.scrollTo(0, { duration: 1 })
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }
        return
      }

      const targetId = sectionMap[href] || (href.startsWith('#') ? href.slice(1) : null)
      if (targetId) {
        const el = document.getElementById(targetId)
        if (el) {
          e.preventDefault()
          if (window.__lenis) {
            window.__lenis.scrollTo(el, { duration: 1.2, offset: -20 })
          } else {
            el.scrollIntoView({ behavior: 'smooth' })
          }
          return
        }
      }
    }

    // Default route navigation
    if (pathname === href) {
      e.preventDefault()
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { duration: 1 })
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    } else {
      e.preventDefault()
      router.push(href)
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { immediate: true })
      } else {
        window.scrollTo(0, 0)
      }
    }
  }

  // Exact separate route destinations
  const links = [
    { href: '/', label: 'Home' },
    { href: '/made-by-rock-castle', label: 'Made by rock castle' },
    { href: '/stories', label: 'Stories' },
    { href: '/how-we-work', label: 'How we work' },
  ]

  const isLinkActive = (href) => {
    if (href === '/') return pathname === '/'
    if (href === '/made-by-rock-castle') {
      return pathname === '/made-by-rock-castle' || pathname.startsWith('/work')
    }
    return pathname === href
  }

  return (
    <>
      <header
        ref={navRef}
        className={`nav nav--theme-${navTheme} ${scrolled ? 'nav--scrolled' : ''}`}
      >
        <div className="nav__inner">
          {/* Left: Primary Section Navigation Links */}
          <nav className="nav__links" aria-label="Main Navigation">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`nav__link ${isLinkActive(l.href) ? 'nav__link--active' : ''}`}
                onClick={(e) => handleNavClick(e, l.href)}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Center: Rockcastle Logo & Stacked Brand Name (Pinned Dead Center) */}
          <div className="nav__brand-center-anchor">
            <Link
              href="/"
              className="nav__brand"
              aria-label="Rockcastle Home"
              onClick={(e) => handleNavClick(e, '/')}
            >
              <img src="/rockcastle-logo.jpg" alt="Rockcastle" className="nav__brand-logo" />
              <img
                src="/rockcastle-logo-black.png"
                alt="Rock Castle"
                className="nav__brand-wordmark"
              />
            </Link>
          </div>

          {/* Right: Social Glyphs & Scrolling Yellow Pill CTA */}
          <div className="nav__right">
            {/* Social Icons (LinkedIn & Instagram) */}
            <div className="nav__socials">
              <a
                href="https://www.linkedin.com/company/rock-castle-entertainment-pvt-ltd"
                target="_blank"
                rel="noopener noreferrer"
                className="nav__social-link"
                aria-label="LinkedIn"
              >
                <svg className="nav__social-icon" viewBox="0 0 24 24" width="17" height="17" fill="currentColor">
                  <circle cx="4.98" cy="4.98" r="2.5" />
                  <rect x="2.5" y="9.5" width="4.96" height="12" rx="0.5" />
                  <path d="M14.5 9.5c-2.4 0-3.5 1.3-4.1 2.2V9.5H6.2c.05 1 0 12 0 12h4.2v-6.7c0-.36.03-.72.13-.98.28-.72.93-1.47 2.03-1.47 1.43 0 2 1.09 2 2.69V21.5h4.2v-7.2c0-3.86-2.06-5.8-4.26-5.8z" />
                </svg>
              </a>

              <a
                href="https://www.instagram.com/rockcastle.experiences"
                target="_blank"
                rel="noopener noreferrer"
                className="nav__social-link"
                aria-label="Instagram"
              >
                <svg
                  className="nav__social-icon"
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
            </div>

            {/* Signature Scrolling Yellow Pill Button (Routes to dedicated /contact page) */}
            <Link
              href="/contact"
              className={`nav__pill-btn ${pathname === '/connect' || pathname === '/contact' ? 'nav__pill-btn--active' : ''}`}
              onClick={(e) => handleNavClick(e, '/contact')}
              aria-label="Connect with Rockcastle"
            >
              <div className="nav__pill-track-mask">
                <div className="nav__pill-track">
                  <span>CONNECT</span>
                  <span>CONNECT</span>
                  <span>CONNECT</span>
                  <span>CONNECT</span>
                  <span>CONNECT</span>
                  <span>CONNECT</span>
                </div>
              </div>
              <span className="nav__pill-plus">+</span>
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              className={`nav__toggle ${menuOpen ? 'nav__toggle--active' : ''}`}
              onClick={toggleMenu}
              aria-label="Toggle Navigation Menu"
              aria-expanded={menuOpen}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Menu Drawer */}
      <div className={`menu ${menuOpen ? 'menu--open' : ''}`} aria-hidden={!menuOpen}>
        <div className="menu__header">
          <span className="menu__tag">[ NAVIGATION ]</span>
          <span className="menu__location">GURUGRAM // NEW DELHI // GLOBAL</span>
        </div>

        <nav className="menu__nav">
          {links.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              className={`menu__link ${isLinkActive(l.href) ? 'menu__link--active' : ''}`}
              onClick={(e) => handleNavClick(e, l.href)}
              style={{ transitionDelay: menuOpen ? `${0.06 + i * 0.04}s` : '0s' }}
            >
              <span className="menu__link-index">0{i + 1}</span>
              <span className="menu__link-label">{l.label}</span>
            </Link>
          ))}
        </nav>

        <div className="menu__footer">
          <div className="menu__socials">
            <a
              href="https://www.linkedin.com/company/rock-castle-entertainment-pvt-ltd"
              target="_blank"
              rel="noopener noreferrer"
              className="menu__social-link"
            >
              LinkedIn ↗
            </a>
            <a
              href="https://www.instagram.com/rockcastle.experiences"
              target="_blank"
              rel="noopener noreferrer"
              className="menu__social-link"
            >
              Instagram ↗
            </a>
          </div>

          <Link
            href="/contact"
            className="menu__cta"
            onClick={(e) => handleNavClick(e, '/contact')}
          >
            <span>CONNECT</span>
            <span>+</span>
          </Link>
          <span className="menu__accent">Architects of Unforgettable Spaces</span>
        </div>
      </div>
    </>
  )
}
