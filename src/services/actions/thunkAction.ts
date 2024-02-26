import {
    forgotPassword,
    getIngredients, getOrder,
    login,
    logout, refreshToken,
    registration,
    resetPassword,
    updateUserInfo
} from "../../utils/api";
import {GET_INGREDIENTS, GET_SELECTED_ORDER, SET_AUTH_CHECKED, SET_LOADING_CHECKED, SET_USER} from "../constants";
import {AppDispatch} from "../stores";
import {TUser} from "../types/data";
import {string} from "prop-types";

export const loadIngredients = () => (dispatch: AppDispatch) => {
    dispatch({type: SET_LOADING_CHECKED, data: true});
    getIngredients().then((res) => {
        dispatch({type: GET_INGREDIENTS, data: res.data});
    })
        .catch(err => console.log(err))
        .finally(() => {
            dispatch({type: SET_LOADING_CHECKED, data: false});
        })
};
export const setToken = (data: { accessToken: string, refreshToken: string }) => (dispatch: AppDispatch) => {
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
}
export const forgotPasswordThunk = (data: {
    emailValue: string,
    location: { pathname: string },
    navigate: (to: string, from: { state: string }) => void
}) => (dispatch: AppDispatch) => {
    const email:string = data.emailValue;
    forgotPassword({'email': email}).then(r => r.success === true && data.navigate('/reset-password', {state: data.location.pathname}))
        .catch(err => console.log(err));
}
export const loginThunk = (data: { emailValue: string, passwordValue: string }) => (dispatch: AppDispatch) => {
    login({
        'email': data.emailValue,
        'password': data.passwordValue,
    }).then(res => {
        dispatch({type: SET_AUTH_CHECKED, data: res.success});
        if (res.success) {
            dispatch({type: SET_USER, data: res});
            dispatch(setToken(res));
        }
    }).catch(err => console.log(err));
}
export const updateUserInfoThunk = (data: TUser) => (dispatch: AppDispatch) => {
    console.log(data);
    updateUserInfo(data)
        .then()
        .catch(err => console.log(err));
}
export const registrationThunk = (data: TUser, navigate:(to: string)=>void) => (dispatch: AppDispatch) => {
    console.log(data, navigate);
    registration(data)
        .then(r => {
            r.success && navigate('/login')
        })
        .catch(err => console.log(err));
}
export const resetPasswordThunk = (data:{
    "newPasswordValue": string,
        "token": string
}) => (dispatch:AppDispatch) => {
    resetPassword(data)
        .catch(err => console.log(err));
}
export const logOutThunk = () => (dispatch: AppDispatch) => {
    logout()
        .then(r => {
            if (r.success) {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                dispatch({type: SET_USER, data: null});
            }

        })
        .catch(err => console.log(err));

}
export const refreshTokenThunk = () => {
    const token = localStorage.getItem("refreshToken");
    refreshToken(token!).then(r => {
        localStorage.setItem("refreshToken", r.refreshToken);
    })
}

export const getOrderThunk = (number: string) => (dispatch: AppDispatch) => {
    getOrder(number!)
        .then(r => {
            if (r.success) {
                dispatch({type: GET_SELECTED_ORDER, payload: r.orders})
            }
        })
        .catch(err => console.log(err));
}