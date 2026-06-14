import { useState, useEffect, useRef } from 'react';
import './App.css';
import './educational_day_out.css';
import { ProgramMegaMenu } from './program_top';
import { MapPin, Compass, GraduationCap, Users, Star, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';

export default function EducationalDayOut() {
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Gallery Filter State
  const [activeCategory, setActiveCategory] = useState('all');

  // Quotes Carousel State
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const destinations = [
    {
      title: "Interactive Physics Journey",
      desc: "Students explore hands-on exhibits, demonstrating the laws of motion, optical illusions, and mechanical principles at Science City.",
      category: "science",
      image: "/trip_science.webp",
      tag: "Science City",
      outcome: "Cognitive Inquiry",
      date: "Jan 12, 2026"
    },
    {
      title: "Stargazing at the Planetarium",
      desc: "A majestic journey through our solar system, nebulae, and constellations projected inside the astronomical dome theater.",
      category: "planetarium",
      image: "/trip_planetarium.webp",
      tag: "Birla Planetarium",
      outcome: "Space Sciences",
      date: "Feb 18, 2026"
    },
    {
      title: "Victoria Memorial Exploration",
      desc: "A guided educational tour of Bowbazar's colonial history, architectural heritage, and historical archives.",
      category: "historical",
      image: "/trip_historical.webp",
      tag: "Victoria Memorial",
      outcome: "Heritage Studies",
      date: "Mar 05, 2026"
    },
    {
      title: "Dynamo & Electricity Lab",
      desc: "A thrilling live presentation showcasing Tesla coils, electrostatic charges, and electricity generation basics.",
      category: "science",
      image: "/trip_science.webp",
      tag: "Science City",
      outcome: "Inquiry Lab",
      date: "Jan 12, 2026"
    },
    {
      title: "Galactic Origins Presentation",
      desc: "An interactive presentation about black holes, star lifecycles, and cosmic evolution led by expert astronomers.",
      category: "planetarium",
      image: "/trip_planetarium.webp",
      tag: "Birla Planetarium",
      outcome: "Cosmology Basics",
      date: "Feb 18, 2026"
    },
    {
      title: "Indian Museum Archives",
      desc: "Students study ancient relics, archaeological findings, and natural history galleries, compiling field journals.",
      category: "historical",
      image: "/trip_historical.webp",
      tag: "Indian Museum",
      outcome: "Archaeology",
      date: "Mar 06, 2026"
    }
  ];

  const studentQuotes = [
    {
      quote: "Seeing the Foucault pendulum prove Earth's rotation live at Science City was way better than just looking at a diagram in my physics book!",
      author: "Rohan Sen",
      grade: "Grade 9 Student"
    },
    {
      quote: "Under the planetarium dome, I felt so small yet so connected to the stars. It made me want to study astronomy in college.",
      author: "Mili Das",
      grade: "Grade 8 Student"
    },
    {
      quote: "Writing my history journal while sitting in front of the marble statues at Victoria Memorial made the history lessons feel alive.",
      author: "Anish Roy",
      grade: "Grade 7 Student"
    }
  ];

  const pillars = [
    {
      icon: <Compass size={24} />,
      title: 'Experiential Learning',
      desc: 'Moving curriculum concepts from static textbook diagrams into tactile, real-world interactions.'
    },
    {
      icon: <GraduationCap size={24} />,
      title: 'Curriculum Integration',
      desc: 'Every excursion is directly synchronized with syllabus topics in physics, history, and life sciences.'
    },
    {
      icon: <Users size={24} />,
      title: 'Collaborative Research',
      desc: 'Students work in peer teams to solve scavenger hunt worksheets, building strong collaborative spirit.'
    },
    {
      icon: <Star size={24} />,
      title: 'Inspirational Mentorship',
      desc: 'Guided tours by subject matter experts, scientists, and heritage curators enrich the learning depth.'
    }
  ];

  const handleNextQuote = () => {
    setFade(true);
    setTimeout(() => {
      setCarouselIdx((prev) => (prev + 1) % studentQuotes.length);
      setFade(false);
    }, 400);
  };

  const handlePrevQuote = () => {
    setFade(true);
    setTimeout(() => {
      setCarouselIdx((prev) => (prev - 1 + studentQuotes.length) % studentQuotes.length);
      setFade(false);
    }, 400);
  };

  const filteredDestinations = activeCategory === 'all'
    ? destinations
    : destinations.filter(item => item.category === activeCategory);

  return (
    <div className="trip-page">
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

      {/* ── HERO SECTION ── */}
      <section className="trip-hero">
        <div className="trip-hero-bg" style={{ backgroundImage: "url('/educational_day_out_hero.webp')" }} />
        <div className="trip-hero-glow g1" /><div className="trip-hero-glow g2" />
        <div className="trip-hero-veil" />
        
        <div className="trip-hero-inner">
          <div className="trip-chip">
            <Compass size={14} style={{ marginRight: '6px', verticalAlign: 'middle', display: 'inline-block' }} /> Experiential Learning Journey
          </div>
          <h1 className="trip-hero-h1">
            Educational<span> Day Out</span>
          </h1>
          <p className="trip-hero-sub">
            Bringing academic concepts to life through curated excursions to Science City, astronomical planetariums, and majestic historical monuments across Kolkata.
          </p>

          <div className="trip-hero-meta">
            <div className="trip-meta-item">
              <MapPin size={20} className="trip-meta-icon" />
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div className="trip-meta-label">Destinations</div>
                <div style={{ fontWeight: 700, lineHeight: '1.2' }}>Science City, Planetarium & Heritage Sites, Kolkata</div>
              </div>
            </div>
          </div>

          <div className="trip-hero-btns">
            <a href="#destinations" className="trip-btn-teal">Explore Excursions</a>
            <a href="#impact" className="trip-btn-ghost">Learning Outcomes</a>
          </div>
        </div>
      </section>

      {/* ── DESTINATIONS SECTION ── */}
      <section className="trip-section trip-gallery-section" id="destinations">
        <div className="trip-wrap">
          <div className="text-center" style={{ marginBottom: '3.5rem', textAlign: 'center' }}>
            <div className="trip-chip">Interactive Discovery</div>
            <h2 className="trip-h2">Curated <span>Excursion Gallery</span></h2>
            <p className="trip-lead" style={{ maxWidth: '600px', margin: '0 auto' }}>
              Explore the key sites visited by our students, designed to spark scientific curiosity and historic reverence.
            </p>
          </div>

          {/* Filtering Tabs */}
          <div className="trip-gallery-filters">
            {[
              { id: 'all', label: 'All Destinations' },
              { id: 'science', label: 'Science Exhibits' },
              { id: 'planetarium', label: 'Planetarium Stars' },
              { id: 'historical', label: 'Historical Heritage' }
            ].map(tab => (
              <button
                key={tab.id}
                className={`trip-filter-tab ${activeCategory === tab.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Destinations Grid */}
          <div className="trip-gallery-grid">
            {filteredDestinations.map((item, idx) => (
              <div className="trip-gallery-card" key={idx}>
                <div className="trip-card-img-wrap">
                  <img loading="lazy" src={item.image} alt={item.title} className="trip-card-img" />
                  <div className="trip-card-overlay" />
                  <span className="trip-card-tag">{item.tag}</span>
                </div>
                <div className="trip-card-body">
                  <h3 className="trip-card-title">{item.title}</h3>
                  <p className="trip-card-desc">{item.desc}</p>
                  
                  <div className="trip-card-footer">
                    <div className="trip-card-outcome">
                      <BookOpen size={16} />
                      <span>{item.outcome}</span>
                    </div>
                    <span className="trip-card-date">{item.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EDUCATIONAL OUTCOMES & PILLARS ── */}
      <section className="trip-section trip-highlights-section" id="impact">
        <div className="trip-wrap">
          <div className="text-center" style={{ textAlign: 'center' }}>
            <div className="trip-chip">Our Methodology</div>
            <h2 className="trip-h2">Academic <span>Impact & Outcomes</span></h2>
            <p className="trip-lead" style={{ maxWidth: '650px', margin: '0 auto' }}>
              We transform school days out into powerful accelerators for student intellect, creativity, and community awareness.
            </p>
          </div>

          <div className="trip-highlights-grid">
            {pillars.map((p, i) => (
              <div className="trip-highlight-card" key={i}>
                <div className="trip-highlight-icon-wrap">{p.icon}</div>
                <h3 className="trip-highlight-h">{p.title}</h3>
                <p className="trip-highlight-p">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STUDENT JOURNAL TESTIMONIALS ── */}
      <section className="trip-section trip-carousel-section">
        <div className="trip-wrap">
          <div className="text-center" style={{ textAlign: 'center' }}>
            <div className="trip-chip">Student Journals</div>
            <h2 className="trip-h2">Voices <span>From the Field</span></h2>
            <p className="trip-lead">
              Our students share the memorable moments and discoveries from their travel journals.
            </p>
          </div>

          <div className="trip-carousel-container">
            <div className="trip-carousel-card">
              <div className="trip-quote-icon">“</div>
              <div className={`trip-quote-content ${fade ? 'fade-out' : ''}`}>
                <p className="trip-quote-text">"{studentQuotes[carouselIdx].quote}"</p>
                
                <div className="trip-student-info">
                  <div className="trip-avatar">
                    {studentQuotes[carouselIdx].author.charAt(0)}
                  </div>
                  <div className="trip-meta-info">
                    <h4>{studentQuotes[carouselIdx].author}</h4>
                    <p>{studentQuotes[carouselIdx].grade}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="trip-carousel-controls">
              <button className="trip-ctrl-btn" onClick={handlePrevQuote} aria-label="Previous quote">
                <ChevronLeft size={20} />
              </button>
              <span className="trip-ctrl-indicator">
                {carouselIdx + 1} / {studentQuotes.length}
              </span>
              <button className="trip-ctrl-btn" onClick={handleNextQuote} aria-label="Next quote">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ── */}
      <section className="trip-cta">
        <div className="trip-cta-inner">
          <h2 className="trip-cta-h">Fund a Journey of Exploration</h2>
          <p className="trip-cta-p">
            Many of our children come from disadvantaged backgrounds. Your generous contributions fund transport rentals, museum entry passes, planetarium tickets, and learning materials, ensuring no child is left behind inside the classroom.
          </p>
          <div className="trip-cta-btns">
            <a href="/donate" className="trip-btn-teal">Support Field Trips →</a>
            <a href="/about" className="trip-btn-ghost">Learn About Our Vision</a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer trip-footer">
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
