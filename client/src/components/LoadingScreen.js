import React, { useEffect, useState } from 'react';

const LoadingScreen = () => {
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setFade(true), 2500); 
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-1000 ${
        fade ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <h1 className="text-white text-4xl font-bold animate-pulse">
        HOSTALOGUE (～￣▽￣)～ 
      </h1>
    </div>
  );
};

export default LoadingScreen;
