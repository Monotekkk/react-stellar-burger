import {
    ORDERS_FEED_CLOSE,
    ORDERS_FEED_CONNECTING,
    ORDERS_FEED_ERROR,
    ORDERS_FEED_MESSAGE,
    ORDERS_FEED_OPEN
} from "../constants/wsConstants";
import {GET_SELECTED_ORDER} from "../constants";
import {TMyOrders, TOrders} from "../types/data";

interface IFeedConnecting {
    readonly type: typeof ORDERS_FEED_CONNECTING
    payload?: string
}

interface IFeedOpen {
    readonly type: typeof ORDERS_FEED_OPEN
    payload?: string
}

interface IFeedClose {
    readonly type: typeof ORDERS_FEED_CLOSE
    payload?: string
}

interface IFeedError {
    readonly type: typeof ORDERS_FEED_ERROR
    payload: string
}

interface IFeedMessage {
    readonly type: typeof ORDERS_FEED_MESSAGE
    payload: {
        success: boolean,
        orders: TOrders[],
        total: number,
        totalToday: number
    }
}

interface IFeedGetSelected {
    readonly type: typeof GET_SELECTED_ORDER
    payload: TOrders[] | TMyOrders[],

}

// export type TWsAction = IFeedClose | IFeedError | IFeedConnecting | IFeedOpen | IFeedGetSelected | IFeedMessage
export type TWsAction = IFeedConnecting | IFeedOpen | IFeedClose | IFeedError | IFeedMessage | IFeedGetSelected