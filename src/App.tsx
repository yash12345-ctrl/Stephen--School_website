import { useState, useEffect, useRef } from 'react'
import type { MouseEvent } from 'react'
import './App.css'
import ProgramTop, { ProgramMegaMenu } from './program_top'

export default function App() {
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleHeroMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (!heroRef.current) return;
    const { left, top, width, height } = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    heroRef.current.style.setProperty('--mouse-x', `${x}`);
    heroRef.current.style.setProperty('--mouse-y', `${y}`);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: globalThis.MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.has-mega') && !target.closest('.mega-menu')) {
        setMegaMenuOpen(false);
      }
    };
    if (megaMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [megaMenuOpen]);

  return (
    <div className="site">

      {/* ── NAVBAR ── */}
      <nav className={`navbar${scrolled ? ' navbar--fixed' : ''}`}>
        <div className="nav-inner">
          <a href="#home" className="nav-logo">
            <div className="logo-crest-wrapper">
              <img src="/v2.webp" className="logo-crest-img" alt="St. Stephen's Crest" />
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
                onMouseEnter={l === 'Programs' ? () => {
                  if (closeTimer.current) clearTimeout(closeTimer.current);
                  setMegaMenuOpen(true);
                } : undefined}
                className={l === 'Programs' ? 'has-mega' : ''}
              >
                <a
                  href={
                    l === 'About' ? '/about' :
                      l === 'News' ? '/news' :
                        l === 'Programs' ? '/#programs' :
                          l === 'School' ? '/the-school' :
                            l === 'Gallery' ? '/gallery' :
                              `#${l.toLowerCase().replace(/\s+/g, '-')}`
                  }
                  onClick={(e) => {
                    if (l === 'Programs') {
                      e.preventDefault();
                      setMegaMenuOpen(!megaMenuOpen);
                    } else {
                      setMobileMenuOpen(false);
                    }
                  }}
                  className={l === 'Programs' ? `nav-dropdown ${megaMenuOpen ? 'active' : ''}` : ''}
                >
                  {l}
                  {l === 'Programs' && (
                    <svg className="caret" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  )}
                </a>
                {l === 'Programs' && (
                  <ProgramMegaMenu open={megaMenuOpen} onClose={() => setMegaMenuOpen(false)} />
                )}
              </li>
            ))}
            {/* Mobile-only Donate Button */}
            <li className="mobile-only-nav-apply">
              <a href="/donate">Donate</a>
            </li>
          </ul>
          <div className="nav-actions">
            <a href="/donate" className="nav-cta">Donate Now  →</a>
            <div className={`mobile-toggle ${mobileMenuOpen ? 'active' : ''}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <span></span><span></span><span></span>
            </div>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero" id="home" ref={heroRef} onMouseMove={handleHeroMouseMove}>
        <div className="hero-img" style={{ backgroundImage: "url('/img.webp')" }} />
        <div className="hero-veil" />
        <div className="hero-glow g1" /><div className="hero-glow g2" />
        <div className="hero-body">
          <div className="hero-pill">
            <span className="pulse-dot"></span> Est. 2001 &nbsp;·&nbsp; Excellence in Education
          </div>
          <h1 className="hero-h1">Shaping<br />Tomorrow's<br />Leaders</h1>
          <p className="hero-p">Where academic brilliance meets character — empowering every student to reach their highest potential in a world-class learning environment.</p>

        </div>

        <div className="hero-right">
          <aside className="hero-admissions-card" aria-label="Admissions information">
            <div className="hac-image" style={{ backgroundImage: "url('/v5.webp')" }}>
              <div className="hac-badge">
                <span className="pulse-dot-red"></span> Now Open
              </div>
            </div>
            <div className="hac-content">
              <h3>Campus Tour</h3>
              <p>Discover our world-class campus and innovative curriculum. Schedule a personalized family tour today.</p>
              <div className="hac-actions">
                <a href="/the-school" className="hac-link">Click Here →</a>
              </div>
            </div>
          </aside>

          <div className="hero-stats">
            {[['500', 'Students'], ['NGO', 'School'], ['L.N. to X', 'Grades'], ['20+', 'Yrs Legacy']].map(([n, l], i) => (
              <div key={i} className="hstat">
                <span className="hstat-n">{n}</span>
                <span className="hstat-l">{l}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="scroll-hint"><div className="scroll-wheel" /><span>Scroll</span></div>
      </section>



      {/* ── ABOUT ── */}
      <section className="section about-section" id="about">
        <div className="container about-grid">
          <div className="about-imgs">
            <div className="aimg aimg-main"><img loading="lazy" src="/v3.webp" alt="Campus Life" /></div>
            <div className="aimg aimg-sec"><img loading="lazy" src="/v4.webp" alt="Students" /></div>
            <div className="about-badge">
              <div className="ab-num">20+</div>
              <div className="ab-txt">Years of<br />Service</div>
            </div>
          </div>
          <div className="about-body">
            <div className="s-tag" style={{ display: 'inline-flex', alignItems: 'center' }}>
              <svg style={{ marginRight: '6px', marginTop: '-2px' }} xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
              NGO Based Education
            </div>
            <h2 className="s-title">Building Leaders Beyond <span className="gold">Circumstances</span></h2>
            <p className="s-lead">An NGO-based school in Bowbazar, Kolkata, committed to the social and economic transformation of underprivileged children since 2001.</p>
            <p className="s-body">With over 500 students from Lower Nursery to Class X, we provide a haven of learning for first-generation learners. We deliver quality education and extracurricular opportunities without discrimination.</p>
            <div className="pillars">
              {[
                { icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" /></svg>, h: 'Our Vision', p: 'Building strong connections to help students achieve independence and academic confidence.' },
                { icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>, h: 'Our Mission', p: 'Providing a valued haven where staff and families partner for every student\'s success.' },
                { icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>, h: 'Holistic Growth', p: 'Following the Madhyamik syllabus alongside sports, arts, and interactive social clubs.' },
              ].map((f, i) => (
                <div className="pillar" key={i}>
                  <div className="pillar-icon">{f.icon}</div>
                  <div><div className="pillar-h">{f.h}</div><div className="pillar-p">{f.p}</div></div>
                </div>
              ))}
            </div>
            <a href="/about" className="btn-gold">Discover Our Story</a>
          </div>
        </div>

      </section>

      {/* ── PROGRAMS ── */}
      <ProgramTop />

      {/* ── CAMPUS (Removed for NGO identity) ── */}

      {/* ── TESTIMONIALS ── */}
      <section className="section testi-section">
        <div className="container">
          <div className="sec-head">
            <h2 className="s-title">Words <span className="gold">From</span> Diginitories</h2>
          </div>
          <div className="dignitary-card">
            <div className="dignitary-img">
              <img loading="lazy" src="/v9.webp" alt="Imran Zaki" />
            </div>
            <div className="dignitary-content">
              <div className="dignitary-quote-icon">❝</div>
              <p className="dignitary-quote">"Education is the foundation upon which a progressive and empowered society is built. At St. Stephen’s School, our commitment extends beyond academics—we are dedicated to making quality education accessible and affordable for every child, regardless of their background. We strive to bridge the gap between aspiration and opportunity by providing modern facilities, a safe learning environment, and holistic development programs that match the standards of leading educational institutions. Our goal is to nurture responsible, confident, and compassionate individuals who will contribute positively to society and become the leaders of tomorrow."</p>
              <h4 className="dignitary-name">Imran Zaki</h4>
              <p className="dignitary-role">Hony. Secretary</p>
            </div>
          </div>

          <div className="dignitary-card" style={{ marginTop: '2rem' }}>
            <div className="dignitary-img">
              <img loading="lazy" src="/v10.webp" alt="Ayesha Siddiqui" />
            </div>
            <div className="dignitary-content">
              <div className="dignitary-quote-icon">❝</div>
              <p className="dignitary-quote">"At St. Stephen’s School, we firmly believe that quality education should not be a privilege reserved for a few, but a right accessible to every child. Our mission is to provide affordable, value-based education to children from all sections of society, especially those who may otherwise be deprived of opportunities. We work tirelessly to create a nurturing environment equipped with modern facilities, experienced educators, and holistic learning experiences comparable to the finest schools in Kolkata. Our vision is not merely to educate young minds, but to empower them with knowledge, confidence, and values that will help them build a brighter future for themselves and their communities."</p>
              <h4 className="dignitary-name">Ayesha Siddiqui</h4>
              <p className="dignitary-role">HeadMistress</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── NEWS ── */}
      <section className="section news-section" id="news">
        <div className="container">
          <div className="sec-head">
            <div className="s-tag">Latest Updates</div>
            <h2 className="s-title">News & <span className="gold">Events</span></h2>
          </div>
          <div className="news-grid">
            {[
              { tag: '🎨 Event', date: 'May 20, 2026', h: 'Annual Art & Craft Exhibition', p: 'Join us for a spectacular showcase of creativity as students display their finest artwork, sculptures, and crafts.', hot: true, img: '/v11.webp' },
              { tag: '🎭 Event', date: 'December 15, 2026', h: 'Annual Function 2026', p: 'Experience a grand evening of student performances, award ceremonies, and cultural showcases across all grades.', hot: false, img: '/v12.webp' },
              { tag: '📋 Admissions', date: 'May 1, 2026', h: 'Admissions Open for 2026–27', p: 'Applications now open for all grades. Early registrations receive priority slots and scholarship consideration.', hot: false, img: '/img.webp' },
            ].map((n, i) => (
              <div className={`news-card${n.hot ? ' news-hot' : ''}`} key={i}>
                {n.hot && <div className="news-ribbon">Featured</div>}
                {n.img && (
                  <div style={{ height: '200px', margin: '-2.5rem -2.5rem 1.5rem -2.5rem', overflow: 'hidden' }}>
                    <img loading="lazy" src={n.img} alt={n.h} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                )}
                <div className="news-tag">{n.tag}</div>
                <h3 className="news-h">{n.h}</h3>
                <p className="news-p">{n.p}</p>

              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section">
        <div className="cta-glow" />
        <div className="cta-body">
          <div className="cta-badge">🤝 Support Our Mission</div>
          <h2 className="cta-h">Help Shape a Child's <span className="gold">Future</span></h2>
          <p className="cta-p">Your contribution can provide quality education, brighter opportunities, and a better tomorrow for deserving students.</p>
          <div className="cta-btns">
            <a href="/donate" className="btn-gold large">Donate</a>
            <a href="tel:+911234567890" className="btn-ghost large">📞 Call Us</a>
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
  )
}
