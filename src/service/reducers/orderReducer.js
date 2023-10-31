import {SET_ORDER} from "../actions";
const initalState = {
    order: {
        "success": true,
        "name": "Краторный бургер",
        "order": {
            "number": '0000'
        }
    }
}
export const orderReducer = (state = initalState, action) => {
    switch (action.type) {
        case SET_ORDER:
            return {
                ...state,
                order: action.data,
            }
        default:
            return {
                ...state
            }
    }
}
