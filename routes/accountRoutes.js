const express = require('express');
const accountController = require('../controllers/accountController');

const router = express.Router();

router
    .route('/')
    .post(accountController.create);
    
router
    .route('/withdraw/:id')
    .put(accountController.withdraw);

router
    .route('/deposit/:id')
    .put(accountController.deposit);

router.get('/balance/:id', accountController.getBalance);

router.put('/transfer', accountController.transfer);



module.exports = router;