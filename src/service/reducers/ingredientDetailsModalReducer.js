import {CHECK_VIEWE_INGRIDIENTS, CLEAR_VIEWE_INGRIDIENTS} from "../actions";
const initialState = {
    viewedIngridients: {},
}
export const ingredientDetailsModalReducer = (state = initialState, action) => {
    const {
        data,
        type
    } = action;
    switch (type) {
        case CHECK_VIEWE_INGRIDIENTS:
            return {
                ...state,
                viewedIngridients: data
            }
        case CLEAR_VIEWE_INGRIDIENTS:
            return {
                ...state,
                viewedIngridients: {}
            }

        default:
            return state;
    }
}