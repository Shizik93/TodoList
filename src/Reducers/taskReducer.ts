import {AppThunk} from "../Store/store";
import {setError, setStatus} from "./appReducer";
import {taskApi} from "../API/taskApi";
import App from "../App";

export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}
const initialState: TasksStateType = {}

export type taskReducerActionsType =
    ReturnType<typeof ChangeTaskStatus>
    | ReturnType<typeof addNewTask>
    | ReturnType<typeof removeTask>
    | ReturnType<typeof updateTask>
    | ReturnType<typeof setTasks>

export const taskReducer = (state: TasksStateType = initialState, action: taskReducerActionsType): TasksStateType => {
    switch (action.type) {
        case 'TASK/SET-TASKS': {
            return {...state, [action.todolistId]: action.payload}
        }

        case 'TASK/ADD-TASK': {
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        }
        case "TASK/REMOVE-TASK": {
            return {...state, [action.todolistId]: state[action.todolistId].filter(ts => ts.id !== action.id)}
        }
        case 'TASK/UPDATE-TASK': {
            return {...state, [action.task.todoListId]: state[action.task.todoListId].map(ts => ts.id === action.task.id ? {...ts,...action.task} : ts)
            }
        }
        default:
            return state
    }

}
export const setTasks = (payload: Array<TaskType>, todolistId: string) => {
    return {
        type: 'TASK/SET-TASKS',
        payload,
        todolistId
    } as const
}
export const fetchTasksTC = (todolistId: string): AppThunk => async (dispatch) => {
    dispatch(setStatus('loading'))
    try {
        const tasks = await taskApi.getTasks(todolistId)
        dispatch(setTasks(tasks.items, todolistId))
        dispatch(setStatus('succeeded'))
    } catch (err) {
        dispatch(setError(err))
        dispatch(setStatus('failed'))
    }
}
export const addNewTask = (task: TaskType) => ({type: 'TASK/ADD-TASK', task} as const)
export const addNewTaskTC = (todolistId: string, title: string): AppThunk => async (dispatch) => {
    dispatch(setStatus('loading'))
    try {
        const task = await taskApi.createTask(todolistId, title)
        dispatch(addNewTask(task.data.item))
        dispatch(setStatus('succeeded'))
    } catch (err) {
        dispatch(setError(err))
        dispatch(setStatus('failed'))
    }

}

export const ChangeTaskStatus = (status: boolean, id: string) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        id,
        status,
    } as const

}


export const removeTask = (id: string, todolistId: string) => {
    return {
        type: 'TASK/REMOVE-TASK',
        id,
        todolistId
    } as const

}
export const removeTaskTC = (todolistId: string, id: string): AppThunk => async (dispatch) => {
    dispatch(setStatus('loading'))
    try {
        await taskApi.deleteTask(todolistId, id)
        dispatch(removeTask(id, todolistId))
        dispatch(setStatus('succeeded'))
    } catch (err) {
        dispatch(setError(err))
        dispatch(setStatus('failed'))
    }
}

export const updateTask = (task: TaskType) => {
    return {
        type: 'TASK/UPDATE-TASK',
        task
    } as const

}

export const updateTaskTC = (title: string, id: string, todolistID: string): AppThunk => async (dispatch) => {
    dispatch(setStatus('loading'))
    try {
        const updateTasks = await taskApi.updateTask(todolistID, id, title)
        dispatch(updateTask(updateTasks.data.item))
        dispatch(setStatus('succeeded'))
    } catch (err) {
        dispatch(setError(err))
        dispatch(setStatus('failed'))
    }
}

