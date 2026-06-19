import React, { useState, useEffect } from 'react';
import './about.css';
import { Award, Target, Telescope, Gem, Globe, Lightbulb, Building2, Handshake, BarChart } from 'lucide-react';
import Navbar from './Navbar';

const AnimatedBoxContent = ({ contents }: { contents: string[] }) => {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (contents.length <= 1) return;
    const interval = setInterval(() => {
      setIdx(prev => (prev + 1) % contents.length);
    }, 6000); // 6s allows time to read the slower typewriter effect
    return () => clearInterval(interval);
  }, [contents]);



  return (
    <div className="abt-mvv-slider-wrap">
      <div className="abt-mvv-text-slider">
        {contents.map((c, i) => {
          const words = c.split(' ');
          return (
            <p key={i} className={`abt-mvv-text abt-mvv-slide ${i === idx ? 'active' : ''}`}>
              {words.map((word, wIdx) => (
                <span
                  key={wIdx}
                  className="word-reveal"
                  style={{ animationDelay: i === idx ? `${wIdx * 0.1}s` : '0s' }}
                >
                  {word}{' '}
                </span>
              ))}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default function About() {



  return (
    <div className="abt-page">

      {/* ── NAVBAR ── */}
      <Navbar initialVariant="about" />

      {/* ── SPLIT HERO ── */}
      <section className="abt-hero">
        <div className="abt-hero-left">
          <span className="abt-hero-label">About St. Stephen's School</span>
          <h1 className="abt-hero-h1">Spreading the Power of <span className="abt-accent">Education</span> to All</h1>
          <p className="abt-hero-p">An NGO-based secondary school in Bowbazar, Kolkata, dedicated to bringing social and economic transformation for underprivileged children since 2001.</p>
          <div className="abt-hero-counters">
            {[
              { num: '20+', label: 'Years' },
              { num: '500', label: 'Students' },
              { num: 'Nursery - X', label: 'Grades' },
              { num: '100%', label: 'NGO Commitment' },
            ].map((c, i) => (
              <div className="abt-counter" key={i}>
                <span className="abt-counter-num">{c.num}</span>
                <span className="abt-counter-label">{c.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="abt-hero-right">
          <div className="abt-hero-img-stack">
            <img loading="lazy" src="/st_stephen_group_2.webp" alt="St. Stephen's School Community" className="abt-hero-img1" />
            <img loading="lazy" src="/st_stephen_group_1.webp" alt="St. Stephen's School Group" className="abt-hero-img2" />

          </div>
        </div>
      </section>

      {/* ── QUOTE BANNER ── */}
      <div className="abt-quote-banner">
        <div className="abt-quote-inner">
          <span className="abt-quote-mark">❝</span>
          <blockquote className="abt-quote-text">We envision bringing social and economic transformation by educating the less fortunate and underprivileged children of Kolkata.</blockquote>
          <cite className="abt-quote-cite">— St. Stephen's School Mission</cite>
        </div>
      </div>

      {/* ── OUR STORY (editorial style) ── */}
      <section className="abt-section">
        <div className="abt-wrap">
          <div className="abt-editorial">
            <div className="abt-editorial-images">
              <img loading="lazy" src="/k1.webp" alt="St. Stephen's School – Empowering Students" />
              <img loading="lazy" src="/k2.webp" alt="St. Stephen's School – Community Impact" />
              <img loading="lazy" src="/k3.webp" alt="St. Stephen's School – Interactive Learning" />
              <img loading="lazy" src="/k4.webp" alt="St. Stephen's School – Classroom Activities" />
            </div>
            <div className="abt-editorial-content">
              <h2 className="abt-section-h2">Our Story: Empowering the <span className="abt-accent">Underprivileged</span></h2>
              <div className="abt-editorial-text">
                <p className="abt-text-lg">St Stephen's School is an NGO based school situated in Bowbazar, Kolkata, founded in 2001 with a core vision to bring social and economic transformation.</p>
                <p className="abt-text">What started with a small group of children now supports 500 students on its rolls. Our school provides opportunities through education to some of the most vulnerable children from the streets and slums of our locality, ensuring they receive the support they need to break the cycle of poverty.</p>
                <p className="abt-text">Most of our children are first-generation learners and their parents fall in the extremely low income brackets. We introduce ourselves as a secondary school from class Lower Nursery to class X following the Madhyamik syllabus, delivering quality education without any discrimination.</p>
                <p className="abt-text">What hasn't changed since our founding in 2001 is our core promise: <strong>we believe in spreading the power of education amongst all, providing a bright future for every child in our community.</strong></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MISSION / VISION / VALUES — Premium Cards ── */}
      <section className="abt-section abt-mvv-bg">
        <div className="abt-mvv-blob1" />
        <div className="abt-mvv-blob2" />
        <div className="abt-wrap" style={{ position: 'relative', zIndex: 2 }}>
          <div className="abt-center-head">
            <span className="abt-chip">What Drives Us</span>
            <h2 className="abt-section-h2">Mission, Vision & <span className="abt-accent">Core Values</span></h2>
          </div>
          <div className="abt-mvv-grid">
            {[
              {
                icon: <Target size={36} />, title: 'Our Mission', color1: '#11998e', color2: '#38ef7d', shadow: 'rgba(17,153,142,0.25)', light: 'rgba(17,153,142,0.1)', texts: [
                  'To provide a haven where everyone is valued and all staff, in partnership with parents and families, is committed to doing what it takes for students to achieve academic success, as guided by state standards.',
                  'To provide a haven where everyone is valued and all staff, in partnership with parents and families, is committed to doing what it takes for students to achieve academic success, as guided by state standards.'
                ]
              },
              {
                icon: <Telescope size={36} />, title: 'Our Vision', color1: '#4776e6', color2: '#8e54e9', shadow: 'rgba(71,118,230,0.25)', light: 'rgba(71,118,230,0.1)', texts: [
                  'To build strong, positive connections with students privileged and under-privileged, so they can achieve independence, confidence and academic knowledge.',
                  'To build strong, positive connections with students privileged and under-privileged, so they can achieve independence, confidence and academic knowledge.'
                ]
              },
              {
                icon: <Gem size={36} />, title: 'Our Values', color1: '#C9A84C', color2: '#F0C96B', shadow: 'rgba(201,168,76,0.25)', light: 'rgba(201,168,76,0.1)', texts: [
                  'Compassion, Inclusivity, and Equality. We are committed to delivering our services without discrimination of any form.',
                  'Community Service, Integrity, and Resilience. We believe in uplifting families and supporting low-income brackets.',
                  'Holistic Growth, Mutual Respect, and Lifelong Empowerment. Supporting first-generation learners in their educational journey.'
                ]
              },
            ].map((m, i) => (
              <div className="abt-mvv-card" key={i} style={{
                '--mvv-gradient': `linear-gradient(135deg, ${m.color1}, ${m.color2})`,
                '--mvv-shadow': m.shadow,
                '--mvv-light': m.light
              } as React.CSSProperties}>
                <div className="abt-mvv-icon-wrap">{m.icon}</div>
                <h3 className="abt-mvv-title">{m.title}</h3>
                <AnimatedBoxContent contents={m.texts} />
                <div className="abt-mvv-watermark">{m.icon}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY ST. STEPHEN'S — bento grid ── */}
      <section className="abt-section">
        <div className="abt-wrap">
          <div className="abt-center-head">
            <span className="abt-chip">Our Core Strengths</span>
            <h2 className="abt-section-h2">What Sets Us <span className="abt-accent">Apart</span></h2>
            <p className="abt-subdesc">A deep commitment to social transformation and child development.</p>
          </div>
          <div className="abt-section-3d-wrapper">
            <div className="abt-bento-3d-scene">
              <div className="abt-bento-carousel">
                {[
                  {
                    img: '/k1.webp', icon: <Award size={32} />, title: 'Dedicated Faculty',
                    desc: 'Compassionate educators specializing in supporting first-generation learners, helping them adapt and thrive in an academic setup.',
                    colors: { bg: 'rgba(201,168,76,0.12)', color: '#C9A84C', shadow: 'rgba(201,168,76,0.25)', grad: 'radial-gradient(circle at right, rgba(201,168,76,0.08), transparent 60%)' }
                  },
                  {
                    img: '/k2.webp', icon: <Globe size={32} />, title: 'Madhyamik Syllabus',
                    desc: 'A structured secondary school curriculum from class Lower Nursery to class X, fully aligned with the West Bengal Madhyamik board.',
                    colors: { bg: 'rgba(71,118,230,0.12)', color: '#4776e6', shadow: 'rgba(71,118,230,0.25)', grad: 'radial-gradient(circle at right, rgba(71,118,230,0.08), transparent 60%)' }
                  },
                  {
                    img: '/k3.webp', icon: <Lightbulb size={32} />, title: 'Interactive Clubs',
                    desc: 'Focusing on sports, art, and social work to discover and nurture creative talent and physical health beyond textbooks.',
                    colors: { bg: 'rgba(255,152,0,0.12)', color: '#FF9800', shadow: 'rgba(255,152,0,0.25)', grad: 'radial-gradient(circle at right, rgba(255,152,0,0.08), transparent 60%)' }
                  },
                  {
                    img: '/k4.webp', icon: <Building2 size={32} />, title: 'Bowbazar Location',
                    desc: 'Conveniently situated in Bowbazar, Kolkata, serving underprivileged families in our surrounding local street and slum areas.',
                    colors: { bg: 'rgba(76,175,80,0.12)', color: '#4CAF50', shadow: 'rgba(76,175,80,0.25)', grad: 'radial-gradient(circle at right, rgba(76,175,80,0.08), transparent 60%)' }
                  },
                  {
                    img: '/k5.webp', icon: <Handshake size={32} />, title: 'Inclusive Service',
                    desc: 'We are committed to delivering educational service to all communities of Kolkata without any discrimination of any form.',
                    colors: { bg: 'rgba(156,39,176,0.12)', color: '#9C27B0', shadow: 'rgba(156,39,176,0.25)', grad: 'radial-gradient(circle at right, rgba(156,39,176,0.08), transparent 60%)' }
                  },
                  {
                    img: '/k6.webp', icon: <BarChart size={32} />, title: 'NGO Foundation',
                    desc: 'A non-profit educational institution providing low-cost or free opportunities for children in low-income brackets.',
                    colors: { bg: 'rgba(33,150,243,0.12)', color: '#2196F3', shadow: 'rgba(33,150,243,0.25)', grad: 'radial-gradient(circle at right, rgba(33,150,243,0.08), transparent 60%)' }
                  },
                ].map((p, i) => (
                  <div
                    className="abt-bento-card-3d"
                    key={i}
                    style={{
                      '--bg-img': `url(${p.img})`,
                      '--card-grad': p.colors.grad,
                      '--card-shadow': p.colors.shadow,
                      '--icon-bg': p.colors.bg,
                      '--icon-color': p.colors.color,
                      '--i': i
                    } as React.CSSProperties}
                  >
                    <div className="abt-bento-icon-wrap">{p.icon}</div>
                    <div className="abt-bento-content">
                      <h3 className="abt-bento-h">{p.title}</h3>
                      <p className="abt-bento-p">{p.desc}</p>
                    </div>
                    <div className="abt-bento-watermark">{p.icon}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VERTICAL TIMELINE ── */}
      <section className="abt-section abt-tl-bg">
        <div className="abt-wrap">
          <div className="abt-center-head">
            <span className="abt-chip light">Our Journey</span>
            <h2 className="abt-section-h2 white">Key <span className="abt-accent">Milestones</span></h2>
          </div>
          <div className="abt-vertical-tl">
            {[
              { year: '2001', title: 'School Founded', desc: 'St. Stephen\'s School starts in Bowbazar, Kolkata, serving underprivileged street and slum children.' },
              { year: '2006', title: 'Extracurricular Launch', desc: 'Introduced the first interactive clubs focusing on sports, art, and social work.' },
              { year: '2012', title: 'Syllabus Alignment', desc: 'Full secondary curriculum implementation following the Madhyamik syllabus.' },
              { year: '2018', title: 'Expanding Outreach', desc: 'Expanded support structure for first-generation learners and low-income families.' },
              { year: '2022', title: '400+ Students', desc: 'Reached a milestone of over 400 active students on our rolls.' },
              { year: '2026', title: 'NGO Celebration', desc: 'Now serving 500 students, spreading the power of education without discrimination.' },
            ].map((m, i) => (
              <div className={`abt-tl-row ${i % 2 !== 0 ? 'abt-tl-alt' : ''}`} key={i}>
                <div className="abt-tl-side">{m.year}</div>
                <div className="abt-tl-dot-wrap"><div className="abt-tl-dot" /></div>
                <div className="abt-tl-content">
                  <h4 className="abt-tl-h">{m.title}</h4>
                  <p className="abt-tl-p">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LEADERSHIP ── */}
      <section className="abt-section">
        <div className="abt-wrap">
          <div className="abt-center-head">
            <span className="abt-chip">Leadership</span>
            <h2 className="abt-section-h2">Meet Our <span className="abt-accent">Leaders</span></h2>
          </div>
          <div className="abt-leaders-tree">
            <svg className="abt-tree-svg" width="100%" height="100%">
              {/* Base Connections */}
              <line x1="50%" y1="50%" x2="15%" y2="12.5%" className="abt-tree-line" />
              <line x1="50%" y1="50%" x2="85%" y2="12.5%" className="abt-tree-line" />
              <line x1="50%" y1="50%" x2="15%" y2="37.5%" className="abt-tree-line" />
              <line x1="50%" y1="50%" x2="85%" y2="37.5%" className="abt-tree-line" />
              <line x1="50%" y1="50%" x2="15%" y2="62.5%" className="abt-tree-line" />
              <line x1="50%" y1="50%" x2="85%" y2="62.5%" className="abt-tree-line" />
              <line x1="50%" y1="50%" x2="50%" y2="85%" className="abt-tree-line" />

              {/* Glowing Data Packets */}
              <line x1="50%" y1="50%" x2="15%" y2="12.5%" className="abt-tree-packet" style={{ animationDelay: '0s' }} />
              <line x1="50%" y1="50%" x2="85%" y2="12.5%" className="abt-tree-packet" style={{ animationDelay: '1.2s' }} />
              <line x1="50%" y1="50%" x2="15%" y2="37.5%" className="abt-tree-packet" style={{ animationDelay: '2.5s' }} />
              <line x1="50%" y1="50%" x2="85%" y2="37.5%" className="abt-tree-packet" style={{ animationDelay: '0.8s' }} />
              <line x1="50%" y1="50%" x2="15%" y2="62.5%" className="abt-tree-packet" style={{ animationDelay: '1.6s' }} />
              <line x1="50%" y1="50%" x2="85%" y2="62.5%" className="abt-tree-packet" style={{ animationDelay: '0.4s' }} />
              <line x1="50%" y1="50%" x2="50%" y2="85%" className="abt-tree-packet" style={{ animationDelay: '2.0s' }} />
            </svg>

            <div className="abt-tree-center">
              <div className="abt-tree-center-img" />
              <div className="abt-tree-ring abt-tree-ring-1" />
              <div className="abt-tree-ring abt-tree-ring-2" />
              <div className="abt-tree-ring abt-tree-ring-3" />
              <div className="abt-tree-center-label">St. Stephen's Core</div>
            </div>

            {[
              { name: 'Imran Zaki', role: 'Hony. Secretary', img: '/v9.webp', color: '#C9A84C', desc: 'Dedicated leader committed to the social and economic transformation of underprivileged children in Kolkata.' },
              { name: 'Ayesha Siddiqui', role: 'HeadMistress', img: '/v10.webp', color: '#7c6b99', desc: 'Experienced educator guiding the academic excellence and holistic development of every student at St. Stephen\'s.' },
              { name: 'Ajay Paul', role: 'Administrator & Advisory Board', img: '/v33.webp', color: '#2d6a6a', desc: 'Overseeing school operations and providing strategic advisory support to strengthen the institution\'s mission.' },
              { name: 'Rajesh Arora', role: 'Advisory Board', img: '/v34.webp', color: '#5a4a7a', desc: 'Providing expert guidance and community leadership to support St. Stephen\'s long-term educational goals.' },
              { name: 'Rehan Misbah', role: 'Advisory Board', img: '/v35.webp', color: '#8e54e9', desc: 'Advising on strategic initiatives and community engagement to foster continuous growth and excellence.' },
              { name: 'Rajender Singh', role: 'Advisory Board', img: '/v36.webp', color: '#11998e', desc: 'Leveraging extensive experience to guide institutional policies and promote educational advancement.' },
              { name: 'Asif Iqbal', role: 'Advisory Board', img: '/v37.webp', color: '#f45c43', desc: 'Contributing valuable insights to ensure the school\'s vision aligns with modern educational standards.' },
            ].map((l, i) => (
              <div className={`abt-tree-card node-${i} ${i === 6 ? 'center-node' : (i % 2 === 0 ? 'left-node' : 'right-node')}`} key={i} style={{ '--leader-color': l.color } as React.CSSProperties}>
                <div className="abt-tree-card-img" style={{ backgroundImage: `url(${l.img})` }} />
                <div className="abt-tree-card-info">
                  <span className="abt-tree-role">{l.role}</span>
                  <h4 className="abt-tree-name">{l.name}</h4>
                  <p className="abt-tree-desc">{l.desc}</p>
                </div>
              </div>
            ))}
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
            <div className="socials">{['Facebook', 'Instagram', 'Twitter', 'YouTube'].map(s => <a key={s} href="#" className="soc-btn" title={s}>{s[0]}</a>)}</div>
          </div>
          {[
            { h: 'Quick Links', links: ['About Us', 'Programs', 'Admissions', 'Faculty', 'Alumni', 'Careers'] },
            { h: 'Academics', links: ['Pre-Primary', 'Primary School', 'Middle School', 'Senior Secondary', 'Sports & Arts', 'Digital Skills'] },
            { h: 'Resources', links: ['Academic Calendar', 'Exam Schedule', 'Fee Structure', 'Scholarship', 'Downloads', 'Contact'] },
          ].map(col => (
            <div className="footer-col" key={col.h}>
              <div className="footer-col-h">{col.h}</div>
              <ul>{col.links.map(l => <li key={l}><a href="#">{l}</a></li>)}</ul>
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <span>© 2026 St. Stephen's School. All rights reserved.</span>
          <span>Privacy Policy · Terms of Use · Sitemap</span>
        </div>
      </footer>
    </div>
  );
}
