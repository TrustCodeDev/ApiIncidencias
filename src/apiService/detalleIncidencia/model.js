// DETALLE INCIDENCIA MODEL

const { Logger } = require('../../loaders/logger');
const { sql } = require('../../services/mysql');
const Utils = require('../../util');

// constructor Detalle Incidencia
const DetalleIncidencia = function (detalleIncidencia) {
  (this.id_detalle_incidencia = detalleIncidencia.id_detalle_incidencia),
    (this.fecha = detalleIncidencia.fecha),
    (this.eliminado = detalleIncidencia.eliminado),
    (this.u_create = detalleIncidencia.u_create),
    (this.u_update = detalleIncidencia.u_update),
    (this.usuario_id_usuario = detalleIncidencia.usuario_id_usuario),
    (this.incidencia_id_incidencia =
      detalleIncidencia.incidencia_id_incidencia),
    (this.area_id_area = detalleIncidencia.area_id_area),
    (this.conocimiento_id_conocimiento =
      detalleIncidencia.conocimiento_id_conocimiento);
};

DetalleIncidencia.create = (newDetalleIncidencia, result) => {
  const query = `INSERT INTO detalle_incidencia(fecha,eliminado,f_create,f_update,u_create,u_update,usuario_id_usuario,incidencia_id_incidencia,area_id_area,conocimiento_id_conocimiento) 
                             values ('${newDetalleIncidencia.fecha}', 
                             '${newDetalleIncidencia.eliminado}', 
                             NOW(), 
                             NOW(), 
                             '${newDetalleIncidencia.u_update}', 
                             '${newDetalleIncidencia.u_update}', 
                             '${newDetalleIncidencia.usuario_id_usuario}', 
                             '${newDetalleIncidencia.incidencia_id_incidencia}', 
                             '${newDetalleIncidencia.area_id_area}', 
                             '${newDetalleIncidencia.conocimiento_id_conocimiento}');`;

  sql.query(query, (err, res) => {
    if (err) {
      Logger.error('error: ', err);
      result(err, null);
      return;
    }

    Logger.info('created detalle Incidencia: ', {
      id: res.insertId,
      ...newDetalleIncidencia,
    });
    result(null, { id: res.insertId, ...newDetalleIncidencia });
  });
};

//FALTA MODIFICARRRRRRRRRRR
// DetalleIncidencia.findByName = (name, result) => {
//   sql.query(
//     `select count(*) as result from area where nombre = ?`,
//     name,
//     (err, res) => {
//       if (err) {
//         Logger.error('error: ', err);
//         result(err, null);
//         return;
//       }

//       Logger.info('area: ', res[0]);
//       result(null, res[0].result);
//       return;

//       //result({ kind: "not_found" }, null);
//     },
//   );
// };

DetalleIncidencia.findById = (id, result) => {
  sql.query(
    `SELECT * FROM detalle_incidencia WHERE id_detalle_incidencia = ${id} and eliminado = 0`,
    (err, res) => {
      if (err) {
        Logger.error('error: ', err);
        result(err, null);
        return;
      }

      if (res.length) {
        Logger.info('found detalle Incidencia: ', res[0]);
        result(null, res[0]);
        return;
      }

      // not found Detalle Incidencia with the id
      result({ kind: 'not_found' }, null);
    },
  );
};

DetalleIncidencia.getAll = result => {
  let query = 'SELECT * FROM detalle_incidencia WHERE eliminado = 0';

  sql.query(query, (err, res) => {
    if (err) {
      Logger.error('error: ', err);
      result(null, err);
      return;
    }

    result(null, res);
    Logger.info('detalle incidencias: ', res);
  });
};

DetalleIncidencia.updateById = (id, detalleIncidencia, result) => {
  sql.query(
    'UPDATE detalle_incidencia SET fecha = ?, eliminado = ?, f_update = NOW(), u_update = ?, usuario_id_usuario = ?, incidencia_id_incidencia = ?, area_id_area = ?, conocimiento_id_conocimiento = ?  WHERE id_area = ?',
    [
      detalleIncidencia.fecha,
      detalleIncidencia.eliminado,
      detalleIncidencia.u_update,
      detalleIncidencia.usuario_id_usuario,
      detalleIncidencia.id_detalle_incidencia,
      detalleIncidencia.area_id_area,
      detalleIncidencia.conocimiento_id_conocimiento,
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
        // not found Detalle Incidencia with the id
        result({ kind: 'not_found' }, null);
        return;
      }

      Logger.info('updated detalle Incidencia: ', {
        id: id,
        ...detalleIncidencia,
      });
      result(null, { id: id, ...detalleIncidencia });
    },
  );
};

DetalleIncidencia.remove = (id, result) => {
  sql.query(
    'UPDATE detalle_incidencia SET eliminado = 1 WHERE id_area = ?',
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

      Logger.info('deleted detalle Incidencia with id: ', id);
      result(null, res);
    },
  );
};

module.exports = DetalleIncidencia;
