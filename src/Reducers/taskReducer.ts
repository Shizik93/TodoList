export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
const initialState: Array<TaskType> = []

type taskReducerActionsType =
    ReturnType<typeof ChangeTaskStatus>
    | ReturnType<typeof AddNewTask>
    | ReturnType<typeof RemoveTask>
    | ReturnType<typeof UpdateTask>

export const taskReducer = (state: Array<TaskType> = initialState, action: taskReducerActionsType): Array<TaskType> => {
    switch (action.type) {
        case 'CHANGE-TASK-STATUS': {
            return state.map(f => f.id === action.id ? {...f, isDone: action.status} : f)
        }
        case 'ADD-NEW-TASK': {
            return [...state, {id: action.id, title: action.title, isDone: false}]
        }
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
