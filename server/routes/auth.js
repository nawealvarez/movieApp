const express = require('express');
const { AuthService } = require('../services/auth.service');
var ServiceError = require('../util/index').ServiceError;
const passport = require('passport');


const auth = express.Router();
const authService = new AuthService();

auth.post('/signup', async (req, res, next) => {
    try {
        const token = await authService.signUp(req.body);
        console.log(res, token);
        return res.status(201).json(token);
    } catch (err) {
        if (err instanceof ServiceError) {
            return res.status(err.code).json(err.detail);
        } else {
            return next(err);
        }
    }
});

auth.post('/login', async (req, res, next) => {
    try {
        return res.status(201).json({
            token: await authService.logIn(req.body)
        });
    } catch (err) {
        if (err instanceof ServiceError) {
            return res.status(err.code).json(err.detail);
        } else {
            return next(err);
        }
    }
});

auth.post('/signout', passport.authenticate('jwt', { session: false}), async (err, res, next) => {
    try {
        await authService.logOut(req.user);
        return res.sendStatus(201);
    } catch (err) {
        if (err instanceof ServiceError) {
            return res.status(err.code).json(err.detail);
        } else {
            return next(err);
        }
    }
});


module.exports = auth;
