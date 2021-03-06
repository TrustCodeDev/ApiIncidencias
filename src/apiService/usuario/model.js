const { Logger } = require("../../loaders/logger");
const { sql } = require("../../services/mysql");


// Constructor
const Usuario = function (usuario) {
    this.id_usuario = usuario.usuario,
    this.nombre = usuario.nombre,
    this.apellido = usuario.apellido,
    this.sexo = usuario.sexo,
    this.telefono = usuario.telefono,
    this.eliminado = usuario.eliminado,
    this.u_create = usuario.u_create,
    this.u_update = usuario.u_update,
    this.nickname = usuario.nickname,
    this.contrasena = usuario.contrasena,
    this.id_tipo_usuario = usuario.id_tipo_usuario 
    
};


// Create 
Usuario.create = (newUsuario, result) => {

    const query = 
    `INSERT INTO usuario
    (nombre,apellido,sexo,telefono,f_create,f_update,u_create,u_update,nickname,contrasena,id_tipo_usuario) 
    values 
    ('${newUsuario.nombre}' , '${newUsuario.apellido}' , '${newUsuario.sexo}' , '${newUsuario.telefono}' ,NOW(), NOW(), '${newUsuario.u_create}', '${newUsuario.u_update}' , '${newUsuario.nickname}' , '${newUsuario.contrasena}' , '${newUsuario.id_tipo_usuario}');`

    sql.query(query, (err, res) => {
    if (err) {
        Logger.error("error: ", err);
        result(err, null);
        return;
    }

    Logger.info("created usuario: ", { id: res.insertId, ...newUsuario });
    result(null, { id: res.insertId, ...newUsuario });
    });
};


// Find By Name  
Usuario.findByName = (nickname, result) => {

    sql.query(`select count(*) as result from usuario where nickname = ?`, nickname, (err, res) => {

    if (err) {
        Logger.error('error: ', err)
        result(err, null)
        return
    }

    Logger.info("Usuario: ", res[0]);
    result(null, res[0].result);
    return

    })
}


// Find By Id 
Usuario.findById = (id, result) => {

    sql.query(`SELECT * FROM usuario WHERE id_usuario = ${id} and eliminado = 0`, (err, res) => {

    if (err) {
        Logger.error("error: ", err);
        result(err, null);
        return;
    }

    if (res.length) {
        Logger.info("found usuario: ", res[0]);
        result(null, res[0]);
        return;
    }

    // Not found Tipo_usuario with the id
    result({ kind: "not_found" }, null);
    });
};


// Get All 
Usuario.getAll = (result) => {

    let query = "SELECT * FROM usuario WHERE eliminado = 0";

    sql.query(query, (err, res) => {
    if (err) {
        Logger.error("error: ", err);
        result(null, err);
        return;
    }

    result(null, res);
    Logger.info("Usuario: ", res);
    });
};


// Update By Id 
Usuario.updateById = (id, usuario, result) => {

    sql.query("UPDATE usuario SET nombre = ?, apellido = ? , sexo = ? , telefono = ?  , eliminado = ?, f_update = NOW(), u_update = ? , nickname = ?  , contrasena = ? , id_tipo_usuario = ? WHERE id_usuario = ?",
    [usuario.nombre, usuario.apellido , usuario.sexo , usuario.telefono , usuario.eliminado, usuario.u_update, usuario.nickname , usuario.contrasena , usuario.id_tipo_usuario , id],
    (err, res) => {

        console.log(err)

        if (err) {
        Logger.error("error: ", err);
        result(null, err);
        return;
        }

        if (res.affectedRows == 0) {
        // Not found Tipo_usuario with the id
        result({ kind: "not_found" }, null);
        return;
        }

        Logger.info("updated Usuario: ", { id: id, ...usuario });
        result(null, { id: id, ...usuario });
    }
    );
};


// Remove 
Usuario.remove = (id, result) => {

    sql.query("UPDATE usuario SET eliminado = 1 WHERE id_usuario = ?", id, (err, res) => {

    if (err) {
        Logger.error("error: ", err);
        result(null, err);
        return;
    }

    if (res.affectedRows == 0) {
        // not found Tipo_Usuario with the id
        result({ kind: "not_found" }, null);
        return;
    }

    Logger.info("deleted Usuario with id: ", id);
    result(null, res);
    });
};


module.exports = Usuario;