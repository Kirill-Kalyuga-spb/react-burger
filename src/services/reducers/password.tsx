import {TPassowrdActions} from "../actions/password"
import {
    POST_EMAIL_REQUEST,
    POST_EMAIL_SUCCESS,
    POST_EMAIL_FAILED,

    POST_NEWPASSWORD_REQUEST,
    POST_NEWPASSWORD_SUCCESS,
    POST_NEWPASSWORD_FAILED
} from "../actionsTypes/password"
  
  
type TPassowrdState = {
    emailSend: boolean,
    passwordSend: boolean,

    emailRequest: boolean,
    emailFailed: boolean,

    passwordRequest: boolean,
    passwordFailed: boolean
}

const initialState: TPassowrdState = {
    emailSend: false,
    passwordSend: true,

    emailRequest: false,
    emailFailed: false,

    passwordRequest: false,
    passwordFailed: false
}

  export const passwordReducer = (state = initialState, action: TPassowrdActions) => {
      switch (action.type) {
          case POST_EMAIL_REQUEST: {
              return {
                  ...state,
                  emailRequest: true,
              }
          }
          case POST_EMAIL_SUCCESS: {
              return {
                  ...state,
                  emailSend: true,
                  passwordSend: false,

                  emailRequest: false,
                  emailFailed: false
              }
          }
          case POST_EMAIL_FAILED: {
              return {
                  ...state,
                  emailRequest: false,
                  emailFailed: true
              }
          }
  
          case POST_NEWPASSWORD_REQUEST: {
              return {
                  ...state,
                  passwordRequest: true,
              }
          }
          case POST_NEWPASSWORD_SUCCESS: {
              return {
                  ...state,
                  emailSend: false,
                  passwordSend: true,

                  passwordRequest: false,
                  passwordFailed: false
              }
          }
          case POST_NEWPASSWORD_FAILED: {
            return {
                ...state,
                passwordRequest: false,
                passwordFailed: true
            }
          }
  
          default: {
              return state
          }
      }
  }