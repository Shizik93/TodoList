import {AnyAction, applyMiddleware, combineReducers} from "redux";
import {legacy_createStore as createStore} from "redux";
import {taskReducer, taskReducerActionsType} from "../Reducers/taskReducer";
import {appReducer, appReducerActionsType,} from "../Reducers/appReducer";
import {authReducer, authReducerActionsType} from "../Reducers/authReducer";
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {todolistActionsType, todolistReducer} from "../Reducers/todolistReducer";

const rootReducer = combineReducers({
    todolists:todolistReducer,
    tasks: taskReducer,
    app: appReducer,
    auth: authReducer

})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))


export type AppRootReducerType = ReturnType<typeof rootReducer>
export type AppRootStateType = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AppActionsType>
export type AppActionsType =
    appReducerActionsType
    | authReducerActionsType
    | taskReducerActionsType
    | todolistActionsType

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>
