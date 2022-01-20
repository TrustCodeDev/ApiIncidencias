module.exports = app => {
  const routerMarca = require('./routesMarca');

  const routerModelo = require('./routesModelo');

  app.use('/marca', routerMarca);
  app.use('/modelo', routerModelo);
};
