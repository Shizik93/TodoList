import {todoApi} from "../API/todoApi";
import {AppThunk} from "../Store/store";
import {setError, setStatus} from "./appReducer";

export type todolistType = {
    addedDate: string
    id: string
    order: number
    title: string
}
export type todolistActionsType = ReturnType<typeof setTodolists>
const initialState: Array<todolistType> = []

export const todolistReducer = (state: Array<todolistType> = initialState, actions: todolistActionsType) => {
    switch (actions.type) {
        case 'TODO/SET-TODO-LISTS': {
            return [...state, ...actions.payload]
        }
        default: {
            return state
        }
    }

}

export const setTodolists = (payload: any) => {
    return {
        type: 'TODO/SET-TODO-LISTS',
        payload
    } as const
}
export const fetchTodolistsTC = (): AppThunk => async (dispatch) => {
    dispatch(setStatus('loading'))
    try {
        const todolists = await todoApi.fetchTodolists()
        dispatch(setTodolists(todolists))
        dispatch(setStatus('succeeded'))
    } catch (err) {
        dispatch(setError(err))
        dispatch(setStatus('failed'))
    }

}
