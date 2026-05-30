import React, { useState, useEffect } from 'react';
import './news.css';
import { ProgramMegaMenu } from './program_top';
import { GraduationCap } from 'lucide-react';

/* ══════════════════════════════════════════
   DATA
══════════════════════════════════════════ */
type Category = 'All' | 'Achievement' | 'Event' | 'Admissions' | 'Sports' | 'Academic';

const allNews = [
  {
    id: 1, category: 'Achievement' as const,
    date: 'May 20, 2026', readTime: '4 min read',
    title: 'Students Win National Science Olympiad — Gold Medal for the Third Consecutive Year',
    excerpt: 'Our brilliant team of five brought home the gold at the 2026 National Science Olympiad held in New Delhi, beating 240 schools across India. Captain Aryan Mehta secured the highest individual score in the chemistry category, while Priya Nair swept the biology division. The school community erupted in celebration as the results came in late Friday evening.',
    image: '/science_lab.png', featured: true, hot: true,
  },
  {
    id: 2, category: 'Event' as const,
    date: 'June 15, 2026', readTime: '3 min read',
    title: 'Annual Day 2026 — A Grand Evening of 500+ Students Performing Live',
    excerpt: 'Join us for an unforgettable evening of cultural performances, award ceremonies, and student showcases. This year features a 100-piece student orchestra, dance performances spanning 12 classical and folk traditions, and the debut of our Drama Club musical. Doors open at 5:00 PM.',
    image: '/library.png', featured: false, hot: true,
  },
  {
    id: 3, category: 'Admissions' as const,
    date: 'May 1, 2026', readTime: '2 min read',
    title: 'Admissions Open for 2026–27 — Early Applicants Get Scholarship Priority',
    excerpt: 'Applications are now open for all grades from Pre-Primary to Grade 12. Early registrations receive priority slots and are automatically considered for merit scholarships worth up to ₹1,20,000 per year. The first round closes June 30th.',
    image: '/hero_bg.png', featured: false, hot: false,
  },
  {
    id: 4, category: 'Sports' as const,
    date: 'April 28, 2026', readTime: '3 min read',
    title: 'Football Team Powers Through to District Finals After 3–1 Victory',
    excerpt: "Greenfield Academy's football squad delivered a commanding performance to advance to the district finals. Striker Rohit Sharma scored twice in the second half, and goalkeeper Dev Patel made three crucial saves in what coaches are calling the team's best performance of the season.",
    image: '/sports_field.png', featured: false, hot: false,
  },
  {
    id: 5, category: 'Academic' as const,
    date: 'April 15, 2026', readTime: '3 min read',
    title: 'Board Results 2026: 96% Distinction Rate — Best in School History',
    excerpt: 'Class X and XII students achieved a record-breaking 96% distinction rate in CBSE boards this year. Topper Kavya Singh scored 499/500 in Class XII Science, and 14 students achieved perfect 100 in Mathematics. Principal Mrs. Sharma called it "a defining moment for Greenfield."',
    image: '/library.png', featured: false, hot: false,
  },
  {
    id: 6, category: 'Achievement' as const,
    date: 'March 30, 2026', readTime: '5 min read',
    title: "Google & Microsoft Partner with Greenfield to Launch India's First School AI Hub",
    excerpt: "Greenfield Academy inaugurated India's first school-level AI & Robotics Hub backed by Google and Microsoft. The 5,000 sq ft facility houses 80 AI workstations, a robotics arena, and a dedicated research library. Students from Grade 5 onwards now have structured access to machine learning and coding curricula.",
    image: '/science_lab.png', featured: false, hot: false,
  },
  {
    id: 7, category: 'Sports' as const,
    date: 'April 10, 2026', readTime: '2 min read',
    title: 'Swimming Team Clinches 5 Gold Medals at State Aquatics Championship',
    excerpt: 'Our swimmers dominated the State Aquatics Championship held in Pune, winning 5 gold, 3 silver and 2 bronze medals. Ananya Bose set a new state record in the 200m freestyle with a time of 2:04.31, breaking the previous record held for seven years.',
    image: '/sports_field.png', featured: false, hot: false,
  },
  {
    id: 8, category: 'Academic' as const,
    date: 'March 22, 2026', readTime: '4 min read',
    title: 'Greenfield Introduces Coding as a Core Subject from Grade 3 Onwards',
    excerpt: 'In a landmark curriculum reform, Greenfield Academy has made computational thinking and coding a mandatory core subject starting from Grade 3. The new syllabus, co-designed with IIT Delhi faculty, covers Python, web development, and algorithmic problem-solving by Grade 8.',
    image: '/library.png', featured: false, hot: false,
  },
  {
    id: 9, category: 'Achievement' as const,
    date: 'March 5, 2026', readTime: '3 min read',
    title: 'Debating Team Wins National Inter-School Debate Championship in Mumbai',
    excerpt: 'The Greenfield Debate Club defeated 64 schools to clinch the National Inter-School Debate Championship. Team captain Ritika Nair was awarded Best Speaker of the Tournament. The team argued on climate policy, digital privacy, and education reform across seven rounds.',
    image: '/library.png', featured: false, hot: false,
  },
  {
    id: 10, category: 'Event' as const,
    date: 'February 28, 2026', readTime: '2 min read',
    title: 'Science Fair 2026 Draws 1,200 Visitors — Student Projects Go Viral',
    excerpt: 'The Annual Science Fair showcased 180 student projects over two days, drawing over 1,200 visitors including parents, alumni, and industry guests. Three projects — an AI-powered water quality monitor, a solar desalination model, and a biodegradable plastic prototype — went viral on social media.',
    image: '/science_lab.png', featured: false, hot: false,
  },
  {
    id: 11, category: 'Admissions' as const,
    date: 'February 15, 2026', readTime: '2 min read',
    title: 'Scholarship Program 2026–27: ₹50 Lakh Reserved for Meritorious Students',
    excerpt: 'Greenfield Academy has set aside ₹50 lakh in scholarships for the 2026–27 academic year. Awards range from 25% to full fee waivers. Students from government schools and economically weaker sections are especially encouraged to apply before the June 30th deadline.',
    image: '/hero_bg.png', featured: false, hot: false,
  },
  {
    id: 12, category: 'Sports' as const,
    date: 'January 30, 2026', readTime: '2 min read',
    title: 'Chess Club Produces Two National-Ranked Players Under Age 14',
    excerpt: 'The Greenfield Chess Club has achieved a remarkable milestone — two of its members, Samir Joshi (age 12) and Tara Singh (age 13), have been ranked in the top 20 nationally in their age group by the All India Chess Federation following the winter circuit.',
    image: '/library.png', featured: false, hot: false,
  },
  {
    id: 13, category: 'Academic' as const,
    date: 'January 20, 2026', readTime: '3 min read',
    title: 'IB Diploma Results: Three Students Score Perfect 45/45 — A School First',
    excerpt: 'For the first time in the school history, three IB Diploma students have achieved a perfect score of 45 points. Meera Krishnan, Aditya Rao, and Simran Kaur have received offers from universities including Oxford, MIT, and NUS Singapore. The average school IB score this year was 38.4.',
    image: '/library.png', featured: false, hot: false,
  },
  {
    id: 14, category: 'Event' as const,
    date: 'January 10, 2026', readTime: '2 min read',
    title: 'Sports Day 2026 — 800 Athletes Compete Across 22 Track and Field Events',
    excerpt: 'The 41st Annual Sports Day was held at our main ground with over 800 student athletes competing in 22 events. Chief Guest Olympian P.T. Usha inspired students with a keynote on discipline and perseverance. The event was livestreamed with over 4,000 online viewers.',
    image: '/sports_field.png', featured: false, hot: false,
  },
];

