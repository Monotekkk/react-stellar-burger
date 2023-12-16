import {GET_INGREDIENTS, SET_LOADING_CHECKED} from "../actions";
const initalState = {
    ingredientsList: [],
    isLoadingIngredientsList: false
}
export const ingredientsReducer = (state = initalState, action) => {
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
