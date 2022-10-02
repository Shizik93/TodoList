import {combineReducers, createStore} from "redux";
import {TaskReducer} from "../Reducer/taskReducer";

const rootReducer=combineReducers({
    Reducer: TaskReducer

})
export type AppRootType=ReturnType<typeof rootReducer>
export const store=createStore(rootReducer)
//@ts-ignore
window.store=store
