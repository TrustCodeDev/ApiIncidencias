const { Logger } = require("../../loaders/logger");
const { sql } = require("../../services/mysql");


// Constructor
const Incidencia = function (incidencia) {
    this.id_incidencia = incidencia.id_incidencia,
    this.fecha_inicio = incidencia.fecha_inicio,
    this.fecha_finalizacion = incidencia.fecha_finalizacion,
    this.descripcion = incidencia.descripcion,
    this.nivel_incidencia = incidencia.nivel_incidencia,
    this.eliminado = incidencia.eliminado,
    this.u_create = incidencia.u_create,
    this.u_update = incidencia.u_update,
    this.id_usuario = incidencia.id_usuario,
    this.id_equipo = incidencia.id_equipo,
    this.id_area = incidencia.id_area
};


// Create 
Incidencia.create = (newIncidencia, result) => {

    const query = 
    `INSERT INTO incidencia
    (fecha_registro,fecha_inicio,fecha_finalizacion,descripcion,nivel_incidencia,f_create,f_update,u_create,u_update,id_usuario,id_equipo,id_area) 
    values 
    (NOW() , '${newIncidencia.fecha_inicio}' , '${newIncidencia.fecha_finalizacion}' , '${newIncidencia.descripcion}' , '${newIncidencia.nivel_incidencia}' , NOW(), NOW(), '${newIncidencia.u_create}', '${newIncidencia.u_update}' , '${newIncidencia.id_usuario}' , '${newIncidencia.id_equipo}' , '${newIncidencia.id_area}' );`

    sql.query(query, (err, res) => {
    if (err) {
        Logger.error("error: ", err);
        result(err, null);
        return;
    }

    Logger.info("created incidencia: ", { id: res.insertId, ...newIncidencia });
    result(null, { id: res.insertId, ...newIncidencia });
    });
};


// Find By Name  
Incidencia.findByName = (descripcion, result) => {

    sql.query(`select count(*) as result from incidencia where descripcion = ?`, descripcion, (err, res) => {

    if (err) {
        Logger.error('error: ', err)
        result(err, null)
        return
    }

    Logger.info("Incidencia: ", res[0]);
    result(null, res[0].result);
    return

    })
}


// Find By Id 
Incidencia.findById = (id, result) => {

    sql.query(`SELECT * FROM incidencia WHERE id_incidencia = ${id} and eliminado = 0`, (err, res) => {

    if (err) {
        Logger.error("error: ", err);
        result(err, null);
        return;
    }

    if (res.length) {
        Logger.info("found incidencia: ", res[0]);
        result(null, res[0]);
        return;
    }

    // Not found Incidencia with the id
    result({ kind: "not_found" }, null);
    });
};


// Get All 
Incidencia.getAll = (result) => {

    let query = "SELECT * FROM incidencia WHERE eliminado = 0";

    sql.query(query, (err, res) => {
    if (err) {
        Logger.error("error: ", err);
        result(null, err);
        return;
    }

    result(null, res);
    Logger.info("Incidencia: ", res);
    });
};


// Update By Id 
Incidencia.updateById = (id, incidencia, result) => {

    sql.query("UPDATE incidencia SET fecha_inicio = ? , fecha_finalizacion = ? , descripcion = ? , nivel_incidencia = ? , eliminado = ?, f_update = NOW(), u_update = ? , id_usuario = ? , id_equipo = ? , id_area = ? WHERE id_incidencia = ?",
    [incidencia.fecha_inicio,incidencia.fecha_finalizacion, incidencia.descripcion , incidencia.nivel_incidencia , incidencia.eliminado, incidencia.u_update, incidencia.id_usuario , incidencia.id_equipo , incidencia.id_area ,id],
    (err, res) => {

        console.log(err)

        if (err) {
        Logger.error("error: ", err);
        result(null, err);
        return;
        }

        if (res.affectedRows == 0) {
        // Not found Incidencia with the id
        result({ kind: "not_found" }, null);
        return;
        }

        Logger.info("updated Incidencia: ", { id: id, ...incidencia });
        result(null, { id: id, ...incidencia });
    }
    );
};


// Remove 
Incidencia.remove = (id, result) => {

    sql.query("UPDATE incidencia SET eliminado = 1 WHERE id_incidencia = ?", id, (err, res) => {

    if (err) {
        Logger.error("error: ", err);
        result(null, err);
        return;
    }

    if (res.affectedRows == 0) {
        // not found Incidencia with the id
        result({ kind: "not_found" }, null);
        return;
    }

    Logger.info("deleted Incidencia with id: ", id);
    result(null, res);
    });
};


module.exports = Incidencia;