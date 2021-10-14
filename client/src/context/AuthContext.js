import React, { useContext, useState } from "react";
import { Redirect } from "react-router";

export const initialAuth = {
    isLogged: false,
    login: () => {}
};

export const AuthContext = React.createContext(initialAuth);

export const useAuth = () => {
    return useContext(AuthContext);
}

export const LoginRequired = ({children}) => {
    const {isLogged} = useAuth();
    return(
        <>
            {isLogged ? children : <Redirect to="/login"/>}
        </>
    )
}

export const AuthContextWrapper = (props) => {
    const [user, setUser] = useState();
    const [isLogged, setIsLogged] = useState(false);

    const login = (u) => {
        setUser(u);
        setIsLogged(true);
    }

    return (
        <AuthContext.Provider value={{isLogged,user,login}}>
            {props.children}
        </AuthContext.Provider>
    )
}
