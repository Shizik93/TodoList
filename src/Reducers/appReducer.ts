export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';
type initialStateType = {
  status: RequestStatusType;
  error: string;
  isInitialized: boolean;
};

const initialState: initialStateType = {
  status: 'idle',
  error: '',
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
      return { ...state, error: actions.errorMessage };
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
export const setError = (error: any) => {
  const errorMessage = error.message;

  return {
    type: 'APP/SET-ERROR',
    errorMessage,
  } as const;
};
export const setAuthorized = (isInitialized: boolean) => {
  return {
    type: 'APP/SET-AUTHORIZED',
    isInitialized,
  } as const;
};
