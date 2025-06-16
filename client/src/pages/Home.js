import React, { useEffect, useState } from 'react';
import FoodLogger from '../components/FoodLogger';
import LoadingScreen from '../components/LoadingScreen';


const Home = () => {
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowLoading(false), 3000); // Delay showing content
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showLoading && <LoadingScreen />}
      <div className="min-h-screen bg-green-100 flex flex-col items-center px-4 py-10 relative z-10">
        <h1 className="text-[50px] font-[Koulen] text-black text-center mb-8 z-10">
          HOSTALOGUE BY BHUVI
        </h1>
        <FoodLogger />
      </div>
    </>
  );
};

export default Home;
