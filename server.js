const express = require('express');
const session = require('express-session');
const passport = require('./config/passport');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const path = require('path');
const starRouter = require('./routes/starRoutes');
const planetRouter = require('./routes/planetRoutes');
const deepSkyObjectRouter = require('./routes/deepSkyObjectRoutes');
const cometAsteroidRouter = require('./routes/cometAsteroidRoutes');
const homeRouter = require('./routes/homeRoutes');
const searchRouter = require('./routes/searchRoutes');

dotenv.config();

const app = express();

// Configuración de la vista
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.use('/', homeRouter);
app.use('/', starRouter);
app.use('/', planetRouter);
app.use('/', deepSkyObjectRouter);
app.use('/', cometAsteroidRouter);
app.use('/', searchRouter);

// Puerto
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

module.exports = app;
