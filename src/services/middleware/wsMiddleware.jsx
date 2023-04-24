export const socketMiddleware = (wsActions, wsUrl) => {
    return store => {
      let socket = null;
  
      return next => action => {
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
            
            dispatch({ type: onMessage, payload: restParsedData });
          };
  
          socket.onclose = event => {
            dispatch({ type: onClose, payload: event });
          };
        }
  
        next(action);
      };
    };
  };