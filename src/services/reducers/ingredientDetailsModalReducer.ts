import {CHECK_VIEW_INGREDIENT, CLEAR_VIEW_INGREDIENT} from "../constants";
import {TIngredientDetailsModalReducer} from "../types/data";
import {TIngredientDetailsModalAction} from "../actions/ingredientDetailsModalActions";
const initialState:TIngredientDetailsModalReducer = {
    viewedIngredients: {},
}
export const ingredientDetailsModalReducer = (state = initialState, action:TIngredientDetailsModalAction) => {
    const {
        data,
        type
    } = action;
    switch (type) {
        case CHECK_VIEW_INGREDIENT:
            return {
                ...state,
                viewedIngredients: data
            }
        case CLEAR_VIEW_INGREDIENT:
            return {
                ...state,
                viewedIngredients: {}
            }

        default:
            return state;
    }
}