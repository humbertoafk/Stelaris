const express = require('express');
const router = express.Router();
const cometAsteroidController = require('../controllers/cometAsteroidController');

// Rutas de cometas y asteroides
router.post('/cometAsteroids', cometAsteroidController.createCometAsteroid);
router.get('/cometAsteroids', cometAsteroidController.getCometAsteroidList);
router.get('/cometAsteroids/:id', cometAsteroidController.getCometAsteroidById);
router.put('/cometAsteroids/:id', cometAsteroidController.updateCometAsteroid);
router.delete('/cometAsteroids/:id', cometAsteroidController.deleteCometAsteroid);
router.get('/cometAsteroids/detail/:id', cometAsteroidController.getCometAsteroidDetail);

module.exports = router;
