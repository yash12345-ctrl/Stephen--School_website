import { useState, useEffect, useRef } from 'react';
import './App.css';
import './indep.css';
import { Shield, Star } from 'lucide-react';
import Navbar from './Navbar';

interface Petal {
  id: number;
  left: number;
  color: string;
  size: number;
  delay: number;
}

export default function Indep() {

  // Interactive Flag Hoisting State
  const [hoistProgress, setHoistProgress] = useState(0);
  const [flagHoisted, setFlagHoisted] = useState(false);
  const [isHoisting, setIsHoisting] = useState(false);
  const [petals, setPetals] = useState<Petal[]>([]);
  const hoistIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);


  const triggerPetals = () => {
    const colors = ['#ff9933', '#ffffff', '#128807', '#ffb366', '#a2f599'];
    const newPetals = Array.from({ length: 80 }).map((_, i) => ({
      id: i + Date.now(),
      left: Math.random() * 80 + 10, // 10% to 90%
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 14 + 8, // 8px to 22px
      delay: Math.random() * 2,
      blur: Math.random() > 0.7 ? 3 : 0, // Depth of field effect
      zIndex: Math.random() > 0.5 ? 20 : 5 // Layering
    }));
    setPetals(newPetals);

    // Clean up petals after animation ends (6s)
    setTimeout(() => {
      setPetals([]);
    }, 6000);
  };

  const handleHoistFlag = () => {
    if (flagHoisted) {
      // Reset flag
      setHoistProgress(0);
      setFlagHoisted(false);
      setPetals([]);
      return;
    }

    if (isHoisting) return;

    setIsHoisting(true);
    let currentProgress = 0;

    hoistIntervalRef.current = setInterval(() => {
      currentProgress += 5;
      if (currentProgress >= 100) {
        setHoistProgress(100);
        setFlagHoisted(true);
        setIsHoisting(false);
        if (hoistIntervalRef.current) {
          clearInterval(hoistIntervalRef.current);
        }
        triggerPetals();
      } else {
        setHoistProgress(currentProgress);
      }
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (hoistIntervalRef.current) {
        clearInterval(hoistIntervalRef.current);
      }
    };
  }, []);




  return (
    <div className="ind-page">
      {/* ── NAVBAR ── */}
      <Navbar initialVariant="about" />

      {/* ── HERO ── */}
      <section className="ind-hero">
        <div className="ind-hero-bg" style={{ backgroundImage: "url('/i4.webp')" }} />
        <div className="ind-hero-veil" />

        <div className="ind-hero-inner">
          <div className="ind-hero-tag" style={{ marginBottom: '2.5rem' }}>
            <Star size={14} className="animate-pulse" style={{ color: '#ffd700' }} /> National Day Celebration · St. Stephen's School
          </div>
          <h1 className="ind-hero-h1">
            Celebrating India's<br />
            <span>Independence Day</span>
          </h1>
          <p className="ind-hero-sub">
            Join us as students showcase<br />
            patriotism, creativity, and unity.
          </p>
          <div className="ind-hero-btns" style={{ justifyContent: 'flex-start' }}>
            <a href="#hoist" className="ind-btn-gold">Join Ceremony</a>
          </div>
        </div>
      </section>

      {/* ── INTERACTIVE FLAG HOISTING SECTION ── */}
      <section className="ind-section ind-interactive" id="hoist">
        <div className="ind-wrap">
          <div className="text-center" style={{ marginBottom: '3.5rem' }}>
            <div className="ind-chip">Interactive Ceremony</div>
            <h2 className="ind-h2">Virtual <span>Flag Hoisting</span></h2>
            <p className="ind-lead" style={{ maxWidth: '600px', margin: '0 auto' }}>
              Experience the pride of hoisting the national tricolor. Click the button to pull the rope and raise the flag to the top of the mast.
            </p>
          </div>

          <div className="flag-sim-container">
            {/* Visual Column */}
            <div className="flag-sim-interactive">
              <div className="flag-pole-wrapper">
                <div className="flag-pole-top" />
                <div className={`flag-rope ${isHoisting ? 'is-hoisting' : ''}`} />
                <div className="flag-pole" />

                {/* Flag component that rises based on hoistProgress */}
                <div
                  className="flag-widget-container"
                  style={{ top: `${10 + (100 - hoistProgress) * 0.75}%` }}
                >
                  <div className={`tricolor-flag ${flagHoisted ? 'unfurled' : ''}`}>
                    <div className="flag-stripe saffron" />
                    <div className="flag-stripe white">
                      <svg viewBox="0 0 24 24" className="chakra-svg" style={{
                        width: 'auto',
                        height: '85%',
                        stroke: 'var(--ind-navy)',
                        strokeWidth: '0.8',
                        fill: 'none',
                        display: 'block',
                        animation: 'chakraSpin 20s linear infinite'
                      }}>
                        <circle cx="12" cy="12" r="10" strokeWidth="1" />
                        <circle cx="12" cy="12" r="1.5" fill="var(--ind-navy)" />
                        <line x1="12" y1="2" x2="12" y2="22" />
                        <line x1="2" y1="12" x2="22" y2="12" />
                        <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                        <line x1="4.93" y1="19.07" x2="19.07" y2="4.93" />

                        <line x1="7" y1="3.3" x2="17" y2="20.7" />
                        <line x1="17" y1="3.3" x2="7" y2="20.7" />
                        <line x1="3.3" y1="7" x2="20.7" y2="17" />
                        <line x1="3.3" y1="17" x2="20.7" y2="7" />

                        <line x1="9.4" y1="2.6" x2="14.6" y2="21.4" />
                        <line x1="14.6" y1="2.6" x2="9.4" y2="21.4" />
                        <line x1="2.6" y1="9.4" x2="21.4" y2="14.6" />
                        <line x1="2.6" y1="14.6" x2="21.4" y2="9.4" />
                      </svg>
                    </div>
                    <div className="flag-stripe green" />
                  </div>
                </div>

                <div className="flag-pole-base" />
              </div>

              {/* Falling Petals Effect */}
              {petals.map((p: any) => (
                <div
                  key={p.id}
                  className="flower-petal"
                  style={{
                    left: `${p.left}%`,
                    width: `${p.size}px`,
                    height: `${p.size}px`,
                    backgroundColor: p.color,
                    animationDelay: `${p.delay}s`,
                    top: '20px',
                    filter: `blur(${p.blur}px)`,
                    zIndex: p.zIndex
                  }}
                />
              ))}
            </div>

            {/* Info and Action Column */}
            <div className="flag-sim-info">
              <h3 className="ind-h2" style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>
                Hoist the <span>Tiranga</span>
              </h3>
              <p className="ind-body" style={{ marginBottom: '2rem' }}>
                At St. Stephen's School, hoisting the flag represents the raising of aspirations for our students. Click the button to hoist the flag, which will trigger the flower petals shower once it reaches the top.
              </p>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <button
                  className="ind-btn-gold"
                  onClick={handleHoistFlag}
                  disabled={isHoisting}
                  style={{ minWidth: '180px', justifyContent: 'center' }}
                >
                  {isHoisting ? 'Hoisting...' : flagHoisted ? 'Reset Flag ↺' : 'Hoist Flag 🇮🇳'}
                </button>
                {hoistProgress > 0 && hoistProgress < 100 && (
                  <span style={{ fontWeight: 600, color: 'var(--ind-saffron-bright)' }}>
                    Progress: {hoistProgress}%
                  </span>
                )}
              </div>

              <div className={`flag-salute-card ${flagHoisted ? 'show' : ''}`}>
                <div className="flag-salute-title">
                  <Shield size={20} /> Salute the Nation
                </div>
                <p className="flag-salute-desc">
                  "Jana Gana Mana Adhinayaka Jaya He..." The national flag has been hoisted. We salute the ideals of peace, truth, and courage. Happy Independence Day!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT SECTION ── */}
      <section className="ind-section ind-about" id="about">
        <div className="ind-wrap">
          <div className="ind-about-grid">
            <div className="ind-about-visual">
              <div className="ind-about-collage">
                <img loading="lazy" src="/i1.webp" alt="Students in parade" className="ind-collage-img-main" />
                <img loading="lazy" src="/i2.webp" alt="Flag hoisting preparation" className="ind-collage-img-sec" />
              </div>
              <div className="ind-about-badge">
                <div className="ind-about-badge-num">🇮🇳</div>
                <div className="ind-about-badge-txt">Tiranga Pride</div>
              </div>
            </div>
            <div>
              <div className="ind-chip">Empowering Future Citizens</div>
              <h2 className="ind-h2">Nurturing Freedom & <span>Responsibility</span></h2>
              <p className="ind-lead">
                Independence Day at St. Stephen’s School has always been celebrated with great pride, patriotism, and vibrant cultural performances over the years. The occasion has been further honoured by the gracious presence of distinguished guests, making every celebration truly memorable and inspiring.
              </p>
              <p className="ind-body">
                Through March Past drills, choral singing, and stage dramas, our children celebrate India's journey of independence. This event helps build leadership skills and confidence in first-generation learners from local Bowbazar slums, helping them break free from socio-economic constraints.
              </p>
              <div className="ind-about-stats">
                <div className="ind-stat">
                  <span className="ind-stat-num">450+</span>
                  <span className="ind-stat-lbl">Students Present</span>
                </div>
                <div className="ind-stat">
                  <span className="ind-stat-num">4 Houses</span>
                  <span className="ind-stat-lbl">Parading Squads</span>
                </div>
                <div className="ind-stat">
                  <span className="ind-stat-num">Annual</span>
                  <span className="ind-stat-lbl">Flag hoisting tradition</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SPOTLIGHT SECTION (PREVIOUS YEAR HIGHLIGHT) ── */}
      <section className="ind-section" style={{ background: '#fdfdfd', borderTop: '1px solid var(--ind-border-light)', borderBottom: '1px solid var(--ind-border-light)' }}>
        <div className="ind-wrap">
          <div className="ind-spotlight-card">
            <div className="ind-spotlight-grid">
              <div>
                <div className="ind-chip" style={{ background: 'var(--ind-green-light)', color: 'var(--ind-green)' }}>Event Spotlight</div>
                <h3 className="ind-h2" style={{ fontSize: '2rem', marginBottom: '1.2rem' }}>Saluting Our <span>Guardians</span></h3>
                <p className="ind-lead" style={{ fontSize: '1.05rem', lineHeight: '1.7' }}>
                  Our 2025 celebration was graced by senior community leaders and veteran social workers who inspired the kids with messages of duty, self-reliance, and education.
                </p>
                <p className="ind-body" style={{ margin: 0, fontSize: '0.95rem' }}>
                  Students from primary grades presented a colorful cultural march showcasing traditional attire from diverse states, highlighting "Unity in Diversity". Sweet boxes containing laddoos were distributed to all students and local volunteers.
                </p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem', height: '280px' }}>
                <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden' }}>
                  <img loading="lazy" src="/i3.webp" alt="Independence Day Celebrations" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden' }}>
                  <img loading="lazy" src="/i4.webp" alt="Students parading" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden' }}>
                  <img loading="lazy" src="/i5.webp" alt="Cultural performance" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden' }}>
                  <img loading="lazy" src="/i6.webp" alt="Choir singing national anthem" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{
                    position: 'absolute',
                    bottom: '0.6rem',
                    left: '0.6rem',
                    background: 'rgba(18, 136, 7, 0.85)',
                    color: '#fff',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '50px',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    backdropFilter: 'blur(4px)'
                  }}>
                    📅 August 15, 2025
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      <footer className="footer ind-footer">
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
