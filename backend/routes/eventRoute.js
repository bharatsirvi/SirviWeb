import express from 'express';
import eventController from '../controllers/eventController.js';
const router = express.Router();

// GET all events
router.get('/', eventController.getAllEvents);

// GET a specific event
router.get('/:id', eventController.getEventById);

// POST a new event
router.post('/', eventController.createEvent);

// PUT/update an existing event
router.put('/:id', eventController.updateEvent);

// DELETE an event
router.delete('/:id', eventController.deleteEvent);

export default router;