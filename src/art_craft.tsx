
import './App.css';
import './art_craft.css';
import { MapPin, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';

export default function ArtCraftExhibition() {
        


  return (
    <div className="art-page">
      {/* ── NAVBAR ── */}
      <Navbar initialVariant="about" />

      {/* ── HERO ── */}
      <section className="art-hero">
        <div className="art-hero-bg" style={{ backgroundImage: "url('/art_exhibition_hero.webp')" }} />
        <div className="art-hero-glow g1" /><div className="art-hero-glow g2" />
        <div className="art-hero-veil" />

        <motion.div
          className="art-hero-inner"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="art-hero-tag">
            <Star size={14} className="art-meta-icon animate-pulse" /> Creative Celebration · St. Stephen's School
          </div>
          <h1 className="art-hero-h1">
            Annual Art <span>&</span><br />Craft Exhibition
          </h1>
          <p className="art-hero-sub">
            Welcome to a vibrant gallery of dreams, colors, and innovations crafted by our creative young minds in Bowbazar. Experience student paintings, sculptures, and recycled crafts.
          </p>

          <div className="art-hero-meta">
            <div className="art-meta-item">
              <MapPin size={20} className="art-meta-icon" />
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div className="art-meta-label">Venue</div>
                <div style={{ fontWeight: 700, lineHeight: '1.2' }}>School Courtyard & Main Hall</div>
              </div>
            </div>
          </div>


        </motion.div>
      </section>

      {/* ── HONORED VISITORS SECTION ── */}
      <section className="art-section art-dignitary-section">
        <div className="art-wrap">
          <div className="art-dignitary-grid">
            <div className="art-dignitary-visual" style={{ position: 'relative' }}>
              <div className="art-dignitary-visual-wrapper">
                <img loading="lazy" src="/v11.webp" alt="Consul General of Japan Visit" />
              </div>
              <div className="art-card-tag" style={{ top: 'auto', bottom: '1.5rem', left: '1.5rem', right: 'auto', background: 'rgba(255, 107, 107, 0.9)', color: '#fff' }}>
                🇯🇵 Distinguished Guest Visit
              </div>
            </div>
            <div>
              <div className="art-chip" style={{ background: 'rgba(255, 210, 0, 0.1)', color: '#ffd200' }}>Consular Appreciation</div>
              <h2 className="art-h2" style={{ fontSize: '2.25rem', lineHeight: '1.3' }}>A Witness to <span>Excellent Artistry</span></h2>
              <p className="art-lead" style={{ fontSize: '1.05rem', marginBottom: '1rem' }}>
                St. Stephen's School exhibits excellent art and craft work, which has been highly praised by national and international visitors for its creativity, color depth, and environmental consciousness.
              </p>
              <div className="art-dignitary-quote-box">
                "The exceptional talent and high-level craft techniques shown by the kids of St. Stephen's School were witnessed and celebrated by Mr. Masayuki Taga, Consul General of Japan in Kolkata, who commended the school's effort in nurturing artistic potential."
              </div>
            </div>
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
                <div className="logo-name">St. Stephen's School</div>
                <div className="logo-tagline">BOWBAZAR</div>
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
