export const fetchNoAuth = async (url, body, method, failureFn, successFn) => {
    const baseUrl = "http://localhost:4500/";

    const res = await fetch(baseUrl + url, {
        method: method,
        headers: { 
            "Content-Type": "application/json" 
        },
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        failureFn(res);

        return;
    }

    successFn(res);
}