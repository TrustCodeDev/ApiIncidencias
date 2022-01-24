const config = require("../config/index");

const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: `${config.applicationName} API`,
            description: `${config.applicationDescription}`,
            version: `${config.applicationVersion}`,
            termsOfService: "http://swagger.io/terms/",
            contact: {
                email: "trustcodesac@gmail.com"
            },
            license: {
                name: "Apache 2.0",
                url: "http://www.apache.org/licenses/LICENSE-2.0.html"
            },
            contact: {
                name: 'trustcode'
            },
            server: [`http:localhost:${config.port}`]
        }
    },
    // ['.routes/*.js']
    apis: ['../routes/routesMarca.js']
};

module.exports = swaggerOptions