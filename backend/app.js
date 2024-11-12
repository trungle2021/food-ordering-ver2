const express = require('express');
const app = express();

const path = require('path');
const morganMiddleware = require('./middleware/morgan');
// const SwaggerRouter = require('./utils/swagger/swagger')
const apiRouter = require('./routes/router');
const cors = require('cors');
const jwtFilterHandler = require('./middleware/jwt-filter');
const ErrorController = require('./apps/error/error-controller');
const AppError = require('./utils/error/app-error');

// config middleware
app.use(cors());
app.use(morganMiddleware);
app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  next();
});
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// router
// app.use(SwaggerRouter)
app.use(jwtFilterHandler);
app.use('/api/v1', apiRouter);

// Handle Unhandle middleware
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(ErrorController);

module.exports = app;
