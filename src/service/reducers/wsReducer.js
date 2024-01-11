import {
    WebsocketStatus
} from '../../utils/orders';
import {
    ORDERS_FEED_CLOSE,
    ORDERS_FEED_CONNECT,
    ORDERS_FEED_CONNECTING,
    ORDERS_FEED_ERROR, ORDERS_FEED_MESSAGE,
    ORDERS_FEED_OPEN
} from '../actions/wsActionTypes';

const initialState = {
    status: WebsocketStatus.OFFLINE,
    orders: [],
    connectingError: ''
};

export const wsReducer = (state = initialState, action) => {
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
            return {
                ...state,
                status: action.payload
            }
        case ORDERS_FEED_MESSAGE:
            return {
                ...state,
                orders: action.payload
            }
        default:
            return state;
    }
};