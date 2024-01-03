import {createStore, applyMiddleware} from "redux";
import {rootReducer} from "../reducers/index";
import {
    forgotPassword,
    getIngredients,
    login,
    logout, refreshToken,
    registration,
    resetPassword,
    updateUserInfo
} from "../../utils/api";
import thunk from "redux-thunk";
import {GET_INGREDIENTS, SET_AUTH_CHECKED, SET_LOADING_CHECKED, SET_USER} from "../actions";

export const loadIngredients = (store) => dispatch => {
    dispatch({type: SET_LOADING_CHECKED, data: true});
    getIngredients().then((res) => {
        dispatch({type: GET_INGREDIENTS, data: res.data});
    })
        .catch(err => console.log(err))
        .finally(() => {
            dispatch({type: SET_LOADING_CHECKED, data: false});
        })
};
export const setToken = (data) => dispatch => {
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
}
export const forgotPasswordThunk = (data) => dispatch => {
    forgotPassword({"email": data.emailValue}).then(r => r.success === true && data.navigate('/reset-password', {state: data.location.pathname}))
        .catch(err => console.log(err));
}
export const loginThunk = (data) => dispatch => {
    login({
        'email': data.emailValue,
        'password': data.passwordValue,
    }).then(res => {
        dispatch({type: SET_AUTH_CHECKED, data: res.success});
        if (res.success) {
            const updateTokenInterval = setInterval(refreshTokenThunk, 1000);
            dispatch({type: SET_USER, data: res});
            dispatch(setToken(res));
        }
    }).catch(err => console.log(err));
}
export const updateUserInfoThunk = (data) => dispatch => {
    updateUserInfo(data).catch(err => console.log(err));
}
export const registrationThunk = (data, navigate) => dispatch => {
    registration(data)
        .then(r => {
            r.success && navigate('/login')
        })
        .catch(err => console.log(err));
}
export const resetPasswordThunk = (data) => dispatch => {
    resetPassword(data)
        .catch(err => console.log(err));
}
export const logOutThunk = () => dispatch => {
    dispatch(logout())
    clearInterval(updateTokenInterval)
    .catch(err => console.log(err));

}
export const refreshTokenThunk = () => {
    refreshToken(localStorage.getItem("refreshToken")).then(r => {
        localStorage.setItem("refreshToken", r.refreshToken);
    })
}
export const store = createStore(rootReducer, applyMiddleware(thunk));