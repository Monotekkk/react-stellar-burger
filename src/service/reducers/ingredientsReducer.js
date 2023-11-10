import {GET_INGREDIENTS} from "../actions";
const initalState = {
    ingredientsList: []
}
export const ingredientsReducer = (state = initalState, action) => {
    switch (action.type) {
        case GET_INGREDIENTS:
            return {
                ...state,
                ingredientsList: action.data
            }
        default:
            return state
    }

}
