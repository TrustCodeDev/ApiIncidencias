const router = require('express').Router();
const area = require('../apiService/area/controller');

// Create a new Area
router.post('/', area.create);

// Retrieve all Area
router.get('/', area.findAll);

// Retrieve a single Area with id
router.get('/:id', area.findOne);

// Update a Area with id
router.put('/:id', area.update);

// Delete a Area with id
router.delete('/:id', area.delete);

module.exports = router;
