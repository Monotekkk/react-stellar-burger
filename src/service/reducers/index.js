import {
    combineReducers, compose
} from 'redux';
import {
    ADD_INGRIDIENTS,
    CHECK_VIEWE_INGRIDIENTS,
    CLEAR_VIEWE_INGRIDIENTS,
    GET_INGRIDIENTS,
    SET_ORDER,
    DELETE_INGRIDIENTS,
    MOVE_INGRIDIENTS
} from '../actions/index';

const initialState = {
    ingredientsList: [],
    selectedIngridientsList: [{
        "_id": "643d69a5c3f7b9001cfa093c",
        "name": "Краторная булка N-200i",
        "type": "bun",
        "proteins": 80,
        "fat": 24,
        "carbohydrates": 53,
        "calories": 420,
        "price": 1255,
        "image": "https://code.s3.yandex.net/react/code/bun-02.png",
        "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
        "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
        "__v": 0
    }],
    viewedIngridients: {},
    order: {
        "success": true,
        "name": "Краторный бургер",
        "order": {
            "number": '0000'
        }
    }
}
const burgerConstructor = (state = initialState, action) => {
    const {
        data,
        type
    } = action;
    switch (type) {
        case ADD_INGRIDIENTS:
            if (data.type === 'bun') {
                return {
                    ...state,
                    selectedIngridientsList: [data, ...state.selectedIngridientsList.filter(item => item.type !== 'bun')]
                }
            } else if(!data.index){
                return {
                    ...state,
                    selectedIngridientsList: [...state.selectedIngridientsList, data],
                }
            } else {
                return state
            }
            


        case GET_INGRIDIENTS:
            return {
                ...state,
                ingredientsList: data
            }
        case SET_ORDER:
            return {
                ...state,
                order: data,
            }
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
        case DELETE_INGRIDIENTS:
            return {
                ...state,
                selectedIngridientsList: [...state.selectedIngridientsList.slice(0, data), ...state.selectedIngridientsList.slice(data + 1)]
            }
        case MOVE_INGRIDIENTS:
            const ingredients = [...state.selectedIngridientsList];
            ingredients.splice(data.dragIndex, 0, ingredients.splice(data.hoverIndex, 1)[0]);
            return{
                ...state,
                selectedIngridientsList:[...ingredients]
            }
            
        default:
            return state;
    }
}
export const rootReducer = combineReducers({
    burgerConstructor
})