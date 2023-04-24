import { apiUrl } from "../../utils/constants"
import { checkResponse } from "../../utils/utility-function"
import { v4 as uuidv4 } from 'uuid';
import { AppDispatch } from "../types";
import { TIngredient, TToken } from "../types/data";
import {
    ADD_INGR,
    ADD_BUN,
    REMOVE_INGR,
    HOVER_INGR,
    POST_ORDER_REQUEST,
    POST_ORDER_SUCCESS,
    POST_ORDER_FAILED
} from "../actionsTypes/cart";

export interface IAddIngreAction {
    readonly type: typeof ADD_INGR;
    readonly ingr: TIngredient;
}

export interface IAddBunAction {
    readonly type: typeof ADD_BUN;
    readonly ingr: TIngredient;
}

export const addIngreAction = (ingredient: TIngredient): IAddIngreAction => ({
    type: ADD_INGR,
    ingr: ingredient
});

export const addBunAction = (ingredient: TIngredient): IAddBunAction => ({
    type: ADD_BUN,
    ingr: ingredient
});



export interface IRemoveIngrAction {
    readonly type: typeof REMOVE_INGR;
    readonly index: number;
}

export interface IHoverIngrAction {
    readonly type: typeof HOVER_INGR;
    readonly index: number;
    readonly indexDrop: number;
}

export const removeIngrAction = (index: number): IRemoveIngrAction => ({
    type: REMOVE_INGR,
    index: index
});

export const hoverIngrAction = (indexItem: number, index: number): IHoverIngrAction => ({
    type: HOVER_INGR,
    index: indexItem, 
    indexDrop: index
});





export interface IPostOrderAction {
    readonly type: typeof POST_ORDER_REQUEST;
}

export interface IPostOrderFailedAction {
    readonly type: typeof POST_ORDER_FAILED;
}

export interface IPostOrderSuccessAction {
    readonly type: typeof POST_ORDER_SUCCESS;
    readonly orderId: string;
}

export const postOrderAction = (): IPostOrderAction => ({
    type: POST_ORDER_REQUEST
});

export const postOrderFailedAction = (): IPostOrderFailedAction => ({
    type: POST_ORDER_FAILED
});

export const postOrderSuccessAction = (id: string): IPostOrderSuccessAction => ({
    type: POST_ORDER_SUCCESS,
    orderId: id
});

export type TCartActions = IAddIngreAction
| IAddBunAction
| IRemoveIngrAction
| IHoverIngrAction
| IPostOrderAction
| IPostOrderFailedAction
| IPostOrderSuccessAction

export const addIngr = (item: TIngredient) => {
    console.log(item)
    const uuid = uuidv4()
    item.uuid = uuid
    return {type: ADD_INGR, ingr: {...item}}
}

export function postOrder(order: Array<string>, token: TToken) {
    return function(dispatch: AppDispatch) {
        dispatch({
            type: POST_ORDER_REQUEST
        })
        fetch(`${apiUrl}orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + `${token.accessToken}`
              },
            body: JSON.stringify({
                "ingredients": order
            })
        })
            .then(res => {return checkResponse(res)})
            .then(data => {
                dispatch({
                    type: POST_ORDER_SUCCESS,
                    orderId: data.order.number
                }) 
            })
            .catch(err => {
                console.error(err)
                dispatch({
                    type: POST_ORDER_FAILED,
                })
            });
    }
}