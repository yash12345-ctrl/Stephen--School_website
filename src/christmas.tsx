import { useState, useEffect, useRef } from 'react';
import './App.css';
import './christmas.css';
import { ProgramMegaMenu } from './program_top';
import { Gift, Music, Heart, Calendar, MapPin, Sparkles, Star } from 'lucide-react';

export default function Christmas() {
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const highlights = [
    { icon: <Music className="xm-icon" size={24} />, title: 'Choir & Carols', desc: 'Our student choir fills the winter air with beautiful festive carols and classic hymns, representing weeks of preparation.', tag: 'Music' },
    { icon: <Sparkles className="xm-icon" size={24} />, title: 'The Nativity Play', desc: 'A heartfelt enactment of the Christmas story by middle school students, featuring traditional costumes and songs.', tag: 'Drama' },
    { icon: <Gift className="xm-icon" size={24} />, title: 'Gift Distribution', desc: 'Santas arrival brings warm blankets, new clothes, school supplies, and special holiday treats for every child.', tag: 'Giving' },
    { icon: <Heart className="xm-icon" size={24} />, title: 'Community Feast', desc: 'A grand festive lunch prepared by volunteers and teachers, sharing the warmth of a holiday meal together.', tag: 'Feast' },
  ];

  const schedule = [
    { time: '09:30 AM', title: 'Festive Assembly & Carols', desc: 'Opening prayers followed by standard and local Bengali Christmas carols sung by the school choir.' },
    { time: '10:30 AM', title: 'The Nativity Play', desc: 'Class VI to VIII students perform the story of Christmas, reminding us of hope and love.' },
    { time: '11:45 AM', title: 'Dance & Recitation', desc: 'Creative performances, poetry, and festive dances by the primary school children.' },
    { time: '12:45 PM', title: 'Santa Claus & Gifts', desc: 'Santa arrives to hand out Eidi-style Christmas gift packs consisting of warm clothing, cakes, and toys.' },
    { time: '01:30 PM', title: 'Grand Christmas Lunch', desc: 'A special community lunch served to all 500+ students, staff, and local volunteers.' },
    { time: '03:00 PM', title: 'Vote of Thanks & Distribution', desc: 'Closing words, sweets distribution, and holiday wishes before winter recess.' },
  ];

  return (
    <div className="xm-page">
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
      <section className="xm-hero">
        <div className="xm-hero-bg" style={{ backgroundImage: "url('/christmas_hero.webp')" }} />
        <div className="xm-snow-overlay" />
        <div className="xm-hero-veil" />
        
        <div className="xm-hero-inner">
          <div className="xm-hero-tag">
            <Star size={14} className="gold-star animate-pulse" /> Annual Festive Celebration · St. Stephen's School
          </div>
          <h1 className="xm-hero-h1">
            Christmas<br /><span>Celebration</span>
          </h1>
          <p className="xm-hero-sub">
            Spreading the light of education, warmth, and holiday cheer. A season of hope and sharing dedicated to the children of Bowbazar.
          </p>

          <div className="xm-hero-meta">
            <div className="xm-meta-item">
              <Calendar size={20} className="xm-meta-icon" />
              <div>
                <div className="xm-meta-label">Date</div>
                <div style={{ fontWeight: 700 }}>December 18, 2026</div>
              </div>
            </div>
            <div className="xm-meta-item">
              <MapPin size={20} className="xm-meta-icon" />
              <div>
                <div className="xm-meta-label">Venue</div>
                <div style={{ fontWeight: 700 }}>School Campus Hall</div>
              </div>
            </div>
          </div>

          <div className="xm-hero-btns">
            <a href="#about" className="xm-btn-gold">Explore Event Details</a>
            <a href="/donate" className="xm-btn-ghost">Support our Drive</a>
          </div>
        </div>

        <div className="xm-hero-scroll">
          <span>Scroll</span>
          <div className="xm-hero-scroll-line" />
        </div>
      </section>

      {/* ── ABOUT SECTION ── */}
      <section className="xm-section xm-about" id="about">
        <div className="xm-wrap">
          <div className="xm-about-grid">
            <div className="xm-about-visual">
              <div className="xm-about-collage">
                <img loading="lazy" src="/v3.webp" alt="Christmas Celebration Prep" className="xm-collage-img-main" />
                <img loading="lazy" src="/v4.webp" alt="Students Joy" className="xm-collage-img-sec" />
              </div>
              <div className="xm-about-badge">
                <div className="xm-about-badge-num">🎄</div>
                <div className="xm-about-badge-txt">Season of Joy</div>
              </div>
            </div>
            <div>
              <div className="xm-chip">Our Festive Tradition</div>
              <h2 className="xm-h2">Spreading Hope and <span>Warmth</span></h2>
              <p className="xm-lead">
                At St. Stephen's School, Christmas is a special opportunity to express gratitude and bring smiles to our 500+ students. As an NGO-based school, we host a grand celebration to ensure every first-generation learner is wrapped in warmth and happiness before the winter break. 
              </p>
              <p className="xm-body">
                Through our annual Christmas Drive, we gather gifts, warm blankets, and support for a community feast. It is a day where barriers vanish, and we celebrate the spirit of giving together.
              </p>
              <div className="xm-about-stats">
                <div className="xm-stat">
                  <span className="xm-stat-num">500+</span>
                  <span className="xm-stat-lbl">Gifts Distributed</span>
                </div>
                <div className="xm-stat">
                  <span className="xm-stat-num">100%</span>
                  <span className="xm-stat-lbl">Community Run</span>
                </div>
                <div className="xm-stat">
                  <span className="xm-stat-num">20+</span>
                  <span className="xm-stat-lbl">Years Legacy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PAST EVENT SPOTLIGHT ── */}
      <section className="xm-section xm-spotlight" style={{ background: '#fdf9f9', borderTop: '1px solid rgba(156, 37, 41, 0.04)', borderBottom: '1px solid rgba(156, 37, 41, 0.04)' }}>
        <div className="xm-wrap">
          <div className="xm-spotlight-card" style={{
            background: 'var(--xm-white)',
            padding: '3rem',
            borderRadius: '24px',
            boxShadow: '0 15px 35px rgba(156, 37, 41, 0.04)',
            border: '1px solid rgba(156, 37, 41, 0.04)'
          }}>
            <div className="xm-spotlight-grid">
              <div>
                <div className="xm-chip" style={{ background: 'rgba(156, 37, 41, 0.08)', color: 'var(--xm-red)' }}>Event Spotlight</div>
                <h3 className="xm-h2" style={{ fontSize: '2rem', marginBottom: '1.2rem' }}>A Magical <span>Cathedral Visit</span></h3>
                <p className="xm-lead" style={{ fontSize: '1.05rem', lineHeight: '1.7', color: 'var(--xm-dark)' }}>
                  <strong>December 25, 2024</strong> was a day filled with absolute happiness for the students of St. Stephen's School when they visited the historic <strong>St. Paul's Cathedral</strong> and received wonderful Christmas gifts.
                </p>
                <p className="xm-body" style={{ margin: 0, fontSize: '0.95rem' }}>
                  The students sang carols in the serene cathedral gardens and received winter gifts, making this holiday excursion a truly unforgettable experience of warmth and cheer.
                </p>
              </div>
              <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', height: '240px' }}>
                <img loading="lazy" src="/v3.webp" alt="St. Paul's Cathedral Visit on December 25, 2024" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{
                  position: 'absolute',
                  bottom: '1rem',
                  left: '1rem',
                  background: 'rgba(156, 37, 41, 0.85)',
                  color: '#fff',
                  padding: '0.4rem 1rem',
                  borderRadius: '50px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  backdropFilter: 'blur(4px)'
                }}>
                  📅 Dec 25, 2024
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HIGHLIGHTS SECTION ── */}
      <section className="xm-section xm-highlights">
        <div className="xm-wrap">
          <div className="xm-highlights-head">
            <div className="xm-chip">Event Highlights</div>
            <h2 className="xm-h2">What Makes it <span>Special</span></h2>
            <p className="xm-lead">
              A day carefully curated to celebrate community, culture, and care.
            </p>
          </div>
          <div className="xm-cards-grid">
            {highlights.map((h, i) => (
              <div className="xm-card" key={i}>
                <div className="xm-card-icon-wrap">{h.icon}</div>
                <h3 className="xm-card-h">{h.title}</h3>
                <p className="xm-card-p">{h.desc}</p>
                <span className="xm-card-tag">{h.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SCHEDULE SECTION ── */}
      <section className="xm-section xm-schedule">
        <div className="xm-wrap">
          <div className="xm-highlights-head">
            <div className="xm-chip">Timeline</div>
            <h2 className="xm-h2">Program <span>Schedule</span></h2>
            <p className="xm-lead">
              An overview of the events taking place during our Christmas Day celebration.
            </p>
          </div>
          <div className="xm-timeline">
            {schedule.map((s, i) => (
              <div className={`xm-timeline-item ${i % 2 !== 0 ? 'xm-alt' : ''}`} key={i}>
                <div className="xm-time-col">{s.time}</div>
                <div className="xm-dot-col">
                  <div className="xm-timeline-dot"><Sparkles size={12} className="text-[#ffd700]" /></div>
                </div>
                <div className="xm-content-col">
                  <h4 className="xm-timeline-title">{s.title}</h4>
                  <p className="xm-timeline-desc">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ── */}
      <section className="xm-cta">
        <div className="xm-cta-inner">
          <h2 className="xm-cta-h">Spread the Joy of<br />Christmas This Winter</h2>
          <p className="xm-cta-p">
            Help us buy school supplies, warm sweaters, and holiday cakes for underprivileged children. Your small contribution can light up a child's festive season.
          </p>
          <div className="xm-cta-btns">
            <a href="/donate" className="xm-btn-gold">Sponsor a Gift Pack →</a>
            <a href="/about" className="xm-btn-ghost">Learn About St. Stephen's</a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer xm-footer">
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
