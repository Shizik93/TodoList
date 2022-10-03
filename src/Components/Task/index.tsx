import React from "react";
import {ChangeTaskStatus, RemoveTask} from "../../Reducers/taskReducer";
import {useDispatch} from "react-redux";

type TaskPropsType = {
    id:string
    title:string
    status:number
}

const Task = ({id, title, status}: TaskPropsType) => {
    const dispatch = useDispatch()

    return (
        <div>
            <

                li>
                <input onClick={() => {
                    dispatch(ChangeTaskStatus(!status, id))
                }} type={"checkbox"} defaultChecked={!!status}/>
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
