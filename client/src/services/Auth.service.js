import {apiConfig, setClientToken, auth} from "../config/utils";

export const signup = async (payload) => {
    const email = payload.email;
    const { data } = await apiConfig.post('/api/auth/signup',{
        token: payload.fToken,
        email: email,
    });
    const { token } = data;
    const interceptorId = setClientToken(token);
    return { token, email, interceptorId };
};

export const refresh = async () => {
    try{
        if (auth.currentUser) {
            const fToken = await auth.currentUser.getIdToken(true);

            const { data } = await apiConfig.post('/api/auth/login', {
                token: fToken,
            });
            const { token } = data;
            const interceptorId = setClientToken(token);
            return { token, interceptorId };
        }
    } catch (err) {
        console.log(err);
    }
};

export const login = async (payload) => {
    try{
        const email = payload.email;
        const { data } = await apiConfig.post('/api/auth/login', {
            token: payload.fToken,
            credential: payload.credential,
            email: email
        });
        const { token } = data;
        const interceptorId = setClientToken(token);
        return { token, email, interceptorId };
    } catch (err) {
        console.log(err);
    }
};