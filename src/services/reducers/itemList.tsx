import { TItemListActions } from "../actions/itemList"
import { GET_ITEMS_FAILED, GET_ITEMS_REQUEST, GET_ITEMS_SUCCESS } from "../actionsTypes/itemList"
import { TIngredient } from "../types/data"

type TItemListState = {
    items: Array<TIngredient>,
    itemsRequest: boolean,
    itemsFailed: boolean
};

const initialState: TItemListState = {
    items: [],
    itemsRequest: false,
    itemsFailed: false
}

export const itemsListReducer = (state = initialState, action: TItemListActions) => {
    switch (action.type) {
        case GET_ITEMS_REQUEST: {
            return {
                ...state,
                itemsRequest: true
            }
        }
        case GET_ITEMS_SUCCESS: {
            return {
                ...state,
                itemsRequest: false,
                itemsFailed: false,
                items: action.items
            }
        }
        case GET_ITEMS_FAILED: {
            return {
                ...state,
                itemsRequest: false,
                itemsFailed: true
            }
        }
        default: {
            return state;
        }
    }
}