//DETALLE INCIDENCIA CONTROLLER

const { Logger } = require('../../loaders/logger');
const DetalleIncidencia = require('./model');
const area = require('../area/model.js');
const usuario = require('../usuario/model.js');

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }

  // Create a detalle incidencia
  const detalleIncidencia = new DetalleIncidencia({
    eliminado: req.body.eliminado,
    u_create: req.body.u_create,
    u_update: req.body.u_update,
    id_incidencia: req.body.id_incidencia,
    id_conocimiento: req.body.id_conocimiento,
  });

  // area.findById(detalleIncidencia.area_id_area, (err, data) => {
  //   if (err)
  //     res.status(204).send({
  //       message:
  //         err.message ||
  //         `Area con id ${detalleIncidencia.area_id_area} no existe.`,
  //     });
  // });

  // usuario.findById(detalleIncidencia.usuario_id_usuario, (err, data) => {
  //   if (err)
  //     res.status(204).send({
  //       message:
  //         err.message ||
  //         `El usuario con id ${detalleIncidencia.usuario_id_usuario} no existe.`,
  //     });
  // });

  // Save DetalleIncidencia in the database
  DetalleIncidencia.create(detalleIncidencia, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message ||
          'Some error occurred while creating the Detalle incidencia.',
      });
    else res.send(data);
  });

  // validate area exist

  // DetalleIncidencia.findByName(area.nombre, (err, data) => {
  //   if (err) {
  //     res.status(500).send({
  //       message: err.message || 'Some error occurred while validate the Area.',
  //     });
  //   }

  //   if (data === 1) {
  //     res.send({
  //       message: 'El area que intenas registrar ya existe, verifique los datos',
  //     });
  //   } else {
  //     // Save Area in the database
  //     Area.create(area, (err, data) => {
  //       if (err)
  //         res.status(500).send({
  //           message:
  //             err.message || 'Some error occurred while creating the Area.',
  //         });
  //       else res.send(data);
  //     });
  //   }
  // });
};

// Retrieve all Detalle incidencias from the database (with condition).
exports.findAll = (req, res) => {
  DetalleIncidencia.getAll((err, data) => {
    if (err) {
      Logger.error(`Error: ${err}`);
      res.status(500).send({
        message:
          err.message ||
          'Some error occurred while retrieving Detalle incidencias.',
      });
    } else res.send(data);
  });
};

// Find a single Detalle Incidencia by Id
exports.findOne = (req, res) => {
  DetalleIncidencia.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Detalle Incidencia with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message:
            'Error retrieving Detalle Incidencia with id ' + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// Update a Detalle Incidencia identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }

  Logger.info(req.body);

  DetalleIncidencia.updateById(
    req.params.id,
    new DetalleIncidencia(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === 'not_found') {
          res.status(404).send({
            message: `Not found Detalle incidencia with id ${req.params.id}.`,
          });
        } else {
          res.status(500).send({
            message:
              'Error updating Detalle incidencia with id ' + req.params.id,
          });
        }
      } else res.send(data);
    },
  );
};

// Delete a Detalle Incidencia with the specified id in the request
exports.delete = (req, res) => {
  DetalleIncidencia.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found DetalleIncidencia with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message:
            'Could not delete Detalle Incidencia with id ' + req.params.id,
        });
      }
    } else
      res.send({ message: `Detalle Incidencia was deleted successfully!` });
  });
};
