const { Logger } = require("../../loaders/logger");
const { sql } = require("../../services/mysql");


const Modelo = function (modelo) {
    this.id_modelo = modelo.id_modelo,
    this.nombre = modelo.nombre,
    this.eliminado = modelo.eliminado,
    //this.f_create = Utils.getCurrentDateTime,
    //this.f_update = Utils.getCurrentDateTime,
    this.u_create = modelo.u_create,
    this.u_update = modelo.u_update,
    this.id_marca = modelo.id_marca
};

Modelo.create = (newModelo, result) => {
 
  const query = `INSERT INTO modelo(nombre,eliminado,f_create,f_update,u_create,u_update,marca_id_marca) 
                             values ('${newModelo.nombre}', '${newModelo.eliminado}', NOW(), NOW(), '${newModelo.u_create}', '${newModelo.u_update}',${newModelo.id_marca});`

  sql.query(query, (err, res) => {
    if (err) {
      Logger.error("error: ", err);
      result(err, null);
      return;
    }

    Logger.info("created modelo: ", { id: res.insertId, ...newModelo });
    result(null, { id: res.insertId, ...newModelo });
  });
};

Modelo.findByName = (name, result) => {
  sql.query(`select count(*) as result from modelo where nombre = ?`, name, (err, res) => {
    if (err) {
      Logger.error('error: ', err)
      result(err, null)
      return
    }

    Logger.info("modelo: ", res[0]);
    result(null, res[0].result);
    return

    //result({ kind: "not_found" }, null);
  })
}

Modelo.findById = (id, result) => {
  sql.query(`SELECT * FROM modelo WHERE id_modelo = ${id} and eliminado = 0`, (err, res) => {
    if (err) {
      Logger.error("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      Logger.info("found modelo: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Marca with the id
    result({ kind: "not_found" }, null);
  });
};

Modelo.getAll = (result) => {
  let query = "SELECT * FROM modelo WHERE eliminado = 0";

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
    Logger.info("modelo: ", res);
  });
};

Modelo.updateById = (id, modelo, result) => {
  sql.query("UPDATE modelo SET nombre = ?, eliminado = ?, f_update = NOW(), u_update = ?, marca_id_marca = ? WHERE id_modelo = ?",
    [modelo.nombre, modelo.eliminado, modelo.u_update, modelo.id_marca, id],
    (err, res) => {

      if (err) {
        Logger.error("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Marca with the id
        result({ kind: "not_found" }, null);
        return;
      }

      Logger.info("updated modelo: ", { id: id, ...modelo });
      result(null, { id: id, ...modelo });
    }
  );
};

Modelo.remove = (id, result) => {
  sql.query("UPDATE modelo SET eliminado = 1 WHERE id_modelo = ?", id, (err, res) => {
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

    Logger.info("deleted modelo with id: ", id);
    result(null, res);
  });
};

/*Marca.removeAll = result => {
  sql.query("UPDATE marca SET eliminado = 1, f_update = ?, u_update", (err, res) => {
    if (err) {
      Logger.error("error: ", err);
      result(null, err);
      return;
    }
 
    Logger.info(`deleted ${res.affectedRows} marca`);
    result(null, res);
  });
};*/

module.exports = Modelo;
