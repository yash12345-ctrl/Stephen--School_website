import { useState, useEffect, useRef } from 'react';
import './App.css';
import './annual_picnic.css';
import { ProgramMegaMenu } from './program_top';
import { MapPin, Calendar, Star, Compass, Music, Users, Shield, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

export default function AnnualPicnic() {
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Interactive Activity Explorer State
  const [activeTab, setActiveTab] = useState('games');
  const [tabFade, setTabFade] = useState(false);

  // Carousel State
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [carouselFade, setCarouselFade] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activities = {
    games: {
      title: "Friendly Tournaments & Games",
      desc: "From classic tug-of-war and sack races to exciting cricket and badminton matches, the spacious greens of Eco Park turn into a arena of laughter, teamwork, and healthy competition.",
      bullet: "Builds teamwork & confidence",
      image: "/v13.webp"
    },
    magic: {
      title: "Puppet & Magic Show",
      desc: "Middle schoolers and primary children gather around for a spectacular live magic show featuring interactive illusionists, puppet storytelling, and balloon artists that bring sheer amazement.",
      bullet: "Encourages creative imagination",
      image: "/v14.webp"
    },
    feast: {
      title: "Fresh Open-Air Feast",
      desc: "A hot, delicious picnic lunch cooked fresh on-site by our teachers and parent volunteers. Sharing a meal under the warm winter sun forms a key highlight of our community bonding.",
      bullet: "Prepared with love & hygiene",
      image: "/v15.webp"
    },
    music: {
      title: "Music & Jam Sessions",
      desc: "A cozy circle of guitars, dhols, and choir singers. Students perform unplugged patriotic songs, folk tunes, and popular melodies while the entire school joins in chorus.",
      bullet: "Fosters self-expression",
      image: "/v16.webp"
    }
  };

  const studentQuotes = [
    {
      quote: "The picnic is the best day of the year for me. Playing tug-of-war with my teachers and classmates makes me feel like we are one big happy family.",
      author: "Priti Shaw",
      grade: "Grade 8 Student"
    },
    {
      quote: "I loved the live magic show the most! I got to assist the magician on stage. I will never forget how he turned a flower into a banner.",
      author: "Arif Mallick",
      grade: "Grade 5 Student"
    },
    {
      quote: "Sitting in a circle, singing Rabindra Sangeet while playing the guitar under the big trees was beautiful. The fresh food tasted amazing.",
      author: "Deboshri Roy",
      grade: "Grade 9 Student"
    }
  ];

  const highlights = [
    { icon: <Users className="pk-card-icon" size={24} />, title: '500+ Happy Outings', desc: 'Ensuring every child, regardless of socio-economic background, experiences a wonderful day out with peers.', tag: 'Inclusion' },
    { icon: <Compass className="pk-card-icon" size={24} />, title: 'Nature Exploration', desc: 'Guided walks through beautiful lake walkways and butterfly gardens, blending environment studies with recreation.', tag: 'Eco-Learning' },
    { icon: <Music className="pk-card-icon" size={24} />, title: 'School Choir Unplugged', desc: 'Open-air musical performances, student dance circles, and group games that encourage community participation.', tag: 'Recreation' },
    { icon: <Shield className="pk-card-icon" size={24} />, title: 'Safe & Secure Transit', desc: 'Dedicated school-supervised buses, medical first-aid desks, and volunteer marshals ensuring absolute student safety.', tag: 'Security' },
  ];

  const schedule = [
    { time: '08:00 AM', title: 'Assembly & Bus Boarding', desc: 'Students gather at the Bowbazar campus for safety roll-call, followed by boarding of school-chartered buses.' },
    { time: '09:30 AM', title: 'Arrival & Welcome Drinks', desc: 'Arrival at Eco Park, Rajarhat. Light breakfast and fresh fruit juices are served to energize the students.' },
    { time: '10:15 AM', title: 'Outdoor Sports & Activities', desc: 'Simultaneous tracks for house matches (cricket, badminton) and fun athletic games (sack race, spoon race).' },
    { time: '12:30 PM', title: 'Magic & Puppet Show Showcase', desc: 'A collective entertainment hour featuring professional magicians and student puppet plays.' },
    { time: '01:45 PM', title: 'Grand Picnic Lunch', desc: 'A fresh, nutritious feast cooked on-site by staff and parent volunteers, served under shading canopies.' },
    { time: '03:00 PM', title: 'Acoustic Music Circle', desc: 'Jam session, prize distribution for games, and collective group photos.' },
    { time: '04:30 PM', title: 'Departure & Return', desc: 'Buses depart from the park, returning to Bowbazar campus for student handovers.' },
  ];

  const handleTabChange = (tabKey: string) => {
    if (tabKey === activeTab) return;
    setTabFade(true);
    setTimeout(() => {
      setActiveTab(tabKey);
      setTabFade(false);
    }, 300);
  };

  const handleNextQuote = () => {
    setCarouselFade(true);
    setTimeout(() => {
      setCarouselIdx((prev) => (prev + 1) % studentQuotes.length);
      setCarouselFade(false);
    }, 400);
  };

  const handlePrevQuote = () => {
    setCarouselFade(true);
    setTimeout(() => {
      setCarouselIdx((prev) => (prev - 1 + studentQuotes.length) % studentQuotes.length);
      setCarouselFade(false);
    }, 400);
  };

  return (
    <div className="pk-page">
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
      <section className="pk-hero">
        <div className="pk-hero-bg" style={{ backgroundImage: "url('/annual_picnic_hero.webp')" }} />
        <div className="pk-hero-veil" />
        
        <div className="pk-hero-inner">
          <div className="pk-hero-tag">
            <Star size={14} className="gold-star animate-pulse" /> Annual Recreation Outing · St. Stephen's School
          </div>
          <h1 className="pk-hero-h1">
            Annual School<span> Picnic</span>
          </h1>
          <p className="pk-hero-sub">
            A joy-filled day of sunlit outdoor games, puppet theatres, fresh open-air food, and school choir jam sessions at Eco Park, Rajarhat.
          </p>

          <div className="pk-hero-meta">
            <div className="pk-meta-item">
              <Calendar size={20} className="pk-meta-icon" />
              <div>
                <div className="pk-meta-label">Date</div>
                <div style={{ fontWeight: 700 }}>January 15, 2026</div>
              </div>
            </div>
            <div className="pk-meta-item">
              <MapPin size={20} className="pk-meta-icon" />
              <div>
                <div className="pk-meta-label">Venue</div>
                <div style={{ fontWeight: 700 }}>Eco Park, Rajarhat, Kolkata</div>
              </div>
            </div>
          </div>

          <div className="pk-hero-btns">
            <a href="#activities" className="pk-btn-gold">Explore Activities</a>
            <a href="/donate" className="pk-btn-ghost">Sponsor Outings</a>
          </div>
        </div>

        <div className="pk-hero-scroll">
          <span>Scroll</span>
          <div className="pk-hero-scroll-line" />
        </div>
      </section>

      {/* ── ABOUT SECTION ── */}
      <section className="pk-section pk-about" id="about">
        <div className="pk-wrap">
          <div className="pk-about-grid">
            <div className="pk-about-visual">
              <div className="pk-about-collage">
                <img loading="lazy" src="/v17.webp" alt="Happy Picnic Group" className="pk-collage-img-main" />
                <img loading="lazy" src="/v18.webp" alt="Students Playing Tug of War" className="pk-collage-img-sec" />
              </div>
              <div className="pk-about-badge">
                <div className="pk-about-badge-num">🌳</div>
                <div className="pk-about-badge-txt">Eco Outing</div>
              </div>
            </div>
            <div>
              <div className="pk-chip">Outdoor Recreation</div>
              <h2 className="pk-h2">A Breath of Fresh Air & <span>Joy</span></h2>
              <p className="pk-lead">
                For the first-generation learners of St. Stephen's School, the Annual Picnic is a precious escape. It is a day where lessons move outside textbooks into open playgrounds, giving kids memories to cherish all year.
              </p>
              <p className="pk-body">
                Each year, we transport all 500+ students from Bowbazar to scenic locations in Kolkata. We provide transport, food, sports equipment, and entertainment free of charge, ensuring that every child gets to participate and smile.
              </p>
              <div className="pk-about-stats">
                <div className="pk-stat">
                  <span className="pk-stat-num">500+</span>
                  <span className="pk-stat-lbl">Students Joined</span>
                </div>
                <div className="pk-stat">
                  <span className="pk-stat-num">100%</span>
                  <span className="pk-stat-lbl">Free for Children</span>
                </div>
                <div className="pk-stat">
                  <span className="pk-stat-num">Eco</span>
                  <span className="pk-stat-lbl">Park Venue</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── INTERACTIVE EXPLORER SECTION ── */}
      <section className="pk-section pk-interactive" id="activities">
        <div className="pk-wrap">
          <div className="text-center" style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <div className="pk-chip">Picnic Explorer</div>
            <h2 className="pk-h2">Day of <span>Fun & Bonding</span></h2>
            <p className="pk-lead" style={{ maxWidth: '600px', margin: '0 auto' }}>
              Explore the key attractions of our annual picnic day out. Click on the tabs below to read about each detail.
            </p>
          </div>

          <div className="pk-selector-tabs">
            {[
              { id: 'games', label: 'Sports & Games', icon: '⚽' },
              { id: 'magic', label: 'Magic & Puppet Show', icon: '🪄' },
              { id: 'feast', label: 'Picnic Feast', icon: '🍛' },
              { id: 'music', label: 'Music & Carols', icon: '🎸' }
            ].map(tab => (
              <button
                key={tab.id}
                className={`pk-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => handleTabChange(tab.id)}
              >
                <span>{tab.icon}</span> {tab.label}
              </button>
            ))}
          </div>

          <div className="pk-tab-content-panel">
            <div className={`pk-tab-grid ${tabFade ? 'fade-out' : ''}`}>
              <div className="pk-tab-img-wrap">
                <img loading="lazy" src={activities[activeTab as keyof typeof activities].image} alt={activities[activeTab as keyof typeof activities].title} />
              </div>
              <div className="pk-tab-text">
                <h3>{activities[activeTab as keyof typeof activities].title}</h3>
                <p className="pk-tab-desc">{activities[activeTab as keyof typeof activities].desc}</p>
                <div className="pk-tab-bullet">
                  <Sparkles size={16} />
                  <span>{activities[activeTab as keyof typeof activities].bullet}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HIGHLIGHTS SECTION ── */}
      <section className="pk-section pk-highlights">
        <div className="pk-wrap">
          <div className="pk-highlights-head">
            <div className="pk-chip">Event Spotlights</div>
            <h2 className="pk-h2">Why the Picnic <span>Matters</span></h2>
            <p className="pk-lead">
              Our picnic isn't just about amusement — it builds essential social and mental wellbeing.
            </p>
          </div>
          <div className="pk-cards-grid">
            {highlights.map((h, i) => (
              <div className="pk-card" key={i}>
                <div className="pk-card-icon-wrap">{h.icon}</div>
                <h3 className="pk-card-h">{h.title}</h3>
                <p className="pk-card-p">{h.desc}</p>
                <span className="pk-card-tag">{h.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SCHEDULE SECTION ── */}
      <section className="pk-section pk-schedule">
        <div className="pk-wrap">
          <div className="pk-highlights-head">
            <div className="pk-chip">Timeline</div>
            <h2 className="pk-h2">Outing <span>Schedule</span></h2>
            <p className="pk-lead">
              An overview of the schedule for our picnic day at Eco Park.
            </p>
          </div>
          <div className="pk-timeline">
            {schedule.map((s, i) => (
              <div className={`pk-timeline-item`} key={i}>
                <div className="pk-time-col">{s.time}</div>
                <div className="pk-dot-col">
                  <div className="pk-timeline-dot"><Star size={12} className="text-[#ffd700]" /></div>
                </div>
                <div className="pk-content-col">
                  <h4 className="pk-timeline-title">{s.title}</h4>
                  <p className="pk-timeline-desc">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STUDENT TESTIMONIAL CAROUSEL ── */}
      <section className="pk-carousel-section">
        <div className="pk-wrap">
          <div className="text-center" style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <div className="pk-chip">Student Diaries</div>
            <h2 className="pk-h2">Voices <span>from the Green</span></h2>
            <p className="pk-lead">
              Hear what our young creators and scholars felt about their annual picnic day out.
            </p>
          </div>

          <div className="pk-carousel-container">
            <div className="pk-carousel-card">
              <div className="pk-quote-icon">“</div>
              <div className={`pk-quote-content ${carouselFade ? 'fade-out' : ''}`}>
                <p className="pk-quote-text">"{studentQuotes[carouselIdx].quote}"</p>
                
                <div className="pk-student-info">
                  <div className="pk-avatar">
                    {studentQuotes[carouselIdx].author.charAt(0)}
                  </div>
                  <div className="pk-meta-info">
                    <h4>{studentQuotes[carouselIdx].author}</h4>
                    <p>{studentQuotes[carouselIdx].grade}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pk-carousel-controls">
              <button className="pk-ctrl-btn" onClick={handlePrevQuote} aria-label="Previous quote">
                <ChevronLeft size={20} />
              </button>
              <span className="pk-ctrl-indicator">
                {carouselIdx + 1} / {studentQuotes.length}
              </span>
              <button className="pk-ctrl-btn" onClick={handleNextQuote} aria-label="Next quote">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ── */}
      <section className="pk-cta">
        <div className="pk-cta-inner">
          <h2 className="pk-cta-h">Fund a Day of Outdoor Wonder & Smiles</h2>
          <p className="pk-cta-p">
            Sponsor travel bus rentals, picnic meals, activity items, and special snacks for our school children. Your support ensures we can continue this annual tradition of joy and social bonding for underprivileged learners.
          </p>
          <div className="pk-cta-btns">
            <a href="/donate" className="pk-btn-gold">Sponsor a Child's Picnic →</a>
            <a href="/about" className="pk-btn-ghost">Learn About St. Stephen's</a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer pk-footer">
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
