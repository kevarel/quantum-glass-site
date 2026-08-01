import React, { useEffect, useLayoutEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Gallery from './pages/Gallery';

// IDs of the homepage content widgets (between header and footer)
const HOMEPAGE_CONTENT_IDS = [
  '8e905d65-1d69-4f8d-9d0d-442ab09e15a5',  // about
  'e0ccb4ec-232d-4193-b034-0e2170a2f746',  // reviews
  '5fe55a79-ebc4-42e3-b11a-c0d831b082f7',  // social
  '50ceea4e-b037-4f30-9385-6278ad56d8f4',  // faq
  '275bfadc-59bb-450f-b214-e1a08392a295',  // contact
];

function hideHomepageContent() {
  HOMEPAGE_CONTENT_IDS.forEach(id => {
    const elements = document.querySelectorAll(`[id="${id}"].widget`);
    elements.forEach(el => {
      (el as HTMLElement).style.display = 'none';
    });
  });

  const headerSection = document.querySelector('[data-aid="HEADER_SECTION"]') as HTMLElement;
  if (headerSection) {
    headerSection.style.minHeight = '0';
    headerSection.style.paddingTop = '0';
    headerSection.style.paddingBottom = '0';
  }

  const heroBlocks = document.querySelectorAll('[data-ux="Hero"]');
  heroBlocks.forEach(el => {
    (el as HTMLElement).style.display = 'none';
  });

  const bgImage = document.querySelector('[data-aid="BACKGROUND_IMAGE_RENDERED"]') as HTMLElement;
  if (bgImage) {
    bgImage.style.minHeight = '0';
    bgImage.style.height = 'auto';
  }
}

function showHomepageContent() {
  HOMEPAGE_CONTENT_IDS.forEach(id => {
    const elements = document.querySelectorAll(`[id="${id}"].widget`);
    elements.forEach(el => {
      (el as HTMLElement).style.display = '';
    });
  });

  const headerSection = document.querySelector('[data-aid="HEADER_SECTION"]') as HTMLElement;
  if (headerSection) {
    headerSection.style.minHeight = '';
    headerSection.style.paddingTop = '';
    headerSection.style.paddingBottom = '';
  }

  const heroBlocks = document.querySelectorAll('[data-ux="Hero"]');
  heroBlocks.forEach(el => {
    (el as HTMLElement).style.display = '';
  });

  const bgImage = document.querySelector('[data-aid="BACKGROUND_IMAGE_RENDERED"]') as HTMLElement;
  if (bgImage) {
    bgImage.style.minHeight = '';
    bgImage.style.height = '';
  }
}

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
      if (href && (href === '/' || href === '/gallery')) {
        e.preventDefault();
        navigate(href);
        window.scrollTo(0, 0);

        // Close the mobile navigation drawer if it's open
        const drawer = document.querySelector('[data-ux="NavigationDrawer"]') as HTMLElement;
        if (drawer) {
          drawer.style.transform = '';
          drawer.style.visibility = 'hidden';
        }
        // Remove body scroll lock that the drawer may have added
        document.body.classList.remove('disable-scroll');
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [navigate]);

  // useLayoutEffect fires synchronously before browser paint
  useLayoutEffect(() => {
    // Remove the early-hide style tag injected by the inline script
    const routeHideStyle = document.getElementById('route-hide');
    if (routeHideStyle) {
      routeHideStyle.remove();
    }

    if (isHome) {
      showHomepageContent();
    } else {
      hideHomepageContent();
    }
  }, [isHome]);

  // Also set up a MutationObserver to catch content injected by GoDaddy scripts
  useEffect(() => {
    if (isHome) return;

    // Hide again after a short delay to catch GoDaddy scripts that render late
    const timer = setTimeout(() => {
      hideHomepageContent();
    }, 100);

    // Watch for DOM changes that might re-show content
    const observer = new MutationObserver(() => {
      hideHomepageContent();
    });

    HOMEPAGE_CONTENT_IDS.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el, { childList: true, subtree: true });
      }
    });

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
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
          <Route path="/gallery-1" element={<Navigate to="/gallery" replace />} />
        </Routes>
      </PageManager>
    </Router>
  );
};

export default App;
