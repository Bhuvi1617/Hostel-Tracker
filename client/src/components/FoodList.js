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
    <div className="p-6 rounded-xl bg-[#D9D9D9] bg-opacity-80 mt-10">
      <h2 className="text-2xl font-bold text-center text-black-800 mb-4">
        ✨ Your Meal Logs ✨
      </h2>

      <div className="mb-6 text-center">
        <label className="block text-gray-600 font-medium mb-2">
          📅 Select a date:
        </label>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>

      {filteredEntries.length === 0 ? (
        <p className="text-center text-gray-500 italic">
          Oops, no entries for this date!
        </p>
      ) : (
        <ul className="space-y-4">
          {filteredEntries.map((entry) => (
            <li
              key={entry._id}
              className="bg-[#FFEA99] p-4 rounded-lg shadow-md border border-yellow-200"
            >
              <p className="text-gray-800 mb-3 leading-relaxed">
                <span className="font-bold text-black-800">📅 {new Date(entry.date).toLocaleDateString()}</span><br />
                🍽️ <span className="text-[20px] font-semibold">{entry.meal}</span>　 (👉ﾟヮﾟ)👉 Mood: <span className="italic">{entry.mood}</span><br />
                📝 {entry.foodItems.join(', ')}<br />
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
