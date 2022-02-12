const router = require('express').Router();
const marca = require("../apiService/marca/controller");
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

/**
 * @swagger
 * 
 * components:
 *  schemas:
 *    marca:
 *      type: object
 *      properties:
 *        id_marca:
 *          type: integer
 *          description: id autogenerado de la marca
 *        nombre:
 *          type: string
 *          description: nombre de la marca 
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
 *      required:
 *        - nombre
 *        - eliminado
 *        - u_create
 *      example:
 *        nombre: HP
 *        eliminado: 0
 *        f_create: 2022-01-18 22:43:09
 *        f_update: 2022-01-18 22:43:09
 *        u_create: rbueno
 *        u_update: admin
 */





/**
 * @swagger
 * /marca/create:
 *   post:
 *     summary: crear una marca
 *     tags: [Marca]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/marca'
 *     responses:
 *       200:
 *         description: marca creado satisfactoriamente
 */
router.post("/create/", marca.create);

/**
 * @swagger
 * /marca/findAll:
 *   get:
 *     summary: listar las marcas
 *     tags: [Marca]
 *     responses:
 *       200:
 *         description: listado de informacion satisfactoria
 *         content:
 *            application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/marca' 
 */
router.get("/findAll", marca.findAll);

/**
 * @swagger
 * /marca/findOne/{id}:
 *   get:
 *     summary: listar una marca
 *     tags: [Marca]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: 
 *           type: string
 *         required: true
 *         description: id de la marca
 *     responses:
 *       200:
 *         description: marca encontrada
 *         content:
 *            application/json:
 *               schema:
 *                 type: object
 *                 $ref: '#/components/schemas/marca'
 *       404:
 *         description: marca not found
 */
router.get("/findOne/:id", marca.findOne);

/**
 * @swagger
 * /marca/update/{id}:
 *   put:
 *     summary: actualizar una marca en especifico
 *     tags: [Marca]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: 
 *           type: string
 *         required: true
 *         description: id de la marca
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/marca'
 *     responses:
 *       200:
 *         description: se actualizo la marca satisfactoriamente
 *       404:
 *         description: marca not found
 */
router.put("/update/:id", marca.update);

/**
 * @swagger
 * /marca/delete/{id}:
 *   delete:
 *     summary: eliminar una marca
 *     tags: [Marca]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: 
 *           type: string
 *         required: true
 *         description: product id
 *     responses:
 *       200:
 *         description: eliminado satisfactoriamente
 *       404:
 *         description: marca not found
 */
router.delete("/delete/:id", marca.delete);

module.exports = router 
