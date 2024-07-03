const db = require('../config/database');

const CometAsteroid = {};

CometAsteroid.create = (object, callback) => {
  const query = 'INSERT INTO comets_asteroids (name, orbit, size, composition, notable_events) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [object.name, object.orbit, object.size, object.composition, object.notable_events], (err, results) => {
    if (err) return callback(err);
    return callback(null, results.insertId);
  });
};

CometAsteroid.findAll = (callback) => {
  const query = 'SELECT * FROM comets_asteroids';
  db.query(query, (err, results) => {
    if (err) return callback(err);
    return callback(null, results);
  });
};

CometAsteroid.findById = (id, callback) => {
  const query = 'SELECT * FROM comets_asteroids WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) return callback(err);
    const object = results[0] || {};
    object.references = object.references || [];
    return callback(null, object);
  });
};

CometAsteroid.update = (id, object, callback) => {
  const query = 'UPDATE comets_asteroids SET name = ?, orbit = ?, size = ?, composition = ?, notable_events = ? WHERE id = ?';
  db.query(query, [object.name, object.orbit, object.size, object.composition, object.notable_events, id], (err, results) => {
    if (err) return callback(err);
    return callback(null, results);
  });
};

CometAsteroid.delete = (id, callback) => {
  const query = 'DELETE FROM comets_asteroids WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) return callback(err);
    return callback(null, results);
  });
};

CometAsteroid.search = (query, magnitude) => {
  return new Promise((resolve, reject) => {
    let sql = 'SELECT * FROM comets_asteroids WHERE name LIKE ? OR orbit LIKE ? OR composition LIKE ?';
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

module.exports = CometAsteroid;
