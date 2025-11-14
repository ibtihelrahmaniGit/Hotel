import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './routes/auth.js';
import GuestsRouter from './routes/Guests.js';
import connectToDatabase from './db/db.js';

dotenv.config();
connectToDatabase();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Serve images

app.use('/api/auth', authRouter);
app.use('/api/guests', GuestsRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
