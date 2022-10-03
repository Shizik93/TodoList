import {todoApi} from "../API/todoApi";
import {AppThunk} from "../Store/store";
import {RequestStatusType, setError, setStatus} from "./appReducer";


const initialState: Array<TodolistDomainType> = []

export const todolistReducer = (state: Array<TodolistDomainType> = initialState, actions: todolistActionsType): Array<TodolistDomainType> => {
    switch (actions.type) {
        case 'TODO/SET-TODO-LISTS': {
            return actions.payload.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        }
        case 'TODO/CREATE-NEW-TODO-LIST': {
            return [{...actions.payload, filter: 'all', entityStatus: 'idle'}, ...state]
        }
        case 'TODO/REMOVE-TODO-LIST':{
            return state.filter(tl=>tl.id!==actions.id)
        }

        default: {
            return state
        }
    }

}

export const setTodolists = (payload: Array<todolistType>) => {
    return {
        type: 'TODO/SET-TODO-LISTS',
        payload
    } as const
}

export const fetchTodolistsTC = (): AppThunk => async (dispatch) => {
    dispatch(setStatus('loading'))
    try {
        const todolists = await todoApi.fetchTodolists()
        console.log(todolists)
        dispatch(setTodolists(todolists))
        dispatch(setStatus('succeeded'))
    } catch (err) {
        dispatch(setError(err))
        dispatch(setStatus('failed'))
    }

}
export const createNewTodolist = (payload: todolistType) => {
    return {
        type: 'TODO/CREATE-NEW-TODO-LIST',
        payload
    } as const
}

export const createNewTodolistTC = (title: string): AppThunk => async (dispatch) => {
    dispatch(setStatus('loading'))
    try {
        const todolist = await todoApi.createNewTodolist(title)
        dispatch(createNewTodolist(todolist.item))
        dispatch(setStatus('succeeded'))
    } catch (err) {
        dispatch(setError(err))
        dispatch(setStatus('failed'))
    }

}

export const removeTodolist = (id: string) => {
    return {
        type: 'TODO/REMOVE-TODO-LIST',
        id
    } as const
}

export const removeTodolistTC = (id: string): AppThunk => async (dispatch) => {
    dispatch(setStatus('loading'))
    try {
        await todoApi.deleteTodolist(id)
        dispatch(removeTodolist(id))
        dispatch(setStatus('succeeded'))
    } catch (err) {
        dispatch(setError(err))
        dispatch(setStatus('failed'))
    }
}


export type todolistType = {
    addedDate: string
    id: string
    order: number
    title: string
}
export type todolistActionsType =
    ReturnType<typeof setTodolists>
    | ReturnType<typeof createNewTodolist>
    | ReturnType<typeof removeTodolist>
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = todolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}
