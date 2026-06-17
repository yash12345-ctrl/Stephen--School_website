import { useState, useEffect, useRef } from 'react';
import './App.css';
import './art_craft.css';
import { ProgramMegaMenu } from './program_top';
import { Palette, Scissors, MapPin, Sparkles, Star, ChevronLeft, ChevronRight, Award, Camera, Monitor } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ArtCraftExhibition() {
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Spotlight Carousel State
  const [spotlightIdx, setSpotlightIdx] = useState(0);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



  const studentQuotes = [
    {
      quote: "Art is my language when words aren't enough. Painting the sunset makes me forget all my daily struggles and feel completely free.",
      author: "Rahul Das",
      grade: "Grade 9 (Painter)"
    },
    {
      quote: "Molding clay is like magic. You start with a simple lump of earth and turn it into a majestic elephant. It makes me feel I can build anything.",
      author: "Sneha Sen",
      grade: "Grade 7 (Sculptor)"
    },
    {
      quote: "Making art from trash teaches me that nothing is useless. With some creativity, even discarded plastic bottles can tell a story.",
      author: "Ayan Roy",
      grade: "Grade 8 (Craft Artist)"
    }
  ];

  const highlights = [
    {
      icon: <Palette size={24} />,
      title: 'Live Pottery Workshop',
      desc: 'Watch and try your hand at the traditional potter\'s wheel under the expert guidance of local traditional clay artisans.',
      image: '/v3.webp'
    },
    {
      icon: <Scissors size={24} />,
      title: 'Eco-Craft Station',
      desc: 'A dedicated creative zone where visitors learn to design beautiful flower vases and pen stands using domestic waste.',
      image: '/v8.webp'
    },
    {
      icon: <Sparkles size={24} />,
      title: 'Collaborative Wall Canvas',
      desc: 'All students, parents, and guests are invited to leave their unique handprint brushstrokes on a giant community canvas.',
      image: '/v11.webp'
    },
    {
      icon: <Award size={24} />,
      title: 'Young Artist Awards',
      desc: 'Outstanding achievements in creativity and environmental message-driven art will be awarded by the local Academy of Fine Arts.',
      image: '/images 2.webp'
    },
    {
      icon: <Monitor size={24} />,
      title: 'Digital Art Kiosk',
      desc: 'Explore interactive digital illustrations and 3D animations created by our senior students using industry-standard software.',
      image: '/v25.webp'
    },
    {
      icon: <Camera size={24} />,
      title: 'Heritage Photography Display',
      desc: 'A curated photographic journey capturing the essence of Bowbazar\'s rich cultural history through the lens of young photographers.',
      image: '/v31.webp'
    }
  ];

  const handleNextSpotlight = () => {
    setFade(true);
    setTimeout(() => {
      setSpotlightIdx((prev) => (prev + 1) % studentQuotes.length);
      setFade(false);
    }, 400);
  };

  const handlePrevSpotlight = () => {
    setFade(true);
    setTimeout(() => {
      setSpotlightIdx((prev) => (prev - 1 + studentQuotes.length) % studentQuotes.length);
      setFade(false);
    }, 400);
  };

  return (
    <div className="art-page">
      {/* ── NAVBAR ── */}
      <nav className={`navbar navbar--about${scrolled ? ' navbar--fixed' : ''}`}>
        <div className="nav-inner">
          <a href="/" className="nav-logo">
            <div className="logo-crest-wrapper">
              <img loading="lazy" src="/v2.webp" className="logo-crest-img" alt="St. Stephen's Crest" />
            </div>
            <div>
              <div className="logo-name">St. Stephen's School</div>
              <div className="logo-tagline">BOWBAZAR</div>
            </div>
          </a>
          <ul className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
            {['Home', 'About', 'Programs', 'School', 'News', 'Gallery'].map(l => (
              <li
                key={l}
                onMouseEnter={l === 'Programs' ? () => { if (closeTimer.current) clearTimeout(closeTimer.current); setMegaMenuOpen(true); } : undefined}
                onMouseLeave={l === 'Programs' ? () => { closeTimer.current = setTimeout(() => setMegaMenuOpen(false), 200); } : undefined}
                className={l === 'Programs' ? 'has-mega' : ''}
              >
                <a
                  href={
                    l === 'Home' ? '/' :
                      l === 'About' ? '/about' :
                        l === 'News' ? '/news' :
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
      <section className="art-hero">
        <div className="art-hero-bg" style={{ backgroundImage: "url('/art_exhibition_hero.webp')" }} />
        <div className="art-hero-glow g1" /><div className="art-hero-glow g2" />
        <div className="art-hero-veil" />

        <motion.div
          className="art-hero-inner"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="art-hero-tag">
            <Star size={14} className="art-meta-icon animate-pulse" /> Creative Celebration · St. Stephen's School
          </div>
          <h1 className="art-hero-h1">
            Annual Art <span>&</span><br />Craft Exhibition
          </h1>
          <p className="art-hero-sub">
            Welcome to a vibrant gallery of dreams, colors, and innovations crafted by our creative young minds in Bowbazar. Experience student paintings, sculptures, and recycled crafts.
          </p>

          <div className="art-hero-meta">
            <div className="art-meta-item">
              <MapPin size={20} className="art-meta-icon" />
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div className="art-meta-label">Venue</div>
                <div style={{ fontWeight: 700, lineHeight: '1.2' }}>School Courtyard & Main Hall</div>
              </div>
            </div>
          </div>

          <div className="art-hero-btns">
            <a href="#highlights" className="art-btn-ghost">Event Highlights</a>
          </div>
        </motion.div>
      </section>

      {/* ── HONORED VISITORS SECTION ── */}
      <section className="art-section art-dignitary-section">
        <div className="art-wrap">
          <div className="art-dignitary-grid">
            <div className="art-dignitary-visual" style={{ position: 'relative' }}>
              <div className="art-dignitary-visual-wrapper">
                <img loading="lazy" src="/v11.webp" alt="Consul General of Japan Visit" />
              </div>
              <div className="art-card-tag" style={{ top: 'auto', bottom: '1.5rem', left: '1.5rem', right: 'auto', background: 'rgba(255, 107, 107, 0.9)', color: '#fff' }}>
                🇯🇵 Distinguished Guest Visit
              </div>
            </div>
            <div>
              <div className="art-chip" style={{ background: 'rgba(255, 210, 0, 0.1)', color: '#ffd200' }}>Consular Appreciation</div>
              <h2 className="art-h2" style={{ fontSize: '2.25rem', lineHeight: '1.3' }}>A Witness to <span>Excellent Artistry</span></h2>
              <p className="art-lead" style={{ fontSize: '1.05rem', marginBottom: '1rem' }}>
                St. Stephen's School exhibits excellent art and craft work, which has been highly praised by national and international visitors for its creativity, color depth, and environmental consciousness.
              </p>
              <div className="art-dignitary-quote-box">
                "The exceptional talent and high-level craft techniques shown by the kids of St. Stephen's School were witnessed and celebrated by Mr. Masayuki Taga, Consul General of Japan in Kolkata, who commended the school's effort in nurturing artistic potential."
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── EXHIBITION HIGHLIGHTS ── */}
      <section className="art-section art-highlights-section" id="highlights" style={{ position: 'relative' }}>
        {/* Decorative Glow */}
        <div style={{ position: 'absolute', top: '50px', left: '50%', transform: 'translateX(-50%)', width: '500px', height: '500px', borderRadius: '50%', background: 'rgba(255,180,0,.05)', filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0 }}></div>

        <div className="art-wrap" style={{ position: 'relative', zIndex: 1 }}>
          <div className="text-center">
            <div className="art-chip">Special Attractions</div>
            <h2 className="art-h2">Interactive <span>Showcases & Zones</span></h2>
            <p className="art-lead" style={{ maxWidth: '650px', margin: '0 auto' }}>
              Explore the hands-on workshops and unique exhibits designed to engage visitors in the joy of creating.
            </p>
          </div>

          <div className="art-highlights-grid">
            {highlights.map((h, i) => (
              <motion.div
                className="art-highlight-card"
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}
              >
                <div style={{ width: '100%', flex: 1, borderRadius: '16px', overflow: 'hidden', marginBottom: '1.5rem' }}>
                  <img src={h.image} alt={h.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'} loading="lazy" />
                </div>
                <div className="art-highlight-icon-wrap">{h.icon}</div>
                <h3 className="art-highlight-h">{h.title}</h3>
                <p className="art-highlight-p">{h.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STUDENT SPOTLIGHT CAROUSEL ── */}
      <section className="art-section art-spotlight-section">
        <div className="art-wrap">
          <div className="text-center">
            <div className="art-chip">Artist Voice</div>
            <h2 className="art-h2">Words from Our <span>Young Creators</span></h2>
            <p className="art-lead">
              Our students share what art and self-expression mean to them.
            </p>
          </div>

          <div className="spotlight-container">
            <div className="spotlight-card">
              <div className="spotlight-quote-icon">“</div>
              <div className={`spotlight-content-wrapper ${fade ? 'fade-out' : ''}`}>
                <p className="spotlight-quote">"{studentQuotes[spotlightIdx].quote}"</p>

                <div className="spotlight-artist-info">
                  <div className="spotlight-avatar">
                    {studentQuotes[spotlightIdx].author.charAt(0)}
                  </div>
                  <div className="spotlight-meta-info">
                    <h4>{studentQuotes[spotlightIdx].author}</h4>
                    <p>{studentQuotes[spotlightIdx].grade}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="spotlight-controls">
              <button className="spotlight-ctrl-btn" onClick={handlePrevSpotlight} aria-label="Previous quote">
                <ChevronLeft size={20} />
              </button>
              <span className="spotlight-ctrl-indicator">
                {spotlightIdx + 1} / {studentQuotes.length}
              </span>
              <button className="spotlight-ctrl-btn" onClick={handleNextSpotlight} aria-label="Next quote">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>


      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="logo-crest-wrapper">
                <img loading="lazy" src="/v2.webp" className="logo-crest-img" alt="St. Stephen's Crest" />
              </div>
              <div>
                <div className="logo-name">St. Stephen's School</div>
                <div className="logo-tagline">BOWBAZAR</div>
              </div>
            </div>
            <p>Nurturing young minds and shaping tomorrow's leaders since 2001. A tradition of excellence, a promise of a better future.</p>
            <div className="socials">{['Facebook', 'Instagram', 'Twitter', 'YouTube'].map(s => <a key={s} href="#" className="soc-btn" title={s}>{s[0]}</a>)}</div>
          </div>
          {[
            { h: 'Quick Links', links: ['About Us', 'Programs', 'Admissions', 'Faculty', 'Alumni', 'Careers'] },
            { h: 'Academics', links: ['Pre-Primary', 'Primary School', 'Middle School', 'Senior Secondary', 'Sports & Arts', 'Digital Skills'] },
            { h: 'Resources', links: ['Academic Calendar', 'Exam Schedule', 'Fee Structure', 'Scholarship', 'Downloads', 'Contact'] },
          ].map(col => (
            <div className="footer-col" key={col.h}>
              <div className="footer-col-h">{col.h}</div>
              <ul>{col.links.map(l => <li key={l}><a href="#">{l}</a></li>)}</ul>
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <span>© 2026 St. Stephen's School. All rights reserved.</span>
          <span>Privacy Policy · Terms of Use · Sitemap</span>
        </div>
      </footer>
    </div>
  );
}
