const { Logger } = require("../../loaders/logger");
const { sql } = require("../../services/mysql");

const Equipo = function (equipo) {
    this.id_equipo = equipo.id_equipo,
    this.descripcion = equipo.descripcion,
    this.eliminado = equipo.eliminado,
    //this.f_create = Utils.getCurrentDateTime,
    //this.f_update = Utils.getCurrentDateTime,
    this.u_create = equipo.u_create,
    this.u_update = equipo.u_update,
    this.id_modelo = equipo.id_modelo
};

Equipo.create = (newEquipo, result) => {

  const query = `INSERT INTO equipo(descripcion,u_create,id_modelo) 
                values ('${newEquipo.descripcion}', '${newEquipo.u_create}',${newEquipo.id_modelo});`

  sql.query(query, (err, res) => {
    if (err) {
      Logger.error("error: ", err);
      result(err, null);
      return;
    }

    Logger.info("created equipo: ", { id: res.insertId, ...newEquipo });
    result(null, { id: res.insertId, ...newEquipo });
  });
};

Equipo.findByName = (name, result) => {
  sql.query(`select count(*) as result from equipo where descripcion = ?`, name, (err, res) => {
    if (err) {
      Logger.error('error: ', err)
      result(err, null)
      return
    }

    Logger.info("equipo: ", res[0]);
    result(null, res[0].result);
    return

    //result({ kind: "not_found" }, null);
  })
}

Equipo.findById = (id, result) => {
  sql.query(`SELECT * FROM equipo WHERE id_equipo = ${id} and eliminado = 0`, (err, res) => {
    if (err) {
      Logger.error("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      Logger.info("found equipo: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Marca with the id
    result({ kind: "not_found" }, null);
  });
};

Equipo.getAll = (result) => {
  let query = "SELECT * FROM equipo WHERE eliminado = 0";

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
    Logger.info("equipos: ", res);
  });
};

Equipo.updateById = (id, equipo, result) => {
  sql.query("UPDATE equipo SET descripcion = ?, eliminado = ?, f_update = NOW(), u_update = ?, id_modelo = ? WHERE id_equipo = ?",
    [equipo.descripcion, equipo.eliminado, equipo.u_update, equipo.id_modelo, id],
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

      Logger.info("updated equipo: ", { id: id, ...equipo });
      result(null, { id: id, ...equipo });
    }
  );
};

Equipo.remove = (id, result) => {
  sql.query("UPDATE equipo SET eliminado = 1 WHERE id_equipo = ?", id, (err, res) => {
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

    Logger.info("deleted equipo with id: ", id);
    result(null, res);
  });
};

module.exports = Equipo;
