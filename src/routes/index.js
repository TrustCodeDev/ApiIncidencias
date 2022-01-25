module.exports = app => {

  const routerTipoUsuario = require('./routesTipoUsuario');
  const routerUsuario = require('./routesUsuario');

  const routerArea = require('./routesArea');

  const routerMarca = require('./routesMarca');
  const routerModelo = require('./routesModelo');
  const routerEquipo = require('./routesEquipo');

  app.use('/marca', routerMarca);
  app.use('/tipo_usuario' , routerTipoUsuario);
  app.use('/usuario' , routerUsuario);
  app.use('/marca', routerMarca);
  app.use('/area', routerArea);
  app.use('/modelo', routerModelo);

  app.use('/equipo', routerEquipo);
};
