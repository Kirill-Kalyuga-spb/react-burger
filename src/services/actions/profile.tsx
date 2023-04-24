import { useDispatch } from "react-redux"
import { apiUrl } from "../../utils/constants"
import { checkResponse } from "../../utils/utility-function"
import { postToken } from "./auth"
import { AppDispatch } from "../types"
import { TToken, TUser } from "../types/data"

export const GET_PROFILE_REQUEST = 'GET_PROFILE_REQUEST'
export const GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS'
export const GET_PROFILE_FAILED = 'GET_PROFILE_FAILED'

export const PATCH_PROFILE_REQUEST = 'PATCH_PROFILE_REQUEST'
export const PATCH_PROFILE_SUCCESS = 'PATCH_PROFILE_SUCCESS'
export const PATCH_PROFILE_FAILED = 'PATCH_PROFILE_FAILED'

export function getProfile(token: string) {
    return function(dispatch: AppDispatch) {
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

export function patchProfile(token: TToken, data: TUser) {
    return function(dispatch: AppDispatch) {
        dispatch({
            type: PATCH_PROFILE_REQUEST
        })
        fetch(`${apiUrl}auth/user`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + `${token.accessToken}`,
              },
            body: JSON.stringify({
                "email": data.email,
                "name": data.name,
                "password": data.password
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
                if(err.split('Ошибка: ')[1]) {
                    dispatch(postToken({fetch: patchProfile, token, data}))
                } else {
                dispatch({
                    type: PATCH_PROFILE_FAILED,
                })
            }
            });
    }
}