import {ADD_INGRIDIENT, DELETE_INGRIDIENTS, MOVE_INGRIDIENTS} from "../actions";
const initialState = {
    selectedIngredientsList: [],
}
export const constructorReducer = (state = initialState, action) => {
    const {
        data,
        type
    } = action;
    switch (type) {
        case ADD_INGRIDIENT:
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
        case DELETE_INGRIDIENTS:
            return {
                ...state,
                selectedIngredientsList: [...state.selectedIngredientsList.slice(0, data), ...state.selectedIngredientsList.slice(data + 1)]
            }
        case MOVE_INGRIDIENTS:
            const ingredients = [...state.selectedIngredientsList];
            ingredients.splice(data.hoverIndex, 0, ingredients.splice(data.dragIndex, 1)[0]);
            return {
                ...state,
                selectedIngredientsList: [...ingredients]
            }
        default:
            return state
    }
}