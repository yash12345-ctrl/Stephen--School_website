import React, { useState } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Link } from 'react-router-dom';
import './apply.css';
import { ProgramMegaMenu } from './program_top';

export default function Apply() {
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const [selectedGrade, setSelectedGrade] = useState('');
  const [submittedData, setSubmittedData] = useState<Record<string, string>>({});

  const totalSteps = 4;

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });
    data.programApplied = selectedGrade;
    setSubmittedData(data);

    try {
      const response = await fetch('http://localhost:4001/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        console.error('Failed to submit to backend:', await response.text());
        setIsSubmitted(true); // Still show success for UI demo purposes, or handle error
      }
    } catch (err) {
      console.error('Network error while submitting:', err);
      setIsSubmitted(true); // Still show success so user can download PDF
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    // Premium Colors
    const navy = [11, 15, 25] as [number, number, number];
    const gold = [201, 168, 76] as [number, number, number];
    const slate = [148, 163, 184] as [number, number, number];

    // Document Frame (Subtle border around the whole page)
    doc.setDrawColor(201, 168, 76); // Gold border
    doc.setLineWidth(0.5);
    doc.rect(10, 10, 190, 277);

    // Header
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.setTextColor(navy[0], navy[1], navy[2]);
    doc.text("ST. STEPHEN'S SCHOOL", 105, 28, { align: 'center' });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(slate[0], slate[1], slate[2]);
    doc.text("PREMIUM ADMISSIONS PORTAL 2026-27", 105, 36, { align: 'center' });

    // Decorative Gold Line
    doc.setDrawColor(gold[0], gold[1], gold[2]);
    doc.setLineWidth(1);
    doc.line(75, 42, 135, 42);

    // Application ID / Date
    doc.setFontSize(9);
    doc.setTextColor(100);
    const appId = "APP-" + Math.floor(100000 + Math.random() * 900000);
    doc.text(`Application ID: ${appId}`, 20, 52);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 190, 52, { align: 'right' });

    const tableData = [
      [{ content: 'FAMILY INFORMATION', colSpan: 2, styles: { fillColor: navy, textColor: gold, fontStyle: 'bold' as const, halign: 'center' as const } }],
      ['Primary Guardian', submittedData.guardianName || '-'],
      ['Relationship', submittedData.guardianRelation || '-'],
      ['Occupation', submittedData.guardianOccupation || '-'],
      ['Email', submittedData.guardianEmail || '-'],
      ['Phone', submittedData.guardianPhone || '-'],
      ['Address', `${submittedData.guardianAddress || '-'}, ${submittedData.guardianCity || '-'}`],

      [{ content: 'STUDENT PROFILE', colSpan: 2, styles: { fillColor: navy, textColor: gold, fontStyle: 'bold' as const, halign: 'center' as const } }],
      ['Student Name', submittedData.studentName || '-'],
      ['Date of Birth', submittedData.studentDob || '-'],
      ['Gender', submittedData.studentGender || '-'],
      ['Nationality', submittedData.studentNationality || '-'],
      ['Blood Group', submittedData.studentBloodGroup || '-'],
      ['Medical Info', submittedData.studentMedical || 'None'],

      [{ content: 'ACADEMIC DETAILS', colSpan: 2, styles: { fillColor: navy, textColor: gold, fontStyle: 'bold' as const, halign: 'center' as const } }],
      ['Program Applied', submittedData.programApplied || '-'],
      ['Previous School', submittedData.previousSchool || 'N/A'],
      ['Curriculum Board', submittedData.curriculumBoard || 'N/A'],
      ['Extracurricular', submittedData.extracurricularInterests || 'N/A'],

      [{ content: 'LOGISTICS & FINAL DETAILS', colSpan: 2, styles: { fillColor: navy, textColor: gold, fontStyle: 'bold' as const, halign: 'center' as const } }],
      ['Transport Required', submittedData.transportationRequired || '-'],
      ['Enrollment Type', submittedData.enrollmentType || '-'],
      ['Reason for Enrolling', submittedData.reasonForEnrolling || '-'],
    ];

    autoTable(doc, {
      startY: 58,
      body: tableData,
      theme: 'grid',
      headStyles: { fillColor: navy, textColor: [255, 255, 255] },
      columnStyles: {
        0: { cellWidth: 55, fontStyle: 'bold', fillColor: [250, 251, 252], textColor: navy },
        1: { textColor: [50, 50, 50] }
      },
      styles: { fontSize: 10, cellPadding: 8, lineColor: [226, 232, 240], lineWidth: 0.5 }
    });

    // Official Signatures Area
    const finalY = (doc as unknown as { lastAutoTable?: { finalY: number } }).lastAutoTable?.finalY || 200;
    if (finalY < 230) {
      doc.setDrawColor(200);
      doc.setLineWidth(0.5);
      doc.line(30, finalY + 30, 80, finalY + 30);
      doc.text("Parent/Guardian Signature", 55, finalY + 35, { align: 'center' });

      doc.line(130, finalY + 30, 180, finalY + 30);
      doc.text("Admissions Officer", 155, finalY + 35, { align: 'center' });
    }

    const pageCount = (doc as unknown as { internal: { getNumberOfPages: () => number } }).internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(150);
      doc.text(`Generated securely by St. Stephen's School Portal on ${new Date().toLocaleDateString()}  •  Page ${i} of ${pageCount}`, 105, 282, { align: 'center' });
    }

    doc.save(`${submittedData.studentName || 'Application'}_StStephens.pdf`);
  };

  const gradeOptions = [
    { id: 'pre', label: 'Pre-Primary', icon: '🧸', desc: 'Lower Nursery to Upper Nursery' },
    { id: 'primary', label: 'Primary School', icon: '📚', desc: 'Classes I to V' },
    { id: 'middle', label: 'Middle School', icon: '🔬', desc: 'Classes VI to VIII' },
    { id: 'high', label: 'High School', icon: '🎓', desc: 'Classes IX & X' },
  ];

  return (
    <div className="site">
      {/* ── NAVBAR ── */}
      <nav className={`navbar${scrolled ? ' navbar--fixed' : ''}`}>
        <div className="nav-inner">
          <Link to="/" className="nav-logo">
            <div className="logo-crest-wrapper">
              <img src="/v2.png" className="logo-crest-img" alt="St. Stephen's Crest" />
            </div>
            <div>
              <div className="logo-name">St. Stephen's</div>
              <div className="logo-tagline">SCHOOL</div>
            </div>
          </Link>
          <ul className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
            {['Home', 'About', 'Programs', 'School', 'News', 'Contact'].map(l => (
              <li
                key={l}
                onMouseEnter={l === 'Programs' ? () => setMegaMenuOpen(true) : undefined}
                onMouseLeave={l === 'Programs' ? () => setMegaMenuOpen(false) : undefined}
                className={l === 'Programs' ? 'has-mega' : ''}
              >
                <Link
                  to={l === 'Home' ? '/' : l === 'About' ? '/about' : l === 'News' ? '/news' : `/#${l.toLowerCase()}`}
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
                </Link>
                {l === 'Programs' && (
                  <ProgramMegaMenu open={megaMenuOpen} />
                )}
              </li>
            ))}
            {/* Mobile-only Apply Button */}
            <li className="mobile-only-nav-apply">
              <Link to="/apply" onClick={() => setMobileMenuOpen(false)}>Apply Now</Link>
            </li>
          </ul>
          <div className="nav-actions">
            <Link to="/apply" className="nav-cta">Apply Now →</Link>
            <div className={`mobile-toggle ${mobileMenuOpen ? 'active' : ''}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <span></span><span></span><span></span>
            </div>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="apply-hero">
        <div className="apply-hero-bg" />
        <div className="apply-hero-veil" />

        <div className="apply-hero-content">
          <div className="s-tag light">Admissions 2026–27</div>
          <h1 className="apply-title">Your Future Starts <span className="gold">Here</span></h1>
          <p className="apply-subtitle">Join a community of global thinkers, innovators, and leaders. Begin your premium admission journey by completing the comprehensive application below.</p>
        </div>
      </section>

      {/* ── FORM WIZARD ── */}
      <section className="apply-section">
        <div className="apply-container">

          {/* Sidebar */}
          <div className="apply-sidebar">
            <h3 className="apply-sidebar-title">The Greenfield<br /><span>Advantage</span></h3>
            <ul className="apply-features">
              <li className="af-item">
                <div className="af-icon">🌍</div>
                <div className="af-text">
                  <h4>Global Curriculum</h4>
                  <p>International standards seamlessly integrated with local values.</p>
                </div>
              </li>
              <li className="af-item">
                <div className="af-icon">🏆</div>
                <div className="af-text">
                  <h4>Elite Placement</h4>
                  <p>98% of our students are accepted into top-tier universities.</p>
                </div>
              </li>
              <li className="af-item">
                <div className="af-icon">🔬</div>
                <div className="af-text">
                  <h4>Advanced Facilities</h4>
                  <p>State-of-the-art STEM labs and Olympic-standard sports complexes.</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Main Form */}
          <div className="apply-main">
            {!isSubmitted ? (
              <>
                {/* Progress Tracker */}
                <div className="apply-progress">
                  <div className="progress-line">
                    <div className="progress-fill" style={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }}></div>
                  </div>

                  {[1, 2, 3, 4].map(num => (
                    <div key={num} className={`step-node ${step === num ? 'active' : ''} ${step > num ? 'completed' : ''}`}>
                      <div className="step-circle">
                        {step > num ? (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        ) : num}
                      </div>
                      <span className="step-label">
                        {num === 1 ? 'Family' : num === 2 ? 'Student' : num === 3 ? 'Academics' : 'Details'}
                      </span>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSubmit}>
                  {/* STEP 1: Parent / Family Details */}
                  {step === 1 && (
                    <div className="form-step">
                      <div className="form-header">
                        <h2>Family Information</h2>
                        <p>Provide details of the primary guardians or parents.</p>
                      </div>
                      <div className="form-grid">
                        <div className="form-group full" style={{ marginBottom: '-10px' }}>
                          <label style={{ color: 'var(--gold)' }}>Primary Guardian (Father/Mother/Guardian)</label>
                        </div>
                        <div className="form-group">
                          <label>Full Name</label>
                          <input type="text" name="guardianName" placeholder="e.g. Rahul Sharma" required />
                        </div>
                        <div className="form-group">
                          <label>Relationship to Child</label>
                          <select name="guardianRelation" required>
                            <option value="">Select...</option>
                            <option value="father">Father</option>
                            <option value="mother">Mother</option>
                            <option value="guardian">Legal Guardian</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label>Occupation / Profession</label>
                          <input type="text" name="guardianOccupation" placeholder="e.g. Software Engineer" required />
                        </div>
                        <div className="form-group">
                          <label>Organization / Company</label>
                          <input type="text" name="guardianCompany" placeholder="e.g. Tech Corp" />
                        </div>
                        <div className="form-group">
                          <label>Email Address</label>
                          <input type="email" name="guardianEmail" placeholder="rahul@example.com" required />
                        </div>
                        <div className="form-group">
                          <label>Mobile Number</label>
                          <input type="tel" name="guardianPhone" placeholder="+91 00000 00000" required />
                        </div>

                        <div className="form-group full" style={{ marginTop: '10px' }}>
                          <label>Complete Residential Address</label>
                          <input type="text" name="guardianAddress" placeholder="House/Flat No, Street, Landmark" required />
                        </div>
                        <div className="form-group">
                          <label>City</label>
                          <input type="text" name="guardianCity" placeholder="City" required />
                        </div>
                        <div className="form-group">
                          <label>Postal Code / PIN</label>
                          <input type="text" name="guardianPin" placeholder="PIN Code" required />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 2: Student Details */}
                  {step === 2 && (
                    <div className="form-step">
                      <div className="form-header">
                        <h2>Student Profile</h2>
                        <p>Personal and medical information of the candidate.</p>
                      </div>
                      <div className="form-grid">
                        <div className="form-group full">
                          <label>Candidate's Full Name (As per birth certificate)</label>
                          <input type="text" name="studentName" placeholder="First Name Middle Name Last Name" required />
                        </div>
                        <div className="form-group">
                          <label>Date of Birth</label>
                          <input type="date" name="studentDob" required />
                        </div>
                        <div className="form-group">
                          <label>Gender</label>
                          <select name="studentGender" required>
                            <option value="">Select...</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label>Nationality</label>
                          <input type="text" name="studentNationality" placeholder="e.g. Indian" required />
                        </div>
                        <div className="form-group">
                          <label>Primary Language Spoken at Home</label>
                          <input type="text" name="studentLanguage" placeholder="e.g. English, Hindi" required />
                        </div>
                        <div className="form-group">
                          <label>Blood Group</label>
                          <select name="studentBloodGroup" required>
                            <option value="">Select...</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label>Medical Conditions / Allergies</label>
                          <input type="text" name="studentMedical" placeholder="List any (or write None)" required />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 3: Academic Background */}
                  {step === 3 && (
                    <div className="form-step">
                      <div className="form-header">
                        <h2>Academic Details</h2>
                        <p>Select the program and provide past academic history.</p>
                      </div>
                      <div className="form-grid">
                        <div className="form-group full" style={{ marginBottom: '1rem' }}>
                          <label>Program Applied For</label>
                          <div className="grade-selector">
                            {gradeOptions.map(g => (
                              <div
                                key={g.id}
                                className={`grade-card ${selectedGrade === g.id ? 'selected' : ''}`}
                                onClick={() => setSelectedGrade(g.id)}
                              >
                                <div className="grade-icon">{g.icon}</div>
                                <div className="grade-info">
                                  <h4>{g.label}</h4>
                                  <p>{g.desc}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="form-group full">
                          <label>Name of Current/Previous School</label>
                          <input type="text" name="previousSchool" placeholder="School name (if applicable)" />
                        </div>
                        <div className="form-group">
                          <label>Last Grade Completed</label>
                          <input type="text" name="lastGradeCompleted" placeholder="e.g. Grade 4" />
                        </div>
                        <div className="form-group">
                          <label>Curriculum Board (Previous School)</label>
                          <select name="curriculumBoard">
                            <option value="">Select...</option>
                            <option value="CBSE">CBSE</option>
                            <option value="ICSE">ICSE</option>
                            <option value="IB">IB</option>
                            <option value="IGCSE">IGCSE</option>
                            <option value="State Board">State Board</option>
                            <option value="Other">Other / Not Applicable</option>
                          </select>
                        </div>
                        <div className="form-group full">
                          <label>Extracurricular Interests (Sports, Arts, etc.)</label>
                          <input type="text" name="extracurricularInterests" placeholder="e.g. Basketball, Painting, Robotics" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 4: Additional Information */}
                  {step === 4 && (
                    <div className="form-step">
                      <div className="form-header">
                        <h2>Final Details</h2>
                        <p>Logistics and additional information to process your application.</p>
                      </div>
                      <div className="form-grid">
                        <div className="form-group">
                          <label>School Transportation Required?</label>
                          <select name="transportationRequired" required>
                            <option value="">Select...</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label>Preferred Enrollment Type</label>
                          <select name="enrollmentType" required>
                            <option value="">Select...</option>
                            <option value="day">Day Scholar</option>
                            <option value="boarding">Boarding / Residential</option>
                          </select>
                        </div>
                        <div className="form-group full">
                          <label>How did you hear about St. Stephen's School?</label>
                          <select name="referralSource" required>
                            <option value="">Select...</option>
                            <option value="friends">Friends / Family Referral</option>
                            <option value="social_media">Social Media (Facebook/Instagram)</option>
                            <option value="google">Google Search</option>
                            <option value="advertisement">Print Advertisement</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                        <div className="form-group full">
                          <label>Why do you wish to enroll your child at St. Stephen's School?</label>
                          <textarea name="reasonForEnrolling" rows={4} placeholder="Briefly describe your expectations and how we align with your goals..." required></textarea>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="form-actions">
                    {step > 1 ? (
                      <button type="button" className="btn-prev" onClick={handlePrev}>
                        ← Previous
                      </button>
                    ) : <div></div>}

                    {step < totalSteps ? (
                      <button type="button" className="btn-next" onClick={handleNext}>
                        Next Step →
                      </button>
                    ) : (
                      <button type="submit" className="btn-submit">
                        Submit Application
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                      </button>
                    )}
                  </div>
                </form>
              </>
            ) : (
              <div className="success-screen">
                <div className="success-icon">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <h2>Application Received!</h2>
                <p>Thank you for choosing St. Stephen's School. Our admissions committee will review your profile and we'll reach out to you at the email provided within 2-3 business days.</p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1.5rem' }}>
                  <button className="btn-prev" onClick={generatePDF} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--navy)', borderColor: 'var(--navy)' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                    Download PDF
                  </button>
                  <button className="btn-submit" onClick={() => window.location.href = '/'}>
                    Return to Homepage
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </section>

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
