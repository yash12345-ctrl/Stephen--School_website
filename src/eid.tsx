import { useState, useEffect, useRef } from 'react';
import './App.css';
import './eid.css';
import { ProgramMegaMenu } from './program_top';
import { Moon, Gift, Heart, Calendar, MapPin, Sparkles, Star } from 'lucide-react';

export default function Eid() {
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Eidi Envelope Animation State
  const [eidiOpen, setEidiOpen] = useState(false);
  const [coins, setCoins] = useState<{ id: number; left: number; delay: number; scale: number }[]>([]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenEidi = () => {
    if (!eidiOpen) {
      // Generate randomized coins
      const newCoins = Array.from({ length: 20 }).map((_, i) => ({
        id: i + Date.now(),
        left: Math.random() * 80 + 10, // range 10% to 90%
        delay: Math.random() * 0.6,    // staggered delay in seconds
        scale: Math.random() * 0.5 + 0.8, // scale factor
      }));
      setCoins(newCoins);
      setEidiOpen(true);
    } else {
      setEidiOpen(false);
      setCoins([]);
    }
  };

  const highlights = [
    { icon: <Moon className="eid-card-icon" size={24} />, title: 'Eid Milan Assembly', desc: 'A beautiful morning gathering where students share speeches on unity, exchange greetings, and recite poetry.', tag: 'Community' },
    { icon: <Sparkles className="eid-card-icon" size={24} />, title: 'Cultural Mehfil', desc: 'Performances of traditional music, ghazals, and inter-faith dramas demonstrating peace and harmony.', tag: 'Cultural' },
    { icon: <Gift className="eid-card-icon" size={24} />, title: 'Eidi Distribution', desc: 'Providing educational kits, sweet boxes, and new festive outfits for all 500+ underprivileged students.', tag: 'Sharing' },
    { icon: <Heart className="eid-card-icon" size={24} />, title: 'The Grand Feast', desc: 'A community feast featuring delicious biryani, traditional sewai, and fruits, shared by students and volunteers.', tag: 'Feast' },
  ];

  const schedule = [
    { time: '08:30 AM', title: 'Morning Assembly & Eid Greetings', desc: 'Opening assembly starting with prayer, followed by principal address and student greetings.' },
    { time: '09:15 AM', title: 'Sufi Choir & Poetry Mehfil', desc: 'Students perform devotional melodies and poetry readings on love, unity, and brotherhood.' },
    { time: '10:30 AM', title: 'Eid Milan Dramatic Skit', desc: 'Middle school students present a play on cultural harmony and inter-faith sharing.' },
    { time: '11:30 AM', title: 'Eidi & Gift Distribution', desc: 'Distribution of special Eidi gift envelopes containing stationery, sweets, and fresh clothes.' },
    { time: '12:30 PM', title: 'Grand Community Feast', desc: 'Traditional Eid lunch serving fresh chicken biryani, sheer khurma, and sweets to all children.' },
    { time: '02:00 PM', title: 'Volunteer Appreciation & Closing', desc: 'Expressing gratitude to sponsors and volunteers before releasing students for holiday break.' },
  ];

  return (
    <div className="eid-page-container">
      {/* ── NAVBAR ── */}
      <nav className={`navbar navbar--about${scrolled ? ' navbar--fixed' : ''}`}>
        <div className="nav-inner">
          <a href="/" className="nav-logo">
            <div className="logo-crest-wrapper">
              <img src="/v2.png" className="logo-crest-img" alt="St. Stephen's Crest" />
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
            <li className="mobile-only-nav-apply"><a href="/#donate">Donate</a></li>
          </ul>
          <div className="nav-actions">
            <a href="/#donate" className="nav-cta">Donate Now →</a>
            <div className={`mobile-toggle ${mobileMenuOpen ? 'active' : ''}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <span></span><span></span><span></span>
            </div>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="eid-hero">
        <div className="eid-hero-bg" style={{ backgroundImage: "url('/eid_hero.png')" }} />
        <div className="eid-hero-veil" />
        
        <div className="eid-hero-inner">
          <div className="eid-hero-tag">
            <Star size={14} className="gold-crescent animate-pulse" /> Community Celebration · St. Stephen's School
          </div>
          <h1 className="eid-hero-h1">
            Eid Milan<br /><span>Celebration</span>
          </h1>
          <p className="eid-hero-sub">
            Celebrating peace, generosity, and community harmony. A special day of Eid feasts and Eidi gifts for our 500+ students in Bowbazar.
          </p>

          <div className="eid-hero-meta">
            <div className="eid-meta-item">
              <Calendar size={20} className="eid-meta-icon" />
              <div>
                <div className="eid-meta-label">Date</div>
                <div style={{ fontWeight: 700 }}>Upcoming Festival</div>
              </div>
            </div>
            <div className="eid-meta-item">
              <MapPin size={20} className="eid-meta-icon" />
              <div>
                <div className="eid-meta-label">Venue</div>
                <div style={{ fontWeight: 700 }}>School Central Courtyard</div>
              </div>
            </div>
          </div>

          <div className="eid-hero-btns">
            <a href="#interactive-eidi" className="eid-btn-gold">Receive Eidi Blessings</a>
            <a href="/#donate" className="eid-btn-ghost">Support Eid Drive</a>
          </div>
        </div>

        <div className="eid-hero-scroll">
          <span>Scroll</span>
          <div className="eid-hero-scroll-line" />
        </div>
      </section>

      {/* ── INTERACTIVE EIDI SECTION ── */}
      <section className="eid-section eid-interactive" id="interactive-eidi">
        <div className="eid-wrap text-center">
          <div className="eid-chip">Interactive Blessing</div>
          <h2 className="eid-h2">Claim Your School <span>Eidi</span></h2>
          <p className="eid-lead" style={{ maxWidth: '600px', margin: '0 auto 3.5rem auto' }}>
            In our school tradition, children receive Eidi envelopes containing blessings and small gifts. Open the digital envelope below to receive yours!
          </p>

          {/* Envelope Interactive Box */}
          <div className="envelope-animation-container">
            <div className={`eidi-envelope-box ${eidiOpen ? 'open' : ''}`} onClick={handleOpenEidi}>
              
              {/* Envelope Body */}
              <div className="envelope-back">
                <div className="envelope-letter">
                  <div className="letter-header">
                    <Moon size={28} className="letter-crescent" />
                    <h3>Eid Mubarak!</h3>
                  </div>
                  <div className="letter-body-content">
                    <p className="blessing-ar">تَقَبَّلَ اللَّهُ مِنَّا وَمِنْكُمْ</p>
                    <p className="blessing-en">"May Allah flood your life with happiness on this occasion, heart with love, soul with spiritual peace, and mind with wisdom."</p>
                    <div className="letter-sign">With love, St. Stephen's School</div>
                  </div>
                </div>
                <div className="envelope-flap"></div>
                <div className="envelope-front"></div>
              </div>

              {/* Spawned Coins */}
              {eidiOpen && coins.map(coin => (
                <div
                  key={coin.id}
                  className="eidi-coin"
                  style={{
                    left: `${coin.left}%`,
                    animationDelay: `${coin.delay}s`,
                    transform: `scale(${coin.scale})`
                  }}
                >
                  🪙
                </div>
              ))}
            </div>

            <div style={{ marginTop: '2.5rem' }}>
              <button className="eid-btn-gold large" onClick={handleOpenEidi}>
                {eidiOpen ? 'Close Envelope' : 'Open Eidi Envelope ✉️'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT SECTION ── */}
      <section className="eid-section eid-about">
        <div className="eid-wrap">
          <div className="eid-about-grid">
            <div className="eid-about-visual">
              <div className="eid-about-collage">
                <img src="/v4.jpeg" alt="Eid Milan Prep" className="eid-collage-img-main" />
                <img src="/v3.png" alt="Children Smiling" className="eid-collage-img-sec" />
              </div>
              <div className="eid-about-badge">
                <div className="eid-about-badge-num">🌙</div>
                <div className="eid-about-badge-txt">Eid Milan</div>
              </div>
            </div>
            <div>
              <div className="eid-chip">A Tradition of Inclusion</div>
              <h2 className="eid-h2">Sharing Blessings and <span>Happiness</span></h2>
              <p className="eid-lead">
                At St. Stephen's School, our core mission is the social transformation of underprivileged children. Our Eid Milan celebration brings together students of all faiths to celebrate sharing, compassion, and community bonds.
              </p>
              <p className="eid-body">
                Most of our students come from street and slum communities of Bowbazar and are first-generation learners. We celebrate Eid by organizing a massive community feast (delicious chicken biryani and sewai) and distributing "Eidi" (new clothing, storybooks, and hygiene packs) so they can fully participate in the festive spirit.
              </p>
              <div className="eid-about-stats">
                <div className="xm-stat">
                  <span className="xm-stat-num">500+</span>
                  <span className="xm-stat-lbl">Feast Plates Served</span>
                </div>
                <div className="xm-stat">
                  <span className="xm-stat-num">100%</span>
                  <span className="xm-stat-lbl">Inclusivity</span>
                </div>
                <div className="xm-stat">
                  <span className="xm-stat-num">NGO</span>
                  <span className="xm-stat-lbl">Supported Event</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PAST EVENT SPOTLIGHT ── */}
      <section className="eid-section eid-spotlight" style={{ background: '#f4fbf7', borderTop: '1px solid rgba(11, 69, 40, 0.04)', borderBottom: '1px solid rgba(11, 69, 40, 0.04)' }}>
        <div className="eid-wrap">
          <div className="eid-spotlight-card" style={{
            background: 'var(--eid-white)',
            padding: '3rem',
            borderRadius: '24px',
            boxShadow: '0 15px 35px rgba(11, 69, 40, 0.04)',
            border: '1px solid rgba(11, 69, 40, 0.04)'
          }}>
            <div className="eid-spotlight-grid">
              <div>
                <div className="eid-chip" style={{ background: 'rgba(207, 168, 71, 0.1)', color: 'var(--eid-gold)' }}>Event Spotlight</div>
                <h3 className="eid-h2" style={{ fontSize: '2rem', marginBottom: '1.2rem' }}>A Heartwarming <span>Memory</span></h3>
                <p className="eid-lead" style={{ fontSize: '1.05rem', lineHeight: '1.7', color: 'var(--eid-dark)' }}>
                  Eid was joyously celebrated on <strong>May 6, 2022</strong>, with <strong>Kanchan Datta</strong> from the <em>Inner Circle</em> being wholeheartedly thanked for his invaluable contribution to the event.
                </p>
                <p className="eid-body" style={{ margin: 0, fontSize: '0.95rem' }}>
                  Gifts were delightfully distributed among students who eagerly gathered in the assembly hall to receive their wonderful presents. This heartwarming celebration remains one of our most treasured school memories.
                </p>
              </div>
              <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', height: '240px' }}>
                <img src="/v4.jpeg" alt="Gifts Distribution on May 6, 2022" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{
                  position: 'absolute',
                  bottom: '1rem',
                  left: '1rem',
                  background: 'rgba(11, 69, 40, 0.85)',
                  color: '#fff',
                  padding: '0.4rem 1rem',
                  borderRadius: '50px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  backdropFilter: 'blur(4px)'
                }}>
                  📅 May 6, 2022
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HIGHLIGHTS SECTION ── */}
      <section className="eid-section eid-highlights">
        <div className="eid-wrap">
          <div className="eid-highlights-head">
            <div className="eid-chip">Celebration Highlights</div>
            <h2 className="eid-h2">What to <span>Expect</span></h2>
            <p className="eid-lead">
              A day of happiness, delicious aromas, and sweet memories.
            </p>
          </div>
          <div className="eid-cards-grid">
            {highlights.map((h, i) => (
              <div className="eid-card" key={i}>
                <div className="eid-card-icon-wrap">{h.icon}</div>
                <h3 className="eid-card-h">{h.title}</h3>
                <p className="eid-card-p">{h.desc}</p>
                <span className="eid-card-tag">{h.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SCHEDULE SECTION ── */}
      <section className="eid-section eid-schedule">
        <div className="eid-wrap">
          <div className="eid-highlights-head">
            <div className="eid-chip">Event Timeline</div>
            <h2 className="eid-h2">Celebration <span>Schedule</span></h2>
            <p className="eid-lead">
              Timeline of activities scheduled for our festive Eid Milan gathering.
            </p>
          </div>
          <div className="eid-timeline">
            {schedule.map((s, i) => (
              <div className={`eid-timeline-item ${i % 2 !== 0 ? 'eid-alt' : ''}`} key={i}>
                <div className="eid-time-col">{s.time}</div>
                <div className="eid-dot-col">
                  <div className="eid-timeline-dot"><Sparkles size={12} className="text-[#ffd700]" /></div>
                </div>
                <div className="eid-content-col">
                  <h4 className="eid-timeline-title">{s.title}</h4>
                  <p className="eid-timeline-desc">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ── */}
      <section className="eid-cta">
        <div className="eid-cta-inner">
          <h2 className="eid-cta-h">Spread the Joy & Blessings<br />of Eid Milan</h2>
          <p className="eid-cta-p">
            Your generous contributions fund the traditional Eid feast, sweet boxes, and customized Eidi gift packs for underprivileged children. Sponsor a pack today.
          </p>
          <div className="eid-cta-btns">
            <a href="/#donate" className="eid-btn-gold">Sponsor Eidi Packs →</a>
            <a href="/about" className="eid-btn-ghost">Learn About Us</a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer eid-footer">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="logo-crest-wrapper">
                <img src="/v2.png" className="logo-crest-img" alt="St. Stephen's Crest" />
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
              <li><a href="/eid">Eid Celebration</a></li>
              <li><a href="/christmas">Christmas Celebration</a></li>
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
