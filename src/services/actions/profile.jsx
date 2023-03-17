import { apiUrl } from "../../utils/constants"
import { checkResponse } from "../../utils/utility-function"

export const GET_PROFILE_REQUEST = 'GET_PROFILE_REQUEST'
export const GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS'
export const GET_PROFILE_FAILED = 'GET_PROFILE_FAILED'

export const PATCH_PROFILE_REQUEST = 'PATCH_PROFILE_REQUEST'
export const PATCH_PROFILE_SUCCESS = 'PATCH_PROFILE_SUCCESS'
export const PATCH_PROFILE_FAILED = 'PATCH_PROFILE_FAILED'

export function getProfile(token) {
    return function(dispatch) {
        dispatch({
            type: GET_PROFILE_REQUEST
        })
        fetch(`${apiUrl}auth/user`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + `${token}`,
              }
        })
            .then(res => {return checkResponse(res)})
            .then(data => {
                dispatch({
                    type: GET_PROFILE_SUCCESS,
                    email: data.user.email,
                    name: data.user.name
                })
            })
            .catch(err => {
                dispatch({
                    type: GET_PROFILE_FAILED,
                })
            });
    }
}

export function patchProfile(token, props) {
    return function(dispatch) {
        dispatch({
            type: PATCH_PROFILE_REQUEST
        })
        fetch(`${apiUrl}auth/user`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + `${token}`,
              },
            body: JSON.stringify({
                "email": props.email,
                "name": props.name,
                "password": props.password
            })
        })
            .then(res => {return checkResponse(res)})
            .then(data => {
                dispatch({
                    type: PATCH_PROFILE_SUCCESS,
                    email: data.user.email,
                    name: data.user.name
                })
            })
            .catch(err => {
                dispatch({
                    type: PATCH_PROFILE_FAILED,
                })
            });
    }
}