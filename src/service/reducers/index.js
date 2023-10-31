import {
    combineReducers
} from 'redux';
import {orderReducer} from "./orderReducer";
import {ingredientsReducer} from "./ingredientsReducer";
import {constructorReducer} from "./constructorReducer";
import {ingredientDetailsModalReducer} from "./ingredientDetailsModalReducer";
export const rootReducer = combineReducers({
    ingredientsList: ingredientsReducer,
    selectedIngredientsList: constructorReducer,
    ingredientsDetailModal: ingredientDetailsModalReducer,
    order: orderReducer,
});