const sportsNews = [
  { title: 'Cricket XI Selected for CBSE Nationals — 4 Players from Greenfield', date: 'May 18, 2026', cat: 'Cricket' },
  { title: 'Badminton Star Asha Verma Wins U-17 State Title Unbeaten', date: 'May 12, 2026', cat: 'Badminton' },
  { title: 'Basketball Team Finishes Runner-Up at Delhi State League', date: 'May 5, 2026', cat: 'Basketball' },
  { title: 'Athletics: School Records Broken in 100m, 400m and Long Jump', date: 'April 20, 2026', cat: 'Athletics' },
];

const eventsData = [
  { day: '15', month: 'Jun', title: 'Annual Day 2026', desc: 'Main Auditorium · 5:30 PM onwards · Free for families' },
  { day: '22', month: 'Jun', title: 'Parent-Teacher Meet — Grades 6–12', desc: 'All Classrooms · 9:00 AM – 1:00 PM' },
  { day: '25', month: 'Jun', title: 'Interschool Debate Finals', desc: 'Seminar Hall · 3:00 PM · Open to public' },
  { day: '5',  month: 'Jul', title: 'STEM Summer Camp Begins', desc: 'AI Innovation Hub · 10:00 AM · Grades 5–10' },
  { day: '10', month: 'Jul', title: 'Alumni Meet 2026 — Batch of 2016', desc: 'Main Auditorium · 4:00 PM · Dinner included' },
  { day: '18', month: 'Jul', title: 'Admissions Deadline — Merit Round', desc: 'Online Portal closes at midnight' },
  { day: '24', month: 'Jul', title: 'Open House for Prospective Parents', desc: 'Reception Hall · 10:00 AM – 1:00 PM' },
  { day: '1',  month: 'Aug', title: 'New Academic Session 2026–27 Commences', desc: 'All Campuses · Reporting at 8:00 AM' },
];

