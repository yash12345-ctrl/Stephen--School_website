import React, { useState } from 'react'
import './App.css'
import ProgramTop, { programs, ProgramMegaMenu } from './program_top'
import Model3D from './model_3d'
const testimonials = [
  { name: 'Priya Sharma', role: 'Parent · Grade 10', quote: 'Greenfield transformed my daughter into a confident, curious learner. The faculty truly care about each child\'s individual growth journey.', initial: 'P', color: '#c5a880' },
  { name: 'Arjun Mehta', role: 'Alumni · Batch 2020', quote: 'The values and skills I gained here shaped who I am. I am now at IIT Bombay — a dream I owe entirely to Greenfield Academy.', initial: 'A', color: '#6b7280' },
  { name: 'Dr. Sunita Rao', role: 'Parent · Grade 8', quote: 'The STEM programs are outstanding. My son built his first robot at 13. Greenfield makes innovation accessible to every child.', initial: 'S', color: '#131a26' },
]

export default function App() {
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);

  return (
    <div className="site">

      {/* ── NAVBAR ── */}
      <nav className="navbar">
        <div className="nav-inner">
          <a href="#home" className="nav-logo">
            <span className="logo-crest">🎓</span>
            <div>
              <div className="logo-name">Greenfield</div>
              <div className="logo-tagline">ACADEMY</div>
            </div>
          </a>
          <ul className="nav-links">
            {['Home','About','Programs','Campus','News','Contact'].map(l => (
              <li 
                key={l}
                onMouseEnter={l === 'Programs' ? () => setMegaMenuOpen(true) : undefined}
                onMouseLeave={l === 'Programs' ? () => setMegaMenuOpen(false) : undefined}
                className={l === 'Programs' ? 'has-mega' : ''}
              >
                <a 
                  href={l === 'About' ? '/about' : `#${l.toLowerCase()}`}
                  onClick={(e) => {
                    if (l === 'Programs') {
                      e.preventDefault();
                      setMegaMenuOpen(!megaMenuOpen);
                    }
                  }}
                  className={l === 'Programs' ? `nav-dropdown ${megaMenuOpen ? 'active' : ''}` : ''}
                >
                  {l}
                  {l === 'Programs' && (
                    <svg className="caret" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  )}
                </a>
                {l === 'Programs' && (
                  <ProgramMegaMenu open={megaMenuOpen} />
                )}
              </li>
            ))}
          </ul>
          <a href="#contact" className="nav-cta">Apply Now →</a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero" id="home">
        <div className="hero-img" style={{backgroundImage:"url('/hero_bg.png')"}} />
        <div className="hero-veil" />
        <div className="hero-glow g1" /><div className="hero-glow g2" />
        <div className="hero-body">
          <div className="hero-pill">✦ Est. 1985 &nbsp;·&nbsp; Excellence in Education ✦</div>
          <h1 className="hero-h1">Shaping <em>Tomorrow's</em><br/>Leaders <span className="stroke-text">Today</span></h1>
          <p className="hero-p">Where academic brilliance meets character — empowering every student to reach their highest potential in a world-class learning environment.</p>
          <div className="hero-btns">
            <a href="#programs" className="btn-gold">Explore Programs</a>
            <a href="#campus" className="btn-ghost">Virtual Tour ▶</a>
          </div>
          <div className="hero-stats">
            {[['3,200+','Students'],['98%','Pass Rate'],['150+','Faculty'],['40+','Yrs Legacy']].map(([n,l],i)=>(
              <div key={i} className="hstat">
                <span className="hstat-n">{n}</span>
                <span className="hstat-l">{l}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="scroll-hint"><div className="scroll-wheel"/><span>Scroll</span></div>
      </section>

      {/* ── TICKER ── */}
      <div className="ticker">
        <span className="ticker-badge">📢 LIVE</span>
        <div className="ticker-run">
          <span>🏆 National Science Olympiad Champions 2026 &nbsp;·&nbsp; 📅 Admissions Open 2026–27 &nbsp;·&nbsp; 🎓 Annual Day — June 15 &nbsp;·&nbsp; ⚽ Inter-School Finals: We Advance! &nbsp;·&nbsp; 🔬 New STEM Lab Opening Soon &nbsp;·&nbsp; 📚 Board Results: 96% Distinction &nbsp;·&nbsp; 🏆 National Science Olympiad Champions 2026 &nbsp;·&nbsp; 📅 Admissions Open 2026–27 &nbsp;·&nbsp; 🎓 Annual Day — June 15 &nbsp;·&nbsp;</span>
        </div>
      </div>

      {/* ── ABOUT ── */}
      <section className="section about-section" id="about">
        <div className="container about-grid">
          <div className="about-imgs">
            <div className="aimg aimg-main"><img src="/library.png" alt="Library"/></div>
            <div className="aimg aimg-sec"><img src="/science_lab.png" alt="Science Lab"/></div>
            <div className="about-badge">
              <div className="ab-num">40+</div>
              <div className="ab-txt">Years of<br/>Excellence</div>
            </div>
            <div className="about-award">🏅 National Best School Award</div>
          </div>
          <div className="about-body">
            <div className="s-tag">About Us</div>
            <h2 className="s-title">A Legacy of <span className="gold">Academic Excellence</span></h2>
            <p className="s-lead">Founded in 1985, Greenfield Academy has been a beacon of quality education, nurturing over 50,000 alumni who are now leaders across the globe.</p>
            <p className="s-body">Our holistic approach combines rigorous academics with character development, producing graduates who excel in every field of human endeavour — from science and technology to arts and public service.</p>
            <div className="pillars">
              {[
                {icon:'🏅', h:'Award-Winning Faculty', p:'Nationally recognized educators dedicated to student success'},
                {icon:'🌍', h:'Global Curriculum', p:'International standards aligned with CBSE & IB frameworks'},
                {icon:'💡', h:'Innovation-Driven', p:'Cutting-edge labs, tech-enabled classrooms & maker spaces'},
              ].map((f,i)=>(
                <div className="pillar" key={i}>
                  <div className="pillar-icon">{f.icon}</div>
                  <div><div className="pillar-h">{f.h}</div><div className="pillar-p">{f.p}</div></div>
                </div>
              ))}
            </div>
            <a href="#contact" className="btn-gold">Discover Our Story</a>
          </div>
        </div>
      </section>

      {/* ── PROGRAMS ── */}
      <ProgramTop />

      {/* ── CAMPUS ── */}
      <section className="campus-sec" id="campus">
        <div className="campus-bg" style={{backgroundImage:"url('/sports_field.png')"}}/>
        <div className="campus-veil"/>
        <div className="campus-body">
          <div className="s-tag light">Campus Life</div>
          <h2 className="s-title white">A Campus That <span className="gold">Inspires</span></h2>
          <p className="campus-p">Spread across 25 acres, our world-class campus features state-of-the-art facilities designed to inspire learning, creativity and growth in every student.</p>
          <div className="campus-cards">
            {[
              {icon:'🏟️',val:'12+',lbl:'Sports Grounds'},
              {icon:'🔬',val:'8',lbl:'Science Labs'},
              {icon:'📚',val:'50K+',lbl:'Library Books'},
              {icon:'🖥️',val:'6',lbl:'Computer Labs'},
              {icon:'🎭',val:'3',lbl:'Auditoriums'},
              {icon:'🏊',val:'2',lbl:'Swimming Pools'},
            ].map((c,i)=>(
              <div className="cc" key={i}>
                <span className="cc-icon">{c.icon}</span>
                <span className="cc-val">{c.val}</span>
                <span className="cc-lbl">{c.lbl}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="section testi-section">
        <div className="container">
          <div className="sec-head">
            <div className="s-tag">Community Voices</div>
            <h2 className="s-title">Trusted by <span className="gold">Thousands</span> of Families</h2>
          </div>
          <div className="testi-grid">
            {testimonials.map((t,i)=>(
              <div className="testi-card" key={i}>
                <div className="testi-quote-mark">❝</div>
                <p className="testi-text">{t.quote}</p>
                <div className="testi-stars">★★★★★</div>
                <div className="testi-author">
                  <div className="testi-av" style={{background:`linear-gradient(135deg,${t.color},${t.color}88)`}}>{t.initial}</div>
                  <div><div className="testi-name">{t.name}</div><div className="testi-role">{t.role}</div></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWS ── */}
      <section className="section news-section" id="news">
        <div className="container">
          <div className="sec-head">
            <div className="s-tag">Latest Updates</div>
            <h2 className="s-title">News & <span className="gold">Events</span></h2>
          </div>
          <div className="news-grid">
            {[
              {tag:'🏆 Achievement',date:'May 20, 2026',h:'Students Win National Science Olympiad',p:'Our team of 5 brought home gold at the 2026 National Science Olympiad held in New Delhi.',hot:true},
              {tag:'📅 Event',date:'June 15, 2026',h:'Annual Day Celebration 2026',p:'Join us for a grand evening of performances, award ceremonies and cultural showcases across all grades.',hot:false},
              {tag:'📋 Admissions',date:'May 1, 2026',h:'Admissions Open for 2026–27',p:'Applications now open for all grades. Early registrations receive priority slots and scholarship consideration.',hot:false},
            ].map((n,i)=>(
              <div className={`news-card${n.hot?' news-hot':''}`} key={i}>
                {n.hot && <div className="news-ribbon">Featured</div>}
                <div className="news-tag">{n.tag}</div>
                <div className="news-date">📅 {n.date}</div>
                <h3 className="news-h">{n.h}</h3>
                <p className="news-p">{n.p}</p>
                <a href="#" className="news-link">Read Full Story →</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section">
        <div className="cta-glow"/>
        <div className="cta-body">
          <div className="cta-badge">🎓 Admissions Open 2026–27</div>
          <h2 className="cta-h">Begin Your Child's <span className="gold">Journey</span> with Us</h2>
          <p className="cta-p">Join thousands of families who trust Greenfield Academy for a world-class, values-driven education that lasts a lifetime.</p>
          <div className="cta-btns">
            <a href="#contact" className="btn-gold large">Apply for Admission</a>
            <a href="tel:+911234567890" className="btn-ghost large">📞 Call Us</a>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section className="section contact-section" id="contact">
        <div className="container contact-grid">
          <div className="contact-info">
            <div className="s-tag">Contact Us</div>
            <h2 className="s-title">We'd Love to <span className="gold">Hear</span> From You</h2>
            <p className="s-body" style={{marginBottom:'2.5rem'}}>Have questions about admissions, programs, or campus life? Our friendly team is ready to help every step of the way.</p>
            {[
              {icon:'📍',lbl:'Address',val:'42 Knowledge Park, Sector 12, New Delhi – 110045'},
              {icon:'📞',lbl:'Phone',val:'+91 12345 67890'},
              {icon:'✉️',lbl:'Email',val:'info@greenfieldacademy.edu.in'},
              {icon:'🕐',lbl:'Office Hours',val:'Monday – Saturday: 8:00 AM – 4:00 PM'},
            ].map((d,i)=>(
              <div className="ci" key={i}>
                <div className="ci-icon">{d.icon}</div>
                <div><div className="ci-lbl">{d.lbl}</div><div className="ci-val">{d.val}</div></div>
              </div>
            ))}
          </div>
          <form className="contact-form" onSubmit={e=>e.preventDefault()}>
            <div className="form-head">Send Us a Message</div>
            <div className="form-row">
              <div className="fg"><label>Parent / Guardian Name</label><input type="text" placeholder="Your full name"/></div>
              <div className="fg"><label>Phone Number</label><input type="tel" placeholder="+91 00000 00000"/></div>
            </div>
            <div className="fg"><label>Email Address</label><input type="email" placeholder="your@email.com"/></div>
            <div className="fg">
              <label>Grade Applying For</label>
              <select>
                <option value="">Select grade</option>
                {['Pre-Primary','Grade 1','Grade 2','Grade 3','Grade 4','Grade 5','Grade 6','Grade 7','Grade 8','Grade 9','Grade 10','Grade 11','Grade 12'].map(g=><option key={g}>{g}</option>)}
              </select>
            </div>
            <div className="fg"><label>Message</label><textarea rows={4} placeholder="Your questions or message..."/></div>
            <button type="submit" className="btn-gold full">Send Message 🚀</button>
          </form>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo"><span className="logo-crest">🎓</span><div><div className="logo-name">Greenfield</div><div className="logo-tagline">ACADEMY</div></div></div>
            <p>Nurturing young minds and shaping tomorrow's leaders since 1985. A tradition of excellence, a promise of a better future.</p>
            <div className="socials">{['Facebook','Instagram','Twitter','YouTube'].map(s=><a key={s} href="#" className="soc-btn" title={s}>{s[0]}</a>)}</div>
          </div>
          {[
            {h:'Quick Links',links:['About Us','Programs','Admissions','Faculty','Alumni','Careers']},
            {h:'Academics',links:['Pre-Primary','Primary School','Middle School','Senior Secondary','Sports & Arts','Digital Skills']},
            {h:'Resources',links:['Academic Calendar','Exam Schedule','Fee Structure','Scholarship','Downloads','Contact']},
          ].map(col=>(
            <div className="footer-col" key={col.h}>
              <div className="footer-col-h">{col.h}</div>
              <ul>{col.links.map(l=><li key={l}><a href="#">{l}</a></li>)}</ul>
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <span>© 2026 Greenfield Academy. All rights reserved.</span>
          <span>Privacy Policy · Terms of Use · Sitemap</span>
        </div>
      </footer>
      
      {/* ── 3D AI ASSISTANT ── */}
      <Model3D />

    </div>
  )
}
