import React, { useState, useEffect } from 'react';
import './App.css';
import './annual_concert.css';
import { ProgramMegaMenu } from './program_top';
import { Music, Mic, Drum, Flame, Trophy, Theater } from 'lucide-react';

export default function AnnualConcert() {
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const closeTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isPlayingMelody, setIsPlayingMelody] = useState(false);

  const playClassicalMelody = () => {
    if (isPlayingMelody) return;
    setIsPlayingMelody(true);

    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();

      // C Major, F Major, G Major, A Minor
      const chords = [
        [261.63, 329.63, 392.00, 523.25], // C Maj
        [349.23, 440.00, 523.25, 698.46], // F Maj
        [392.00, 493.88, 587.33, 783.99], // G Maj
        [440.00, 523.25, 659.25, 880.00]  // A Min
      ];

      const duration = 10;
      const noteLength = 0.18; // fast arpeggios
      let startTime = ctx.currentTime;

      // We will pick a random chord progression.
      const shuffledChords = [...chords].sort(() => Math.random() - 0.5);

      for (let i = 0; i < duration / noteLength; i++) {
        const chord = shuffledChords[Math.floor((i / 8)) % shuffledChords.length];

        // Add random variation to note order to make every click unique
        const isRandom = Math.random() > 0.5;
        const noteIndex = isRandom ? Math.floor(Math.random() * chord.length) : (i % chord.length);
        const freq = chord[noteIndex];

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime + i * noteLength);

        // Soft piano/harp envelope
        gain.gain.setValueAtTime(0, startTime + i * noteLength);
        gain.gain.linearRampToValueAtTime(0.4, startTime + i * noteLength + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + i * noteLength + noteLength * 3);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime + i * noteLength);
        osc.stop(startTime + i * noteLength + noteLength * 3.5);
      }

      setTimeout(() => setIsPlayingMelody(false), duration * 1000);
    } catch (e) {
      console.log('Audio not supported', e);
      setIsPlayingMelody(false);
    }
  };


  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const playNote = (index: number) => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const audioCtx = new AudioContext();

      // Main oscillator
      const osc1 = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      // Sub oscillator for richness
      const osc2 = audioCtx.createOscillator();

      // Pentatonic scale: C4, D4, E4, G4, A4, C5
      const frequencies = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25];
      const freq = frequencies[index % frequencies.length];

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(freq, audioCtx.currentTime);

      osc2.type = 'triangle'; // adds warm harmonics
      osc2.frequency.setValueAtTime(freq / 2, audioCtx.currentTime); // one octave lower

      // Envelope - much louder peak
      gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.7, audioCtx.currentTime + 0.03); // Fast attack, higher volume
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 2.0); // Longer decay

      osc1.connect(gainNode);
      osc2.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      osc1.start(audioCtx.currentTime);
      osc2.start(audioCtx.currentTime);
      osc1.stop(audioCtx.currentTime + 2.0);
      osc2.stop(audioCtx.currentTime + 2.0);
    } catch (e) {
      console.log('Audio not supported');
    }
  };

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
      <nav className={`navbar navbar--about${scrolled ? ' navbar--fixed' : ''}`}>
        <div className="nav-inner">
          <a href="/" className="nav-logo">
            <div className="logo-crest-wrapper">
              <img loading="lazy" src="/v2.webp" className="logo-crest-img" alt="St. Stephen's Crest" />
            </div>
            <div>
              <div className="logo-name">St. Stephen's</div>
              <div className="logo-tagline">SCHOOL</div>
            </div>
          </a>
          <ul className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
            {['Home', 'About', 'Programs', 'School', 'News', 'Gallery'].map(l => (
              <li
                key={l}
                onMouseEnter={l === 'Programs' ? () => { if (closeTimer.current) clearTimeout(closeTimer.current); setMegaMenuOpen(true); } : undefined}
                onMouseLeave={l === 'Programs' ? () => { closeTimer.current = setTimeout(() => setMegaMenuOpen(false), 200); } : undefined}
                className={l === 'Programs' ? 'has-mega' : ''}
              >
                <a
                  href={
                    l === 'Home' ? '/' :
                      l === 'About' ? '/about' :
                        l === 'News' ? '/news' :
                          l === 'Programs' ? '/#programs' :
                            `/#${l.toLowerCase()}`
                  }
                  onClick={() => setMobileMenuOpen(false)}
                  className={l === 'Programs' ? `nav-dropdown ${megaMenuOpen ? 'active' : ''}` : ''}
                >
                  {l}
                  {l === 'Programs' && (
                    <svg className="caret" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  )}
                </a>
                {l === 'Programs' && <ProgramMegaMenu open={megaMenuOpen} onClose={() => setMegaMenuOpen(false)} />}
              </li>
            ))}
            <li className="mobile-only-nav-apply"><a href="/donate">Donate</a></li>
          </ul>
          <div className="nav-actions">
            <a href="/donate" className="nav-cta">Donate Now →</a>
            <div className={`mobile-toggle ${mobileMenuOpen ? 'active' : ''}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <span></span><span></span><span></span>
            </div>
          </div>
        </div>
      </nav>

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
            <div className="premium-record-player">
              <div className="prp-ambient-glow"></div>

              {/* Expanding soundwaves */}
              <div className="prp-waves">
                <div className="prp-wave wave-1"></div>
                <div className="prp-wave wave-2"></div>
                <div className="prp-wave wave-3"></div>
              </div>

              {/* The Glass Record */}
              <div className="prp-record">
                <div className="prp-record-shadow"></div>
                <div className="prp-record-glass"></div>
                <div className="prp-record-grooves"></div>
                <div className="prp-record-label">
                  <div className="prp-label-inner"></div>
                  <div className="prp-spindle"></div>
                </div>
              </div>

              {/* The Tonearm */}
              <div className="prp-tonearm">
                <div className="prp-arm-base"><div className="prp-base-ring"></div></div>
                <div className="prp-arm-rod">
                  <div className="prp-arm-head"></div>
                </div>
              </div>

              {/* Orbiting SVG Notes */}
              <div className="prp-orbit">
                <div className="prp-orbit-note note-1">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" /></svg>
                </div>
                <div className="prp-orbit-note note-2">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 3H9v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h11v8.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V3z" /></svg>
                </div>
                <div className="prp-orbit-note note-3">
                  <svg viewBox="0 0 320 512" fill="currentColor"><path d="M113.8 284c-11.3 11-18.4 26.6-18.4 43.6 0 33.3 26.9 60.3 60.1 60.3 22.8 0 42.6-12.7 52.8-31.3l-20-8.9c-6.8 12.3-19.8 20.7-34.8 20.7-22 0-39.9-18.2-39.9-40.6 0-14.7 7.7-27.4 19.3-34.6l-19.1-9.2zM277.6 195.9c0-42.3-25.6-78.5-62.9-93.5-12.5-49.3-37-102.4-86-102.4-23.7 0-46.7 13.5-46.7 39.8 0 20.7 13.9 34.4 29.4 34.4 13.8 0 26.1-9.8 26.1-25.8 0-6.9-1.9-13-4.9-17.7 5.7-4.4 13.3-6.5 21-6.5 24 0 38.6 34.6 47.9 66.8-16.7 8.3-34.6 22-48.4 39.9-20.7 26.9-30.8 59.4-27.1 92.2L116 270.8c-26.1-23.1-42.4-57.1-42.4-94.7 0-69.7 56.6-126.3 126.3-126.3 35.7 0 68 14.8 91 38.8l-15.6 13.5c-19-20.2-46.3-32.9-76.5-32.9-57.7 0-104.6 46.9-104.6 104.6 0 31.7 14.1 60.1 36.4 79.4l7 5.9-4.8 24.3c-3 15.3-4.5 31-4.5 46.8 0 35.5 8 68.7 21.6 98l-5.6 30.6c-5.7 30.7-20.4 46.5-46.8 46.5-17.4 0-33.1-9.5-41.9-24.8 6.4 1.7 13 2.5 19.8 2.5 35.2 0 63.8-28.6 63.8-63.8 0-18.8-8.2-35.8-21.2-47.5l-12.2 13.4c8.8 8.1 14.3 19.7 14.3 32.5 0 24.8-20.2 45-45 45-12.3 0-23.4-5-31.5-13.1-8.1-8.1-13.1-19.2-13.1-31.5 0-35.3 17.5-66.2 44.5-85l6.3-4.4 3.7 20.3c7.5 41.5 24.6 78 49.3 107.5 18 21.5 45.4 39.6 77.2 39.6 47.9 0 76.5-34.9 85.5-84.5l14-77.5c2.1-12 3.2-24.1 3.2-36.2 0-34.1-12.1-66-33.3-91.1l15.9-12.7c24.6 29.2 38.6 66.1 38.6 105.4 0 14.2-1.3 28.3-3.8 42.4l-14 77.5c-11.4 62.7-50.6 104-108.6 104-40.4 0-75.1-23.1-97-49.4-23.7-28.4-40.1-63.6-47.5-103.9l-3.3-18.4c-32.9 22-54.3 58.9-54.3 100.8 0 16 3.6 31 10.1 44.5 13.4 27.9 42.4 46.1 76.3 46.1 40.4 0 65.5-26 74-72.3l6.5-35.6c13-33.3 19.8-69.5 19.8-106.6 0-16.1-1.3-32.3-3.9-48.4l15.1-6.1c11.5 14.4 18.5 32.6 18.5 52.3 0 46.5-37.8 84.3-84.3 84.3-30.8 0-57.8-16.7-72.1-41.4l-17.7-8.5c18.5 36.3 56.4 60.9 100.2 60.9 61.5 0 111.4-49.9 111.4-111.4 0-25.2-8.3-48.5-22.3-67.1l16.1-11.2c16.3 21.6 26 48.3 26 77.1z" /></svg>
                </div>
              </div>

              {/* Floating Sparkles */}
              <div className="prp-sparkles">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div className="prp-sparkle" key={i} style={{ '--i': i } as React.CSSProperties}>✦</div>
                ))}
              </div>

            </div>

            <button
              className={`ac-magic-btn ${isPlayingMelody ? 'playing' : ''}`}
              onClick={playClassicalMelody}
              disabled={isPlayingMelody}
            >
              {isPlayingMelody ? '✨ Playing...' : '🎵 Listen to Magic'}
            </button>

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
            <p className="ac-magic-hint">
              ✨ To see magic, click on any box
            </p>
          </div>
          <div className="ac-cards-grid">
            {highlights.map((h, i) => (
              <div className={`ac-card ac-card-animated ${i === 1 ? 'ac-card-active' : ''}`} style={{ cursor: 'pointer', '--stagger': i } as React.CSSProperties} onClick={() => playNote(i)} key={i}>
                <span className="ac-card-icon">{h.icon}</span>
                <h3 className="ac-card-h">{h.title}</h3>
                <p className="ac-card-p">{h.desc}</p>
                <div className="ac-card-footer">
                  <span className="ac-card-tag">{h.tag}</span>
                  <span className="ac-card-play-hint">Play Note 🎵</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>




      {/* ── CTA ── */}
      <section className="ac-cta">
        <div className="ac-cta-inner">
          <h2 className="ac-cta-h">Be Part of the<br />Magic This Year</h2>
          <p className="ac-cta-p">Come watch our students shine, support our school, or help us make this year's Annual Concert our most memorable one yet.</p>
          <div className="ac-cta-btns">
            <a href="/donate" className="ac-btn-gold">Donate & Support →</a>
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
