const Star = require('../models/Star');
const Planet = require('../models/Planet');
const DeepSkyObject = require('../models/DeepSkyObject');
const CometAsteroid = require('../models/CometAsteroid');

// Buscar objetos celestes
exports.search = async (req, res) => {
  const { query, type, magnitude } = req.query;
  let results = { stars: [], planets: [], deepSkyObjects: [], cometAsteroids: [] };

  try {
    if (!type || type === 'star') {
      const stars = await Star.search(query, magnitude);
      results.stars = stars;
    }
    if (!type || type === 'planet') {
      const planets = await Planet.search(query, magnitude);
      results.planets = planets;
    }
    if (!type || type === 'deepSkyObject') {
      const deepSkyObjects = await DeepSkyObject.search(query, magnitude);
      results.deepSkyObjects = deepSkyObjects;
    }
    if (!type || type === 'cometAsteroid') {
      const cometsAsteroids = await CometAsteroid.search(query, magnitude);
      results.cometAsteroids = cometsAsteroids;
    }

    res.render('searchResults', { query, ...results });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error en la búsqueda');
  }
};
