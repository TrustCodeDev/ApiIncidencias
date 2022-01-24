
const router = require('express').Router();
const modelo = require("../apiService/modelo/controller");

/**
 * @swagger
 * 
 * components:
 *  schemas:
 *    modelo:
 *      type: object
 *      properties:
 *        id_modelo:
 *          type: integer
 *          description: id autogenerado del modelo
 *        nombre:
 *          type: string
 *          description: nombre de la modelo
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
 *        marca_id_marca:
 *          type: string
 *          description: id de marca
 *      required:
 *        - nombre
 *        - eliminado
 *        - u_create
 *        - marca_id_marca
 *      example:
 *        nombre: HP
 *        eliminado: 1
 *        f_create: 2022-01-18 22:43:09
 *        f_update: 2022-01-18 22:43:09
 *        u_create: rbueno
 *        u_update: admin
 *        marca_id_marca: 1
 */


/**
 * @swagger
 * /modelo/create:
 *   post:
 *     summary: crear un modelo
 *     tags: [Modelo]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/modelo'
 *     responses:
 *       200:
 *         description: modelo creado satisfactoriamente
 */
router.post("/create/", modelo.create);


/**
 * @swagger
 * /modelo/findAll:
 *   get:
 *     summary: listar las modelos
 *     tags: [Modelo]
 *     responses:
 *       200:
 *         description: listado de informacion satisfactoria
 *         content:
 *            application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/modelo' 
 */
router.get("/findAll/", modelo.findAll);


/**
 * @swagger
 * /modelo/findOne/{id}:
 *   get:
 *     summary: listar un modelo
 *     tags: [Modelo]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: 
 *           type: string
 *         required: true
 *         description: id del modelo
 *     responses:
 *       200:
 *         description: modelo encontrada
 *         content:
 *            application/json:
 *               schema:
 *                 type: object
 *                 $ref: '#/components/schemas/modelo'
 *       404:
 *         description: modelo not found
 */
router.get("/findOne/:id", modelo.findOne);


/**
 * @swagger
 * /modelo/update/{id}:
 *   put:
 *     summary: actualizar un modelo en especifico
 *     tags: [Modelo]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: 
 *           type: string
 *         required: true
 *         description: id del modelo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/modelo'
 *     responses:
 *       200:
 *         description: se actualizo el modelo satisfactoriamente
 *       404:
 *         description: modelo not found
 */
router.put("/update/:id", modelo.update);


/**
 * @swagger
 * /modelo/delete/{id}:
 *   delete:
 *     summary: eliminar un modelo
 *     tags: [Modelo]
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
 *         description: modelo not found
 */
router.delete("/delete/:id", modelo.delete);

module.exports = router 