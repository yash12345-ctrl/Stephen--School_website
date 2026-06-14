import { useState, useEffect, useRef } from 'react';
import './App.css';
import './rabindrajayanti.css';
import { ProgramMegaMenu } from './program_top';
import { BookOpen, Music, Heart, MapPin, Sparkles, Star, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Rabindrajayanti() {
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Interactive Verse Explorer State
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const verses = [
    {
      text: "Clouds come floating into my life, no longer to carry rain or usher storm, but to add color to my sunset sky.",
      source: "Stray Birds"
    },
    {
      text: "The butterfly counts not months but moments, and has time enough.",
      source: "Fireflies"
    },
    {
      text: "I slept and dreamed that life was joy. I awoke and saw that life was service. I acted and behold, service was joy.",
      source: "Lectures & Essays"
    },
    {
      text: "Faith is the bird that feels the light when the dawn is still dark.",
      source: "Gitanjali"
    },
    {
      text: "Let me not pray to be sheltered from dangers, but to be fearless in facing them.",
      source: "Fruit-Gathering"
    },
    {
      text: "Where the mind is without fear and the head is held high; Where knowledge is free; Where the world has not been broken up into fragments by narrow domestic walls...",
      source: "Gitanjali (Song 35)"
    }
  ];

  const handleNextQuote = () => {
    setFade(true);
    setTimeout(() => {
      setQuoteIdx((prev) => (prev + 1) % verses.length);
      setFade(false);
    }, 400);
  };

  const handlePrevQuote = () => {
    setFade(true);
    setTimeout(() => {
      setQuoteIdx((prev) => (prev - 1 + verses.length) % verses.length);
      setFade(false);
    }, 400);
  };

  const highlights = [
    { icon: <Music className="rj-card-icon" size={24} />, title: 'Rabindra Sangeet Choir', desc: 'Our student choir performs soul-stirring renditions of Tagore\'s classic songs, celebrating nature, devotion, and love.', tag: 'Music' },
    { icon: <BookOpen className="rj-card-icon" size={24} />, title: 'Kavya Path (Recitation)', desc: 'Students recite excerpts from Gitanjali, Balaka, and other legendary poems in both Bengali and English.', tag: 'Poetry' },
    { icon: <Sparkles className="rj-card-icon" size={24} />, title: 'Dance Drama (Rabindra Nritya)', desc: 'A colorful stage performance of Tagore\'s famous dance dramas like Chitrangada and Tasher Desh by primary and middle schoolers.', tag: 'Drama' },
    { icon: <Heart className="rj-card-icon" size={24} />, title: 'Art & Cultural Exhibition', desc: 'A display of student paintings inspired by Tagore\'s sketches, alongside an exhibition on his life and travels.', tag: 'Exhibition' },
  ];

  return (
    <div className="rj-page">
      {/* ── NAVBAR ── */}
      <nav className={`navbar navbar--about${scrolled ? ' navbar--fixed' : ''}`}>
        <div className="nav-inner">
          <a href="/" className="nav-logo">
            <div className="logo-crest-wrapper">
              <img loading="lazy" src="/v2.webp" className="logo-crest-img" alt="St. Stephen's Crest" />
            </div>
            <div>
              <div className="logo-name">St. Stephen's</div>
              <div className="logo-tagline">SCHOOL</div>
            </div>
          </a>
          <ul className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
            {['Home', 'About', 'Programs', 'School', 'News', 'Contact'].map(l => (
              <li
                key={l}
                onMouseEnter={l === 'Programs' ? () => { if (closeTimer.current) clearTimeout(closeTimer.current); setMegaMenuOpen(true); } : undefined}
                onMouseLeave={l === 'Programs' ? () => { closeTimer.current = setTimeout(() => setMegaMenuOpen(false), 200); } : undefined}
                className={l === 'Programs' ? 'has-mega' : ''}
              >
                <a
                  href={
                    l === 'Home'     ? '/' :
                    l === 'About'    ? '/about' :
                    l === 'News'     ? '/news' :
                    l === 'Programs' ? '/#programs' :
                    `/#${l.toLowerCase().replace(/\s+/g, '-')}`
                  }
                  onClick={() => setMobileMenuOpen(false)}
                  className={l === 'Programs' ? `nav-dropdown ${megaMenuOpen ? 'active' : ''}` : ''}
                >
                  {l}
                  {l === 'Programs' && (
                    <svg className="caret" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  )}
                </a>
                {l === 'Programs' && <ProgramMegaMenu open={megaMenuOpen} onClose={() => setMegaMenuOpen(false)} />}
              </li>
            ))}
            <li className="mobile-only-nav-apply"><a href="/donate">Donate</a></li>
          </ul>
          <div className="nav-actions">
            <a href="/donate" className="nav-cta">Donate Now →</a>
            <div className={`mobile-toggle ${mobileMenuOpen ? 'active' : ''}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <span></span><span></span><span></span>
            </div>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="rj-hero">
        <div className="rj-hero-bg" style={{ backgroundImage: "url('/rabindrajayanti_hero.webp')" }} />
        <div className="rj-hero-glow g1" /><div className="rj-hero-glow g2" />
        <div className="rj-hero-veil" />
        
        <div className="rj-hero-inner">
          <div className="rj-hero-tag">
            <Star size={14} className="rj-meta-icon animate-pulse" /> Cultural Anniversary Celebration · St. Stephen's School
          </div>
          <h1 className="rj-hero-h1">
            Rabindra<span>Jayanti</span>
          </h1>
          <p className="rj-hero-sub">
            Paying tribute to Kabi Guru Rabindranath Tagore. Celebrating literature, music, and the free pursuit of knowledge with our students in Kolkata.
          </p>

          <div className="rj-hero-meta">
            <div className="rj-meta-item">
              <MapPin size={20} className="rj-meta-icon" />
              <div>
                <div className="rj-meta-label">Venue</div>
                <div style={{ fontWeight: 700 }}>School Assembly Hall</div>
              </div>
            </div>
          </div>

          <div className="rj-hero-btns">
            <a href="#about" className="rj-btn-gold">Read Tribute Details</a>
          </div>
        </div>
      </section>

      {/* ── ABOUT SECTION ── */}
      <section className="rj-section rj-about" id="about">
        <div className="rj-wrap">
          <div className="rj-about-grid">
            <div className="rj-about-visual">
              <div className="rj-about-collage">
                <img loading="lazy" src="/images.webp" alt="Rabindra Jayanti Preparations" className="rj-collage-img-main" />
                <img loading="lazy" src="/images 2.webp" alt="Students Performing" className="rj-collage-img-sec" />
              </div>
              <div className="rj-about-badge">
                <div className="rj-about-badge-num">📖</div>
                <div className="rj-about-badge-txt">Tagore Tribute</div>
              </div>
            </div>
            <div>
              <div className="rj-chip">Honoring Kabi Guru</div>
              <h2 className="rj-h2">Inspiring Minds, <span>Breaking Walls</span></h2>
              <p className="rj-lead">
                At St. Stephen's School in Bowbazar, Kolkata, Rabindra Jayanti is celebrated with deep cultural reverence. Tagore's educational philosophy of freedom and creativity forms a cornerstone of how we inspire our first-generation learners.
              </p>
              <p className="rj-body">
                Through poetry recitations, classic songs (Rabindra Sangeet), and dances, our children discover the rich heritage of Bengali literature. This celebration empowers them with confidence and artistic expression, helping them look beyond their daily hardships.
              </p>
              <div className="rj-about-stats">
                <div className="rj-stat">
                  <span className="rj-stat-num">150+</span>
                  <span className="rj-stat-lbl">Performers</span>
                </div>
                <div className="rj-stat">
                  <span className="rj-stat-num">30+</span>
                  <span className="rj-stat-lbl">Poetry Recitals</span>
                </div>
                <div className="rj-stat">
                  <span className="rj-stat-num">Annual</span>
                  <span className="rj-stat-lbl">School Tradition</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── INTERACTIVE GITANJALI EXPLORER ── */}
      <section className="rj-section rj-interactive" id="interactive-gitanjali">
        <div className="rj-wrap">
          <div className="text-center" style={{ marginBottom: '3.5rem' }}>
            <div className="rj-chip">Interactive Journal</div>
            <h2 className="rj-h2">Gitanjali & <span>Stray Birds</span></h2>
            <p className="rj-lead" style={{ maxWidth: '600px', margin: '0 auto' }}>
              Explore beautiful translated verses and philosophical quotes by Rabindranath Tagore on life, nature, and service.
            </p>
          </div>

          <div className="parchment-container">
            <div className="parchment-card">
              <div className="parchment-decor tl" />
              <div className="parchment-decor tr" />
              <div className="parchment-decor bl" />
              <div className="parchment-decor br" />
              <div className="quote-icon-top">“</div>
              
              <div className={`quote-content-wrapper ${fade ? 'fade-out' : ''}`}>
                <p className="quote-verse">"{verses[quoteIdx].text}"</p>
                <div className="quote-source">{verses[quoteIdx].source}</div>
              </div>
            </div>

            <div className="parchment-controls">
              <button className="ctrl-btn" onClick={handlePrevQuote} aria-label="Previous quote">
                <ChevronLeft size={20} />
              </button>
              <span className="ctrl-indicator">
                {quoteIdx + 1} / {verses.length}
              </span>
              <button className="ctrl-btn" onClick={handleNextQuote} aria-label="Next quote">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── PAST CELEBRATIONS & HONORED GUESTS ── */}
      <section className="rj-section rj-spotlight" id="spotlight">
        <div className="rj-wrap">
          <div className="text-center" style={{ marginBottom: '3.5rem' }}>
            <div className="rj-chip">Milestones & Memories</div>
            <h2 className="rj-h2">A Legacy of <span>Reverence</span></h2>
            <p className="rj-lead" style={{ maxWidth: '700px', margin: '0 auto' }}>
              Over the years, St. Stephen’s School has celebrated Kabi Guru's birth anniversary with distinguished visitors and soulful performances.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2.5rem' }}>
            {/* Card 1: Nick Low Visit 2022 */}
            <div className="rj-spotlight-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div className="rj-chip" style={{ background: 'rgba(128, 0, 0, 0.08)', color: 'var(--rj-crimson)' }}>Distinguished Guest Visit</div>
                <h3 className="rj-h2" style={{ fontSize: '1.75rem', marginBottom: '1.2rem' }}>British Deputy High Commissioner <span>Nick Low</span></h3>
                <p className="rj-body" style={{ color: 'var(--rj-dark)', fontSize: '0.95rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
                  On <strong>9th May, 2022</strong>, British Deputy High Commissioner Nick Low celebrated Rabindra Jayanti with our students.
                  His presence added grace and inspiration, making the occasion truly memorable for all.
                </p>
              </div>
              <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', height: '220px', marginTop: 'auto' }}>
                <img loading="lazy" src="/images 3.webp" alt="British Deputy High Commissioner Nick Low visit" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{
                  position: 'absolute',
                  bottom: '1rem',
                  left: '1rem',
                  background: 'rgba(128, 0, 0, 0.85)',
                  color: '#fff',
                  padding: '0.4rem 1rem',
                  borderRadius: '50px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  backdropFilter: 'blur(4px)'
                }}>
                  📅 May 9, 2022
                </div>
              </div>
            </div>

            {/* Card 2: Celebration Over the Years */}
            <div className="rj-spotlight-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div className="rj-chip" style={{ background: 'rgba(230, 92, 0, 0.08)', color: 'var(--rj-saffron)' }}>Our Cultural Tradition</div>
                <h3 className="rj-h2" style={{ fontSize: '1.75rem', marginBottom: '1.2rem' }}>Celebrated <span>Over The Years</span></h3>
                <p className="rj-body" style={{ color: 'var(--rj-dark)', fontSize: '0.95rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
                  Rabindra Jayanti at St. Stephen’s School has been celebrated over the years with deep reverence through soulful songs, dance, and recitations of Tagore’s timeless creations.
                  The presence of distinguished guests has always added grace and inspiration, making the occasion truly memorable for all.
                </p>
              </div>
              <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', height: '220px', marginTop: 'auto' }}>
                <img loading="lazy" src="/images4.webp" alt="Rabindra Jayanti celebrations" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{
                  position: 'absolute',
                  bottom: '1rem',
                  left: '1rem',
                  background: 'rgba(230, 92, 0, 0.85)',
                  color: '#fff',
                  padding: '0.4rem 1rem',
                  borderRadius: '50px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  backdropFilter: 'blur(4px)'
                }}>
                  ✨ Annual Celebration
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HIGHLIGHTS SECTION ── */}
      <section className="rj-section rj-highlights">
        <div className="rj-wrap">
          <div className="rj-highlights-head">
            <div className="rj-chip">Celebration Highlights</div>
            <h2 className="rj-h2">Our Cultural <span>Showcases</span></h2>
            <p className="rj-lead">
              A day of classic music, passionate poetry, and traditional dances honoring Kabi Guru.
            </p>
          </div>
          <div className="rj-cards-grid">
            {highlights.map((h, i) => (
              <div className="rj-card" key={i}>
                <div className="rj-card-icon-wrap">{h.icon}</div>
                <h3 className="rj-card-h">{h.title}</h3>
                <p className="rj-card-p">{h.desc}</p>
                <span className="rj-card-tag">{h.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* ── CTA SECTION ── */}
      <section className="rj-cta">
        <div className="rj-cta-inner">
          <h2 className="rj-cta-h">Help Us Nurture Art &<br />Culture in Underprivileged Kids</h2>
          <p className="rj-cta-p">
            Your contributions help purchase musical instruments, traditional dance costumes, and books for our school library, keeping the light of Tagore's teachings alive.
          </p>
          <div className="rj-cta-btns">
            <a href="/donate" className="rj-btn-gold">Support Our Cultural Fund →</a>
            <a href="/about" className="rj-btn-ghost">Learn About Us</a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer rj-footer">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="logo-crest-wrapper">
                <img loading="lazy" src="/v2.webp" className="logo-crest-img" alt="St. Stephen's Crest" />
              </div>
              <div>
                <div className="logo-name">St. Stephen's</div>
                <div className="logo-tagline">SCHOOL</div>
              </div>
            </div>
            <p>Nurturing young minds and shaping tomorrow's leaders since 2001. A tradition of excellence, a promise of a better future.</p>
            <div className="socials">
              {['Facebook', 'Instagram', 'Twitter', 'YouTube'].map(s => (
                <a key={s} href="#" className="soc-btn" title={s}>{s[0]}</a>
              ))}
            </div>
          </div>

          <div className="footer-col">
            <div className="footer-col-h">Quick Links</div>
            <ul>
              {['Home', 'About', 'Programs', 'School', 'News', 'Contact'].map(l => (
                <li key={l}>
                  <a href={l === 'Home' ? '/' : l === 'About' ? '/about' : l === 'News' ? '/news' : l === 'School' ? '/the-school' : `/#${l.toLowerCase().replace(/\s+/g, '-')}`}>
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <div className="footer-col-h">Events</div>
            <ul>
              <li><a href="/annual-concert">Annual Concert</a></li>
              <li><a href="/art-and-craft-exhibition">Art & Craft Exhibition</a></li>
              <li><a href="/eid">Eid Celebration</a></li>
              <li><a href="/christmas">Christmas Celebration</a></li>
              <li><a href="/rabindrajayanti">Rabindra Jayanti</a></li>
              <li><a href="/educational-day-out">Educational Day Out</a></li>
              <li><a href="/annual-picnic">Annual School Picnic</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <div className="footer-col-h">Contact Info</div>
            <ul style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.83rem', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <li>📍 Bowbazar, Kolkata, India</li>
              <li>📞 +91 33 2244 5566</li>
              <li>✉️ info@ststephenskolkata.org</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 St. Stephen's School. All rights reserved.</span>
          <span>Privacy Policy · Terms of Use · Sitemap</span>
        </div>
      </footer>
    </div>
  );
}
