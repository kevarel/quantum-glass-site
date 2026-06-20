import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Gallery from './pages/Gallery';

const HideStaticContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    const staticContent = document.querySelector('.layout') as HTMLElement;
    if (staticContent) {
      if (location.pathname === '/') {
        staticContent.style.display = '';
      } else {
        staticContent.style.display = 'none';
      }
    }
  }, [location.pathname]);

  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <Router>
      <HideStaticContent>
        <Routes>
          <Route path="/" element={null} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/gallery-1" element={<Gallery />} />
        </Routes>
      </HideStaticContent>
    </Router>
  );
};

export default App;
