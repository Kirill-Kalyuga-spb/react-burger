import {
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_EXIT, 
    WS_GET_ORDERS
} from "../actionsTypes/ws";
import { TIngredient } from "../types/data";


export interface IWsConnectionStartAction {
    readonly type: typeof WS_CONNECTION_START;
    readonly payload: string;
}

export interface IWsConnectionErrorAction {
    readonly type: typeof WS_CONNECTION_ERROR;
}

export interface IWsConnectionSuccessAction {
    readonly type: typeof WS_CONNECTION_SUCCESS;
}

export interface IWsConnectionClosedAction {
    readonly type: typeof WS_CONNECTION_CLOSED;
}

export interface IWsGetOrdersAction {
    readonly type: typeof WS_GET_ORDERS;
    readonly payload: {total: number, totalToday: number, orders: Array<TIngredient>};
}

export interface IWsExitAction {
    readonly type: typeof WS_EXIT;
}

export type TWsActions = IWsConnectionStartAction
| IWsConnectionClosedAction
| IWsConnectionErrorAction
| IWsConnectionSuccessAction
| IWsGetOrdersAction
| IWsExitAction



export const wsConnectedAll = () => {
    return {type: WS_CONNECTION_START, payload: '/all'}
}

export const wsConnectedUser = (token: string) => {
    return {type: WS_CONNECTION_START, payload: `?token=${token}`}
}

export const wsConnectedExit = () => {
    return {type: WS_EXIT}
}