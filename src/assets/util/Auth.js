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
    const authData = localStorage.getItem("auth");

    return JSON.parse(authData) ?? null;
}