import { useState, forwardRef } from 'react';
import type { ReactNode, ForwardedRef } from 'react';
import './news.css';
import HTMLFlipBook from 'react-pageflip';
import Navbar from './Navbar';

const FlipBook = HTMLFlipBook as React.ElementType;
interface BookPageProps {
  children: ReactNode;
  density?: 'soft' | 'hard';
}

const BookPage = forwardRef((props: BookPageProps, ref: ForwardedRef<HTMLDivElement>) => {
  return (
    <div className="book-page" ref={ref} data-density={props.density || 'soft'}>
      <div className="book-page-content" style={{ height: '100%' }}>
        {props.children}
      </div>
    </div>
  );
});

/* ══════════════════════════════════════════
   DATA
══════════════════════════════════════════ */


const allNews = [
  {
    id: 1, category: 'Governor' as const,
    date: 'May 4, 2017', readTime: '2 min read',
    title: 'Shri Keshari Nath Tripathi — Governor of West Bengal',
    excerpt: 'Visit by His Excellency Shri Keshari Nath Tripathi, the Governor of West Bengal and Brother Brendan Mac Carthaigh on 4th May, 2017.',
    image: '/v19.webp', image2: '/v20.webp', featured: true, hot: true,
  },
  {
    id: 2, category: 'Diplomat' as const,
    date: 'April 17, 2018', readTime: '2 min read',
    title: 'Mrs. Iris Schrod & Mr. Jurgen Thomas Schrod — Deputy Consul General of Germany',
    excerpt: 'On April 17, 2018, Mrs. Iris Schrod and Mr. Jurgen Thomas Schrod, Deputy Consul General of Germany, visited St. Stephen\'s School Bowbazar.',
    image: '/v21.webp', image2: '/v22.webp', featured: false, hot: true,
  },
  {
    id: 3, category: 'Diplomat' as const,
    date: 'December 4, 2018', readTime: '2 min read',
    title: 'Consul General of Japan',
    excerpt: 'Mr. Masayuki Taga, Consul General of Japan, Kolkata paid a visit to our school in the Art and Craft Exhibition on 4th of December, 2018.',
    image: '/v23.webp', featured: false, hot: false,
  },
  {
    id: 4, category: 'Diplomat' as const,
    date: 'June 29, 2022', readTime: '3 min read',
    title: 'Consul General of People Republic of China',
    excerpt: 'Mr. Zha Liyou, Consul General of People Republic of China, paid a visit to our school on 29th of June, 2022 and interacted warmly with our school teachers and students. He also graciously attended the monitor selection ceremony, witnessing the oath-taking and encouraging the young leaders.',
    image: '/v24.webp', image2: '/v25.webp', image3: '/v26.webp', image4: '/v4.webp', featured: false, hot: false,
  },
  {
    id: 5, category: 'Diplomat' as const,
    date: 'July 19, 2022', readTime: '2 min read',
    title: 'Director of the American Center',
    excerpt: 'Mr. Adrian Pratt, Director of the American Center visited St. Stephens School and interacted with the kids on July 19, 2022.',
    image: '/v27.webp', image2: '/v28.webp', featured: true, hot: true,
  },
  {
    id: 6, category: 'Dignitary' as const,
    date: '7th September', readTime: '2 min read',
    title: 'Embassy of the United States of America',
    excerpt: 'On September 7th, 2022, Ms. Ruth Goode, representing the Embassy of the United States of America.',
    image: '/v29.webp', featured: false, hot: false,
  },
  {
    id: 7, category: 'Dignitary' as const,
    date: '8th July', readTime: '2 min read',
    title: 'Director of Alliance Francaise',
    excerpt: 'Mr. Nicolas Facino, Director of Alliance Francaise visited our school on 8th July, 2022. He provided insights on the importance of education, skill development. He encouraged the students to pursue their dreams with determination.',
    image: '/v30.webp', featured: false, hot: false,
  },
  {
    id: 8, category: 'Dignitary' as const,
    date: '7th September', readTime: '2 min read',
    title: 'Embassy of the United States of Americas',
    excerpt: 'On September 7th, 2022, Ms. Ruth Goode, representing the Embassy of the United States of America.',
    image: '/v31.webp', image2: '/v32.webp', featured: true, hot: true,
  },
  {
    id: 9, category: 'Dignitary' as const,
    date: '8th July', readTime: '2 min read',
    title: 'Mr. Nicolas Facino, Director of Alliance  Francaise',
    excerpt: 'Mr. Nicolas Facino, Director of Alliance Francaise visited our school on 8th July, 2022. He provided insights on the importance of education, skill development. He encouraged the students to pursue their dreams with determination.',
    image: '/v30.webp', featured: false, hot: false,
  }
];





