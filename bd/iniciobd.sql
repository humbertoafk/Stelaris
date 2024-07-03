CREATE DATABASE IF NOT EXISTS f_o_umsa;

USE f_o_umsa;

CREATE TABLE IF NOT EXISTS stars (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  spectral_type VARCHAR(50),
  magnitude DECIMAL(5, 2),
  distance DECIMAL(10, 2),
  constellation VARCHAR(100),
  historical_data TEXT,
  mythological_data TEXT
);

CREATE TABLE IF NOT EXISTS planets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  size DECIMAL(10, 2),
  mass DECIMAL(10, 2),
  composition TEXT,
  atmosphere TEXT,
  moons TEXT,
  space_missions TEXT,
  notable_features TEXT
);

CREATE TABLE IF NOT EXISTS deep_sky_objects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50),
  distance DECIMAL(10, 2),
  size DECIMAL(10, 2),
  visual_characteristics TEXT,
  scientific_data TEXT
);

CREATE TABLE IF NOT EXISTS comets_asteroids (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  orbit TEXT,
  size DECIMAL(10, 2),
  composition TEXT,
  notable_events TEXT
);
