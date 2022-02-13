//AREA CONTROLLER

const { Logger } = require('../../loaders/logger');
const Area = require('./model');

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }

  // Create a Area
  const area = new Area({
    nombre: req.body.nombre,
    eliminado: req.body.eliminado,
    u_create: req.body.u_create,
    u_update: req.body.u_update,
  });

  // validate repeated

  Area.findByName(area.nombre, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || 'Some error occurred while validate the Area.',
      });
    }

    if (data === 1) {
      res.send({
        message: 'El area que intenas registrar ya existe, verifique los datos',
      });
    } else {
      // Save Area in the database
      Area.create(area, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || 'Some error occurred while creating the Area.',
          });
        else res.send(data);
      });
    }
  });
};

// Retrieve all Areas from the database (with condition).
exports.findAll = (req, res) => {
  Area.getAll((err, data) => {
    if (err) {
      Logger.error(`Error: ${err}`);
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving Areas.',
      });
    } else res.send(data);
  });
};

// Find a single area by Id
exports.findOne = (req, res) => {
  Area.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(204).send({
          message: `Not found Area with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: 'Error retrieving Area with id ' + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// Update a Area identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }

  Logger.info(req.body);

  Area.updateById(req.params.id, new Area(req.body), (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Area with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: 'Error updating Area with id ' + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// Delete a Area with the specified id in the request
exports.delete = (req, res) => {
  Area.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Area with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: 'Could not delete Area with id ' + req.params.id,
        });
      }
    } else res.send({ message: `Area was deleted successfully!` });
  });
};
