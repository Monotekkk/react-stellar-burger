import {
    ORDERS_FEED_CLOSE,
    ORDERS_FEED_CONNECTING,
    ORDERS_FEED_ERROR,
    ORDERS_FEED_MESSAGE,
    ORDERS_FEED_OPEN
} from "../constants/wsConstants";
import {GET_SELECTED_ORDER} from "../constants";
import {TOrders} from "../types/data";

interface IFeedConnecting {
    readonly type: typeof ORDERS_FEED_CONNECTING
}
interface IFeedOpen {
    readonly type: typeof ORDERS_FEED_OPEN
}
interface IFeedClose {
    readonly type: typeof ORDERS_FEED_CLOSE
}
interface IFeedError {
    readonly type: typeof ORDERS_FEED_ERROR
    payload: any
}
interface IFeedMessage {
    readonly type: typeof ORDERS_FEED_MESSAGE
    payload: {
        orders:  [] | {
            success: boolean,
            orders: TOrders[],
            total: number,
            totalToday: number
        }
    }
}
interface IFeedGetSelected {
    readonly type: typeof GET_SELECTED_ORDER
    payload: {
        selectedMessage: any,
    }
}
export type TWsAction = IFeedClose | IFeedError | IFeedConnecting | IFeedOpen | IFeedGetSelected | IFeedMessage