
import express from 'express';
import imageController from '../controllers/imageController.js';

const router = express.Router();

// GET /images
router.get('/', imageController.getAllImages);

// GET /images/:id
router.get('/:id', imageController.getImageById);

// POST /images
router.post('/', imageController.createImage);

// PUT /images/:id
router.put('/:id', imageController.updateImage);

// DELETE /images/:id
router.delete('/:id', imageController.deleteImage);

export default router;