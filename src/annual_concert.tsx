import React from 'react';
import './App.css';
import './annual_concert.css';
import { Music, Mic, Drum, Flame, Trophy, Theater } from 'lucide-react';
import Navbar from './Navbar';

export default function AnnualConcert() {
        


  


  const highlights = [
    { icon: <Music strokeWidth={1.2} size={34} />, title: 'Classical Performances', desc: 'Students trained in classical Indian and Western music take centre stage, performing compositions that reflect months of dedicated practice.', tag: 'Music' },
    { icon: <Mic strokeWidth={1.2} size={34} />, title: 'Vocal Showcases', desc: 'Solo and choir vocal performances across genres — from folk melodies to contemporary songs — showcasing vocal talent from all grades.', tag: 'Vocal' },
    { icon: <Drum strokeWidth={1.2} size={34} />, title: 'Band Performances', desc: 'Our school band performs original compositions and popular covers, bringing high energy and rhythm to the evening.', tag: 'Band' },
    { icon: <Flame strokeWidth={1.2} size={34} />, title: 'Cultural Fusion', desc: 'A vibrant medley of classical dance, folk forms, and contemporary choreography woven together in a spectacular finale.', tag: 'Dance' },
    { icon: <Trophy strokeWidth={1.2} size={34} />, title: 'Awards Ceremony', desc: 'Outstanding musicians and performers are recognised with certificates and trophies in front of the entire school community.', tag: 'Awards' },
    { icon: <Theater strokeWidth={1.2} size={34} />, title: 'Drama Interlude', desc: 'Short theatrical performances between musical acts add depth, humour, and storytelling to the evening programme.', tag: 'Theatre' },
  ];

  /*
  const schedule = [
    { emoji: '🎵', time: '5:00 PM', title: 'Welcome & Lamp Lighting', desc: 'The Principal and distinguished guests formally open the Annual Concert with a lamp lighting ceremony.' },
    { emoji: '🎹', time: '5:20 PM', title: 'Classical Music Act', desc: 'Pre-Primary and Primary students perform classical Indian and Western instrumental pieces.' },
    { emoji: '🎤', time: '6:00 PM', title: 'Vocal & Choir Showcase', desc: 'The school choir and solo vocalists from Grades 6–10 perform a medley of songs.' },
    { emoji: '🥁', time: '6:40 PM', title: 'School Band Performance', desc: 'The St. Stephen\'s School Band performs original compositions in a high-energy act.' },
    { emoji: '🏆', time: '7:20 PM', title: 'Awards & Recognition', desc: 'Outstanding performers and contributors are honoured with certificates and trophies.' },
    { emoji: '💃', time: '7:45 PM', title: 'Grand Finale & Closing', desc: 'A spectacular cultural fusion finale followed by the vote of thanks and refreshments.' },
  ];
  */


  return (
    <div className="ac-page">

      {/* ── NAVBAR ── */}
      <Navbar initialVariant="about" />

      {/* ── HERO ── */}
      <section className="ac-hero">
        <div className="ac-hero-bg" />
        <div className="ac-notes">
          {['🎵', '🎶', '🎸', '🎹', '🎺', '🥁'].map((n, i) => (
            <span key={i} className="ac-note">{n}</span>
          ))}
        </div>
        <div className="ac-hero-veil" />

        <div className="ac-hero-split container">
          <div className="ac-hero-content">
            <div className="ac-hero-tag">🎵 Annual Event · St. Stephen's School</div>
            <h1 className="ac-hero-h1">
              Annual<br /><span>Concert</span>
            </h1>
            <p className="ac-hero-sub">
              An enchanting evening of music, rhythm, and artistry — where every student finds their voice and the whole school celebrates together.
            </p>
            <div className="ac-hero-meta">
              <div className="ac-meta-item">
                <div className="ac-meta-icon">📍</div>
                <div>
                  <div className="ac-meta-label">Venue</div>
                  <div style={{ fontWeight: 700 }}>School Auditorium</div>
                </div>
              </div>
            </div>
            <div className="ac-hero-btns">
              <a href="/donate" className="ac-btn-gold">Support Student Talent</a>
            </div>
          </div>

          <div className="ac-hero-visual">
            <div className="ac-rotating-gallery">
              <div className="ac-rotating-gallery-inner">
                {['/k1.webp', '/k2.webp', '/k3.webp', '/k4.webp', '/k5.webp'].map((src, i) => (
                  <div key={i} className={`ac-gallery-img ac-gallery-img-${i + 1}`}>
                    <img loading="lazy" src={src} alt={`Concert performance ${i + 1}`} />
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        <div className="ac-hero-scroll">

          <div className="ac-hero-scroll-line" />
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="ac-section ac-about">
        <div className="ac-wrap">
          <div className="ac-about-grid">
            <div className="ac-about-visual">
              <div className="ac-about-collage">
                <img loading="lazy" src="/k5.webp" alt="Annual Concert Performance" className="ac-collage-img-main" />
                <img loading="lazy" src="/k6.webp" alt="Annual Concert Rehearsal" className="ac-collage-img-sec" />
              </div>
              <div className="ac-about-badge">
                <div className="ac-about-badge-num">🎵</div>
                <div className="ac-about-badge-txt">Annual Event</div>
              </div>
            </div>
            <div>
              <div className="ac-chip">About the Concert</div>
              <h2 className="ac-h2">A Night of <span>Music & Magic</span></h2>
              <p className="ac-lead">
                The Annual Concert at St. Stephen’s School has always been a grand showcase of student talent and creativity, made even more special by the presence of distinguished guests. It is one of the most anticipated events in our school calendar — a grand evening that transforms the auditorium into a stage of wonder, emotion, and artistry.
              </p>
              <div className="ac-features">
                {[
                  { icon: '🎭', h: 'All Grades Participate', p: 'From Lower Nursery to Class X, every student has a role in the concert — on stage or behind the scenes.' },
                  { icon: '🎓', h: 'Skill Building', p: 'Months of rehearsals in music, dance, and drama help students build confidence, teamwork, and discipline.' },
                  { icon: '🏡', h: 'Community Celebration', p: 'Parents, guardians, and community members come together for an evening that celebrates the spirit of St. Stephen\'s.' },
                ].map((f, i) => (
                  <div className="ac-feature" key={i}>
                    <div className="ac-feature-icon">{f.icon}</div>
                    <div>
                      <div className="ac-feature-h">{f.h}</div>
                      <div className="ac-feature-p">{f.p}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HIGHLIGHTS ── */}
      <section className="ac-section ac-highlights">
        <div className="ac-wrap">
          <div className="ac-highlights-head">
            <div className="ac-chip">What to Expect</div>
            <h2 className="ac-h2">Concert <span>Highlights</span></h2>
            <p className="ac-lead">
              From classical ragas to energetic band sets — every act is a testament to the talent within our school community.
            </p>

          </div>
          <div className="ac-cards-grid">
            {highlights.map((h, i) => (
              <div className={`ac-card ac-card-animated ${i === 1 ? 'ac-card-active' : ''}`} style={{ '--stagger': i } as React.CSSProperties} key={i}>
                <span className="ac-card-icon">{h.icon}</span>
                <h3 className="ac-card-h">{h.title}</h3>
                <p className="ac-card-p">{h.desc}</p>
                <div className="ac-card-footer">
                  <span className="ac-card-tag">{h.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>





      {/* ── FOOTER ── */}
      <footer className="footer ac-footer">
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
            <p>Nurturing young minds and shaping tomorrow's leaders since 2001.</p>
            <div className="socials">{['Facebook', 'Instagram', 'Twitter', 'YouTube'].map(s => <a key={s} href="#" className="soc-btn" title={s}>{s[0]}</a>)}</div>
          </div>
          {[
            { h: 'Quick Links', links: ['About Us', 'Programs', 'Admissions', 'News', 'Contact'] },
            { h: 'Events', links: ['Annual Concert', 'Art Exhibition', 'Eid Celebration', 'Christmas', 'Rabindra Jayanti'] },
            { h: 'Resources', links: ['Academic Calendar', 'Fee Structure', 'Scholarship', 'Downloads'] },
          ].map(col => (
            <div className="footer-col" key={col.h}>
              <div className="footer-col-h">{col.h}</div>
              <ul>{col.links.map(l => <li key={l}><a href="#">{l}</a></li>)}</ul>
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <span>© 2026 St. Stephen's School. All rights reserved.</span>
          <span>Privacy Policy · Terms of Use</span>
        </div>
      </footer>

    </div>
  );
}
