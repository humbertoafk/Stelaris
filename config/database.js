const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

// Configuración de conexión a la base de datos
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

// Conectar a la base de datos
connection.connect((err) => {
  if (err) throw err;
  console.log('Conectado a la base de datos MySQL');
});

module.exports = connection;
