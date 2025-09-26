const swaggerDoc = require('swagger-jsdoc');

const theoptions ={

    definition:{
        openapi: "3.0.0",
        info:{
            title: "Cyber Academy Internship",
            version: "1.0.0",
            description: "Documenting Backend API-s"
        },
        servers:[
            {
                url: "http://localhost:5000",
            },
        ],
        components:{
          securitySchemes: {
            bearerAuth: {
              type: "http",
              scheme: "bearer",
              bearerFormat: "JWT",
            },
          },
        },
        security: [
          {
            bearerAuth: [],
          },
        ],
    },
    apis:["./src/routes/*js"]
}
const swaggerMain = swaggerDoc(theoptions);
module.exports = swaggerMain;