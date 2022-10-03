import Task from "../../Task";
import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../Hooks/hooks";
import {fetchTasksTC} from "../../../Reducers/taskReducer";
import {changeTodolistTitleTC, removeTodolistTC} from "../../../Reducers/todolistReducer";
import EditableSpan from "../../EditableSpan";

type TodolistPropsType = {
    id: string
    title: string
}

const Todolist = ({id, title}: TodolistPropsType) => {
    const [value, setValue] = useState('')
    const tasks = useAppSelector(state => state.tasks.filter(el => el.todoListId === id))
    const dispatch = useAppDispatch()
    const removeTodolistHandler = () => {
        dispatch(removeTodolistTC(id))
    }
    const changeTodolistTitle = (title:string) => {
        dispatch(changeTodolistTitleTC(id,title))
    }
    useEffect(() => {
        dispatch(fetchTasksTC(id))
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
