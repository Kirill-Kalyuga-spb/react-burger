import { combineReducers } from 'redux';
import { cartReducer } from './cart';
import { itemsListReducer } from './itemList';

export const rootReducer = combineReducers({
    cart: cartReducer,
    items: itemsListReducer
  });