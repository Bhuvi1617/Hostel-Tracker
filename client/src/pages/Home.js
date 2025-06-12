import { useState, useEffect } from 'react';
import FoodForm from '../components/FoodForm';
import FoodList from '../components/FoodList';

const Home = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    fetch('https://hostel-tracker.onrender.com/api/foodentry')
      .then((res) => res.json())
      .then((data) => setEntries(data))
      .catch((err) => console.error("Failed to load data", err));
  }, []);

  const addEntry = (newEntry) => {
    setEntries([newEntry, ...entries]);
  };

  return (
    <div>
      <h1>🍱 Hostel Life Tracker</h1>
      <FoodForm onAdd={addEntry} />
      <FoodList entries={entries} />
    </div>
  );
};

export default Home;
