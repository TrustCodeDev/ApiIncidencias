// AREA MODEL

const { Logger } = require('../../loaders/logger');
const { sql } = require('../../services/mysql');
const Utils = require('../../util');

// constructor Area
const Area = function (area) {
  (this.id_area = area.id_area),
    (this.nombre = area.nombre),
    // (this.estado = area.estado),
    (this.eliminado = area.eliminado),
    //this.f_create = Utils.getCurrentDateTime,
    //this.f_update = Utils.getCurrentDateTime,
    (this.u_create = area.u_create),
    (this.u_update = area.u_update);
};

Area.create = (newArea, result) => {
  const query = `INSERT INTO area(nombre,eliminado,f_create,f_update,u_create,u_update) 
                             values ('${newArea.nombre}', '${newArea.eliminado}', NOW(), NOW(), '${newArea.u_create}', '${newArea.u_update}');`;

  sql.query(query, (err, res) => {
    if (err) {
      Logger.error('error: ', err);
      result(err, null);
      return;
    }

    Logger.info('created area: ', { id: res.insertId, ...newArea });
    result(null, { id: res.insertId, ...newArea });
  });
};

Area.findByName = (name, result) => {
  sql.query(
    `select count(*) as result from area where nombre = ?`,
    name,
    (err, res) => {
      if (err) {
        Logger.error('error: ', err);
        result(err, null);
        return;
      }

      Logger.info('area: ', res[0]);
      result(null, res[0].result);
      return;

      //result({ kind: "not_found" }, null);
    },
  );
};

Area.findById = (id, result) => {
  sql.query(
    `SELECT * FROM area WHERE id_area = ${id} and eliminado = 0`,
    (err, res) => {
      if (err) {
        Logger.error('error: ', err);
        result(err, null);
        return;
      }

      if (res.length) {
        Logger.info('found area: ', res[0]);
        result(null, res[0]);
        return;
      }

      // not found Area with the id
      result({ kind: 'not_found' }, null);
    },
  );
};

Area.getAll = result => {
  let query = 'SELECT * FROM area WHERE eliminado = 0';

  sql.query(query, (err, res) => {
    if (err) {
      Logger.error('error: ', err);
      result(null, err);
      return;
    }

    result(null, res);
    Logger.info('areas: ', res);
  });
};

Area.updateById = (id, area, result) => {
  sql.query(
    'UPDATE area SET nombre = ?, eliminado = ?, f_update = NOW(), u_update = ? WHERE id_area = ?',
    [area.nombre, area.eliminado, area.u_update, id],
    (err, res) => {
      console.log(err);
      if (err) {
        Logger.error('error: ', err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Area with the id
        result({ kind: 'not_found' }, null);
        return;
      }

      Logger.info('updated area: ', { id: id, ...area });
      result(null, { id: id, ...area });
    },
  );
};

Area.remove = (id, result) => {
  sql.query(
    'UPDATE area SET eliminado = 1 WHERE id_area = ?',
    id,
    (err, res) => {
      if (err) {
        Logger.error('error: ', err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: 'not_found' }, null);
        return;
      }

      Logger.info('deleted area with id: ', id);
      result(null, res);
    },
  );
};

module.exports = Area;
