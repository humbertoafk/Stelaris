const db = require('../config/database');

const User = {};

User.findByUsername = (username, callback) => {
  const query = 'SELECT * FROM users WHERE username = ?';
  db.query(query, [username], (err, results) => {
    if (err) return callback(err);
    return callback(null, results[0]);
  });
};

User.findById = (id, callback) => {
  const query = 'SELECT * FROM users WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) return callback(err);
    return callback(null, results[0]);
  });
};

module.exports = User;