/* ══════════════════════════════════════════
   COMPONENT
══════════════════════════════════════════ */
export default function News() {
  const [isClosed, setIsClosed] = useState(true);



  const visibleNews = allNews;

  return (
    <div className="news-page">

      {/* ── NAVBAR ── */}
      <Navbar initialVariant="about" />

      {/* ── BREAKING NEWS TICKER ── */}
      <div className="np-ticker">
        <div className="np-ticker-label">Welcome</div>
        <div className="np-ticker-track">
          <div className="np-ticker-scroll">
            <span>Guiding Our Institution With Vision and Excellence</span>
            <span className="np-ticker-dot">✦</span>
            <span>Shaping the Leaders of Tomorrow</span>
            <span className="np-ticker-dot">✦</span>
            <span>Empowering Students Every Day</span>
            <span className="np-ticker-dot">✦</span>
            <span>Inspiring Innovation in Education</span>
            <span className="np-ticker-dot">✦</span>
            {/* duplicate for seamless loop */}
            <span>Guiding Our Institution With Vision and Excellence</span>
            <span className="np-ticker-dot">✦</span>
            <span>Shaping the Leaders of Tomorrow</span>
            <span className="np-ticker-dot">✦</span>
            <span>Empowering Students Every Day</span>
            <span className="np-ticker-dot">✦</span>
            <span>Inspiring Innovation in Education</span>
            <span className="np-ticker-dot">✦</span>
          </div>
        </div>
      </div>

      {/* ── FLIPBOOK LAYOUT ── */}
      <div className="flipbook-wrapper" style={{ minHeight: '100vh', paddingTop: '60px', paddingBottom: '60px', paddingLeft: '5vw', paddingRight: '5vw', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <div style={{
          width: '100%',
          maxWidth: '1000px',
          display: 'flex',
          justifyContent: 'center',
          transition: 'transform 0.6s ease',
          transform: isClosed ? 'translateX(-25%)' : 'translateX(0)',
        }}>
          <FlipBook
            width={500}
            height={700}
            size="stretch"
            minWidth={300}
            maxWidth={500}
            minHeight={400}
            maxHeight={700}
            maxShadowOpacity={0.5}
            showCover={true}
            mobileScrollSupport={true}
            className="my-flipbook"
            onFlip={(e: { data: number }) => setIsClosed(e.data === 0)}
            style={{ margin: '0 auto', boxShadow: '0 20px 50px rgba(0,0,0,0.2)' }}
          >
            {/* Right Cover / Title Page (Page 1) */}
            <BookPage density="hard">
              <div className="book-cover" style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                height: '100%', padding: '1.5rem', boxSizing: 'border-box', backgroundColor: '#eaddcf'
              }}>
                <div style={{
                  width: '100%', height: '100%',
                  border: '2px solid #1a1a1a',
                  outline: '4px double #1a1a1a', outlineOffset: '-12px',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  padding: '2rem', boxSizing: 'border-box'
                }}>
                  <div className="logo-crest-wrapper" style={{ margin: '0 auto 1.5rem' }}>
                    <img loading="lazy" src="/v2.webp" className="logo-crest-img" alt="St. Stephen's Crest" style={{ width: '80px', filter: 'grayscale(100%) sepia(50%) contrast(1.2)' }} />
                  </div>

                  <h1 className="np-paper-title" style={{ fontSize: '4.5rem', textAlign: 'center', margin: 0, lineHeight: 1.1, fontFamily: '"Playfair Display", serif', color: '#0f1115' }}>The Dignitary<br />Voice</h1>

                  <div style={{ width: '80%', margin: '2.5rem auto', border: '4px double #1a1a1a', padding: '4px' }}>
                    <img loading="lazy" src="/v6.webp" alt="Cover Image" style={{ width: '100%', height: '220px', objectFit: 'cover', filter: 'grayscale(100%) sepia(30%) contrast(1.1)', display: 'block' }} />
                  </div>

                  <p className="subtitle" style={{ textAlign: 'center', margin: 0, fontWeight: 700, letterSpacing: '4px', textTransform: 'uppercase', fontSize: '1.2rem', color: '#0f1115', fontFamily: '"Inter", sans-serif' }}>St. Stephen's School</p>
                  <div style={{ width: '40px', height: '2px', background: '#0f1115', margin: '1rem auto' }}></div>
                  <p style={{ textAlign: 'center', margin: '0', fontStyle: 'italic', fontSize: '1.1rem', color: '#333', fontFamily: '"Merriweather", serif' }}>Special Dignitaries Edition</p>

                  <div style={{ marginTop: 'auto', textAlign: 'center' }}>
                    <p style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#0f1115', margin: 0 }}>Est. 1971 &mdash; Vol. I</p>
                  </div>
                </div>
              </div>
            </BookPage>

            {/* Content Pages */}
            {visibleNews.flatMap((item) => {
              const pages = [];

              if (item.image) {
                // Page for Full Image
                pages.push(
                  <BookPage key={`${item.id}-img`}>
                    <div style={{
                      width: '100%', height: '100%',
                      padding: '2.5rem',
                      display: 'grid',
                      gridTemplateColumns: (item.image3 || item.image4) ? '1fr 1fr' : '1fr',
                      gridTemplateRows: (item.image2 || item.image3 || item.image4) ? '1fr 1fr' : '1fr',
                      backgroundColor: '#f4f0e6',
                      boxSizing: 'border-box',
                      gap: '1.5rem'
                    }}>
                      {[item.image, item.image2, item.image3, item.image4].filter(Boolean).map((imgSrc, idx) => (
                        <div key={idx} style={{
                          width: '100%',
                          height: '100%',
                          border: '2px solid #1a1a1a',
                          padding: '4px',
                          backgroundColor: '#fff',
                          boxSizing: 'border-box',
                          minHeight: 0
                        }}>
                          <img loading="lazy" src={imgSrc} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%) sepia(20%) contrast(1.15)', display: 'block' }} />
                        </div>
                      ))}
                    </div>
                  </BookPage>
                );
              }

              // Page for Text Content
              pages.push(
                <BookPage key={`${item.id}-txt`}>
                  <div className="book-story" style={{ padding: '0', height: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', backgroundColor: '#f4f0e6' }}>
                    <div style={{ padding: '3.5rem', flex: 1 }}>
                      <h2 className="np-paper-h-small" style={{ fontSize: '2.4rem', marginBottom: '1.5rem', lineHeight: 1.1 }}>{item.title}</h2>
                      <div className="book-meta" style={{ borderBottom: '1px solid #1a1a1a', paddingBottom: '15px', marginBottom: '25px', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>{item.category} • {item.date}</div>

                      <div className="book-text" style={{ fontSize: '1.1rem', lineHeight: '1.8', textAlign: 'justify', color: '#1a1a1a' }}>
                        <p><span className="np-drop-cap" style={{ float: 'left', fontSize: '5rem', lineHeight: '0.8', paddingRight: '0.15em', paddingTop: '0.1em', fontFamily: '"Playfair Display", serif', fontWeight: 900 }}>{item.excerpt.charAt(0)}</span>{item.excerpt.slice(1)}</p>
                      </div>
                    </div>
                    <div className="book-page-number" style={{ paddingBottom: '20px', width: '100%', textAlign: 'center', fontSize: '0.9rem', color: '#1a1a1a', fontWeight: 'bold' }}>- {item.id} -</div>
                  </div>
                </BookPage>
              );

              return pages;
            })}
            {/* Back Cover */}
            <BookPage density="hard">
              <div className="book-back-cover" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '3rem' }}>
                <div className="logo-crest-wrapper" style={{ margin: '0 auto 2rem', opacity: 0.5 }}>
                  <img loading="lazy" src="/v2.webp" className="logo-crest-img" alt="St. Stephen's Crest" style={{ width: '80px', filter: 'grayscale(100%) sepia(30%)' }} />
                </div>
                <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '2rem', marginBottom: '1rem', textAlign: 'center' }}>St. Stephen's School</h3>
                <p style={{ fontSize: '1rem', color: '#555' }}>Established 1971</p>
              </div>
            </BookPage>
          </FlipBook>
        </div>
      </div>

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
