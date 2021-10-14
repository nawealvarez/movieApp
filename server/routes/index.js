const express = require('express');
//const router = express.Router();
const passport = require('passport');
const auth = require('./auth');
require('../passport');

const UserController = require('../controllers/user.controller');
const AuthController = require('../controllers/auth.controller');

const api = () => {
  const api = express.Router();
  api.use('/auth', auth);
}


/* eslint-disable */
//router.post(  '/login', AuthController.authenticate);
//
//router.get(   '/users', passport.authenticate('jwt', { session: false }), UserController.getAll);
//router.post(  '/users', passport.authenticate('jwt', { session: false }), UserController.create);



/* eslint-enable */

module.exports = {
  api,
};
