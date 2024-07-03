const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');

// Rutas de los registros
router.post('/main', mainController.createMain);
router.get('/main', mainController.getMains);
router.get('/main/:id', mainController.getMainById);
router.put('/main/:id', mainController.updateMain);
router.delete('/main/:id', mainController.deleteMain);

module.exports = router;
