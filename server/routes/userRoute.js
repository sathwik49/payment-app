const express = require('express');
const { userSignUp, userSignIn, userUpdation, sendByQuery } = require('../controllers/userController');
const { userAuthMiddleware } = require('../middleware/userAuthMiddleware');

const router = express.Router();

router.post('/signup',userSignUp);
router.post('/signin',userSignIn);
router.put('/',userAuthMiddleware,userUpdation);
router.get('/bulk',sendByQuery);

module.exports = router;