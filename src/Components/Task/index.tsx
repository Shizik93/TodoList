import React from "react";
import {ChangeTaskStatus, RemoveTask, TaskType} from "../../Reducers/taskReducer";
import {useDispatch} from "react-redux";

type TaskPropsType = TaskType

const Task = ({id, title, isDone}: TaskPropsType) => {
    const dispatch = useDispatch()
    return (
        <div>
            <

                li>
                <input onClick={() => {
                    dispatch(ChangeTaskStatus(!isDone, id))
                }} type={"checkbox"} defaultChecked={isDone}/>
                <span>{title}</span>
                <button onClick={() => {
                    dispatch(RemoveTask(id))
                }}>X
                </button>

            </li>
        </div>
    )
}
export default Task
