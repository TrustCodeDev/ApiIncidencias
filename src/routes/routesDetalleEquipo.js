const router = require('express').Router();
const DetalleEquipo = require("../apiService/detalleEquipo/controller");

/**
 * @swagger
 * 
 * components:
 *  schemas:
 *    DetalleEquipo:
 *      type: object
 *      properties:
 *        id_detalle_equipo:
 *          type: integer
 *          description: id autogenerado del Detalle Equipo
 *        caracteristica:
 *          type: string
 *          description: caracteristicas del Detalle Equipo
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
 *        id_equipo:
 *          type: integer
 *          description: id del equipo
 *      required:
 *        - caracteristica
 *        - eliminado
 *        - u_create
 *        - id_equipo
 *      example:
 *        caracteristica: efefef
 *        eliminado: 0
 *        f_create: 2022-01-18 22:43:09
 *        f_update: 2022-01-18 22:43:09
 *        u_create: rbueno
 *        u_update: admin
 *        id_equipo: 1
 */



/**
 * @swagger
 * /detalleEquipo/create:
 *   post:
 *     summary: crear un Detalle de Equipo
 *     tags: [DetalleEquipo]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/DetalleEquipo'
 *     responses:
 *       200:
 *         description: DetalleEquipo creado satisfactoriamente
 */
 router.post("/create/", DetalleEquipo.create);

 /**
 * @swagger
 * /detalleEquipo/findAll:
 *   get:
 *     summary: listar los Detalle Equipos
 *     tags: [DetalleEquipo]
 *     responses:
 *       200:
 *         description: listado de informacion satisfactoria
 *         content:
 *            application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/DetalleEquipo' 
 */
router.get("/findAll", DetalleEquipo.findAll);

/**
 * @swagger
 * /DetalleEquipo/findOne/{id}:
 *   get:
 *     summary: listar un Detalle Equipo
 *     tags: [DetalleEquipo]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: 
 *           type: string
 *         required: true
 *         description: id del detalle equipo
 *     responses:
 *       200:
 *         description: detalle equipo encontrado
 *         content:
 *            application/json:
 *               schema:
 *                 type: object
 *                 $ref: '#/components/schemas/DetalleEquipo'
 *       404:
 *         description: detalle equipo not found
 */
router.get("/findOne/:id", DetalleEquipo.findOne);

/**
 * @swagger
 * /DetalleEquipo/update/{id}:
 *   put:
 *     summary: actualizar un detalle equipo en especifico
 *     tags: [DetalleEquipo]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: 
 *           type: string
 *         required: true
 *         description: id del detalle equipo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/DetalleEquipo'
 *     responses:
 *       200:
 *         description: se actualizo el equipo satisfactoriamente
 *       404:
 *         description: equipo not found
 */
router.put("/update/:id", DetalleEquipo.update);

/**
 * @swagger
 * /DetalleEquipo/delete/{id}:
 *   delete:
 *     summary: eliminar un detalle equipo
 *     tags: [DetalleEquipo]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: 
 *           type: string
 *         required: true
 *         description: id del detalle equipo
 *     responses:
 *       200:
 *         description: eliminado satisfactoriamente
 *       404:
 *         description: detalle equipo not found
 */
router.delete("/delete/:id", DetalleEquipo.delete);

module.exports = router;

