import express from 'express';
import cors from 'cors';
import itemsRouter from './routes/items';
import healthRouter from './routes/health';
import supermarketsRouter from './routes/supermarkets';
import promotionsRouter from './routes/promotions';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/health', healthRouter);
app.use('/api/items', itemsRouter);
app.use('/api/supermarkets', supermarketsRouter);
app.use('/api/promotions', promotionsRouter);

export default app;