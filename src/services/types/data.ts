export type TIngredients = {
    calories: number,
    carbohydrates: number,
    fat: number,
    image: string,
    image_large: string,
    image_mobile: string,
    name: string,
    price: number,
    proteins: number,
    type: string,
    _id: string,
    __v: number,
    find: {}
}
export type TOrders = {
    createdAt: string,
    ingredients: string[],
    name: string,
    number: number,
    status: string,
    updatedAt: string,
    _id: string
}
export type TConstructorReducer = {
    selectedIngredientsList: TIngredients[] | null;
}
export type TIngredientDetailsModalReducer = {
    viewedIngredients: TIngredients | {}
}
export type TIngredientsReducer = {
    ingredientsList: TIngredients[],
    isLoadingIngredientsList: boolean
}
export type TOrderReducer = {
    orderInfo: {
        "success": boolean | string,
        "name": string,
        "order": {
            "number": string
        } | null
    }
}