import Task from "../../Task";
import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../Hooks/hooks";
import {fetchTasksTC} from "../../../Reducers/taskReducer";
import {removeTodolistTC} from "../../../Reducers/todolistReducer";

type TodolistPropsType = {
    id: string
    title: string
}

const Todolist = ({id, title}: TodolistPropsType) => {
    const [value, setValue] = useState('')
    const tasks = useAppSelector(state => state.tasks.filter(el => el.todoListId === id))
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchTasksTC(id))
    }, [])
    return (
        <div>
            <div>
                <h3>{title}</h3>
                <button onClick={() => {
                    dispatch(removeTodolistTC(id))
                }}>X
                </button>
                <div>
                    <input value={value} onChange={(e) => {
                        setValue(e.currentTarget.value);
                    }}/>
                    <button onClick={() => {

                        setValue('')
                    }}>
                        +
                    </button>
                </div>
                <ul>
                    {tasks.map(task =>
                        <Task key={task.id} id={task.id} title={task.title} status={task.status}/>)}
                </ul>

                <div>
                    <button>All</button>
                    <button>Active</button>
                    <button>Completed</button>
                </div>
            </div>
        </div>
    )
}
export default Todolist
