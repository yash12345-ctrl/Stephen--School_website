import { useState } from 'react';
import './App.css';
import './educational_day_out.css';
import { MapPin, Compass, GraduationCap, BookOpen, Route } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';

export default function EducationalDayOut() {
        
  // Gallery Filter State
  const [activeCategory, setActiveCategory] = useState('all');


  
  const destinations = [
    {
      title: "A Visit to the Birla Planetarium",
      desc: "Our students visited The Birla Planetarium on 27th August, 2022. The Birla Planetarium is an iconic institution that offers interactive learning experiences on astronomy and space science.",
      category: "excursion",
      image: "/y1.png",
      image2: "/y2.png",
      tag: "Birla Planetarium",
      outcome: "Space Sciences",
      date: "Aug 27, 2022"
    },
    {
      title: "A Trip to the Indian Museum",
      desc: "Our students visited The Indian Museum on 23rd July. This offered a glimpse into the rich cultural heritage and scientific advancements of India.",
      category: "excursion",
      image: "/y3.png",
      image2: "/y4.png",
      tag: "Indian Museum",
      outcome: "Heritage Studies",
      date: "Jul 23"
    },
    {
      title: "Workshops by Interns",
      desc: "The workshops conducted on career counselling, the importance of reading books and techniques to improve public speaking skills by students of St. Xavier's College led by Aalap Roy, Riddhiraj Mukherjee and Samad Zahid.",
      category: "workshop",
      image: "/y5.png",
      image2: "/y6.png",
      tag: "St. Xavier's Interns",
      outcome: "Skill Development",
      date: "Recent"
    },
    {
      title: "Workshops at La Martiniere for Girls",
      desc: "St Stephen's students were blessed to experience the workshop held at La Martiniere for girls which was filled with fun activities.",
      category: "workshop",
      image: "/y7.png",
      image2: "/y8.png",
      tag: "La Martiniere",
      outcome: "Collaborative Learning",
      date: "Recent"
    },
    {
      title: "Workshop by YES Organisation",
      desc: "A 2 day workshop conducted by Your English Studio with the children from Class 3-6, emphasizing on English language and its use.",
      category: "workshop",
      image: "/y9.png",
      image2: "/y10.png",
      tag: "YES Organisation",
      outcome: "Language Skills",
      date: "Recent"
    },
    {
      title: "Table Manners Session",
      desc: "The table manners session conducted by Mr. Ajoy Paul proved to be a transformative experience for the students, equipping them with essential life skills and empowering them to excel in any social or professional setting.",
      category: "workshop",
      image: "/y11.png",
      image2: "/y11.png",
      tag: "Life Skills",
      outcome: "Social Etiquette",
      date: "Recent"
    },
    {
      title: "Summer Camp",
      desc: "Summer Camp organised for students of Class IV from 19th to 21st May by Mr. Ajoy Paul.",
      category: "workshop",
      image: "/y12.png",
      image2: "/y13.png",
      tag: "Class IV",
      outcome: "Skill Building",
      date: "May 19-21"
    }
  ];


  const filteredDestinations = activeCategory === 'all'
    ? destinations.filter(item => item.title !== "Summer Camp")
    : destinations.filter(item => item.category === activeCategory);

  return (
    <div className="trip-page">
      {/* ── NAVBAR ── */}
      <Navbar initialVariant="about" />

      {/* ── HERO SECTION ── */}
      <section className="trip-hero">
        <div className="trip-hero-bg" style={{ backgroundImage: "url('/educational_day_out_hero.webp')" }} />
        <div className="trip-hero-veil" />
        <Route className="trip-float-icon" style={{ top: '10%', left: '40%', width: 300, height: 300, animationDelay: '0s' }} />
        <Compass className="trip-float-icon" style={{ top: '15%', left: '10%', width: 120, height: 120, animationDelay: '1s' }} />
        <MapPin className="trip-float-icon" style={{ top: '60%', right: '8%', width: 150, height: 150, animationDelay: '2s' }} />
        <BookOpen className="trip-float-icon" style={{ bottom: '10%', left: '20%', width: 100, height: 100, animationDelay: '3s' }} />
        <GraduationCap className="trip-float-icon" style={{ top: '25%', right: '25%', width: 80, height: 80, animationDelay: '4s' }} />

        <div className="trip-hero-inner">
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}
            className="trip-chip"
          >
            <Compass size={14} style={{ marginRight: '6px', verticalAlign: 'middle', display: 'inline-block' }} /> Experiential Learning Journey
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="trip-hero-h1" style={{ maxWidth: '900px' }}
          >
            Educational<br /><span>Day Out</span>
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="trip-hero-sub"
          >
            Bringing academic concepts to life through curated excursions to Science City, astronomical planetariums, and majestic historical monuments across Kolkata.
          </motion.p>

          <motion.div
            initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5, delay: 0.3 }}
            className="trip-hero-meta"
          >
            <div className="trip-meta-item">
              <MapPin size={20} className="trip-meta-icon" />
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div className="trip-meta-label">Destinations</div>
                <div style={{ fontWeight: 700, lineHeight: '1.2' }}>Science City, Planetarium & Heritage Sites, Kolkata</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }}
            className="trip-hero-btns"
          >
            <a href="#destinations" className="trip-btn-teal">Explore Excursions</a>
            <a href="#impact" className="trip-btn-ghost">Learning Outcomes</a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1 }}
          className="trip-scroll-cue"
        >
          Scroll to Explore <span>↓</span>
        </motion.div>
      </section>

      {/* ── DESTINATIONS SECTION ── */}
      <section className="trip-section trip-gallery-section" id="destinations">
        <div className="trip-wrap">
          <div className="text-center" style={{ marginBottom: '3.5rem', textAlign: 'center' }}>
            <div className="trip-chip">Interactive Discovery</div>
            <h2 className="trip-h2">Curated <span>Excursion Gallery</span></h2>
            <p className="trip-lead" style={{ maxWidth: '600px', margin: '0 auto' }}>
              Explore the key sites visited by our students, designed to spark scientific curiosity and historic reverence.
            </p>
          </div>

          {/* Filtering Tabs */}
          <div className="trip-gallery-filters">
            {[
              { id: 'all', label: 'All Activities' },
              { id: 'excursion', label: 'Excursions' },
              { id: 'workshop', label: 'Workshops' }
            ].map(tab => (
              <button
                key={tab.id}
                className={`trip-filter-tab ${activeCategory === tab.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Destinations Grid */}
          <div className="trip-gallery-grid">
            {filteredDestinations.map((item, idx) => (
              <div className="trip-gallery-card" key={idx}>
                <div className="trip-card-img-wrap">
                  <div className="trip-card-img-container">
                    <img loading="lazy" src={item.image} alt={item.title} className="trip-card-img trip-card-img-1" style={{ animationDelay: `${idx * 0.8}s` }} />
                    <img loading="lazy" src={item.image2} alt={`${item.title} alternate`} className="trip-card-img trip-card-img-2" style={{ animationDelay: `${idx * 0.8}s` }} />
                  </div>
                  <div className="trip-card-overlay" />
                  <span className="trip-card-tag">{item.tag}</span>
                </div>
                <div className="trip-card-body">
                  <h3 className="trip-card-title">{item.title}</h3>
                  <p className="trip-card-desc">{item.desc}</p>

                  <div className="trip-card-footer">
                    <div className="trip-card-outcome">
                      <BookOpen size={16} />
                      <span>{item.outcome}</span>
                    </div>
                    <span className="trip-card-date">{item.date}</span>
                  </div>
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
