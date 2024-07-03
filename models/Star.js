const db = require('../config/database');

const Star = {};

Star.create = (star, callback) => {
  const query = 'INSERT INTO stars (name, spectral_type, magnitude, distance, constellation, historical_data, mythological_data) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(query, [star.name, star.spectral_type, star.magnitude, star.distance, star.constellation, star.historical_data, star.mythological_data], (err, results) => {
    if (err) return callback(err);
    return callback(null, results.insertId);
  });
};

Star.findAll = (callback) => {
  const query = 'SELECT * FROM stars';
  db.query(query, (err, results) => {
    if (err) return callback(err);
    return callback(null, results);
  });
};

Star.findById = (id, callback) => {
  const query = 'SELECT * FROM stars WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) return callback(err);
    const star = results[0] || {};
    star.references = star.references || [];
    return callback(null, star);
  });
};

Star.update = (id, star, callback) => {
  const query = 'UPDATE stars SET name = ?, spectral_type = ?, magnitude = ?, distance = ?, constellation = ?, historical_data = ?, mythological_data = ? WHERE id = ?';
  db.query(query, [star.name, star.spectral_type, star.magnitude, star.distance, star.constellation, star.historical_data, star.mythological_data, id], (err, results) => {
    if (err) return callback(err);
    return callback(null, results);
  });
};

Star.delete = (id, callback) => {
  const query = 'DELETE FROM stars WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) return callback(err);
    return callback(null, results);
  });
};

Star.search = (query, magnitude) => {
  return new Promise((resolve, reject) => {
    let sql = 'SELECT * FROM stars WHERE name LIKE ? OR spectral_type LIKE ? OR constellation LIKE ?';
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

module.exports = Star;
