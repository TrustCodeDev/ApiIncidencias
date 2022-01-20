
const router = require('express').Router();
const modelo = require("../apiService/modelo/controller");


router.post("/", modelo.create);

router.get("/", modelo.findAll);

router.get("/:id", modelo.findOne);

router.put("/:id", modelo.update);

router.delete("/:id", modelo.delete);

module.exports = router 