import {v1} from "uuid";
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
const initialState: Array<TaskType> = [
    {id: v1(), title: 'HTML&CSS', isDone: true},
    {id: v1(), title: 'JS', isDone: true},
    {id: v1(), title: 'React', isDone: false},]

type ReducerType = ChangeTaskStatusType|AddNewTaskType|RemoveTaskType|UpdateTaskType
export const taskReducer = (state: Array<TaskType>= initialState, action: ReducerType): Array<TaskType> => {
    switch (action.type) {
        case 'CHANGE-TASK-STATUS': {
            return state.map(f => f.id === action.id ? {...f, isDone: action.status} : f)
        }
        case 'ADD-NEW-TASK':{
            return [...state,{id:v1(),title:action.title,isDone:false}]
        }
        case 'REMOVE-TASK':{
            return state.filter(f=>f.id!==action.id)
        }
        case 'UPDATE-TASK':{
            return state.map(f=>f.id===action.id?{...f,title:action.title}:f)
        }
        default:
            return state
    }

}

export type ChangeTaskStatusType = ReturnType<typeof ChangeTaskStatus>
export const ChangeTaskStatus = (status: boolean, id: string) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        id,
        status,
    } as const

}
export type AddNewTaskType = ReturnType<typeof AddNewTask>
export const AddNewTask = (title:string) => {
    return {
        type: 'ADD-NEW-TASK',
        title
    } as const

}
export type RemoveTaskType = ReturnType<typeof RemoveTask>
export const RemoveTask = (id:string) => {
    return {
        type: 'REMOVE-TASK',
        id
    } as const

}
export type UpdateTaskType = ReturnType<typeof UpdateTask>
export const UpdateTask = (title:string,id:string) => {
    return {
        type: 'UPDATE-TASK',
        title,
        id,
    } as const

}
