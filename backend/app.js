const express = require('express');

const ErrorController = require('./controllers/error-controller')
const AppError = require('./utils/error_handler/app-error')
const morgan = require('morgan');
const path = require('path');
const rfs = require("rotating-file-stream");
const SwaggerRouter = require('./routes/swagger-router');
const isProduction = process.env.NODE_ENV === 'production';
const app = express();
const apiRouter = require('./routes/router');



const rfsStream = rfs.createStream("system.log",{
    size: "10M",
    interval: "1d",
    path: path.join(__dirname,'log'),
    compress: 'gzip' // compress rotated files
})
// config middleware
app.use(SwaggerRouter)
app.use(morgan("combined",{stream: rfsStream}))
// app.use( isProduction ? morgan("combined", {stream: rfsStream}) : morgan("dev") )
//another logger to show log in console 
app.use(morgan("dev"))
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

//router
app.use("/api/v1",apiRouter)

// Handle Unhandle middleware
app.all("*", (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
})

app.use(ErrorController)

module.exports = app
