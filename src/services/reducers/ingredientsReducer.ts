import {GET_INGREDIENTS, SET_LOADING_CHECKED} from "../constants";
import {TIngredientsAction} from "../actions/ingredientsAction";
import {TIngredientsReducer} from "../types/data";
const initalState:TIngredientsReducer = {
    ingredientsList: [],
    isLoadingIngredientsList: false
}
export const ingredientsReducer = (state = initalState, action:TIngredientsAction) => {
    switch (action.type) {
        case GET_INGREDIENTS:
            return {
                ...state,
                ingredientsList: action.data
            }
        case SET_LOADING_CHECKED:
            return {
                ...state,
                isLoadingIngredientsList: action.data
            }
        default:
            return state
    }

}
