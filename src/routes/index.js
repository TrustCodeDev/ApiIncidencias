module.exports = app => {

  const routerMarca = require('./routesMarca');
  const routerTipoUsuario = require('./routesTipoUsuario');
  const routerUsuario = require('./routesUsuario');

  app.use('/marca', routerMarca);
  app.use('/tipo_usuario' , routerTipoUsuario);
  app.use('/usuario' , routerUsuario);
  
};
