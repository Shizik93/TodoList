import {applyMiddleware, combineReducers} from "redux";
import {legacy_createStore as createStore} from "redux";
import {taskReducer} from "../Reducer/taskReducer";
import {appReducer} from "../Reducer/appReducer";
import {authReducer} from "../Reducer/authReducer";
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
