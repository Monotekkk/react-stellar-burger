import { createStore, applyMiddleware } from "redux";
import { rootReducer } from "../reducers/index";
import { getIngredients } from "../../utils/api";
import thunk from "redux-thunk";
import { GET_INGRIDIENTS } from "../actions";
export const loadIngridients = store => dispatch => {
    getIngredients().then((res)=>{
        dispatch({type: GET_INGRIDIENTS, data: res.data});
    })
};
export const store = createStore(rootReducer, applyMiddleware(thunk));