import React, { useState } from 'react';
import './program_top.css';

export const programs = [
  { grade: 'Pre-Primary & Kindergarten', range: 'Ages 3–5', emoji: '🧸', desc: 'Fostering early cognitive and social development through play-based learning and creative exploration in a safe environment.', color1: '#11998e', color2: '#38ef7d', vid: 'GLcDu24gr98' },
  { grade: 'Primary School', range: 'Grades 1–5', emoji: '📚', desc: 'Building strong foundational skills in literacy, numeracy, and critical thinking with a focus on holistic child development.', color1: '#4776e6', color2: '#8e54e9', vid: '49fgMBNbX0w' },
  { grade: 'Middle School', range: 'Grades 6–8', emoji: '🔬', desc: 'Encouraging independent thought and scientific inquiry through an accelerated, interdisciplinary STEM-focused curriculum.', color1: '#f7971e', color2: '#ffd200', vid: 'pjFFMXKb5_M' },
  { grade: 'Secondary School', range: 'Grades 9–10', emoji: '🎓', desc: 'Comprehensive academic preparation with advanced coursework, empowering students for board examinations and success.', color1: '#eb3349', color2: '#f45c43', vid: 'j-3eArinB7E' },
  { grade: 'Athletics & The Arts', range: 'All Grades', emoji: '🏆', desc: 'Cultivating exceptional physical and creative talent with state-of-the-art sports facilities and world-class performing arts studios.', color1: '#00b09b', color2: '#96c93d', vid: '49fgMBNbX0w' },
];

const events = [
  { name: 'Annual Concert',            emoji: '🎵', desc: 'A grand musical evening showcasing student talent across classical, folk, and contemporary performances.', color1: '#e040fb', color2: '#7c4dff', link: '/annual-concert' },
  { name: 'Annual Art & Craft Exhibition', emoji: '🎨', desc: 'Students display their finest artwork, sculptures, and handcrafted creations in a vibrant gallery setting.', color1: '#f7971e', color2: '#ffd200', link: '/#events' },
  { name: 'Eid Celebration',           emoji: '🌙', desc: 'A joyful community celebration of Eid with traditional food, performances, and cultural activities for all.', color1: '#11998e', color2: '#38ef7d', link: '/eid' },
  { name: 'Christmas Celebration',     emoji: '🎄', desc: 'Festive carols, decoration contests, gift exchanges, and a warm holiday program uniting the school family.', color1: '#eb3349', color2: '#f45c43', link: '/christmas' },
  { name: 'Rabindra Jayanti',          emoji: '📖', desc: 'Honouring the legacy of Rabindranath Tagore through poetry recitations, dance, and cultural presentations.', color1: '#4776e6', color2: '#8e54e9', link: '/#events' },
  { name: 'Independence Day',          emoji: '🇮🇳', desc: 'A patriotic celebration with flag hoisting, cultural programmes, and inspiring speeches by students and staff.', color1: '#ff9800', color2: '#f44336', link: '/#events' },
  { name: 'Educational Day Out',       emoji: '🚌', desc: 'Enriching field trips to museums, science centres, and historical sites to bring learning alive beyond the classroom.', color1: '#00b09b', color2: '#96c93d', link: '/#events' },
  { name: 'Annual School Picnic',      emoji: '🌳', desc: 'A fun-filled day of outdoor games, team activities, and picnic lunches that strengthen bonds across the school community.', color1: '#C9A84C', color2: '#F0C96B', link: '/#events' },
];

const displayData = [
  {
    grade: 'Pre-Primary & Kindergarten',
    range: 'Ages 3–5',
    emoji: '🧸',
    desc: 'Fostering early cognitive and social development through play-based learning, sensory exploration, and creative storytelling in a warm, nurturing environment.',
    color1: '#11998e',
    color2: '#38ef7d',
    img: '/v6.jpg'
  },
  {
    grade: 'Primary School',
    range: 'Grades 1–5',
    emoji: '📚',
    desc: 'Nurturing curiosity and building strong foundational skills in literacy, mathematical concepts, and inquiry-based science while encouraging positive self-expression.',
    color1: '#4776e6',
    color2: '#8e54e9',
    img: '/v7.jpg'
  },
  {
    grade: 'Secondary School',
    range: 'Grades 6–10',
    emoji: '🎓',
    desc: 'Comprehensive academic rigor focused on board examinations, character development, and practical skills, empowering students to excel in their secondary education.',
    color1: '#eb3349',
    color2: '#f45c43',
    img: '/v8.jpg'
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
          <a href="/#events" className="mega-btn" onClick={onClose}>View All Events →</a>
        </div>
        <div className="mega-right">
          <div className="mega-section-label">🎉 Events & Activities</div>
          <div className="mega-grid mega-grid--events">
            {events.map((ev, idx) => (
              <a
                href={ev.link}
                className="mega-card mega-card--event"
                key={idx}
                style={{'--mc1':ev.color1,'--mc2':ev.color2} as React.CSSProperties}
                onClick={onClose}
              >
                <div className="mega-card-accent"/>
                <div className="mega-card-head">
                  <span className="mega-card-icon">{ev.emoji}</span>
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
                <h4 className="shift-name">Morning Shift</h4>
                <p className="shift-time">6:30 AM <span className="gold">—</span> 11:30 AM</p>
              </div>
            </div>
            <div className="shift-divider"></div>
            <div className="shift-banner-item">
              <div className="shift-tag">Session 02</div>
              <div className="shift-details">
                <h4 className="shift-name">Evening Shift</h4>
                <p className="shift-time">11:45 AM <span className="gold">—</span> 4:45 PM</p>
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
                <img src={activeProg.img} alt={activeProg.grade} style={{ width: '100%', height: '240px', objectFit: 'cover', display: 'block' }} />
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
