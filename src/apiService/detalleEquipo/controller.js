const { Logger } = require("../../loaders/logger");
const DetalleEquipo = require("./model");
const { findById } = require('../equipo/model');


exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const DetalleEquipo = new DetalleEquipo({
        caracteristica: req.body.caracteristica,
        eliminado: req.body.eliminado,
        u_create: req.body.u_create,
        id_equipo: req.body.id_equipo
    });

    //verificar si el id del equipo existe
    findById(DetalleEquipo.id_equipo, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Equipo with id ${DetalleEquipo.id_equipo}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Equipo with id " + DetalleEquipo.id_equipo
                });
            }
        } else {
            //si existe el equipo
            /*Equipo.findByName(equipo.descripcion, (err, data) => {
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
                
              }
            });*/
            DetalleEquipo.create(DetalleEquipo, (err, data) => {
                if (err)
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while creating the DetalleEquipo."
                    });
                else res.send(data);
            });
        }
    })
};

exports.findAll = (req, res) => {
    DetalleEquipo.getAll((err, data) => {
        if (err) {
            Logger.error(`Error: ${err}`);
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving DetalleEquipo."
            });
        } else res.send(data);
    });
};

exports.findOne = (req, res) => {
    DetalleEquipo.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found DetalleEquipo with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving DetalleEquipo with id " + req.params.id
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

    const idDetalleEquipo = req.params.id
    const detEquipoObj = new DetalleEquipo(req.body)

    //validate if exists DetalleEquipo to update
    DetalleEquipo.findById(idDetalleEquipo, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found DetalleEquipo with id ${idDetalleEquipo}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving DetalleEquipo with id " + idDetalleEquipo
                });
            }
        } else {
            //si el equipo existe
            //validar si el Equipo existe para actualizar
            findById(detEquipoObj.id_equipo, (err, data) => {
                if (err) {
                    if (err.kind === "not_found") {
                        res.status(404).send({
                            message: `Not found Equipo with id ${equipoObj.id_equipo}.`
                        });
                    } else {
                        res.status(500).send({
                            message: "Error retrieving Modelo with id " + equipoObj.id_equipo
                        });
                    }
                } else {
                    //si existe la Equipo
                    Logger.info(req.body);

                    DetalleEquipo.updateById(
                        idDetalleEquipo,
                        detEquipoObj,
                        (err, data) => {
                            if (err) {
                                if (err.kind === "not_found") {
                                    res.status(404).send({
                                        message: `Not found DetalleEquipo with id ${idDetalleEquipo}.`
                                    });
                                } else {
                                    res.status(500).send({
                                        message: "Error updating DetalleEquipo with id " + idDetalleEquipo
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
    DetalleEquipo.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found DetalleEquipo with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete DetalleEquipo with id " + req.params.id
                });
            }
        } else res.send({ message: `DetalleEquipo was deleted successfully!` });
    });
};