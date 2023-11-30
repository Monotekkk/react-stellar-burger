const baseURL = "https://norma.nomoreparties.space/api";

async function api(route, params = {}) {
    const url = `${baseURL}${route}`,
        options = {
            method: params?.method || "GET",
            headers: {
                ...params?.headers,
            },
            body: params?.body || null,
        };

    const res = await fetch(url, options);
    if (res.ok) {
        return res.json();
    } else {
        throw new Error(`Failed to fetch. Code error:${res.status}`);
    }
}

function getIngredients() {
    return api("/ingredients");
}

function postIngredients(body) {
    return api('/orders', {
        method: 'POST',
        body: body
    });
}

function forgotPassword(body) {
    return api('/password-reset', {
        method: 'POST',
        body: body
    })
}

function resetPassword(body) {
    return api('/password-reset/reset', {
        method: 'POST',
        body: body
    })
}

function registration() {
    return api('/auth/register', {
        method: 'POST',
        body: {
            "email": "timur.yakhin.99@yandex.ru",
            "password": "timur1408",
            "name": "Monotek"
        }
    })
}
const getUser = () =>
    new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                user: {},
            });
        }, 1000);
    });

const login = () =>
    new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                accessToken: "test-token",
                refreshToken: "test-refresh-token",
                user: {},
            });
        }, 1000);
    });

const logout = () =>
    new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, 1000);
    });

export {getIngredients, postIngredients, forgotPassword, resetPassword, registration, getUser, login, logout};
