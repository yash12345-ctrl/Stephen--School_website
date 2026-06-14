import { useState, useEffect, useRef } from 'react';
import { ProgramMegaMenu } from './program_top';
import './donate.css';

export default function Donate() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'bank' | 'upi' | 'intl'>('bank');
  const [amount, setAmount] = useState<number>(5000);
  const [isMonthly, setIsMonthly] = useState<boolean>(false);
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(null), 2000);
  };

  const impactMap: Record<number, string> = {
    1000: "Provides study materials, notebooks, and essential stationeries for 2 students.",
    5000: "Sponsors a student's complete education and development for an entire month.",
    15000: "Provides textbooks, winter uniforms, and nutritious meals for 5 children.",
    50000: "Funds a classroom's digital infrastructure and smart-board learning for a year."
  };

  return (
    <div className="donate-page">
      {/* ── NAVBAR ── */}
      <nav className={`navbar navbar--donate ${scrolled ? 'navbar--fixed' : ''}`}>
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
            {['Home', 'About', 'Programs', 'School', 'News', 'Gallery'].map(l => (
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
                                `#${l.toLowerCase().replace(/\s+/g, '-')}`
                  }
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
          </ul>
          <div className="nav-actions">
            <a href="/donate" className="nav-cta">Donate Now →</a>
            <div className={`mobile-toggle ${mobileMenuOpen ? 'active' : ''}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <span></span><span></span><span></span>
            </div>
          </div>
        </div>
      </nav>

      {/* ── DONATE HERO ── */}
      <section className="donate-hero">
        <div className="container donate-grid">
          {/* Left Column: Impact & Story */}
          <div className="donate-left">
            <div className="donate-hero-top-visual">
              <div className="donate-hero-img-wrapper">
                <img loading="lazy" src="/v4.webp" alt="Students of St. Stephen's" />
              </div>
              <div className="donate-hero-stats">
                <div className="dh-stat">
                  <span className="dh-num">500+</span>
                  <span className="dh-lbl">Students</span>
                </div>
                <div className="dh-stat">
                  <span className="dh-num">20+</span>
                  <span className="dh-lbl">Years</span>
                </div>
                <div className="dh-stat">
                  <span className="dh-num">100%</span>
                  <span className="dh-lbl">NGO</span>
                </div>
              </div>
            </div>

            <div className="donate-chip">
              <span className="chip-dot"></span> MAKE AN IMPACT
            </div>
            <h1 className="donate-title">Empower a Child's <span className="gold-text">Future</span></h1>
            <p className="donate-subtitle">
              St. Stephen's School has been providing quality education to underprivileged children in Bowbazar since 2001.
              Your generous contribution helps us provide books, uniforms, infrastructure, and a safe haven for our 500+ students.
            </p>

            <div className="emotional-trigger-box">
              <div className="trigger-icon">💡</div>
              <p>Your <strong>₹5,000</strong> can provide books and uniforms for a child for an <strong>entire academic year.</strong></p>
            </div>

            <div className="donation-calculator">
              <div className="calc-header">
                <h3 className="calc-title">Select your impact</h3>
                <div className="freq-toggle">
                  <button className={`freq-btn ${!isMonthly ? 'active' : ''}`} onClick={() => setIsMonthly(false)}>One Time</button>
                  <button className={`freq-btn ${isMonthly ? 'active' : ''}`} onClick={() => setIsMonthly(true)}>Monthly</button>
                </div>
              </div>

              <div className="amount-grid">
                {[1000, 5000, 15000, 50000].map(amt => (
                  <button
                    key={amt}
                    className={`amount-btn ${amount === amt && !isCustom ? 'active' : ''}`}
                    onClick={() => { setAmount(amt); setIsCustom(false); }}
                  >
                    ₹{amt.toLocaleString()}
                  </button>
                ))}
              </div>

              <div className={`custom-amount-wrapper ${isCustom ? 'active' : ''}`}>
                <span className="currency-symbol">₹</span>
                <input
                  type="number"
                  placeholder="Enter custom amount"
                  value={isCustom ? (amount || '') : ''}
                  onChange={(e) => {
                    setIsCustom(true);
                    setAmount(Number(e.target.value));
                  }}
                  className="custom-input"
                />
              </div>

              <div className="impact-display">
                <div className="impact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
                </div>
                <div className="impact-text">
                  <strong>The Impact:</strong> {
                    isCustom
                      ? (isMonthly ? "Provides sustained, long-term flexible support for our school's most critical operations." : "Contributes directly to our general fund to support ongoing student needs and campus maintenance.")
                      : impactMap[amount] || "Contributes to our general fund."
                  }
                </div>
              </div>

              <div className="calc-footer">
                <div className="security-badge">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                  100% Secure & Direct Transfer
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Advanced Payment Tabs */}
          <div className="donate-right">
            <div className="payment-card">
              <div className="payment-tabs">
                <button className={`tab-btn ${activeTab === 'bank' ? 'active' : ''}`} onClick={() => setActiveTab('bank')}>Bank Transfer</button>
                <button className={`tab-btn ${activeTab === 'upi' ? 'active' : ''}`} onClick={() => setActiveTab('upi')}>UPI / QR</button>
                <button className={`tab-btn ${activeTab === 'intl' ? 'active' : ''}`} onClick={() => setActiveTab('intl')}>International</button>
              </div>

              <div className="payment-content">
                {/* ── BANK TRANSFER TAB ── */}
                {activeTab === 'bank' && (
                  <div className="tab-pane fade-in">
                    <div className="pane-header">
                      <h3>NEFT / RTGS / IMPS</h3>
                      <p>Instant domestic transfers directly to our NGO account.</p>
                    </div>

                    <div className="bank-details-list">
                      {[
                        { label: 'Account Name', value: "ST. STEPHEN's SCHOOL NGO", id: 'name' },
                        { label: 'Bank Name', value: 'State Bank of India', id: 'bank' },
                        { label: 'Account Number', value: '3141 5926 5358', id: 'acc' },
                        { label: 'IFSC Code', value: 'SBIN0001234', id: 'ifsc' },
                        { label: 'Branch', value: 'Bowbazar Branch, Kolkata', id: 'branch' },
                      ].map((detail) => (
                        <div className="bank-detail-item" key={detail.id}>
                          <div className="detail-left">
                            <span className="detail-label">{detail.label}</span>
                            <span className="detail-value">{detail.value}</span>
                          </div>
                          <button
                            className={`copy-btn ${copied === detail.id ? 'copied' : ''}`}
                            onClick={() => handleCopy(detail.value, detail.id)}
                            title="Copy to clipboard"
                          >
                            {copied === detail.id ? (
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            ) : (
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                            )}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── UPI TAB ── */}
                {activeTab === 'upi' && (
                  <div className="tab-pane fade-in">
                    <div className="pane-header">
                      <h3>Scan & Pay via UPI</h3>
                      <p>Supports GPay, PhonePe, Paytm, and all major UPI apps.</p>
                    </div>

                    <div className="upi-container">
                      <div className="qr-wrapper">
                        {/* A dynamic, professional looking QR box */}
                        <div className="qr-corners">
                          <img loading="lazy" src="/img.webp" alt="NGO Logo" className="qr-center-logo" />
                        </div>
                        <div className="qr-scan-line"></div>
                      </div>

                      <div className="upi-id-box">
                        <div className="detail-left">
                          <span className="detail-label">Merchant UPI ID</span>
                          <span className="detail-value">ststephensngo@sbi</span>
                        </div>
                        <button
                          className={`copy-btn ${copied === 'upi' ? 'copied' : ''}`}
                          onClick={() => handleCopy('ststephensngo@sbi', 'upi')}
                        >
                          {copied === 'upi' ? (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                          ) : (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── INTERNATIONAL TAB ── */}
                {activeTab === 'intl' && (
                  <div className="tab-pane fade-in">
                    <div className="pane-header">
                      <h3>International Wire</h3>
                      <p>For donors outside India via SWIFT or Wire Transfer.</p>
                    </div>

                    <div className="bank-details-list">
                      {[
                        { label: 'SWIFT Code', value: 'SBININBBXXX', id: 'swift' },
                        { label: 'Account Name', value: "ST. STEPHEN's SCHOOL NGO", id: 'iname' },
                        { label: 'Account Number', value: '3141 5926 5358', id: 'iacc' },
                        { label: 'Bank Name', value: 'State Bank of India', id: 'ibank' },
                        { label: 'Branch Address', value: '123 Bowbazar Street, Kolkata 700012, India', id: 'iadd' },
                      ].map((detail) => (
                        <div className="bank-detail-item" key={detail.id}>
                          <div className="detail-left">
                            <span className="detail-label">{detail.label}</span>
                            <span className="detail-value">{detail.value}</span>
                          </div>
                          <button
                            className={`copy-btn ${copied === detail.id ? 'copied' : ''}`}
                            onClick={() => handleCopy(detail.value, detail.id)}
                            title="Copy to clipboard"
                          >
                            {copied === detail.id ? (
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            ) : (
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                            )}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="student-testimonial">
              <svg className="quote-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
              <div className="testimonial-content">
                <p>"Money is a helping hand—extend it to those in need."</p>
                <div className="testimonial-author">
                  <strong>— Rahul K.</strong>
                </div>
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
