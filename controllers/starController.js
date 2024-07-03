const Star = require('../models/Star');
const { searchImages } = require('../config/nasaApi');

// Crear una nueva estrella
exports.createStar = (req, res) => {
  const newStar = {
    name: req.body.name,
    spectral_type: req.body.spectral_type,
    magnitude: req.body.magnitude,
    distance: req.body.distance,
    constellation: req.body.constellation,
    historical_data: req.body.historical_data,
    mythological_data: req.body.mythological_data
  };

  Star.create(newStar, (err, starId) => {
    if (err) {
      return res.status(500).json({ error: 'Error al crear la estrella' });
    }
    res.status(201).json({ id: starId, ...newStar });
  });
};

// Obtener lista de estrellas
exports.getStarList = (req, res) => {
  Star.findAll((err, stars) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener las estrellas' });
    }
    res.render('starList', { stars, isMainPage: false });
  });
};

// Obtener estrellas en formato JSON
exports.getStars = (req, res) => {
  Star.findAll((err, stars) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener las estrellas' });
    }
    res.status(200).json(stars);
  });
};

// Obtener detalle de una estrella por ID
exports.getStarById = (req, res) => {
  const id = req.params.id;
  Star.findById(id, (err, star) => {
    if (err) return res.status(500).send(err);

    star.references = star.references || []; // Asegurar array

    res.render('starDetail', {
      object: star,
      image: star.image 
    });
  });
};

// Actualizar una estrella por ID
exports.updateStar = (req, res) => {
  const starId = req.params.id;
  const updatedStar = {
    name: req.body.name,
    spectral_type: req.body.spectral_type,
    magnitude: req.body.magnitude,
    distance: req.body.distance,
    constellation: req.body.constellation,
    historical_data: req.body.historical_data,
    mythological_data: req.body.mythological_data
  };

  Star.update(starId, updatedStar, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error al actualizar la estrella' });
    }
    res.status(200).json(result);
  });
};

// Eliminar una estrella por ID
exports.deleteStar = (req, res) => {
  const starId = req.params.id;
  Star.delete(starId, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error al eliminar la estrella' });
    }
    res.status(200).json(result);
  });
};

// Obtener detalle y buscar imagen de una estrella
exports.getStarDetail = async (req, res) => {
  const starId = req.params.id;
  Star.findById(starId, async (err, star) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener la estrella' });
    }

    star.references = star.references || []; // Asegurar array

    const image = await searchImages(star.name);
    res.render('starDetail', { object: star, image });
  });
};
