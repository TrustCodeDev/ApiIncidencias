module.exports = app => {
  const routerMarca = require('./routesMarca');
  const routerArea = require('./routesArea');

  app.use('/marca', routerMarca);

  app.use('/area', routerArea);
};
