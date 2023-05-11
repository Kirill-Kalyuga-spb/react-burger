import { TCartActions } from "../actions/cart";
import {
    ADD_INGR,
    ADD_BUN,
    REMOVE_INGR,
    POST_ORDER_REQUEST,
    POST_ORDER_SUCCESS,
    POST_ORDER_FAILED,
    HOVER_INGR
} from "../actionsTypes/cart"

import {TIngredient} from "../types/data"

type TCartState = {
    orderId: null | string,
    orderRequest: boolean,
    orderFailed: boolean,
    orderSuccess: boolean,

    ingr: Array<TIngredient>,
    bun: TIngredient | {[K in any] : never}
};

const initialState: TCartState = {
    orderId: null,
    orderRequest: false,
    orderFailed: false,
    orderSuccess: false,

    ingr: [],
    bun: {}
}

export const cartReducer = (state = initialState, action: TCartActions) => {
    switch (action.type) {
        case POST_ORDER_REQUEST: {
            return {
                ...state,
                orderRequest: true,
                orderSuccess: false,
                orderFailed: false
            }
        }
        case POST_ORDER_SUCCESS: {
            return {
                ...state,
                orderId: action.orderId,
                orderRequest: false,
                orderSuccess: true
            }
        }
        case POST_ORDER_FAILED: {
            return {
                ...state,
                orderRequest: false,
                orderFailed: true
            }
        }

        case ADD_INGR: {
            return {
                ...state,
                ingr: [...state.ingr, action.ingr]
            }
        }
        case ADD_BUN: {
            return {
                ...state,
                bun: action.ingr
            }
        }
        
        case REMOVE_INGR: {
            const indexItem = action.index;
            return {
                ...state,
                ingr: [
                    ...state.ingr.slice(0, indexItem),
                    ...state.ingr.slice(indexItem + 1),
                ]
            }
        }
        case HOVER_INGR: {
            const indexItem = action.index;
            const indexDrop = action.indexDrop;
            const ingr = [...state.ingr];
            const ingrHover = ingr.splice(indexDrop, 1)[0];
            ingr.splice(indexItem, 0, ingrHover);

            return {
                ...state,
                ingr: ingr,
            };
        }
        default: {
            return state
        }
    }
}