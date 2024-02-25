import {SET_AUTH_CHECKED, SET_USER} from "../services/constants";
import {TUser} from "../services/types/data";
import {AppDispatch} from "../services/stores";

const baseURL = "https://norma.nomoreparties.space/api";

async function api(route: string, params?: {
    method: string,
    headers?: { [name: string]: string | null },
    body?: { 'ingredients': string[] } | string
}) {
    const url = `${baseURL}${route}`,
        options = {
            method: params?.method || "GET",
            headers: params?.headers,
            body: params?.body,
        };

    // @ts-ignore
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

function postIngredients(body: string) {
    console.log(body);
    return api('/orders', {
        method: 'POST',
        body: body,
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            authorization: localStorage.getItem("accessToken")!
        },
    });
}

function registration({valuePass, valueName, valueEmail}: TUser) {
    return api('/auth/register', {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            'email': valueEmail,
            'password': valuePass,
            'name': valueName,
        }),

    })
}

function login(data:{email: string, password: string}) {
    return api('/auth/login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(data)
    })
}

function getUser() {
    const token = localStorage.getItem('accessToken');
    return api('/auth/user', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            authorization: token,
        },
    })
}

function checkUserAuth() {
    return (dispatch: AppDispatch) => {
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

function forgotPassword(email: { email: string }) {
    return api("/password-reset", {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(email),
    });
}

function resetPassword({newPasswordValue, token}:{newPasswordValue:string, token:string}) {
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


function refreshToken(token:string) {
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


function updateUserInfo({valueName, valueEmail, valuePass} : TUser) {
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

function getOrder(number: string | undefined) {
    return api(`/orders/${number}`, {
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