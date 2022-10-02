import {combineReducers, createStore} from "redux";
import {Reducer} from "../Reducer/reducer";

const rootReducer=combineReducers({
    Reducer

})
export type AppRootType=ReturnType<typeof rootReducer>
export const store=createStore(rootReducer)
//@ts-ignore
window.store=store