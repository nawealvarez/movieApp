const express = require('express');
//const router = express.Router();
const passport = require('passport');
const auth = require('./auth');
const api = express.Router();
const movie = require('./movie');

api.use('/auth', auth);

api.use('/movies', passport.authenticate('jwt', { session: false }), movie);
/* eslint-disable */
//router.post(  '/login', AuthController.authenticate);
//
//router.get(   '/users', passport.authenticate('jwt', { session: false }), UserController.getAll);
//router.post(  '/users', passport.authenticate('jwt', { session: false }), UserController.create);



/* eslint-enable */

module.exports = {
  api,
};
