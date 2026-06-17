import { useState, useEffect, useRef } from 'react';
import './App.css';
import './indep.css';
import { Flag, Music, MapPin, Sparkles, Star, Award, Shield } from 'lucide-react';
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
    const newPetals = Array.from({ length: 45 }).map((_, i) => ({
      id: i + Date.now(),
      left: Math.random() * 80 + 10, // 10% to 90%
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 10 + 6, // 6px to 16px
      delay: Math.random() * 1.5,
    }));
    setPetals(newPetals);

    // Clean up petals after animation ends (4s)
    setTimeout(() => {
      setPetals([]);
    }, 5500);
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

  const highlights = [
    { 
      icon: <Flag className="ind-card-icon" size={24} />, 
      title: 'Flag Hoisting Ceremony', 
      desc: 'The unfurling of the national flag by the principal and esteemed guests, followed by a guard of honor.', 
      tag: 'Patriotic' 
    },
    { 
      icon: <Music className="ind-card-icon" size={24} />, 
      title: 'National Anthem Choir', 
      desc: 'A powerful collective chorus of student groups singing the national anthem with pride and absolute discipline.', 
      tag: 'Anthem' 
    },
    { 
      icon: <Award className="ind-card-icon" size={24} />, 
      title: 'March Past Parade', 
      desc: 'Student houses in complete uniform marching to drumbeats, representing unity, strength, and focus.', 
      tag: 'Discipline' 
    },
    { 
      icon: <Sparkles className="ind-card-icon" size={24} />, 
      title: 'Cultural Performances', 
      desc: 'Regional folk dances, patriotic dramatic skits, and speeches honoring the freedom fighters of India.', 
      tag: 'Diversity' 
    },
  ];


  return (
    <div className="ind-page">
      {/* ── NAVBAR ── */}
      <Navbar initialVariant="about" />

      {/* ── HERO ── */}
      <section className="ind-hero">
        <div className="ind-hero-bg" style={{ backgroundImage: "url('/indep_hero.webp')" }} />
        <div className="ind-hero-veil" />
        
        <div className="ind-hero-inner">
          <div className="ind-hero-tag">
            <Star size={14} className="animate-pulse" style={{ color: '#ffd700' }} /> National Day Celebration · St. Stephen's School
          </div>
          <h1 className="ind-hero-h1">
            Independence<span>Day</span>
          </h1>
          <p className="ind-hero-sub">
            Saluting the spirit of freedom, unity in diversity, and national integrity. Commemorating our independence with our students and community in Bowbazar.
          </p>

          <div className="ind-hero-meta">
            <div className="ind-meta-item">
              <MapPin size={20} className="ind-meta-icon" />
              <div>
                <div className="ind-meta-label">Venue</div>
                <div style={{ fontWeight: 700 }}>School Central Playground</div>
              </div>
            </div>
          </div>


        </div>

        <div className="ind-hero-scroll">
          <span>Scroll</span>
          <div className="ind-hero-scroll-line" />
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
                <div className="flag-rope" />
                <div className="flag-pole" />
                
                {/* Flag component that rises based on hoistProgress */}
                <div 
                  className="flag-widget-container"
                  style={{ top: `${10 + (100 - hoistProgress) * 0.75}%` }}
                >
                  <div className={`tricolor-flag ${flagHoisted ? 'unfurled' : ''}`}>
                    <div className="flag-stripe saffron" />
                    <div className="flag-stripe white">
                      <div className="chakra-symbol" />
                    </div>
                    <div className="flag-stripe green" />
                  </div>
                </div>

                <div className="flag-pole-base" />
              </div>

              {/* Falling Petals Effect */}
              {petals.map((p) => (
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
                <img loading="lazy" src="/a1.webp" alt="Students in parade" className="ind-collage-img-main" />
                <img loading="lazy" src="/a2.webp" alt="Flag hoisting preparation" className="ind-collage-img-sec" />
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
              <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', height: '240px' }}>
                <img loading="lazy" src="/a3.webp" alt="Independence Day Celebrations" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{
                  position: 'absolute',
                  bottom: '1rem',
                  left: '1rem',
                  background: 'rgba(18, 136, 7, 0.85)',
                  color: '#fff',
                  padding: '0.4rem 1rem',
                  borderRadius: '50px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  backdropFilter: 'blur(4px)'
                }}>
                  📅 August 15, 2025
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HIGHLIGHTS SECTION ── */}
      <section className="ind-section ind-highlights">
        <div className="ind-wrap">
          <div className="ind-highlights-head">
            <div className="ind-chip">Celebration Showcases</div>
            <h2 className="ind-h2">Day of <span>National Pride</span></h2>
            <p className="ind-lead">
              A careful compilation of disciplines, melodies, and dramatic presentations.
            </p>
          </div>
          <div className="ind-cards-grid">
            {highlights.map((h, i) => (
              <div className="ind-card" key={i}>
                <div className="ind-card-icon-wrap">{h.icon}</div>
                <h3 className="ind-card-h">{h.title}</h3>
                <p className="ind-card-p">{h.desc}</p>
                <span className="ind-card-tag">{h.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* ── FOOTER ── */}
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
