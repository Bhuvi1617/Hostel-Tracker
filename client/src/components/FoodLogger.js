import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FoodForm from './FoodForm';
import FoodList from './FoodList';

const FoodLogger = () => {
  const [entries, setEntries] = useState([]);
  const [editEntry, setEditEntry] = useState(null);

  const fetchEntries = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/foodentry');
      setEntries(res.data);
    } catch (error) {
      console.error('Fetching entries failed:', error);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleAddOrEdit = async (entry) => {
    try {
      if (editEntry) {
        await axios.put(`http://localhost:5000/api/foodentry/${editEntry._id}`, entry);
      } else {
        await axios.post('http://localhost:5000/api/foodentry', entry);
      }
      setEditEntry(null);
      fetchEntries();
    } catch (error) {
      console.error('Error submitting entry', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/foodentry/${id}`);
      fetchEntries();
    } catch (error) {
      console.error('Delete failed', error);
    }
  };

  const handleEdit = (entry) => {
    setEditEntry(entry);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 px-4 py-10 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Hostel Life Food Logger 🥗</h1>

      <div className="w-full max-w-2xl bg-white p-6 rounded-2xl shadow-lg mb-10">
        <FoodForm onSubmit={handleAddOrEdit} initialData={editEntry} />
      </div>

      <div className="w-full max-w-2xl">
        <FoodList entries={entries} onDelete={handleDelete} onEdit={handleEdit} />
      </div>
    </div>
  );
};

export default FoodLogger;
