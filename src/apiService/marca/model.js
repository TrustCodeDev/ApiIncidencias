const { Logger } = require("../../loaders/logger");
const { sql } = require("../../services/mysql");


/*let getAll = () => {
    return new Promise ((resolve, reject) => {

        let sql = 'select * from marca';

        dbconnection.query(sql , (err, results) => {
            if(err){
                return reject(err);
            }else{
                return resolve(results);
            }
        })
    });
}*/


// constructor
const Marca = function(marca) {
    this.id_marca = marca.id_marca,
    this.nombre = marca.nombre,
    this.eliminado = marca.eliminado,
    this.f_create = marca.f_create,
    this.f_update = marca.f_update,
    this.u_create = marca.u_create,
    this.u_update = marca.u_update
  };
  
  Marca.create = (newMarca, result) => {
    sql.query("INSERT INTO marca SET ?", newMarca, (err, res) => {
      if (err) {
        Logger.error("error: ", err);
        result(err, null);
        return;
      }
  
      Logger.info("created marca: ", { id: res.insertId, ...newMarca });
      result(null, { id: res.insertId, ...newMarca });
    });
  };
  
  Marca.findById = (id, result) => {
    sql.query(`SELECT * FROM marca WHERE id_marca = ${id}`, (err, res) => {
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
  
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
    });
  };
  
  Marca.getAll = (result) => {
    let query = "SELECT * FROM marca";
  
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
    sql.query(
      "UPDATE marca SET nombre = ?, eliminado = ?, f_update = ?, u_update = ? WHERE id_marca = ?",
      [marca.nombre, marca.eliminado, marca.f_update, marca.u_update, id],
      (err, res) => {
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
  
        Logger.info("updated marca: ", { id: id, ...marca });
        result(null, { id: id, ...marca });
      }
    );
  };
  
  Marca.remove = (id, result) => {
    sql.query("DELETE FROM marca WHERE id_marca = ?", id, (err, res) => {
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
  
  Marca.removeAll = result => {
    sql.query("DELETE FROM marca", (err, res) => {
      if (err) {
        Logger.error("error: ", err);
        result(null, err);
        return;
      }
  
      Logger.info(`deleted ${res.affectedRows} marca`);
      result(null, res);
    });
  };
  
  module.exports = Marca;
