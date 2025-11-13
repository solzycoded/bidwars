export const setAuthData = (authData) => {
    const auth = JSON.stringify(authData);
    localStorage.setItem("auth", auth); // ✅ store JWT
}

export const getAuthData = () => {
    const auth = localStorage.getItem("auth");

    return auth;
}

const loggedIn = () => {
    const auth = getAuthData();
    return !!(auth && auth?.token!==null);
}

const isAdmin = () => {
    const auth = getAuthData();

    return auth?.role==="admin";
}

const AuthData = {
    isLoggedIn: loggedIn(),
    isAdmin: isAdmin(),
}
export default AuthData;