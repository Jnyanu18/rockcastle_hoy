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

  let cachedRect = null

  let prevTransition = ''

  const onEnter = () => {
    cachedRect = el.getBoundingClientRect()
    el.style.willChange = 'transform'
    prevTransition = el.style.transition
    el.style.transition = 'none'
  }

  const onMove = (e) => {
    if (!cachedRect) {
      cachedRect = el.getBoundingClientRect()
    }
    const cx = cachedRect.left + cachedRect.width / 2
    const cy = cachedRect.top + cachedRect.height / 2
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
    cachedRect = null
    gsap.to(el, {
      x: 0,
      y: 0,
      duration: 0.75,
      ease: 'elastic.out(1, 0.4)',
      overwrite: 'auto',
      onComplete: () => {
        el.style.willChange = ''
        el.style.transition = prevTransition || ''
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

  el.addEventListener('mouseenter', onEnter, { passive: true })
  el.addEventListener('mousemove', onMove, { passive: true })
  el.addEventListener('mouseleave', onLeave, { passive: true })

  return () => {
    delete el.__hasMagnetic
    cachedRect = null
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

    let debounceTimer = null
    const observer = new MutationObserver(() => {
      if (debounceTimer) clearTimeout(debounceTimer)
      debounceTimer = setTimeout(() => {
        scanAndBind()
      }, 250)
    })
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      if (debounceTimer) clearTimeout(debounceTimer)
      observer.disconnect()
      cleanups.forEach((cleanup) => cleanup && cleanup())
      cleanups.clear()
    }
  }, [selector, strength])

  return null
}
