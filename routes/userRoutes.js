const express = require('express');
const router = express.Router();
const db = require('../config/database');
const { ensureAuthenticated } = require('../config/auth'); // Importar el middleware de autenticación
const logStarVisits = require('../middlewares/logStarVisits');

// Ruta para obtener el nombre del usuario
router.get('/username', ensureAuthenticated, (req, res) => {
    if (!req.user) {
        return res.status(401).json({ error: 'Usuario no autenticado' });
    }

    const userId = req.user.id;

    db.query('SELECT username FROM users WHERE id = ?', [userId], (err, results) => {
        if (err) {
            console.error('Error al obtener el nombre del usuario:', err);
            return res.status(500).json({ error: 'Error al obtener el nombre del usuario.' });
        }

        if (results.length > 0) {
            const username = results[0].username;
            res.json({ username });
        } else {
            res.status(404).json({ error: 'Usuario no encontrado.' });
        }
    });
});

// Ruta para obtener detalles de un objeto estelar y registrar la visita
router.get('/stars/:id', ensureAuthenticated, logStarVisits, (req, res) => {
    const starId = req.params.id;

    db.query('SELECT * FROM stars WHERE id = ?', [starId], (err, results) => {
        if (err) {
            console.error('Error al obtener el objeto estelar:', err);
            return res.status(500).json({ error: 'Error al obtener el objeto estelar.' });
        }

        if (results.length > 0) {
            const star = results[0];
            res.json({ star });
        } else {
            res.status(404).json({ error: 'Objeto estelar no encontrado.' });
        }
    });
});

module.exports = router;
