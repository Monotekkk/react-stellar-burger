export function constructorReducer(state, action) {
    switch (action.type) {
        case "ADD_INGREDIENT":
            if (action.payload.type === "bun") {
                return {...state, bun: action.payload}
            } else {
                return {...state, ingredients: [...state.ingredients, action.payload]}
            }
        default:
            throw new Error(`Wrong type of action: ${action.type}`);
    }
}