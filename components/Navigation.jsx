"use client";

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useMagnetic } from './hooks/useMagnetic'
import './Navigation.css'

/** Walks up from `el` to find the nearest non-transparent background-color. */
function getEffectiveBg(el) {
  while (el && el !== document.documentElement) {
    const bg = getComputedStyle(el).backgroundColor
    const m = bg.match(/rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)(?:,\s*([\d.]+))?\)/)
    if (m) {
      const alpha = m[4] !== undefined ? parseFloat(m[4]) : 1
      if (alpha > 0.5) {
        return [parseFloat(m[1]), parseFloat(m[2]), parseFloat(m[3])]
      }
    }
    el = el.parentElement
  }
  const bodyBg = getComputedStyle(document.body).backgroundColor
  const m = bodyBg.match(/rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)/)
  return m ? [parseFloat(m[1]), parseFloat(m[2]), parseFloat(m[3])] : [17, 25, 37]
}

/** Samples what is rendered beneath the fixed nav bar: 'cream' | 'cement' | 'dark'. */
function backgroundKind(navEl) {
  if (!navEl || typeof document.elementsFromPoint !== 'function') return 'dark'
  const rect = navEl.getBoundingClientRect()
  const sampleX = window.innerWidth / 2
  const sampleY = Math.min(window.innerHeight - 1, rect.bottom + 12)
  const stack = document.elementsFromPoint(sampleX, sampleY)
  const behind = stack.find((el) => !navEl.contains(el) && el !== navEl)
  const [r, g, b] = getEffectiveBg(behind || document.body)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  if (luminance <= 0.6) return 'dark'
  return r - b > 8 ? 'cream' : 'cement'
}

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [navTheme, setNavTheme] = useState('dark') // 'dark' (white text) | 'light' (dark text)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  const navRef = useRef(null)
  const pathname = usePathname() || '/'
  const router = useRouter()

  useMagnetic(navRef, '.nav__link, .nav__connect, .nav__social-link', 0.25)

  // Scroll detection: theme adaptation, scrolled state, and dynamic hero-to-corner spread
  const scrolledRef = useRef(false)
  const themeRef = useRef('dark')
  const activeSectionRef = useRef('home')
  const lastProgressRef = useRef(-1)

  useEffect(() => {
    // Cache section bounds to avoid querying getBoundingClientRect() on every frame
    let watchBounds = []

    const sectionWatchList = [
      { id: 'contact', navKey: 'contact' },
      { id: 'leadership', navKey: 'team' },
      { id: 'services', navKey: 'services' },
      { id: 'capabilities', navKey: 'services' },
      { id: 'recent-experiences', navKey: 'experience' },
      { id: 'about', navKey: 'about' },
      { id: 'home', navKey: 'home' },
    ]

    const measureSections = () => {
      const scrollY = window.__lenis?.scroll ?? window.scrollY

      // Measure active section watcher targets
      const newWatch = []
      sectionWatchList.forEach((item) => {
        const el = document.getElementById(item.id)
        if (el) {
          const rect = el.getBoundingClientRect()
          let top = rect.top + scrollY
          if (item.id === 'home') {
            // The hero is sticky, so its viewport rect stops reflecting its flow position after scrolling.
            let current = el
            top = 0
            while (current) {
              top += current.offsetTop
              current = current.offsetParent
            }
          }
          newWatch.push({
            navKey: item.navKey,
            top,
            bottom: top + el.offsetHeight,
          })
        }
      })
      watchBounds = newWatch
    }

    measureSections()

    let rafId = 0
    const onScroll = () => {
      rafId = 0
      const y = window.__lenis?.scroll ?? window.scrollY

      // Scrolled state
      const heroBounds = watchBounds.find((section) => section.navKey === 'home')
      const isScrolled = heroBounds ? y >= heroBounds.bottom : y > 30
      if (scrolledRef.current !== isScrolled) {
        scrolledRef.current = isScrolled
        setScrolled(isScrolled)
      }

      // Calculate scroll progress (0 at top of hero, 1 once scrolled 120px)
      const scrollDist = 120
      const progress = Math.min(1, Math.max(0, y / scrollDist))
      if (lastProgressRef.current !== progress && navRef.current) {
        // Only update style when actively transitioning
        if (progress < 1 || lastProgressRef.current < 1) {
          navRef.current.style.setProperty('--nav-scroll-p', progress.toFixed(3))
        }
        lastProgressRef.current = progress
      }

      // Detect background theme by sampling whatever is actually rendered
      // behind the nav bar, rather than maintaining a hand-kept list of
      // "light section" ids that drifts out of sync as sections get
      // restyled.
      // Once scrolled the bar is solid, and it contrasts with the section
      // behind it: navy bar over light sections, white bar over navy ones.
      // At the very top the bar is transparent over the hero video, so it
      // keeps white text there.
      // Scrolled: cement bar ('dark' class) over cream sections, cream bar
      // ('light' class) over cement/dark ones. Unscrolled: text colour only.
      const kind = backgroundKind(navRef.current)
      const targetTheme = !scrolledRef.current
        ? 'dark'
        : (kind === 'cream' ? 'dark' : 'light')
      if (themeRef.current !== targetTheme) {
        themeRef.current = targetTheme
        setNavTheme(targetTheme)
      }

      // Detect active section for navbar link indicator
      let currentSec = 'home'
      for (let i = 0; i < watchBounds.length; i++) {
        const b = watchBounds[i]
        if (y + 240 >= b.top && y + 80 <= b.bottom) {
          currentSec = b.navKey
          break
        }
      }

      if (activeSectionRef.current !== currentSec) {
        activeSectionRef.current = currentSec
        setActiveSection(currentSec)
      }
    }

    const scheduleScroll = () => {
      if (!rafId) {
        rafId = requestAnimationFrame(onScroll)
      }
    }

    window.addEventListener('scroll', scheduleScroll, { passive: true })
    window.addEventListener('resize', measureSections)

    // Remeasure after initial layout settlements
    const layoutTimer = setTimeout(measureSections, 250)
    onScroll()

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', scheduleScroll)
      window.removeEventListener('resize', measureSections)
      clearTimeout(layoutTimer)
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
    '/#home': 'home',
    '/#about': 'about',
    '/#about-us': 'about',
    '/about': 'about',
    '/#our-work': 'recent-experiences',
    '/#work': 'recent-experiences',
    '/#recent-experiences': 'recent-experiences',
    '/#services': 'services',
    '/#capabilities': 'services',
    '/services': 'services',
    '/#team': 'leadership',
    '/#leadership': 'leadership',
    '/team': 'leadership',
    '/#contact': 'contact',
    '/contact': 'contact',
  }

  const handleNavClick = (e, href) => {
    closeMenu()

    // Smooth scroll if matching target section is available on current page
    if (pathname === '/') {
      if (href === '/' || href === '/#home') {
        e.preventDefault()
        if (window.__lenis) {
          window.__lenis.scrollTo(0, { duration: 1 })
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }
        return
      }

      const targetId = sectionMap[href] || (href.includes('#') ? href.split('#')[1] : null)
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
    } else {
      // If navigating from another page (e.g. /contact), push link with hash to go home
      if (href.startsWith('/#') || href === '/') {
        e.preventDefault()
        window.location.assign(href)
        return
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

  // Primary Navigation Links matching Reference Design:
  // Home | About Us | Experience | Services | Team
  const links = [
    { href: '/', label: 'Home' },
    { href: '/#about', label: 'About Us' },
    { href: '/#recent-experiences', label: 'Our Work' },
    { href: '/#services', label: 'Services' },
    { href: '/#team', label: 'Team' },
    { href: '/#contact', label: 'Contact' },
  ]

  const isLinkActive = (href) => {
    if (pathname !== '/') {
      return pathname === href
    }
    if (href === '/' || href === '/#home') return activeSection === 'home'
    if (href === '/#about') return activeSection === 'about'
    if (href === '/#recent-experiences' || href === '/#our-work') return activeSection === 'experience'
    if (href === '/#services' || href === '/#capabilities') return activeSection === 'services'
    if (href === '/#team' || href === '/#leadership') return activeSection === 'team'
    if (href === '/#contact' || href === '/contact') return activeSection === 'contact'
    return false
  }

  return (
    <>
      <header
        ref={navRef}
        className={`nav nav--theme-${navTheme} ${scrolled ? 'nav--scrolled' : ''}`}
      >
        <div className="nav__inner">
          <div className="nav__left">
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
          </div>

          <div className="nav__center">
            <Link
              href="/"
              className="nav__brand"
              aria-label="Rock Castle — Experiences Un-Ltd"
              onClick={(e) => handleNavClick(e, '/')}
            >
              <img
                src="/rockcastle-logo-black.png"
                alt="Rock Castle"
                className="nav__brand-wordmark"
              />
              <span className="nav__brand-divider" aria-hidden="true" />
              <div className="nav__brand-tagline">
                <span>EXPERIENCES</span>
                <span>UN-LTD</span>
              </div>
            </Link>
          </div>

          <div className="nav__right">
            <div className="nav__socials">
              <a
                href="https://www.linkedin.com/company/rock-castle-entertainment-pvt-ltd"
                target="_blank"
                rel="noopener noreferrer"
                className="nav__social-link"
                aria-label="LinkedIn"
              >
                <svg
                  className="nav__social-icon"
                  viewBox="0 0 24 24"
                  width="22"
                  height="22"
                  fill="currentColor"
                >
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26z" />
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
                  width="22"
                  height="22"
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

            <Link
              href="/contact"
              className={`nav__connect-pill ${pathname === '/contact' ? 'nav__connect-pill--active' : ''}`}
              onClick={(e) => handleNavClick(e, '/contact')}
              aria-label="Connect with Rock Castle"
            >
              <span className="nav__connect-plus">+</span>
            </Link>

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
