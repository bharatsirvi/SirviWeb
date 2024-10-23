import express from 'express';
import professionalController from '../controllers/professionalController.js';

const router = express.Router();

// GET /professionals
router.get('/', professionalController.getAllProfessionals);

// GET /professionals/:id
router.get('/:id', professionalController.getProfessionalById);

// POST /professionals
router.post('/', professionalController.createProfessional);

// PUT /professionals/:id
router.put('/:id', professionalController.updateProfessional);

// DELETE /professionals/:id
router.delete('/:id', professionalController.deleteProfessional);

export default router;  