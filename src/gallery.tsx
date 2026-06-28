import { useState, useRef, useLayoutEffect } from 'react';
import './gallery.css';
import './news.css'; // ensure news styles are available
import Navbar from './Navbar';

// ── DATA ──────────────────────────────────────────────────────────────
const GOVERNING_MEMBERS = {
  root: {
    id: 'root',
    name: 'Imran Zaki',
    role: 'Hony. Secretary',
    img: '/v9.webp',
    bio: `Oversees the governance of St. Stephen's School and leads the management body with vision and dedication.`,
  },
  level1: [
    {
      id: 'l1-0',
      name: 'Ayesha Iqbal Siddiqui',
      role: 'Head-Mistress',
      img: '/v10.webp',
      bio: `Leads academic excellence, student welfare, and day-to-day operations of the school with 15+ years of experience.`,
    },
    {
      id: 'l1-1',
      name: 'Ajoy Paul',
      role: 'Administrator & Advisory Board',
      img: '/v33.webp',
      bio: `Manages administrative affairs and bridges the gap between the governing body and teaching staff effectively.`,
    },
  ],
  level2: [
    {
      id: 'l2-0',
      name: 'Rajesh Arora',
      role: 'Advisory Board',
      img: '/v34.webp',
      parentId: 'l1-1',
      bio: `Provides strategic guidance on infrastructure and resource development for the school's growth.`,
    },
    {
      id: 'l2-1',
      name: 'Rehan Misbah',
      role: 'Advisory Board',
      img: '/v35.webp',
      parentId: 'l1-1',
      bio: `Advises on community outreach initiatives and minority scholarship programs for underprivileged students.`,
    },
    {
      id: 'l2-2',
      name: 'Rajender Singh',
      role: 'Advisory Board',
      img: '/v36.webp',
      parentId: 'l1-1',
      bio: `Oversees legal compliance, institutional policies, and governance frameworks for the school.`,
    },
    {
      id: 'l2-3',
      name: 'Asif Iqbal',
      role: 'Advisory Board',
      img: '/v37.webp',
      parentId: 'l1-1',
      bio: `Leads financial planning, budgeting, and audit oversight to ensure responsible fund management.`,
    },
  ],
};

const MANAGEMENT_MEMBERS = {
  root: {
    id: 'root',
    name: 'Imran Zaki',
    role: 'Hony. Secretary',
    img: '/v9.webp',
    bio: `Guides the Management Team with strategic vision and ensures smooth operations.`,
  },
  level1: [
    {
      id: 'ml1-0',
      name: 'Ayesha Iqbal Siddiqui',
      role: 'Headmistress',
      img: '/v10.webp',
      bio: `Leads the management team and oversees all academic and administrative activities.`,
    },
    {
      id: 'ml1-1',
      name: 'Ajoy Paul',
      role: 'Administrator',
      img: '/v33.webp',
      bio: `Manages school operations, logistics, and resource allocation.`,
    },
  ],
  level2: [
    { id: 'ml2-0', name: 'Falaq Qaiyum', role: 'Management Team', img: '/logo.webp', parentId: 'ml1-0', bio: 'Supports management and administrative operations.' },
    { id: 'ml2-1', name: 'Shagufta Gulnar', role: 'Management Team', img: '/logo.webp', parentId: 'ml1-0', bio: 'Handles day-to-day coordination and planning.' },
    { id: 'ml2-2', name: 'Tabassum Rashid', role: 'Management Team', img: '/logo.webp', parentId: 'ml1-0', bio: 'Ensures efficient management of school programs.' },
    { id: 'ml2-3', name: 'Tabassum Rashid', role: 'Management Team', img: '/logo.webp', parentId: 'ml1-1', bio: 'Assists with operational oversight and management.' },
    { id: 'ml2-4', name: 'Zikra Salim', role: 'Management Team', img: '/logo.webp', parentId: 'ml1-1', bio: 'Contributes to strategic planning and execution.' },
    { id: 'ml2-5', name: 'ifra Rehman', role: 'Management Team', img: '/logo.webp', parentId: 'ml1-1', bio: 'Coordinates team efforts and resource management.' },
    { id: 'ml2-6', name: 'Rumsha Nehal', role: 'Management Team', img: '/logo.webp', parentId: 'ml1-1', bio: 'Manages communications and staff relations.' },
  ],
};

