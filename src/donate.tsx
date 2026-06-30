import { useState } from 'react';
import Navbar from './Navbar';
import './donate.css';

export default function Donate() {
  const [copied, setCopied] = useState<string | null>(null);

  const [amount, setAmount] = useState<number>(5000);
  const [isCustom, setIsCustom] = useState<boolean>(false);


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
      <Navbar initialVariant="about" />

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
                      ? "Contributes directly to our general fund to support ongoing student needs and campus maintenance."
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
              <div className="payment-content">
                {/* ── CONTACT FOR DONATION ── */}
                <div className="tab-pane fade-in">
                  <div className="pane-header">
                    <h3>CONTACT US</h3>
                    <p>Reach out to our representatives for premium support and direct donations.</p>
                  </div>

                  <div className="contact-details-list">
                    {[
                      { name: 'Imran Zaki', phone: '+91 98310 19298', id: 'imran' },
                      { name: 'Mushy Mushtaq', phone: '+91 90386 06389', id: 'mushy' },
                    ].map((contact) => (
                      <div className="contact-detail-item" key={contact.id}>
                        <div className="contact-info">
                          <div className="contact-avatar">
                            {contact.name.charAt(0)}
                          </div>
                          <div className="contact-text">
                            <span className="contact-name">{contact.name}</span>
                            <span className="contact-phone">{contact.phone}</span>
                          </div>
                        </div>
                        <div className="contact-actions">
                          <button
                            className={`action-btn ${copied === contact.id ? 'copied' : ''}`}
                            onClick={() => handleCopy(contact.phone, contact.id)}
                            title="Copy Phone Number"
                          >
                            {copied === contact.id ? (
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            ) : (
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                            )}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

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
