const { Logger } = require("../../loaders/logger");
const Marca = require("./model");


exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Marca
  const marca = new Marca({
    nombre: req.body.nombre,
    //eliminado: req.body.eliminado,
    u_create: req.body.u_create,
    //u_update: req.body.u_update
  });

  // validate repeated

  Marca.findByName(marca.nombre, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while validate the Marca."
      })
    }

    if (data === 1) {
      res.send({
        message: "La marca que intenas registrar ya existe, verifique los datos"
      })
    } else {
      // Save Marca in the database
      Marca.create(marca, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Marca."
          });
        else res.send(data);
      });
    }
  });
};

// Retrieve all Marcas from the database (with condition).
exports.findAll = (req, res) => {
  Marca.getAll((err, data) => {
    if (err) {
      Logger.error(`Error: ${err}`);
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Marcas."
      });
    } else res.send(data);
  });
};

// Find a single marca by Id
exports.findOne = (req, res) => {
  Marca.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Marca with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Marca with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Update a Marca identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Logger.info(req.body);

  Marca.updateById(
    req.params.id,
    new Marca(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Marca with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Marca with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  Marca.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Marca with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Marca with id " + req.params.id
        });
      }
    } else res.send({ message: `Marca was deleted successfully!` });
  });
};

// Delete all Tutorials from the database.
/*exports.deleteAll = (req, res) => {
  Marca.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Marcas."
      });
    else res.send({ message: `All Marcas were deleted successfully!` });
  });
};*/