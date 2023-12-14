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

    const res = await fetch(url, options)
    if (res.ok) {
        return res.json();
    } else {
        console.error(`Failed to fetch. Code error:${res.status}`);
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
        method: 'GET',
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            authorization: localStorage.getItem("accessToken"),
        },
    })
}

function checkUserAuth() {
    return (dispatch) => {
        if (localStorage.getItem("accessToken")) {
            getUser()
                .then(result => {
                    dispatch({type: SET_USER, data: result});
                })
                .catch(() => {
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("refreshToken");
                    dispatch({type: SET_USER, data: null})
                })
                .finally(() => {

                    return dispatch({type: SET_AUTH_CHECKED, data: true})
                });
        } else {
            dispatch({type: SET_AUTH_CHECKED, data: true});
        }
    };
}

function forgotPassword(email) {
    return api("/password-reset", {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(email),
    });
}

function resetPassword(password, token) {
    return api("/password-reset/reset", {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            password: password,
            token: token,
        }),
    });
}

function logout() {
    const refreshToken = localStorage.getItem("refreshToken");
    return async (dispatch) => {
        await api('/auth/logout', {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(
                {
                    "token": refreshToken
                }
            )
        });
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        dispatch({type: SET_USER, data: null});
    };
}

function refreshToken() {
    const refreshToken = localStorage.getItem("refreshToken");
    return async () => {
        await api('/auth/token', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(
                {
                    "token": refreshToken
                }
            )
        })
    }
}

function updateUserInfo({valueName, valueEmail, valuePass}) {
    return async () => {
        await api('/auth/user', {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                authorization: localStorage.getItem("accessToken"),
            },
            body: JSON.stringify(
                {
                    "email": valueEmail,
                    "password": valuePass,
                    "name": valueName
                }
            )
        })
    }
}

export {
    getIngredients,
    postIngredients,
    registration,
    login,
    checkUserAuth,
    forgotPassword,
    resetPassword,
    getUser,
    logout,
    refreshToken,
    updateUserInfo
};