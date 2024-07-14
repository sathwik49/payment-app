const express = require('express')
const router = express.Router();

const userRoute = require('./userRoute');
const accountRoute = require('./accountRoute');

router.use('/user',userRoute);
router.use('/account',accountRoute);

module.exports = router;