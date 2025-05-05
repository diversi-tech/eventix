import express from 'express';
const router = express.Router();

// Get all items
router.get('/', (req, res) => {
  res.json({ message: 'Get all items' });
});

// Get item by ID
router.get('/:id', (req, res) => {
  res.json({ message: `Get item ${req.params.id}` });
});

// Search items
router.get('/search', (req, res) => {
  const { query } = req.query;
  res.json({ message: 'Search items', query });
});

// Get items by category
router.get('/category/:category', (req, res) => {
  res.json({ message: `Get items in category ${req.params.category}` });
});

// Compare item prices across stores
router.get('/compare/:id', (req, res) => {
  const { stores } = req.query;
  res.json({ 
    message: `Compare item ${req.params.id}`,
    stores: stores?.toString().split(',')
  });
});

// Get item price history
router.get('/:id/price-history', (req, res) => {
  res.json({ message: `Get price history for item ${req.params.id}` });
});

// Get alternative items
router.get('/:id/alternatives', (req, res) => {
  res.json({ message: `Get alternatives for item ${req.params.id}` });
});

export default router; 