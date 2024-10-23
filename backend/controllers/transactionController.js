import Transaction from '../models/transactionModel.js';
import { throwError } from '../util/error.js';
import User from '../models/userModel.js';
const getAllTransactions = async(req, res,next) => {
    const {type, done_by,amount, month, year} = req.query;
    const filterQuery = {};
    try {
        if (type) {
            filterQuery.type = type;
        }
        if (done_by) {
            const user= await User.find({name:  { $regex: `.*${done_by}.*`, $options: "i" } });
            if(user.length > 0){
                filterQuery.user_id = user[0]._id;
            }
            else{
                return res.status(404).json({error: 'Transaction not found'});
            }
          }
        if (amount) {
            filterQuery.amount = { $gte: amount };
        }
        if(month && year){
            const startDate = new Date(year, month - 1, 1);
            const endDate = new Date(year, month, 0);
            filterQuery.createdAt = {
                $gte: startDate,
                $lte: endDate,
            };
        } else if(year){
            const startDate = new Date(year, 0, 1);
            const endDate = new Date(year, 11, 31);
            filterQuery.createdAt = {
                $gte: startDate,
                $lte: endDate,
            };
        }
        const transactions = await Transaction.find(filterQuery);
        if(!transactions){
            return res.status(404).json({error: 'No transactions found'});
        }
        res.status(201).json(transactions);
    } catch (error) {
        throwError(next, error);
    }
};

const getTransactionById = async(req, res,next) => {
    try {
        const transactionId = req.params.id;
        const transaction = await Transaction.findById(transactionId);
        if(!transaction){
            return res.status(404).json({error: 'Transaction not found'});
        }
        res.status(200).json(transaction);
    } catch (error) {
        throwError(next, error);
    }
};

const createTransaction = async(req, res,next) => {
    try {
        const newTransaction = new Transaction(req.body);
        if(!newTransaction) return res.status(404).json({error: 'Transaction not created'});
        const savedTransaction = await newTransaction.save();
        res.status(201).json(savedTransaction);
    } catch (error) {
        throwError(next, error);
    }
}
const updateTransaction = async(req, res,next) => {
        try {
            const transactionId = req.params.id;
            const transactionExists = await Transaction.findById(transactionId);
            if (!transactionExists) {
                return res.status(404).json({ error: 'Transaction not found' });
            }
            const updatedTransaction = await Transaction.findByIdAndUpdate(transactionId, req.body, {
                new: true,
            });
            res.status(200).json(updatedTransaction);
        } catch (error) {
            throwError(next, error);
        }
      }

const deleteTransaction = async(req, res,next) => {
    try {
        const transactionId = req.params.id;
        const transactionExists = await Transaction.findById(transactionId);
        if (!transactionExists) {
            return res.status(404).json({ error: 'Transaction not found' });
        }
        await Transaction.findByIdAndDelete(transactionId);
        res.status(200).json({ message: 'Transaction deleted successfully'});
    } catch (error) {
        throwError(next, error);
    }
};

export default {
    getAllTransactions,
    getTransactionById, 
    createTransaction,
    updateTransaction,
    deleteTransaction,
};