const Main = require('../models/Main');

// Crear un nuevo registro
exports.createMain = (req, res) => {
  const newMain = {
    name: req.body.name,
    description: req.body.description
  };

  Main.create(newMain, (err, mainId) => {
    if (err) {
      return res.status(500).json({ error: 'Error al crear el registro' });
    }
    res.status(201).json({ id: mainId, ...newMain });
  });
};

// Obtener todos los registros
exports.getMains = (req, res) => {
  Main.findAll((err, mains) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener los registros' });
    }
    res.status(200).json(mains);
  });
};

// Obtener un registro por ID
exports.getMainById = (req, res) => {
  const mainId = req.params.id;
  Main.findById(mainId, (err, main) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener el registro' });
    }
    res.status(200).json(main);
  });
};

// Actualizar un registro
exports.updateMain = (req, res) => {
  const mainId = req.params.id;
  const updatedMain = {
    name: req.body.name,
    description: req.body.description
  };

  Main.update(mainId, updatedMain, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error al actualizar el registro' });
    }
    res.status(200).json(result);
  });
};

// Eliminar un registro
exports.deleteMain = (req, res) => {
  const mainId = req.params.id;
  Main.delete(mainId, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error al eliminar el registro' });
    }
    res.status(200).json(result);
  });
};
