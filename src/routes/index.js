module.exports = app => {
  const routerMarca = require('./routesMarca');
  const routerArea = require('./routesArea');
  const routerModelo = require('./routesModelo');
  const routerEquipo = require('./routesEquipo');

  app.use('/marca', routerMarca);

  app.use('/area', routerArea);

  app.use('/modelo', routerModelo);

  app.use('/equipo', routerEquipo);
};
