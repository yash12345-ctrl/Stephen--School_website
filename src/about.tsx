import './about.css';

export default function About() {
  return (
    <div className="abt-page">

      {/* ── NAVBAR ── */}
      <nav className="abt-navbar">
        <div className="abt-nav-inner">
          <a href="/" className="nav-logo">
            <span className="logo-crest">🎓</span>
            <div>
              <div className="logo-name" style={{color:'var(--navy)'}}>Greenfield</div>
              <div className="logo-tagline">ACADEMY</div>
            </div>
          </a>
          <ul className="abt-nav-links">
            {['Home','About','Programs','Campus','News','Contact'].map(l => (
              <li key={l}>
                <a 
                  href={l === 'Home' ? '/' : l === 'About' ? '/about' : `/#${l.toLowerCase()}`}
                  className={l === 'About' ? 'abt-active' : ''}
                >
                  {l}
                </a>
              </li>
            ))}
          </ul>
          <a href="/#contact" className="abt-nav-cta">Apply Now →</a>
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
              <span className="abt-float-emoji">🏅</span>
              <span className="abt-float-text">National Best<br/>School Award</span>
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

      {/* ── MISSION / VISION / VALUES — horizontal cards ── */}
      <section className="abt-section abt-mvv-bg">
        <div className="abt-wrap">
          <div className="abt-center-head">
            <span className="abt-chip">What Drives Us</span>
            <h2 className="abt-section-h2">Mission, Vision & <span className="abt-accent">Core Values</span></h2>
          </div>
          <div className="abt-mvv-stack">
            {[
              { icon: '🎯', title: 'Our Mission', color: '#11998e', text: 'To provide a world-class, inclusive education that empowers every student to achieve academic excellence, develop strong character, and become a responsible global citizen prepared for tomorrow\'s challenges.' },
              { icon: '🔭', title: 'Our Vision', color: '#4776e6', text: 'To be recognized as India\'s leading institution for holistic education — where innovation meets tradition, and every learner is inspired to reach their highest potential and make a meaningful impact.' },
              { icon: '💎', title: 'Our Values', color: '#C9A84C', text: 'Integrity, Excellence, Compassion, Innovation, and Inclusivity. These five pillars guide everything we do — from classroom instruction to community engagement and beyond.' },
            ].map((m, i) => (
              <div className="abt-mvv-row" key={i} style={{ '--mvv-color': m.color } as React.CSSProperties}>
                <div className="abt-mvv-left">
                  <span className="abt-mvv-icon">{m.icon}</span>
                  <h3 className="abt-mvv-title">{m.title}</h3>
                </div>
                <p className="abt-mvv-text">{m.text}</p>
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
          <div className="abt-bento">
            {[
              { icon: '🏅', title: 'Award-Winning Faculty', desc: '150+ nationally recognized educators with advanced degrees from IITs, IIMs, and global universities, undergoing continuous professional development.', span: 'wide' },
              { icon: '🌍', title: 'Global Curriculum', desc: 'Internationally aligned with CBSE and IB frameworks, blending Indian academic tradition with global standards.', span: '' },
              { icon: '💡', title: 'Innovation-Driven', desc: 'AI labs, maker spaces, and a Tech Innovation Hub for robotics, coding, and design thinking from Grade 5 onward.', span: '' },
              { icon: '🏟️', title: 'World-Class Campus', desc: '25-acre campus with 12+ sports grounds, Olympic pool, 3 auditoriums, 8 science labs, and smart classrooms.', span: '' },
              { icon: '🤝', title: 'Character & Leadership', desc: 'Dedicated programs for community service, public speaking, student governance, and emotional intelligence.', span: '' },
              { icon: '📊', title: 'Proven Results', desc: '98% pass rate, 96% distinction. Graduates placed at IITs, AIIMS, MIT, Stanford, and Oxford.', span: 'wide' },
            ].map((p, i) => (
              <div className={`abt-bento-card ${p.span === 'wide' ? 'abt-bento-wide' : ''}`} key={i}>
                <span className="abt-bento-icon">{p.icon}</span>
                <div>
                  <h3 className="abt-bento-h">{p.title}</h3>
                  <p className="abt-bento-p">{p.desc}</p>
                </div>
              </div>
            ))}
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
            <a href="/#campus" className="btn-ghost large">Virtual Tour ▶</a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo"><span className="logo-crest">🎓</span><div><div className="logo-name">Greenfield</div><div className="logo-tagline">ACADEMY</div></div></div>
            <p>Nurturing young minds and shaping tomorrow's leaders since 1985.</p>
            <div className="socials">{['Facebook','Instagram','Twitter','YouTube'].map(s=><a key={s} href="#" className="soc-btn" title={s}>{s[0]}</a>)}</div>
          </div>
          {[
            {h:'Quick Links',links:['About Us','Programs','Admissions','Faculty','Alumni','Careers']},
            {h:'Academics',links:['Pre-Primary','Primary School','Middle School','Senior Secondary','Sports & Arts','Digital Skills']},
            {h:'Resources',links:['Academic Calendar','Exam Schedule','Fee Structure','Scholarship','Downloads','Contact']},
          ].map(col=>(
            <div className="footer-col" key={col.h}>
              <div className="footer-col-h">{col.h}</div>
              <ul>{col.links.map(l=><li key={l}><a href="#">{l}</a></li>)}</ul>
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
