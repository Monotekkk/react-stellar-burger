import {SET_USER, SET_AUTH_CHECKED} from '../actions/index';

const initialState = {
    user: null,
    isAuthChecked: false,

};

export const userReducer = (state = initialState, action) => {
    const {data, type} = action;
    switch (type) {
        case SET_AUTH_CHECKED:
            return {
                ...state,
                isAuthChecked: data
            }
        case SET_USER:
            return {
                ...state,
                user: data
            }
        default:
            return state;
    }

};


