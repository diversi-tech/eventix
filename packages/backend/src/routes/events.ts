import express, { Request, Response } from 'express';
const router = express.Router();


// Get all events
router.get('/', (req: Request, res: Response) => {
  const mockEvents = [
    {
      id: '1',
      title: 'Sample Event 1',
      description: 'This is a sample event description for event 1.',
      date: new Date().toISOString(),
      location: 'Sample Location 1',
      participants: []
    },
    {
      id: '2',
      title: 'Sample Event 2',
      description: 'This is a sample event description for event 2.',
      date: new Date().toISOString(),
      location: 'Sample Location 2',
      participants: []
    }
  ];
  res.json(mockEvents);
});


// Create new event
router.post('/', (req: Request, res: Response) => {
  res.json({ message: 'Create new event' });
});

// Update event
router.put('/:id', (req: Request, res: Response) => {
  res.json({ message: `Update event ${req.params.id}` });
});

// Delete event
router.delete('/:id', (req: Request, res: Response) => {
  res.json({ message: `Delete event ${req.params.id}` });
});

// Get event participants
router.get('/:id/participants', (req: Request, res: Response) => {
  res.json({ message: `Get participants for event ${req.params.id}` });
});

// Add participant to event
router.post('/:id/participants', (req: Request, res: Response) => {
  res.json({ message: `Add participant to event ${req.params.id}` });
});

// Remove participant from event
router.delete('/:id/participants/:participantId', (req: Request, res: Response) => {
  res.json({ message: `Remove participant ${req.params.participantId} from event ${req.params.id}` });
});

export default router; 