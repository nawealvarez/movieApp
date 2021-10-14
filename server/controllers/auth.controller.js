const jwt = require('jsonwebtoken');
const passport = require('passport');
const { responseError, responseSuccess } = require('../services/util.service');

module.exports = {
  async authenticate(req, res, next) {
    passport.authenticate('login', { session: false }, (error, user, info) => {
      console.log(req);
      if (error || !user) return responseError(res, "Can't authenticate");

      req.login(user, { session: false }, (err) => {
        if (err) return responseError(res, err, 400);
        const body = { id: user.id, username: user.username };
        const token = jwt.sign({ user: body }, 'your_jwt_sescret');
        console.log(token);
        return responseSuccess(res, { user: body, token });
      });
      return next();
    })(req, res, next);
  },
};