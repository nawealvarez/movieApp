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

movie.get('/',  async (req, res, next) => {
    try {
        return res.status(201).json({
            movies: await movieService.getMovies()
        });
    } catch (err) {
        if (err instanceof ServiceError) {
            return res.status(err.code).json(err.detail);
        } else {
            return next(err);
        }
    }
});

movie.post('/create', async (req, res, next) => {
    try {
        return res.status(201).json({
            movie: await movieService.addMovie(req.body)
        });
    } catch (err) {
        if (err instanceof ServiceError) {
            return res.status(err.code).json(err.detail);
        } else {
            return next(err);
        }
    }
})

movie.delete('/:id', async (req, res, next) => {
    try {
        return res.status(201).json({
            movie: await movieService.removeMovie(req.body)
        });
    } catch (err) {
        if (err instanceof ServiceError) {
            return res.status(err.code).json(err.detail);
        } else {
            return next(err);
        }
    }
})

module.exports = movie;