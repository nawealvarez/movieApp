const express = require('express');
const { MovieService } = require('../services/movie.service');
var ServiceError = require('../util/index').ServiceError;

const movie = express.Router();

const movieService = new MovieService();

movie.get('/genres', async (req, res, next) => {
    try {
        return res.status(201).json({
            genres: await movieService.getGenres()
        });
    } catch (err) {
        if (err instanceof ServiceError) {
            return res.status(err.code).json(err.detail);
        } else {
            return next(err);
        }
    }
});

module.exports = movie;