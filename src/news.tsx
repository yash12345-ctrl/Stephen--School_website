import { useState, useEffect } from 'react';
import './news.css';
import { ProgramMegaMenu } from './program_top';


/* ══════════════════════════════════════════
   DATA
══════════════════════════════════════════ */
type Category = 'All' | 'Governor' | 'Diplomat' | 'Principal' | 'Academics';

const allNews = [
  {
    id: 1, category: 'Governor' as const,
    date: 'May 4, 2017', readTime: '2 min read',
    title: 'Shri Keshari Nath Tripathi — Governor of West Bengal',
    excerpt: 'Visit by His Excellency Shri Keshari Nath Tripathi, the Governor of West Bengal and Brother Brendan Mac Carthaigh on 4th May, 2017.',
    image: '/v19.png', featured: true, hot: true,
  },
  {
    id: 2, category: 'Diplomat' as const,
    date: 'April 17, 2018', readTime: '2 min read',
    title: 'Mrs. Iris Schrod & Mr. Jurgen Thomas Schrod — Deputy Consul General of Germany',
    excerpt: 'On April 17, 2018, Mrs. Iris Schrod and Mr. Jurgen Thomas Schrod, Deputy Consul General of Germany, visited St. Stephen\'s School Bowbazar.',
    image: '/v6.jpg', featured: false, hot: true,
  },
  {
    id: 3, category: 'Principal' as const,
    date: 'June 2026', readTime: '4 min read',
    title: 'Dignitary Name 3 — "Holistic Development"',
    excerpt: 'Please provide the exact words for the third dignitary from your image. This is a placeholder text that will be replaced once you share the real content. We focus on the all-round development of every child.',
    image: '/v7.jpg', featured: false, hot: false,
  },
  {
    id: 4, category: 'Academics' as const,
    date: 'June 2026', readTime: '3 min read',
    title: 'Dignitary Name 4 — "Innovation in Teaching"',
    excerpt: 'Please provide the exact words for the fourth dignitary from your image. This is a placeholder text that will be replaced once you share the real content. Embracing modern methodologies to make learning joyful.',
    image: '/v8.jpg', featured: false, hot: false,
  },
  {
    id: 5, category: 'Academics' as const,
    date: 'June 2026', readTime: '3 min read',
    title: 'Dignitary Name 5 — "Empowering Students"',
    excerpt: 'Please provide the exact words for the fifth dignitary from your image. This is a placeholder text that will be replaced once you share the real content. Giving wings to the aspirations of our youth.',
    image: '/v9.png', featured: false, hot: false,
  }
];



const CATEGORIES: Category[] = ['All', 'Governor', 'Diplomat', 'Principal', 'Academics'];
const CATEGORY_COUNTS: Record<string, number> = {
  Governor: 1, Diplomat: 1, Principal: 1, Academics: 2,
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

  useEffect(() => {
    const handleClickOutside = (e: globalThis.MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.has-mega') && !target.closest('.mega-menu')) {
        setMegaMenuOpen(false);
      }
    };
    if (megaMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [megaMenuOpen]);

  const visibleNews = allNews.filter(n =>
    activeCategory === 'All' || n.category === activeCategory
  );

  return (
    <div className="news-page">

      {/* ── NAVBAR ── */}
      <nav className={`navbar${scrolled ? ' navbar--fixed' : ''}`}>
        <div className="nav-inner">
          <a href="/" className="nav-logo">
            <div className="logo-crest-wrapper">
              <img src="/v2.png" className="logo-crest-img" alt="St. Stephen's Crest" />
            </div>
            <div>
              <div className="logo-name">St. Stephen's</div>
              <div className="logo-tagline">SCHOOL</div>
            </div>
          </a>
          <ul className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
            {(['Home', 'About', 'Programs', 'School', 'News', 'Contact'] as const).map(l => (
              <li
                key={l}
                onMouseEnter={l === 'Programs' ? () => setMegaMenuOpen(true) : undefined}
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
                    l === 'News' ? 'nav-active' : '',
                  ].join(' ').trim()}
                >
                  {l}
                  {l === 'Programs' && (
                    <svg className="caret" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  )}
                </a>
                {l === 'Programs' && <ProgramMegaMenu open={megaMenuOpen} onClose={() => setMegaMenuOpen(false)} />}
              </li>
            ))}
            {/* Mobile-only Donate Button */}
            <li className="mobile-only-nav-apply">
              <a href="/#donate">Donate</a>
            </li>
          </ul>
          <div className="nav-actions">
            <a href="/#donate" className="nav-cta">Donate →</a>
            <div className={`mobile-toggle ${mobileMenuOpen ? 'active' : ''}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <span></span><span></span><span></span>
            </div>
          </div>
        </div>
      </nav>

      {/* ── BREAKING NEWS TICKER ── */}
      <div className="np-ticker">
        <div className="np-ticker-label">🔴 Welcome</div>
        <div className="np-ticker-track">
          <div className="np-ticker-scroll">
            <span>🏛️ Guiding Our Institution With Vision and Excellence</span>
            <span className="np-ticker-dot">◆</span>
            <span>🎓 Shaping the Leaders of Tomorrow</span>
            <span className="np-ticker-dot">◆</span>
            <span>🌟 Empowering Students Every Day</span>
            <span className="np-ticker-dot">◆</span>
            <span>💡 Inspiring Innovation in Education</span>
            <span className="np-ticker-dot">◆</span>
            {/* duplicate for seamless loop */}
            <span>🏛️ Guiding Our Institution With Vision and Excellence</span>
            <span className="np-ticker-dot">◆</span>
            <span>🎓 Shaping the Leaders of Tomorrow</span>
            <span className="np-ticker-dot">◆</span>
            <span>🌟 Empowering Students Every Day</span>
            <span className="np-ticker-dot">◆</span>
            <span>💡 Inspiring Innovation in Education</span>
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
              <div className="np-masthead-title">Dignitaries' Voices</div>
              <div className="np-masthead-sub">Official Messages · St. Stephen's School</div>
            </div>
            <div className="np-masthead-meta">
              <strong>Est. 1985</strong>
              Bowbazar, Kolkata
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

          {/* ── DIGNITARIES LIST ── */}
          <div className="np-section-head">
            <div className="np-section-title">Official Messages</div>
            <div className="np-section-line" />
          </div>

          <div className="np-dignitaries-list">
            {visibleNews.map((item) => (
              <div className="np-featured" key={item.id}>
                <div className="np-featured-inner">
                  <div className="np-feat-img-wrap">
                    <img src={item.image} alt={item.title} />
                    {item.featured && <div className="np-feat-label">⭐ Featured</div>}
                  </div>
                  <div className="np-feat-body">
                    <div className="np-feat-category">🏆 {item.category}</div>
                    <h1 className="np-feat-h">{item.title}</h1>
                    <p className="np-feat-excerpt">{item.excerpt}</p>
                    <div className="np-feat-meta">
                      <span>📅 {item.date}</span>
                      <span className="np-feat-meta-sep">·</span>
                      <span>{item.readTime}</span>
                      <span className="np-feat-meta-sep">·</span>
                      <span>St. Stephen's School</span>
                    </div>
                    <a href="#" className="np-read-more">
                      Continue Reading
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>



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
              <div className="logo-crest-wrapper">
                <img src="/v2.png" className="logo-crest-img" alt="St. Stephen's Crest" />
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
