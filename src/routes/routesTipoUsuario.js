const router = require('express').Router();
const tipo_usuario = require("../apiService/tipo_usuario/controller");

// Create a new Tipo_usuario
router.post("/", tipo_usuario.create);

// Retrieve all Tipo_Usuario
router.get("/", tipo_usuario.findAll);

// Retrieve a single Tipo_Usuario with id
router.get("/:id", tipo_usuario.findOne);

// Update a Tipo_Usuario with id
router.put("/:id", tipo_usuario.update);

// Delete Tipo_Usuario with id
router.delete("/:id", tipo_usuario.delete); 

module.exports = router 