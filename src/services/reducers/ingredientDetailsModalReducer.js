import {CHECK_VIEW_INGREDIENT, CLEAR_VIEW_INGREDIENT} from "../constants";
const initialState = {
    viewedIngridients: {},
}
export const ingredientDetailsModalReducer = (state = initialState, action) => {
    const {
        data,
        type
    } = action;
    switch (type) {
        case CHECK_VIEW_INGREDIENT:
            return {
                ...state,
                viewedIngridients: data
            }
        case CLEAR_VIEW_INGREDIENT:
            return {
                ...state,
                viewedIngridients: {}
            }

        default:
            return state;
    }
}