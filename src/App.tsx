import { useState, useEffect, useRef, type MouseEvent } from 'react'
import './App.css'
import ProgramTop, { ProgramMegaMenu } from './program_top'
const testimonials = [
  { name: 'Priya Sharma', role: 'Parent · Grade 10', quote: 'St. Stephen\'s transformed my daughter into a confident, curious learner. The faculty truly care about each child\'s individual growth journey.', initial: 'P', color: '#c5a880' },
  { name: 'Arjun Mehta', role: 'Alumni · Batch 2020', quote: 'The values and skills I gained here shaped who I am. I am now at IIT Bombay — a dream I owe entirely to St. Stephen\'s School.', initial: 'A', color: '#6b7280' },
  { name: 'Dr. Sunita Rao', role: 'Parent · Grade 8', quote: 'The STEM programs are outstanding. My son built his first robot at 13. St. Stephen\'s makes innovation accessible to every child.', initial: 'S', color: '#131a26' },
]

export default function App() {
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

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

  return (
    <div className="site">

      {/* ── NAVBAR ── */}
      <nav className={`navbar${scrolled ? ' navbar--fixed' : ''}`}>
        <div className="nav-inner">
          <a href="#home" className="nav-logo">
            <div className="logo-crest-wrapper">
              <img src="/v2.png" className="logo-crest-img" alt="St. Stephen's Crest" />
            </div>
            <div>
              <div className="logo-name">St. Stephen's School</div>
              <div className="logo-tagline">BOWBAZAR</div>
            </div>
          </a>
          <ul className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
            {['Home', 'About', 'Programs', 'Gallery', 'News', 'Contact'].map(l => (
              <li
                key={l}
                onMouseEnter={l === 'Programs' ? () => setMegaMenuOpen(true) : undefined}
                onMouseLeave={l === 'Programs' ? () => setMegaMenuOpen(false) : undefined}
                className={l === 'Programs' ? 'has-mega' : ''}
              >
                <a
                  href={l === 'About' ? '/about' : l === 'News' ? '/news' : l === 'School' ? '/the-school' : `#${l.toLowerCase().replace(/\\s+/g, '-')}`}
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
                  <ProgramMegaMenu open={megaMenuOpen} />
                )}
              </li>
            ))}
            {/* Mobile-only Donate Button */}
            <li className="mobile-only-nav-apply">
              <a href="/#donate">Donate</a>
            </li>
          </ul>
          <div className="nav-actions">
            <a href="/#donate" className="nav-cta">Donate Now  →</a>
            <div className={`mobile-toggle ${mobileMenuOpen ? 'active' : ''}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <span></span><span></span><span></span>
            </div>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero" id="home" ref={heroRef} onMouseMove={handleHeroMouseMove}>
        <div className="hero-img" style={{ backgroundImage: "url('/img.png')" }} />
        <div className="hero-veil" />
        <div className="hero-glow g1" /><div className="hero-glow g2" />
        <div className="hero-body">
          <div className="hero-pill">
            <span className="pulse-dot"></span> Est. 1985 &nbsp;·&nbsp; Excellence in Education
          </div>
          <h1 className="hero-h1">Shaping<br />Tomorrow's<br />Leaders</h1>
          <p className="hero-p">Where academic brilliance meets character — empowering every student to reach their highest potential in a world-class learning environment.</p>
          <div className="hero-btns">
            <a href="#programs" className="btn-gold">Explore Programs</a>
            <a href="/the-school" className="btn-ghost">Virtual Tour ▶</a>
          </div>
        </div>

        <div className="hero-right">
          <aside className="hero-admissions-card" aria-label="Admissions information">
            <div className="hac-image" style={{ backgroundImage: "url('/v5.jpeg')" }}>
              <div className="hac-badge">
                <span className="pulse-dot-red"></span> Now Open
              </div>
            </div>
            <div className="hac-content">
              <h3>Admissions 2026–27</h3>
              <p>Discover our world-class campus and innovative curriculum. Schedule a personalized family tour today.</p>
              <div className="hac-actions">
                <a href="/the-school" className="hac-link">Campus Tour →</a>
              </div>
            </div>
          </aside>

          <div className="hero-stats">
            {[['3,200+', 'Students'], ['98%', 'Pass Rate'], ['150+', 'Faculty'], ['40+', 'Yrs Legacy']].map(([n, l], i) => (
              <div key={i} className="hstat">
                <span className="hstat-n">{n}</span>
                <span className="hstat-l">{l}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="scroll-hint"><div className="scroll-wheel" /><span>Scroll</span></div>
      </section>

      {/* ── TICKER ── */}
      <div className="ticker">
        <div className="ticker-run">
          <span>🏆 National Science Olympiad Champions 2026 &nbsp;·&nbsp; 📅 Admissions Open 2026–27 &nbsp;·&nbsp; 🎓 Annual Day — June 15 &nbsp;·&nbsp; ⚽ Inter-School Finals: We Advance! &nbsp;·&nbsp; 🔬 New STEM Lab Opening Soon &nbsp;·&nbsp; 📚 Board Results: 96% Distinction &nbsp;·&nbsp; 🏆 National Science Olympiad Champions 2026 &nbsp;·&nbsp; 📅 Admissions Open 2026–27 &nbsp;·&nbsp; 🎓 Annual Day — June 15 &nbsp;·&nbsp;</span>
        </div>
      </div>

      {/* ── ABOUT ── */}
      <section className="section about-section" id="about">
        <div className="container about-grid">
          <div className="about-imgs">
            <div className="aimg aimg-main"><img src="/v3.png" alt="Campus Life" /></div>
            <div className="aimg aimg-sec"><img src="/v4.jpeg" alt="Students" /></div>
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
            <a href="#contact" className="btn-gold">Discover Our Story</a>
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
            <div className="s-tag">Community Voices</div>
            <h2 className="s-title">Words <span className="gold">From</span> Diginitories</h2>
          </div>
          <div className="dignitary-card">
            <div className="dignitary-img">
              <img src="/v9.png" alt="Imran Zaki" />
            </div>
            <div className="dignitary-content">
              <div className="dignitary-quote-icon">❝</div>
              <p className="dignitary-quote">"To build strong, positive connections with students privileged and under-privileged, so they can achieve independence, confidence and academic knowledge."</p>
              <h4 className="dignitary-name">Imran Zaki</h4>
              <p className="dignitary-role">Hony. Secretary</p>
            </div>
          </div>

          <div className="dignitary-card" style={{ marginTop: '2rem' }}>
            <div className="dignitary-img">
              <img src="/v10.png" alt="Ayesha Siddiqui" />
            </div>
            <div className="dignitary-content">
              <div className="dignitary-quote-icon">❝</div>
              <p className="dignitary-quote">"To build strong, positive connections with students privileged and under-privileged, so they can achieve independence, confidence and academic knowledge."</p>
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
              { tag: '🎨 Event', date: 'May 20, 2026', h: 'Annual Art & Craft Exhibition', p: 'Join us for a spectacular showcase of creativity as students display their finest artwork, sculptures, and crafts.', hot: true, img: '/v11.png' },
              { tag: '🎭 Event', date: 'December 15, 2026', h: 'Annual Function 2026', p: 'Experience a grand evening of student performances, award ceremonies, and cultural showcases across all grades.', hot: false, img: '/v12.png' },
              { tag: '📋 Admissions', date: 'May 1, 2026', h: 'Admissions Open for 2026–27', p: 'Applications now open for all grades. Early registrations receive priority slots and scholarship consideration.', hot: false, img: '/img.png' },
            ].map((n, i) => (
              <div className={`news-card${n.hot ? ' news-hot' : ''}`} key={i}>
                {n.hot && <div className="news-ribbon">Featured</div>}
                {n.img && (
                  <div style={{ height: '200px', margin: '-2.5rem -2.5rem 1.5rem -2.5rem', overflow: 'hidden' }}>
                    <img src={n.img} alt={n.h} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
          <div className="cta-badge">🎓 Admissions Open 2026–27</div>
          <h2 className="cta-h">Begin Your Child's <span className="gold">Journey</span> with Us</h2>
          <p className="cta-p">Join thousands of families who trust St. Stephen's School for a world-class, values-driven education that lasts a lifetime.</p>
          <div className="cta-btns">
            <a href="/#donate" className="btn-gold large">Donate</a>
            <a href="tel:+911234567890" className="btn-ghost large">📞 Call Us</a>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section className="section contact-section" id="contact">
        <div className="container contact-grid">
          <div className="contact-info">
            <div className="s-tag">Contact Us</div>
            <h2 className="s-title">We'd Love to <span className="gold">Hear</span> From You</h2>
            <p className="s-body" style={{ marginBottom: '2.5rem' }}>Have questions about admissions, programs, or campus life? Our friendly team is ready to help every step of the way.</p>
            {[
              { icon: '📍', lbl: 'Address', val: '42 Knowledge Park, Sector 12, New Delhi – 110045' },
              { icon: '📞', lbl: 'Phone', val: '+91 12345 67890' },
              { icon: '✉️', lbl: 'Email', val: 'info@ststephens.edu.in' },
              { icon: '🕐', lbl: 'Office Hours', val: 'Monday – Saturday: 8:00 AM – 4:00 PM' },
            ].map((d, i) => (
              <div className="ci" key={i}>
                <div className="ci-icon">{d.icon}</div>
                <div><div className="ci-lbl">{d.lbl}</div><div className="ci-val">{d.val}</div></div>
              </div>
            ))}
          </div>
          <form className="contact-form" onSubmit={e => e.preventDefault()}>
            <div className="form-head">Send Us a Message</div>
            <div className="form-row">
              <div className="fg"><label>Parent / Guardian Name</label><input type="text" placeholder="Your full name" /></div>
              <div className="fg"><label>Phone Number</label><input type="tel" placeholder="+91 00000 00000" /></div>
            </div>
            <div className="fg"><label>Email Address</label><input type="email" placeholder="your@email.com" /></div>
            <div className="fg">
              <label>Grade Applying For</label>
              <select>
                <option value="">Select grade</option>
                {['Pre-Primary', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'].map(g => <option key={g}>{g}</option>)}
              </select>
            </div>
            <div className="fg"><label>Message</label><textarea rows={4} placeholder="Your questions or message..." /></div>
            <button type="submit" className="btn-gold full">Send Message 🚀</button>
          </form>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="logo-crest-wrapper">
                <img src="/v2.png" className="logo-crest-img" alt="St. Stephen's Crest" />
              </div>
              <div>
                <div className="logo-name">St. Stephen's School</div>
                <div className="logo-tagline">BOWBAZAR</div>
              </div>
            </div>
            <p>Nurturing young minds and shaping tomorrow's leaders since 1985. A tradition of excellence, a promise of a better future.</p>
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
