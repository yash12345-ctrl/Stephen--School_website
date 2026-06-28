import { useState, forwardRef, useRef, useCallback } from 'react';
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
    id: 0, category: '' as const,
    date: '7th July 2011', readTime: '3 min read',
    title: 'Mrs. Agnimitra Paul with the students of St Stephens School',
    excerpt: '',
    image: '/l3.webp', image2: '/l4.webp', featured: false, hot: false,
  },
  {
    id: 0.5, category: '' as const,
    date: '9th July, 2010', readTime: '3 min read',
    title: 'Rupa Ganguly visited St Stephens School for Kutchina event',
    excerpt: '',
    image: '/l5.webp', image2: '/l7.webp', featured: false, hot: false,
  },
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
    title: "Consul General of People 's Republic of China",
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
  const [selectedMagazine, setSelectedMagazine] = useState<'none' | 'dignitary' | 'cuttings'>('none');
  const [isClosed, setIsClosed] = useState(true);
  const [isClosed2, setIsClosed2] = useState(true);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleCarouselScroll = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return;
    const idx = Math.round(el.scrollLeft / el.offsetWidth);
    setActiveCardIndex(idx);
  }, []);

  const fakeNewsCuttings: Array<{
    id: number;
    category: string;
    date: string;
    readTime: string;
    title: string;
    excerpt: string;
    image: string;
    image2?: string;
    title2?: string;
    date2?: string;
    featured?: boolean;
    hot?: boolean;
    publisher?: string;
    publisher2?: string;
  }> = [
      {
        id: 101, category: 'METRO' as const,
        date: '7 Nov 2024', readTime: '3 min read',
        date2: '20 Feb 2023',
        title: 'Envoy from US explains the power of voting',
        excerpt: '',
        image: '/c1.webp', image2: '/z1.webp', featured: true, hot: true,
      },
      {
        id: 102, category: 'Metro' as const,
        date: '23 April 2023', readTime: '4 min read',
        title: 'Celebrating Id with First Generation learners',
        excerpt: '',
        image: '/c2.webp', image2: '/z2.webp', featured: false, hot: false,
      },
      {
        id: 103, category: 't2' as const,
        date: '4 June 2022', readTime: '3 min read',
        title: "Those Who beat the odds to Excel",
        title2: "RABINDRA JAYANTI WITH 'MUSIC AND LYRICS",
        date2: "26 MAY 2022",
        excerpt: '',
        image: '/c3.webp', image2: '/z3.webp', featured: false, hot: false,
      },
      {
        id: 104, category: '. METRO' as const,
        date: '07 May 2022', readTime: '3 min read',
        title: "Gifts For School Children",
        title2: "Life Lession Learn in Summer Session",
        date2: "19.June.2014",
        excerpt: '',
        image: '/z4.webp', image2: '/z5.webp', featured: false, hot: false,
      },
      {
        id: 105, category: '. TIME CITY' as const,
        date: '18 AUG 2014', readTime: '3 min read',
        date2: "12 FEB 2014",
        title: "Independant Day Celebration",
        title2: "On Display, Tales of triumph",
        excerpt: '',
        image: '/z6.webp', image2: '/z7.webp', featured: false, hot: false,
        publisher: 'The Times of India', publisher2: 'The Times of India',
      },
      {
        id: 106, category: '. TIME CITY' as const,
        date: '20 FEB 2025', readTime: '3 min read',
        date2: "24 JULY 2022",
        title: "CP Discusses safe mobile use",
        title2: "Students Tour Museum",
        excerpt: '',
        image: '/z8.webp', image2: '/z9.webp', featured: false, hot: false,
        publisher: 'The Times of India', publisher2: 'The Times of India',
      },
      {
        id: 107, category: '' as const,
        date: '17 MAY 2022', readTime: '3 min read',
        date2: "7 MAY 2022",
        title: "Teacher Felicitation Ceremony",
        title2: "Special Eid for needy Kids",
        excerpt: '',
        image: '/z10.webp', image2: '/z11.webp', featured: false, hot: false,
        publisher: 'Sanmarg',
        publisher2: 'The Times of India',
      },



    ];
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

      {/* ── SELECTION SCREEN OR FLIPBOOK ── */}
      {selectedMagazine === 'none' ? (
        <div className="mag-desk-container">
          <div className="mag-desk-header">
            <h1>Our Publications</h1>
            <div className="mag-desk-instruction-box">Swipe to browse · Tap to open</div>
          </div>

          {/* Swipe carousel */}
          <div
            className="mag-desk-items mag-carousel"
            ref={carouselRef}
            onScroll={handleCarouselScroll}
          >
            <div className="mag-desk-item item-dignitary" onClick={() => setSelectedMagazine('dignitary')}>
              <div className="mag-desk-cover">
                <img loading="lazy" src="/v4.webp" alt="The Dignitary Voice" />
                <div className="mag-desk-label">The Dignitary Voice</div>
              </div>
            </div>
            <div className="mag-desk-item item-cuttings" onClick={() => setSelectedMagazine('cuttings')}>
              <div className="mag-desk-cover">
                <img loading="lazy" src="/z4.webp" alt="Media Coverage" />
                <div className="mag-desk-label">Media Coverage</div>
              </div>
            </div>
          </div>

          {/* Dot indicators */}
          <div className="mag-carousel-dots">
            {[0, 1].map(i => (
              <button
                key={i}
                className={`mag-dot ${activeCardIndex === i ? 'active' : ''}`}
                onClick={() => {
                  carouselRef.current?.scrollTo({ left: i * (carouselRef.current?.offsetWidth ?? 0), behavior: 'smooth' });
                }}
                aria-label={i === 0 ? 'The Dignitary Voice' : 'Media Coverage'}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="flipbook-wrapper flipbook-wrapper--light">

          <button className="mag-back-btn" onClick={() => {
            setSelectedMagazine('none');
            setIsClosed(true);
            setIsClosed2(true);
          }}>
            &larr; Back to Selection
          </button>

          {/* FIRST BOOK */}
          {selectedMagazine === 'dignitary' && (
            <div className={`flipbook-transition-wrapper ${isClosed ? 'closed' : 'open'}`}>
              <FlipBook
                width={400}
                height={560}
                size="stretch"
                minWidth={280}
                maxWidth={400}
                minHeight={380}
                maxHeight={560}
                maxShadowOpacity={0.5}
                showCover={true}
                mobileScrollSupport={true}
                usePortrait={true}
                className="my-flipbook"
                onFlip={(e: { data: number }) => setIsClosed(e.data === 0)}
                style={{ margin: '0 auto', boxShadow: '0 20px 50px rgba(0,0,0,0.2)' }}
              >
                {/* Right Cover / Title Page (Page 1) */}
                <BookPage density="hard">
                  <div className="book-cover bg-eaddcf" style={{ padding: '0' }}>
                    <div className="np-book-cover-inner">
                      <div className="logo-crest-wrapper" style={{ margin: '0 auto 1.2rem' }}>
                        <img loading="lazy" src="/v2.webp" className="logo-crest-img" alt="St. Stephen's Crest" style={{ width: '45px' }} />
                      </div>

                      <h1 className="np-paper-title" style={{ fontSize: 'clamp(2rem, 8vw, 2.8rem)', textAlign: 'center', margin: 0, lineHeight: 1.1, fontFamily: '"Playfair Display", serif', color: '#0f1115' }}>The Dignitary<br />Voice</h1>

                      <div style={{ width: '75%', flex: 1, minHeight: '130px', maxHeight: '220px', margin: '1.5rem auto', border: '4px double #1a1a1a', padding: '4px', display: 'flex', flexDirection: 'column' }}>
                        <img loading="lazy" src="/a16.jpeg" alt="Cover Image" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }} />
                      </div>

                      <p className="subtitle" style={{ textAlign: 'center', margin: '0 0 0.5rem', fontWeight: 700, letterSpacing: '5px', textTransform: 'uppercase', fontSize: '0.85rem', color: '#0f1115', fontFamily: '"Inter", sans-serif' }}>St. Stephen's School</p>
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
                        <div className="newspaper-container np-book-img-container" style={{
                          gridTemplateColumns: (item.image3 || item.image4) ? '1fr 1fr' : '1fr',
                          gridTemplateRows: (item.image2 || item.image3 || item.image4) ? '1fr 1fr' : '1fr',
                        }}>
                          {[item.image, item.image2, item.image3, item.image4].filter(Boolean).map((imgSrc, idx) => (
                            <div key={idx} style={{
                              width: '100%',
                              height: '100%',
                              border: '2px solid #1a1a1a',
                              padding: '3px',
                              backgroundColor: '#fff',
                              boxSizing: 'border-box',
                              minHeight: 0
                            }}>
                              <img loading="lazy" src={imgSrc} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }} />
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
                        <div className="np-book-story-inner">
                          <h2 className="np-paper-h-small" style={{ fontSize: '1.8rem', marginBottom: '1rem', lineHeight: 1.1 }}>{item.title}</h2>

                          <div className="np-paper-caption" style={{ marginBottom: '1rem' }}>
                            {item.category} &bull; {item.date}
                          </div>

                          <p className="np-paper-p" style={{ fontSize: '1.05rem', lineHeight: 1.7, textAlign: 'justify', margin: 0 }}>
                            <span className="np-paper-dropcap" style={{ fontSize: '4.5rem', float: 'left', marginRight: '6px', marginTop: '6px', lineHeight: 0.8, fontFamily: '"Playfair Display", serif', fontWeight: 900, color: '#1a1a1a' }}>{item.excerpt.charAt(0)}</span>
                            {item.excerpt.slice(1)}
                          </p>
                        </div>
                      </div>
                    </BookPage>
                  );

                  return pages;
                })}

                {/* Back Cover */}
                <BookPage density="hard">
                  <div className="book-back-cover np-book-back-cover-inner bg-eaddcf">
                    <div className="logo-crest-wrapper" style={{ margin: '0 auto 1.5rem', opacity: 0.5 }}>
                      <img loading="lazy" src="/v2.webp" className="logo-crest-img" alt="St. Stephen's Crest" style={{ width: '60px' }} />
                    </div>
                    <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.5rem', marginBottom: '0.5rem', textAlign: 'center' }}>St. Stephen's School</h3>
                    <p style={{ fontSize: '0.9rem', color: '#555' }}>Established 2001</p>
                  </div>
                </BookPage>
              </FlipBook>
            </div>
          )}

          {/* SECOND BOOK */}
          {selectedMagazine === 'cuttings' && (
            <div className={`flipbook-transition-wrapper ${isClosed2 ? 'closed' : 'open'}`}>
              <FlipBook
                width={400}
                height={560}
                size="stretch"
                minWidth={280}
                maxWidth={400}
                minHeight={380}
                maxHeight={560}
                maxShadowOpacity={0.5}
                showCover={true}
                mobileScrollSupport={true}
                usePortrait={true}
                className="my-flipbook-2"
                onFlip={(e: { data: number }) => setIsClosed2(e.data === 0)}
                style={{ margin: '0 auto', boxShadow: '0 20px 50px rgba(0,0,0,0.2)' }}
              >
                {/* Right Cover / Title Page (Page 1) */}
                <BookPage density="hard">
                  <div className="book-cover bg-d4c5b0" style={{ padding: '0' }}>
                    <div className="np-book-cover-inner">
                      <div className="logo-crest-wrapper" style={{ margin: '0 auto 1.2rem' }}>
                        <img loading="lazy" src="/v2.webp" className="logo-crest-img" alt="St. Stephen's Crest" style={{ width: '45px' }} />
                      </div>

                      <h1 className="np-paper-title" style={{ fontSize: 'clamp(2rem, 8vw, 2.5rem)', textAlign: 'center', margin: 0, lineHeight: 1.1, fontFamily: '"Playfair Display", serif', color: '#0f1115' }}>Media &<br />Publications</h1>

                      <div style={{ width: '75%', flex: 1, minHeight: '120px', maxHeight: '180px', margin: '1.2rem auto', border: '4px double #1a1a1a', padding: '4px', display: 'flex', flexDirection: 'column' }}>
                        <img loading="lazy" src="/a16.jpeg" alt="Cover Image" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }} />
                      </div>

                      <p className="subtitle" style={{ textAlign: 'center', margin: '0', fontWeight: 700, letterSpacing: '4px', textTransform: 'uppercase', fontSize: '0.9rem', color: '#0f1115', fontFamily: '"Inter", sans-serif' }}>ST. Stephen Schools</p>
                      <div style={{ width: '40px', height: '2px', background: '#0f1115', margin: '0.4rem auto' }}></div>
                      <p style={{ textAlign: 'center', margin: '0', fontStyle: 'italic', fontSize: '0.85rem', color: '#333', fontFamily: '"Merriweather", serif' }}>BOWBAZAR</p>

                      <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                        <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#0f1115', margin: 0 }}></p>
                      </div>
                    </div>
                  </div>
                </BookPage>

                {/* Content Pages */}
                {fakeNewsCuttings.flatMap((item) => {
                  const pages = [];

                  if (item.image) {
                    pages.push(
                      <BookPage key={`${item.id}-img`}>
                        <div className="news-clipping-page">
                          <h2 className="news-clipping-title">
                            {item.title}
                          </h2>

                          <div className="news-clipping-image-wrapper">
                            <img loading="lazy" src={item.image} alt={item.title} />
                          </div>

                          <div className="news-clipping-footer">
                            {item.publisher || 'The Telegrapgh'} &bull; {item.category ? <>{item.category} &bull; </> : ''}{item.date}
                          </div>
                        </div>
                      </BookPage>
                    );
                  }

                  pages.push(
                    <BookPage key={`${item.id}-txt`}>
                      {item.image2 ? (
                        <div className="news-clipping-page">
                          <h2 className="news-clipping-title">
                            {item.title2 || item.title}
                          </h2>

                          <div className="news-clipping-image-wrapper">
                            <img loading="lazy" src={item.image2} alt={item.title} />
                          </div>

                          <div className="news-clipping-footer">
                            {item.publisher2 || item.publisher || 'The Telegrapgh'} &bull; {item.category ? <>{item.category} &bull; </> : ''}{item.date2 || item.date}
                          </div>
                        </div>
                      ) : (
                        <div className="book-story" style={{ padding: '0', height: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', backgroundColor: '#f4f0e6' }}>
                          <div className="np-book-story-inner">
                            <h2 className="np-paper-h-small" style={{ fontSize: '1.8rem', marginBottom: '1rem', lineHeight: 1.1 }}>{item.title}</h2>

                            <div className="np-paper-caption" style={{ marginBottom: '1rem' }}>
                              {item.category} &bull; {item.date}
                            </div>

                            <p className="np-paper-p" style={{ fontSize: '1.05rem', lineHeight: 1.7, textAlign: 'justify', margin: 0 }}>
                              {item.excerpt && <span className="np-paper-dropcap" style={{ fontSize: '4.5rem', float: 'left', marginRight: '6px', marginTop: '6px', lineHeight: 0.8, fontFamily: '"Playfair Display", serif', fontWeight: 900, color: '#1a1a1a' }}>{item.excerpt.charAt(0)}</span>}
                              {item.excerpt && item.excerpt.slice(1)}
                            </p>
                          </div>
                        </div>
                      )}
                    </BookPage>
                  );

                  return pages;
                })}

                {/* Back Cover */}
                <BookPage density="hard">
                  <div className="book-back-cover np-book-back-cover-inner bg-d4c5b0">
                    <div className="logo-crest-wrapper" style={{ margin: '0 auto 1.5rem', opacity: 0.5 }}>
                      <img loading="lazy" src="/v2.webp" className="logo-crest-img" alt="St. Stephen's Crest" style={{ width: '60px' }} />
                    </div>
                    <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.5rem', marginBottom: '0.5rem', textAlign: 'center' }}>St. Stephen's School</h3>
                    <p style={{ fontSize: '0.9rem', color: '#555' }}>Media Records</p>
                  </div>
                </BookPage>
              </FlipBook>
            </div>
          )}

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
