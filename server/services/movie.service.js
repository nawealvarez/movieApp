const db = require('../database/models/index');
var ServiceError = require('../util/index').ServiceError;

class MovieService {
    async getGenres() {
        try {
            const genres = await db.Genre.findAll();
            return genres;
        } catch (err) {
            throw new ServiceError(401,err);
        }
    }

    async getMovies() {
        try {
            const movies = await db.Movie.findAll();
            return movies;
        } catch (err) {
            throw new ServiceError(401,err);
        }
    }

    async addMovie(payload) {
        try {
            console.log(payload);
            const movie = await db.Movie.create({
                    'name': payload.name, 
                    'rating': payload.rating, 
                    'cast': payload.cast, 
                    'releaseDate': payload.releaseDate, 
                    'genre_id': payload.genre_id});
            return movie;

        } catch (err) {
            throw new ServiceError(401,err);
        }
    }
}

module.exports = {
    MovieService
}