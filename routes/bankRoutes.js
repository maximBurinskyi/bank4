const express = require('express');
const { createBank, getBanks, getOneBank, updateBank, deleteBank } = require('../controllers/bankController');
const router = express.Router();

router
    .route('/')
    .post(createBank).get(getBanks);

router
    .route('/:id')
    .get(getOneBank)
    .put(updateBank)
    .delete(deleteBank);

module.exports = router;