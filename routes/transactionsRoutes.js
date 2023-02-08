const express = require('express');
const router = express.Router();
const { getTransactions, addTransaction, deleteTransaction, getOneTransaction, getTransactionStats, getTransactionStatsByDates, getTransactionStatsCategorySum} = require('../controllers/transactionsController');

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

    
router
    .route('/stats1/:id')
    .post(getTransactionStatsByDates);

router
    .route('/stats2/:id')
    .post(getTransactionStatsCategorySum);

module.exports = router;