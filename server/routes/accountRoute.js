const express = require('express');
const { getBalance, transferMoney } = require('../controllers/accountController');
const { userAuthMiddleware } = require('../middleware/userAuthMiddleware');
const router = express.Router()


router.get('/balance',userAuthMiddleware,getBalance);
router.post('/transfer',userAuthMiddleware,transferMoney);


module.exports = router;