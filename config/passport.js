const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/User');

// Configurar estrategia local
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findByUsername(username, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Usuario no encontrado' });
      }
      bcrypt.compare(password, user.password, function(err, res) {
        if (res) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Contraseña incorrecta' });
        }
      });
    });
  }
));

// Serializar usuario
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

// Deserializar usuario
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

module.exports = passport; // Exportar configuración de passport
