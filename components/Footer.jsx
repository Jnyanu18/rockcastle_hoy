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

  const navLinks = [
    { label: 'Who We Are', href: '/#about', targetId: 'about' },
    { label: 'Work', href: '/#recent-experiences', targetId: 'recent-experiences' },
    { label: 'Services', href: '/#services', targetId: 'services' },
    { label: 'Leadership', href: '/#leadership', targetId: 'leadership' },
    { label: 'Connect', href: '/contact', targetId: 'contact' },
  ]

  const handleNavClick = (e, item) => {
    if (item.targetId && pathname === '/') {
      const el = document.getElementById(item.targetId)
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
        <div className="footer__grid">
          {/* Brand */}
          <div className="footer__col footer__col--brand">
            <Link href="/" className="footer__logo-link" aria-label="Rock Castle Home">
              <img
                src="/rockcastle-logo-black.png"
                alt="Rock Castle"
                className="footer__logo-img"
              />
            </Link>
          </div>

          {/* Office */}
          <div className="footer__col">
            <h4 className="footer__col-heading">Office</h4>
            <div className="footer__col-content">
              <p>1st Floor, Plus Offices</p>
              <p>Landmark Cyber Park, Sector 67</p>
              <p>Gurugram, Haryana 122018</p>
            </div>
          </div>

          {/* Contact */}
          <div className="footer__col">
            <h4 className="footer__col-heading">Contact</h4>
            <div className="footer__col-content">
              <a href="mailto:info@rockcastle.in" className="footer__link">info@rockcastle.in</a>
              <a href="tel:+919717733823" className="footer__link">+91 97177 33823</a>
              <a href="tel:+919810222642" className="footer__link">+91 98102 22642</a>
            </div>
          </div>

          {/* Navigation */}
          <div className="footer__col">
            <h4 className="footer__col-heading">Explore</h4>
            <nav className="footer__col-content" aria-label="Footer Navigation">
              {navLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="footer__link"
                  onClick={(e) => handleNavClick(e, item)}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Social */}
          <div className="footer__col footer__col--social">
            <h4 className="footer__col-heading">Social</h4>
            <div className="footer__col-content">
              <a
                href="https://www.instagram.com/rockcastle.experiences"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__link"
              >
                Instagram ↗
              </a>
              <a
                href="https://www.linkedin.com/company/rock-castle-entertainment-pvt-ltd"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__link"
              >
                LinkedIn ↗
              </a>
            </div>
          </div>
        </div>

        {/* Minimal Bottom Bar */}
        <div className="footer__bottom">
          <span className="footer__copyright">
            © {new Date().getFullYear()} Rock Castle Entertainment Pvt. Ltd.
          </span>
          <span className="footer__bottom-motto">Experiences Un-ltd.</span>
        </div>
      </div>
    </footer>
  )
}
