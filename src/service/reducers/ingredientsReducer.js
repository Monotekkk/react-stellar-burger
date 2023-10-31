import {GET_INGRIDIENTS} from "../actions";
const initalState = {
    ingredientsList: []
}
export const ingredientsReducer = (state = initalState, action) => {
    switch (action.type) {
        case GET_INGRIDIENTS:
            return {
                ...state,
                ingredientsList: action.data
            }
        default:
            return state
    }

}
