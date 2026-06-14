import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import './gallery.css';
import { ProgramMegaMenu } from './program_top';

// ── DATA ──────────────────────────────────────────────────────────────
const MEMBERS = {
  root: {
    id: 'root',
    name: 'Imran Zaki',
    role: 'Hony. Secretary',
    img: '/v9.png',
    bio: `Oversees the governance of St. Stephen's School and leads the management body with vision and dedication.`,
  },
  level1: [
    {
      id: 'l1-0',
      name: 'Ayesha Siddiqui',
      role: 'Head-Mistress',
      img: '/v10.png',
      bio: `Leads academic excellence, student welfare, and day-to-day operations of the school with 15+ years of experience.`,
    },
    {
      id: 'l1-1',
      name: 'Ajay Paul',
      role: 'Administrator & Advisory Board',
      img: '/v33.png',
      bio: `Manages administrative affairs and bridges the gap between the governing body and teaching staff effectively.`,
    },
  ],
  level2: [
    {
      id: 'l2-0',
      name: 'Rajesh Arora',
      role: 'Advisory Board',
      img: '/v34.png',
      parentId: 'l1-1',
      bio: `Provides strategic guidance on infrastructure and resource development for the school's growth.`,
    },
    {
      id: 'l2-1',
      name: 'Rehan Misbah',
      role: 'Advisory Board',
      img: '/v35.png',
      parentId: 'l1-1',
      bio: `Advises on community outreach initiatives and minority scholarship programs for underprivileged students.`,
    },
    {
      id: 'l2-2',
      name: 'Rajender Singh',
      role: 'Advisory Board',
      img: '/k6.jpg',
      parentId: 'l1-1',
      bio: `Oversees legal compliance, institutional policies, and governance frameworks for the school.`,
    },
    {
      id: 'l2-3',
      name: 'Asif Iqbal',
      role: 'Advisory Board',
      img: '/v4.jpeg',
      parentId: 'l1-1',
      bio: `Leads financial planning, budgeting, and audit oversight to ensure responsible fund management.`,
    },
  ],
};

// ── CONNECTOR SVG ──────────────────────────────────────────────────────
function getCenter(el: HTMLElement, container: HTMLElement) {
  const elRect = el.getBoundingClientRect();
  const cRect = container.getBoundingClientRect();
  return {
    x: elRect.left - cRect.left + elRect.width / 2,
    top: elRect.top - cRect.top,
    bottom: elRect.top - cRect.top + elRect.height,
  };
}

function makeCurvedPath(x1: number, y1: number, x2: number, y2: number) {
  const midY = (y1 + y2) / 2;
  return `M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`;
}

