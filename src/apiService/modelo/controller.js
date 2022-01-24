const { Logger } = require("../../loaders/logger");
const Modelo = require("./model");
const { findById } = require('../marca/model');


exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const modelo = new Modelo({
    nombre: req.body.nombre,
    eliminado: req.body.eliminado,
    u_create: req.body.u_create,
    u_update: req.body.u_update,
    id_marca: req.body.id_marca
  });

  //verificar si el id de la marca existe
  findById(modelo.id_marca, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Marca with id ${modelo.id_marca}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Marca with id " + modelo.id_marca
        });
      }
    } else {
      //si existe el id de la marca
      Modelo.findByName(modelo.nombre, (err, data) => {
        if (err) {
          res.status(500).send({
            message:
              err.message || "Some error occurred while validate the Modelo."
          })
        }

        if (data === 1) {
          res.send({
            message: "El modelo que intenas registrar ya existe, verifique los datos"
          })
        } else {
          Modelo.create(modelo, (err, data) => {
            if (err)
              res.status(500).send({
                message:
                  err.message || "Some error occurred while creating the Modelo."
              });
            else res.send(data);
          });
        }
      });
    }
  })
};

exports.findAll = (req, res) => {
  Modelo.getAll((err, data) => {
    if (err) {
      Logger.error(`Error: ${err}`);
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Modelo."
      });
    } else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Modelo.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Modelo with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Marca with id " + req.params.id
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

  //validate if exists modelo to update
  Modelo.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Modelo with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Marca with id " + req.params.id
        });
      }
    } else res.send(data);
  });

  //validar la marca a actualizar
  findById(modelo.id_marca, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Marca with id ${modelo.id_marca}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Marca with id " + modelo.id_marca
        });
      }
    } else {
      Logger.info(req.body);

      Modelo.updateById(
        req.params.id,
        new Modelo(req.body),
        (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found Modelo with id ${req.params.id}.`
              });
            } else {
              res.status(500).send({
                message: "Error updating Modelo with id " + req.params.id
              });
            }
          } else {
            res.send(data);
          }
        }
      );
    }
  })
};

exports.delete = (req, res) => {
  Modelo.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Modelo with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Modelo with id " + req.params.id
        });
      }
    } else res.send({ message: `Modelo was deleted successfully!` });
  });
};