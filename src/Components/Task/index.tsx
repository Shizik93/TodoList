import React from "react";
import {ChangeTaskStatus, removeTask, removeTaskTC} from "../../Reducers/taskReducer";
import {useDispatch} from "react-redux";

type TaskPropsType = {
    id:string
    title:string
    status:number
    removeTask:(id:string)=>void
}

const Task = ({id, title, status,removeTask}: TaskPropsType) => {
    const dispatch = useDispatch()
    const removeTaskHandler=()=>{
        removeTask(id)
    }


    return (
        <div>
            <

                li>
                <input onClick={() => {
                    dispatch(ChangeTaskStatus(!status, id))
                }} type={"checkbox"} defaultChecked={!!status}/>
                <span>{title}</span>
                <button onClick={removeTaskHandler}>X
                </button>

            </li>
        </div>
    )
}
export default Task
