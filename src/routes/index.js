const { Router } = require('express');

const routes = Router();

const usersRouter = require('./users.routes');
const routesRouter = require('./users.routes.js');

routes.use('/users', usersRouter);
routes.use('/notes', routesRouter);

module.exports = routes;
