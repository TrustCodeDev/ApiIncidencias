const router = require('express').Router();
const incidencia = require("../apiService/incidencia/controller");


/**
 * @swagger
 * 
 * components:
 *  schemas:
 *    incidencia:
 *      type: object
 *      properties:
 *        id_incidencia:
 *          type: integer
 *          description: id autogenerado de la incidencia
 *        fecha_registro:
 *          type: date
 *          description: fecha automatica de creacion de incidente
 *        fecha_inicio:
 *          type: date
 *          description: fecha manual de inicio del incidente   
 *        fecha_finalizacion:
 *          type: date
 *          description: fecha manual de finalizacion de incidente
 *        descripcion:
 *          type: string
 *          description: descripcion de incidente
 *        nivel_incidencia:
 *          type: string
 *          description: nivel de incidencia 
 *        eliminado:
 *          type: integer
 *          description: indica 1 si esta inactivo 0 si esta activo
 *        f_create:
 *          type: date
 *          description: fecha automatica de creacion de incidente
 *        f_update:
 *          type: date
 *          description: fecha automatica de actulizacion de incidente
 *        u_create:
 *          type: string
 *          description: usuario de creacion
 *        u_update:
 *          type: string
 *          description: usuario de actualizacion
 *        id_usuario:
 *          type: integer
 *          description: id relacional del id_usuario
 *        id_equipo: 
 *          type: integer
 *          description: id relacional del id_equipo
 *        id_area:
 *          type: integer
 *          description: id relacional del id_area
 *      required:
 *        - descripcion
 *        - nivel_incidencia
 *        - u_create
 *        - id_usuario
 *        - id_equipo
 *        - id_area
 *      example:
 *        fecha_inicio: 2022-01-27 17:00:00 
 *        fecha_finalizacion: 2022-01-28 18:00:00 
 *        descripcion: Incidencia N1 - Problemas con el inicio de sesión 
 *        nivel_incidencia: Medio
 *        eliminado: 0
 *        f_create: 2022-01-18 22:43:09
 *        f_update: 2022-01-18 22:43:09
 *        u_create: pbecerra
 *        u_update: pbecerra
 *        id_usuario: 1
 *        id_equipo: 1 
 *        id_area: 1 
 */


/**
 * @swagger
 * /incidencia/create:
 *   post:
 *     summary: crear una incidencia
 *     tags: [Incidencia]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/incidencia'
 *     responses:
 *       200:
 *         description: incidencia creada satisfactoriamente
 */
router.post("/create/", incidencia.create);


/**
 * @swagger
 * /incidencia/findOne/{id}:
 *   get:
 *     summary: listar una incidencia
 *     tags: [Incidencia]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: 
 *           type: string
 *         required: true
 *         description: id de la incidencia
 *     responses:
 *       200:
 *         description: incidencia encontrada
 *         content:
 *            application/json:
 *               schema:
 *                 type: object
 *                 $ref: '#/components/schemas/incidencia'
 *       404:
 *         description: incidencia not found
 */
router.get("/findOne/:id", incidencia.findOne);


/**
 * @swagger
 * /incidencia/findAll:
 *   get:
 *     summary: listar las incidencias
 *     tags: [Incidencia]
 *     responses:
 *       200:
 *         description: listado de informacion satisfactoria
 *         content:
 *            application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/incidencia' 
 */
router.get("/findAll", incidencia.findAll);


/**
 * @swagger
 * /incidencia/update/{id}:
 *   put:
 *     summary: actualizar una incidencia en especifico
 *     tags: [Incidencia]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: 
 *           type: string
 *         required: true
 *         description: id de la incidencia
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/incidencia'
 *     responses:
 *       200:
 *         description: se actualizo la incidencia satisfactoriamente
 *       404:
 *         description: incidencia not found
 */
router.put("/update/:id", incidencia.update);


/**
 * @swagger
 * /incidencia/delete/{id}:
 *   delete:
 *     summary: eliminar una incidencia
 *     tags: [Incidencia]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: 
 *           type: string
 *         required: true
 *         description: incidencia id
 *     responses:
 *       200:
 *         description: eliminado satisfactoriamente
 *       404:
 *         description: incidencia not found
 */
router.delete("/delete/:id", incidencia.delete); 

module.exports = router 