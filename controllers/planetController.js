const Planet = require('../models/Planet');
const { searchImages } = require('../config/nasaApi');

// Crear un nuevo planeta
exports.createPlanet = (req, res) => {
  const newPlanet = {
    name: req.body.name,
    size: req.body.size,
    mass: req.body.mass,
    composition: req.body.composition,
    atmosphere: req.body.atmosphere,
    moons: req.body.moons,
    space_missions: req.body.space_missions,
    notable_features: req.body.notable_features
  };

  Planet.create(newPlanet, (err, planetId) => {
    if (err) {
      return res.status(500).json({ error: 'Error al crear el planeta' });
    }
    res.status(201).json({ id: planetId, ...newPlanet });
  });
};

// Obtener lista de planetas
exports.getPlanetList = (req, res) => {
  Planet.findAll((err, planets) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener los planetas' });
    }
    res.render('planetList', { planets });
  });
};

// Obtener planetas en formato JSON
exports.getPlanets = (req, res) => {
  Planet.findAll((err, planets) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener los planetas' });
    }
    res.status(200).json(planets);
  });
};

// Obtener detalle de un planeta por ID
exports.getPlanetById = (req, res) => {
  const id = req.params.id;
  Planet.findById(id, (err, planet) => {
    if (err) return res.status(500).send(err);

    planet.references = planet.references || []; // Asegurar array

    res.render('planetDetail', {
      object: planet,
      image: planet.image 
    });
  });
};

// Actualizar un planeta por ID
exports.updatePlanet = (req, res) => {
  const planetId = req.params.id;
  const updatedPlanet = {
    name: req.body.name,
    size: req.body.size,
    mass: req.body.mass,
    composition: req.body.composition,
    atmosphere: req.body.atmosphere,
    moons: req.body.moons,
    space_missions: req.body.space_missions,
    notable_features: req.body.notable_features
  };

  Planet.update(planetId, updatedPlanet, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error al actualizar el planeta' });
    }
    res.status(200).json(result);
  });
};

// Eliminar un planeta por ID
exports.deletePlanet = (req, res) => {
  const planetId = req.params.id;
  Planet.delete(planetId, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error al eliminar el planeta' });
    }
    res.status(200).json(result);
  });
};

// Obtener detalle y buscar imagen de un planeta
exports.getPlanetDetail = async (req, res) => {
  const planetId = req.params.id;
  Planet.findById(planetId, async (err, planet) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener el planeta' });
    }

    planet.references = planet.references || []; // Asegurar array

    const image = await searchImages(planet.name);
    res.render('planetDetail', { object: planet, image });
  });
};
