
const router = require('express').Router();
const marca = require("../apiService/marca/controller");

// Create a new Marca
router.post("/", marca.create);

// Retrieve all Marca
router.get("/", marca.findAll);

// Retrieve a single Marca with id
router.get("/:id", marca.findOne);

// Update a Marca with id
router.put("/:id", marca.update);

// Delete a Marca with id
router.delete("/:id", marca.delete);

// Delete all Marcas
router.delete("/", marca.deleteAll);

module.exports = router 