const CATEGORIES: Category[] = ['All', 'Achievement', 'Event', 'Admissions', 'Sports', 'Academic'];
const CATEGORY_COUNTS: Record<string, number> = {
  Achievement: 4, Event: 3, Admissions: 2, Sports: 4, Academic: 3,
};

const today = new Date().toLocaleDateString('en-IN', {
  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
});

/* ══════════════════════════════════════════
   COMPONENT
══════════════════════════════════════════ */
export default function News() {
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState<Category>('All');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const featured = allNews[0];
  const gridNews = allNews.filter(n =>
    !n.featured && (activeCategory === 'All' || n.category === activeCategory)
  );
  const listNews = allNews.filter(n =>
    !n.featured && (activeCategory === 'All' || n.category === activeCategory)
  ).slice(0, 4);

  return (
    <div className="news-page">

      {/* ── NAVBAR ── */}
      <nav className={`navbar${scrolled ? ' navbar--fixed' : ''}`}>
        <div className="nav-inner">
          <a href="/" className="nav-logo">
            <span className="logo-crest"><GraduationCap size={32} /></span>
            <div>
              <div className="logo-name">Greenfield</div>
              <div className="logo-tagline">ACADEMY</div>
            </div>
          </a>
          <ul className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
            {(['Home', 'About', 'Programs', 'School', 'News', 'Contact'] as const).map(l => (
              <li
                key={l}
                onMouseEnter={l === 'Programs' ? () => setMegaMenuOpen(true) : undefined}
                onMouseLeave={l === 'Programs' ? () => setMegaMenuOpen(false) : undefined}
                className={l === 'Programs' ? 'has-mega' : ''}
              >
                <a
                  href={l === 'Home' ? '/' : l === 'About' ? '/about' : l === 'News' ? '/news' : l === 'School' ? '/the-school' : `/#${l.toLowerCase().replace(/\\s+/g, '-')}`}
                  onClick={e => { 
                    if (l === 'Programs') { 
                      e.preventDefault(); 
                      setMegaMenuOpen(!megaMenuOpen); 
                    } else {
                      setMobileMenuOpen(false);
                    }
                  }}
                  className={[
                    l === 'Programs' ? `nav-dropdown ${megaMenuOpen ? 'active' : ''}` : '',
                    l === 'News'     ? 'nav-active' : '',
                  ].join(' ').trim()}
                >
                  {l}
                  {l === 'Programs' && (
                    <svg className="caret" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  )}
                </a>
                {l === 'Programs' && <ProgramMegaMenu open={megaMenuOpen} />}
              </li>
            ))}
            {/* Mobile-only Apply Button */}
            <li className="mobile-only-nav-apply">
              <a href="/apply">Apply Now</a>
            </li>
          </ul>
          <div className="nav-actions">
            <a href="/#contact" className="nav-cta">Apply Now →</a>
            <div className={`mobile-toggle ${mobileMenuOpen ? 'active' : ''}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <span></span><span></span><span></span>
            </div>
          </div>
        </div>
      </nav>

      {/* ── BREAKING NEWS TICKER ── */}
      <div className="np-ticker">
        <div className="np-ticker-label">🔴 Breaking</div>
        <div className="np-ticker-track">
          <div className="np-ticker-scroll">
            <span>🏆 National Science Olympiad Champions 2026</span>
            <span className="np-ticker-dot">◆</span>
            <span>📅 Admissions Open for 2026–27</span>
            <span className="np-ticker-dot">◆</span>
            <span>🎓 Annual Day — June 15 · Main Auditorium</span>
            <span className="np-ticker-dot">◆</span>
            <span>⚽ Football Team Advances to District Finals</span>
            <span className="np-ticker-dot">◆</span>
            <span>🔬 AI Innovation Hub Launched with Google Partnership</span>
            <span className="np-ticker-dot">◆</span>
            <span>📚 Board Results: 96% Distinction Rate</span>
            <span className="np-ticker-dot">◆</span>
            {/* duplicate for seamless loop */}
            <span>🏆 National Science Olympiad Champions 2026</span>
            <span className="np-ticker-dot">◆</span>
            <span>📅 Admissions Open for 2026–27</span>
            <span className="np-ticker-dot">◆</span>
            <span>🎓 Annual Day — June 15 · Main Auditorium</span>
            <span className="np-ticker-dot">◆</span>
            <span>⚽ Football Team Advances to District Finals</span>
            <span className="np-ticker-dot">◆</span>
            <span>🔬 AI Innovation Hub Launched with Google Partnership</span>
            <span className="np-ticker-dot">◆</span>
            <span>📚 Board Results: 96% Distinction Rate</span>
            <span className="np-ticker-dot">◆</span>
          </div>
        </div>
      </div>

      {/* ── MASTHEAD ── */}
      <div className="np-masthead">
        <div className="np-masthead-inner">
          <div className="np-masthead-top">
            <div style={{ fontSize: '.75rem', color: 'var(--slate)' }}>{today}</div>
            <div className="np-masthead-brand">
              <div className="np-masthead-title">Greenfield Gazette</div>
              <div className="np-masthead-sub">Official News Portal · Greenfield Academy</div>
            </div>
            <div className="np-masthead-meta">
              <strong>Est. 1985</strong>
              New Delhi, India
            </div>
          </div>

          {/* Category nav */}
          <nav className="np-cat-nav">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`np-cat-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* ── MAIN LAYOUT ── */}
      <div className="np-layout">

        {/* ════ MAIN COLUMN ════ */}
        <main>

          {/* ── FEATURED STORY ── */}
          {(activeCategory === 'All' || activeCategory === featured.category) && (
            <div className="np-featured">
              <div className="np-section-head">
                <div className="np-section-title">Top Story</div>
                <div className="np-section-line" />
              </div>
              <div className="np-featured-inner">
                <div className="np-feat-img-wrap">
                  <img src={featured.image} alt={featured.title} />
                  <div className="np-feat-label">⭐ Featured</div>
                </div>
                <div className="np-feat-body">
                  <div className="np-feat-category">🏆 {featured.category}</div>
                  <h1 className="np-feat-h">{featured.title}</h1>
                  <p className="np-feat-excerpt">{featured.excerpt}</p>
                  <div className="np-feat-meta">
                    <span>📅 {featured.date}</span>
                    <span className="np-feat-meta-sep">·</span>
                    <span>{featured.readTime}</span>
                    <span className="np-feat-meta-sep">·</span>
                    <span>Greenfield Gazette</span>
                  </div>
                  <a href="#" className="np-read-more">
                    Continue Reading
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* ── LATEST NEWS GRID ── */}
          {gridNews.length > 0 && (
            <>
              <div className="np-section-head">
                <div className="np-section-title">Latest News</div>
                <div className="np-section-line" />
                <a href="#" className="np-view-all">All stories →</a>
              </div>

              <div className="np-grid" style={{ marginBottom: '2.5rem' }}>
                {/* Large card */}
                <div className="np-card">
                  <div className="np-card-img tall">
                    <img src={gridNews[0]?.image || '/library.png'} alt={gridNews[0]?.title} />
                    {gridNews[0]?.hot && <span className="np-card-badge gold">Hot</span>}
                  </div>
                  <div className="np-card-cat">{gridNews[0]?.category}</div>
                  <h2 className="np-card-h lg">{gridNews[0]?.title}</h2>
                  <p className="np-card-excerpt">{gridNews[0]?.excerpt}</p>
                  <div className="np-card-meta">
                    <span>{gridNews[0]?.date}</span>
                    <span className="np-card-meta-dot">·</span>
                    <span>{gridNews[0]?.readTime}</span>
                  </div>
                </div>

                {/* Two medium cards stacked */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
                  {[gridNews[1], gridNews[2]].map((item, i) => item && (
                    <div className="np-card" key={item.id}>
                      <div className="np-card-img med">
                        <img src={item.image} alt={item.title} />
                      </div>
                      <div className="np-card-cat">{item.category}</div>
                      <h3 className="np-card-h md">{item.title}</h3>
                      <div className="np-card-meta">
                        <span>{item.date}</span>
                        <span className="np-card-meta-dot">·</span>
                        <span>{item.readTime}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Third medium card */}
                {gridNews[3] && (
                  <div className="np-card">
                    <div className="np-card-img med">
                      <img src={gridNews[3].image} alt={gridNews[3].title} />
                    </div>
                    <div className="np-card-cat">{gridNews[3].category}</div>
                    <h3 className="np-card-h md">{gridNews[3].title}</h3>
                    <p className="np-card-excerpt">{gridNews[3].excerpt}</p>
                    <div className="np-card-meta">
                      <span>{gridNews[3].date}</span>
                      <span className="np-card-meta-dot">·</span>
                      <span>{gridNews[3].readTime}</span>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {/* ── MORE STORIES (list style) ── */}
          {listNews.length > 2 && (
            <>
              <div className="np-section-head">
                <div className="np-section-title">More Stories</div>
                <div className="np-section-line" />
                <a href="#" className="np-view-all">View all →</a>
              </div>
              <div className="np-list" style={{ marginBottom: '2.5rem' }}>
                {listNews.slice(2).map(item => (
                  <div className="np-list-item" key={item.id}>
                    <div className="np-list-thumb">
                      <img src={item.image} alt={item.title} />
                    </div>
                    <div className="np-list-body">
                      <div className="np-list-cat">{item.category}</div>
                      <h4 className="np-list-h">{item.title}</h4>
                      <div className="np-list-meta">{item.date} · {item.readTime}</div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ── SPORTS ROUNDUP ── */}
          {(activeCategory === 'All' || activeCategory === 'Sports') && (
            <>
              <div className="np-section-head">
                <div className="np-section-title">⚽ Sports Roundup</div>
                <div className="np-section-line" />
                <a href="#" className="np-view-all">All sports →</a>
              </div>
              <div className="np-list" style={{ marginBottom: '2.5rem' }}>
                {sportsNews.map((s, i) => (
                  <div className="np-list-item" key={i}>
                    <div className="np-list-thumb">
                      <img src="/sports_field.png" alt={s.title} />
                    </div>
                    <div className="np-list-body">
                      <div className="np-list-cat">{s.cat}</div>
                      <h4 className="np-list-h">{s.title}</h4>
                      <div className="np-list-meta">{s.date} · 2 min read</div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ── QUOTE / EDITORIAL BANNER ── */}
          {activeCategory === 'All' && (
            <div className="np-editorial-banner">
              <div className="np-ed-quote-mark">❝</div>
              <div className="np-ed-label">Editor's Note</div>
              <blockquote className="np-ed-blockquote">
                "Education is not the preparation for life; education is life itself. At Greenfield, every headline you read here is proof that our students are already living that truth — winning, creating, competing and inspiring every single day."
              </blockquote>
              <cite className="np-ed-cite">— Dr. Ramesh Agarwal, Founder & Chairman</cite>
            </div>
          )}

          {/* ── UPCOMING EVENTS (dark band) ── */}
          {(activeCategory === 'All' || activeCategory === 'Event') && (
            <div className="np-events">
              <div className="np-section-head" style={{ marginBottom: '1rem' }}>
                <div className="np-section-title">📅 Upcoming Events</div>
                <div className="np-section-line" />
                <a href="#" className="np-view-all">Full calendar →</a>
              </div>
              {eventsData.map((ev, i) => (
                <div className="np-event-item" key={i}>
                  <div className="np-event-date">
                    <span className="np-event-day">{ev.day}</span>
                    <span className="np-event-mon">{ev.month}</span>
                  </div>
                  <div className="np-event-info">
                    <h4>{ev.title}</h4>
                    <p>{ev.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── QUICK STATS BAND ── */}
          {activeCategory === 'All' && (
            <div className="np-stats-band">
              {[
                { n: '14', l: 'News stories this semester' },
                { n: '8',  l: 'Upcoming events this month' },
                { n: '12', l: 'Championship titles in 2026' },
                { n: '3',  l: 'Perfect IB scores achieved' },
              ].map((s, i) => (
                <div key={i} className="np-stat-box">
                  <div className="np-stat-n">{s.n}</div>
                  <div className="np-stat-l">{s.l}</div>
                </div>
              ))}
            </div>
          )}

          {/* ── AS SEEN IN ── */}
          <div className="np-press">
            <div className="np-section-head" style={{ justifyContent: 'center' }}>
              <div className="np-section-title">As Seen In</div>
              <div className="np-section-line" />
            </div>
            <div className="np-press-logos">
              {['The Hindu', 'Times of India', 'NDTV Education', 'Hindustan Times', 'Deccan Herald', 'India Today Edu'].map(pub => (
                <div className="np-press-pill" key={pub}>{pub}</div>
              ))}
            </div>
          </div>

        </main>

        {/* ════ SIDEBAR ════ */}
        <aside className="np-sidebar">

          {/* Most Read */}
          <div className="np-sidebar-box">
            <div className="np-sidebar-box-title">Most Read</div>
            <div className="np-sb-list">
              {allNews.map((item, i) => (
                <div className="np-sb-item" key={item.id}>
                  <div className="np-sb-num">0{i + 1}</div>
                  <div className="np-sb-body">
                    <div className="np-sb-cat">{item.category}</div>
                    <div className="np-sb-h">{item.title}</div>
                    <div className="np-sb-date">{item.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="np-sidebar-box">
            <div className="np-sidebar-box-title">Categories</div>
            <div className="np-sb-cats">
              {Object.entries(CATEGORY_COUNTS).map(([cat, count]) => (
                <div
                  className="np-sb-cat-row"
                  key={cat}
                  onClick={() => setActiveCategory(cat as Category)}
                >
                  <span>{cat}</span>
                  <span className="np-sb-cat-count">{count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter widget */}
          <div className="np-sb-newsletter">
            <div className="np-sb-nl-icon">📬</div>
            <div className="np-sb-nl-h">Stay Informed</div>
            <p className="np-sb-nl-p">Get the latest school news delivered to your inbox every week.</p>
            <form onSubmit={e => e.preventDefault()}>
              <input className="np-sb-nl-input" type="email" placeholder="Your email address" />
              <button className="np-sb-nl-btn" type="submit">Subscribe →</button>
            </form>
          </div>

        </aside>
      </div>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="logo-crest"><GraduationCap size={32} /></span>
              <div>
                <div className="logo-name">Greenfield</div>
                <div className="logo-tagline">ACADEMY</div>
              </div>
            </div>
            <p>Nurturing young minds and shaping tomorrow's leaders since 1985.</p>
            <div className="socials">
              {['Facebook', 'Instagram', 'Twitter', 'YouTube'].map(s => (
                <a key={s} href="#" className="soc-btn" title={s}>{s[0]}</a>
              ))}
            </div>
          </div>
          {[
            { h: 'Quick Links', links: ['About Us', 'Programs', 'Admissions', 'Faculty', 'Alumni', 'Careers'] },
            { h: 'Academics',   links: ['Pre-Primary', 'Primary School', 'Middle School', 'Senior Secondary', 'Sports & Arts', 'Digital Skills'] },
            { h: 'Resources',   links: ['Academic Calendar', 'Exam Schedule', 'Fee Structure', 'Scholarship', 'Downloads', 'Contact'] },
          ].map(col => (
            <div className="footer-col" key={col.h}>
              <div className="footer-col-h">{col.h}</div>
              <ul>{col.links.map(l => <li key={l}><a href="#">{l}</a></li>)}</ul>
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <span>© 2026 Greenfield Academy. All rights reserved.</span>
          <span>Privacy Policy · Terms of Use · Sitemap</span>
        </div>
      </footer>

    </div>
  );
}
