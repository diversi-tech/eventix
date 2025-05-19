import express from 'express';
import cors from 'cors';
import eventsRouter from './routes/events';
import healthRouter from './routes/health';


const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/health', healthRouter);
app.use('/api/events', eventsRouter);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;