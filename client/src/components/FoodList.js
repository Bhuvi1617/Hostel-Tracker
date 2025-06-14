import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const FoodList = ({ entries = [], onDelete, onEdit }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filteredEntries, setFilteredEntries] = useState([]);

  useEffect(() => {
    const result = entries.filter((entry) => {
      const entryDate = new Date(entry.date).toDateString();
      return entryDate === selectedDate.toDateString();
    });

    setFilteredEntries(result);
  }, [selectedDate, entries]);

  return (
    <div className="p-4 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">✨ Your Meal Logs ✨</h2>

      <div className="mb-6 text-center">
        <label className="block text-gray-600 font-medium mb-2">📅 Select a date:</label>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>

      {filteredEntries.length === 0 ? (
        <p className="text-center text-gray-500 italic">Oops, no entries for this date!</p>
      ) : (
        <ul className="space-y-4">
          {filteredEntries.map((entry) => (
            <li
              key={entry._id}
              className="border border-gray-300 p-4 rounded-lg shadow-sm bg-gray-50"
            >
              <p className="text-gray-700 leading-relaxed mb-3">
                <span className="font-semibold">{new Date(entry.date).toLocaleDateString()}</span><br />
                🍽️ <span className="font-medium">{entry.meal}</span> — Mood: 😎 {entry.mood}<br />
                📝 Items: {entry.foodItems.join(', ')}<br />
               🔥 {entry.calories} cal
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => onEdit(entry)}
                  className="px-4 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => onDelete(entry._id)}
                  className="px-4 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                >
                  🗑️ Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FoodList;
