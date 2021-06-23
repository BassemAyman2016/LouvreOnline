const express = require('express');
const router = express.Router();
const session = require('../controllers/sessionsController');

router.post('/login', session.login);

module.exports = {
    router
}