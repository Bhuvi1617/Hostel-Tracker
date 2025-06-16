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

  return (
    <div className="w-full max-w-[612px] bg-[#FF6262] bg-opacity-70 rounded-2xl shadow-lg p-8">
      <h1 className="text-[44px] font-[Koulen] text-black text-center mb-8"> FOOD LOGGER</h1>
      <FoodForm onSubmit={handleAddOrEdit} initialData={editEntry} />
      <FoodList entries={entries} onDelete={handleDelete} onEdit={setEditEntry} />
    </div>
  );
};

export default FoodLogger;
