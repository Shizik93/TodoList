const initialState = {}

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

