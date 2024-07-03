const express = require('express');
const router = express.Router();
const planetController = require('../controllers/planetController');

// Rutas de planetas
router.post('/planets', planetController.createPlanet);
router.get('/planets', planetController.getPlanetList);
router.get('/planets/:id', planetController.getPlanetById);
router.put('/planets/:id', planetController.updatePlanet);
router.delete('/planets/:id', planetController.deletePlanet);
router.get('/planets/detail/:id', planetController.getPlanetDetail);

module.exports = router;
