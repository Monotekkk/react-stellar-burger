import {
    WebsocketStatus
} from '../../utils/orders';
import {
    ORDERS_FEED_CLOSE,
    ORDERS_FEED_CONNECTING,
    ORDERS_FEED_ERROR, ORDERS_FEED_MESSAGE,
    ORDERS_FEED_OPEN
} from '../constants/wsConstants';
import {GET_SELECTED_ORDER} from "../constants";
import {TWsAction} from "../actions/wsReducer";
import {TOrders, TWsReducer} from "../types/data";

const initialState: TWsReducer = {
    status: WebsocketStatus.OFFLINE,
    orders: {
        success: false,
        orders: [],
        total: 0,
        totalToday: 0
    },
    connectingError: '',
    selectedMessage: []
};
export const wsReducer = (state = initialState, action: TWsAction) => {
    const {payload, type} = action;
    switch (type) {
        case ORDERS_FEED_CONNECTING:
            return {
                ...state,
                status: WebsocketStatus.CONNECTING
            }
        case ORDERS_FEED_OPEN:
            return {
                ...state,
                status: WebsocketStatus.OPEN
            }
        case ORDERS_FEED_CLOSE:
            return {
                ...state,
                status: WebsocketStatus.CLOSE
            }
        case ORDERS_FEED_ERROR:
            return {
                ...state,
                status: payload
            }
        case ORDERS_FEED_MESSAGE:
            return {
                ...state,
                orders: payload
            }
        case GET_SELECTED_ORDER:
            return {
                ...state,
                selectedMessage: payload
            }
        default:
            return state;
    }
};