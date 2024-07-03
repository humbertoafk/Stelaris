const CometAsteroid = require('../models/CometAsteroid');
const { searchImages } = require('../config/nasaApi');

// Crear un nuevo cometa/asteroide
exports.createCometAsteroid = (req, res) => {
  const newObject = {
    name: req.body.name,
    orbit: req.body.orbit,
    size: req.body.size,
    composition: req.body.composition,
    notable_events: req.body.notable_events
  };

  CometAsteroid.create(newObject, (err, objectId) => {
    if (err) {
      return res.status(500).json({ error: 'Error al crear el cometa/asteroide' });
    }
    res.status(201).json({ id: objectId, ...newObject });
  });
};

// Obtener lista de cometas/asteroides
exports.getCometAsteroidList = (req, res) => {
  CometAsteroid.findAll((err, cometAsteroids) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener los cometas/asteroides' });
    }
    res.render('cometAsteroidList', { cometAsteroids });
  });
};

// Obtener cometas/asteroides en formato JSON
exports.getCometAsteroids = (req, res) => {
  CometAsteroid.findAll((err, objects) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener los cometas/asteroides' });
    }
    res.status(200).json(objects);
  });
};

// Obtener detalle de un cometa/asteroide por ID
exports.getCometAsteroidById = (req, res) => {
  const id = req.params.id;
  CometAsteroid.findById(id, (err, object) => {
    if (err) return res.status(500).send(err);

    object.references = object.references || []; // Asegurar array

    res.render('cometAsteroidDetail', {
      object: object,
      image: object.image 
    });
  });
};

// Actualizar un cometa/asteroide por ID
exports.updateCometAsteroid = (req, res) => {
  const objectId = req.params.id;
  const updatedObject = {
    name: req.body.name,
    orbit: req.body.orbit,
    size: req.body.size,
    composition: req.body.composition,
    notable_events: req.body.notable_events
  };

  CometAsteroid.update(objectId, updatedObject, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error al actualizar el cometa/asteroide' });
    }
    res.status(200).json(result);
  });
};

// Eliminar un cometa/asteroide por ID
exports.deleteCometAsteroid = (req, res) => {
  const objectId = req.params.id;
  CometAsteroid.delete(objectId, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error al eliminar el cometa/asteroide' });
    }
    res.status(200).json(result);
  });
};

// Obtener detalle y buscar imagen de un cometa/asteroide
exports.getCometAsteroidDetail = async (req, res) => {
  const objectId = req.params.id;
  CometAsteroid.findById(objectId, async (err, object) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener el cometa/asteroide' });
    }

    object.references = object.references || []; // Asegurar array

    const image = await searchImages(object.name);
    res.render('cometAsteroidDetail', { object, image });
  });
};
