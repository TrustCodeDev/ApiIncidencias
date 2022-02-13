const router = require('express').Router();
const area = require('../apiService/area/controller');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

/**
 * @swagger
 *
 * components:
 *  schemas:
 *    area:
 *      type: object
 *      properties:
 *        id_area:
 *          type: integer
 *          description: id autogenerado del area
 *        nombre:
 *          type: string
 *          description: nombre del area
 *        estado:
 *          type: string
 *          description: estado del area
 *        eliminado:
 *          type: integer
 *          description: indica 1 si esta inactivo 0 si esta activo
 *        f_create:
 *          type: date
 *          description: fecha automatica de creacion
 *        f_update:
 *          type: date
 *          description: fecha automatica de actualizacion
 *        u_create:
 *          type: string
 *          description: usuario de creacion
 *        u_update:
 *          type: string
 *          description: usuario de actualizacion
 *      required:
 *        - nombre
 *        - estado
 *        - eliminado
 *        - u_create
 *      example:
 *        nombre: Contabilidad
 *        estado: Estado del area
 *        eliminado: 0
 *        f_create: 2022-01-18 22:43:09
 *        f_update: 2022-01-18 22:43:09
 *        u_create: rbueno
 *        u_update: admin
 */

// Create a new Area
/**
 * @swagger
 * /area/create:
 *   post:
 *     summary: crear un area
 *     tags: [Area]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/area'
 *     responses:
 *       200:
 *         description: area creada satisfactoriamente
 */
router.post('/create/', area.create);

// Retrieve all Area
/**
 * @swagger
 * /area/findAll:
 *   get:
 *     summary: listar las areas
 *     tags: [Area]
 *     responses:
 *       200:
 *         description: listado de informacion satisfactoria
 *         content:
 *            application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/area'
 */
router.get('/findAll', area.findAll);

// Retrieve a single Area with id
/**
 * @swagger
 * /area/findOne/{id}:
 *   get:
 *     summary: listar un area
 *     tags: [Area]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: id del area
 *     responses:
 *       200:
 *         description: area encontrada
 *         content:
 *            application/json:
 *               schema:
 *                 type: object
 *                 $ref: '#/components/schemas/area'
 *       404:
 *         description: area not found
 */
router.get('/findOne/:id', area.findOne);

// Update a Area with id
/**
 * @swagger
 * /area/update/{id}:
 *   put:
 *     summary: actualizar un area en especifico
 *     tags: [Area]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: id del area
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/area'
 *     responses:
 *       200:
 *         description: se actualizo el area satisfactoriamente
 *       404:
 *         description: area not found
 */
router.put('/update/:id', area.update);

// Delete a Area with id
/**
 * @swagger
 * /area/delete/{id}:
 *   delete:
 *     summary: eliminar un area
 *     tags: [Area]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: area id
 *     responses:
 *       200:
 *         description: eliminado satisfactoriamente
 *       404:
 *         description: area not found
 */
router.delete('/delete/:id', area.delete);

module.exports = router;
