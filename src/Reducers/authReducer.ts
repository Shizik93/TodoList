const initialState = {}

export type authReducerActionsType=any

export const authReducer = (state: any = initialState, actions: any) => {
    switch (actions) {
        case 'AUTH/SET-IS-LOGGED-IN':
        case 'AUTH/SET-IS-LOGGED-OUT': {
            return {...state, ...actions.payload}
        }
        default: {
            return state
        }
    }

}

export const setLogin = (payload: any) => {
    return {
        type: 'AUTH/SET-IS-LOGGED-IN',
        payload
    } as const

}

