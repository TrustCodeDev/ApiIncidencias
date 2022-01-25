const { Logger } = require("../../loaders/logger");
const Equipo = require("./model");
const { findById } = require('../modelo/model');


exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const equipo = new Equipo({
    descripcion: req.body.descripcion,
    eliminado: req.body.eliminado,
    u_create: req.body.u_create,
    id_modelo: req.body.id_modelo
  });

  //verificar si el id del modelo existe
  findById(equipo.id_modelo, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Modelo with id ${equipo.idModelo}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Modelo with id " + equipo.id_modelo
        });
      }
    } else {
      //si existe el equipo
      Equipo.findByName(equipo.descripcion, (err, data) => {
        if (err) {
          res.status(500).send({
            message:
              err.message || "Some error occurred while validate the Equipo."
          })
        }

        if (data === 1) {
          res.send({
            message: "El Equipo que intenas registrar ya existe, verifique los datos"
          })
        } else {
          Equipo.create(equipo, (err, data) => {
            if (err)
              res.status(500).send({
                message:
                  err.message || "Some error occurred while creating the Equipo."
              });
            else res.send(data);
          });
        }
      });
    }
  })
};

exports.findAll = (req, res) => {
  Equipo.getAll((err, data) => {
    if (err) {
      Logger.error(`Error: ${err}`);
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Equipo."
      });
    } else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Equipo.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Equipo with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Equipo with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const idEquipo = req.params.id
  const equipoObj = new Equipo(req.body)

  //validate if exists equipo to update
  Equipo.findById(idEquipo, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Equipo with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Equipo with id " + req.params.id
        });
      }
    } else {
      //si el modelo existe
      //validar la marca a actualizar
      findById(equipoObj.id_modelo, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Modelo with id ${equipoObj.id_modelo}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving Modelo with id " + equipoObj.id_modelo
            });
          }
        } else {
          //si existe la marca
          Logger.info(req.body);

          Equipo.updateById(
            idEquipo,
            equipoObj,
            (err, data) => {
              if (err) {
                if (err.kind === "not_found") {
                  res.status(404).send({
                    message: `Not found Equipo with id ${req.params.id}.`
                  });
                } else {
                  res.status(500).send({
                    message: "Error updating Equipo with id " + req.params.id
                  });
                }
              } else {
                res.send(data);
              }
            }
          );
        }
      })
    }
  });
};

exports.delete = (req, res) => {
  Equipo.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Equipo with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Equipo with id " + req.params.id
        });
      }
    } else res.send({ message: `Equipo was deleted successfully!` });
  });
};