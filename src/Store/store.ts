import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from 'redux';
import thunkMiddleware, { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { appReducer, appReducerActionsType } from '../Reducers/appReducer';
import { authReducer, authReducerActionsType } from '../Reducers/authReducer';
import { taskReducer, taskReducerActionsType } from '../Reducers/taskReducer';
import { todolistActionsType, todolistReducer } from '../Reducers/todolistReducer';

const rootReducer = combineReducers({
  todolists: todolistReducer,
  tasks: taskReducer,
  app: appReducer,
  auth: authReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type AppRootStateType = ReturnType<typeof store.getState>;

export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AppActionsType>;

export type AppActionsType =
  | appReducerActionsType
  | authReducerActionsType
  | taskReducerActionsType
  | todolistActionsType;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootStateType,
  unknown,
  AppActionsType
>;
