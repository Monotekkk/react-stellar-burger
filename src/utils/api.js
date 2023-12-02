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
        body: body,
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
    });
}
function registration({emailValue, passwordValue, nameValue}) {
    console.log(JSON.stringify({
        email: emailValue,
        password: passwordValue,
        name: nameValue,
    }));
    return api('/auth/register', {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            email: emailValue,
            password: passwordValue,
            name: nameValue,
        }),

    })
}

export {getIngredients, postIngredients, registration};