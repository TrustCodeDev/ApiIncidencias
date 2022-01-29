const { Logger } = require("../../loaders/logger");
const { sql } = require("../../services/mysql");

const DetalleEquipo = function (detalleequipo) {
    this.id_detalle_equipo = detalleequipo.id_detalle_equipo,
    this.caracteristica = detalleequipo.caracteristica,
    this.eliminado = detalleequipo.eliminado,
    //this.f_create = Utils.getCurrentDateTime,
    //this.f_update = Utils.getCurrentDateTime,
    this.u_create = detalleequipo.u_create,
    this.u_update = detalleequipo.u_update,
    this.id_equipo = detalleequipo.id_equipo
};

DetalleEquipo.create = (newDetalleEquipo, result) => {

  const query = `INSERT INTO detalle_equipo(caracteristica,eliminado,f_create,u_create,id_equipo) 
                values ('${newDetalleEquipo.caracteristica}', '${newDetalleEquipo.eliminado}', NOW(), '${newDetalleEquipo.u_create}',${newDetalleEquipo.id_equipo});`

  sql.query(query, (err, res) => {
    if (err) {
      Logger.error("error: ", err);
      result(err, null);
      return;
    }

    Logger.info("created detalleEquipo: ", { id: res.insertId, ...newDetalleEquipo });
    result(null, { id: res.insertId, ...newDetalleEquipo });
  });
};

DetalleEquipo.findByName = (name, result) => {
  sql.query(`select count(*) as result from detalle_equipo where caracteristica = ?`, name, (err, res) => {
    if (err) {
      Logger.error('error: ', err)
      result(err, null)
      return
    }

    Logger.info("detalleEquipo: ", res[0]);
    result(null, res[0].result);
    return

    //result({ kind: "not_found" }, null);
  })
}

DetalleEquipo.findById = (id, result) => {
  sql.query(`SELECT * FROM detalle_equipo WHERE id_detalle_equipo = ${id} and eliminado = 0`, (err, res) => {
    if (err) {
      Logger.error("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      Logger.info("found detalleEquipo: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Marca with the id
    result({ kind: "not_found" }, null);
  });
};

DetalleEquipo.getAll = (result) => {
  let query = "SELECT * FROM detalle_equipo WHERE eliminado = 0";

  /*if (nombre) {
    query += ` WHERE nombre LIKE '%${nombre}%'`;
  }*/

  sql.query(query, (err, res) => {
    if (err) {
      Logger.error("error: ", err);
      result(null, err);
      return;
    }

    result(null, res);
    Logger.info("detalleEquipos: ", res);
  });
};

DetalleEquipo.updateById = (id, detalleEquipo, result) => {
  sql.query("UPDATE detalle_equipo SET caracteristica = ?, eliminado = ?, f_update = NOW(), u_update = ?, id_equipo = ? WHERE id_detalle_equipo = ?",
    [detalleEquipo.caracteristica, detalleEquipo.eliminado, detalleEquipo.u_update, detalleEquipo.id_equipo, id],
    (err, res) => {
      if (err) {
        Logger.error("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found equipo with the id
        result({ kind: "not_found" }, null);
        return;
      }

      Logger.info("updated detalleEquipo: ", { id: id, ...detalleEquipo });
      result(null, { id: id, ...detalleEquipo });
    }
  );
};

DetalleEquipo.remove = (id, result) => {
  sql.query("UPDATE detalle_equipo SET eliminado = 1 WHERE id_detalle_equipo = ?", id, (err, res) => {
    if (err) {
      Logger.error("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
      return;
    }

    Logger.info("deleted detalleEquipo with id: ", id);
    result(null, res);
  });
};

module.exports = DetalleEquipo;
