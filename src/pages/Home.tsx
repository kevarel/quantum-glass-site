import React from 'react';


const Home: React.FC = () => {
  const derp = import.meta.env.VITE_DERP;
  return (
    <div>
      <h2>Home Page</h2>
      <p>derp: { derp }</p>
    </div>
  );
};

export default Home;