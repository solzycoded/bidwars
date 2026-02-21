export const setAuthData = (authData) => {
    const auth = JSON.stringify(authData);
    localStorage.setItem("auth", auth); // ✅ store JWT
}

export const deleteAuthData = () => {
    const auth = getAuthData();

    if(auth && auth?.token!==null){
        localStorage.removeItem("auth");
    }
}

export const getAuthData = () => {
    const auth = localStorage.getItem("auth");

    return auth ?? null;
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