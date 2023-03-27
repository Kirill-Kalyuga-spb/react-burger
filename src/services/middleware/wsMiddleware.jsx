import { wsUrl } from '../../utils/constants.js';
import {
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_GET_ORDERS,
    WS_SEND_MESSAGE
  } from '../actions/ws';
  
  const wsActions = {
    wsInit: WS_CONNECTION_START,
    wsSendMessage: WS_SEND_MESSAGE,
    onOpen: WS_CONNECTION_SUCCESS,
    onClose: WS_CONNECTION_CLOSED,
    onError: WS_CONNECTION_ERROR,
    onMessage: WS_GET_ORDERS
  };

export const socketMiddleware = () => {
    return store => {
      let socket = null;
  
      return next => action => {
        const { dispatch } = store;
        const { type, payload } = action;
        const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } = wsActions;
        
        if (type === wsInit) {
          socket = new WebSocket(`${wsUrl}/all`);
        }

        if (socket) {
          socket.onopen = event => {
            dispatch({ type: onOpen, payload: event });
          };
  
          socket.onerror = event => {
            dispatch({ type: onError, payload: event });
          };
  
          socket.onmessage = event => {
            const { data } = event;
            const parsedData = JSON.parse(data);
            const { success, ...restParsedData } = parsedData;
            // console.log(parsedData)
            
            dispatch({ type: onMessage, payload: restParsedData });
          };
  
          socket.onclose = event => {
            dispatch({ type: onClose, payload: event });
          };
  
          if (type === wsSendMessage) {
            const message = { ...payload };
            socket.send(JSON.stringify(message));
          }
        }
  
        next(action);
      };
    };
  };