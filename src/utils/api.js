import {SET_AUTH_CHECKED, SET_USER} from "../services/constants";

const baseURL = "https://norma.nomoreparties.space/api";

async function api(route, params = {}) {
    const url = `${baseURL}${route}`,
        options = {
            method: params?.method || "GET",
            headers: {
                ...params?.headers
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
            authorization: localStorage.getItem("accessToken")
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
            'email': emailValue,
            'password': passwordValue,
            'name': nameValue,
        }),

    })
}

function login(data) {
    return api('/auth/login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(data)
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

function resetPassword({newPasswordValue, token}) {
    return api("/password-reset/reset", {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            password: newPasswordValue,
            token: token,
        }),
    });
}

function logout() {
    const refreshToken = localStorage.getItem("refreshToken");
    return api('/auth/logout', {
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
}


function refreshToken(token) {
    return api('/auth/token', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(
            {
                "token": token
            }
        )
    })
}


function updateUserInfo({valueName, valueEmail, valuePass}) {
    return api('/auth/user', {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            authorization: localStorage.getItem("accessToken"),
        },
        body: JSON.stringify(
            {
                'email': valueEmail,
                'password': valuePass,
                'name': valueName
            }
        )
    })
}
function getOrder(orderNumber) {
    return api(`/orders/${orderNumber}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
    })
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
    updateUserInfo,
    getOrder
};