import {ADD_INGREDIENT, CLEAR_CONSTRUCTOR, DELETE_INGREDIENT, MOVE_INGREDIENT} from "../constants";
import {TIngredients} from "../types/data";

export interface IAddIngredient {
    readonly type: typeof ADD_INGREDIENT;
    readonly selectedIngredientsList: Array<TIngredients>
    data: TIngredients
}

export interface ICLearConstructor {
    readonly type: typeof CLEAR_CONSTRUCTOR
    data: TIngredients
}

export interface IDeleteIngredient {
    readonly type: typeof DELETE_INGREDIENT;
    selectedIngredientsList: Array<TIngredients> | null
    data: number
}

export interface IMoveIngredient {
    readonly type: typeof MOVE_INGREDIENT;
    selectedIngredient: number
    data: { hoverIndex: number, dragIndex: number }
}

export type TConstructorAction = IAddIngredient | ICLearConstructor | IDeleteIngredient | IMoveIngredient;
