const express = require('express');
const router = express.Router();
const { getTransactions, addTransaction, deleteTransaction, getOneTransaction} = require('../controllers/transactionsController');

router
    .route('/')
    .get(getTransactions)
    .post(addTransaction);

router
    .route('/:id')
    .get(getOneTransaction)
    .delete(deleteTransaction);

router
    .route('/one/:account_id');

module.exports = router;