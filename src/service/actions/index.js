import {logout, login, getUser} from "../../utils/api";

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const GET_INGREDIENTS = 'GET_INGREDIENTS';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENTS';
export const SET_ORDER = 'SET_ORDER';
export const CHECK_VIEW_INGREDIENT = 'CHECK_VIEW_INGREDIENT';
export const CLEAR_VIEW_INGREDIENT = 'CLEAR_VIEW_INGREDIENT';
export const MOVE_INGREDIENT = 'MOVE_INGREDIENT';
export const POST_ORDER__PENDING = 'POST_ORDER__PENDING';
export const POST_ORDER__SUCCESS = 'POST_ORDER__SUCCESS';
export const POST_ORDER__REJECT = 'POST_ORDER__REJECT';
export const SET_AUTH_CHECKED = "SET_AUTH_CHECKED";
export const SET_USER = "SET_USER";
export const setAuthChecked = (value) => ({
    type: SET_AUTH_CHECKED,
    payload: value,
});

export const setUser = (user) => ({
    type: SET_USER,
    payload: user,
});

export const getUserAction = () => {
    return (dispatch) => {
        return getUser().then((res) => {
            dispatch(setUser(res.user));
        });
    };
};

export const loginAction = () => {
    return (dispatch) => {
        return login().then((res) => {
            localStorage.setItem("accessToken", res.accessToken);
            localStorage.setItem("refreshToken", res.refreshToken);
            dispatch(setUser(res.user));
            dispatch(setAuthChecked(true));
        });
    };
};

export const checkUserAuth = () => {
    return (dispatch) => {
        if (localStorage.getItem("accessToken")) {
            dispatch(getUser())
                .catch(() => {
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("refreshToken");
                    dispatch(setUser(null));
                })
                .finally(() => dispatch(setAuthChecked(true)));
        } else {
            dispatch(setAuthChecked(true));
        }
    };
};


export const logoutAction = () => {
    return (dispatch) => {
        return logout().then(() => {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            dispatch(setUser(null));
        });
    };
};