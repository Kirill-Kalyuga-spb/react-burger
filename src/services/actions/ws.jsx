export const WS_CONNECTION_START = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED = 'WS_CONNECTION_CLOSED';
export const WS_GET_ORDERS = 'WS_GET_ORDERS';
export const WS_EXIT = 'WS_EXIT'; 

export const wsConnectedAll = () => {
    return {type: WS_CONNECTION_START, payload: '/all' }
}

export const wsConnectedUser = (token) => {
    return {type: WS_CONNECTION_START, payload: `?token=${token}` }
}

export const wsConnectedExit = () => {
    return {type: WS_EXIT }
}