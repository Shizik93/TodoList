import {AppThunk} from "../Store/store";
import {setError, setStatus} from "./appReducer";
import {taskApi} from "../API/taskApi";

export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: any
    priority: any
    startDate: any
    deadline: any
    id: string
    todoListId: string
    order: any
    addedDate: any
}
const initialState: Array<TaskType> = []

export type taskReducerActionsType =
    ReturnType<typeof ChangeTaskStatus>
    | ReturnType<typeof AddNewTask>
    | ReturnType<typeof RemoveTask>
    | ReturnType<typeof UpdateTask>
    | ReturnType<typeof setTasks>

export const taskReducer = (state: Array<TaskType> = initialState, action: taskReducerActionsType): Array<TaskType> => {
    switch (action.type) {
        case 'TASK/SET-TASKS': {
            return [...state, ...action.payload]
        }
        /*      case 'CHANGE-TASK-STATUS': {
                  return state.map(f => f.id === action.id ? {...f, isDone: action.status} : f)
              }
              case 'ADD-NEW-TASK': {
                  return [...state, {id: action.id, title: action.title, isDone: false}]
              }*/
        case 'REMOVE-TASK': {
            return state.filter(f => f.id !== action.id)
        }
        case 'UPDATE-TASK': {
            return state.map(f => f.id === action.id ? {...f, title: action.title} : f)
        }
        default:
            return state
    }

}
export const setTasks = (payload: any, todolistId: string) => {
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

export const ChangeTaskStatus = (status: boolean, id: string) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        id,
        status,
    } as const

}

export const AddNewTask = (id: string, title: string) => {
    return {
        type: 'ADD-NEW-TASK',
        title,
        id,
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
