const controller = require('../controllers/auth');
const express = require('express');
const routes = express.Router();

routes.post('/user', controller.createUser);
routes.post('/login', controller.loginUser);
routes.post('/token/validate', controller.validateUserToken);
module.exports = routes;