import {createStore, applyMiddleware} from "redux";
import {rootReducer} from "../reducers/index";
import {getIngredients} from "../../utils/api";
import thunk from "redux-thunk";
import {GET_INGREDIENTS, SET_LOADING_CHECKED} from "../actions";

export const loadIngridients = store => dispatch => {
    dispatch({type: SET_LOADING_CHECKED, data: true});
    getIngredients().then((res) => {
        dispatch({type: GET_INGREDIENTS, data: res.data});
    })
        .catch(err => console.log(err))
        .finally(() => {
            dispatch({type: SET_LOADING_CHECKED, data: false});
        })
};
export const store = createStore(rootReducer, applyMiddleware(thunk));