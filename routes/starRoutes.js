const express = require('express');
const router = express.Router();
const starController = require('../controllers/starController');

// Rutas de estrellas
router.post('/stars', starController.createStar);
router.get('/stars', starController.getStarList);
router.get('/stars/:id', starController.getStarById);
router.put('/stars/:id', starController.updateStar);
router.delete('/stars/:id', starController.deleteStar);
router.get('/stars/detail/:id', starController.getStarDetail);

module.exports = router;
