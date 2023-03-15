import { combineReducers } from 'redux';
import { authReducer } from './auth';
import { cartReducer } from './cart';
import { itemsListReducer } from './itemList';

export const rootReducer = combineReducers({
    cart: cartReducer,
    items: itemsListReducer,
    auth: authReducer
  });