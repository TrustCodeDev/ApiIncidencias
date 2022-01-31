const express = require('express');
const cors = require('cors');
//const { routes } = require('../routes/routes')
const config = require('../config');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
//const swaggerOptions = require('../doc/swagger-spec');

const path = require('path');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: `${config.applicationName} API`,
      description: `${config.applicationDescription}`,
      version: `${config.applicationVersion}`,
      termsOfService: 'http://swagger.io/terms/',
      contact: {
        email: 'trustcodesac@gmail.com',
      },
      license: {
        name: 'Apache 2.0',
        url: 'http://www.apache.org/licenses/LICENSE-2.0.html',
      },
      contact: {
        name: 'trustcode',
      },
      server: [`http:localhost:${config.port}`],
    },
  },
  // ['.routes/*.js']
  apis: [
<<<<<<< HEAD
    `${path.join(__dirname, '../routes/routesMarca.js')}`,
    `${path.join(__dirname, '../routes/routesModelo.js')}`,
    `${path.join(__dirname, '../routes/routesTipoUsuario.js')}`,
    `${path.join(__dirname, '../routes/routesUsuario.js')}`,
    `${path.join(__dirname, '../routes/routesEquipo.js')}`,
  ],
=======
    `${path.join(__dirname,"../routes/routesMarca.js")}`,
    `${path.join(__dirname,"../routes/routesModelo.js")}`,
    `${path.join(__dirname,"../routes/routesTipoUsuario.js")}`,
    `${path.join(__dirname,"../routes/routesUsuario.js")}`,
    `${path.join(__dirname,"../routes/routesEquipo.js")}`,
    `${path.join(__dirname,"../routes/routesIncidencia.js")}`,
    `${path.join(__dirname,"../routes/routesDetalleEquipo.js")}`,
  ]
>>>>>>> 4e887ec97a15e38c56b0cce1b43476ae964d70b9
};

const expressUp = app => {
  /**
   * Health Check endpoints
   * @TODO Explain why they are here
   */
  app.get('/status', (req, res) => {
    res.status(200).end();
  });
  app.head('/status', (req, res) => {
    res.status(200).end();
  });

  // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  // It shows the real origin IP in the heroku or Cloudwatch logs
  app.enable('trust proxy');

  // The magic package that prevents frontend developers going nuts
  // Alternate description:
  // Enable Cross Origin Resource Sharing to all origins by default
  app.use(cors());

  // Some sauce that always add since 2014
  // "Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it."
  // Maybe not needed anymore ?
  //app.use(require('method-override')());

  // Transforms the raw string of req.body into json
  app.use(express.json());

  // API Documentation
  const swaggerDocs = swaggerJsDoc(swaggerOptions);
  app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

  // Load API routes
  //app.use(config.api.prefix, routes(app));
  require('../routes/index.js')(app);

  /*app.use(OpticMiddleware({
        enabled: process.env.NODE_ENV !== 'production',
    }));*/

  /// catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err['status'] = 404;
    next(err);
  });

  /// error handlers
  app.use((err, req, res, next) => {
    /**
     * Handle 401 thrown by express-jwt library
     */
    if (err.name === 'UnauthorizedError') {
      return res.status(err.status).send({ message: err.message }).end();
    }
    return next(err);
  });
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
      },
    });
  });
};

module.exports = {
  expressLoader: expressUp,
};
