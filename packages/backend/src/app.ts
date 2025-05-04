import express from 'express';
import cors from 'cors';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Simple route for testing
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Basic route to get a mock item
app.get('/api/items/1', (req, res) => {
  const mockItem = {
    itemId: 1,
    itemCode: '7290000000756',
    itemName: 'קולורבי',
    price: 3.90,
    category: 'PRODUCE'
  };
  
  res.json(mockItem);
});

export default app;