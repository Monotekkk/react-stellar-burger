import {CHECK_VIEW_INGREDIENT, CLEAR_VIEW_INGREDIENT} from "../constants";
import {TIngredients} from "../types/data";

export interface ICheckViewIngredient {
    readonly type: typeof CHECK_VIEW_INGREDIENT;
    data: TIngredients
}
export interface IClearViewIngredient {
    readonly type: typeof CLEAR_VIEW_INGREDIENT;
    data?:{}
}
export type TIngredientDetailsModalAction = ICheckViewIngredient | IClearViewIngredient;