import {apiConfig} from "../config/utils";

export const getGenres = async () =>{
    try{
        const res = await apiConfig.get('/api/movies/genres');
        return res;
    } catch(err) {
        console.log(err);
    }

};

export const addMovie = async (payload) => {
    try {
        const { data } = await apiConfig.post('/api/movies/create', {
            name: payload.name,
            rating: payload.rating,
            cast: payload.cast,
            releaseDate: payload.releaseDate,
            genre_id: payload.genre_id,
        });
        return data;
    } catch(err) {
        console.log(err);
    }
}