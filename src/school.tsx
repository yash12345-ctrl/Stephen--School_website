import { useState, useEffect } from 'react';
import './school.css';
import { ProgramMegaMenu } from './program_top';
import { BookOpen, Atom, Compass, Play, Cpu, Sparkles } from 'lucide-react';

export default function School() {
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [heroImageIdx, setHeroImageIdx] = useState(0);

  const heroImages = [
    '/st_stephen_group_1.jpg',
    '/st_stephen_group_2.jpg',
    '/v4.jpeg',
    '/v5.jpeg',
    '/v6.jpg'
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
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

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroImageIdx(prev => (prev + 1) % heroImages.length);
    }, 2700);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  const infraItems = [
    {
      title: 'Assembly Hall',
      desc: 'The Assembly Hall is equipped with modern audio-visual systems, making it a perfect venue for assemblies, events and guest lectures.',
      tag: 'Events & Gatherings',
      icon: <Sparkles size={24} />,
      img: '/v13.png'
    },
    {
      title: 'Playroom',
      desc: 'The playroom, on the other hand, is a safe and stimulating environment for children to engage in physical activities and creative play.',
      tag: 'Enjoy',
      icon: <Play size={24} />,
      img: '/v14.png'
    },
    {
      title: 'Smart Classrooms',
      desc: 'Some classrooms are equiped with Projector for efficient method of teaching.',
      tag: 'Innovative',
      icon: <Cpu size={24} />,
      img: '/v15.png'
    },
    {
      title: 'Computer Lab',
      desc: 'A modern computer lab equipped with updated systems to provide essential digital learning and technical education for all students.',
      tag: 'Advanced',
      icon: <Atom size={24} />,
      img: '/v16.png'
    },
    {
      title: 'School Library',
      desc: 'Library with books for all age groups.',
      tag: 'knowledge',
      icon: <BookOpen size={24} />,
      img: '/v17.png'
    },
    {
      title: 'First-Aid & Support',
      desc: 'First-Aid kit available at school office.',
      tag: 'Care',
      icon: <Compass size={24} />,
      img: '/v18.png'
    }
  ];

  return (
    <div className="school-page">

      {/* ── NAVBAR ── */}
      <nav className={`navbar navbar--school${scrolled ? ' navbar--fixed' : ''}`}>
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
            {(['Home', 'About', 'Programs', 'School', 'News', 'Gallery'] as const).map(l => (
              <li
                key={l}
                onMouseEnter={l === 'Programs' ? () => setMegaMenuOpen(true) : undefined}
                className={l === 'Programs' ? 'has-mega' : ''}
              >
                <a
                  href={l === 'Home' ? '/' : l === 'About' ? '/about' : l === 'News' ? '/news' : l === 'School' ? '/the-school' : l === 'Gallery' ? '/gallery' : `/#${l.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={e => {
                    if (l === 'Programs') {
                      e.preventDefault();
                      setMegaMenuOpen(!megaMenuOpen);
                    } else {
                      setMobileMenuOpen(false);
                    }
                  }}
                  className={[
                    l === 'Programs' ? `nav-dropdown ${megaMenuOpen ? 'active' : ''}` : '',
                    l === 'School' ? 'nav-active' : '',
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
                  <ProgramMegaMenu open={megaMenuOpen} onClose={() => setMegaMenuOpen(false)} />
                )}
              </li>
            ))}
            {/* Mobile-only Donate Button */}
            <li className="mobile-only-nav-apply">
              <a href="/#donate">Donate</a>
            </li>
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
      <section className="sch-hero">
        <div className="sch-hero-glow" />
        <div className="sch-hero-container">
          <div className="sch-hero-content">
            <div className="sch-hero-pill">
              <Sparkles size={14} /> The St. Stephen's Experience
            </div>
            <h1 className="sch-hero-h1">
              Where <em>Legacy</em> Meets<br />Modern Service
            </h1>
            <p className="sch-hero-p">
              Explore a modern NGO secondary school environment in Bowbazar, Kolkata, equipped with interactive clubs and science labs, designed to spread the power of education amongst all.
            </p>
            <div className="sch-hero-btns">
              <a href="#infra" className="sch-btn-gold">Explore Campus</a>
            </div>
          </div>
          <div className="sch-hero-image-wrap">
            <div className="sch-hero-image-frame">
              {heroImages.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`Campus ${i}`}
                  className={i === heroImageIdx ? 'active' : ''}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── INFRASTRUCTURE & CAMPUS LIFE ── */}
      <section className="sch-section" id="infra">
        <div className="sch-container">
          <div className="sch-center-head" style={{ marginBottom: '3rem' }}>
            <span className="sch-chip" style={{ fontSize: '1.1rem', padding: '12px 36px', letterSpacing: '3px' }}>
              School with Top Class Facilities
            </span>
          </div>
          <div className="sch-pipeline-container">
            <div className="sch-pipeline-bus">
              <div className="sch-pipeline-data"></div>
            </div>
            {infraItems.map((item, idx) => (
              <div className={`sch-node-row ${idx % 2 === 0 ? 'left' : 'right'}`} key={idx}>
                <div className="sch-node-dot"></div>
                <div className="sch-node-branch">
                  <div className="sch-branch-packet"></div>
                </div>
                <div className="sch-node-card">
                  <div className="sch-node-img-wrapper">
                    <img src={item.img} alt={item.title} />
                  </div>
                  <div className="sch-node-content">
                    <h3 className="sch-node-title">
                      <span className="sch-node-icon">{item.icon}</span>
                      {item.title}
                    </h3>
                    <p className="sch-node-desc">{item.desc}</p>
                  </div>
                </div>

                {/* Opposite side child holding card */}
                <div className="sch-child-connector"></div>
                <div className="sch-node-child-card">
                  <img src="/child_holding_card.png" alt="Child holding placard" />
                  <span className="sch-child-text">{item.tag}</span>
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
              <img src="/k6.jpg" className="sch-msg-photo" alt="Principal Desk" />
              <div className="sch-msg-frame" />
            </div>
            <div className="sch-msg-body">
              <span className="sch-chip" style={{ width: 'fit-content' }}>From the Principal's Desk</span>
              <div className="sch-msg-quote">
                "We don't just teach curricula; we cultivate an environment where students learn to identify problems, build creative models, and test them with scientific rigor."
              </div>
              <p className="sch-msg-text">
                At St. Stephen's School, education is a pathway to transformation. We combine the  update curriculum with hands-on interactive clubs focusing on sports, art, and social work, ensuring students achieve academic milestones while developing character and collaboration.
              </p>
              <p className="sch-msg-text">
                As you walk through our hallways, you'll see engaged children, creative art projects, and lively club activities. We welcome supporters and families to visit our school and join us in our mission to spread education to all.
              </p>
              <div className="sch-msg-signature">
                <div className="sch-msg-name">Mrs. Sudha Sharma</div>
                <div className="sch-msg-title">Principal, St. Stephen's School</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ADMISSIONS CTA ── */}
      <section className="sch-cta">
        <div className="sch-cta-inner">
          <span className="sch-chip light">Support Us</span>
          <h2 className="sch-section-h2" style={{ color: '#fff', marginBottom: '1.5rem' }}>
            Donate to make a Child’s <span>Future Bright</span>
          </h2>
          <p className="sch-section-p" style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '3rem' }}>
            Admissions for the academic session 2026–27 are open. Connect with us to support our cause, enroll a child, or submit your online application today.
          </p>
          <div className="sch-hero-btns" style={{ justifyContent: 'center' }}>
            <a href="/#donate" className="sch-btn-gold">Donate Now</a>
          </div>
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
              {['Home', 'About', 'Programs', 'School', 'News', 'Gallery'].map(l => (
                <li key={l}>
                  <a href={l === 'Home' ? '/' : l === 'About' ? '/about' : l === 'News' ? '/news' : l === 'School' ? '/the-school' : l === 'Gallery' ? '/gallery' : `/#${l.toLowerCase().replace(/\s+/g, '-')}`}>
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
