import {configure} from 'axios-hooks';
import LRU from 'lru-cache';
import Axios from 'axios'


export const config = () => {
    const api = Axios.create({
        baseURL: `http://localhost:8000/`
    });
    
    const cache = new LRU({max: 10});
    
    configure({axios: api, cache});
}