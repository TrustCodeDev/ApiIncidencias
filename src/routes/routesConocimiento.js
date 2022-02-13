const router = require('express').Router();
const conocimiento = require('../apiService/conocimiento/controller');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

/**
 * @swagger
 *
 * components:
 *  schemas:
 *    conocimiento:
 *      type: object
 *      properties:
 *        id_conocimiento:
 *          type: integer
 *          description: Id autogenerado del conocimiento
 *        descripcion:
 *          type: string
 *          description: Descripción del conocimiento a guardar
 *        fecha:
 *          type: date
 *          description: Fecha en que sucedió el problema
 *        solucion:
 *          type: string
 *          description: Breve explicación de la solución que se dió para solucionar el problema
 *        usuario:
 *          type: string
 *          description: Nombre de usuario
 *        eliminado:
 *          type: integer
 *          description: indica 1 si esta inactivo 0 si esta activo
 *        f_create:
 *          type: date
 *          description: fecha automatica de creacion de incidente
 *        f_update:
 *          type: date
 *          description: fecha automatica de actualizacion de incidente
 *        u_create:
 *          type: string
 *          description: usuario de creacion
 *        u_update:
 *          type: string
 *          description: usuario de actualizacion
 *        id_usuario:
 *          type: long
 *          description: id de usuario
 *      required:
 *        - descripcion
 *        - fecha
 *        - solucion
 *        - usuario
 *        - eliminado
 *        - u_create
 *        - id_usuario
 *      example:
 *        descripcion: La hora de la computadora se desconfigura regularmente
 *        fecha: 2022-01-31
 *        solucion: Revisar la fecha de instalación de la pila en la computadora y cambiarla por una nueva
 *        usuario: Nombre Trabajador 1
 *        eliminado: 0
 *        f_create: 2022-01-18 22:43:09
 *        f_update: 2022-01-18 22:43:09
 *        u_create: rbueno
 *        u_update: admin
 *        id_usuario: 1
 */

//Create a new conocimiento
/**
 * @swagger
 * /conocimiento/create:
 *   post:
 *     summary: crear un conocimiento
 *     tags: [Conocimiento]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/conocimiento'
 *     responses:
 *       200:
 *         description: Conocimiento creado satisfactoriamente
 */
router.post('/create/', conocimiento.create);

// Retrieve all Conocimiento
/**
 * @swagger
 * /conocimiento/findAll:
 *   get:
 *     summary: listar los conocimientos
 *     tags: [Conocimiento]
 *     responses:
 *       200:
 *         description: listado de informacion satisfactoria
 *         content:
 *            application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/conocimiento'
 */
router.get('/findAll', conocimiento.findAll);

// Retrieve a single Conocimiento with id
/**
 * @swagger
 * /conocimiento/findOne/{id}:
 *   get:
 *     summary: listar un conocimiento
 *     tags: [Conocimiento]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: id del conocimiento
 *     responses:
 *       200:
 *         description: conocimiento encontrada
 *         content:
 *            application/json:
 *               schema:
 *                 type: object
 *                 $ref: '#/components/schemas/conocimiento'
 *       404:
 *         description: conocimiento not found
 */
router.get('/findOne/:id', conocimiento.findOne);

// Update a Conocimiento with id
/**
 * @swagger
 * /conocimiento/update/{id}:
 *   put:
 *     summary: actualizar una conocimiento en especifico
 *     tags: [Conocimiento]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: id del conocimiento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/conocimiento'
 *     responses:
 *       200:
 *         description: se actualizo el conocimiento satisfactoriamente
 *       404:
 *         description: conocimiento not found
 */
router.put('/update/:id', conocimiento.update);

// Delete a Conocimiento with id
/**
 * @swagger
 * /conocimiento/delete/{id}:
 *   delete:
 *     summary: eliminar un conocimiento
 *     tags: [Conocimiento]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Conocimiento id
 *     responses:
 *       200:
 *         description: eliminado satisfactoriamente
 *       404:
 *         description: conocimiento not found
 */
router.delete('/delete/:id', conocimiento.delete);

module.exports = router;
