import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { appSlice } from './appSlice';
import authSlice from './authSlice';
import { taskSlice } from './taskSlice';
import { todolistSlice } from './todolistSlice';

const rootReducerRTK = combineReducers({
  todolists: todolistSlice.reducer,
  tasks: taskSlice.reducer,
  app: appSlice.reducer,
  auth: authSlice.reducer,
});

export const storeRTK = configureStore({
  reducer: rootReducerRTK,
});

export type AppRootStateType = ReturnType<typeof storeRTK.getState>;

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
