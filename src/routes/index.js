module.exports = app => {
  const routerMarca = require('./routesMarca');
  const routerArea = require('./routesArea');
  const routerModelo = require('./routesModelo');

  app.use('/marca', routerMarca);

  app.use('/area', routerArea);

  app.use('/modelo', routerModelo);
};
