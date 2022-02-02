//CONOCIMIENTO CONTROLLER

const { Logger } = require('../../loaders/logger');
const Conocimiento = require('./model');

//CREATE CONOCIMIENTO
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }

  // Create a Conocimiento
  const conocimiento = new Conocimiento({
    descripcion: req.body.descripcion,
    fecha: req.body.fecha,
    solucion: req.body.solucion,
    usuario: req.body.usuario,
    eliminado: req.body.eliminado,
    u_create: req.body.u_create,
    u_update: req.body.u_update,
  });

  // validate repeated

  Conocimiento.findByName(conocimiento.descripcion, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while validate the Conocimiento.',
      });
    }

    if (data === 1) {
      res.send({
        message:
          'El conocimiento que intenas registrar ya existe, verifique los datos',
      });
    } else {
      // Save conocimiento in the database
      Conocimiento.create(conocimiento, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message ||
              'Some error occurred while creating the Conocimiento.',
          });
        else res.send(data);
      });
    }
  });
};

// Retrieve all Conocimientos from the database (with condition).
exports.findAll = (req, res) => {
  Conocimiento.getAll((err, data) => {
    if (err) {
      Logger.error(`Error: ${err}`);
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving Conocimientos.',
      });
    } else res.send(data);
  });
};

// Find a single conocimiento by Id
exports.findOne = (req, res) => {
  Conocimiento.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Conocimiento with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: 'Error retrieving Conocimiento with id ' + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// Update a Conocimiento identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }

  Logger.info(req.body);

  Conocimiento.updateById(
    req.params.id,
    new Conocimiento(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === 'not_found') {
          res.status(404).send({
            message: `Not found Conocimiento with id ${req.params.id}.`,
          });
        } else {
          res.status(500).send({
            message: 'Error updating Conocimiento with id ' + req.params.id,
          });
        }
      } else res.send(data);
    },
  );
};

// Delete a Conocimiento with the specified id in the request
exports.delete = (req, res) => {
  Conocimiento.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Conocimiento with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: 'Could not delete Conocimiento with id ' + req.params.id,
        });
      }
    } else res.send({ message: `Conocimiento was deleted successfully!` });
  });
};
