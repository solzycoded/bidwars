import { getAuthData } from "./Auth.js";

const fetchResponse = async (url, body, method, failureFn, successFn, token = "") => {
    const baseUrl = "http://localhost:4500/";

    const contentType = { 
        "Content-Type": "application/json"
    };
    const headers = token==="" ? contentType : { ...contentType, "authorization": `Bearer <${token}>` };

    const res = await fetch(baseUrl + url, {
        method: method,
        headers,
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        failureFn(res);

        return;
    }

    successFn(res);
}

export const fetchNoAuth = async (url, body, method, failureFn, successFn) => {
    await fetchResponse(url, body, method, failureFn, successFn);
}

export const fetchWithAuth = async (url, body, method, failureFn, successFn) => {
    const { token } = getAuthData();

    await fetchResponse(url, body, method, failureFn, successFn, token);
}