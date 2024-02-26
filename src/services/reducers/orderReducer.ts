import {POST_ORDER__PENDING, POST_ORDER__REJECT, POST_ORDER__SUCCESS, SET_ORDER} from "../constants";
import {TOrderReducer} from "../types/data";
import {TOrderAction} from "../actions/orderAction";

const initalState:TOrderReducer = {
    orderInfo:{
        "success": true,
        "name": "Краторный бургер",
        "order": {
            "number": '0000'
        }
    }
}
export const orderReducer = (state = initalState, action:TOrderAction) => {
    switch (action.type) {
        case SET_ORDER:
            console.log(action);
            return {
                ...state,
                orderInfo: action.data,
            }
        case  POST_ORDER__PENDING:
            console.log(action);
            return {
                ...state,
                orderInfo: {
                    ...state.orderInfo,
                    'success': 'loading'
                }
            }

        case POST_ORDER__SUCCESS:
            console.log(action);
            return {
                ...state,
                orderInfo: {
                    ...state.orderInfo,
                    'success': true
                }
            }

        case POST_ORDER__REJECT:
            console.log(action);
            return {
                ...state,
                orderInfo: {
                    ...state.orderInfo,
                    'success': false
                }
            }

        default:
            return state
    }
}
