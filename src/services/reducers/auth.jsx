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


const initialState = {
    user: {
        email: "",
        name: "",
        password: ''
    },

    accessToken: '',

    registerRequest: false,
    registerFailed: false,

    loginRequest: false,
    loginFailed: false,

    logoutRequest: false,
    logoutFailed: false,
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
                user: {
                    email: action.email,
                    name: action.name,
                    password: action.password
                },
                accessToken: action.accessToken,

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
                user: {
                    email: action.email,
                    name: action.name,
                    password: action.password
                },
                accessToken: action.accessToken,

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
                user: {
                    email: '',
                    name: '',
                    password: ''
                },
                accessToken: action.accessToken,
                
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

        default: {
            return state
        }
    }
}