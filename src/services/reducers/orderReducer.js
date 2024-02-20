import {POST_ORDER__PENDING, POST_ORDER__REJECT, POST_ORDER__SUCCESS, SET_ORDER} from "../constants";

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
        case  POST_ORDER__PENDING:
            return {
                ...state,
                order: {
                    ...state.order,
                    'success': 'loading'
                }
            }

        case POST_ORDER__SUCCESS:
            return {
                ...state,
                order: {
                    ...state.order,
                    'success': true
                }
            }

        case POST_ORDER__REJECT:
            return {
                ...state,
                order: {
                    ...state.order,
                    'success': false
                }
            }

        default:
            return state
    }
}
