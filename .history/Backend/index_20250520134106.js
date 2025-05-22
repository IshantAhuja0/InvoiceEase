import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import registerUser from './Routes/RegisterUser.js';
import { connectDB } from './Mongo/mongo.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post('/api/register', async (req, res) => {
  const { name, email, mobile, password } = req.body;

  try {
    const result = await registerUser({ name, email, mobile, password });
    if (result?.insertedId) {
      res.status(200).send({ status: 200, message: 'User registered successfully' });
    } else {
      res.status(400).send({ status: 400, message: 'Failed to register user' });
    }
  } catch (err) {
    console.error('❌ Error in /api/register route:', err.message);
    res.status(500).send({ status: 500, message: 'Server Error' });
  }
});

try {
  console.log("Trying to connect to DB...");
  const dbConnection = await connectDB();
  console.log("DB connected, starting server...");

  app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
  });
} catch (error) {
  console.log('❌ Error starting server or connecting to DB:', error);
}

