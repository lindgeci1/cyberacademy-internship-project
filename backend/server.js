const express = require('express');
const dotenv = require('dotenv');
const path = require('path')
const cors = require('cors');
const DB_Connection = require('./src/config/database');
const testingConnection = require('./src/routes/testRoutes');
const loginConnection = require('./src/routes/loginRoutes');
const resourceRoutes = require('./src/routes/resourceRoutes');
const swaggerUI = require("swagger-ui-express");
const swaggerMain = require("./src/config/swagger")
dotenv.config({path:path.resolve(__dirname,'.env')});

DB_Connection();


const app = express();
app.use(express.json());
//install cors to let any frontend framework make requests on the backend api
app.use(cors());

app.use('/api/resources', resourceRoutes);
app.use('/api', loginConnection);

//PER ME E TESTU LIDHJEN ME MONGO
app.use('/api', testingConnection);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerMain))
const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> {
    console.log(`Server is running on ${PORT}`);
    console.log(`Swagger is on: http://localhost:${PORT}/api-docs`)
});