const { Logger } = require("../../loaders/logger");
const Tipo_Usuario = require("./model");

exports.create = (req, res) => {

    // Validate request
    if (!req.body) {
    res.status(400).send({
        message: "Content can not be empty!"
    });
    }

    // Create Tipo_Usuario
    const tipo_usuario = new Tipo_Usuario({
    descripcion: req.body.descripcion,
    estado : req.body.estado,
    eliminado: req.body.eliminado,
    u_create: req.body.u_create,
    u_update: req.body.u_update
    });

    // validate Repeated
    Tipo_Usuario.findByName(tipo_usuario.descripcion, (err, data) => {
    if (err) {
        res.status(500).send({
        message:
            err.message || "Some error occurred while validate Tipo_Usuario."
        })
    }

    if (data === 1) {
        res.send({
        message: "El tipo_usuario que intentas registrar ya existe, verifique los datos"
        })
    } else {
        // Save Tipo_Usuario in the database
        Tipo_Usuario.create(tipo_usuario, (err, data) => {
        if (err)
            res.status(500).send({
            message:
                err.message || "Some error occurred while creating Tipo_Usuario."
        });
        else res.send(data);
        });
        }
    });
};


// Find all Tipo_Usuario from the database (with condition).
exports.findAll = (req, res) => {

    Tipo_Usuario.getAll((err, data) => {

    if (err) {
        Logger.error(`Error: ${err}`);
        res.status(500).send({
        message:
            err.message || "Some error occurred while retrieving Tipo_usuario."
        });
    } else res.send(data);
    });

};


// Find Tipo_Usuario by Id
exports.findOne = (req, res) => {

    Tipo_Usuario.findById(req.params.id, (err, data) => {

    if (err) {
        if (err.kind === "not_found") {
        res.status(404).send({
            message: `Not found Tipo_usuario with id ${req.params.id}.`
        });
        } else {
        res.status(500).send({
            message: "Error retrieving Tipo_Usuario with id " + req.params.id
        });
        }
    } else res.send(data);
    });

};


// Update Tipo_Usuario identified by the id in the request
exports.update = (req, res) => {

    // Validate Request
    if (!req.body) {
    res.status(400).send({
        message: "Content can not be empty!"
    });
    }

    Logger.info(req.body);

    Tipo_Usuario.updateById(req.params.id, new Tipo_Usuario(req.body), (err, data) => {

        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                message: `Not found Tipo_Usuario with id ${req.params.id}.`
                });
            } else {
            res.status(500).send({
            message: "Error updating Tipo_Usuario with id " + req.params.id
            });
        }
        } else res.send(data);
    }
    );

};


// Delete Tipo_Usuario with the specified id in the request
exports.delete = (req, res) => {

    Tipo_Usuario.remove(req.params.id, (err, data) => {

    if (err) {
        if (err.kind === "not_found") {
        res.status(404).send({
            message: `Not found Tipo_Usuario with id ${req.params.id}.`
        });
        } else {
        res.status(500).send({
            message: "Could not delete Tipo_Usuario with id " + req.params.id
        });
        }
    } else res.send({ message: `Tipo_Usuario was deleted successfully!` });
    });
};

