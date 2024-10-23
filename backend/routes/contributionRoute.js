import express from 'express';
import contributionController from '../controllers/contributionController.js';
const router = express.Router();

// GET /contributions
router.get('/', contributionController.getAllContributions);

// GET /contributions/:id
router.get('/:id', contributionController.getContributionById);

// POST /contributions
router.post('/', contributionController.createContribution);

// PUT /contributions/:id
router.put('/:id', contributionController.updateContribution);

// DELETE /contributions/:id
router.delete('/:id', contributionController.deleteContribution);

export default router;