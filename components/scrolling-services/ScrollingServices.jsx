import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SlideUpText from '../ui/slide-up-text'
import './ScrollingServices.css'

gsap.registerPlugin(ScrollTrigger)

/**
 * Scrolling Services — 3 Cards Deck
 *
 * - Active card features large, tall portrait images
 * - Other upcoming sections are anchored firmly at the very bottom of the page
 * - Smooth rising card transitions between sections on scroll
 * - Previous sections dock at the top as clean dimmed headline tabs
 * - Cleared below the fixed navbar
 */

const DEFAULT_ITEMS = [
  {
    index: '01',
    line1: 'How We Work — Methodology &',
    line2: 'Fabrication',
    desc: 'From structural engineering to precision atelier fabrication and live venue load-in — an integrated spatial engineering engine built to deliver the impossible.',
    buttonText: 'Explore How We Work',
    link: '/how-we-work',
    images: [
      '/images/process.webp',
      '/images/services.webp',
      '/images/work-01.webp',
      '/images/signature-01.webp',
    ],
  },
  {
    index: '02',
    line1: 'Stories & Media — Architects of',
    line2: 'the Untold',
    desc: 'Behind the scenes with our collective, visionary brand collaborations, and press celebrating 140+ monumental builds across India and worldwide stages.',
    buttonText: 'Discover Stories & Media',
    link: '/stories',
    images: [
      '/images/hero-reel.webp',
      '/images/work-02.webp',
      '/images/about-intro.webp',
      '/images/work-03.webp',
    ],
  },
  {
    index: '03',
    line1: 'Made by Rock Castle — Showcase of',
    line2: 'Iconic Works',
    desc: 'Our permanent and touring portfolio of monumental stage environments, architectural pavilions, and brand destinations built to captivate thousands.',
    buttonText: 'Explore Portfolio',
    link: '/made-by-rock-castle',
    images: [
      '/images/signature-01.webp',
      '/images/work-01.webp',
      '/images/hero-reel.webp',
      '/images/services.webp',
    ],
  },
]

// Rotating Circular Rock Castle Seal Emblem with Curved Typography
const RockCastleRoundLogo = ({ idSuffix = 'left', text = '★ ROCK CASTLE ★ EXPERIENCES UN-LTD ' }) => (
  <svg
    viewBox="0 0 120 120"
    xmlns="http://www.w3.org/2000/svg"
    className="ss__round-logo-svg"
    aria-label="Rock Castle Rotating Emblem"
  >
    <defs>
      {/* Circle path for curved circular text */}
      <path
        id={`rc-text-path-${idSuffix}`}
        d="M 60,60 m -44,0 a 44,44 0 1,1 88,0 a 44,44 0 1,1 -88,0"
      />
      {/* Circular clip path for center logo */}
      <clipPath id={`rc-logo-clip-${idSuffix}`}>
        <circle cx="60" cy="60" r="27" />
      </clipPath>
    </defs>

    {/* Outer subtle orbital dashed ring */}
    <circle
      cx="60"
      cy="60"
      r="57"
      fill="none"
      stroke="rgba(248, 245, 171, 0.32)"
      strokeWidth="1"
      strokeDasharray="3 3.5"
    />

    {/* Outer solid guide ring */}
    <circle
      cx="60"
      cy="60"
      r="53"
      fill="none"
      stroke="rgba(248, 245, 171, 0.18)"
      strokeWidth="0.8"
    />

    {/* Curved Brand Typography around perimeter */}
    <text
      className="ss__round-logo-text"
      fill="#f8f5ab"
      fontSize="8.2"
      fontFamily="'IBM Plex Mono', monospace"
      fontWeight="500"
      letterSpacing="2.1px"
    >
      <textPath href={`#rc-text-path-${idSuffix}`} startOffset="0%">
        {text}
      </textPath>
    </text>

    {/* Inner decorative disc & golden rim */}
    <circle
      cx="60"
      cy="60"
      r="31"
      fill="#121211"
      stroke="rgba(248, 245, 171, 0.6)"
      strokeWidth="1.2"
    />

    {/* Center Rock Castle Logo image with circular crop */}
    <image
      href="/rockcastle-logo.jpg"
      x="33"
      y="33"
      width="54"
      height="54"
      clipPath={`url(#rc-logo-clip-${idSuffix})`}
      preserveAspectRatio="xMidYMid slice"
    />

    {/* Inner gold seal highlight ring */}
    <circle
      cx="60"
      cy="60"
      r="27"
      fill="none"
      stroke="#f8f5ab"
      strokeWidth="1.2"
      opacity="0.85"
    />
  </svg>
)

