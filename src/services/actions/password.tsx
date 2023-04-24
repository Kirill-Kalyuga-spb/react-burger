import { apiUrl } from "../../utils/constants"
import { checkResponse } from "../../utils/utility-function"
import { AppDispatch } from "../types"

export const POST_EMAIL_REQUEST: 'POST_EMAIL_REQUEST' = 'POST_EMAIL_REQUEST'
export const POST_EMAIL_SUCCESS: 'POST_EMAIL_SUCCESS' = 'POST_EMAIL_SUCCESS'
export const POST_EMAIL_FAILED: 'POST_EMAIL_FAILED' = 'POST_EMAIL_FAILED'

export const POST_NEWPASSWORD_REQUEST: 'POST_NEWPASSWORD_REQUEST' = 'POST_NEWPASSWORD_REQUEST'
export const POST_NEWPASSWORD_SUCCESS: 'POST_NEWPASSWORD_SUCCESS' = 'POST_NEWPASSWORD_SUCCESS'
export const POST_NEWPASSWORD_FAILED: 'POST_NEWPASSWORD_FAILED' = 'POST_NEWPASSWORD_FAILED'

export function postEmail(email: string) {
    return function(dispatch: AppDispatch) {
        dispatch({
            type: POST_EMAIL_REQUEST
        })
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
            console.log(data)
            dispatch({
                type: POST_EMAIL_SUCCESS,
                data: data
            })
        })
        .catch(err => {
            dispatch({
                type: POST_EMAIL_FAILED
            })
        });
    }
}

export function postNewpassword(form: {password: string; code: string;}) {
    
    return function(dispatch: AppDispatch) {
        dispatch({
            type: POST_NEWPASSWORD_REQUEST
        })
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
                console.log(data)
                dispatch({
                    type: POST_NEWPASSWORD_SUCCESS,
                    data: data
                })
            })
            .catch(err => {
                dispatch({
                    type: POST_NEWPASSWORD_FAILED,
                })
            });
    }
}