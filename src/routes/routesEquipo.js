const router = require('express').Router();
const Equipo = require("../apiService/equipo/controller");

/**
 * @swagger
 * 
 * components:
 *  schemas:
 *    equipo:
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



/**
 * @swagger
 * /equipo/create:
 *   post:
 *     summary: crear una equipo
 *     tags: [Equipo]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/equipo'
 *     responses:
 *       200:
 *         description: equipo creado satisfactoriamente
 */
 router.post("/create/", Equipo.create);

 /**
 * @swagger
 * /equipo/findAll:
 *   get:
 *     summary: listar los equipos
 *     tags: [Equipo]
 *     responses:
 *       200:
 *         description: listado de informacion satisfactoria
 *         content:
 *            application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/equipo' 
 */
router.get("/findAll", Equipo.findAll);

/**
 * @swagger
 * /equipo/findOne/{id}:
 *   get:
 *     summary: listar un equipo
 *     tags: [Equipo]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: 
 *           type: string
 *         required: true
 *         description: id del equipo
 *     responses:
 *       200:
 *         description: equipo encontrado
 *         content:
 *            application/json:
 *               schema:
 *                 type: object
 *                 $ref: '#/components/schemas/equipo'
 *       404:
 *         description: equipo not found
 */
router.get("/findOne/:id", Equipo.findOne);

/**
 * @swagger
 * /equipo/update/{id}:
 *   put:
 *     summary: actualizar un equipo en especifico
 *     tags: [Equipo]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: 
 *           type: string
 *         required: true
 *         description: id del equipo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/equipo'
 *     responses:
 *       200:
 *         description: se actualizo el equipo satisfactoriamente
 *       404:
 *         description: equipo not found
 */
router.put("/update/:id", Equipo.update);

/**
 * @swagger
 * /equipo/delete/{id}:
 *   delete:
 *     summary: eliminar un equipo
 *     tags: [Equipo]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: 
 *           type: string
 *         required: true
 *         description: id del equipo
 *     responses:
 *       200:
 *         description: eliminado satisfactoriamente
 *       404:
 *         description: equipo not found
 */
router.delete("/delete/:id", Equipo.delete);

module.exports = router;

