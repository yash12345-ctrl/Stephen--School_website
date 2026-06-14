import { useState, useEffect, useRef } from 'react';
import './App.css';
import './art_craft.css';
import { ProgramMegaMenu } from './program_top';
import { Palette, Scissors, MapPin, Sparkles, Star, ChevronLeft, ChevronRight, Award } from 'lucide-react';

export default function ArtCraftExhibition() {
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Gallery Filtering State
  const [activeCategory, setActiveCategory] = useState('all');

  // Spotlight Carousel State
  const [spotlightIdx, setSpotlightIdx] = useState(0);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const galleryItems = [
    {
      title: "Hues of Bowbazar",
      desc: "A stunning watercolor painting depicting the lively streets, vintage trams, and heritage architecture of Kolkata under a warm golden sunset.",
      category: "paintings",
      image: "/art_painting.png",
      artist: "Rahul Das",
      grade: "Grade 9",
      tag: "Watercolor"
    },
    {
      title: "Majestic Clay Trunk",
      desc: "A beautifully molded and hand-painted clay elephant showcasing intricate traditional patterns and vibrant decorative ornaments.",
      category: "sculptures",
      image: "/art_sculpture.png",
      artist: "Sneha Sen",
      grade: "Grade 7",
      tag: "Clay Modeling"
    },
    {
      title: "Eco Windmill Model",
      desc: "An innovative, fully operational toy windmill crafted entirely from recycled newspapers, discarded plastics, and ice cream sticks.",
      category: "crafts",
      image: "/art_recycled.png",
      artist: "Ayan Roy",
      grade: "Grade 8",
      tag: "Recycled Art"
    },
    {
      title: "Ganges in Springtime",
      desc: "A rich acrylic on canvas masterpiece displaying country boats sailing on the Ganges River with vibrant spring blossoms along the banks.",
      category: "paintings",
      image: "/art_painting.png",
      artist: "Pooja Gupta",
      grade: "Grade 10",
      tag: "Acrylic"
    },
    {
      title: "Guardian of the Jungle",
      desc: "A stylized clay sculpture representing a roaring Bengal Tiger, glazed with organic colors made from flowers and leaves.",
      category: "sculptures",
      image: "/art_sculpture.png",
      artist: "Vikram Malhotra",
      grade: "Grade 6",
      tag: "Glazed Terracotta"
    },
    {
      title: "Cardboard Castle Estate",
      desc: "A highly detailed fantasy castle featuring towers, drawbridges, and outer walls constructed from waste shipping cartons.",
      category: "crafts",
      image: "/art_recycled.png",
      artist: "Ananya Bose",
      grade: "Grade 5",
      tag: "Cardboard Craft"
    }
  ];

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
      desc: 'Watch and try your hand at the traditional potter\'s wheel under the expert guidance of local traditional clay artisans.'
    },
    {
      icon: <Scissors size={24} />,
      title: 'Eco-Craft Station',
      desc: 'A dedicated creative zone where visitors learn to design beautiful flower vases and pen stands using domestic waste.'
    },
    {
      icon: <Sparkles size={24} />,
      title: 'Collaborative Wall Canvas',
      desc: 'All students, parents, and guests are invited to leave their unique handprint brushstrokes on a giant community canvas.'
    },
    {
      icon: <Award size={24} />,
      title: 'Young Artist Awards',
      desc: 'Outstanding achievements in creativity and environmental message-driven art will be awarded by the local Academy of Fine Arts.'
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

  const filteredItems = activeCategory === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

  return (
    <div className="art-page">
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
        <div className="art-hero-bg" style={{ backgroundImage: "url('/art_exhibition_hero.png')" }} />
        <div className="art-hero-glow g1" /><div className="art-hero-glow g2" />
        <div className="art-hero-veil" />
        
        <div className="art-hero-inner">
          <div className="art-hero-tag">
            <Star size={14} className="art-meta-icon animate-pulse" /> Creative Celebration · St. Stephen's School
          </div>
          <h1 className="art-hero-h1">
            Art & Craft<span> Exhibition</span>
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
            <a href="#gallery" className="art-btn-gold">Explore Student Gallery</a>
            <a href="#highlights" className="art-btn-ghost">Event Highlights</a>
          </div>
        </div>
      </section>

      {/* ── GALLERY SECTION ── */}
      <section className="art-section art-gallery-section" id="gallery">
        <div className="art-wrap">
          <div className="text-center" style={{ marginBottom: '3.5rem' }}>
            <div className="art-chip">Student Showcases</div>
            <h2 className="art-h2">Exhibition <span>Gallery</span></h2>
            <p className="art-lead" style={{ maxWidth: '600px', margin: '0 auto' }}>
              Filter through our showcase categories to appreciate the dedication and imagination of our student artists.
            </p>
          </div>

          {/* Filtering Tabs */}
          <div className="art-gallery-filters">
            {[
              { id: 'all', label: 'All Works' },
              { id: 'paintings', label: 'Paintings' },
              { id: 'sculptures', label: 'Clay Sculptures' },
              { id: 'crafts', label: 'Recycled Crafts' }
            ].map(tab => (
              <button
                key={tab.id}
                className={`filter-tab ${activeCategory === tab.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="art-gallery-grid">
            {filteredItems.map((item, idx) => (
              <div className="art-gallery-card" key={idx}>
                <div className="art-card-img-wrap">
                  <img src={item.image} alt={item.title} className="art-card-img" />
                  <div className="art-card-overlay" />
                  <span className="art-card-tag">{item.tag}</span>
                </div>
                <div className="art-card-body">
                  <h3 className="art-card-title">{item.title}</h3>
                  <p className="art-card-desc">{item.desc}</p>
                  
                  <div className="art-card-footer">
                    <div className="art-card-artist">
                      <div className="artist-avatar">{item.artist.charAt(0)}</div>
                      <span className="artist-name">{item.artist}</span>
                    </div>
                    <span className="art-card-grade">{item.grade}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HONORED VISITORS SECTION ── */}
      <section className="art-section art-dignitary-section">
        <div className="art-wrap">
          <div className="art-dignitary-grid">
            <div className="art-dignitary-visual" style={{ position: 'relative' }}>
              <div className="art-dignitary-visual-wrapper">
                <img src="/v11.png" alt="Consul General of Japan Visit" />
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
      <section className="art-section art-highlights-section" id="highlights">
        <div className="art-wrap">
          <div className="text-center">
            <div className="art-chip">Special Attractions</div>
            <h2 className="art-h2">Interactive <span>Showcases & Zones</span></h2>
            <p className="art-lead" style={{ maxWidth: '650px', margin: '0 auto' }}>
              Explore the hands-on workshops and unique exhibits designed to engage visitors in the joy of creating.
            </p>
          </div>

          <div className="art-highlights-grid">
            {highlights.map((h, i) => (
              <div className="art-highlight-card" key={i}>
                <div className="art-highlight-icon-wrap">{h.icon}</div>
                <h3 className="art-highlight-h">{h.title}</h3>
                <p className="art-highlight-p">{h.desc}</p>
              </div>
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

      {/* ── CTA SECTION ── */}
      <section className="art-cta">
        <div className="art-cta-inner">
          <h2 className="art-cta-h">Foster Creative Growth & Art Education</h2>
          <p className="art-cta-p">
            Many of our talented student creators are first-generation learners. Your kind contributions help fund paints, brushes, canvas boards, clay modeling kits, and craft tools, keeping their creative flame burning bright.
          </p>
          <div className="art-cta-btns">
            <a href="/donate" className="art-btn-gold">Support Our Art Fund →</a>
            <a href="/about" className="art-btn-ghost">Learn About St. Stephen's</a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer art-footer">
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
