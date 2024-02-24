import {ORDERS_FEED_CONNECT, ORDERS_FEED_DISCONNECT} from "../constants/wsConstants";

export const connect = (url:string) => ({
    type: ORDERS_FEED_CONNECT,
    payload: url
})
export const disconnect = () => ({
    type: ORDERS_FEED_DISCONNECT,
});