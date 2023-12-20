import {applyMiddleware, compose, createStore} from "redux";
import {rootReducer} from "./reducers";
import {socketMiddleware} from "./middleware/socketMiddleware";
import thunkMiddleware from 'redux-thunk';
import {
    WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR,
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS, WS_GET_MESSAGE,
    WS_SEND_MESSAGE
} from "./actions/wsActionTypes";
const wsUrl = 'wss://norma.nomoreparties.space/orders/all';
const wsActions = {
    wsInit: WS_CONNECTION_START,
    wsSendMessage: WS_SEND_MESSAGE,
    onOpen: WS_CONNECTION_SUCCESS,
    onClose: WS_CONNECTION_CLOSED,
    onError: WS_CONNECTION_ERROR,
    onMessage: WS_GET_MESSAGE
};
export const store = createStore(rootReducer,
    compose(applyMiddleware(thunkMiddleware, socketMiddleware(wsUrl, wsActions))),
);