import React from 'react';
import FoodLogger from '../components/FoodLogger';

const Home = () => {
  return (
    <div className="min-h-screen bg-green-100 flex flex-col items-center px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-bold text-indigo-600 mb-6 text-center">
         Hostalogue by 𝓑𝓱𝓾𝓿𝓲
      </h1>
      <FoodLogger />
    </div>
  );
};

export default Home;

