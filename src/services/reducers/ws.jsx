import {
    WS_USER_NAME_UPDATE,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_ORDERS
  } from '../actions/ws';
  
  const initialState = {
    wsConnected: false,
    orders: [],
    total: null,
    totalToday: null,
  };
  
  export const wsReducer = (state = initialState, action) => {
    switch (action.type) {
      case WS_CONNECTION_SUCCESS:
        return {
          ...state,
          wsConnected: true
        };
  
      case WS_CONNECTION_ERROR:
        return {
          ...state,
          wsConnected: false
        };
  
      case WS_CONNECTION_CLOSED:
        return {
          ...state,
          wsConnected: false
        };
  
      case WS_GET_ORDERS:
        return {
          ...state,
          total: action.payload.total,
          totalToday: action.payload.totalToday,
          orders: action.payload.orders
        //   state.orders.length
        //     ? [...state.orders, { ...action.payload.orders, timestamp: new Date().getTime() / 1000 }]
        //     : [{ ...action.payload.orders, timestamp: new Date().getTime() / 1000 }]
        };
      case WS_USER_NAME_UPDATE:
        return {
          ...state,
          user: action.payload
        };
  
      default:
        return state;
    }
  };