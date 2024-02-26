import {SET_USER, SET_AUTH_CHECKED} from '../constants';
import {TUserReducer} from "../types/data";
import {TUserAction} from "../actions/userAction";

const initialState: TUserReducer = {
    user: null,
    isAuthChecked: false,
};

export const userReducer = (state = initialState, action: TUserAction) => {
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


