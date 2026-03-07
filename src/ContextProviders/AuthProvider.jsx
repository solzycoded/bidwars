import { createContext, useContext, useState, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { deleteAuthData, getAuthData, setAuthData } from "../assets/util/Auth.js";

// initialize context
const AuthContext = createContext(null);

// define context wrapper
const AuthProvider = ({ children }) => {
    // define context values
    const [ user, setUser ] = useState(getAuthData()); // isUser state variable
    const [ loggedIn, setLoggedIn ] = useState({
        yes: user!==null,
        isAdmin: user!==null && user?.role==="admin",
    });

    const updateUser = useCallback((userData = null) => {
        setUser(userData);
        setLoggedIn({yes: userData!==null, isAdmin: userData?.role==="admin"});
    }, [setUser, setLoggedIn]);
    const login = useCallback((userData) => {
        setAuthData(userData); // store the users details in "auth"
        updateUser(userData); // update the user state
    }, [updateUser]);
    const logout = useCallback(() => {
        deleteAuthData(); // delete the user's details from localstorage
        updateUser(); // update the user state
    }, [updateUser, user]);

    // return context provider
    const value = useMemo(() => ({ user, login, logout, loggedIn }), [user, login, logout, loggedIn]);

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

export default AuthProvider;