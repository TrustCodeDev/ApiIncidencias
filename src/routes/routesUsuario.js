const router = require('express').Router();
const usuario = require("../apiService/usuario/controller");


/**
 * @swagger
 * 
 * components:
 *  schemas:
 *    usuario:
 *      type: object
 *      properties:
 *        id_usuario:
 *          type: integer
 *          description: id autogenerado del usuario
 *        nombre:
 *          type: string
 *          description: nombre del usuario
 *        apellido:
 *          type: string
 *          description: apellido del usuario
 *        sexo:
 *          type: string
 *          description: sexo del usuario
 *        telefono: 
 *          type: integer
 *          description: telefono del usuario
 *        estado:
 *          type: string
 *          description: estado del usuario 
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
 *        tipo_usuario_id_tipo_usuario: 
 *          type: integer
 *          description: id relacional del usuario_tipo_usuario
 *        nickname:
 *          type: string
 *          description: nickname del usuario   
 *      required:
 *        - nombre
 *        - apellido 
 *        - sexo 
 *        - telefono
 *        - estado
 *        - eliminado
 *        - u_create
 *        - tipo_usuario_id_tipo_usuario
 *        - nickname
 *      example:
 *        nombre: Ricardo
 *        apellido: Balbis
 *        sexo: Hombre
 *        telefono: 625232
 *        estado: Activo
 *        eliminado: 0
 *        f_create: 2022-01-18 22:43:09
 *        f_update: 2022-01-18 22:43:09
 *        u_create: rbalbis
 *        u_update: rbalbis
 *        tipo_usuario_id_tipo_usuario: 1
 *        nickname: rbalbis 
 */


/**
 * @swagger
 * /usuario/create:
 *   post:
 *     summary: crear un usuario
 *     tags: [Usuario]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/usuario'
 *     responses:
 *       200:
 *         description: usuario creado satisfactoriamente
 */
router.post("/create/", usuario.create);


/**
 * @swagger
 * /usuario/findAll:
 *   get:
 *     summary: listar los usuarios
 *     tags: [Usuario]
 *     responses:
 *       200:
 *         description: listado de informacion satisfactoria
 *         content:
 *            application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/usuario' 
 */
router.get("/findAll", usuario.findAll);


/**
 * @swagger
 * /usuario/findOne/{id}:
 *   get:
 *     summary: listar un usuario
 *     tags: [Usuario]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: 
 *           type: string
 *         required: true
 *         description: id del usuario
 *     responses:
 *       200:
 *         description: usuario encontrado
 *         content:
 *            application/json:
 *               schema:
 *                 type: object
 *                 $ref: '#/components/schemas/usuario'
 *       404:
 *         description: usuario not found
 */
router.get("/findOne/:id", usuario.findOne);


/**
 * @swagger
 * /usuario/update/{id}:
 *   put:
 *     summary: actualizar un usuario en especifico
 *     tags: [Usuario]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: 
 *           type: string
 *         required: true
 *         description: id del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/usuario'
 *     responses:
 *       200:
 *         description: se actualizo el usuario satisfactoriamente
 *       404:
 *         description: usuario not found
 */
router.put("/update/:id", usuario.update);


/**
 * @swagger
 * /usuario/delete/{id}:
 *   delete:
 *     summary: eliminar un usuario
 *     tags: [Usuario]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: 
 *           type: string
 *         required: true
 *         description: usuario id
 *     responses:
 *       200:
 *         description: eliminado satisfactoriamente
 *       404:
 *         description: usuario not found
 */
router.delete("/delete/:id", usuario.delete); 


module.exports = router 