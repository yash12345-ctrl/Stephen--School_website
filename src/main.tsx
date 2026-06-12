import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import About from './about.tsx'
import News from './news.tsx'
import School from './school.tsx'
import Christmas from './christmas.tsx';
import Eid from './eid.tsx';
import AnnualConcert from './annual_concert.tsx';
import Rabindrajayanti from './rabindrajayanti.tsx';
import Indep from './indep.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<About />} />
        <Route path="/news" element={<News />} />
        <Route path="/the-school" element={<School />} />
        <Route path="/annual-concert" element={<AnnualConcert />} />
        <Route path="/christmas" element={<Christmas />} />
        <Route path="/eid" element={<Eid />} />
        <Route path="/rabindrajayanti" element={<Rabindrajayanti />} />
        <Route path="/indep" element={<Indep />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
