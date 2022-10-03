import {AppThunk} from "../Store/store";
import {setError, setStatus} from "./appReducer";
import {taskApi} from "../API/taskApi";

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
    | ReturnType<typeof AddNewTask>
    | ReturnType<typeof RemoveTask>
    | ReturnType<typeof UpdateTask>
    | ReturnType<typeof setTasks>

export const taskReducer = (state: TasksStateType = initialState, action: taskReducerActionsType): TasksStateType => {
    switch (action.type) {
        case 'TASK/SET-TASKS': {
            return {...state, [action.todolistId]: action.payload}
        }

        case 'TASK/ADD-TASK': {
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
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
export const AddNewTask = (task: TaskType) => ({type: 'TASK/ADD-TASK', task} as const)
export const addNewTaskTC = (todolistId: string, title: string): AppThunk => async (dispatch) => {
    dispatch(setStatus('loading'))
    try {
        const task = await taskApi.createTask(todolistId, title)
        dispatch(AddNewTask(task.data.item))
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


export const RemoveTask = (id: string) => {
    return {
        type: 'REMOVE-TASK',
        id
    } as const

}

export const UpdateTask = (title: string, id: string) => {
    return {
        type: 'UPDATE-TASK',
        title,
        id,
    } as const

}
