import { useState } from 'react';

const FoodForm = ({ onAdd }) => {
  const [meal, setMeal] = useState('');
  const [mood, setMood] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('https://hostel-tracker.onrender.com/api/foodentry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ meal, mood }),
    });

    const data = await res.json();
    onAdd(data); // update UI immediately
    setMeal('');
    setMood('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add New Entry</h3>
      <input
        type="text"
        placeholder="Meal (e.g., Breakfast)"
        value={meal}
        onChange={(e) => setMeal(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Mood (e.g., Happy)"
        value={mood}
        onChange={(e) => setMood(e.target.value)}
      />
      <button type="submit">Add Entry</button>
    </form>
  );
};

export default FoodForm;
