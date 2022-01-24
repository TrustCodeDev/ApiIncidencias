const router = require('express').Router();
const usuario = require("../apiService/usuario/controller");

// Create a new Usuario
router.post("/", usuario.create);

// Retrieve all Usuario
router.get("/", usuario.findAll);

// Retrieve a single Usuario with id
router.get("/:id", usuario.findOne);

// Update a Usuario with id
router.put("/:id", usuario.update);

// Delete Usuario with id
router.delete("/:id", usuario.delete); 

module.exports = router 