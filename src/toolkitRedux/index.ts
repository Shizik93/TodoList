import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { taskReducer } from '../Reducers/taskReducer';
import { todolistReducer } from '../Reducers/todolistReducer';
import { store } from '../Store/store';

import { appSlice } from './appSlice';
import authSlice from './authSlice';

const rootReducerRTK = combineReducers({
  todolists: todolistReducer,
  tasks: taskReducer,
  app: appSlice.reducer,
  auth: authSlice.reducer,
});

export const storeRTK = () =>
  configureStore({
    reducer: rootReducerRTK,
  });

export type AppRootStateType = ReturnType<typeof store.getState>;

export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AppActionsType>;

export type AppActionsType = any;
/*  | appReducerActionsType
  | taskReducerActionsType
  | todolistActionsType; */

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootStateType,
  unknown,
  AppActionsType
>;
