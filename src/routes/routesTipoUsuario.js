const router = require('express').Router();
const tipo_usuario = require("../apiService/tipo_usuario/controller");


/**
 * @swagger
 * 
 * components:
 *  schemas:
 *    tipo_usuario:
 *      type: object
 *      properties:
 *        id_tipo_usuario:
 *          type: integer
 *          description: id autogenerado del tipo_usuario
 *        descripcion:
 *          type: string
 *          description: descripcion del tipo_usuario
 *        estado:
 *          type: string
 *          description: estado del tipo_usuario 
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
 *        - descripcion
 *        - estado
 *        - eliminado
 *        - u_create
 *      example:
 *        descripcion: Administrador
 *        estado: Activo
 *        eliminado: 0
 *        f_create: 2022-01-18 22:43:09
 *        f_update: 2022-01-18 22:43:09
 *        u_create: rbalbis
 *        u_update: rbalbis
 */


/**
 * @swagger
 * /tipo_usuario/create:
 *   post:
 *     summary: crear un tipo_usuario
 *     tags: [Tipo Usuario]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/tipo_usuario'
 *     responses:
 *       200:
 *         description: tipo_usuario creado satisfactoriamente
 */
router.post("/create/", tipo_usuario.create);


/**
 * @swagger
 * /tipo_usuario/findAll:
 *   get:
 *     summary: listar los tipo_usuario
 *     tags: [Tipo Usuario]
 *     responses:
 *       200:
 *         description: listado de informacion satisfactoria
 *         content:
 *            application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/tipo_usuario' 
 */
router.get("/findAll", tipo_usuario.findAll);


/**
 * @swagger
 * /tipo_usuario/findOne/{id}:
 *   get:
 *     summary: listar un tipo_usuario
 *     tags: [Tipo Usuario]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: 
 *           type: string
 *         required: true
 *         description: id del tipo_usuario
 *     responses:
 *       200:
 *         description: tipo_usuario encontrado
 *         content:
 *            application/json:
 *               schema:
 *                 type: object
 *                 $ref: '#/components/schemas/tipo_usuario'
 *       404:
 *         description: tipo_usuario not found
 */
router.get("/findOne/:id", tipo_usuario.findOne);


/**
 * @swagger
 * /tipo_usuario/update/{id}:
 *   put:
 *     summary: actualizar un tipo_usuario en especifico
 *     tags: [Tipo Usuario]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: 
 *           type: string
 *         required: true
 *         description: id del tipo_usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/tipo_usuario'
 *     responses:
 *       200:
 *         description: se actualizo el tipo_usuario satisfactoriamente
 *       404:
 *         description: tipo_usuario not found
 */
router.put("/update/:id", tipo_usuario.update);


/**
 * @swagger
 * /tipo_usuario/delete/{id}:
 *   delete:
 *     summary: eliminar un tipo_usuario
 *     tags: [Tipo Usuario]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: 
 *           type: string
 *         required: true
 *         description: tipo_usuario id
 *     responses:
 *       200:
 *         description: eliminado satisfactoriamente
 *       404:
 *         description: tipo_usuario not found
 */
router.delete("/delete/:id", tipo_usuario.delete); 


module.exports = router