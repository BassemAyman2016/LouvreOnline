const express = require('express');
const router = express.Router();
const middleware = require('../middleware/login') 

const art = require('../controllers/artsController');

router.get('/art',middleware.verifyToken, art.getArtController);
router.post('/art',middleware.verifyToken, art.addArtController);
router.put('/art',middleware.verifyToken, art.editArtController)
router.delete('/art',middleware.verifyToken, art.deleteArtController)

module.exports = {
    router
}