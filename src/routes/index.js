module.exports = app => {
  const routerMarca = require('./routesMarca');

  // const routerUsuario = require('./routesUsuario');

  app.use('/marca', routerMarca);
  // app.use('/usuario', routerUsuario);
};
