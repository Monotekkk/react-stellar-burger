export const socketMiddleware = wsUrl => {
    return store => {
        let socket = null;

        return next => action => {
            const {dispatch} = store;
            const {type, payload} = action;
            let accessToken = null;
            if (type === 'WS_CONNECTION_START') {
                if (localStorage.accessToken){
                    accessToken = localStorage.accessToken.split('Bearer ')[1];
                }
                if (payload.status){
                    socket = new WebSocket(`${wsUrl}/orders?token=${accessToken}`);
                } else {
                    socket = new WebSocket(`${wsUrl}/orders/all`);
                }
            }
            if (type === 'WS_CONNECTION_CLOSE'){
                if (socket){
                    socket.close(1000, "работа закончена");
                    socket = null;
                }
            }
            if (socket) {
                // функция, которая вызывается при открытии сокета
                socket.onopen = event => {
                    dispatch({type: 'WS_CONNECTION_SUCCESS', payload: event});
                };

                // функция, которая вызывается при ошибке соединения
                socket.onerror = event => {
                    dispatch({type: 'WS_CONNECTION_ERROR', payload: event});
                };

                // функция, которая вызывается при получении события от сервера
                socket.onmessage = event => {
                    const {data} = event;
                    dispatch({type: 'WS_GET_MESSAGE', payload: JSON.parse(data)});
                };
                // функция, которая вызывается при закрытии соединения
                socket.onclose = event => {
                    dispatch({type: 'WS_CONNECTION_CLOSED', payload: event});
                };

                if (type === 'WS_SEND_MESSAGE') {
                    const message = payload;
                    // функция для отправки сообщения на сервер
                    socket.send(JSON.stringify(message));
                }
            }

            next(action);
        };
    };
};