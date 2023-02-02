const express = require('express');
const moneyController = require('.././controllers/moneyController');

const router = express.Router();

router.route('/').post(moneyController.create);



module.exports = router;