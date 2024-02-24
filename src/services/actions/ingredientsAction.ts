import {GET_INGREDIENTS, SET_LOADING_CHECKED} from "../constants";
import {TIngredients} from "../types/data";

export interface IGetIngredients {
    readonly type: typeof GET_INGREDIENTS
    data: Array<TIngredients>
}
export interface ISetLoadCheck{
    readonly type: typeof SET_LOADING_CHECKED
    data: boolean
}

export type TIngredientsAction = IGetIngredients | ISetLoadCheck;