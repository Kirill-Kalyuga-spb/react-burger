import { apiUrl, expires } from "../../utils/constants"
import { checkResponse, getCookie, setCookie } from "../../utils/utility-function"
import {
    POST_LOGIN_FAILED,
    POST_LOGIN_REQUEST,
    POST_LOGIN_SUCCESS,
    POST_REGISTER_FAILED,
    POST_REGISTER_REQUEST,
    POST_REGISTER_SUCCESS,
    POST_LOGOUT_FAILED,
    POST_LOGOUT_REQUEST,
    POST_LOGOUT_SUCCESS,
    POST_TOKEN_FAILED,
    POST_TOKEN_REQUEST,
    POST_TOKEN_SUCCESS
} from "../actionsTypes/auth"
import { AppDispatch } from "../types"
import { TToken, TUser } from "../types/data"

export interface IPostLoginAction {
    readonly type: typeof POST_LOGIN_REQUEST;
}

export interface IPostLoginFailedAction {
    readonly type: typeof POST_LOGIN_FAILED;
}

export interface IPostLoginSuccessAction {
    readonly type: typeof POST_LOGIN_SUCCESS;
}

export const postLoginAction = (): IPostLoginAction => ({
    type: POST_LOGIN_REQUEST
});

export const postLoginFailedAction = (): IPostLoginFailedAction => ({
    type: POST_LOGIN_FAILED
});

export const postLoginSuccessAction = (): IPostLoginSuccessAction => ({
    type: POST_LOGIN_SUCCESS
});



export interface IPostRegisterAction {
    readonly type: typeof POST_REGISTER_REQUEST;
}

export interface IPostRegisterFailedAction {
    readonly type: typeof POST_REGISTER_FAILED;
}

export interface IPostRegisterSuccessAction {
    readonly type: typeof POST_REGISTER_SUCCESS;
}

export const postRegisterAction = (): IPostRegisterAction => ({
    type: POST_REGISTER_REQUEST
});

export const postRegisterFailedAction = (): IPostRegisterFailedAction => ({
    type: POST_REGISTER_FAILED
});

export const postRegisterSuccessAction = (): IPostRegisterSuccessAction => ({
    type: POST_REGISTER_SUCCESS
});



export interface IPostLogoutAction {
    readonly type: typeof POST_LOGOUT_REQUEST;
}

export interface IPostLogoutFailedAction {
    readonly type: typeof POST_LOGOUT_FAILED;
}

export interface IPostLogoutSuccessAction {
    readonly type: typeof POST_LOGOUT_SUCCESS;
}

export const postLogoutAction = (): IPostLogoutAction => ({
    type: POST_LOGOUT_REQUEST
});

export const postLogoutFailedAction = (): IPostLogoutFailedAction => ({
    type: POST_LOGOUT_FAILED
});

export const postLogoutSuccessAction = (): IPostLogoutSuccessAction => ({
    type: POST_LOGOUT_SUCCESS
});



export interface IPostTokenAction {
    readonly type: typeof POST_TOKEN_REQUEST;
}

export interface IPostTokenFailedAction {
    readonly type: typeof POST_TOKEN_FAILED;
}

export interface IPostTokenSuccessAction {
    readonly type: typeof POST_TOKEN_SUCCESS;
}

export const postTokenAction = (): IPostTokenAction => ({
    type: POST_TOKEN_REQUEST
});

export const postTokenFailedAction = (): IPostTokenFailedAction => ({
    type: POST_TOKEN_FAILED
});

export const postTokenSuccessAction = (): IPostTokenSuccessAction => ({
    type: POST_TOKEN_SUCCESS
});

export type TAuthActions = IPostLoginAction
| IPostLoginFailedAction
| IPostLoginSuccessAction
| IPostRegisterAction
| IPostRegisterFailedAction
| IPostRegisterSuccessAction
| IPostLogoutAction
| IPostLogoutFailedAction
| IPostLogoutSuccessAction
| IPostTokenAction
| IPostTokenFailedAction
| IPostTokenSuccessAction

export function postLogin(props: TUser) {
    return function(dispatch: AppDispatch) {
        dispatch({
            type: POST_LOGIN_REQUEST
        })
        fetch(`${apiUrl}auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                "email": props.email,
                "password": props.password
            })
        })
            .then(res => {return checkResponse(res)})
            .then(data => {
                dispatch({
                    type: POST_LOGIN_SUCCESS,
                    email: data.user.email,
                    name: data.user.name,
                    password: props.password,
                    accessToken: data.accessToken
                })
                setCookie('refreshToken', data.refreshToken)
                setCookie('accessToken', data.accessToken, {expires})
            })
            .catch(err => {
                dispatch({
                    type: POST_LOGIN_FAILED,
                })
            });
    }
}

export function postRegister(props: TUser) {
    
    return function(dispatch: AppDispatch) {
        dispatch({
            type: POST_REGISTER_REQUEST
        })
        fetch(`${apiUrl}auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                "email": props.email,
                "password": props.password,
                "name": props.name 
            })
        })
            .then(res => {return checkResponse(res)})
            .then(data => {
                dispatch({
                    type: POST_REGISTER_SUCCESS,
                    email: data.user.email,
                    name: data.user.name,
                    password: props.password,
                    accessToken: data.accessToken
                }) 
                setCookie('refreshToken', data.refreshToken)
                setCookie('accessToken', data.accessToken, {expires})
            })
            .catch(err => {
                dispatch({
                    type: POST_REGISTER_FAILED,
                })
            });
    }
}

export function postLogout(token: string) {
    
    return function(dispatch: AppDispatch) {
        dispatch({
            type: POST_LOGOUT_REQUEST
        })
        fetch(`${apiUrl}auth/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                "token": token
            })
        })
            .then(res => {return checkResponse(res)})
            .then(data => {
                dispatch({
                    type: POST_LOGOUT_SUCCESS,
                })
                document.cookie = `accessToken=; max-age=0`
            })
            .catch(err => {
                dispatch({
                    type: POST_LOGOUT_FAILED,
                })
            });
    }
}

export function postToken(props: {
    token: TToken;
    fetch: Function;
    data: TUser;
}) {console.log(props.data)
    return function (dispatch: AppDispatch) {
        dispatch({
            type: POST_TOKEN_REQUEST
        })
        fetch(`${apiUrl}auth/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "token": props.token.refreshToken
            })
        })
            .then(res => { return checkResponse(res) })
            .then(data => {
                setCookie('accessToken', data.accessToken, { expires })
                dispatch({
                    type: POST_TOKEN_SUCCESS
                })
            })
            .then(data => {
                if (props.fetch && props.data) {
                    dispatch(props.fetch(getCookie(), props.data))
                }
            })
            .catch(err => {
                dispatch({
                    type: POST_TOKEN_FAILED,
                })
            });
    }
}