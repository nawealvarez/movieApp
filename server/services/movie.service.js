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
}

module.exports = {
    MovieService
}