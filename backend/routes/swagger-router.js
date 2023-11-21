const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc')

const swaggerOption = {
    swaggerDefinition : {
        info: {
            title: "Food Ordering API",
            version: "v1.0",
            contact:{
                name: "Trung Le",
                "email": "leanhtrung97@gmail.com"
            },
            server:['http://localhost:1337'],
           
        }
    },
    apis: ['./app.js']
}



const swaggerDocs = swaggerJsDoc(swaggerOption)

router
.use('/api-docs', swaggerUi.serve)
.get('/api-docs', swaggerUi.setup(swaggerDocs));

module.exports = router;