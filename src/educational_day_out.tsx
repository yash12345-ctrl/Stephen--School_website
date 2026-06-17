import { useState, useEffect, useRef } from 'react';
import './App.css';
import './educational_day_out.css';
import { ProgramMegaMenu } from './program_top';
import { MapPin, Compass, GraduationCap, Users, Star, ChevronLeft, ChevronRight, BookOpen, Route } from 'lucide-react';
import { motion } from 'framer-motion';

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
      title: "A Visit to the Birla Planetarium",
      desc: "Our students visited The Birla Planetarium on 27th August, 2022. The Birla Planetarium is an iconic institution that offers interactive learning experiences on astronomy and space science.",
      category: "excursion",
      image: "/y1.png",
      image2: "/y2.png",
      tag: "Birla Planetarium",
      outcome: "Space Sciences",
      date: "Aug 27, 2022"
    },
    {
      title: "A Trip to the Indian Museum",
      desc: "Our students visited The Indian Museum on 23rd July. This offered a glimpse into the rich cultural heritage and scientific advancements of India.",
      category: "excursion",
      image: "/y3.png",
      image2: "/y4.png",
      tag: "Indian Museum",
      outcome: "Heritage Studies",
      date: "Jul 23"
    },
    {
      title: "Workshops by Interns",
      desc: "The workshops conducted on career counselling, the importance of reading books and techniques to improve public speaking skills by students of St. Xavier's College led by Aalap Roy, Riddhiraj Mukherjee and Samad Zahid.",
      category: "workshop",
      image: "/y5.png",
      image2: "/y6.png",
      tag: "St. Xavier's Interns",
      outcome: "Skill Development",
      date: "Recent"
    },
    {
      title: "Workshops at La Martiniere for Girls",
      desc: "St Stephen's students were blessed to experience the workshop held at La Martiniere for girls which was filled with fun activities.",
      category: "workshop",
      image: "/y7.png",
      image2: "/y8.png",
      tag: "La Martiniere",
      outcome: "Collaborative Learning",
      date: "Recent"
    },
    {
      title: "Workshop by YES Organisation",
      desc: "A 2 day workshop conducted by Your English Studio with the children from Class 3-6, emphasizing on English language and its use.",
      category: "workshop",
      image: "/y9.png",
      image2: "/y10.png",
      tag: "YES Organisation",
      outcome: "Language Skills",
      date: "Recent"
    },
    {
      title: "Table Manners Session",
      desc: "The table manners session conducted by Mr. Ajoy Paul proved to be a transformative experience for the students, equipping them with essential life skills and empowering them to excel in any social or professional setting.",
      category: "workshop",
      image: "/y11.png",
      image2: "/y11.png",
      tag: "Life Skills",
      outcome: "Social Etiquette",
      date: "Recent"
    },
    {
      title: "Summer Camp",
      desc: "Summer Camp organised for students of Class IV from 19th to 21st May by Mr. Ajoy Paul.",
      category: "workshop",
      image: "/y12.png",
      image2: "/y13.png",
      tag: "Class IV",
      outcome: "Skill Building",
      date: "May 19-21"
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
    ? destinations.filter(item => item.title !== "Summer Camp")
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

      {/* ── HERO SECTION ── */}
      <section className="trip-hero">
        <div className="trip-hero-bg" style={{ backgroundImage: "url('/educational_day_out_hero.webp')" }} />
        <div className="trip-hero-veil" />
        <Route className="trip-float-icon" style={{ top: '10%', left: '40%', width: 300, height: 300, animationDelay: '0s' }} />
        <Compass className="trip-float-icon" style={{ top: '15%', left: '10%', width: 120, height: 120, animationDelay: '1s' }} />
        <MapPin className="trip-float-icon" style={{ top: '60%', right: '8%', width: 150, height: 150, animationDelay: '2s' }} />
        <BookOpen className="trip-float-icon" style={{ bottom: '10%', left: '20%', width: 100, height: 100, animationDelay: '3s' }} />
        <GraduationCap className="trip-float-icon" style={{ top: '25%', right: '25%', width: 80, height: 80, animationDelay: '4s' }} />

        <div className="trip-hero-inner">
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}
            className="trip-chip"
          >
            <Compass size={14} style={{ marginRight: '6px', verticalAlign: 'middle', display: 'inline-block' }} /> Experiential Learning Journey
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="trip-hero-h1" style={{ maxWidth: '900px' }}
          >
            Educational<br /><span>Day Out</span>
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="trip-hero-sub"
          >
            Bringing academic concepts to life through curated excursions to Science City, astronomical planetariums, and majestic historical monuments across Kolkata.
          </motion.p>

          <motion.div
            initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5, delay: 0.3 }}
            className="trip-hero-meta"
          >
            <div className="trip-meta-item">
              <MapPin size={20} className="trip-meta-icon" />
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div className="trip-meta-label">Destinations</div>
                <div style={{ fontWeight: 700, lineHeight: '1.2' }}>Science City, Planetarium & Heritage Sites, Kolkata</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }}
            className="trip-hero-btns"
          >
            <a href="#destinations" className="trip-btn-teal">Explore Excursions</a>
            <a href="#impact" className="trip-btn-ghost">Learning Outcomes</a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1 }}
          className="trip-scroll-cue"
        >
          Scroll to Explore <span>↓</span>
        </motion.div>
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
              { id: 'all', label: 'All Activities' },
              { id: 'excursion', label: 'Excursions' },
              { id: 'workshop', label: 'Workshops' }
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
                  <div className="trip-card-img-container">
                    <img loading="lazy" src={item.image} alt={item.title} className="trip-card-img trip-card-img-1" style={{ animationDelay: `${idx * 0.8}s` }} />
                    <img loading="lazy" src={item.image2} alt={`${item.title} alternate`} className="trip-card-img trip-card-img-2" style={{ animationDelay: `${idx * 0.8}s` }} />
                  </div>
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
