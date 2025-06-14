import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-toastify';

const FoodForm = ({ onSubmit, initialData }) => {
  const [meal, setMeal] = useState('');
  const [mood, setMood] = useState('');
  const [foodItems, setFoodItems] = useState('');
  
  const [calories, setCalories] = useState('');
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    if (initialData) {
      setMeal(initialData.meal || '');
      setMood(initialData.mood || '');
      setFoodItems(initialData.foodItems?.join(', ') || '');
      
      setCalories(initialData.calories || '');
      setDate(initialData.date ? new Date(initialData.date) : new Date());
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newEntry = {
      meal,
      mood,
      foodItems: foodItems.split(',').map((item) => item.trim()),
     
      calories: parseInt(calories),
      date,
    };

    try {
      await onSubmit(newEntry);
      toast.success(initialData ? 'Entry updated!' : 'Entry added!');
      setMeal('');
      setMood('');
      setFoodItems('');
     
      setCalories('');
      setDate(new Date());
    } catch (err) {
      toast.error('Oops, something went wrong!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl p-6 mb-8 space-y-4 max-w-xl mx-auto">
      <h3 className="text-xl font-semibold text-center text-indigo-600 mb-4">
        {initialData ? '✨ Edit Your Food Log ✨' : '✨ Add a New Food Log ✨'}
      </h3>

      <input
        type="text"
        placeholder="Which Meal?"
        value={meal}
        onChange={(e) => setMeal(e.target.value)}
        required
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />

      <input
        type="text"
        placeholder="How are you feeling today?"
        value={mood}
        onChange={(e) => setMood(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />

      <input
        type="text"
        placeholder="Food Items (use commas 😉)"
        value={foodItems}
        onChange={(e) => setFoodItems(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />

      

      <input
        type="number"
        placeholder="Calories"
        value={calories}
        onChange={(e) => setCalories(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />

      <div className="flex flex-col">
        <label className="text-sm text-gray-600 mb-1">📅 Pick the date:</label>
        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-600 transition"
      >
        {initialData ? 'Update' : 'Add Entry'}
      </button>
    </form>
  );
};

export default FoodForm;
