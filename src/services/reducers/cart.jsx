import {
    ADD_INGR,
    ADD_BUN,
    MOVE_INGR,
    REMOVE_INGR,
    POST_ORDER_REQUEST,
    POST_ORDER_SUCCESS,
    POST_ORDER_FAILED,
    HOVER_INGR
} from "../actions/cart"


const initialState = {
    orderId: null,
    orderRequest: false,
    orderFailed: false,
    orderSuccess: false,

    ingr: [],
    bun: {
        "_id": "60d3b41abdacab0026a733c7",
        "name": "Флюоресцентная булка R2-D3",
        "type": "bun",
        "proteins": 44,
        "fat": 26,
        "carbohydrates": 85,
        "calories": 643,
        "price": 988,
        "image": "https://code.s3.yandex.net/react/code/bun-01.png",
        "image_mobile": "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
        "image_large": "https://code.s3.yandex.net/react/code/bun-01-large.png",
        "__v": 0
    }
}

export const cartReducer = (state = initialState, action) => {
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
            const indexItem = action.item.index;
            return {
                ...state,
                ingr: [
                    ...state.ingr.slice(0, indexItem),
                    ...state.ingr.slice(indexItem + 1),
                ]
            }
        }
        case HOVER_INGR: {
            const indexItem = action.item.index;
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