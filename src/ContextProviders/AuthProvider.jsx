import { createContext, useContext, useState, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { deleteAuthData, getAuthData, setAuthData } from "../assets/util/Auth.js";

// initialize context
const AuthContext = createContext(null);

// define context wrapper
const AuthProvider = ({ children }) => {
    // define context values
    const [ user, setUser ] = useState(getAuthData()); // isUser state variable
    
    const loggedIn = useCallback(() => {// check if user is logged in
        return !!(user && user?.token!==null);
    }, [user]);
    
    const [ isLoggedIn, setIsLoggedIn ] = useState(loggedIn()); // isLoggedIn state variable
    
    const admin = useCallback(() => {// check if the user is an admin
        return isLoggedIn && user?.role==="admin";
    }, [isLoggedIn, user]);
    
    const [ isAdmin, setIsAdmin ] = useState(admin()); // isAdmin state variable

    const updateUser = useCallback((userData = null) => {
        setUser(userData);
        setIsLoggedIn(loggedIn());
        setIsAdmin(admin());
    }, [loggedIn, admin, setUser, setIsLoggedIn, setIsAdmin]);
    const login = useCallback((userData) => {
        setAuthData(userData); // store the users details in "auth"
        updateUser(userData); // update the user state
    }, [updateUser]);
    const logout = useCallback(() => {
        deleteAuthData(); // delete the user's details from localstorage
        updateUser(); // update the user state
    }, [updateUser]);

    // return context provider
    const value = useMemo(() => ({ user, login, logout, isLoggedIn, isAdmin }), [user, login, logout, isLoggedIn, isAdmin]);

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