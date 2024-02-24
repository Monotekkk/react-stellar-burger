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
import {TWsReducer} from "../types/data";

const initialState:TWsReducer = {
    status: WebsocketStatus.OFFLINE,
    orders: [],
    connectingError: '',
    selectedMessage: []
};
export const wsReducer = (state = initialState, action:TWsAction) => {
    switch (action.type) {
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
            console.log(action.payload);
            return {
                ...state,
                status: action.payload
            }
        case ORDERS_FEED_MESSAGE:
            return {
                ...state,
                orders: action.payload
            }
        case GET_SELECTED_ORDER:
            return {
                ...state,
                selectedMessage: action.payload
            }
        default:
            return state;
    }
};