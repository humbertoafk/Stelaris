const db = require('../config/database');

const Planet = {};

Planet.create = (planet, callback) => {
  const query = 'INSERT INTO planets (name, size, mass, composition, atmosphere, moons, space_missions, notable_features) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(query, [planet.name, planet.size, planet.mass, planet.composition, planet.atmosphere, planet.moons, planet.space_missions, planet.notable_features], (err, results) => {
    if (err) return callback(err);
    return callback(null, results.insertId);
  });
};

Planet.findAll = (callback) => {
  const query = 'SELECT * FROM planets';
  db.query(query, (err, results) => {
    if (err) return callback(err);
    return callback(null, results);
  });
};

Planet.findById = (id, callback) => {
  const query = 'SELECT * FROM planets WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) return callback(err);
    const planet = results[0] || {};
    planet.references = planet.references || [];
    return callback(null, planet);
  });
};

Planet.update = (id, planet, callback) => {
  const query = 'UPDATE planets SET name = ?, size = ?, mass = ?, composition = ?, atmosphere = ?, moons = ?, space_missions = ?, notable_features = ? WHERE id = ?';
  db.query(query, [planet.name, planet.size, planet.mass, planet.composition, planet.atmosphere, planet.moons, planet.space_missions, planet.notable_features, id], (err, results) => {
    if (err) return callback(err);
    return callback(null, results);
  });
};

Planet.delete = (id, callback) => {
  const query = 'DELETE FROM planets WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) return callback(err);
    return callback(null, results);
  });
};

Planet.search = (query, magnitude) => {
  return new Promise((resolve, reject) => {
    let sql = 'SELECT * FROM planets WHERE name LIKE ? OR composition LIKE ? OR atmosphere LIKE ?';
    let params = [`%${query}%`, `%${query}%`, `%${query}%`];
    
    if (magnitude) {
      sql += ' AND magnitude <= ?';
      params.push(magnitude);
    }
    
    db.query(sql, params, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

module.exports = Planet;
