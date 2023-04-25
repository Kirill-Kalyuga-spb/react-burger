import { apiUrl } from "../../utils/constants"
import { checkResponse } from "../../utils/utility-function"
import {
    POST_EMAIL_REQUEST,
    POST_EMAIL_SUCCESS,
    POST_EMAIL_FAILED,

    POST_NEWPASSWORD_REQUEST,
    POST_NEWPASSWORD_SUCCESS,
    POST_NEWPASSWORD_FAILED
} from "../actionsTypes/password";
import { AppDispatch } from "../types"

export interface IPostEmailAction {
    readonly type: typeof POST_EMAIL_REQUEST;
}

export interface IPostEmailFailedAction {
    readonly type: typeof POST_EMAIL_FAILED;
}

export interface IPostEmailSuccessAction {
    readonly type: typeof POST_EMAIL_SUCCESS;
}

export const postEmailAction = (): IPostEmailAction => ({
    type: POST_EMAIL_REQUEST
});

export const postEmailFailedAction = (): IPostEmailFailedAction => ({
    type: POST_EMAIL_FAILED
});

export const postEmailSuccessAction = (): IPostEmailSuccessAction => ({
    type: POST_EMAIL_SUCCESS,
});



export interface IPostNewpasswordAction {
    readonly type: typeof POST_NEWPASSWORD_REQUEST;
}

export interface IPostNewpasswordFailedAction {
    readonly type: typeof POST_NEWPASSWORD_FAILED;
}

export interface IPostNewpasswordSuccessAction {
    readonly type: typeof POST_NEWPASSWORD_SUCCESS;
}

export const postNewpasswordAction = (): IPostNewpasswordAction => ({
    type: POST_NEWPASSWORD_REQUEST
});

export const postNewpasswordFailedAction = (): IPostNewpasswordFailedAction => ({
    type: POST_NEWPASSWORD_FAILED
});

export const postNewpasswordSuccessAction = (): IPostNewpasswordSuccessAction => ({
    type: POST_NEWPASSWORD_SUCCESS,
});

export type TPassowrd = IPostEmailAction
| IPostEmailFailedAction
| IPostEmailSuccessAction
| IPostNewpasswordAction
| IPostNewpasswordFailedAction
| IPostNewpasswordSuccessAction

export function postEmail(email: string) {
    return function(dispatch: AppDispatch) {
        dispatch(postEmailAction())
        fetch(`${apiUrl}password-reset`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                "email": email
              })
        }).then(res => {return checkResponse(res)})
        .then(data => {
            dispatch(postEmailSuccessAction())
        })
        .catch(err => {
            dispatch(postEmailSuccessAction())
        });
    }
}

export function postNewpassword(form: {password: string; code: string;}) {
    
    return function(dispatch: AppDispatch) {
        dispatch(postNewpasswordAction())
        fetch(`${apiUrl}password-reset/reset`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                Accept: "application/json"
            },
            body: JSON.stringify({
                "password": form.password,
                "token": form.code
            })
        }).then(res => { return checkResponse(res) })
            .then(data => {
                dispatch(postNewpasswordSuccessAction())
            })
            .catch(err => {
                dispatch(postNewpasswordFailedAction())
            });
    }
}