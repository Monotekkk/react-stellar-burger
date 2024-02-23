import {ADD_INGREDIENT, CLEAR_CONSTRUCTOR, DELETE_INGREDIENT, MOVE_INGREDIENT} from "../constants";
import {TIngredients} from "../types/data";

export interface IAddIngredient {
    readonly type: typeof ADD_INGREDIENT;
    readonly selectedIngredientsList: Array<TIngredients>
}

export interface ICLearConstructor {
    readonly type: typeof CLEAR_CONSTRUCTOR
}

export interface IDeleteIngredient {
    readonly type: typeof DELETE_INGREDIENT;
    selectedIngredientsList: Array<TIngredients> | null
}

export interface IMoveIngredient {
    readonly type: typeof MOVE_INGREDIENT;
    selectedIngredient: number
}

export type TConstructorAction = IAddIngredient | ICLearConstructor | IDeleteIngredient | IMoveIngredient;
