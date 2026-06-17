import { useState, useEffect, useRef } from 'react';
import { ProgramMegaMenu } from './program_top';

interface NavbarProps {
  initialVariant?: 'about' | 'default';
}

export default function Navbar({ initialVariant = 'default' }: NavbarProps) {
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
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

  let navClass = 'navbar';
  if (scrolled) {
    navClass += ' navbar--fixed';
  } else if (initialVariant === 'about') {
    navClass += ' navbar--about';
  }

  return (
    <nav className={navClass}>
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
          {['Home', 'About', 'Programs', 'School', 'News', 'Gallery',].map(l => (
            <li
              key={l}
              onMouseEnter={l === 'Programs' ? () => {
                if (closeTimer.current) clearTimeout(closeTimer.current);
                setMegaMenuOpen(true);
              } : undefined}
              onMouseLeave={l === 'Programs' ? () => {
                closeTimer.current = setTimeout(() => setMegaMenuOpen(false), 200);
              } : undefined}
              className={l === 'Programs' ? 'has-mega' : ''}
            >
              <a
                href={
                  l === 'Home' ? '/' :
                    l === 'About' ? '/about' :
                      l === 'News' ? '/news' :
                        l === 'Programs' ? '/#programs' :
                          l === 'School' ? '/the-school' :
                            l === 'Gallery' ? '/gallery' :
                              `/#${l.toLowerCase().replace(/\s+/g, '-')}`
                }
                onClick={(e) => {
                  if (l === 'Programs') {
                    e.preventDefault();
                    setMegaMenuOpen(!megaMenuOpen);
                  } else {
                    setMobileMenuOpen(false);
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
                <ProgramMegaMenu open={megaMenuOpen} onClose={() => setMegaMenuOpen(false)} />
              )}
            </li>
          ))}
          <li className="mobile-only-nav-apply">
            <a href="/donate">Donate</a>
          </li>
        </ul>
        <div className="nav-actions">
          <a href="/donate" className="nav-cta">Donate Now →</a>
          <div className={`mobile-toggle ${mobileMenuOpen ? 'active' : ''}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <span></span><span></span><span></span>
          </div>
        </div>
      </div>
    </nav>
  );
}
