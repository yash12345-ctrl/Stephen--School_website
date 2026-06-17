import './App.css';
import './christmas.css';
import { ProgramMegaMenu } from './program_top';
import { Gift, Music, Heart, Sparkles, Star, TreePine, Palette } from 'lucide-react';
import Navbar from './Navbar';

export default function Christmas() {
        
  
  const highlights = [
    { icon: <Music className="xm-icon" size={24} />, title: 'Choir & Carols', desc: 'Our student choir fills the winter air with beautiful festive carols and classic hymns, representing weeks of preparation.', tag: 'Music' },
    { icon: <Sparkles className="xm-icon" size={24} />, title: 'The Nativity Play', desc: 'A heartfelt enactment of the Christmas story by middle school students, featuring traditional costumes and songs.', tag: 'Drama' },
    { icon: <Gift className="xm-icon" size={24} />, title: 'Gift Distribution', desc: 'Santa\'s arrival brings warm blankets, new clothes, school supplies, and special holiday treats for every child.', tag: 'Giving' },
    { icon: <Heart className="xm-icon" size={24} />, title: 'Community Feast', desc: 'A grand festive lunch prepared by volunteers and teachers, sharing the warmth of a holiday meal together.', tag: 'Feast' },
    { icon: <TreePine className="xm-icon" size={24} />, title: 'Carol Singing Walk', desc: 'Students walk through the school campus singing carols, spreading festive cheer to every classroom and community corner.', tag: 'Celebration' },
    { icon: <Palette className="xm-icon" size={24} />, title: 'Winter Craft Fair', desc: 'Children display handmade ornaments, Christmas cards, and art, showcasing their creativity in a vibrant winter showcase.', tag: 'Arts' },
  ];


  return (
    <div className="xm-page">
      {/* ── NAVBAR ── */}
      <Navbar initialVariant="about" />

      {/* ── HERO ── */}
      <section className="xm-hero">
        <div className="xm-hero-bg" style={{ backgroundImage: "url('/christmas_hero.webp')" }} />
        <div className="xm-snow-overlay" />
        <div className="xm-snow-overlay-2" />
        <div className="xm-snow-overlay-3" />
        <div className="xm-hero-stars" />
        <div className="xm-hero-veil" />
        <div className="xm-hero-orb" />

        <div className="xm-hero-inner">
          <div className="xm-hero-tag">
            <Star size={14} className="gold-star animate-pulse" /> Annual Festive Celebration
            <span className="xm-hero-tag-dot" />
            St. Stephen's School
          </div>

          <div className="xm-hero-snowflakes">❅ &nbsp;&nbsp; ❆ &nbsp;&nbsp; ❅ &nbsp;&nbsp; ❆ &nbsp;&nbsp; ❅</div>

          <h1 className="xm-hero-h1">
            Christmas<br /><span>Celebration</span>
          </h1>

          <p className="xm-hero-sub">
            Spreading the light of education, warmth, and holiday cheer.<br />
            A season of hope and sharing for the children of Bowbazar.
          </p>

          <div className="xm-hero-btns">
            <a href="#about" className="xm-btn-gold xm-btn-shimmer">
              <span>❄</span> Explore Celebration
            </a>
          </div>
        </div>

        <div className="xm-hero-scroll">
          <span>Scroll</span>
          <div className="xm-hero-scroll-line" />
        </div>
      </section>

      {/* ── ABOUT SECTION ── */}
      <section className="xm-section xm-about" id="about">
        <div className="xm-wrap">
          <div className="xm-about-grid">
            <div className="xm-about-visual">
              <div className="xm-about-collage">
                <img loading="lazy" src="/christmas_students.jpg" alt="Students with Santa hats and Christmas gift bags" className="xm-collage-img-main" />
                <img loading="lazy" src="/b7.jpg" alt="Students at Christmas celebration" className="xm-collage-img-sec" />
              </div>
              <div className="xm-about-badge">
                <div className="xm-about-badge-num">🎄</div>
                <div className="xm-about-badge-txt">Season of Joy</div>
              </div>
            </div>
            <div>
              <div className="xm-chip">Our Festive Tradition</div>
              <h2 className="xm-h2"><span>Spreading Hope and</span> Warmth</h2>
              <p className="xm-lead">
                At St. Stephen's School, Christmas is a special opportunity to express gratitude and bring smiles to our 500+ students. As an NGO-based school, we host a grand celebration to ensure every first-generation learner is wrapped in warmth and happiness before the winter break. 
              </p>
              <p className="xm-body">
                Through our annual Christmas Drive, we gather gifts, warm blankets, and support for a community feast. It is a day where barriers vanish, and we celebrate the spirit of giving together.
              </p>

            </div>
          </div>
        </div>
      </section>

      {/* ── PAST EVENT SPOTLIGHT ── */}
      <section className="xm-section xm-spotlight" style={{ background: '#fdf9f9', borderTop: '1px solid rgba(156, 37, 41, 0.04)', borderBottom: '1px solid rgba(156, 37, 41, 0.04)' }}>
        <div className="xm-wrap">
          <div className="xm-spotlight-card" style={{
            background: 'var(--xm-white)',
            padding: '3rem',
            borderRadius: '24px',
            boxShadow: '0 15px 35px rgba(156, 37, 41, 0.04)',
            border: '1px solid rgba(156, 37, 41, 0.04)'
          }}>
            <div className="xm-spotlight-grid">
              <div>
                <div className="xm-chip" style={{ background: 'rgba(156, 37, 41, 0.08)', color: 'var(--xm-red)' }}>Event Spotlight</div>
                <h3 className="xm-h2" style={{ fontSize: '2rem', marginBottom: '1.2rem' }}>A Magical <span>Cathedral Visit</span></h3>
                <p className="xm-lead" style={{ fontSize: '1.05rem', lineHeight: '1.7', color: 'var(--xm-dark)' }}>
                  <strong>December 25, 2024</strong> was a day filled with absolute happiness for the students of St. Stephen's School when they visited the historic <strong>St. Paul's Cathedral</strong> and received wonderful Christmas gifts.
                </p>
                <p className="xm-body" style={{ margin: 0, fontSize: '0.95rem' }}>
                  The students sang carols in the serene cathedral gardens and received winter gifts, making this holiday excursion a truly unforgettable experience of warmth and cheer.
                </p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div style={{ position: 'relative', borderRadius: '14px', overflow: 'hidden', height: '200px' }}>
                  <img loading="lazy" src="/b5.jpg" alt="Christmas Celebration at St. Stephen's School" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{
                    position: 'absolute', bottom: '0.6rem', left: '0.6rem',
                    background: 'rgba(156, 37, 41, 0.85)', color: '#fff',
                    padding: '0.25rem 0.7rem', borderRadius: '50px',
                    fontSize: '0.68rem', fontWeight: 700, backdropFilter: 'blur(4px)'
                  }}>📅 Dec 25, 2024</div>
                </div>
                <div style={{ position: 'relative', borderRadius: '14px', overflow: 'hidden', height: '200px' }}>
                  <img loading="lazy" src="/b6.jpg" alt="Students with Christmas gifts at St. Stephen's School" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HIGHLIGHTS SECTION ── */}
      <section className="xm-section xm-highlights">
        <div className="xm-wrap">
          <div className="xm-highlights-head">
            <div className="xm-chip">Event Highlights</div>
            <h2 className="xm-h2">What Makes it <span>Special</span></h2>
            <p className="xm-lead">
              A day carefully curated to celebrate community, culture, and care.
            </p>
          </div>
          <div className="xm-cards-grid">
            {highlights.map((h, i) => (
              <div className="xm-card" key={i}>
                <div className="xm-card-icon-wrap">{h.icon}</div>
                <h3 className="xm-card-h">{h.title}</h3>
                <p className="xm-card-p">{h.desc}</p>
                <span className="xm-card-tag">{h.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ── */}
      <section className="xm-cta">
        <div className="xm-cta-inner">
          <div className="xm-cta-text">
            <span className="xm-cta-tag">Make a Difference</span>
            <h2 className="xm-cta-h">Spread the Joy of <span>Christmas</span></h2>
            <p className="xm-cta-p">
              Your contribution lights up a child's festive season.
            </p>
          </div>
          <a href="/donate" className="xm-btn-gold xm-cta-donate">Donate Now →</a>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer xm-footer">
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
