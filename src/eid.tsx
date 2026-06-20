import { useState } from 'react';
import './App.css';
import './eid.css';
import { Moon, Star } from 'lucide-react';
import Navbar from './Navbar';

export default function Eid() {
        const [activeImage, setActiveImage] = useState<string | null>(null);
  
  // Eidi Envelope Animation State
  const [eidiOpen, setEidiOpen] = useState(false);
  const [coins, setCoins] = useState<{ id: number; left: number; delay: number; scale: number }[]>([]);

  
  const handleOpenEidi = () => {
    if (!eidiOpen) {
      // Generate randomized coins
      const newCoins = Array.from({ length: 20 }).map((_, i) => ({
        id: i + Date.now(),
        left: Math.random() * 80 + 10, // range 10% to 90%
        delay: Math.random() * 0.6,    // staggered delay in seconds
        scale: Math.random() * 0.5 + 0.8, // scale factor
      }));
      setCoins(newCoins);
      setEidiOpen(true);
    } else {
      setEidiOpen(false);
      setCoins([]);
    }
  };



  return (
    <div className="eid-page-container">
      {/* ── NAVBAR ── */}
      <Navbar initialVariant="about" />

      {/* ── HERO ── */}
      <section className="eid-hero">
        <div className="eid-hero-bg" style={{ backgroundImage: "url('/eid_hero.webp')" }} />
        <div className="eid-hero-veil" />
        
        <div className="eid-hero-inner">
          <div className="eid-hero-tag">
            <Star size={14} className="gold-crescent animate-pulse" /> Community Celebration · St. Stephen's School
          </div>
          <h1 className="eid-hero-h1">
            Eid Milan<br /><span>Celebration</span>
          </h1>
          <p className="eid-hero-sub">
            Celebrating peace, generosity, and community harmony. A special day of Eid feasts and Eidi gifts for our 500+ students in Bowbazar.
          </p>

          <div className="eid-hero-btns">
            <a href="#interactive-eidi" className="eid-btn-gold">Receive Eidi Blessings</a>
          </div>
        </div>

        <div className="eid-hero-scroll">
          <span>Scroll</span>
          <div className="eid-hero-scroll-line" />
        </div>
      </section>

      {/* ── INTERACTIVE EIDI SECTION ── */}
      <section className="eid-section eid-interactive" id="interactive-eidi">
        <div className="eid-wrap text-center">
          <div className="eid-chip">Interactive Blessing</div>
          <h2 className="eid-h2">Claim Your School <span>Eidi</span></h2>
          <p className="eid-lead" style={{ maxWidth: '600px', margin: '0 auto 3.5rem auto' }}>
            In our school tradition, children receive Eidi envelopes containing blessings and small gifts. Open the digital envelope below to receive yours!
          </p>

          {/* Envelope Interactive Box */}
          <div className="envelope-animation-container">
            <div className={`eidi-envelope-box ${eidiOpen ? 'open' : ''}`} onClick={handleOpenEidi}>
              
              {/* Envelope Body */}
              <div className="envelope-back">
                <div className="envelope-letter">
                  <div className="letter-header">
                    <Moon size={28} className="letter-crescent" />
                    <h3>Eid Mubarak!</h3>
                  </div>
                  <div className="letter-body-content">
                    <p className="blessing-ar">تَقَبَّلَ اللَّهُ مِنَّا وَمِنْكُمْ</p>
                    <p className="blessing-en">"May Allah flood your life with happiness on this occasion, heart with love, soul with spiritual peace, and mind with wisdom."</p>
                    <div className="letter-sign">With love, St. Stephen's School</div>
                  </div>
                </div>
                <div className="envelope-flap"></div>
                <div className="envelope-seal">
                  <div className="seal-inner">
                    <span className="seal-crescent">🌙</span>
                  </div>
                </div>
                <div className="envelope-front"></div>
              </div>

              {/* Spawned Coins */}
              {eidiOpen && coins.map(coin => (
                <div
                  key={coin.id}
                  className="eidi-coin"
                  style={{
                    left: `${coin.left}%`,
                    animationDelay: `${coin.delay}s`,
                    transform: `scale(${coin.scale})`
                  }}
                >
                  <div className="gold-coin">
                    <div className="gold-coin-face">
                      <span className="gold-coin-crescent">🌙</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '2.5rem' }}>
              <button className="eid-btn-gold large" onClick={handleOpenEidi}>
                {eidiOpen ? 'Close Envelope' : 'Open Eidi Envelope ✉️'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT SECTION ── */}
      <section className="eid-section eid-about">
        <div className="eid-wrap">
          <div className="eid-about-grid">
            <div className="eid-about-visual">
              <div className="eid-about-collage">
                <img loading="lazy" src="/b1.jpg" alt="Eid Milan Celebration Assembly" className="eid-collage-img-main" />
                <img loading="lazy" src="/b4.jpg" alt="Grand Community Feast" className="eid-collage-img-sec" />
              </div>
              <div className="eid-about-badge">
                <div className="eid-about-badge-num">🌙</div>
                <div className="eid-about-badge-txt">Eid Milan</div>
              </div>
            </div>
            <div>
              <div className="eid-chip">A Tradition of Inclusion</div>
              <h2 className="eid-h2">Sharing Blessings and <span>Happiness</span></h2>
              <p className="eid-lead">
                At St. Stephen's School, our core mission is the social transformation of underprivileged children. Our Eid Milan celebration brings together students of all faiths to celebrate sharing, compassion, and community bonds.
              </p>
              <p className="eid-body">
                Most of our students come from street and slum communities of Bowbazar and are first-generation learners. We celebrate Eid by organizing a massive community feast (delicious chicken biryani and sewai) and distributing "Eidi" (new clothing, storybooks, and hygiene packs) so they can fully participate in the festive spirit.
              </p>

            </div>
          </div>
        </div>
      </section>

      {/* ── PAST EVENT SPOTLIGHT ── */}
      <section className="eid-section eid-spotlight" style={{ background: '#f4fbf7', borderTop: '1px solid rgba(11, 69, 40, 0.04)', borderBottom: '1px solid rgba(11, 69, 40, 0.04)' }}>
        <div className="eid-wrap">
          <div className="eid-spotlight-card" style={{
            background: 'var(--eid-white)',
            padding: '3rem',
            borderRadius: '24px',
            boxShadow: '0 15px 35px rgba(11, 69, 40, 0.04)',
            border: '1px solid rgba(11, 69, 40, 0.04)'
          }}>
            <div className="eid-spotlight-grid">
              <div>
                <div className="eid-chip" style={{ background: 'rgba(207, 168, 71, 0.1)', color: 'var(--eid-gold)' }}>Event Spotlight</div>
                <h3 className="eid-h2" style={{ fontSize: '2rem', marginBottom: '1.2rem' }}>A Heartwarming <span>Memory</span></h3>
                <p className="eid-lead" style={{ fontSize: '1.05rem', lineHeight: '1.7', color: 'var(--eid-dark)' }}>
                  Eid was joyously celebrated on <strong>May 6, 2022</strong>, with <strong>Kanchan Datta</strong> from the <em>Inner Circle</em> being wholeheartedly thanked for his invaluable contribution to the event.
                </p>
                <p className="eid-body" style={{ margin: 0, fontSize: '0.95rem' }}>
                  Gifts were delightfully distributed among students who eagerly gathered in the assembly hall to receive their wonderful presents. This heartwarming celebration remains one of our most treasured school memories.
                </p>
              </div>
              <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', height: '240px' }}>
                <img loading="lazy" src="/b3.jpg" alt="Eid Milan Gift Distribution Drive Poster" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{
                  position: 'absolute',
                  bottom: '1rem',
                  left: '1rem',
                  background: 'rgba(11, 69, 40, 0.85)',
                  color: '#fff',
                  padding: '0.4rem 1rem',
                  borderRadius: '50px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  backdropFilter: 'blur(4px)'
                }}>
                  📅 May 6, 2022
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ── CELEBRATION GALLERY ── */}
      <section className="eid-section eid-gallery">
        <div className="eid-wrap">
          <div className="eid-highlights-head">
            <div className="eid-chip">Festive Gallery</div>
            <h2 className="eid-h2">Celebration <span>Moments</span></h2>
            <p className="eid-lead">
              A glimpse into the community gathering, magical entertainment, and delicious feast of our Eid Milan.
            </p>
          </div>
          <div className="eid-gallery-grid">
            {[
              { img: '/b1.jpg', title: 'Community Assembly', desc: 'Students and teachers gather in the hall for Eid Milan greetings.' },
              { img: '/b2.jpg', title: 'Magical Performance', desc: 'A live magic show bringing wonder and laughter to the children.' },
              { img: '/b3.jpg', title: 'Gift Distribution Drive', desc: 'The official May 2022 banner inviting community support and Eidi donations.' },
              { img: '/b4.jpg', title: 'Grand Community Feast', desc: 'A special festive lunch served to all 500+ students and staff.' }
            ].map((item, index) => (
              <div className="eid-gallery-card" key={index} onClick={() => setActiveImage(item.img)}>
                <div className="eid-gallery-img-wrapper">
                  <img loading="lazy" src={item.img} alt={item.title} />
                  <div className="eid-gallery-overlay">
                    <span className="eid-gallery-zoom">View Full Image</span>
                  </div>
                </div>
                <div className="eid-gallery-info">
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LIGHTBOX MODAL ── */}
      {activeImage && (
        <div className="eid-lightbox" onClick={() => setActiveImage(null)}>
          <div className="eid-lightbox-content" onClick={e => e.stopPropagation()}>
            <img src={activeImage} alt="Enlarged gallery view" />
            <button className="eid-lightbox-close" onClick={() => setActiveImage(null)}>&times;</button>
          </div>
        </div>
      )}



      {/* ── FOOTER ── */}
      <footer className="footer eid-footer">
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
