const router = require('express').Router();
const area = require('../apiService/area/controller');

/**
 * @swagger
 *
 * components:
 *  schemas:
 *    area:
 *      type: object
 *      properties:
 *        id_equipo:
 *          type: integer
 *          description: id autogenerado del equipo
 *        descripcion:
 *          type: string
 *          description: descripcion del equipo
 *        eliminado:
 *          type: integer
 *          description: indica 1 si esta inactivo 0 si esta activo
 *        f_create:
 *          type: date
 *          description: fecha automatica de creacion
 *        f_update:
 *          type: date
 *          description: fecha automatica de actulizacion
 *        u_create:
 *          type: string
 *          description: usuario de creacion
 *        u_update:
 *          type: string
 *          description: usuario de actualizacion
 *        id_modelo:
 *          type: integer
 *          description: id del modelo
 *      required:
 *        - descripcion
 *        - eliminado
 *        - u_create
 *        - modelo_id_modelo
 *      example:
 *        descripcion: Intel I-7-10
 *        eliminado: 1
 *        f_create: 2022-01-18 22:43:09
 *        f_update: 2022-01-18 22:43:09
 *        u_create: rbueno
 *        u_update: admin
 *        id_modelo: 1
 */

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
