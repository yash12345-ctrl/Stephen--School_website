import React, { useEffect, useRef } from 'react';
import './program_top.css';

export const programs = [
  { grade: 'Pre-Primary & Kindergarten', range: 'Ages 3–5', emoji: '🧸', desc: 'Fostering early cognitive and social development through play-based learning and creative exploration in a safe environment.', color1: '#11998e', color2: '#38ef7d', vid: 'GLcDu24gr98' },
  { grade: 'Primary School', range: 'Grades 1–5', emoji: '📚', desc: 'Building strong foundational skills in literacy, numeracy, and critical thinking with a focus on holistic child development.', color1: '#4776e6', color2: '#8e54e9', vid: '49fgMBNbX0w' },
  { grade: 'Middle School', range: 'Grades 6–8', emoji: '🔬', desc: 'Encouraging independent thought and scientific inquiry through an accelerated, interdisciplinary STEM-focused curriculum.', color1: '#f7971e', color2: '#ffd200', vid: 'pjFFMXKb5_M' },
  { grade: 'High School', range: 'Grades 9–12', emoji: '🎓', desc: 'Comprehensive academic preparation with advanced coursework, empowering students for top-tier university admissions and success.', color1: '#eb3349', color2: '#f45c43', vid: 'j-3eArinB7E' },
  { grade: 'Global IB Diploma', range: 'Grades 11–12', emoji: '🌍', desc: 'An internationally recognized curriculum focused on global leadership, rigorous academics, and impactful community service.', color1: '#8E2DE2', color2: '#4A00E0', vid: 'GLcDu24gr98' },
  { grade: 'Athletics & The Arts', range: 'All Grades', emoji: '🏆', desc: 'Cultivating exceptional physical and creative talent with state-of-the-art sports facilities and world-class performing arts studios.', color1: '#00b09b', color2: '#96c93d', vid: '49fgMBNbX0w' },
];

/* ── Mega Menu Dropdown (used inside Navbar) ── */
export function ProgramMegaMenu({ open }: { open: boolean }) {
  return (
    <div className={`mega-menu ${open ? 'open' : ''}`}>
      <div className="mega-inner">
        <div className="mega-left">
          <div className="mega-left-tag">✦ Academic Excellence</div>
          <h3 className="mega-h3">Discover our world-class academic programs</h3>
          <p className="mega-sub">From early childhood to senior secondary — a complete educational journey tailored to every learner.</p>
          <a href="#programs" className="mega-btn">View All Programs →</a>
        </div>
        <div className="mega-right">
          <div className="mega-grid">
            {programs.map((p, idx) => (
              <a href="#programs" className="mega-card" key={idx} style={{'--mc1':p.color1,'--mc2':p.color2} as React.CSSProperties}>
                <div className="mega-card-accent"/>
                <div className="mega-card-head">
                  <span className="mega-card-icon">{p.emoji}</span>
                  <span className="mega-card-range">{p.range}</span>
                </div>
                <div className="mega-card-title">{p.grade}</div>
                <div className="mega-card-desc">{p.desc.slice(0, 80)}…</div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Programs Section (full page section) ── */
export default function ProgramTop() {
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observer.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        } else {
          entry.target.classList.remove('in-view');
        }
      });
    }, { threshold: 0.15 });

    const elements = document.querySelectorAll('.prog-card');
    elements.forEach(el => observer.current?.observe(el));

    return () => observer.current?.disconnect();
  }, []);

  return (
    <section className="section programs-section" id="programs">
      <div className="container">
        <div className="sec-head">
          <div className="s-tag">Academic Programs</div>
          <h2 className="s-title">World-Class <span className="gold">Programs</span> for Every Stage</h2>
          <p className="sec-desc">Comprehensive education from foundational years through senior secondary, unlocking every student's unique potential.</p>
        </div>
        <div className="prog-grid">
          {programs.map((p,i)=>(
            <div className={`prog-card ${i % 2 === 0 ? 'row-normal' : 'row-reverse'}`} key={i} style={{'--c1':p.color1,'--c2':p.color2} as React.CSSProperties}>
              <div className="prog-glow"/>
              <div className="prog-content-side">
                <div className="prog-top">
                  <div className="prog-emoji-wrap"><span className="prog-emoji">{p.emoji}</span></div>
                  <span className="prog-range">{p.range}</span>
                </div>
                <h3 className="prog-title">{p.grade}</h3>
                <p className="prog-desc">{p.desc}</p>
                <div className="prog-footer">
                  <a href="#contact" className="prog-link">Learn more <span>→</span></a>
                  <div className="prog-dot"/>
                </div>
              </div>
              <div className="prog-video-side">
                <div className="prog-vid-wrap">
                  <div className="vid-click-shield"></div>
                  <iframe 
                    src={`https://www.youtube.com/embed/${p.vid}?autoplay=1&mute=1&loop=1&playlist=${p.vid}&controls=0&showinfo=0&disablekb=1&modestbranding=1`} 
                    allow="autoplay; encrypted-media" 
                    tabIndex={-1}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
