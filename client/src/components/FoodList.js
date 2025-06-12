import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FoodList = () => {
  const [entries, setEntries] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);    

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const res = await axios.get('https://hostel-tracker.onrender.com/api/foodentry');
        if (Array.isArray(res.data)) {
          setEntries(res.data);
        } else {
          console.error("API did not return an array:", res.data);
          setEntries([]);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEntries();
  }, []);


  return (
    <div>
      <h2>Your Meal Logs</h2>
      {entries.length === 0 ? (
        <p>Start logging </p>
      ) : (
        <ul>
          {entries.map((entry) => (
            <li key={entry._id}>
              <strong>{new Date(entry.date).toLocaleDateString()}</strong>: {entry.meal} – Mood: {entry.mood}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FoodList;
