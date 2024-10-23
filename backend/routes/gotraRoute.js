import express from 'express';

import gotraController from '../controllers/gotraController.js';

const router = express.Router();

// GET /gotra
router.get('/', gotraController.getAllGotras);

// GET /gotra/:id
router.get('/:id', gotraController.getGotraById);

// POST /gotra
router.post('/', gotraController.createGotra);

// PUT /gotra/:id
router.put('/:id', gotraController.updateGotra);

// DELETE /gotra/:id
router.delete('/:id', gotraController.deleteGotra);

export default router;