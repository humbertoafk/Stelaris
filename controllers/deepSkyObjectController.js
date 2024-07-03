const DeepSkyObject = require('../models/DeepSkyObject');
const { searchImages } = require('../config/nasaApi');

// Crear un nuevo objeto del cielo profundo
exports.createDeepSkyObject = (req, res) => {
  const newObject = {
    name: req.body.name,
    type: req.body.type,
    distance: req.body.distance,
    size: req.body.size,
    visual_characteristics: req.body.visual_characteristics,
    scientific_data: req.body.scientific_data
  };

  DeepSkyObject.create(newObject, (err, objectId) => {
    if (err) {
      return res.status(500).json({ error: 'Error al crear el objeto del cielo profundo' });
    }
    res.status(201).json({ id: objectId, ...newObject });
  });
};

// Obtener lista de objetos del cielo profundo
exports.getDeepSkyObjectList = (req, res) => {
  DeepSkyObject.findAll((err, deepSkyObjects) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener los objetos del cielo profundo' });
    }
    res.render('deepSkyObjectList', { deepSkyObjects });
  });
};

// Obtener objetos del cielo profundo en formato JSON
exports.getDeepSkyObjects = (req, res) => {
  DeepSkyObject.findAll((err, objects) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener los objetos del cielo profundo' });
    }
    res.status(200).json(objects);
  });
};

// Obtener detalle de un objeto del cielo profundo por ID
exports.getDeepSkyObjectById = (req, res) => {
  const id = req.params.id;
  DeepSkyObject.findById(id, (err, object) => {
    if (err) return res.status(500).send(err);

    object.references = object.references || []; // Asegurar array

    res.render('deepSkyObjectDetail', {
      object: object,
      image: object.image 
    });
  });
};

// Actualizar un objeto del cielo profundo por ID
exports.updateDeepSkyObject = (req, res) => {
  const objectId = req.params.id;
  const updatedObject = {
    name: req.body.name,
    type: req.body.type,
    distance: req.body.distance,
    size: req.body.size,
    visual_characteristics: req.body.visual_characteristics,
    scientific_data: req.body.scientific_data
  };

  DeepSkyObject.update(objectId, updatedObject, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error al actualizar el objeto del cielo profundo' });
    }
    res.status(200).json(result);
  });
};

// Eliminar un objeto del cielo profundo por ID
exports.deleteDeepSkyObject = (req, res) => {
  const objectId = req.params.id;
  DeepSkyObject.delete(objectId, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error al eliminar el objeto del cielo profundo' });
    }
    res.status(200).json(result);
  });
};

// Obtener detalle y buscar imagen de un objeto del cielo profundo
exports.getDeepSkyObjectDetail = async (req, res) => {
  const objectId = req.params.id;
  DeepSkyObject.findById(objectId, async (err, object) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener el objeto del cielo profundo' });
    }

    object.references = object.references || []; // Asegurar array

    const image = await searchImages(object.name);
    res.render('deepSkyObjectDetail', { object, image });
  });
};
