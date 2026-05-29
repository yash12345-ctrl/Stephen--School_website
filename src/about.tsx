import React, { useState, useEffect } from 'react';
import './about.css';
import { ProgramMegaMenu } from './program_top';
import { GraduationCap, Award, Target, Telescope, Gem, Globe, Lightbulb, Building2, Handshake, BarChart, Play } from 'lucide-react';

const AnimatedBoxContent = ({ contents }: { contents: string[] }) => {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (contents.length <= 1) return;
    const interval = setInterval(() => {
      setIdx(prev => (prev + 1) % contents.length);
    }, 6000); // 6s allows time to read the slower typewriter effect
    return () => clearInterval(interval);
  }, [contents]);

  if (contents.length === 1) return <p className="abt-mvv-text">{contents[0]}</p>;

  return (
    <div className="abt-mvv-slider-wrap">
      <div className="abt-mvv-text-slider">
        {contents.map((c, i) => {
          const words = c.split(' ');
          return (
            <p key={i} className={`abt-mvv-text abt-mvv-slide ${i === idx ? 'active' : ''}`}>
              {words.map((word, wIdx) => (
                <span
                  key={wIdx}
                  className="word-reveal"
                  style={{ animationDelay: i === idx ? `${wIdx * 0.1}s` : '0s' }}
                >
                  {word}{' '}
                </span>
              ))}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default function About() {
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="abt-page">

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
            {['Home', 'About', 'Programs', 'School', 'News', 'Contact'].map(l => (
              <li
                key={l}
                onMouseEnter={l === 'Programs' ? () => setMegaMenuOpen(true) : undefined}
                onMouseLeave={l === 'Programs' ? () => setMegaMenuOpen(false) : undefined}
                className={l === 'Programs' ? 'has-mega' : ''}
              >
                <a
                  href={
                    l === 'Home'  ? '/' :
                    l === 'About' ? '/about' :
                    l === 'News'  ? '/news' :
                    l === 'School'? '/the-school' :
                    `/#${l.toLowerCase().replace(/\s+/g, '-')}`
                  }
                  onClick={(e) => {
                    if (l === 'Programs') {
                      e.preventDefault();
                      setMegaMenuOpen(!megaMenuOpen);
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
          </ul>
          <a href="/#contact" className="nav-cta">Apply Now →</a>
        </div>
      </nav>

      {/* ── SPLIT HERO ── */}
      <section className="abt-hero">
        <div className="abt-hero-left">
          <span className="abt-hero-label">About Greenfield Academy</span>
          <h1 className="abt-hero-h1">Where Every Child's <span className="abt-accent">Potential</span> Becomes Reality</h1>
          <p className="abt-hero-p">For over four decades, we've been shaping leaders, thinkers, and change-makers. Welcome to a place where education meets purpose.</p>
          <div className="abt-hero-counters">
            {[
              { num: '40+', label: 'Years' },
              { num: '50K+', label: 'Alumni' },
              { num: '3,200', label: 'Students' },
              { num: '150+', label: 'Faculty' },
            ].map((c, i) => (
              <div className="abt-counter" key={i}>
                <span className="abt-counter-num">{c.num}</span>
                <span className="abt-counter-label">{c.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="abt-hero-right">
          <div className="abt-hero-img-stack">
            <img src="/about_library.png" alt="Library" className="abt-hero-img1" />
            <img src="/about_lab.png" alt="Lab" className="abt-hero-img2" />
            <div className="abt-hero-float-card">
              <span className="abt-float-emoji"><Award size={28} /></span>
              <span className="abt-float-text">National Best<br />School Award</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── QUOTE BANNER ── */}
      <div className="abt-quote-banner">
        <div className="abt-quote-inner">
          <span className="abt-quote-mark">❝</span>
          <blockquote className="abt-quote-text">Education is not the filling of a pail, but the lighting of a fire. At Greenfield, we light that fire every single day.</blockquote>
          <cite className="abt-quote-cite">— Dr. Ramesh Agarwal, Founder</cite>
        </div>
      </div>

      {/* ── OUR STORY (editorial style) ── */}
      <section className="abt-section">
        <div className="abt-wrap">
          <div className="abt-editorial">
            <div className="abt-editorial-images">
              <img src="/about_campus.png" alt="Campus Aerial" className="abt-editorial-img-main" />
              <img src="/about_lab.png" alt="Science Lab" className="abt-editorial-img-sec" />
            </div>
            <div className="abt-editorial-content">
              <h2 className="abt-section-h2">From <span className="abt-accent">120 Students</span> to a National Institution</h2>
              <div className="abt-editorial-text">
                <p className="abt-text-lg">Founded in 1985 by Dr. Ramesh Agarwal with a bold vision — that every child, regardless of background, deserves access to world-class education that nurtures both mind and character.</p>
                <p className="abt-text">What began as a modest school with 120 students and 8 passionate teachers has grown into one of India's most respected educational institutions, serving over 3,200 students across a stunning 25-acre campus.</p>
                <p className="abt-text">Our alumni network of 50,000+ strong spans the globe — leading in science, technology, arts, governance, medicine, and public service. From IIT toppers to Oxford scholars, from entrepreneurs to civil servants, Greenfield graduates carry forward a tradition of excellence.</p>
                <p className="abt-text">What hasn't changed in four decades is our founding promise: <strong>every child deserves an education that nurtures not just the intellect, but the heart and character.</strong></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MISSION / VISION / VALUES — Premium Cards ── */}
      <section className="abt-section abt-mvv-bg">
        <div className="abt-mvv-blob1" />
        <div className="abt-mvv-blob2" />
        <div className="abt-wrap" style={{ position: 'relative', zIndex: 2 }}>
          <div className="abt-center-head">
            <span className="abt-chip">What Drives Us</span>
            <h2 className="abt-section-h2">Mission, Vision & <span className="abt-accent">Core Values</span></h2>
          </div>
          <div className="abt-mvv-grid">
            {[
              {
                icon: <Target size={36} />, title: 'Our Mission', color1: '#11998e', color2: '#38ef7d', shadow: 'rgba(17,153,142,0.25)', light: 'rgba(17,153,142,0.1)', texts: [
                  'To provide a world-class, inclusive education that empowers every student to achieve academic excellence, develop strong character, and become a responsible global citizen.',
                  'To build a collaborative community where diversity is celebrated, creativity is nurtured, and every voice is heard and valued across all disciplines.',
                  'To instill a lifelong love for learning, equipping our students with the critical skills to adapt, innovate, and thrive in an ever-changing dynamic world.'
                ]
              },
              {
                icon: <Telescope size={36} />, title: 'Our Vision', color1: '#4776e6', color2: '#8e54e9', shadow: 'rgba(71,118,230,0.25)', light: 'rgba(71,118,230,0.1)', texts: [
                  'To be recognized as India\'s leading institution for holistic education — where innovation meets tradition, and every learner is inspired to reach their highest potential.',
                  'To continuously push the boundaries of modern pedagogy, integrating cutting-edge technology and experiential learning into our core curriculum.',
                  'To nurture a vibrant, inclusive community that honors diverse perspectives and prepares students to become compassionate, ethical leaders.'
                ]
              },
              {
                icon: <Gem size={36} />, title: 'Our Values', color1: '#C9A84C', color2: '#F0C96B', shadow: 'rgba(201,168,76,0.25)', light: 'rgba(201,168,76,0.1)', texts: [
                  'Integrity, Excellence, Compassion, Innovation, and Inclusivity. These five pillars guide everything we do — from classroom instruction to community engagement and beyond.',
                  'Resilience, Respect, Empathy, Curiosity, and Accountability. We believe in fostering an environment where mistakes are stepping stones to success.',
                  'Sustainability, Global Citizenship, Creativity, Teamwork, and Lifelong Learning. We are committed to developing students who positively impact their communities.'
                ]
              },
            ].map((m, i) => (
              <div className="abt-mvv-card" key={i} style={{
                '--mvv-gradient': `linear-gradient(135deg, ${m.color1}, ${m.color2})`,
                '--mvv-shadow': m.shadow,
                '--mvv-light': m.light
              } as React.CSSProperties}>
                <div className="abt-mvv-icon-wrap">{m.icon}</div>
                <h3 className="abt-mvv-title">{m.title}</h3>
                <AnimatedBoxContent contents={m.texts} />
                <div className="abt-mvv-watermark">{m.icon}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY GREENFIELD — bento grid ── */}
      <section className="abt-section">
        <div className="abt-wrap">
          <div className="abt-center-head">
            <span className="abt-chip">Why Greenfield</span>
            <h2 className="abt-section-h2">What Sets Us <span className="abt-accent">Apart</span></h2>
            <p className="abt-subdesc">A commitment to excellence that goes far beyond textbooks.</p>
          </div>
          <div className="abt-section-3d-wrapper">
            <div className="abt-bento-3d-scene">
              <div className="abt-bento-carousel">
                {[
                  {
                    icon: <Award size={32} />, title: 'Award-Winning Faculty',
                    desc: '150+ nationally recognized educators with advanced degrees from IITs, IIMs, and global universities, undergoing continuous professional development.',
                    colors: { bg: 'rgba(201,168,76,0.12)', color: '#C9A84C', shadow: 'rgba(201,168,76,0.25)', grad: 'radial-gradient(circle at right, rgba(201,168,76,0.08), transparent 60%)' }
                  },
                  {
                    icon: <Globe size={32} />, title: 'Global Curriculum',
                    desc: 'Internationally aligned with CBSE and IB frameworks, blending Indian academic tradition with global standards.',
                    colors: { bg: 'rgba(71,118,230,0.12)', color: '#4776e6', shadow: 'rgba(71,118,230,0.25)', grad: 'radial-gradient(circle at right, rgba(71,118,230,0.08), transparent 60%)' }
                  },
                  {
                    icon: <Lightbulb size={32} />, title: 'Innovation-Driven',
                    desc: 'AI labs, maker spaces, and a Tech Hub for robotics, coding, and design thinking from Grade 5 onward.',
                    colors: { bg: 'rgba(255,152,0,0.12)', color: '#FF9800', shadow: 'rgba(255,152,0,0.25)', grad: 'radial-gradient(circle at right, rgba(255,152,0,0.08), transparent 60%)' }
                  },
                  {
                    icon: <Building2 size={32} />, title: 'World-Class Campus',
                    desc: '25-acre campus with 12+ sports grounds, Olympic pool, 3 auditoriums, and smart classrooms.',
                    colors: { bg: 'rgba(76,175,80,0.12)', color: '#4CAF50', shadow: 'rgba(76,175,80,0.25)', grad: 'radial-gradient(circle at right, rgba(76,175,80,0.08), transparent 60%)' }
                  },
                  {
                    icon: <Handshake size={32} />, title: 'Character & Leadership',
                    desc: 'Dedicated programs for community service, public speaking, student governance, and emotional intelligence.',
                    colors: { bg: 'rgba(156,39,176,0.12)', color: '#9C27B0', shadow: 'rgba(156,39,176,0.25)', grad: 'radial-gradient(circle at right, rgba(156,39,176,0.08), transparent 60%)' }
                  },
                  {
                    icon: <BarChart size={32} />, title: 'Proven Results',
                    desc: '98% pass rate, 96% distinction. Graduates placed at IITs, AIIMS, MIT, Stanford, and Oxford.',
                    colors: { bg: 'rgba(33,150,243,0.12)', color: '#2196F3', shadow: 'rgba(33,150,243,0.25)', grad: 'radial-gradient(circle at right, rgba(33,150,243,0.08), transparent 60%)' }
                  },
                ].map((p, i) => (
                  <div
                    className="abt-bento-card-3d"
                    key={i}
                    style={{
                      '--card-grad': p.colors.grad,
                      '--card-shadow': p.colors.shadow,
                      '--icon-bg': p.colors.bg,
                      '--icon-color': p.colors.color,
                      '--i': i
                    } as React.CSSProperties}
                  >
                    <div className="abt-bento-icon-wrap">{p.icon}</div>
                    <div className="abt-bento-content">
                      <h3 className="abt-bento-h">{p.title}</h3>
                      <p className="abt-bento-p">{p.desc}</p>
                    </div>
                    <div className="abt-bento-watermark">{p.icon}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VERTICAL TIMELINE ── */}
      <section className="abt-section abt-tl-bg">
        <div className="abt-wrap">
          <div className="abt-center-head">
            <span className="abt-chip light">Our Journey</span>
            <h2 className="abt-section-h2 white">Key <span className="abt-accent">Milestones</span></h2>
          </div>
          <div className="abt-vertical-tl">
            {[
              { year: '1985', title: 'Founded', desc: 'Greenfield Academy opens with 120 students and a vision of educational excellence.' },
              { year: '1995', title: 'CBSE Affiliation', desc: 'Full CBSE affiliation received, expanded to senior secondary (Grades 11–12).' },
              { year: '2005', title: 'New Campus', desc: 'Moved to our current 25-acre campus with world-class sports and science facilities.' },
              { year: '2012', title: 'IB World School', desc: 'Authorized as an IB World School, offering the International Baccalaureate Diploma.' },
              { year: '2018', title: 'National Award', desc: 'Recognized among India\'s Top 10 schools by the National Education Council.' },
              { year: '2024', title: 'AI Innovation Hub', desc: 'Launched India\'s first school-level AI Hub with Google and Microsoft partnerships.' },
            ].map((m, i) => (
              <div className={`abt-tl-row ${i % 2 !== 0 ? 'abt-tl-alt' : ''}`} key={i}>
                <div className="abt-tl-side">{m.year}</div>
                <div className="abt-tl-dot-wrap"><div className="abt-tl-dot" /></div>
                <div className="abt-tl-content">
                  <h4 className="abt-tl-h">{m.title}</h4>
                  <p className="abt-tl-p">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LEADERSHIP ── */}
      <section className="abt-section">
        <div className="abt-wrap">
          <div className="abt-center-head">
            <span className="abt-chip">Leadership</span>
            <h2 className="abt-section-h2">Meet Our <span className="abt-accent">Leaders</span></h2>
          </div>
          <div className="abt-leaders">
            {[
              { name: 'Dr. Ramesh Agarwal', role: 'Founder & Chairman', initial: 'R', color: '#C9A84C', desc: 'Visionary educationist with 45+ years of experience in building institutions of national repute.' },
              { name: 'Mrs. Kavita Sharma', role: 'Principal', initial: 'K', color: '#4776e6', desc: 'Award-winning educator and former IIT professor with a passion for innovative pedagogy.' },
              { name: 'Dr. Arjun Reddy', role: 'Academic Director', initial: 'A', color: '#11998e', desc: 'Oxford alumnus leading curriculum design, faculty training, and global partnerships.' },
              { name: 'Ms. Priya Menon', role: 'Head of Student Affairs', initial: 'P', color: '#8E2DE2', desc: 'Champion of student well-being, co-curricular excellence, and community engagement.' },
            ].map((l, i) => (
              <div className="abt-leader" key={i}>
                <div className="abt-leader-av" style={{ background: `linear-gradient(135deg, ${l.color}, ${l.color}66)` }}>{l.initial}</div>
                <div className="abt-leader-info">
                  <h4 className="abt-leader-name">{l.name}</h4>
                  <span className="abt-leader-role">{l.role}</span>
                  <p className="abt-leader-desc">{l.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="abt-cta">
        <div className="abt-cta-inner">
          <span className="abt-chip light">Join Us</span>
          <h2 className="abt-cta-h">Ready to Be Part of the <span className="abt-accent">Greenfield Family</span>?</h2>
          <p className="abt-cta-p">Schedule a visit, speak with our team, or apply online today.</p>
          <div className="abt-cta-btns">
            <a href="/#contact" className="btn-gold large">Apply for Admission</a>
            <a href="/the-school" className="btn-ghost large" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>Virtual Tour <Play size={18} /></a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo"><span className="logo-crest"><GraduationCap size={32} /></span><div><div className="logo-name">Greenfield</div><div className="logo-tagline">ACADEMY</div></div></div>
            <p>Nurturing young minds and shaping tomorrow's leaders since 1985.</p>
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
          <span>© 2026 Greenfield Academy. All rights reserved.</span>
          <span>Privacy Policy · Terms of Use · Sitemap</span>
        </div>
      </footer>
    </div>
  );
}
