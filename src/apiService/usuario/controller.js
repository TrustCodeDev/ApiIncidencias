const { Logger } = require("../../loaders/logger");
const Usuario = require("./model");
/* const {findById} = require("../tipo_usuario/model"); */


exports.create = (req, res) => {

    // Validate request
    if (!req.body) {
    res.status(400).send({
        message: "Content can not be empty!"
    });
    }

    // Create Usuario 
    const usuario = new Usuario({
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    sexo: req.body.sexo,
    telefono: req.body.telefono,
    u_create: req.body.u_create,
    u_update: req.body.u_update,
    nickname: req.body.nickname,
    contrasena: req.body.contrasena,
    id_tipo_usuario: req.body.id_tipo_usuario
    });

    // validate Repeated
    Usuario.findByName(usuario.nickname, (err, data) => {
    if (err) {
        res.status(500).send({
        message:
            err.message || "Some error occurred while validate Usuario."
        })
    }
    
    if (data === 1) {
        res.send({
        message: "El Usuario que intentas registrar ya existe, verifique los datos (NICKNAME)"
        })
    } else {
        // Save Usuario in the database
        Usuario.create(usuario, (err, data) => {
        if (err)
            res.status(500).send({
            message:
                err.message || "Some error occurred while creating Usuario."
        });
        else res.send(data);
        });
        }
    });

};


// Find all Usuario from the database (with condition).
exports.findAll = (req, res) => {

    Usuario.getAll((err, data) => {

    if (err) {
        Logger.error(`Error: ${err}`);
        res.status(500).send({
        message:
            err.message || "Some error occurred while retrieving Usuario."
        });
    } else res.send(data);
    });

};


// Find Usuario by Id
exports.findOne = (req, res) => {

    Usuario.findById(req.params.id, (err, data) => {

    if (err) {
        if (err.kind === "not_found") {
        res.status(404).send({
            message: `Not found Usuario with id ${req.params.id}.`
        });
        } else {
        res.status(500).send({
            message: "Error retrieving Usuario with id " + req.params.id
        });
        }
    } else res.send(data);
    });

};


// Update Usuario identified by the id in the request
exports.update = (req, res) => {

    // Validate Request
    if (!req.body) {
    res.status(400).send({
        message: "Content can not be empty!"
    });
    }

    Logger.info(req.body);

    Usuario.updateById(req.params.id, new Usuario(req.body), (err, data) => {

        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                message: `Not found Usuario with id ${req.params.id}.`
                });
            } else {
            res.status(500).send({
            message: "Error updating Usuario with id " + req.params.id
            });
        }
        } else res.send(data);
    }
    );
};


// Delete Usuario with the specified id in the request
exports.delete = (req, res) => {

    Usuario.remove(req.params.id, (err, data) => {

    if (err) {
        if (err.kind === "not_found") {
        res.status(404).send({
            message: `Not found Usuario with id ${req.params.id}.`
        });
        } else {
        res.status(500).send({
            message: "Could not delete Usuario with id " + req.params.id
        });
        }
    } else res.send({ message: `Usuario was deleted successfully!` });
    });
};
