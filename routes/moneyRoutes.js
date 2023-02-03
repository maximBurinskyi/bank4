const express = require('express');
const moneyController = require('.././controllers/moneyController');

const router = express.Router();

router
    .route('/')
    .post(moneyController.create);
    
router
    .route('/withdraw/:id')
    .put(moneyController.withdraw);

router
    .route('/deposit/:id')
    .put(moneyController.deposit);

router.get('/balance/:id', moneyController.getBalance);

router.put('/transfer', moneyController.transfer);



module.exports = router;