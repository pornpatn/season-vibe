import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './routes';

dotenv.config();
const app = express();

// ✅ Allow requests from frontend
app.use(cors({
  origin: 'http://localhost:5173', // or use "*" to allow all (not recommended for production)
  credentials: true
}));

app.use(express.json());
app.use('/api', routes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});