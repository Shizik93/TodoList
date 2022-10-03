type statusType = 'idle' | 'loading' | 'succeeded' | 'false'
type initialStateType = {
    status: statusType,
    error: string,
    isAuthorized: boolean
}

const initialState: initialStateType = {
    status: 'idle',
    error: '',
    isAuthorized: true
}
type appActionsType = ReturnType<typeof setStatus> | ReturnType<typeof setError> | ReturnType<typeof setAuthorized>
export const appReducer = (state: initialStateType = initialState, actions: appActionsType): initialStateType => {
    switch (actions.type) {
        case 'APP/SET-STATUS': {
            return {...state, status: actions.status}

        }
        case 'APP/SET-ERROR': {
            return {...state, error: actions.error}
        }
        case 'APP/SET-AUTHORIZED': {
            return {...state, isAuthorized: actions.isAuthorized}
        }
        default: {
            return state
        }

    }
}
export const setStatus = (status: statusType) => {
    return {
        type: 'APP/SET-STATUS',
        status
    } as const

}
export const setError = (error: string) => {
    return {
        type: 'APP/SET-ERROR',
        error
    } as const

}
export const setAuthorized = (isAuthorized: boolean) => {
    return {
        type: 'APP/SET-AUTHORIZED',
        isAuthorized
    } as const

}
