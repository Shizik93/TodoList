import React, {useEffect, useState} from "react";
import Task from "../Task";
import {useAppDispatch, useAppSelector} from "../../Hooks/hooks";
import {fetchTodolistsTC} from "../../Reducers/todolistReducer";
import Todolist from "./Todolist";


const Todolists = () => {
    const todolists = useAppSelector(state => state.todolists)
    const dispatch = useAppDispatch()


    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [])
    return (
        <div className="App">{
            todolists.map(todolist => {
                return <Todolist key={todolist.id} id={todolist.id} title={todolist.title}/>
            })
        }

        </div>)


}
export default Todolists
