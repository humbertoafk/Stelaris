const express = require('express');
const router = express.Router();
const deepSkyObjectController = require('../controllers/deepSkyObjectController');

// Rutas de objetos del cielo profundo
router.post('/deepSkyObjects', deepSkyObjectController.createDeepSkyObject);
router.get('/deepSkyObjects', deepSkyObjectController.getDeepSkyObjectList);
router.get('/deepSkyObjects/:id', deepSkyObjectController.getDeepSkyObjectById);
router.put('/deepSkyObjects/:id', deepSkyObjectController.updateDeepSkyObject);
router.delete('/deepSkyObjects/:id', deepSkyObjectController.deleteDeepSkyObject);
router.get('/deepSkyObjects/detail/:id', deepSkyObjectController.getDeepSkyObjectDetail);

module.exports = router;
