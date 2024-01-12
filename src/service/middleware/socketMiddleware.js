import {
    ORDERS_FEED_CLOSE,
    ORDERS_FEED_CONNECT,
    ORDERS_FEED_CONNECTING, ORDERS_FEED_DISCONNECT,
    ORDERS_FEED_ERROR, ORDERS_FEED_MESSAGE,
    ORDERS_FEED_OPEN
} from "../actions/wsActionTypes";

export const socketMiddleware = (wsActions) => {
    return store => {
        let socket = null;
        return next => action => {
            const { dispatch } = store;
            const { type, payload } = action;
            if (type === ORDERS_FEED_CONNECT) {
                socket = new WebSocket(payload);
                dispatch({type: ORDERS_FEED_CONNECTING});
            }

            if (socket) {
                socket.onopen = () => {
                    dispatch({ type: ORDERS_FEED_OPEN });
                };

                socket.onerror = () => {
                    dispatch({ type: ORDERS_FEED_ERROR, payload: 'Error' });
                };

                socket.onmessage = event => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);
                    dispatch({ type: ORDERS_FEED_MESSAGE, payload: parsedData });
                };

                socket.onclose = () => {
                    dispatch({ type: ORDERS_FEED_CLOSE });
                };

                if (type === ORDERS_FEED_MESSAGE) {
                    socket.send(JSON.stringify(action.payload));
                }

                if (type === ORDERS_FEED_DISCONNECT) {
                    socket.close();
                    socket = null;
                }
            }

            next(action);
        };
    };
};