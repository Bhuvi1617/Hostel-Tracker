import express from 'express';
import FoodEntry from '../models/FoodEntry.js';

const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const { date } = req.query;

    let filter = {};
// date filtration logic .. btn SOD and EOD
    if (date) {
      const startOfDay = new Date(date);
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);

      filter.date = { $gte: startOfDay, $lte: endOfDay };
      console.log('Filtering dates', startOfDay.toISOString());
    }

    const entries = await FoodEntry.find(filter).sort({ date: -1 }); // displaying latest first 
    res.json(entries);
  } catch (error) {
    console.error('Error fetching food entries', error);
    res.status(500).json({ message: error.message });
  }
});


//updates!!
router.put('/:id', async (req, res) => {
  try {
    const updatedEntry = await FoodEntry.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } 
    );
    if (!updatedEntry) {
      return res.status(404).json({ message: 'Entry not found' });
    }
    res.json(updatedEntry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const deletedEntry = await FoodEntry.findByIdAndDelete(req.params.id);
    if (!deletedEntry) {
      return res.status(404).json({ message: 'Entry not found' });
    }
    res.json({ message: 'Entry deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.post('/', async (req, res) => {
  try {
    const newEntry = new FoodEntry(req.body);
    await newEntry.save(); // storing in Mongo !
    res.status(201).json(newEntry);
  } catch (error) {
    console.error('Error saving new food entry', error);
    res.status(400).json({ message: error.message });
  }
});

export default router;
