import {applyMiddleware, combineReducers} from "redux";
import {legacy_createStore as createStore} from "redux";
import {taskReducer} from "../Reducers/taskReducer";
import {appReducer} from "../Reducers/appReducer";
import {authReducer} from "../Reducers/authReducer";
import thunkMiddleware from 'redux-thunk'

const rootReducer = combineReducers({
    tasks: taskReducer,
    app: appReducer,
    auth: authReducer

})
export type AppRootType = ReturnType<typeof rootReducer>
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))
//@ts-ignore
window.store = store
