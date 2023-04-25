import { TWsConnectionActions } from "../actionsTypes/ws";
import { store as STORE } from '../../index'

type TSocketActions = {
  type: string;
  payload: any;
} 

export const socketMiddleware = (wsActions: TWsConnectionActions, wsUrl: string):any => {
    return (store: typeof STORE) => {
      let socket:any = null;
  
      return (next:any) => (action: TSocketActions) => {
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