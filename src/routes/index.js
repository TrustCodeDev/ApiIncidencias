module.exports = app => {
  const routerTipoUsuario = require('./routesTipoUsuario');
  const routerUsuario = require('./routesUsuario');
  const routerIncidencia = require('./routesIncidencia');
  const routerMarca = require('./routesMarca');
  const routerModelo = require('./routesModelo');
  const routerEquipo = require('./routesEquipo');
  const routerDetalleEquipo = require('./routesDetalleEquipo');
  const routerConocimiento = require('./routesConocimiento');
  const routerArea = require('./routesArea');
  const routerDetalleIncidencia = require('./routesDetalleIncidencia');

  app.use('/tipo_usuario', routerTipoUsuario);
  app.use('/usuario', routerUsuario);
  app.use('/incidencia', routerIncidencia);
  app.use('/detalleIncidencia', routerDetalleIncidencia);
  app.use('/marca', routerMarca);
  app.use('/area', routerArea);
  app.use('/modelo', routerModelo);
  app.use('/conocimiento', routerConocimiento);
  app.use('/equipo', routerEquipo);
  app.use('/detalleEquipo', routerDetalleEquipo);
};
