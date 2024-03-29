import {rootReducer} from "../reducers";
import {configureStore} from "@reduxjs/toolkit";
import {
    ORDERS_FEED_CLOSE,
    ORDERS_FEED_CONNECT,
    ORDERS_FEED_CONNECTING,
    ORDERS_FEED_DISCONNECT, ORDERS_FEED_ERROR, ORDERS_FEED_MESSAGE,
    ORDERS_FEED_OPEN, ORDERS_FEED_SEND_MESSAGE
} from "../constants/wsConstants";
import {socketMiddleware} from "../middleware/socketMiddleware";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
const ordersMiddleware = socketMiddleware({
    wsConnect: ORDERS_FEED_CONNECT,
    wsDisconnect: ORDERS_FEED_DISCONNECT,
    wsConnecting: ORDERS_FEED_CONNECTING,
    wsSendMessage: ORDERS_FEED_SEND_MESSAGE,
    onOpen: ORDERS_FEED_OPEN,
    onClose: ORDERS_FEED_CLOSE,
    onError: ORDERS_FEED_ERROR,
    onMessage: ORDERS_FEED_MESSAGE
});
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(ordersMiddleware)

})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
