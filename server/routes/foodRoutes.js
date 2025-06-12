import express from 'express';
import FoodEntry from '../models/FoodEntry.js';

const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const entries = await FoodEntry.find();
    res.json(entries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const newEntry = new FoodEntry(req.body);
    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});




export default router;