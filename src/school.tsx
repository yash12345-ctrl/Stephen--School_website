import { useState, useEffect } from 'react';
import './school.css';
import { BookOpen, Atom, Compass, Play, Cpu, Sparkles } from 'lucide-react';
import Navbar from './Navbar';

export default function School() {

  const [heroImageIdx, setHeroImageIdx] = useState(0);

  const heroImages = [
    '/st_stephen_group_1.webp',
    '/st_stephen_group_2.webp',
    '/v4.webp',
    '/v5.webp',
    '/v6.webp'
  ];


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
      img: '/v13.webp'
    },
    {
      title: 'Playroom',
      desc: 'The playroom, on the other hand, is a safe and stimulating environment for children to engage in physical activities and creative play.',
      tag: 'Enjoy',
      icon: <Play size={24} />,
      img: '/v14.webp'
    },
    {
      title: 'Smart Classrooms',
      desc: 'Some classrooms are equiped with Projector for efficient method of teaching.',
      tag: 'Innovative',
      icon: <Cpu size={24} />,
      img: '/v15.webp'
    },
    {
      title: 'Computer Lab',
      desc: 'A modern computer lab equipped with updated systems to provide essential digital learning and technical education for all students.',
      tag: 'Advanced',
      icon: <Atom size={24} />,
      img: '/v16.webp'
    },
    {
      title: 'School Library',
      desc: 'Library with books for all age groups.',
      tag: 'knowledge',
      icon: <BookOpen size={24} />,
      img: '/v17.webp'
    },
    {
      title: 'First-Aid & Support',
      desc: 'First-Aid kit available at school office.',
      tag: 'Care',
      icon: <Compass size={24} />,
      img: '/v18.webp'
    }
  ];

  return (
    <div className="school-page">

      {/* ── NAVBAR ── */}
      <Navbar initialVariant="about" />

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
                <img loading="lazy"
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
          <div className="sch-center-head sch-infra-head">
            <span className="sch-chip sch-chip-large">
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
                    <img loading="lazy" src={item.img} alt={item.title} />
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
                  <img loading="lazy" src="/child_holding_card.webp" alt="Child holding placard" />
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
              <img loading="lazy" src="/hey3.jpeg" className="sch-msg-photo" alt="Principal Desk" />
              <div className="sch-msg-frame" />
            </div>
            <div className="sch-msg-body">
              <span className="sch-chip" style={{ width: 'fit-content' }}>AWARDS & RECOGNITION</span>
              <div className="sch-msg-quote">
                "A moment of pride and inspiration for our entire school community."
              </div>
              <p className="sch-msg-text">
                We were deeply honored to welcome the renowned actress and public figure, Smt. Rupa Ganguly, to our school. Her gracious presence and encouraging words have left an indelible mark on our students and faculty alike.
              </p>
              <p className="sch-msg-text">
                Such moments of recognition reinforce our commitment to excellence and inspire our students to reach for the stars in all their endeavors.
              </p>
              <div className="sch-msg-signature">
                <div className="sch-msg-name">Smt. Rupa Ganguly</div>
                <div className="sch-msg-title">Honourable Guest</div>
              </div>
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
