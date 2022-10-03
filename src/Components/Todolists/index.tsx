import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../Hooks/hooks";
import {createNewTodolistTC, fetchTodolistsTC} from "../../Reducers/todolistReducer";
import Todolist from "./Todolist";


const Todolists = () => {
    const todolists = useAppSelector(state => state.todolists)
    const dispatch = useAppDispatch()
const [value,setValue]=useState('')

    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [])
    return (
        <div className="App">
            <div>
                <input value={value} onChange={(e) => {
                    setValue(e.currentTarget.value);
                }}/>
                <button onClick={() => {
                    dispatch(createNewTodolistTC(value))
                    setValue('')
                }}>
                    +
                </button>
            </div>
            {

            todolists.map(todolist => {
                return <Todolist key={todolist.id} id={todolist.id} title={todolist.title}/>
            })
        }

        </div>)


}
export default Todolists
