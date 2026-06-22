import { useState, } from 'react';
import './App.css';
import './annual_picnic.css';
import { Star, Sparkles } from 'lucide-react';
import Navbar from './Navbar';

export default function AnnualPicnic() {

  // Interactive Activity Explorer State
  const [activeTab, setActiveTab] = useState('games');
  const [tabFade, setTabFade] = useState(false);




  const activities = {
    games: {
      title: "Friendly Tournaments & Games",
      desc: "From classic tug-of-war and sack races to exciting cricket and badminton matches, the spacious greens of Eco Park turn into a arena of laughter, teamwork, and healthy competition.",
      bullet: "Builds teamwork & confidence",
      image: "/y15.png"
    },
    magic: {
      title: "INTERACTIVE CLUB",
      desc: "The Interactive Club spearheads a commendable endeavor: the Paper Bag Distribution Initiative. Its purpose is to foster sustainability and environmental consciousness within our school and community.",
      bullet: "Encourages creative imagination",
      image: "/y16.png"
    },
    feast: {
      title: "Summer Camp",
      desc: "Summer Camp organised for students of Class IV from 19th to 21st May by Mr. Ajoy Paul.",
      bullet: "Prepared with love",
      image: "/y12.png"
    },
    music: {
      title: "Music & Jam Sessions",
      desc: "The eighth Annual Concert of St. Stephen's School took place in the auditorium of Mahajati Sadan on February 8, 2023. It included one of our school students' best interpretations with a group effort.",
      bullet: "Fosters self-expression",
      image: "/y17.png"
    }
  };






  const handleTabChange = (tabKey: string) => {
    if (tabKey === activeTab) return;
    setTabFade(true);
    setTimeout(() => {
      setActiveTab(tabKey);
      setTabFade(false);
    }, 300);
  };


  return (
    <div className="pk-page">
      {/* ── NAVBAR ── */}
      <Navbar initialVariant="about" />

      {/* ── HERO ── */}
      <section className="pk-hero">
        <div className="pk-hero-bg" style={{ backgroundImage: "url('/annual_picnic_hero.webp')" }} />
        <div className="pk-hero-veil" />

        <div className="pk-hero-inner">
          <div className="pk-hero-tag">
            <Star size={14} className="gold-star animate-pulse" /> Annual Recreation Outing · St. Stephen's School
          </div>
          <h1 className="pk-hero-h1">
            Annual School<span> Picnic</span>
          </h1>
          <p className="pk-hero-sub">
            A joy-filled day of sunlit outdoor games, puppet theatres, fresh open-air food, and school choir jam sessions at Eco Park, Rajarhat.
          </p>



          <div className="pk-hero-btns">
            <a href="#activities" className="pk-btn-gold">Explore Activities</a>
          </div>
        </div>


      </section>

      {/* ── ABOUT SECTION ── */}
      <section className="pk-section pk-about" id="about">
        <div className="pk-wrap">
          <div className="pk-about-grid">
            <div className="pk-about-visual">
              <div className="pk-about-collage">
                <img loading="lazy" src="/y3.png" alt="Happy Picnic Group" className="pk-collage-img-main" />
                <img loading="lazy" src="/y4.png" alt="Students Playing Tug of War" className="pk-collage-img-sec" />
              </div>
              <div className="pk-about-badge">
                <div className="pk-about-badge-num">🌳</div>
                <div className="pk-about-badge-txt">Eco Outing</div>
              </div>
            </div>
            <div>
              <div className="pk-chip">Outdoor Recreation</div>
              <h2 className="pk-h2">A Breath of Fresh Air & <span>Joy</span></h2>
              <p className="pk-lead">
                For the first-generation learners of St. Stephen's School, the Annual Picnic is a precious escape. It is a day where lessons move outside textbooks into open playgrounds, giving kids memories to cherish all year.
              </p>
              <p className="pk-body">
                Each year, we transport all 500+ students from Bowbazar to scenic locations in Kolkata. We provide transport, food, sports equipment, and entertainment free of charge, ensuring that every child gets to participate and smile.
              </p>
              <div className="pk-about-stats">
                <div className="pk-stat">
                  <span className="pk-stat-num">500+</span>
                  <span className="pk-stat-lbl">Students Joined</span>
                </div>
                <div className="pk-stat">
                  <span className="pk-stat-num">100%</span>
                  <span className="pk-stat-lbl">Free for Children</span>
                </div>
                <div className="pk-stat">
                  <span className="pk-stat-num">Eco</span>
                  <span className="pk-stat-lbl">Park Venue</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── INTERACTIVE EXPLORER SECTION ── */}
      <section className="pk-section pk-interactive" id="activities">
        <div className="pk-wrap">
          <div className="text-center" style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <div className="pk-chip">Picnic Explorer</div>
            <h2 className="pk-h2">Day of <span>Fun & Bonding</span></h2>
            <p className="pk-lead" style={{ maxWidth: '600px', margin: '0 auto' }}>
              Explore the key attractions of our annual picnic day out. Click on the tabs below to read about each detail.
            </p>
          </div>

          <div className="pk-selector-tabs">
            {[
              { id: 'games', label: 'Sports & Games', icon: '⚽' },
              { id: 'magic', label: 'Activities', icon: '🪄' },
              { id: 'feast', label: 'Summer Camp', icon: '🍛' },
              { id: 'music', label: 'Music Show', icon: '🎸' }
            ].map(tab => (
              <button
                key={tab.id}
                className={`pk-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => handleTabChange(tab.id)}
              >
                <span>{tab.icon}</span> {tab.label}
              </button>
            ))}
          </div>

          <div className="pk-tab-content-panel">
            <div className={`pk-tab-grid ${tabFade ? 'fade-out' : ''}`}>
              <div className="pk-tab-img-wrap">
                <img loading="lazy" src={activities[activeTab as keyof typeof activities].image} alt={activities[activeTab as keyof typeof activities].title} />
              </div>
              <div className="pk-tab-text">
                <h3>{activities[activeTab as keyof typeof activities].title}</h3>
                <p className="pk-tab-desc">{activities[activeTab as keyof typeof activities].desc}</p>
                <div className="pk-tab-bullet">
                  <Sparkles size={16} />
                  <span>{activities[activeTab as keyof typeof activities].bullet}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>






      {/* ── FOOTER ── */}
      <footer className="footer pk-footer">
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
