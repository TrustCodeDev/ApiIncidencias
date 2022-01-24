const { Logger } = require("../../loaders/logger");
const { sql } = require("../../services/mysql");


// Constructor
const Tipo_Usuario = function (tipo_usuario) {
    this.id_tipo_usuario = tipo_usuario.id_tipo_usuario,
    this.descripcion = tipo_usuario.descripcion,
    this.estado = tipo_usuario.estado
    this.eliminado = tipo_usuario.eliminado,
    this.u_create = tipo_usuario.u_create,
    this.u_update = tipo_usuario.u_update
};


// Create 
Tipo_Usuario.create = (newTipoUsuario, result) => {

    const query = 
    `INSERT INTO tipo_usuario
    (descripcion,estado,eliminado,f_create,f_update,u_create,u_update) 
    values 
    ('${newTipoUsuario.descripcion}', '${newTipoUsuario.estado}' , '${newTipoUsuario.eliminado}' ,NOW(), NOW(), '${newTipoUsuario.u_create}', '${newTipoUsuario.u_update}');`

    sql.query(query, (err, res) => {
    if (err) {
        Logger.error("error: ", err);
        result(err, null);
        return;
    }

    Logger.info("created tipo_usuario: ", { id: res.insertId, ...newTipoUsuario });
    result(null, { id: res.insertId, ...newTipoUsuario });
    });
};


// Find By Name_Descripcion 
Tipo_Usuario.findByName = (descripcion, result) => {

    sql.query(`select count(*) as result from tipo_usuario where descripcion = ?`, descripcion, (err, res) => {

    if (err) {
        Logger.error('error: ', err)
        result(err, null)
        return
    }

    Logger.info("Tipo_Usuario: ", res[0]);
    result(null, res[0].result);
    return

    })
}


// Find By Id 
Tipo_Usuario.findById = (id, result) => {

    sql.query(`SELECT * FROM tipo_usuario WHERE id_tipo_usuario = ${id} and eliminado = 0`, (err, res) => {

    if (err) {
        Logger.error("error: ", err);
        result(err, null);
        return;
    }

    if (res.length) {
        Logger.info("found tipo_usuario: ", res[0]);
        result(null, res[0]);
        return;
    }

    // Not found Tipo_usuario with the id
    result({ kind: "not_found" }, null);
    });
};


// Get All 
Tipo_Usuario.getAll = (result) => {

    let query = "SELECT * FROM tipo_usuario WHERE eliminado = 0";

    sql.query(query, (err, res) => {
    if (err) {
        Logger.error("error: ", err);
        result(null, err);
        return;
    }

    result(null, res);
    Logger.info("Tipos_Usuarios: ", res);
    });
};


// Update By Id 
Tipo_Usuario.updateById = (id, tipo_usuario, result) => {

    sql.query("UPDATE tipo_usuario SET descripcion = ?, estado = ?, eliminado = ?, f_update = NOW(), u_update = ? WHERE id_tipo_usuario = ?",
    [tipo_usuario.descripcion, tipo_usuario.estado, tipo_usuario.eliminado, tipo_usuario.u_update, id],
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

        Logger.info("updated tipo_usuario: ", { id: id, ...tipo_usuario });
        result(null, { id: id, ...tipo_usuario });
    }
    );
};


// Remove 
Tipo_Usuario.remove = (id, result) => {

    sql.query("UPDATE tipo_usuario SET eliminado = 1 WHERE id_tipo_usuario = ?", id, (err, res) => {

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

    Logger.info("deleted Tipo_usuario with id: ", id);
    result(null, res);
    });
};


module.exports = Tipo_Usuario;