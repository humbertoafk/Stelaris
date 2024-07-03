const db = require('../config/database');

const DeepSkyObject = {};

DeepSkyObject.create = (object, callback) => {
  const query = 'INSERT INTO deep_sky_objects (name, type, distance, size, visual_characteristics, scientific_data) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(query, [object.name, object.type, object.distance, object.size, object.visual_characteristics, object.scientific_data], (err, results) => {
    if (err) return callback(err);
    return callback(null, results.insertId);
  });
};

DeepSkyObject.findAll = (callback) => {
  const query = 'SELECT * FROM deep_sky_objects';
  db.query(query, (err, results) => {
    if (err) return callback(err);
    return callback(null, results);
  });
};

DeepSkyObject.findById = (id, callback) => {
  const query = 'SELECT * FROM deep_sky_objects WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) return callback(err);
    const object = results[0] || {};
    object.references = object.references || [];
    return callback(null, object);
  });
};

DeepSkyObject.update = (id, object, callback) => {
  const query = 'UPDATE deep_sky_objects SET name = ?, type = ?, distance = ?, size = ?, visual_characteristics = ?, scientific_data = ? WHERE id = ?';
  db.query(query, [object.name, object.type, object.distance, object.size, object.visual_characteristics, object.scientific_data, id], (err, results) => {
    if (err) return callback(err);
    return callback(null, results);
  });
};

DeepSkyObject.delete = (id, callback) => {
  const query = 'DELETE FROM deep_sky_objects WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) return callback(err);
    return callback(null, results);
  });
};

DeepSkyObject.search = (query, magnitude) => {
  return new Promise((resolve, reject) => {
    let sql = 'SELECT * FROM deep_sky_objects WHERE name LIKE ? OR type LIKE ? OR visual_characteristics LIKE ?';
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

module.exports = DeepSkyObject;
