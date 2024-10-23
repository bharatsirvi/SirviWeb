
import express from 'express';
import transactionController from '../controllers/transactionController.js';
const router = express.Router();

// GET /transactions
router.get('/', transactionController.getAllTransactions);

// GET /transactions/:id
router.get('/:id', transactionController.getTransactionById);

// POST /transactions
router.post('/', transactionController.createTransaction);

// PUT /transactions/:id
router.put('/:id', transactionController.updateTransaction);

// DELETE /transactions/:id
router.delete('/:id', transactionController.deleteTransaction);

export default router;