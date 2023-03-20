import { apiUrl, expires } from "../../utils/constants"
import { checkResponse, setCookie } from "../../utils/utility-function"

export const POST_LOGIN_REQUEST = 'POST_LOGIN_REQUEST'
export const POST_LOGIN_SUCCESS = 'POST_LOGIN_SUCCESS'
export const POST_LOGIN_FAILED = 'POST_LOGIN_FAILED'

export const POST_REGISTER_REQUEST = 'POST_REGISTER_REQUEST'
export const POST_REGISTER_SUCCESS = 'POST_REGISTER_SUCCESS'
export const POST_REGISTER_FAILED = 'POST_REGISTER_FAILED'

export const POST_LOGOUT_REQUEST = 'POST_LOGOUT_REQUEST'
export const POST_LOGOUT_SUCCESS = 'POST_LOGOUT_SUCCESS'
export const POST_LOGOUT_FAILED = 'POST_LOGOUT_FAILED'

export const POST_TOKEN_REQUEST = 'POST_TOKEN_REQUEST'
export const POST_TOKEN_SUCCESS = 'POST_TOKEN_SUCCESS'
export const POST_TOKEN_FAILED = 'POST_TOKEN_FAILED'

export function postLogin(props) {
    return function(dispatch) {
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

export function postRegister(props) {
    
    return function(dispatch) {
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

export function postLogout(token) {
    
    return function(dispatch) {
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
                document.cookie = `accessToken=;expires=${new Date(0)}`
            })
            .catch(err => {
                dispatch({
                    type: POST_LOGOUT_FAILED,
                })
            });
    }
}

export function postToken(token) {
    
    return function(dispatch) {
        dispatch({
            type: POST_TOKEN_REQUEST
        })
        fetch(`${apiUrl}auth/token`, {
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
                setCookie('accessToken', data.accessToken, {expires})
                dispatch({
                    type: POST_TOKEN_SUCCESS
                }) 
            })
            .catch(err => {
                dispatch({
                    type: POST_TOKEN_FAILED,
                })
            });
    }
}