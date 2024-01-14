export const ORDERS_FEED_CONNECT = 'ORDERS_FEED_CONNECT';
export const ORDERS_FEED_DISCONNECT = 'ORDERS_FEED_DISCONNECT';
export const ORDERS_FEED_CONNECTING = 'ORDERS_FEED_CONNECTING';
export const ORDERS_FEED_OPEN = 'ORDERS_FEED_OPEN';
export const ORDERS_FEED_CLOSE = 'ORDERS_FEED_CLOSE';
export const ORDERS_FEED_MESSAGE = 'ORDERS_FEED_MESSAGE';
export const ORDERS_FEED_ERROR = 'ORDERS_FEED_ERROR';
export const ORDERS_FEED_SEND_MESSAGE = 'ORDERS_FEED_SEND_MESSAGE';
export const connect = (url) => ({
    type: ORDERS_FEED_CONNECT,
    payload: url
})
export const disconnect = () => ({
    type: ORDERS_FEED_DISCONNECT,
});