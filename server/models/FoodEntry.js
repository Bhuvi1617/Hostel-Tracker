import mongoose from 'mongoose';

const foodEntrySchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  meal: { type: String, required: true },
  mood: { type: String },
  foodItems: [{type:String}],
  calories : Number
});

export default mongoose.model('FoodEntry', foodEntrySchema);
