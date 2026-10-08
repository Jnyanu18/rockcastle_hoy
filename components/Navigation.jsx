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
  const [activeSection, setActiveSection] = useState('home')

  const navRef = useRef(null)
  const pathname = usePathname() || '/'
  const router = useRouter()

  useMagnetic(navRef, '.nav__link, .nav__pill-btn, .nav__social-link', 0.25)

  // Scroll detection: theme adaptation, scrolled state, and dynamic hero-to-corner spread
  const scrolledRef = useRef(false)
  const themeRef = useRef('dark')
  const activeSectionRef = useRef('home')
  const lastProgressRef = useRef(-1)

  useEffect(() => {
    // Cache section bounds to avoid querying getBoundingClientRect() on every frame
    let lightBounds = []
    let watchBounds = []

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

    const sectionWatchList = [
      { id: 'leadership', navKey: 'team' },
      { id: 'services', navKey: 'services' },
      { id: 'capabilities', navKey: 'services' },
      { id: 'recent-experiences', navKey: 'our-work' },
      { id: 'about', navKey: 'about' },
      { id: 'home', navKey: 'home' },
    ]

    const measureSections = () => {
      const scrollY = window.__lenis?.scroll ?? window.scrollY

      // Measure light sections
      const lightEls = document.querySelectorAll(
        lightSectionIds.map((id) => `#${id}, .${id}`).join(', ')
      )
      const newLight = []
      lightEls.forEach((el) => {
        const rect = el.getBoundingClientRect()
        newLight.push({
          top: rect.top + scrollY,
          bottom: rect.bottom + scrollY,
        })
      })
      lightBounds = newLight

      // Measure active section watcher targets
      const newWatch = []
      sectionWatchList.forEach((item) => {
        const el = document.getElementById(item.id)
        if (el) {
          const rect = el.getBoundingClientRect()
          newWatch.push({
            navKey: item.navKey,
            top: rect.top + scrollY,
            bottom: rect.bottom + scrollY,
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
      const isScrolled = y > 30
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

      // Detect background theme (light vs dark sections)
      const navMidY = 46
      const currentNavY = y + navMidY
      let isLight = false

      if (pathname === '/connect' || pathname === '/contact') {
        isLight = true
      } else if (pathname === '/how-we-work') {
        isLight = false
      } else {
        for (let i = 0; i < lightBounds.length; i++) {
          const b = lightBounds[i]
          if (currentNavY >= b.top && currentNavY < b.bottom) {
            isLight = true
            break
          }
        }
      }

      const targetTheme = isLight ? 'light' : 'dark'
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
        router.push(href)
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

  // Primary Navigation Links: Home | About Us | Our Work | Services | Team
  const links = [
    { href: '/', label: 'Home' },
    { href: '/#about', label: 'About Us' },
    { href: '/#our-work', label: 'Our Work' },
    { href: '/#services', label: 'Services' },
    { href: '/#team', label: 'Team' },
  ]

  const isLinkActive = (href) => {
    if (pathname !== '/') {
      return pathname === href
    }
    if (href === '/' || href === '/#home') return activeSection === 'home'
    if (href === '/#about') return activeSection === 'about'
    if (href === '/#our-work' || href === '/#recent-experiences') return activeSection === 'our-work'
    if (href === '/#services' || href === '/#capabilities') return activeSection === 'services'
    if (href === '/#team' || href === '/#leadership') return activeSection === 'team'
    return false
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
              <img src="/rockcastle-logo.jpg" alt="" aria-hidden="true" className="nav__brand-logo" />
              <span className="nav__brand-word">Rock Castle</span>
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
