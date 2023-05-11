import { TWsActions } from "../actions/ws";
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_SUCCESS,
  WS_GET_ORDERS
} from "../actionsTypes/ws";
import { TOrder } from "../types/data";

  type TWsState = {
    wsConnected: boolean,
    orders: Array<TOrder>,

    total: null | number,
    totalToday: null | number,
  }  

  const initialState: TWsState = {
    wsConnected: false,
    orders: [],
    total: null,
    totalToday: null,
  };
  
  export const wsReducer = (state = initialState, action: TWsActions) => {
    switch (action.type) {
      case WS_CONNECTION_SUCCESS:
        return {
          ...state,
          wsConnected: true
        };
  
      case WS_CONNECTION_ERROR:
        return {
          ...state,
          // orders: [],
          wsConnected: false
        };
  
      case WS_CONNECTION_CLOSED:
        return {
          ...state,
          // orders: [],
          wsConnected: false
        };
  
      case WS_GET_ORDERS:
        return {
          ...state,
          total: action.payload.total,
          totalToday: action.payload.totalToday,
          orders: action.payload.orders
        };
  
      default:
        return state;
    }
  };