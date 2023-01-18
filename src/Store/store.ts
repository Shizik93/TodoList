import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from 'redux';
import thunkMiddleware, { ThunkAction, ThunkDispatch } from 'redux-thunk';

/* import { authReducer, authReducerActionsType } from '../Reducers/authReducer'; */
import { taskReducer } from '../Reducers/taskReducer';
import { todolistReducer } from '../Reducers/todolistReducer';
import { appSlice } from '../toolkitRedux/appSlice';
import authSlice from '../toolkitRedux/authSlice';

const rootReducer = combineReducers({
  todolists: todolistReducer,
  tasks: taskReducer,
  app: appSlice.reducer,
  // eslint-disable-next-line no-undef
  auth: authSlice.reducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type AppRootStateType = ReturnType<typeof store.getState>;

export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AppActionsType>;

export type AppActionsType = any;
/*  | appReducerActionsType
  | authReducerActionsType
  | taskReducerActionsType
  | todolistActionsType; */

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootStateType,
  unknown,
  AppActionsType
>;
