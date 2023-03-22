import { apiUrl } from "../../utils/constants"
import { checkResponse } from "../../utils/utility-function"

export const ADD_INGR = 'ADD_INGR'
export const ADD_BUN = 'ADD_BUN'

export const MOVE_INGR = 'MOVE_INGR'
export const REMOVE_INGR = 'REMOVE_INGR'
export const HOVER_INGR = 'HOVER_INGR'

export const POST_ORDER_REQUEST = 'POST_ORDER_REQUEST'
export const POST_ORDER_SUCCESS = 'POST_ORDER_SUCCESS'
export const POST_ORDER_FAILED = 'POST_ORDER_FAILED'

export function postOrder(order) {
    
    return function(dispatch) {
        dispatch({
            type: POST_ORDER_REQUEST
        })
        fetch(`${apiUrl}orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
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
                dispatch({
                    type: POST_ORDER_FAILED,
                })
            });
    }
}