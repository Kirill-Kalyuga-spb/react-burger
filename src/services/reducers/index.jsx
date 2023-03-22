import { combineReducers } from 'redux';
import { authReducer } from './auth';
import { cartReducer } from './cart';
import { itemsListReducer } from './itemList';
import { passwordReducer } from './password';
import { profileReducer } from './profile';

export const rootReducer = combineReducers({
    cart: cartReducer,
    items: itemsListReducer,
    auth: authReducer,
    profile: profileReducer,
    password: passwordReducer
  });