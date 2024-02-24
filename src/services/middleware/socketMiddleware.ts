import {Middleware} from "redux";
import {
    ORDERS_FEED_CLOSE,
    ORDERS_FEED_CONNECT,
    ORDERS_FEED_CONNECTING,
    ORDERS_FEED_DISCONNECT, ORDERS_FEED_ERROR, ORDERS_FEED_MESSAGE, ORDERS_FEED_OPEN,
    ORDERS_FEED_SEND_MESSAGE
} from "../constants/wsConstants";

export type ActionsType = {
    wsConnect: typeof ORDERS_FEED_CONNECT,
    wsDisconnect: typeof ORDERS_FEED_DISCONNECT,
    wsConnecting: typeof ORDERS_FEED_CONNECTING,
    wsSendMessage: typeof ORDERS_FEED_SEND_MESSAGE,
    onOpen: typeof ORDERS_FEED_OPEN,
    onClose: typeof ORDERS_FEED_CLOSE,
    onError: typeof ORDERS_FEED_ERROR,
    onMessage: typeof ORDERS_FEED_MESSAGE
}
export const socketMiddleware = (wsActions: ActionsType): Middleware => {
    return store => {
        let socket: null | WebSocket = null;
        return next => action => {
            const {dispatch} = store;
            const {type, payload} = action;
            const {
                wsConnect,
                wsSendMessage,
                onOpen,
                onClose,
                onError,
                onMessage,
                wsConnecting,
                wsDisconnect,
            } = wsActions;
            if (type === wsConnect) {
                socket = new WebSocket(payload);
                dispatch({type: wsConnecting});
            }

            if (socket) {
                socket.onopen = () => {
                    dispatch({type: onOpen});
                };

                socket.onerror = () => {
                    dispatch({type: onError, payload: 'Error'});
                };

                socket.onmessage = event => {
                    const {data} = event;
                    const parsedData = JSON.parse(data);
                    if (parsedData.message === 'Invalid or missing token') {
                        dispatch({type: onError, payload: parsedData.message})
                    } else {
                        dispatch({type: onMessage, payload: parsedData});
                    }
                };

                socket.onclose = () => {
                    dispatch({type: onClose});
                };

                if (type === wsSendMessage) {
                    socket.send(JSON.stringify(action.payload));
                }

                if (type === wsDisconnect) {
                    socket.close();
                    socket = null;
                }
            }

            next(action);
        };
    };
};