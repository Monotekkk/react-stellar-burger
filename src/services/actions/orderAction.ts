import {POST_ORDER__PENDING, POST_ORDER__REJECT, POST_ORDER__SUCCESS, SET_ORDER} from "../constants";
import {TOrderReducer} from "../types/data";

export interface ISetOrder{
  readonly type: typeof SET_ORDER,
    data: TOrderReducer
}
export interface IOrderPending{
    readonly type: typeof POST_ORDER__PENDING
}
export interface IOrderSuccess{
    readonly type: typeof POST_ORDER__SUCCESS,
}
export interface IOrderReject{
    readonly type: typeof POST_ORDER__REJECT,
}

export type     TOrderAction = IOrderPending | ISetOrder | IOrderSuccess | IOrderReject;