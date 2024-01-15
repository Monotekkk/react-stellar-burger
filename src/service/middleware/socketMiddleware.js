export const socketMiddleware = (wsActions) => {
    return store => {
        let socket = null;
        return next => action => {
            const { dispatch } = store;
            const { type, payload } = action;
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
                    dispatch({ type: onOpen });
                };

                socket.onerror = () => {
                    dispatch({ type: onError, payload: 'Error' });
                };

                socket.onmessage = event => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);
                    if (parsedData.message === 'Invalid or missing token'){
                        dispatch({type: onError, payload: parsedData.message})
                    }else {
                        dispatch({ type: onMessage, payload: parsedData });
                    }
                };

                socket.onclose = () => {
                    dispatch({ type: onClose });
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