import {apiConfig, setClientToken, fcm} from "../config/utils";
import axios from 'axios';


export const signup = async (payload) => {
    const email = payload.email;
    const { data } = await apiConfig.post('/api/auth/signup',{
        token: payload.fToken,
        email: email,
        fcmToken: fcm.token,
    });
    const { token } = data;
    const interceptorId = setClientToken(token);
    return { token, email, interceptorId };
};