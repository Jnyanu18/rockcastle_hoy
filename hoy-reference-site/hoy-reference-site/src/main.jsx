import React, {useLayoutEffect, useRef} from 'react';
import {createRoot} from 'react-dom/client';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import './styles.css';

gsap.registerPlugin(ScrollTrigger);

const images = {
  ocean: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=85',
  film: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=85',
  people: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=85',
  portrait: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1200&q=85',
  city: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1200&q=85',
  product: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=85',
  car: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1200&q=85',
  architecture: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1200&q=85'
};

function Logo(){return <div className="logo" aria-label="Studio logo"><span>H</span><span>O</span><span>Y</span><small>creative<br/>studio</small></div>}
function Header(){return <header className="header"><nav className="nav left"><a href="#work">Work</a><a href="#about">About</a><a href="#services">Services</a></nav><a href="#top" className="brand"><Logo/></a><nav className="nav right"><a href="#contact">in</a><a className="connect" href="#contact">CONNECT <b>+</b></a></nav></header>}
function CursorMark(){return <div className="cursor-mark">+</div>}

const projects=[
  {title:'Oceanco — Leviathan',meta:'Film · Campaign · 2025',image:images.ocean},
  {title:'La Fuente x AMG',meta:'Film · Brand · 2025',image:images.film},
  {title:'Broederliefde — Rotterdam Ahoy',meta:'Photography · Culture · 2025',image:images.people}
];

function Hero(){return <section id="top" className="hero section-yellow"><div className="hero-grid"><div className="eyebrow">[01] — WHO WE ARE</div><div className="hero-copy"><h1>Trusted by industry leaders, not because we chose volume, but because we craft stories with intention.</h1><p>From cinematic video and photography to high-end 3D animation, every detail is carefully crafted to create impact, from the first concept to global rollout.</p><div className="actions"><a className="pill dark" href="#work">GET IN TOUCH <span>↗</span></a><a className="pill light" href="#work">VIEW WORK <span>↗</span></a></div></div><div className="hero-art"><CursorMark/><span className="art-label">[ + ]</span></div><div className="hero-note">Every frame tells our story: too of passion, agility,<br/>and the pursuit of brilliance. This is made by Yellow.</div></div></section>}

function Work(){return <section id="work" className="work section-yellow"><div className="section-head"><span>[02]</span><span>SELECTED WORK</span><span>01 — 03</span></div><div className="work-grid">{projects.map((p,i)=><article className="project" key={p.title}><div className="project-image"><img src={p.image} alt=""/><div className="image-chip">[ 0{i+1} ]</div></div><h3>{p.title}</h3><p>{p.meta}</p></article>)}</div><div className="logos"><span>Lymph&Co</span><span>MARCO SCHUITMAKER</span><span>TIME</span><span>GARDEN</span><span>RED BULL</span><span>LIP</span></div></section>}

function About(){return <section id="about" className="about section-black"><div className="section-head"><span>[03]</span><span>ABOUT</span><span>SCROLL TO EXPLORE</span></div><div className="about-grid"><div className="about-image"><img src={images.product} alt=""/><span>[ + ]</span></div><div className="about-copy"><h2>At House of Yellow, we believe every story should have a pulse. From the phone in your hand to the first scroll of a campaign, the immersive experience of our work brings your vision to life, no matter the medium.</h2><div className="about-bottom"><div><small>Creative<br/>studio</small><strong>2</strong><span>Countries</span></div><div><small>Community</small><strong>+4.000</strong><span>Creators</span></div></div></div></div></section>}

function Stats(){return <section className="stats section-black"><div className="stats-image"><img src={images.portrait} alt=""/></div><div className="stats-numbers"><div><small>Followers</small><strong>+21.000</strong></div><div><small>Impressions</small><strong>2.600.000</strong></div><div><small>Engagements</small><strong>210.000</strong></div></div><div className="stats-copy">At House of Yellow, we listen first and create with you, not just for you. Everything happens in-house, fast and focused, like having your own team, without outside firepower.</div><CursorMark/></section>}

const services=[['Video','Video that moves beyond the screen',images.ocean],['Photography','Photography that captures more than moments',images.portrait],['Animation','Animation that brings ideas into motion',images.architecture]];
function Services(){return <section id="services" className="services section-black"><div className="services-top"><span>[04]</span><span>WHAT WE DO</span></div>{services.map((s,i)=><div className="service-row" key={s[0]}><span className="service-num">[0{i+1}]</span><h2>{s[1]}</h2><span className="service-dot">●</span><div className="service-thumbs"><img src={s[2]} alt=""/><img src={i===0?images.film:i===1?images.people:images.car} alt=""/><img src={i===2?images.product:images.city} alt=""/></div></div>)}</section>}

function Contact(){return <section id="contact" className="contact"><div className="contact-main section-black"><div className="contact-title"><span>lead.</span><a className="pill light" href="mailto:hello@example.com">GET IN TOUCH <span>↗</span></a></div><div className="contact-card"><CursorMark/><div><small>LET'S CONNECT</small><h2>If you're looking for a creative partner that combines craftsmanship, speed and impact, let's make something remarkable.</h2><p>Built for brands that want to lead.</p><a className="pill light" href="mailto:hello@example.com">START A PROJECT ↗</a></div></div></div><footer className="footer section-yellow"><div><small>Amsterdam · 2026</small><span>hello@studio.com<br/>+31 20 000 00 00</span></div><Logo/><div><small>MENU</small><span>Work<br/>About<br/>Services<br/>Contact</span></div><div><small>FOLLOW</small><span>Instagram<br/>LinkedIn<br/>Vimeo</span></div><div className="copyright">© 2026 Studio. All rights reserved.</div></footer></section>}

function App(){const root=useRef(); useLayoutEffect(()=>{const lenis=new Lenis({duration:1.15,smoothWheel:true}); function raf(t){lenis.raf(t); ScrollTrigger.update(); requestAnimationFrame(raf)} requestAnimationFrame(raf); const ctx=gsap.context(()=>{gsap.from('.hero-copy h1',{y:80,opacity:0,duration:1.2,ease:'power4.out'}); gsap.from('.hero-copy p,.hero-copy .actions',{y:30,opacity:0,stagger:.12,duration:.8,delay:.35,ease:'power3.out'}); gsap.utils.toArray('.project-image').forEach(el=>gsap.from(el,{scale:.96,clipPath:'inset(8% 8% 8% 8%)',scrollTrigger:{trigger:el,start:'top 85%',end:'top 45%',scrub:1}})); gsap.utils.toArray('.service-row h2').forEach((el,i)=>gsap.fromTo(el,{x:i%2?-80:80},{x:0,scrollTrigger:{trigger:el,start:'top 90%',end:'top 50%',scrub:1}})); gsap.utils.toArray('.contact-title span').forEach(el=>gsap.from(el,{y:60,opacity:0,scrollTrigger:{trigger:el,start:'top 85%',toggleActions:'play none none reverse'},duration:1,ease:'power4.out'}));},root); return()=>{ctx.revert();lenis.destroy()};},[]); return <div ref={root}><Header/><main><Hero/><Work/><About/><Stats/><Services/><Contact/></main><a className="floating" href="#contact">↗</a></div>}

createRoot(document.getElementById('root')).render(<App/>);
