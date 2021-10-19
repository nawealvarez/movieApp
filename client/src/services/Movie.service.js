import {apiConfig} from "../config/utils";

export const getGenres = async () =>{
    try{
        const res = await apiConfig.get('/api/movies/genres');
        return res;
    } catch(err) {
        console.log(err);
    }

};