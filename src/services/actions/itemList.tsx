import { apiUrl } from "../../utils/constants"
import { checkResponse } from "../../utils/utility-function"
import { AppDispatch } from "../types"

export const GET_ITEMS_REQUEST: 'GET_ITEMS_REQUEST' = 'GET_ITEMS_REQUEST'
export const GET_ITEMS_SUCCESS: 'GET_ITEMS_SUCCESS' = 'GET_ITEMS_SUCCESS'
export const GET_ITEMS_FAILED: 'GET_ITEMS_FAILED' = 'GET_ITEMS_FAILED'

export function getItems() {
    return function(dispatch: AppDispatch) {
        dispatch({
            type: GET_ITEMS_REQUEST
        })
        fetch(`${apiUrl}ingredients`)
            .then(res => {return checkResponse(res)})
            .then(data => {
                dispatch({
                    type: GET_ITEMS_SUCCESS,
                    items: data
                }) 
            })
            .catch(err => {
                dispatch({
                    type: GET_ITEMS_FAILED,
                })
            });
    }
}