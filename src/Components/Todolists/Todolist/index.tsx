import Task from "../../Task";
import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../Hooks/hooks";
import {addNewTaskTC, fetchTasksTC, removeTaskTC} from "../../../Reducers/taskReducer";
import {changeTodolistTitleTC, removeTodolistTC} from "../../../Reducers/todolistReducer";
import EditableSpan from "../../EditableSpan";
import todolists from "../index";

type TodolistPropsType = {
    todolistId: string
    title: string
}

const Todolist = ({todolistId, title}: TodolistPropsType) => {
    const [value, setValue] = useState('')
    const tasks = useAppSelector(state => state.tasks)
    const dispatch = useAppDispatch()
    const removeTodolistHandler = () => {
        dispatch(removeTodolistTC(todolistId))
    }
    const changeTodolistTitle = (title: string) => {
        dispatch(changeTodolistTitleTC(todolistId, title))
    }
    const createNewTaskHandler = () => {
        dispatch(addNewTaskTC(todolistId, value))
        setValue('')
    }
    const removeTask=(id:string)=>{
        dispatch(removeTaskTC(todolistId,id))
    }
    useEffect(() => {
        dispatch(fetchTasksTC(todolistId))
    }, [])
    return (
        <div>
            <div>
                <h3><EditableSpan title={title} callback={changeTodolistTitle}/></h3>
                <button onClick={removeTodolistHandler}>X
                </button>
                <div>
                    <input value={value} onChange={(e) => {
                        setValue(e.currentTarget.value);
                    }}/>
                    <button onClick={createNewTaskHandler}>
                        +
                    </button>
                </div>
                <ul>
                    {tasks[todolistId] && tasks[todolistId].map(task =>
                        <Task key={task.id} id={task.id} title={task.title} status={task.status} removeTask={removeTask}/>)}
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
