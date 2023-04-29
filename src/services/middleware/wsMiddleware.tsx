import { TWsConnectionActions } from "../actionsTypes/ws";
import { Middleware, MiddlewareAPI } from "redux";
import { AppDispatch, RootState } from "../types";

export const socketMiddleware = (wsActions: TWsConnectionActions, wsUrl: string): Middleware => {
    return (store:  MiddlewareAPI<AppDispatch, RootState>) => {
      let socket: WebSocket | null = null;
  
      return (next) => (action) => {
        const { dispatch } = store;
        const { type, payload } = action;
        const { wsInit, onOpen, onClose, onError, onMessage, wsExit } = wsActions;

        if (type === wsInit) {
          socket = new WebSocket(`${wsUrl}${payload}`);
        };

        if (socket && type === wsExit) {
          socket.close()
        }

        if (socket) {
          socket.onopen = (event:any) => {
            dispatch({ type: onOpen, payload: event });
          };
  
          socket.onerror = (event:any) => {
            dispatch({ type: onError, payload: event });
          };
  
          socket.onmessage = (event:any) => {
            const { data } = event;
            const parsedData = JSON.parse(data);
            const { success, ...restParsedData } = parsedData;
            
            dispatch({ type: onMessage, payload: restParsedData });
          };
  
          socket.onclose = (event:any) => {
            dispatch({ type: onClose, payload: event });
          };
        }
  
        next(action);
      };
    };
  };