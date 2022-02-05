const { Logger } = require("../../loaders/logger");
const { sql } = require("../../services/mysql");
const Utils = require("../../util");


const Marca = function (marca) {
    this.id_marca = marca.id_marca,
    this.nombre = marca.nombre,
    this.eliminado = marca.eliminado,
    //this.f_create = Utils.getCurrentDateTime,
    //this.f_update = Utils.getCurrentDateTime,
    this.u_create = marca.u_create,
    this.u_update = marca.u_update
};

Marca.create = (newMarca, result) => {

  const query = `INSERT INTO marca(nombre,u_create) 
                             values ('${newMarca.nombre}', '${newMarca.u_create}');`

  sql.query(query, (err, res) => {
    if (err) {
      Logger.error("error: ", err);
      result(err, null);
      return;
    }

    Logger.info("created marca: ", { id: res.insertId, ...newMarca });
    result(null, { id: res.insertId, ...newMarca });
  });
};

Marca.findByName = (name, result) => {
  sql.query(`select count(*) as result from marca where nombre = ?`, name, (err, res) => {
    if (err) {
      Logger.error('error: ', err)
      result(err, null)
      return
    }

    Logger.info("marca: ", res[0]);
    result(null, res[0].result);
    return

    //result({ kind: "not_found" }, null);
  })
}

Marca.findById = (id, result) => {
  sql.query(`SELECT * FROM marca WHERE id_marca = ${id} and eliminado = 0`, (err, res) => {
    if (err) {
      Logger.error("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      Logger.info("found marca: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Marca with the id
    result({ kind: "not_found" }, null);
  });
};

Marca.getAll = (result) => {
  let query = "SELECT * FROM marca WHERE eliminado = 0";

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
    Logger.info("marcas: ", res);
  });
};

Marca.updateById = (id, marca, result) => {
  sql.query("UPDATE marca SET nombre = ?, eliminado = ?, f_update = NOW(), u_update = ? WHERE id_marca = ?",
    [marca.nombre, marca.eliminado, marca.u_update, id],
    (err, res) => {
      console.log(err)
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

      Logger.info("updated marca: ", { id: id, ...marca });
      result(null, { id: id, ...marca });
    }
  );
};

Marca.remove = (id, result) => {
  sql.query("UPDATE marca SET eliminado = 1 WHERE id_marca = ?", id, (err, res) => {
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

    Logger.info("deleted marca with id: ", id);
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

module.exports = Marca;
