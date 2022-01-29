const { Logger } = require("../../loaders/logger");
const Incidencia = require("./model");


exports.create = (req, res) => {

    // Validate request
    if (!req.body) {
    res.status(400).send({
        message: "Content can not be empty!"
    });
    }

    // Create Incidencia 
    const incidencia = new Incidencia({
    fecha_finalizacion: req.body.fecha_finalizacion,
    descripcion: req.body.descripcion,
    usuario: req.body.usuario,
    nivel_incidencia: req.body.nivel_incidencia,
    eliminado: req.body.eliminado,
    u_create: req.body.u_create,
    u_update: req.body.u_update,
    equipo_id_equipo: req.body.equipo_id_equipo,
    fecha_inicio: req.body.fecha_inicio
    });

    // validate Repeated
    Incidencia.findByName(incidencia.descripcion, (err, data) => {
    if (err) {
        res.status(500).send({
        message:
            err.message || "Some error occurred while validate Incidencia."
        })
    }
    
    if (data === 1) {
        res.send({
        message: "La Incidencia que intentas registrar ya existe, verifique los datos (DESCRIPCION)"
        })
    } else {
        // Save Incidencia in the database
        Incidencia.create(incidencia, (err, data) => {
        if (err)
            res.status(500).send({
            message:
                err.message || "Some error occurred while creating Incidencia."
        });
        else res.send(data);
        });
        }
    });

};


// Find Incidencia by Id
exports.findOne = (req, res) => {

    Incidencia.findById(req.params.id, (err, data) => {

    if (err) {
        if (err.kind === "not_found") {
        res.status(404).send({
            message: `Not found Incidencia with id ${req.params.id}.`
        });
        } else {
        res.status(500).send({
            message: "Error retrieving Incidencia with id " + req.params.id
        });
        }
    } else res.send(data);
    });

};


// Find all Incidencia from the database (with condition).
exports.findAll = (req, res) => {

    Incidencia.getAll((err, data) => {

    if (err) {
        Logger.error(`Error: ${err}`);
        res.status(500).send({
        message:
            err.message || "Some error occurred while retrieving Incidencia."
        });
    } else res.send(data);
    });

};


// Update Incidencia identified by the id in the request
exports.update = (req, res) => {

    // Validate Request
    if (!req.body) {
    res.status(400).send({
        message: "Content can not be empty!"
    });
    }

    Logger.info(req.body);

    Incidencia.updateById(req.params.id, new Incidencia(req.body), (err, data) => {

        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                message: `Not found Incidencia with id ${req.params.id}.`
                });
            } else {
            res.status(500).send({
            message: "Error updating Incidencia with id " + req.params.id
            });
        }
        } else res.send(data);
    }
    );
};


// Delete Incidencia with the specified id in the request
exports.delete = (req, res) => {

    Incidencia.remove(req.params.id, (err, data) => {

    if (err) {
        if (err.kind === "not_found") {
        res.status(404).send({
            message: `Not found Incidencia with id ${req.params.id}.`
        });
        } else {
        res.status(500).send({
            message: "Could not delete Incidencia with id " + req.params.id
        });
        }
    } else res.send({ message: `Incidencia was deleted successfully!` });
    });
};