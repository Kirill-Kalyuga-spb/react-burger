import { getCookie } from "../../utils/utility-function"
import {
  POST_LOGIN_REQUEST,
  POST_LOGIN_SUCCESS,
  POST_LOGIN_FAILED,

  POST_REGISTER_REQUEST,
  POST_REGISTER_SUCCESS,
  POST_REGISTER_FAILED,

  POST_LOGOUT_REQUEST,
  POST_LOGOUT_SUCCESS,
  POST_LOGOUT_FAILED,

  POST_TOKEN_REQUEST,
  POST_TOKEN_SUCCESS,
  POST_TOKEN_FAILED
} from "../actions/auth"

const cookie = getCookie()

const initialState = {
    logged: Boolean(cookie.accessToken),
    
    registerRequest: false,
    registerFailed: false,

    loginRequest: false,
    loginFailed: false,

    logoutRequest: false,
    logoutFailed: false,

    tokenRequest: false,
    tokenFailed: false,
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case POST_REGISTER_REQUEST: {
            return {
                ...state,
                registerRequest: true,
            }
        }
        case POST_REGISTER_SUCCESS: {
            return {
                ...state,
                logged: true,
                registerRequest: false,
                registerFailed: false
            }
        }
        case POST_REGISTER_FAILED: {
            return {
                ...state,
                registerRequest: false,
                registerFailed: true
            }
        }

        case POST_LOGIN_REQUEST: {
            return {
                ...state,
                loginRequest: true,
            }
        }
        case POST_LOGIN_SUCCESS: {
            return {
                ...state,
                logged: true,
                loginRequest: false,
                loginFailed: false
            }
        }
        case POST_LOGIN_FAILED: {
            return {
                ...state,
                loginRequest: false,
                loginFailed: true
            }
        }

        case POST_LOGOUT_REQUEST: {
            return {
                ...state,
                logoutRequest: true,
            }
        }
        case POST_LOGOUT_SUCCESS: {
            return {
                ...state,
                logged: false,
                logoutRequest: false,
                logoutFailed: false
            }
        }
        case POST_LOGOUT_FAILED: {
            return {
                ...state,
                logoutRequest: false,
                logoutFailed: true
            }
        }

        case POST_TOKEN_REQUEST: {
            return {
                ...state,
                tokenRequest: true,
            }
        }
        case POST_TOKEN_SUCCESS: {
            return {
                ...state,
                logged: true,
                tokenRequest: false,
                tokenFailed: false
            }
        }
        case POST_TOKEN_FAILED: {
            return {
                ...state,
                tokenRequest: false,
                tokenFailed: true
            }
        }

        default: {
            return state
        }
    }
}