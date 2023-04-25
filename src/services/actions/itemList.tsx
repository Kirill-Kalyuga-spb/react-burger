import { apiUrl } from "../../utils/constants"
import { checkResponse } from "../../utils/utility-function"
import { GET_ITEMS_FAILED, GET_ITEMS_REQUEST, GET_ITEMS_SUCCESS } from "../actionsTypes/itemList";
import { AppDispatch } from "../types"
import { TIngredient } from "../types/data"

export interface IGetItemsAction {
    readonly type: typeof GET_ITEMS_REQUEST;
}

export interface IGetItemsFailedAction {
    readonly type: typeof GET_ITEMS_FAILED;
}

export interface IGetItemsSuccessAction {
    readonly type: typeof GET_ITEMS_SUCCESS;
    readonly items: Array<TIngredient>;
}

export const getItemsAction = (): IGetItemsAction => ({
    type: GET_ITEMS_REQUEST
});

export const getItemsFailedAction = (): IGetItemsFailedAction => ({
    type: GET_ITEMS_FAILED
});

export const getItemsSuccessAction = (data: Array<TIngredient>): IGetItemsSuccessAction => ({
    type: GET_ITEMS_SUCCESS,
    items: data
});

export type TItemListActions = IGetItemsAction
| IGetItemsFailedAction
| IGetItemsSuccessAction

export function getItems() {
    return function(dispatch: AppDispatch) {
        dispatch(getItemsAction())
        fetch(`${apiUrl}ingredients`)
            .then(res => {return checkResponse(res)})
            .then(data => {
                dispatch(getItemsSuccessAction(data)) 
            })
            .catch(err => {
                dispatch(getItemsFailedAction())
            });
    }
}