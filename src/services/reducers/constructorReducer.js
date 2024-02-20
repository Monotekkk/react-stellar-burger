import {ADD_INGREDIENT, CLEAR_CONSTRUCTOR, DELETE_INGREDIENT, MOVE_INGREDIENT} from "../constants";
const initialState = {
    selectedIngredientsList: []
}
export const constructorReducer = (state = initialState, action) => {
    const {
        data,
        type
    } = action;
    switch (type) {
        case ADD_INGREDIENT:
            if (data.type === 'bun') {
                return {
                    ...state,
                    selectedIngredientsList: [data, ...state.selectedIngredientsList.filter(item => item.type !== 'bun')]
                }
            }
            return {
                ...state,
                selectedIngredientsList: [...state.selectedIngredientsList, data],
            }
        case DELETE_INGREDIENT:
            return {
                ...state,
                selectedIngredientsList: [...state.selectedIngredientsList.slice(0, data), ...state.selectedIngredientsList.slice(data + 1)]
            }
        case MOVE_INGREDIENT:
            const ingredients = [...state.selectedIngredientsList];
            ingredients.splice(data.hoverIndex, 0, ingredients.splice(data.dragIndex, 1)[0]);
            return {
                ...state,
                selectedIngredientsList: [...ingredients]
            }
        case CLEAR_CONSTRUCTOR:
            return {
                ...state,
                selectedIngredientsList: [ ]
            }
        default:
            return state
    }
}