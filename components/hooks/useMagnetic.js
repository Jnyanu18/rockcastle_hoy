"use client";

import { useEffect } from 'react'
import gsap from 'gsap'

export const DEFAULT_MAGNETIC_SELECTOR = [
  '[data-magnetic]',
  '.magnetic',
  '.nav__link',
  '.nav__pill-btn',
  '.nav__social-link',
  '.nav__toggle-btn',
  '.contact-pill-btn',
  '.process-pill-btn',
  '.rx-head__arrow',
  '.arrowButton',
  '.ss__cta-btn',
  '.story-viewer__arrow',
  '.story-viewer__close',
  '.story-viewer__mute',
  'a[aria-label="WhatsApp"]',
  'a[aria-label="Play video"]',
  '#about a[href^="#"]',
  '#works a[href^="#"]',
  '.footer__link',
  '.footer__sitemap-link',
  '.footer__bottom-link',
  '.footer__mobile-cookie',
].join(', ')

/**
 * Attaches a magnetic pull effect to an element.
 * Moving the cursor over the element nudges it toward the pointer.
 * On mouse leave, it springs back smoothly to origin with an elastic settle.
 * Repeated hovers work infinitely without tween cancellation bugs.
 */
function applyMagnetic(el, defaultStrength = 0.32) {
  if (el.__hasMagnetic) return () => {}
  el.__hasMagnetic = true

  const rawStrength = el.getAttribute('data-magnetic-strength')
  const strength = rawStrength ? parseFloat(rawStrength) : defaultStrength

  // Subtle parallax depth for inner text / SVG icon if present
  const inner = el.querySelector('[data-magnetic-inner], span, svg')

  const onEnter = () => {
    el.style.willChange = 'transform'
  }

  const onMove = (e) => {
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) * strength
    const dy = (e.clientY - cy) * strength

    gsap.to(el, {
      x: dx,
      y: dy,
      duration: 0.3,
      ease: 'power2.out',
      overwrite: 'auto',
    })

    if (inner) {
      gsap.to(inner, {
        x: dx * 0.35,
        y: dy * 0.35,
        duration: 0.3,
        ease: 'power2.out',
        overwrite: 'auto',
      })
    }
  }

  const onLeave = () => {
    gsap.to(el, {
      x: 0,
      y: 0,
      duration: 0.75,
      ease: 'elastic.out(1, 0.4)',
      overwrite: 'auto',
      onComplete: () => {
        el.style.willChange = ''
      },
    })
    if (inner) {
      gsap.to(inner, {
        x: 0,
        y: 0,
        duration: 0.75,
        ease: 'elastic.out(1, 0.4)',
        overwrite: 'auto',
      })
    }
  }

  el.addEventListener('mouseenter', onEnter)
  el.addEventListener('mousemove', onMove)
  el.addEventListener('mouseleave', onLeave)

  return () => {
    delete el.__hasMagnetic
    el.removeEventListener('mouseenter', onEnter)
    el.removeEventListener('mousemove', onMove)
    el.removeEventListener('mouseleave', onLeave)
  }
}

/**
 * useMagnetic Hook: Attaches magnetic micro-interactions to elements matching
 * `selector` inside `containerRef`.
 */
export function useMagnetic(containerRef, selector = DEFAULT_MAGNETIC_SELECTOR, strength = 0.32) {
  useEffect(() => {
    const container = containerRef ? containerRef.current : document
    if (!container) return
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduced) return

    const els = container.querySelectorAll(selector)
    const cleanups = []
    els.forEach((el) => {
      cleanups.push(applyMagnetic(el, strength))
    })

    return () => cleanups.forEach((fn) => fn && fn())
  }, [containerRef, selector, strength])
}

/**
 * GlobalMagnetic: Mounts globally to provide seamless magnetic micro-interactions
 * on buttons, pills, CTAs, and arrows across the entire application with
 * automatic MutationObserver support for dynamic modals and elements.
 */
export function GlobalMagnetic({ selector = DEFAULT_MAGNETIC_SELECTOR, strength = 0.32 }) {
  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduced) return

    const cleanups = new Map()

    const scanAndBind = () => {
      const els = document.querySelectorAll(selector)
      els.forEach((el) => {
        if (!cleanups.has(el)) {
          cleanups.set(el, applyMagnetic(el, strength))
        }
      })
    }

    scanAndBind()

    const observer = new MutationObserver(() => {
      scanAndBind()
    })
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      cleanups.forEach((cleanup) => cleanup && cleanup())
      cleanups.clear()
    }
  }, [selector, strength])

  return null
}
