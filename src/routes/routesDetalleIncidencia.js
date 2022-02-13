const router = require('express').Router();
const detalleIncidencia = require('../apiService/detalleIncidencia/controller');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

/**
 * @swagger
 *
 * components:
 *  schemas:
 *    detalleIncidencia:
 *      type: object
 *      properties:
 *        id_detalle_incidencia:
 *          type: integer
 *          description: id autogenerado del detalle incidencia
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
 *        id_incidencia:
 *          type: integer
 *          description: id de la incidencia registrada
 *        id_conocimiento:
 *          type: integer
 *          description: id del conocimiento
 *      required:
 *        - eliminado
 *        - u_create
 *        - id_incidencia
 *        - id_conocimiento
 *      example:
 *        eliminado: 0
 *        f_create: 2022-02-02 22:43:09
 *        f_update: 2022-02-02 22:43:09
 *        u_create: rbueno
 *        u_update: admin
 *        id_incidencia: 1
 *        id_conocimiento: 1
 */

// Create a new Detalle Incidencia
/**
 * @swagger
 * /detalleIncidencia/create:
 *   post:
 *     summary: crear un detalle incidencia
 *     tags: [Detalle Incidencia]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/detalleIncidencia'
 *     responses:
 *       200:
 *         description: detalle incidencia creada satisfactoriamente
 */
router.post('/create/', detalleIncidencia.create);

// Retrieve all Detalle Incidencia
/**
 * @swagger
 * /detalleIncidencia/findAll:
 *   get:
 *     summary: listar los detalles incidencias
 *     tags: [Detalle Incidencia]
 *     responses:
 *       200:
 *         description: listado de informacion satisfactoria
 *         content:
 *            application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/detalleIncidencia'
 */
router.get('/findAll', detalleIncidencia.findAll);

// Retrieve a single Detalle Incidencia with id
/**
 * @swagger
 * /detalleIncidencia/findOne/{id}:
 *   get:
 *     summary: listar un detalle incidencia
 *     tags: [Detalle Incidencia]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: id del detalle incidencia
 *     responses:
 *       200:
 *         description: detalle incidencia encontrado
 *         content:
 *            application/json:
 *               schema:
 *                 type: object
 *                 $ref: '#/components/schemas/detalleIncidencia'
 *       404:
 *         description: Detalle incidencia not found
 */
router.get('/findOne/:id', detalleIncidencia.findOne);

// Update a Detalle incidencia with id
/**
 * @swagger
 * /detalleIncidencia/update/{id}:
 *   put:
 *     summary: actualizar un detalle incidencia en especifico
 *     tags: [Detalle Incidencia]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: id del detalle incidencia
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/detalleIncidencia'
 *     responses:
 *       200:
 *         description: se actualizo el detalle incidencia satisfactoriamente
 *       404:
 *         description: Detalle incidencia not found
 */
router.put('/update/:id', detalleIncidencia.update);

// Delete a Detalle Incidencia with id
/**
 * @swagger
 * /detalleIncidencia/delete/{id}:
 *   delete:
 *     summary: eliminar un Detalle incidencia
 *     tags: [Detalle Incidencia]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Detalle incidencia id
 *     responses:
 *       200:
 *         description: eliminado satisfactoriamente
 *       404:
 *         description: Detalle incidencia not found
 */
router.delete('/delete/:id', detalleIncidencia.delete);

module.exports = router;
