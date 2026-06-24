import React, { useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import './program_top.css';



const events = [
  { name: 'Annual Concert', img: '/news_annual_day.webp', desc: 'A grand musical evening showcasing student talent across classical, folk, and contemporary performances.', color1: '#e040fb', color2: '#7c4dff', link: '/annual-concert' },
  { name: 'Annual Art & Craft Exhibition', img: '/art_exhibition_hero.webp', desc: 'Students display their finest artwork, sculptures, and handcrafted creations in a vibrant gallery setting.', color1: '#f7971e', color2: '#ffd200', link: '/art-and-craft-exhibition' },
  { name: 'Eid Celebration', img: '/eid_hero.webp', desc: 'A joyful community celebration of Eid with traditional food, performances, and cultural activities for all.', color1: '#11998e', color2: '#38ef7d', link: '/eid' },
  { name: 'Christmas Celebration', img: '/christmas_hero.webp', desc: 'Festive carols, decoration contests, gift exchanges, and a warm holiday program uniting the school family.', color1: '#eb3349', color2: '#f45c43', link: '/christmas' },
  { name: 'Rabindra Jayanti', img: '/rabindrajayanti_hero.webp', desc: 'Honouring the legacy of Rabindranath Tagore through poetry recitations, dance, and cultural presentations.', color1: '#4776e6', color2: '#8e54e9', link: '/rabindrajayanti' },
  { name: 'Independence Day', img: '/indep_hero.webp', desc: 'A patriotic celebration with flag hoisting, cultural programmes, and inspiring speeches by students and staff.', color1: '#ff9800', color2: '#f44336', link: '/indep' },
  { name: 'Educational Day Out', img: '/educational_day_out_hero.webp', desc: 'Enriching field trips to museums, science centres, and historical sites to bring learning alive beyond the classroom.', color1: '#00b09b', color2: '#96c93d', link: '/educational-day-out' },
  { name: 'Annual School Picnic', img: '/annual_picnic_hero.webp', desc: 'A fun-filled day of outdoor games, team activities, and picnic lunches that strengthen bonds across the school community.', color1: '#C9A84C', color2: '#F0C96B', link: '/annual-picnic' },
];

const displayData = [
  {
    grade: 'Morning Session',
    range: 'Lower Nursery to Class V',
    emoji: <Sun size={28} strokeWidth={2.5} color="#11998e" />,
    desc: 'A nurturing environment where early learners and primary students build strong foundational skills in literacy, numeracy, and character development through interactive, holistic education.',
    color1: '#11998e',
    color2: '#38ef7d',
    img: '/hey2.jpeg',
    objectPosition: 'top'
  },
  {
    grade: 'Afternoon Session',
    range: 'Class VI to Class X',
    emoji: <Moon size={28} strokeWidth={2.5} color="#eb3349" />,
    desc: 'Comprehensive academic preparation focused on advanced coursework, critical thinking, and board examination readiness, empowering senior students for future success.',
    color1: '#eb3349',
    color2: '#f45c43',
    img: '/v8.webp',
    objectPosition: 'center'
  }
];

export function ProgramMegaMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <div className={`mega-menu ${open ? 'open' : ''}`}>
      <div className="mega-inner mega-inner--wide">
        <div className="mega-left">
          <div className="mega-left-tag">✦ Events & Activities</div>
          <h3 className="mega-h3">Celebrations & enriching school experiences</h3>
          <p className="mega-sub">Cultural events, festive celebrations, and memorable experiences that make every school year special.</p>

          <div className="mega-left-stats">
            <div className="mega-stat">

            </div>
            <div className="mega-stat">

            </div>
          </div>
        </div>
        <div className="mega-right">
          <div className="mega-section-label">🎉 Events & Activities</div>
          <div className="mega-grid mega-grid--events">
            {events.map((ev, idx) => (
              <a
                href={ev.link}
                className="mega-card mega-card--event"
                key={idx}
                style={{ '--mc1': ev.color1, '--mc2': ev.color2 } as React.CSSProperties}
                onClick={onClose}
              >
                <div className="mega-card-accent" />
                <div className="mega-card-photo-wrap">
                  <img src={ev.img} alt={ev.name} className="mega-card-photo" />
                </div>
                <div className="mega-card-title">{ev.name}</div>
                <div className="mega-card-desc">{ev.desc.slice(0, 70)}…</div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProgramTop() {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeProg = displayData[activeIdx];

  return (
    <section className="section programs-section" id="programs">
      <div className="container">

        {/* Section Header */}
        <div className="sec-head">
          <div className="s-tag">Academic Programs</div>
          <h2 className="s-title">World-Class <span className="gold">Programs</span> for Every Stage</h2>
          <p className="sec-desc">A structured journey of holistic growth and academic excellence, custom-tailored for different developmental milestones.</p>
        </div>

        {/* Shift Timings */}
        <div className="shift-banner-container">
          <div className="shift-banner">
            <div className="shift-banner-item">
              <div className="shift-tag">Session 01</div>
              <div className="shift-details">
                <h4 className="shift-name">Morning Session</h4>
                <p className="shift-time">7:45 AM <span className="gold">—</span> 11:15 AM</p>
              </div>
            </div>
            <div className="shift-divider"></div>
            <div className="shift-banner-item">
              <div className="shift-tag">Session 02</div>
              <div className="shift-details">
                <h4 className="shift-name">Afternoon Session</h4>
                <p className="shift-time">11:30 AM <span className="gold">—</span> 4:00 PM</p>
              </div>
            </div>
          </div>
          <div className="shift-banner-connector"></div>
        </div>

        {/* Dashboard Grid */}
        <div className="prog-dashboard">

          {/* Left: Tab Selectors */}
          <div className="prog-tabs">
            {displayData.map((p, i) => {
              const isActive = i === activeIdx;
              return (
                <a
                  key={i}
                  href="#programs"
                  className={`prog-tab-card ${isActive ? 'active' : ''}`}
                  onClick={(e) => { e.preventDefault(); setActiveIdx(i); }}
                  style={{
                    '--c1': p.color1,
                    '--c2': p.color2,
                  } as React.CSSProperties}
                >
                  <div className="prog-tab-glow" />
                  <div className="prog-tab-emoji-wrap">
                    <span className="prog-tab-emoji">{p.emoji}</span>
                  </div>
                  <div className="prog-tab-info">
                    <span className="prog-tab-range">{p.range}</span>
                    <h3 className="prog-tab-title">{p.grade}</h3>
                  </div>
                  <div className="prog-tab-indicator">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </div>
                </a>
              );
            })}
          </div>

          {/* Right: Active Showcase Panel */}
          <div
            className="prog-showcase"
            style={{
              '--c1': activeProg.color1,
              '--c2': activeProg.color2
            } as React.CSSProperties}
          >
            <div className="prog-showcase-bg-glow" />
            <div className="prog-showcase-content">

              <div className="prog-showcase-header">
                <span className="prog-showcase-pill">{activeProg.range} Showcase</span>
                <h3 className="prog-showcase-title">{activeProg.grade}</h3>
                <p className="prog-showcase-desc">{activeProg.desc}</p>
              </div>

              {/* Program Image */}
              <div className="prog-showcase-image" style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}>
                <img loading="lazy" src={activeProg.img} alt={activeProg.grade} style={{ width: '100%', height: '240px', objectFit: 'cover', objectPosition: activeProg.objectPosition || 'center', display: 'block' }} />
              </div>

              {/* Learn More CTA */}
              <div style={{ marginTop: '1.5rem' }}>
                <a
                  href="/about"
                  className="prog-learn-btn"
                  style={{
                    background: `linear-gradient(135deg, ${activeProg.color1}, ${activeProg.color2})`,
                    boxShadow: `0 8px 24px ${activeProg.color1}40`,
                  }}
                >
                  Learn More about {activeProg.grade} →
                </a>
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>

  );
}
