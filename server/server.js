import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import foodRoutes from './routes/foodRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("Database connection error: ", err));


app.use('/api/foodentry', foodRoutes);


app.get('/', (req, res) => {
  res.send('Backend is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Dummy GET Route
app.get("/ping", (req, res) => {
  res.json({ message: "pong!" });
});

// Dummy  POST Route
app.post("/test", (req, res) => {
  console.log(req.body);
  res.json({ status: "Received", data: req.body });
});