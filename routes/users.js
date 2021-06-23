const express = require('express');
const router = express.Router();
const middleware = require('../middleware/login') 

const user = require('../controllers/usersControllers');

router.get('/users',middleware.verifyToken, user.getUsersController);
router.post('/user', user.userSignupController);

module.exports = {
    router
}