import { useState, useEffect } from 'react';
import './school.css';
import { BookOpen, Atom, Compass, Play, Cpu, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
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
            <motion.div 
              className="sch-msg-photo-wrap"
              style={{ position: 'sticky', top: '160px', marginTop: '4rem' }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <img loading="lazy" src="/hey3.webp" className="sch-msg-photo" alt="Principal Desk" />
              <div className="sch-msg-frame" />
            </motion.div>
            <div className="sch-msg-body">
              <motion.div 
                style={{ marginBottom: '2.5rem' }}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div style={{ 
                  fontFamily: 'Playfair Display, serif', 
                  fontSize: '3.5rem', 
                  fontWeight: 800, 
                  color: 'var(--navy)', 
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                }}>
                  Awards & <br/><span style={{ color: 'var(--gold)', fontStyle: 'italic', fontWeight: 600 }}>Recognition</span>
                </div>
                <div style={{ width: '80px', height: '4px', background: 'var(--gold)', marginTop: '1.5rem', borderRadius: '2px' }} />
              </motion.div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} style={{ padding: '1.5rem', background: '#ffffff', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 4px 14px rgba(0,0,0,0.02)', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--gold)', fontWeight: 800, fontSize: '1.25rem', fontFamily: 'Playfair Display, serif', marginTop: '-2px' }}>01.</span>
                  <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.6, color: '#4a4d52', fontWeight: 500 }}>
                    Ms Mehnaz Sayeed, teacher of St. Stephen's School got felicitated by EX CM Smt. Mamta Banerjee, in the presence of Police Commissioner Mr. R.K Pachnanda, Mayor Shri Shovan Chaterjee on the occassion of teacher's day 5th September, 2012.
                  </p>
                </motion.div>
                
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} style={{ padding: '1.5rem', background: '#ffffff', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 4px 14px rgba(0,0,0,0.02)', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--gold)', fontWeight: 800, fontSize: '1.25rem', fontFamily: 'Playfair Display, serif', marginTop: '-2px' }}>02.</span>
                  <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.6, color: '#4a4d52', fontWeight: 500 }}>
                    Certificate of Appreciation was awarded to St. Stephen's School by Jahangirabad Institute of Technology, Barabanki (U.P).
                  </p>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }} style={{ padding: '1.5rem', background: '#ffffff', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 4px 14px rgba(0,0,0,0.02)', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--gold)', fontWeight: 800, fontSize: '1.25rem', fontFamily: 'Playfair Display, serif', marginTop: '-2px' }}>03.</span>
                  <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.6, color: '#4a4d52', fontWeight: 500 }}>
                    Mrs. Niharika Mukherjee was awarded with Nation Builder Award by Rotary Club of Kolkata on 8th September, 2015.
                  </p>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }} style={{ padding: '1.5rem', background: '#ffffff', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 4px 14px rgba(0,0,0,0.02)', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--gold)', fontWeight: 800, fontSize: '1.25rem', fontFamily: 'Playfair Display, serif', marginTop: '-2px' }}>04.</span>
                  <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.6, color: '#4a4d52', fontWeight: 500 }}>
                    KKMERS Award for Excellence in Education & Social Service was awarded to the school on 7th December, 2013.
                  </p>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.5 }} style={{ padding: '1.5rem', background: '#ffffff', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 4px 14px rgba(0,0,0,0.02)', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--gold)', fontWeight: 800, fontSize: '1.25rem', fontFamily: 'Playfair Display, serif', marginTop: '-2px' }}>05.</span>
                  <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.6, color: '#4a4d52', fontWeight: 500 }}>
                    Gurukul Awards by Lions Club International, 2009.
                  </p>
                </motion.div>
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
