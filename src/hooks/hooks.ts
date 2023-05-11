import {
    TypedUseSelectorHook,
    useSelector as selectorHook,
    useDispatch as dispatchHook,
  } from 'react-redux';
import { RootState, AppDispatch, AppThunk } from '../services/types';
  
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
export const useDispatch: () => AppDispatch | AppThunk = dispatchHook;