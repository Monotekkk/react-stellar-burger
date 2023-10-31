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
                selectedIngridientsList: [...state.selectedIngridientsList, data],
            }
        case DELETE_INGRIDIENTS:
            return {
                ...state,
                selectedIngridientsList: [...state.selectedIngridientsList.slice(0, data), ...state.selectedIngridientsList.slice(data + 1)]
            }
        case MOVE_INGRIDIENTS:
            const ingredients = [...state.selectedIngridientsList];
            ingredients.splice(data.hoverIndex, 0, ingredients.splice(data.dragIndex, 1)[0]);
            return {
                ...state,
                selectedIngridientsList: [...ingredients]
            }
        default:
            return state
    }
}