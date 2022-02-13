//CONOCIMIENTO MODEL

const { Logger } = require('../../loaders/logger');
const { sql } = require('../../services/mysql');
const Utils = require('../../util');

// constructor Conocimiento
const Conocimiento = function (conocimiento) {
  (this.id_conocimiento = conocimiento.id_conocimiento),
    (this.descripcion = conocimiento.descripcion),
    (this.fecha = conocimiento.fecha),
    (this.solucion = conocimiento.solucion),
    (this.eliminado = conocimiento.eliminado),
    (this.u_create = conocimiento.u_create),
    (this.u_update = conocimiento.u_update),
    (this.id_usuario = conocimiento.id_usuario);
};

//CONOCIMIENTO CREATE
Conocimiento.create = (newConocimiento, result) => {
  const query = `INSERT INTO conocimiento(descripcion,fecha, solucion,eliminado,f_create,f_update,u_create,u_update,id_usuario) 
  values ('${newConocimiento.descripcion}', 
  '${newConocimiento.fecha}', 
  '${newConocimiento.solucion}', 
  '${newConocimiento.eliminado}', 
  NOW(), 
  NOW(), 
  '${newConocimiento.u_create}', 
  '${newConocimiento.u_update}',
  ${newConocimiento.id_usuario});`;

  sql.query(query, (err, res) => {
    if (err) {
      Logger.error('error: ', err);
      result(err, null);
      return;
    }

    Logger.info('created conocimiento: ', {
      id: res.insertId,
      ...newConocimiento,
    });
    result(null, { id: res.insertId, ...newConocimiento });
  });
};

//CONOCIMIENTO FIND BY NAME OF DESCRIPCION

Conocimiento.findByName = (descripcion, result) => {
  sql.query(
    `select count(*) as result from conocimiento where descripcion = ?`,
    descripcion,
    (err, res) => {
      if (err) {
        Logger.error('error: ', err);
        result(err, null);
        return;
      }

      Logger.info('conocimiento: ', res[0]);
      result(null, res[0].result);
      return;

      //result({ kind: "not_found" }, null);
    },
  );
};

// CONOCIMIENTO FIND BY ID ------- FALTA MODIFICAR
Conocimiento.findById = (id, result) => {
  sql.query(
    `SELECT * FROM conocimiento WHERE id_conocimiento = ${id} and eliminado = 0`,
    (err, res) => {
      if (err) {
        Logger.error('error: ', err);
        result(err, null);
        return;
      }

      if (res.length) {
        Logger.info('found conocimiento: ', res[0]);
        result(null, res[0]);
        return;
      }

      // not found Conocimiento with the id
      result({ kind: 'not_found' }, null);
    },
  );
};

//CONOCIMIENTO GET ALL
Conocimiento.getAll = result => {
  let query = 'SELECT * FROM conocimiento WHERE eliminado = 0';

  sql.query(query, (err, res) => {
    if (err) {
      Logger.error('error: ', err);
      result(null, err);
      return;
    }

    result(null, res);
    Logger.info('conocimientos: ', res);
  });
};

//CONOCIMIENTO UPDATE BY ID
Conocimiento.updateById = (id, conocimiento, result) => {
  sql.query(
    'UPDATE conocimiento SET descripcion = ?, fecha = ?, solucion = ?, eliminado = ?, f_update = NOW(), u_update = ?, id_usuario = ? WHERE id_conocimiento = ?',
    [
      conocimiento.descripcion,
      conocimiento.fecha,
      conocimiento.solucion,
      conocimiento.eliminado,
      conocimiento.u_update,
      conocimiento.id_usuario,
      id,
    ],
    (err, res) => {
      console.log(err);
      if (err) {
        Logger.error('error: ', err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found conocimiento with the id
        result({ kind: 'not_found' }, null);
        return;
      }

      Logger.info('updated conocimiento: ', { id: id, ...conocimiento });
      result(null, { id: id, ...conocimiento });
    },
  );
};

//CONOCIMIENTO REMOVE
Conocimiento.remove = (id, result) => {
  sql.query(
    'UPDATE conocimiento SET eliminado = 1 WHERE id_conocimiento = ?',
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

      Logger.info('deleted conocimiento with id: ', id);
      result(null, res);
    },
  );
};

//EXPORT MODULE CONOCIMIENTO
module.exports = Conocimiento;
