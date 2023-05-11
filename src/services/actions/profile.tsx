import { apiUrl } from "../../utils/constants"
import { checkResponse } from "../../utils/utility-function"
import { postToken } from "./auth"
import { AppDispatch } from "../types"
import { TToken, TUser } from "../types/data"
import {
    GET_PROFILE_REQUEST,
    GET_PROFILE_SUCCESS,
    GET_PROFILE_FAILED,

    PATCH_PROFILE_REQUEST,
    PATCH_PROFILE_SUCCESS,
    PATCH_PROFILE_FAILED
} from "../actionsTypes/profile"

export interface IGetProfileAction {
    readonly type: typeof GET_PROFILE_REQUEST;
}

export interface IGetProfileFailedAction {
    readonly type: typeof GET_PROFILE_FAILED;
}

export interface IGetProfileSuccessAction {
    readonly type: typeof GET_PROFILE_SUCCESS;
    email: string;
    name: string;
}

export const getProfileAction = (): IGetProfileAction => ({
    type: GET_PROFILE_REQUEST
});

export const getProfileFailedAction = (): IGetProfileFailedAction => ({
    type: GET_PROFILE_FAILED
});

export const getProfileSuccessAction = (email: string, name: string): IGetProfileSuccessAction => ({
    type: GET_PROFILE_SUCCESS,
    email: email,
    name: name
});



export interface IPatchProfileAction {
    readonly type: typeof PATCH_PROFILE_REQUEST;
}

export interface IPatchProfileFailedAction {
    readonly type: typeof PATCH_PROFILE_FAILED;
}

export interface IPatchProfileSuccessAction {
    readonly type: typeof PATCH_PROFILE_SUCCESS;
    email: string;
    name: string;
}

export const patchProfileAction = (): IPatchProfileAction => ({
    type: PATCH_PROFILE_REQUEST
});

export const patchProfileFailedAction = (): IPatchProfileFailedAction => ({
    type: PATCH_PROFILE_FAILED
});

export const patchProfileSuccessAction = (email: string, name: string): IPatchProfileSuccessAction => ({
    type: PATCH_PROFILE_SUCCESS,
    email: email,
    name: name
});

export type TProfileActions = IGetProfileAction
| IGetProfileFailedAction
| IGetProfileSuccessAction
| IPatchProfileAction
| IPatchProfileFailedAction
| IPatchProfileSuccessAction

export function getProfile(token: string) {
    return function(dispatch: AppDispatch) {
        dispatch(getProfileAction())
        fetch(`${apiUrl}auth/user`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + `${token}`,
              }
        })
            .then(res => {return checkResponse(res)})
            .then(data => {
                dispatch(getProfileSuccessAction(data.user.email, data.user.name))
            })
            .catch(err => {
                dispatch(getProfileFailedAction())
            });
    }
}

export function patchProfile(token: TToken, data: TUser) {
    return function(dispatch: AppDispatch) {
        dispatch(patchProfileAction())
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
                dispatch(patchProfileSuccessAction(data.user.email, data.user.name))
            })
            .catch(err => {
                if(err.split('Ошибка: ')[1]) {
                    dispatch<any>(postToken({fetch: patchProfile, token, data}))
                } else {
                dispatch(patchProfileFailedAction())
            }
            });
    }
}