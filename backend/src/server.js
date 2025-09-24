const express = require('express');
const dotenv = require('dotenv');
const path = require('path')
const DB_Connection = require('./config/database');
const testingConnection = require('./routes/testRoutes');
const resourceRoutes = require('./routes/resourceRoutes');
const swaggerUI = require("swagger-ui-express");
const swaggerMain = require("./config/swagger")
dotenv.config({path:path.resolve(__dirname,'../.env')});

DB_Connection();


const app = express();
app.use(express.json());

app.use('/api/resources', resourceRoutes);

//PER ME E TESTU LIDHJEN ME MONGO
// app.use('/api', testingConnection);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerMain))
const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> {
    console.log(`Server is running on ${PORT}`);
    console.log(`Swagger is on: http://localhost:${PORT}/api-docs`)
});