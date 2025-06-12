import mongoose from 'mongoose';

const foodEntrySchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  meal: { type: String, required: true },
  mood: { type: String },
});

export default mongoose.model('FoodEntry', foodEntrySchema);