// ── FLAT PHOTO-GRID DATA ──────────────────────────────────────────────
const MANAGEMENT_GRID = {
  groupPhoto: '/a11.jpeg?v=3',
  leaders: [
    { name: 'Imran Zaki', role: 'Hony. Secretary', img: '/v9.webp' },
    { name: 'Ayesha Iqbal Siddiqui', role: 'Headmistress', img: '/v10.webp' },
    { name: 'Ajoy Paul', role: 'Administrator', img: '/v33.webp' },
  ],
  members: [
    { name: 'Meghna Mukherjee', role: 'Curriculum Advisor', img: '/logo1.webp' },
    { name: 'Nikarika Mukherjee', role: 'Co-Curriculum Advisor', img: '/logo2.webp' },
    { name: 'Irfana Nabi', role: 'Morning Administrator', img: '/logo3.webp' },
    { name: 'Zahida Perveen Niyazi ', role: 'Morning coordinators', img: '/logo4.webp' },
    { name: 'Shabana Yasin ', role: 'Office Coordinator', img: '/logo5.webp' },
    { name: 'Anila Saigal', role: 'Primary coordinator', img: '/logo6.webp' },
  ],
};

const MORNING_FACULTY_GRID = {
  groupPhoto: '/ww2.webp',
  members: [
    { name: 'Neeta Mukherjee', role: 'Morning Faculty', img: '/v38.webp' },
    { name: 'Resham Nahed', role: 'Morning Faculty', img: '/v39.webp' },
    { name: 'Tabinda Salim', role: 'Morning Faculty', img: '/v40.webp' },
    { name: 'Insha Rehman', role: 'Morning Faculty', img: '/v41.webp' },
    { name: 'Falaq Qaiyum', role: 'Morning Faculty', img: '/v42.webp' },
    { name: 'Shagufta Gulnar', role: 'Morning Faculty', img: '/v43.webp' },
    { name: 'Tabassum Rashid', role: 'Morning Faculty', img: '/v44.webp' },
    { name: 'Zikra Salim', role: 'Morning Faculty', img: '/v45.webp' },
    { name: 'Ifra Rehman', role: 'Morning Faculty', img: '/v46.webp' },
    { name: 'Rumsha Nehal', role: 'Morning Faculty', img: '/v47.webp' },
  ],
};

const AFTERNOON_FACULTY_GRID = {
  groupPhoto: '/ww3.webp',
  members: [
    { name: 'Rina Das', role: 'Afternoon Faculty', img: '/a14.jpeg' },
    { name: 'Piyali Manna', role: 'Afternoon Faculty', img: '/v48.webp' },
    { name: 'Shrinjini Saha', role: 'Afternoon Faculty', img: '/v49.webp' },
    { name: 'Kriti Arora', role: 'Afternoon Faculty', img: '/v50.webp' },
    { name: 'Nikhat Ara', role: 'Afternoon Faculty', img: '/v51.webp' },
    { name: 'Obaid Ahmed', role: 'Afternoon Faculty', img: '/v52.webp' },
    { name: 'Uday Shankar', role: 'Afternoon Faculty', img: '/a12.jpeg' },
    { name: 'Hamidur Rehman', role: 'Afternoon Faculty', img: '/v53.webp' },
    { name: 'Pappu Roy', role: 'Afternoon Faculty', img: '/a13.jpeg' },
    { name: 'Md. Rafay Ali', role: 'Afternoon Faculty', img: '/v54.webp' },
    { name: 'Md Tabrez', role: 'Afternoon Faculty', img: '/v55.webp' },
    { name: 'Mashira Zakir', role: 'Afternoon Faculty', img: '/v56.webp' },
    { name: 'Saleha Parveen', role: 'Afternoon Faculty', img: '/v57.webp' },
    { name: 'Sirajuddaula', role: 'Afternoon Faculty', img: '/a15.jpeg' },
  ],
};

