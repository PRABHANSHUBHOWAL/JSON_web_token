const express = require('express');
const Router = express.Router();
const{login,dashboard} = require('../controllers/main')

const authenticationMiddleware=require('../middleware/auth');

Router.route('/dashboard').get(authenticationMiddleware,dashboard);
Router.route('/login').post(login);


module.exports=Router;