import axios from 'axios';
import firebase from 'firebase/compat';

export const apiConfig = axios.create({
        baseURL: `http://localhost:8000`
});

export const setClientToken = token => {
    return apiConfig.interceptors.request.use(function (config) {
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    });
};

const firebaseConfig = {
    apiKey: "AIzaSyCrfE5cQVFkNErBA5JxBhcltlngII9LOrE",
    authDomain: "admiosapi.firebaseapp.com",
    projectId: "admiosapi",
    storageBucket: "admiosapi.appspot.com",
    messagingSenderId: "925536991387",
    appId: "1:925536991387:web:ce5026bd017031e4f6ee3e"
}

const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();
