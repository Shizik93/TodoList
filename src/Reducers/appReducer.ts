export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';
type initialStateType = {
  status: RequestStatusType;
  error: string | null;
  isInitialized: boolean;
};

const initialState: initialStateType = {
  status: 'idle',
  error: null,
  isInitialized: false,
};

export type appReducerActionsType =
  | ReturnType<typeof setStatus>
  | ReturnType<typeof setError>
  | ReturnType<typeof setAuthorized>;
export const appReducer = (
  // eslint-disable-next-line default-param-last
  state: initialStateType = initialState,
  actions: appReducerActionsType,
): initialStateType => {
  switch (actions.type) {
    case 'APP/SET-STATUS': {
      return { ...state, status: actions.status };
    }
    case 'APP/SET-ERROR': {
      return { ...state, error: actions.error };
    }
    case 'APP/SET-AUTHORIZED': {
      return { ...state, isInitialized: actions.isInitialized };
    }
    default: {
      return state;
    }
  }
};
export const setStatus = (status: RequestStatusType) => {
  return {
    type: 'APP/SET-STATUS',
    status,
  } as const;
};
export const setError = (error: string | null) => {
  return {
    type: 'APP/SET-ERROR',
    error,
  } as const;
};
export const setAuthorized = (isInitialized: boolean) => {
  return {
    type: 'APP/SET-AUTHORIZED',
    isInitialized,
  } as const;
};
