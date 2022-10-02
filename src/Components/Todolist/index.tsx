import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootType} from "../../Store/store";
import {AddNewTask, TaskType} from "../../Reducer/taskReducer";
import Task from "../Task";


const Todolist = () => {
    const task = useSelector<AppRootType, Array<TaskType>>(state => state.Reducer)
    const dispatch = useDispatch()
    const [value, setValue] = useState('')

/*    const updateTask = (title: string, id: string) => {
        dispatch(UpdateTask(title, id))
    }*/
    return (
        <div className="App">x
            <div>
                <h3>What to learn</h3>
                <div>
                    <input value={value} onChange={(e) => {
                        setValue(e.currentTarget.value);
                    }}/>
                    <button onClick={() => {
                        dispatch(AddNewTask(value));
                        setValue('')
                    }}>
                        +
                    </button>
                </div>
                <ul>
                    {task.map(f =>
                        <Task key={f.id} id={f.id} title={f.title} isDone={f.isDone}/>)}
                </ul>

                <div>
                    <button>All</button>
                    <button>Active</button>
                    <button>Completed</button>
                </div>
            </div>
        </div>)


}
export default Todolist