const MORNING_FACULTY = {
  root: {
    id: 'root',
    name: 'Morning Faculty',
    role: 'Academic Department',
    img: '',
    bio: 'The dedicated educators of the morning session.',
  },
  level1: [
    { id: 'mf-0', name: 'Neeta Mukherjee', role: 'Morning Faculty', img: '/v38.webp', bio: 'Educator for morning session.' },
    { id: 'mf-1', name: 'Resham Nahed', role: 'Morning Faculty', img: '/v39.webp', bio: 'Educator for morning session.' },
    { id: 'mf-2', name: 'Tabinda Salim', role: 'Morning Faculty', img: '/v40.webp', bio: 'Educator for morning session.' },
    { id: 'mf-3', name: 'Insha Rehman', role: 'Morning Faculty', img: '/v41.webp', bio: 'Educator for morning session.' },
    { id: 'mf-4', name: 'Falaq Qaiyum', role: 'Morning Faculty', img: '/v42.webp', bio: 'Educator for morning session.' },
    { id: 'mf-5', name: 'Shagufta Gulnar', role: 'Morning Faculty', img: '/v43.webp', bio: 'Educator for morning session.' },
    { id: 'mf-6', name: 'Tabassum Rashid', role: 'Morning Faculty', img: '/v44.webp', bio: 'Educator for morning session.' },
    { id: 'mf-7', name: 'Zikra Salim', role: 'Morning Faculty', img: '/v45.webp', bio: 'Educator for morning session.' },
    { id: 'mf-8', name: 'ifra Rehman', role: 'Morning Faculty', img: '/v46.webp', bio: 'Educator for morning session.' },
    { id: 'mf-9', name: 'Rumsha Nehal', role: 'Morning Faculty', img: '/v47.webp', bio: 'Educator for morning session.' },
  ],
  level2: [],
};

const AFTERNOON_FACULTY = {
  root: {
    id: 'root',
    name: 'Afternoon Faculty',
    role: 'Academic Department',
    img: '',
    bio: 'The dedicated educators of the afternoon session.',
  },
  level1: [
    { id: 'af-0', name: 'Rina Das', role: 'Afternoon Faculty', img: '/logo.webp', bio: 'Educator for afternoon session.' },
    { id: 'af-1', name: 'Piyali Mnna', role: 'Afternoon Faculty', img: '/v48.webp', bio: 'Educator for afternoon session.' },
    { id: 'af-2', name: 'Shrinjini Saha', role: 'Afternoon Faculty', img: '/v49.webp', bio: 'Educator for afternoon session.' },
    { id: 'af-3', name: 'Kriti Arora', role: 'Afternoon Faculty', img: '/v50.webp', bio: 'Educator for afternoon session.' },
    { id: 'af-4', name: 'Nikhat Ara', role: 'Afternoon Faculty', img: '/v51.webp', bio: 'Educator for afternoon session.' },
    { id: 'af-5', name: 'Obaid Ahmed', role: 'Afternoon Faculty', img: '/v52.webp', bio: 'Educator for afternoon session.' },
    { id: 'af-6', name: 'Uday Shankar', role: 'Afternoon Faculty', img: '/logo.webp', bio: 'Educator for afternoon session.' },
    { id: 'af-7', name: 'Hamidur Rehman', role: 'Afternoon Faculty', img: '/v53.webp', bio: 'Educator for afternoon session.' },
    { id: 'af-8', name: 'Pappu Roy', role: 'Afternoon Faculty', img: '/logo.webp', bio: 'Educator for afternoon session.' },
    { id: 'af-9', name: 'Md. Rafay Ali', role: 'Afternoon Faculty', img: '/v54.webp', bio: 'Educator for afternoon session.' },
    { id: 'af-10', name: 'Md Tabrez', role: 'Afternoon Faculty', img: '/v55.webp', bio: 'Educator for afternoon session.' },
    { id: 'af-11', name: 'Mashira Zakir', role: 'Afternoon Faculty', img: '/v56.webp', bio: 'Educator for afternoon session.' },
    { id: 'af-12', name: 'Saleha Parveen', role: 'Afternoon Faculty', img: '/v57.webp', bio: 'Educator for afternoon session.' },
    { id: 'af-13', name: 'Sirajuddaula', role: 'Afternoon Faculty', img: '/logo.webp', bio: 'Educator for afternoon session.' },
  ],
  level2: [],
};

