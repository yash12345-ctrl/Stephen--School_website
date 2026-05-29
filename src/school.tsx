import React, { useState, useEffect } from 'react';
import './school.css';
import { ProgramMegaMenu } from './program_top';
import { GraduationCap, BookOpen, Atom, Trophy, Compass, ArrowRight, Play, Cpu, Sparkles, Building, Waves, Palette } from 'lucide-react';

export default function School() {
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [activeSlide, setActiveSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const infraItems = [
    {
      title: 'Zen Botanical Garden & Greenhouses',
      desc: 'A peaceful landscaped sanctuary featuring walking trails, a clear koi pond, and temperature-controlled greenhouses for student botany projects, open-air poetry, and mindfulness classes.',
      icon: <Sparkles size={24} />,
      img: '/zen_garden.png'
    },
    {
      title: 'Astronomy Observatory Deck',
      desc: 'Built atop the high-school pavilion, featuring a retractable computerized dome and a celestial tracking telescope. Host to stargazing nights, astrophysics electives, and astro-photography clubs.',
      icon: <Compass size={24} />,
      img: '/observatory_deck.png'
    },
    {
      title: 'Amphitheatre of the Whispering Woods',
      desc: 'An outdoor stone amphitheatre surrounded by towering pine trees and soft twilight lighting. Designed for acoustic concerts, student dramatic monologues, and inter-house debate rounds.',
      icon: <Play size={24} />,
      img: '/amphitheatre.png'
    },
    {
      title: 'Digital Media & Podcasting Suite',
      desc: 'A fully soundproofed acoustic recording lab featuring broadcast-grade microphones, dynamic mixing panels, green screens, and professional video editing units for the student podcast network.',
      icon: <Cpu size={24} />,
      img: '/library.png'
    },
    {
      title: 'Heritage Museum & Archive Gallery',
      desc: 'A curated gallery space preserving historic local manuscripts, antique regional maps, and geological fossils. Used as an active learning center for archaeology, history, and social science courses.',
      icon: <BookOpen size={24} />,
      img: '/science_lab.png'
    },
    {
      title: 'Maker Space & Industrial Design Hub',
      desc: 'An invention workshop equipped with multi-axis 3D printers, laser cutters, automated drills, and woodworking equipment. Students turn conceptual science projects into functioning mechanical realities.',
      icon: <Atom size={24} />,
      img: '/science_lab.png'
    }
  ];

  const houses = [
    {
      name: 'Vanguard',
      color: '#E03C31',
      motto: 'Leadership through Action',
      desc: 'Represented by the Red Dragon, Vanguardians are known for their resilience, leadership qualities, and competitive spirit.',
      emoji: '🛡️'
    },
    {
      name: 'Phoenix',
      color: '#E6A100',
      motto: 'Rise from the ashes',
      desc: 'Represented by the Golden Phoenix, this house excels in visual arts, debating, and academic performance.',
      emoji: '🔥'
    },
    {
      name: 'Pegasus',
      color: '#0A74B9',
      motto: 'Reach for the stars',
      desc: 'Represented by the Blue Winged Pegasus, members prioritize collaboration, scientific discovery, and global issues.',
      emoji: '⚡'
    },
    {
      name: 'Centaur',
      color: '#108043',
      motto: 'Strength and Wisdom',
      desc: 'Represented by the Green Archer, Centaurs are distinguished by their sportsmanship, environmental focus, and humility.',
      emoji: '🏹'
    }
  ];

  const scenicSpots = [
    {
      title: 'The Whispering Canopy Garden & Koi Pond',
      desc: 'A hidden botanical pocket paved with local river rocks, boasting a floating timber gazebo and a stream of koi fish. Shaded by ancient cedar trees, it is a favored sanctuary for student writers and visual artists.',
      img: '/zen_garden.png'
    },
    {
      title: 'The Reflection Pavilion & Willows Lake',
      desc: 'A serene timber gazebo projecting out over the campus lake, framed by weeping willow branches. It offers students a meditative outdoor reading retreat away from classrooms.',
      img: '/reflection_pavilion.png'
    },
    {
      title: 'The Sunlit Atrium & Glasshouse',
      desc: 'A magnificent three-story glass greenhouse in the central academic wing, where student study desks are nestled among exotic orchids, giant ferns, and towering palms.',
      img: '/sunlit_atrium.png'
    },
    {
      title: 'The Starlight Courtyard & Amphitheatre',
      desc: 'An open-air stone plaza lined with string lights and limestone seating. On autumn evenings, it hosts student acoustic performances, book club meetings, and casual conversation.',
      img: '/amphitheatre.png'
    }
  ];

  return (
    <div className="school-page">

      {/* ── NAVBAR ── */}
      <nav className={`navbar${scrolled ? ' navbar--fixed' : ''}`}>
        <div className="nav-inner">
          <a href="/" className="nav-logo">
            <span className="logo-crest"><GraduationCap size={32} /></span>
            <div>
              <div className="logo-name">Greenfield</div>
              <div className="logo-tagline">ACADEMY</div>
            </div>
          </a>
          <ul className="nav-links">
            {(['Home', 'About', 'Programs', 'School', 'News', 'Contact'] as const).map(l => (
              <li
                key={l}
                onMouseEnter={l === 'Programs' ? () => setMegaMenuOpen(true) : undefined}
                onMouseLeave={l === 'Programs' ? () => setMegaMenuOpen(false) : undefined}
                className={l === 'Programs' ? 'has-mega' : ''}
              >
                <a
                  href={l === 'Home' ? '/' : l === 'About' ? '/about' : l === 'News' ? '/news' : l === 'School' ? '/the-school' : `/#${l.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={e => { if (l === 'Programs') { e.preventDefault(); setMegaMenuOpen(!megaMenuOpen); } }}
                  className={[
                    l === 'Programs' ? `nav-dropdown ${megaMenuOpen ? 'active' : ''}` : '',
                    l === 'School'   ? 'nav-active' : '',
                  ].join(' ').trim()}
                >
                  {l}
                  {l === 'Programs' && (
                    <svg className="caret" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  )}
                </a>
                {l === 'Programs' && (
                  <ProgramMegaMenu open={megaMenuOpen} />
                )}
              </li>
            ))}
          </ul>
          <a href="/#contact" className="nav-cta">Apply Now →</a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="sch-hero">
        <div className="sch-hero-bg" />
        <div className="sch-hero-veil" />
        <div className="sch-hero-glow" />
        <div className="sch-hero-inner">
          <div className="sch-hero-pill">
            <Sparkles size={14} /> The Greenfield Experience
          </div>
          <h1 className="sch-hero-h1">
            Where <em>Legacy</em> Meets<br />Modern Innovation
          </h1>
          <p className="sch-hero-p">
            Explore a 25-acre modern school environment equipped with state-of-the-art labs, sports grounds, and classrooms, designed to shape future-ready leaders.
          </p>
          <div className="sch-hero-btns">
            <a href="#infra" className="sch-btn-gold">Explore Campus</a>
            <a href="#houses" className="sch-btn-ghost">The House System</a>
          </div>
        </div>
      </section>

      {/* ── STATS ROW (overlapping hero) ── */}
      <div className="sch-container" style={{ position: 'relative', zIndex: 12 }}>
        <div className="sch-stats-row">
          {[
            { num: '25 Acres', label: 'Lush Green Campus' },
            { num: '12+', label: 'Elite Sports Facilities' },
            { num: '80+', label: 'AI & Tech Workstations' },
            { num: '100%', label: 'Smart Classroom Tech' }
          ].map((st, i) => (
            <div className="sch-stat-box" key={i}>
              <div className="sch-stat-num">{st.num}</div>
              <div className="sch-stat-label">{st.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── INFRASTRUCTURE & CAMPUS LIFE ── */}
      <section className="sch-section" id="infra" style={{ paddingTop: '200px' }}>
        <div className="sch-container">
          <div className="sch-center-head">
            <span className="sch-chip">World-Class Infrastructure</span>
            <h2 className="sch-section-h2">Designed to Inspire <span>Excellence</span></h2>
            <p className="sch-section-p">
              We believe the physical environment is the "third teacher." Every space at Greenfield Academy is designed to encourage discovery, safety, and physical wellness.
            </p>
          </div>

          <div className="sch-infra-grid">
            {infraItems.map((item, idx) => (
              <div className="sch-infra-card" key={idx}>
                <div className="sch-infra-img">
                  <img src={item.img} alt={item.title} />
                  <div className="sch-infra-icon">
                    {item.icon}
                  </div>
                </div>
                <div className="sch-infra-body">
                  <h3 className="sch-infra-title">{item.title}</h3>
                  <p className="sch-infra-text">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LEADERSHIP & PRINCIPAL MESSAGE ── */}
      <section className="sch-section" style={{ background: '#fcfcfc', borderTop: '1px solid rgba(0,0,0,0.04)', borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
        <div className="sch-container">
          <div className="sch-msg-grid">
            <div className="sch-msg-photo-wrap">
              <img src="/library.png" className="sch-msg-photo" alt="Principal Desk" />
              <div className="sch-msg-frame" />
            </div>
            <div className="sch-msg-body">
              <span className="sch-chip" style={{ width: 'fit-content' }}>From the Principal's Desk</span>
              <div className="sch-msg-quote">
                "We don't just teach curricula; we cultivate an environment where students learn to identify problems, build creative models, and test them with scientific rigor."
              </div>
              <p className="sch-msg-text">
                At Greenfield Academy, education is a dynamic partnership. We combine CBSE and IB frameworks with hands-on AI & Robotics work and sports fields to ensure students achieve academic excellence while developing strong team cooperation and moral character.
              </p>
              <p className="sch-msg-text">
                As you walk through our hallways, you'll see collaborative work hubs, dynamic student-run projects, and competitive sports sessions. We welcome families to visit our campus and join us in our pursuit of leadership.
              </p>
              <div className="sch-msg-signature">
                <div className="sch-msg-name">Mrs. Sudha Sharma</div>
                <div className="sch-msg-title">Principal, Greenfield Academy</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SCENIC CAMPUS SPOTS ── */}
      <section className="sch-section" id="scenic-spots" style={{ background: '#f8f6f2' }}>
        <div className="sch-container">
          <div className="sch-center-head">
            <span className="sch-chip">Aesthetic Havens</span>
            <h2 className="sch-section-h2">Signature Campus <span>Spots</span></h2>
            <p className="sch-section-p">
              Explore the peaceful, visual corners of Greenfield Academy. These green spaces and sunlit structures are designed to provide students with zones of quiet inspiration and creative peace.
            </p>
          </div>

          <div className="sch-spots-grid">
            {scenicSpots.map((spot, i) => (
              <div className="sch-spot-card" key={i}>
                <div className="sch-spot-img-wrap">
                  <img src={spot.img} alt={spot.title} />
                </div>
                <div className="sch-spot-content">
                  <h3 className="sch-spot-title">{spot.title}</h3>
                  <p className="sch-spot-desc">{spot.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOUSE SYSTEM ── */}
      <section className="sch-section dark" id="houses">
        <div className="sch-container">
          <div className="sch-center-head">
            <span className="sch-chip light">Student Life</span>
            <h2 className="sch-section-h2" style={{ color: '#fff' }}>The Greenfield <span>House System</span></h2>
            <p className="sch-section-p" style={{ color: 'rgba(255,255,255,0.7)' }}>
              To foster healthy competition, sportsmanship, and student leadership, the school is divided into four distinct houses, competing annually for the prestigious Chairman's Shield.
            </p>
          </div>

          <div className="sch-house-grid">
            {houses.map((house, i) => (
              <div
                className="sch-house-card"
                key={i}
                style={{ '--house-color': house.color } as React.CSSProperties}
              >
                <div className="sch-house-crest">
                  {house.emoji}
                </div>
                <h3 className="sch-house-name">{house.name}</h3>
                <div className="sch-house-motto">"{house.motto}"</div>
                <p className="sch-house-desc">{house.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LEARNING PARTNERS ── */}
      <section className="sch-section" id="partners" style={{ background: '#fff', borderTop: '1px solid rgba(0,0,0,0.05)', padding: '6rem 0' }}>
        <div className="sch-container">
          <div className="sch-colorful-sep">
            <div className="sch-sep-bar" />
            <div className="sch-sep-bar" />
            <div className="sch-sep-bar" />
            <div className="sch-sep-bar" />
            <div className="sch-sep-bar" />
          </div>

          <div style={{ maxWidth: '700px', marginBottom: '3.5rem' }}>
            <h2 className="sch-section-h2" style={{ fontSize: '2.6rem', marginBottom: '1.2rem', fontWeight: 800 }}>Learning Partners</h2>
            <p className="sch-section-p" style={{ fontSize: '1.05rem', color: '#555', lineHeight: '1.8' }}>
              Greenfield Academy works with world-class external partners to offer new and exciting programmes and services. These include:
            </p>
          </div>

          <div className="sch-partners-slider-wrap">
            <button 
              className="sch-play-pause-btn"
              onClick={() => setIsPlaying(!isPlaying)}
              title={isPlaying ? "Pause Slider" : "Play Slider"}
              aria-label={isPlaying ? "Pause Slider" : "Play Slider"}
            >
              {isPlaying ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="4" y="4" width="4" height="16" /><rect x="16" y="4" width="4" height="16" /></svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21" /></svg>
              )}
            </button>

            <div className="sch-partners-track">
              <div 
                className="sch-partners-list" 
                style={{ 
                  transform: `translateX(-${activeSlide * 25}%)` 
                }}
              >
                {/* Partner 1: CLL */}
                <div className="sch-partner-card">
                  <svg className="sch-partner-logo-svg" viewBox="0 0 280 120" width="100%">
                    <text x="30" y="75" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="72" fill="#0c4c8a">cll</text>
                    <circle cx="150" cy="55" r="14" fill="#FFC72C" />
                    <circle cx="178" cy="55" r="6" fill="#FFC72C" />
                    <path d="M 145,68 Q 165,85 185,68" stroke="#FFC72C" strokeWidth="6" strokeLinecap="round" fill="none" />
                    <text x="30" y="105" fontFamily="'Inter', sans-serif" fontWeight="700" fontSize="16" fill="#0085CA" letterSpacing="1">language centres</text>
                  </svg>
                </div>

                {/* Partner 2: Football 2 Be */}
                <div className="sch-partner-card">
                  <svg className="sch-partner-logo-svg" viewBox="0 0 220 220" width="100%">
                    <circle cx="110" cy="110" r="95" fill="none" stroke="#0c4c8a" strokeWidth="6" />
                    <circle cx="110" cy="110" r="90" fill="#E8F4FA" />
                    <circle cx="110" cy="110" r="75" fill="none" stroke="#0c4c8a" strokeWidth="2" strokeDasharray="5,5" />
                    
                    <circle cx="110" cy="110" r="40" fill="none" stroke="#0c4c8a" strokeWidth="2" />
                    
                    <rect x="90" y="95" width="40" height="30" stroke="#0c4c8a" strokeWidth="2" fill="none" />
                    <rect x="91" y="96" width="13" height="28" fill="#000000" />
                    <rect x="104" y="96" width="13" height="28" fill="#FFC72C" />
                    <rect x="117" y="96" width="13" height="28" fill="#DA291C" />

                    <path id="curve-top" d="M 35,110 A 75,75 0 0,1 185,110" fill="none" />
                    <text fontFamily="'Inter', sans-serif" fontSize="13" fontWeight="900" fill="#0c4c8a" letterSpacing="2">
                      <textPath href="#curve-top" startOffset="50%" textAnchor="middle">FOOTBALL 2 BE</textPath>
                    </text>

                    <path id="curve-bottom" d="M 185,110 A 75,75 0 0,1 35,110" fill="none" />
                    <text fontFamily="'Inter', sans-serif" fontSize="13" fontWeight="900" fill="#0c4c8a" letterSpacing="3">
                      <textPath href="#curve-bottom" startOffset="50%" textAnchor="middle">F2B</textPath>
                    </text>
                  </svg>
                </div>

                {/* Partner 3: g4g */}
                <div className="sch-partner-card">
                  <svg className="sch-partner-logo-svg" viewBox="0 0 220 180" width="100%">
                    <g transform="translate(110, 60) scale(1.2)">
                      <circle cx="0" cy="0" r="14" fill="#00B140" opacity="0.85" />
                      <circle cx="0" cy="-22" r="14" fill="#00B140" opacity="0.85" />
                      <circle cx="20" cy="-10" r="14" fill="#00B140" opacity="0.85" />
                      <circle cx="20" cy="14" r="14" fill="#00B140" opacity="0.85" />
                      <circle cx="-20" cy="-10" r="14" fill="#00B140" opacity="0.85" />
                      <circle cx="-20" cy="14" r="14" fill="#00B140" opacity="0.85" />
                      <circle cx="0" cy="22" r="14" fill="#00B140" opacity="0.85" />
                      <circle cx="0" cy="0" r="8" fill="#FFC72C" />
                    </g>
                    <text x="110" y="145" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="48" fill="#111" textAnchor="middle" letterSpacing="-1">g4g</text>
                  </svg>
                </div>

                {/* Partner 4: Pelle Hoops */}
                <div className="sch-partner-card">
                  <svg className="sch-partner-logo-svg" viewBox="0 0 280 120" width="100%">
                    <g transform="translate(10, 15)">
                      <circle cx="45" cy="45" r="40" fill="#E65100" />
                      <path d="M 15,45 Q 45,45 75,45" stroke="#000" strokeWidth="2" fill="none" />
                      <path d="M 45,15 Q 45,45 45,75" stroke="#000" strokeWidth="2" fill="none" />
                      <path d="M 22,22 Q 45,45 68,68" stroke="#000" strokeWidth="2" fill="none" />
                      <path d="M 22,68 Q 45,45 68,22" stroke="#000" strokeWidth="2" fill="none" />
                      <path d="M 45,28 L 52,38 L 48,48 L 45,55 L 42,48 L 38,38 Z" fill="#000" />
                      <circle cx="45" cy="24" r="4" fill="#000" />
                      <path d="M 45,30 L 58,16" stroke="#000" strokeWidth="4" strokeLinecap="round" />
                      <circle cx="61" cy="13" r="3" fill="#E65100" />
                    </g>
                    
                    <text x="105" y="45" fontFamily="'Inter', sans-serif" fontWeight="700" fontSize="13" fill="#E65100" letterSpacing="1">PELLE STRATEGIX</text>
                    <text x="105" y="80" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="36" fill="#000" letterSpacing="-1">HOOPS</text>
                    <text x="105" y="98" fontFamily="'Inter', sans-serif" fontWeight="700" fontSize="7" fill="#666">BUILD A GAME. BUILD CONFIDENCE. BUILD A LIFESTYLE.</text>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="sch-slider-dots">
            {[0, 1, 2, 3].map(idx => (
              <button
                key={idx}
                className={`sch-dot ${activeSlide === idx ? 'active' : ''}`}
                onClick={() => {
                  setActiveSlide(idx);
                  setIsPlaying(false); // Stop autoplay when clicked manually
                }}
                title={`Go to slide ${idx + 1}`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── ADMISSIONS CTA ── */}
      <section className="sch-cta">
        <div className="sch-cta-inner">
          <span className="sch-chip light">Apply Today</span>
          <h2 className="sch-section-h2" style={{ color: '#fff', marginBottom: '1.5rem' }}>
            Ready to Discover the <span>Greenfield Advantage</span>?
          </h2>
          <p className="sch-section-p" style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '3rem' }}>
            Admissions for the academic session 2026–27 are open. Schedule a campus tour, request a prospectus, or submit your online application today.
          </p>
          <div className="sch-hero-btns">
            <a href="/#contact" className="sch-btn-gold">Apply Online Now</a>
            <a href="/about" className="sch-btn-ghost">Learn About Us</a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="logo-crest"><GraduationCap size={32} /></span>
              <div>
                <div className="logo-name">Greenfield</div>
                <div className="logo-tagline">ACADEMY</div>
              </div>
            </div>
            <p>Providing value-based, world-class education that shapes tomorrow's leaders since 1985.</p>
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
            <div className="footer-col-h">Academics</div>
            <ul>
              {['Pre-Primary', 'Primary School', 'Middle School', 'Senior Secondary', 'Sports & Arts', 'Digital Skills'].map(l => (
                <li key={l}><a href="#">{l}</a></li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <div className="footer-col-h">Contact Info</div>
            <ul style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.83rem', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <li>📍 25, Knowledge Park, New Delhi, India</li>
              <li>📞 +91 11 4050 6070</li>
              <li>✉️ info@greenfield.edu.in</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 Greenfield Academy. All rights reserved.</span>
          <span>Privacy Policy · Terms of Use · Sitemap</span>
        </div>
      </footer>

    </div>
  );
}
