import {
    GET_PROFILE_REQUEST,
    GET_PROFILE_SUCCESS,
    GET_PROFILE_FAILED,

    PATCH_PROFILE_REQUEST,
    PATCH_PROFILE_SUCCESS,
    PATCH_PROFILE_FAILED
} from "../actions/profile"
  
  
  const initialState = {
      user: {
          email: "",
          name: "",
          password: ''
      },
  
      accessToken: '',
  
      getRequest: false,
      getFailed: false,
  
      patchRequest: false,
      patchFailed: false
  }
  
  export const profileReducer = (state = initialState, action) => {
      switch (action.type) {
          case GET_PROFILE_REQUEST: {
              return {
                  ...state,
                  getRequest: true,
              }
          }
          case GET_PROFILE_SUCCESS: {
              return {
                  ...state,
                  user: {
                      email: action.email,
                      name: action.name
                  },
  
                  getRequest: false,
                  getFailed: false
              }
          }
          case GET_PROFILE_FAILED: {
              return {
                  ...state,
                  getRequest: false,
                  getFailed: true
              }
          }
  
          case PATCH_PROFILE_REQUEST: {
              return {
                  ...state,
                  patchRequest: true,
                  patchFailed: false
              }
          }
          case PATCH_PROFILE_SUCCESS: {
              return {
                  ...state,
                  user: {
                      email: action.email,
                      name: action.name,
                  },
  
                  patchRequest: false,
                  patchFailed: false
              }
          }
          case PATCH_PROFILE_FAILED: {
            return {
                ...state,
                patchRequest: false,
                patchFailed: true
            }
          }
  
          default: {
              return state
          }
      }
  }