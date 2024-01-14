import {applyMiddleware, compose, createStore} from "redux";
import {rootReducer} from "./reducers";
import {socketFeedMiddleware} from "./middleware/socketFeedMiddleware";
import thunkMiddleware from 'redux-thunk';
import {
    ORDERS_FEED_CLOSE,
    ORDERS_FEED_CONNECT,
    ORDERS_FEED_CONNECTING,
    ORDERS_FEED_DISCONNECT, ORDERS_FEED_ERROR, ORDERS_FEED_MESSAGE,
    ORDERS_FEED_OPEN, ORDERS_FEED_SEND_MESSAGE
} from "./actions/wsActionTypes";
const ordersMiddleware = socketFeedMiddleware({
    wsConnect: ORDERS_FEED_CONNECT,
    wsDisconnect: ORDERS_FEED_DISCONNECT,
    wsConnecting: ORDERS_FEED_CONNECTING,
    wsSendMessage: ORDERS_FEED_SEND_MESSAGE,
    onOpen: ORDERS_FEED_OPEN,
    onClose: ORDERS_FEED_CLOSE,
    onError: ORDERS_FEED_ERROR,
    onMessage: ORDERS_FEED_MESSAGE
});
export const store = createStore(rootReducer,
    compose(applyMiddleware(thunkMiddleware, ordersMiddleware)),
);