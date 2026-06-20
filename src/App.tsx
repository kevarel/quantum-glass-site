import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Gallery from './pages/Gallery';

// IDs of the homepage content widgets (between header and footer)
const HOMEPAGE_CONTENT_IDS = [
  '8e905d65-1d69-4f8d-9d0d-442ab09e15a5',  // about
  'e0ccb4ec-232d-4193-b034-0e2170a2f746',  // reviews
  '5fe55a79-ebc4-42e3-b11a-c0d831b082f7',  // social
  '50ceea4e-b037-4f30-9385-6278ad56d8f4',  // faq
  '275bfadc-59bb-450f-b214-e1a08392a295',  // contact
];

const PageManager: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  // Intercept clicks on GoDaddy nav links for client-side navigation
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a[href]') as HTMLAnchorElement;
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (href && (href === '/' || href === '/gallery-1' || href === '/gallery')) {
        e.preventDefault();
        navigate(href);
        window.scrollTo(0, 0);
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [navigate]);

  useEffect(() => {
    // Show/hide homepage content sections
    HOMEPAGE_CONTENT_IDS.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.style.display = isHome ? '' : 'none';
      }
    });

    // Hide the hero section (full-height background with tagline) on non-home pages
    // but keep the nav bar visible
    const headerSection = document.querySelector('[data-aid="HEADER_SECTION"]') as HTMLElement;
    if (headerSection) {
      if (isHome) {
        headerSection.style.minHeight = '';
        headerSection.style.paddingTop = '';
        headerSection.style.paddingBottom = '';
      } else {
        headerSection.style.minHeight = '0';
        headerSection.style.paddingTop = '0';
        headerSection.style.paddingBottom = '0';
      }
    }

    // Hide the hero text/button content on non-home pages
    const heroBlocks = document.querySelectorAll('[data-ux="Hero"]');
    heroBlocks.forEach(el => {
      (el as HTMLElement).style.display = isHome ? '' : 'none';
    });

    // Hide/collapse the background image on non-home pages
    const bgImage = document.querySelector('[data-aid="BACKGROUND_IMAGE_RENDERED"]') as HTMLElement;
    if (bgImage) {
      if (isHome) {
        bgImage.style.minHeight = '';
        bgImage.style.height = '';
      } else {
        bgImage.style.minHeight = '0';
        bgImage.style.height = 'auto';
      }
    }
  }, [isHome]);

  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <Router>
      <PageManager>
        <Routes>
          <Route path="/" element={null} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/gallery-1" element={<Gallery />} />
        </Routes>
      </PageManager>
    </Router>
  );
};

export default App;
