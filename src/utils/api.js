import {SET_AUTH_CHECKED, SET_USER} from "../service/actions";

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
    console.log(emailValue);
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

function login({emailValue, passwordValue}) {
    return api('/auth/login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            email: emailValue,
            password: passwordValue,
        })
    })
}

function getUser() {
    return api('/auth/user', {
        method: 'GET'
    })
}

function checkUserAuth() {
    return (dispatch) => {
        if (localStorage.getItem("accessToken")) {
            getUser()
                .catch(() => {
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("refreshToken");
                    dispatch({type: SET_USER, data: null})
                })
                .finally(() => dispatch({type: SET_AUTH_CHECKED, data: true}));
        } else {
            dispatch({type: SET_AUTH_CHECKED, data: true});
        }
    };
}

function forgotPassword(email) {
    return api('/password-reset', {
        method: 'POST',
        body: email
    })
}
function resetPassword(password, token) {
    return api('/password-reset/reset', {
        method: 'POST',
        body: {
            "password": password,
            "token": token
        }
    })
}

export {getIngredients, postIngredients, registration, login, checkUserAuth, forgotPassword, resetPassword};