export default function ScrollingServices({ items, id = 'services' }) {
  const sectionRef = useRef(null)
  const scrollContainerRef = useRef(null)
  const itemsRef = useRef(null)
  const stRef = useRef(null)
  const data = items || DEFAULT_ITEMS

  useEffect(() => {
    const section = sectionRef.current
    const scrollContainer = scrollContainerRef.current
    const itemsEl = itemsRef.current
    if (!section || !scrollContainer || !itemsEl) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const itemEls = Array.from(section.querySelectorAll('.scrollItem'))
    if (!itemEls.length) return

    // Read natural content heights and collapsed line 1 heights
    const readDimensions = () => {
      gsap.set(itemEls, { clearProps: 'height,transform' })

      const minHeights = itemEls.map((item) => {
        const line1El = item.querySelector('.normalTitleLine--1')
        if (line1El) {
          const rect = line1El.getBoundingClientRect()
          return Math.ceil(rect.height)
        }
        return 42
      })

      const innerHeights = itemEls.map((item) => {
        const inner = item.querySelector('.innerItem')
        return inner ? Math.ceil(inner.getBoundingClientRect().height) : 560
      })

      return { minHeights, innerHeights }
    }

    let { minHeights, innerHeights } = readDimensions()

    // Timeline keyframes:
    // 0.00 - 0.18: Card 0 dwell (active), Card 1 & 2 docked at the bottom of the page
    // 0.18 - 0.46: Transition 0 -> 1 (Card 1 rises smoothly from bottom up to top; Card 0 collapses)
    // 0.46 - 0.58: Card 1 dwell (active), Card 0 docked at top, Card 2 docked at the bottom of the page
    // 0.58 - 0.86: Transition 1 -> 2 (Card 2 rises smoothly from bottom up to top; Card 1 collapses)
    // 0.86 - 1.00: Card 2 dwell (active), Card 0 & 1 docked at top

    const DWELL_1 = 0.18
    const TRANS_1_2_END = 0.46
    const DWELL_2 = 0.58
    const TRANS_2_3_END = 0.86

    const updateCards = (progress) => {
      const p = Math.max(0, Math.min(1, progress))
      const containerH = itemsRef.current ? itemsRef.current.clientHeight : 850
      const gap = 8

      // Determine active index for class tagging
      let activeIndex = 0
      if (p >= 0.70) {
        activeIndex = 2
      } else if (p >= 0.32) {
        activeIndex = 1
      } else {
        activeIndex = 0
      }

      const min0 = minHeights[0] || 42
      const min1 = minHeights[1] || 42
      const min2 = minHeights[2] || 42

      const inner0 = innerHeights[0] || 560
      const inner1 = innerHeights[1] || 560
      const inner2 = innerHeights[2] || 560

      // Card 0:
      // Always at top: y = 0
      let c0_t = 0
      if (p <= DWELL_1) {
        c0_t = 0
      } else if (p < TRANS_1_2_END) {
        c0_t = (p - DWELL_1) / (TRANS_1_2_END - DWELL_1)
      } else {
        c0_t = 1
      }
      const c0_height = inner0 - (inner0 - min0) * c0_t
      const c0_opacity = 1 - (1 - 0.28) * c0_t
      const c0_y = 0

      // Card 1:
      // Top position: min0 + gap
      // Bottom position: containerH - min2 - gap - min1
      const c1_topY = min0 + gap
      const c1_botY = Math.max(c1_topY, containerH - min2 - gap - min1)

      let c1_y, c1_height, c1_opacity
      if (p <= DWELL_1) {
        c1_y = c1_botY
        c1_height = min1
        c1_opacity = 0.28
      } else if (p < TRANS_1_2_END) {
        const t = (p - DWELL_1) / (TRANS_1_2_END - DWELL_1)
        c1_y = c1_botY - (c1_botY - c1_topY) * t
        c1_height = min1 + (inner1 - min1) * t
        c1_opacity = 0.28 + (1 - 0.28) * t
      } else if (p <= DWELL_2) {
        c1_y = c1_topY
        c1_height = inner1
        c1_opacity = 1
      } else if (p < TRANS_2_3_END) {
        const t = (p - DWELL_2) / (TRANS_2_3_END - DWELL_2)
        c1_y = c1_topY
        c1_height = inner1 - (inner1 - min1) * t
        c1_opacity = 1 - (1 - 0.28) * t
      } else {
        c1_y = c1_topY
        c1_height = min1
        c1_opacity = 0.28
      }

      // Card 2:
      // Top position: min0 + gap + min1 + gap
      // Bottom position: containerH - min2
      const c2_topY = min0 + gap + min1 + gap
      const c2_botY = Math.max(c2_topY, containerH - min2)

      let c2_y, c2_height, c2_opacity
      if (p <= DWELL_2) {
        c2_y = c2_botY
        c2_height = min2
        c2_opacity = 0.28
      } else if (p < TRANS_2_3_END) {
        const t = (p - DWELL_2) / (TRANS_2_3_END - DWELL_2)
        c2_y = c2_botY - (c2_botY - c2_topY) * t
        c2_height = min2 + (inner2 - min2) * t
        c2_opacity = 0.28 + (1 - 0.28) * t
      } else {
        c2_y = c2_topY
        c2_height = inner2
        c2_opacity = 1
      }

      const states = [
        { y: c0_y, height: c0_height, opacity: c0_opacity },
        { y: c1_y, height: c1_height, opacity: c1_opacity },
        { y: c2_y, height: c2_height, opacity: c2_opacity },
      ]

      itemEls.forEach((item, i) => {
        const state = states[i]
        if (!state) return

        gsap.set(item, {
          y: Math.round(state.y),
          height: Math.round(state.height),
          opacity: state.opacity,
        })

        item.classList.remove('ss__item--past', 'ss__item--active', 'ss__item--upcoming')
        if (i < activeIndex) {
          item.classList.add('ss__item--past')
        } else if (i === activeIndex) {
          item.classList.add('ss__item--active')
        } else {
          item.classList.add('ss__item--upcoming')
        }
      })
    }

    const iconLeft = section.querySelector('.ss__star--left')
    const iconRight = section.querySelector('.ss__star--right')

    // Create ScrollTrigger on the scrollContainer
    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        trigger: scrollContainer,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          updateCards(self.progress)
          if (iconLeft) gsap.set(iconLeft, { rotate: 720 * self.progress })
          if (iconRight) gsap.set(iconRight, { rotate: -720 * self.progress })
        },
      })

      stRef.current = st
      // Initialize layout
      updateCards(st.progress || 0)
    }, section)

    // Re-measure after images load to ensure perfect pixel heights
    const imgs = Array.from(section.querySelectorAll('img'))
    let loadedCount = 0
    const onImgLoad = () => {
      loadedCount++
      if (loadedCount >= imgs.length) {
        ; ({ minHeights, innerHeights } = readDimensions())
        if (stRef.current) updateCards(stRef.current.progress || 0)
      }
    }

    imgs.forEach((img) => {
      if (img.complete) {
        onImgLoad()
      } else {
        img.addEventListener('load', onImgLoad, { once: true })
      }
    })

    // Debounced window resize recalculation
    let resizeTimer = null
    const handleResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        ; ({ minHeights, innerHeights } = readDimensions())
        if (stRef.current) updateCards(stRef.current.progress || 0)
      }, 150)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(resizeTimer)
      ctx.revert()
    }
  }, [data.length])

  // Click on a title to smoothly scroll directly to that card
  const handleTitleClick = (targetIndex) => {
    if (!stRef.current) return
    const st = stRef.current
    let targetProgress = 0.05
    if (targetIndex === 1) {
      targetProgress = 0.52
    } else if (targetIndex === 2) {
      targetProgress = 0.94
    }
    const scrollY = st.start + targetProgress * (st.end - st.start)
    window.scrollTo({ top: scrollY, behavior: 'smooth' })
  }

  return (
    <section className="servicesBlock" id={id} ref={sectionRef}>
      <div className="howWeRollItemsBlock">
        <div className="scrollContainer" ref={scrollContainerRef}>
          <div className="stickyWrapper">
            {/* Floating rotating corner Rock Castle round logos */}
            <div className="icons" aria-hidden="true">
              <div className="icon ss__star--left" title="Rock Castle">
                <RockCastleRoundLogo idSuffix="left" text="★ ROCK CASTLE ★ EXPERIENCES UN-LTD " />
              </div>
              <div className="icon ss__star--right" title="Rock Castle">
                <RockCastleRoundLogo idSuffix="right" text="★ ROCK CASTLE ★ EXPERIENTIAL STUDIO " />
              </div>
            </div>

            {/* Stacked 3 items deck */}
            <div className="items" ref={itemsRef}>
              {data.map((item, i) => {
                const line1 = item.line1 || item.title
                const line2 = item.line2 || ''

                return (
                  <div
                    className={`scrollItem ${i === 0 ? 'ss__item--active' : 'ss__item--upcoming'}`}
                    key={item.index || i}
                    data-index={i}
                  >
                    <div className="innerContainer">
                      <div className="innerItem">
                        {/* Title: 2 balanced lines */}
                        <div
                          className="normalTitle"
                          onClick={() => handleTitleClick(i)}
                          title={`Jump to ${line1} ${line2}`}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault()
                              handleTitleClick(i)
                            }
                          }}
                        >
                          {/* Line 1: Index Badge + First part */}
                          <div className="normalTitleLine normalTitleLine--1">
                            <span className="numIndex">
                              <SlideUpText split="characters" inView={true} once={true} stagger={0.02}>
                                {`[ ${item.index} ]`}
                              </SlideUpText>
                            </span>
                            <span className="titleText titleText--1">
                              <SlideUpText split="words" inView={true} once={true} stagger={0.025}>
                                {line1}
                              </SlideUpText>
                            </span>
                          </div>

                          {/* Line 2: Second part + Arrow Button */}
                          {line2 && (
                            <div className="normalTitleLine normalTitleLine--2">
                              <span className="titleText titleText--2">
                                <SlideUpText split="words" inView={true} once={true} stagger={0.025} delay={0.06}>
                                  {line2}
                                </SlideUpText>
                              </span>
                              {item.link && (
                                <span className="buttonWrapper">
                                  <Link
                                    to={item.link}
                                    className="arrowButton"
                                    aria-label={`Explore ${line1} ${line2}`}
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <svg viewBox="0 0 24 24">
                                      <path
                                        d="M5 12h14M13 6l6 6-6 6"
                                        stroke="currentColor"
                                        strokeWidth="2.2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        fill="none"
                                      />
                                    </svg>
                                  </Link>
                                </span>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Centered Description & Action CTA */}
                        <div className="itemText">
                          <p>
                            <SlideUpText split="words" inView={true} once={true} stagger={0.015} delay={0.1}>
                              {item.desc}
                            </SlideUpText>
                          </p>
                          {item.buttonText && item.link && (
                            <div className="buttonRow">
                              <Link
                                to={item.link}
                                className="ss__cta-btn"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <span>{item.buttonText}</span>
                                <span className="ss__cta-arrow" aria-hidden="true">→</span>
                              </Link>
                            </div>
                          )}
                        </div>

                        {/* 4 Large Portrait Images */}
                        {item.images && item.images.length > 0 && (
                          <div className="images">
                            {item.images.map((src, j) => (
                              <div className="imageWrapper" key={j}>
                                <img
                                  src={src}
                                  alt={`${line1} — visual ${j + 1}`}
                                  loading="lazy"
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
