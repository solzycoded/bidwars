import { createContext, useContext, useState, useMemo } from "react";
import PropTypes from "prop-types";
import { deleteAuthData, getAuthData, setAuthData } from "../assets/util/Auth.js";

// initialize context
const AuthContext = createContext(null);

// define context wrapper
export const AuthProvider = ({ children }) => {
    // define context values
    const [ user, setUser ] = useState(getAuthData);

    const login = useMemo((userData) => {
        setAuthData(userData); // store the users details in "auth"
        setUser(userData); // update the user state
    }, []);
    const logout = useMemo(() => {
        deleteAuthData(); // delete the user's details from localstorage
        setUser(null); // update the user state
    }, []);

    // return context provider
    const value = useMemo(() => ({ user, login, logout }), [user, login, logout]);
    
    return (
        <AuthContext.Provider value={value}>
            { children }
        </AuthContext.Provider>
    )
}

// validate props
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

// set the authtentication context
export const useAuth = () => useContext(AuthContext);