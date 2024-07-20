import React from 'react';


const Home: React.FC = () => {
  const derp = import.meta.env.VITE_DERP;
  const derp2 = import.meta.env.VITE_QUANTUM_GLASS_BOOKS;
  return (
    <div>
      <h2>Home Page</h2>
      <p>derp: { derp }</p>
      <p>derp2: { derp2 }</p>
    </div>
  );
};

export default Home;