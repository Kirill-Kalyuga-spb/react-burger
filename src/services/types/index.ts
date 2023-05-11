import { store } from "../..";
import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';

import { TAuthActions } from "../actions/auth";
import { TCartActions } from "../actions/cart";
import { TItemListActions } from "../actions/itemList";
import { TPassowrdActions } from "../actions/password";
import { TProfileActions } from "../actions/profile";
import { TWsActions } from "../actions/ws";

type TApplicationActions = TCartActions
| TAuthActions
| TWsActions
| TProfileActions
| TItemListActions
| TPassowrdActions
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ActionCreator<ThunkAction<ReturnType, Action, RootState, TApplicationActions>>;