// ── MAIN COMPONENT ─────────────────────────────────────────────────────
export default function Gallery() {
  const [activeTab, setActiveTab] = useState('GOVERNING BODY');

  const tabInfo: Record<string, { title: string, subtitle: string }> = {
    'GOVERNING BODY': { title: 'Governing Body', subtitle: "Leadership structure of St. Stephen's School" },
    'MANAGEMENT TEAM': { title: 'Management Team', subtitle: 'Strategic planning and operational execution' },
    'MORNING FACULTY': { title: 'Morning Faculty', subtitle: 'Educators for the morning academic session' },
    'AFTERNOON FACULTY': { title: 'Afternoon Faculty', subtitle: 'Educators for the afternoon academic session' },
    'NON-TEACHING STAFF': { title: 'Non-Teaching Staff', subtitle: 'Administrative and support personnel' },
    'CARE-TAKERS': { title: 'Care-Takers', subtitle: 'Campus maintenance and student care' },
  };

  const currentTabInfo = tabInfo[activeTab] || { title: activeTab, subtitle: 'Directory and structure coming soon.' };

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // refs for SVG lines
  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [paths, setPaths] = useState<{ d: string; key: string }[]>([]);
  const [svgH, setSvgH] = useState(0);

  const [, setRevealed] = useState(false);
  const [treeStarted, setTreeStarted] = useState(false);

  // reset tree state when tab changes
  useEffect(() => {
    setTreeStarted(false);
    setRevealed(false);
  }, [activeTab]);

  // scroll effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // trigger float loop after all cards have revealed (longest delay ~1.2s + 0.9s anim)
  useEffect(() => {
    if (treeStarted) {
      const t = setTimeout(() => setRevealed(true), 2200);
      return () => clearTimeout(t);
    }
  }, [treeStarted]);

  // mega-menu close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!(e.target as Element).closest('.has-mega') && !(e.target as Element).closest('.mega-menu')) {
        setMegaMenuOpen(false);
      }
    };
    if (megaMenuOpen) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [megaMenuOpen]);

  // compute SVG connector paths after layout
  useLayoutEffect(() => {
    if (!treeStarted) return;
    const compute = () => {
      const c = containerRef.current;
      if (!c) return;
      setSvgH(c.offsetHeight);

      const newPaths: { d: string; key: string }[] = [];

      // root → each level-1 node
      MEMBERS.level1.forEach((m) => {
        const from = nodeRefs.current['root'];
        const to = nodeRefs.current[m.id];
        if (!from || !to || !c) return;
        const fc = getCenter(from, c);
        const tc = getCenter(to, c);
        newPaths.push({ key: `root-${m.id}`, d: makeCurvedPath(fc.x, fc.bottom, tc.x, tc.top) });
      });

      // l1-1 (Ajay Paul) → each level-2 node
      MEMBERS.level2.forEach((m) => {
        const from = nodeRefs.current[m.parentId];
        const to = nodeRefs.current[m.id];
        if (!from || !to || !c) return;
        const fc = getCenter(from, c);
        const tc = getCenter(to, c);
        newPaths.push({ key: `${m.parentId}-${m.id}`, d: makeCurvedPath(fc.x, fc.bottom, tc.x, tc.top) });
      });

      setPaths(newPaths);
    };

    // slight delay to let browser finish rendering
    const id = setTimeout(compute, 100);
    window.addEventListener('resize', compute);
    return () => { clearTimeout(id); window.removeEventListener('resize', compute); };
  }, [activeTab, treeStarted]);

  return (
    <div className="gallery-page">

      {/* ── NAVBAR ── */}
      <nav className={`navbar navbar--gallery${scrolled ? ' navbar--fixed' : ''}`}>
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
            {(['Home', 'About', 'Programs', 'School', 'News', 'Gallery'] as const).map(l => (
              <li
                key={l}
                onMouseEnter={l === 'Programs' ? () => { if (closeTimer.current) clearTimeout(closeTimer.current); setMegaMenuOpen(true); } : undefined}
                className={l === 'Programs' ? 'has-mega' : ''}
              >
                <a
                  href={l === 'Home' ? '/' : l === 'About' ? '/about' : l === 'News' ? '/news' : l === 'School' ? '/the-school' : l === 'Gallery' ? '/gallery' : `/#${l.toLowerCase()}`}
                  onClick={(e) => { if (l === 'Programs') { e.preventDefault(); setMegaMenuOpen(!megaMenuOpen); } else { setMobileMenuOpen(false); } }}
                  className={l === 'Programs' ? `nav-dropdown ${megaMenuOpen ? 'active' : ''}` : ''}
                >
                  {l}
                  {l === 'Programs' && (
                    <svg className="caret" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                  )}
                </a>
                {l === 'Programs' && (
                  <ProgramMegaMenu open={megaMenuOpen} onClose={() => setMegaMenuOpen(false)} />
                )}
              </li>
            ))}
            <li className="mobile-only-nav-apply"><a href="/#donate">Donate</a></li>
          </ul>
          <div className="nav-actions">
            <a href="/#donate" className="nav-cta">Donate Now →</a>
            <div className={`mobile-toggle ${mobileMenuOpen ? 'active' : ''}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <span /><span /><span />
            </div>
          </div>
        </div>
      </nav>

      {/* ── HEADER ── */}
      <div className="gallery-header">
        <div className="gallery-header-inner">
          <div className="header-left">
            <div className="title-watermark">{currentTabInfo.title.substring(0, 2).toUpperCase()}</div>
            <span className="gallery-chip">
              <span className="chip-dot"></span>
              Administration
            </span>
            <h1 className="gallery-title">{currentTabInfo.title}</h1>
          </div>
          <div className="header-right">
            <p className="gallery-subtitle">{currentTabInfo.subtitle}</p>
          </div>
        </div>

        <div className="gallery-tabs-container">
          <div className="gallery-tabs">
            {Object.keys(tabInfo).map(tab => (
              <button
                key={tab}
                className={`gallery-tab ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── TAB CONTENT ── */}
      {activeTab === 'GOVERNING BODY' ? (
        <div className="org-canvas-wrap">
          {!treeStarted ? (
            <div className="start-tree-container">
              <button className="start-tree-btn" onClick={() => setTreeStarted(true)}>
                <span className="btn-glow"></span>
                <span className="btn-text">View Governance Structure</span>
                <svg className="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" /></svg>
              </button>
            </div>
          ) : (
            <div className="org-canvas-inner" ref={containerRef}>

              {/* SVG overlay — animated lines + flowing particles */}
              <svg className="org-svg" style={{ height: svgH || '100%' }} aria-hidden="true">
                <defs>
                  {/* Glowing gold filter */}
                  <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  {/* Sharper glow for dot */}
                  <filter id="dotGlow" x="-100%" y="-100%" width="300%" height="300%">
                    <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {paths.map(({ key, d }, i) => (
                  <g key={key}>
                    {/* Base line — draw-on animation */}
                    <path
                      d={d}
                      className="org-path-base"
                      style={{ animationDelay: `${0.2 + i * 0.15}s` }}
                    />
                    {/* Shimmer overlay line */}
                    <path
                      d={d}
                      className="org-path-shimmer"
                      style={{ animationDelay: `${0.5 + i * 0.2}s` }}
                    />
                    {/* Flowing dot 1 */}
                    <circle r="4" fill="#D4AF37" filter="url(#dotGlow)" opacity="0.9">
                      <animateMotion
                        dur={`${2.2 + i * 0.3}s`}
                        repeatCount="indefinite"
                        begin={`${0.8 + i * 0.4}s`}
                        path={d}
                      />
                    </circle>
                    {/* Flowing dot 2 (offset) */}
                    <circle r="2.5" fill="#fff" opacity="0.7">
                      <animateMotion
                        dur={`${2.2 + i * 0.3}s`}
                        repeatCount="indefinite"
                        begin={`${1.8 + i * 0.4}s`}
                        path={d}
                      />
                    </circle>
                  </g>
                ))}
              </svg>

              {/* ROW 0 — Root */}
              <div className="org-row org-row-0">
                <div
                  className="org-node is-root"
                  data-delay="0"
                  ref={el => { nodeRefs.current['root'] = el; }}
                >
                  <div className="node-avatar">
                    <img src={MEMBERS.root.img} alt={MEMBERS.root.name} />
                  </div>
                  <div className="node-name">{MEMBERS.root.name}</div>
                  <div className="node-role">{MEMBERS.root.role}</div>
                  <p className="node-bio">{MEMBERS.root.bio}</p>
                  <div className="node-arrow" />
                </div>
              </div>

              {/* ROW 1 — Level 1 */}
              <div className="org-row org-row-1">
                {MEMBERS.level1.map((m, i) => (
                  <div
                    key={m.id}
                    className="org-node"
                    data-delay={i + 1}
                    ref={el => { nodeRefs.current[m.id] = el; }}
                  >
                    <div className="node-avatar">
                      <img src={m.img} alt={m.name} />
                    </div>
                    <div className="node-name">{m.name}</div>
                    <div className="node-role">{m.role}</div>
                    <p className="node-bio">{m.bio}</p>
                    <div className="node-arrow" />
                  </div>
                ))}
              </div>

              {/* ROW 2 — Level 2 (Advisory Board) */}
              <div className="org-row org-row-2">
                {MEMBERS.level2.map((m, i) => (
                  <div
                    key={m.id}
                    className="org-node"
                    data-delay={i + 3}
                    ref={el => { nodeRefs.current[m.id] = el; }}
                  >
                    <div className="node-avatar">
                      <img src={m.img} alt={m.name} />
                    </div>
                    <div className="node-name">{m.name}</div>
                    <div className="node-role">{m.role}</div>
                    <p className="node-bio">{m.bio}</p>
                    <div className="node-arrow" />
                  </div>
                ))}
              </div>

            </div>
          )}
        </div>
      ) : (
        <div className="tab-placeholder">
          <div className="placeholder-glass">
            <div className="placeholder-icon">
              <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            </div>
            <h2>{currentTabInfo.title}</h2>
            <p>{currentTabInfo.subtitle}</p>
          </div>
        </div>
      )}

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