const NON_TEACHING_STAFF = {
  root: {
    id: 'root',
    name: 'Non-Teaching Staff',
    role: 'Administration & Support',
    img: '',
    bio: 'The essential backbone supporting our school operations.',
  },
  level1: [
    { id: 'nts-0', name: 'Mohammad Mushtaque', role: 'Office Support', img: '/v58.webp', bio: 'Supports the operational and administrative functions.' },
    { id: 'nts-1', name: 'Humaira', role: 'Office Support', img: '/v59.webp', bio: 'Supports the operational and administrative functions.' },
  ],
  level2: [],
};

const CARE_TAKERS = {
  root: {
    id: 'root',
    name: 'Care-Takers',
    role: 'Maintenance & Support',
    img: '',
    bio: 'Dedicated personnel ensuring campus maintenance and student care.',
  },
  level1: [
    { id: 'ct-0', name: 'Subhash Rana', role: 'Care-Taker', img: '/s1.webp', bio: 'Supports maintenance and operational duties.' },
    { id: 'ct-1', name: 'Sarita Rana', role: 'Care-Taker', img: '/s2.webp', bio: 'Supports maintenance and operational duties.' },
    { id: 'ct-2', name: 'Monirul', role: 'Care-Taker', img: '/s3.webp', bio: 'Supports maintenance and operational duties.' },
    { id: 'ct-3', name: 'Aparna Samanto', role: 'Care-Taker', img: '/s4.webp', bio: 'Supports maintenance and operational duties.' },
    { id: 'ct-4', name: 'Priyanka Devi Shah', role: 'Care-Taker', img: '/s5.webp', bio: 'Supports maintenance and operational duties.' },
    { id: 'ct-5', name: 'Poonam Devi', role: 'Care-Taker', img: '/s6.webp', bio: 'Supports maintenance and operational duties.' },
  ],
  level2: [],
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
  const [activeTab, setActiveTab] = useState('GOVERNING BOARD MEMBER');
  const [viewMode, setViewMode] = useState<'selection' | 'governance' | 'dignitaries'>('selection');

  const isTreeTab = activeTab === 'GOVERNING BOARD MEMBER' || activeTab === 'MANAGEMENT TEAM' || activeTab === 'MORNING FACULTY' || activeTab === 'AFTERNOON FACULTY' || activeTab === 'NON-TEACHING STAFF' || activeTab === 'SUPPORT STAFF';
  const currentMembers = activeTab === 'SUPPORT STAFF' ? CARE_TAKERS : activeTab === 'NON-TEACHING STAFF' ? NON_TEACHING_STAFF : activeTab === 'AFTERNOON FACULTY' ? AFTERNOON_FACULTY : activeTab === 'MORNING FACULTY' ? MORNING_FACULTY : activeTab === 'MANAGEMENT TEAM' ? MANAGEMENT_MEMBERS : GOVERNING_MEMBERS;

  const tabInfo: Record<string, { title: string, subtitle: string }> = {
    'GOVERNING BOARD MEMBER': { title: 'Governing Board Member', subtitle: "Leadership structure of St. Stephen's School" },
    'MANAGEMENT TEAM': { title: 'Management Team', subtitle: 'Strategic planning and operational execution' },
    'MORNING FACULTY': { title: 'Morning Faculty', subtitle: 'Educators for the morning academic session' },
    'AFTERNOON FACULTY': { title: 'Afternoon Faculty', subtitle: 'Educators for the afternoon academic session' },
    'NON-TEACHING STAFF': { title: 'Non-Teaching Staff', subtitle: 'Administrative and support personnel' },
    'SUPPORT STAFF': { title: 'Support Staff', subtitle: 'Campus maintenance and student care' },
  };

  const currentTabInfo = tabInfo[activeTab] || { title: activeTab, subtitle: 'Directory and structure coming soon.' };


  // refs for SVG lines
  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [paths, setPaths] = useState<{ d: string; key: string }[]>([]);
  const [svgH, setSvgH] = useState(0);




  // compute SVG connector paths after layout
  useLayoutEffect(() => {
    const compute = () => {
      const c = containerRef.current;
      if (!c) return;
      setSvgH(c.offsetHeight);

      const newPaths: { d: string; key: string }[] = [];

      // root → each level-1 node
      currentMembers.level1.forEach((m) => {
        const from = nodeRefs.current['root'];
        const to = nodeRefs.current[m.id];
        if (!from || !to || !c) return;
        const fc = getCenter(from, c);
        const tc = getCenter(to, c);
        newPaths.push({ key: `root-${m.id}`, d: makeCurvedPath(fc.x, fc.bottom, tc.x, tc.top) });
      });

      // level-1 → each level-2 node
      currentMembers.level2.forEach((m) => {
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
  }, [activeTab, viewMode, currentMembers.level1, currentMembers.level2]);

  return (
    <div className="gallery-page">

      {/* ── NAVBAR ── */}
      <Navbar initialVariant="gallery" />

      {/* ── MAIN CONTENT ── */}
      {viewMode === 'selection' && (
        <div className="gallery-selection-view">
          <div className="selection-split left" onClick={() => setViewMode('governance')}>
            <img src="/a17.jpeg?v=3" alt="Governance" className="bg-img" style={{ objectPosition: 'top' }} />
            <div className="overlay"></div>
            <div className="content">
              <span className="selection-label">Leadership</span>
              <h2>Governing Body</h2>
              <p>Explore the leadership and administrative structure of St. Stephen's School.</p>
              <button>View Structure</button>
            </div>
          </div>
          <div className="selection-split right" onClick={() => setViewMode('dignitaries')}>
            <img src="/v20.webp" alt="Dignitaries" className="bg-img" />
            <div className="overlay"></div>
            <div className="content">
              <span className="selection-label">Visits & Events</span>
              <h2>Dignitaries</h2>
              <p>Voices, visits, and memories from our esteemed guests and dignitaries.</p>
              <button>View Dignitaries</button>
            </div>
          </div>
        </div>
      )}

      {viewMode === 'governance' && (
        <>
          {/* ── HEADER ── */}
          <div className="gallery-header">
            <div className="gallery-header-inner">
              <div className="header-left">
                <button className="gallery-back-btn" onClick={() => setViewMode('selection')}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                  Back to Gallery
                </button>
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
          {(activeTab === 'MANAGEMENT TEAM' || activeTab === 'MORNING FACULTY' || activeTab === 'AFTERNOON FACULTY') ? (
            /* ── ADVANCED EDITORIAL PHOTO GRID ── */
            <div className="photo-grid-wrap">

              {/* ── GROUP PHOTO BANNER with editorial overlay ── */}
              <div className="pg-banner">
                <img
                  loading="lazy"
                  src={
                    activeTab === 'MORNING FACULTY' ? MORNING_FACULTY_GRID.groupPhoto
                      : activeTab === 'AFTERNOON FACULTY' ? AFTERNOON_FACULTY_GRID.groupPhoto
                        : MANAGEMENT_GRID.groupPhoto
                  }
                  alt={`${currentTabInfo.title} Group Photo`}
                  className="pg-banner-img"
                />
                <div className="pg-banner-overlay">
                  <div className="pg-banner-tag">Group Photo</div>
                  <div className="pg-banner-title">{currentTabInfo.title}</div>
                  <div className="pg-banner-sub">{currentTabInfo.subtitle}</div>
                </div>
              </div>

              {/* ── LEADERSHIP ROW (Management Team only) — Featured Cards ── */}
              {activeTab === 'MANAGEMENT TEAM' && (<>
                <div className="pg-divider">
                  <div className="pg-divider-line" />
                  <span className="pg-divider-label">Leadership</span>
                  <div className="pg-divider-line right" />
                </div>
                <div className="pg-featured-grid">
                  {MANAGEMENT_GRID.leaders.map((m, i) => (
                    <div className={`pg-featured-card ${i === 1 ? 'pg-featured-center' : ''}`} key={i}>
                      <div className="pg-featured-img">
                        <img loading="lazy" src={m.img} alt={m.name} />
                      </div>
                      <div className="pg-featured-overlay">
                        <div className="pg-featured-info">
                          <div className="pg-featured-role">{m.role}</div>
                          <div className="pg-featured-name">{m.name}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>)}

              {/* ── MEMBERS GRID — Overlay Reveal Cards ── */}
              <div className="pg-divider" style={{ marginTop: activeTab === 'MANAGEMENT TEAM' ? '2rem' : '0' }}>
                <div className="pg-divider-line" />
                <span className="pg-divider-label">
                  {activeTab === 'MANAGEMENT TEAM' ? 'Team Members' : 'Faculty Members'}
                </span>
                <div className="pg-divider-line right" />
              </div>

              <div className="pg-overlay-grid">
                {(
                  activeTab === 'MORNING FACULTY' ? MORNING_FACULTY_GRID.members
                    : activeTab === 'AFTERNOON FACULTY' ? AFTERNOON_FACULTY_GRID.members
                      : MANAGEMENT_GRID.members
                ).map((m, i) => (
                  <div className="pg-overlay-card" key={i}>
                    <div className="pg-overlay-img">
                      <img loading="lazy" src={m.img} alt={m.name} />
                    </div>
                    <div className="pg-overlay-info">
                      <div className="pg-overlay-name">{m.name}</div>
                      <div className="pg-overlay-role">{m.role}</div>
                    </div>
                    <div className="pg-overlay-index">{String(i + 1).padStart(2, '0')}</div>
                  </div>
                ))}
              </div>

            </div>

          ) : isTreeTab ? (
            <div className="org-canvas-wrap">
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
                    {currentMembers.root.img && (
                      <div className="node-avatar">
                        <img loading="lazy" src={currentMembers.root.img} alt={currentMembers.root.name} />
                      </div>
                    )}
                    <div className="node-name">{currentMembers.root.name}</div>
                    <div className="node-role">{currentMembers.root.role}</div>
                    <p className="node-bio">{currentMembers.root.bio}</p>
                    <div className="node-arrow" />
                  </div>
                </div>

                {/* ROW 1 — Level 1 */}
                <div className="org-row org-row-1">
                  {currentMembers.level1.map((m, i) => (
                    <div
                      key={m.id}
                      className="org-node"
                      data-delay={i + 1}
                      ref={el => { nodeRefs.current[m.id] = el; }}
                    >
                      <div className="node-avatar">
                        <img loading="lazy" src={m.img} alt={m.name} />
                      </div>
                      <div className="node-name">{m.name}</div>
                      <div className="node-role">{m.role}</div>
                      <p className="node-bio">{m.bio}</p>
                      <div className="node-arrow" />
                    </div>
                  ))}
                </div>

                {/* ROW 2 — Level 2 */}
                <div className="org-row org-row-2">
                  {currentMembers.level1.map((parent) => {
                    const children = currentMembers.level2.filter(m => m.parentId === parent.id);
                    if (children.length === 0) return null;
                    return (
                      <div key={`group-${parent.id}`} className="org-group">
                        {children.map((m, i) => (
                          <div
                            key={m.id}
                            className="org-node"
                            data-delay={i + 3}
                            ref={el => { nodeRefs.current[m.id] = el; }}
                          >
                            <div className="node-avatar">
                              <img loading="lazy" src={m.img} alt={m.name} />
                            </div>
                            <div className="node-name">{m.name}</div>
                            <div className="node-role">{m.role}</div>
                            <p className="node-bio">{m.bio}</p>
                            <div className="node-arrow" />
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>

              </div>
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
        </>
      )}

      {viewMode === 'dignitaries' && (
        <div className="eminent-dignitaries-view">
          <div className="eminent-hero">
            <div className="eminent-hero-bg" style={{ backgroundImage: 'url(/v4.webp)' }}></div>
            <div className="eminent-hero-veil"></div>

            <div className="eminent-hero-content">
              <div className="eminent-hero-text">
                <span>VISITS OF DISTINGUISHED LEADERS</span>
                <h1>Eminent Dignitaries</h1>
                <p>Celebrating the inspiring visits of leaders, educators, policymakers, and changemakers.</p>
              </div>
            </div>
          </div>

          <div className="dignitary-grid-container">
            {[
              // Page 24 (Existing)
              { id: 1, name: 'Shri Keshari Nath Tripathi', role: 'Governor of West Bengal', image: '/t1.webp' },
              { id: 2, name: 'Dr. Abdus Sattar', role: 'West Bengal Minority Affair Minister', image: '/t2.webp' },
              { id: 3, name: 'Dinesh Bajaj', role: 'Politician', image: '/c6.webp' },
              { id: 4, name: 'Mohammed Salim', role: 'Ex MP Lok Sabha', image: '/t4.webp' },
              { id: 5, name: 'Md. Nadimul Haque', role: 'M.P Rajya Sabha', image: '/c7.webp' },
              { id: 6, name: 'Rehana Khatoon', role: 'Councillor and Borough Chairman', image: '/c8.webp' },
              { id: 7, name: 'Jeffrey K. Reneau', role: 'Director, American Center.', image: '/c9.webp' },
              { id: 8, name: 'Adrian Pratt', role: 'Director, American Center', image: '/c10.webp' },
              { id: 9, name: 'Cory Wilcox', role: 'US Consulate', image: '/c11.webp' },
              { id: 10, name: 'Idris Ali', role: 'MP', image: '/c12.webp' },
              { id: 11, name: 'Lesego Motsumi', role: 'Botswana High Commission', image: '/c13.webp' },
              { id: 12, name: 'Nicolas Facino', role: 'Director of Alliance Francaise', image: '/c14.webp' },

              // Page 27
              { id: 13, name: 'Shri Jag Mohan', role: 'IPS', image: '/c15.webp' },
              { id: 14, name: 'Ranjit Kumar Pachnanda', role: 'IPS', image: '/c16.webp' },
              { id: 15, name: 'Debasish Roy', role: 'IPS', image: '/c17.webp' },
              { id: 16, name: 'Damayanti Sen', role: 'IPS', image: '/c18.webp' },
              { id: 17, name: 'Gautam Mohan Chakraborty', role: 'IPS', image: '/c19.webp' },
              { id: 18, name: 'Ajoy Mukund Ranade', role: 'IPS', image: '/c20.webp' },
              { id: 19, name: 'Nevendera Singh ', role: 'IPS', image: '/c21.webp' },
              { id: 20, name: 'Tripurari Atharv', role: 'IPS', image: '/c22.webp' },
              { id: 21, name: 'Sanjay Singh', role: 'IPS', image: '/c23.webp' },
              { id: 22, name: 'Nizam Shamim', role: 'IPS', image: '/c24.webp' },



            ].map((dig) => (
              <div className="dig-grid-item" key={dig.id}>
                <div className="dig-grid-avatar">
                  <img loading="lazy" src={dig.image} alt={dig.name} />
                </div>
                <div className="dig-grid-info">
                  <h3 className="dig-grid-name">{dig.name}</h3>
                  <p className="dig-grid-role">{dig.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

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
