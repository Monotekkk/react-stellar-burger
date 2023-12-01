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
        body: JSON.stringify({
            email: "timur.yakhin.99@yandex.ru",
            password: "timur1408",
            name: "Monotek"
        })
    })
}

function login(body) {
    console.log(body);
    return api('/auth/login', {
        method: 'POST',
        body:
           JSON.stringify({
                email: body.emailValue,
                password: body.passwordValue
            })

    })
}

export {getIngredients, postIngredients, forgotPassword, resetPassword, registration, login,};
