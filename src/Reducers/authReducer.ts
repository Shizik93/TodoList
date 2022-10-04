import { authApi } from '../API/authApi';
import { AppThunk } from '../Store/store';

import { setAuthorized, setError, setStatus } from './appReducer';

const initialState = {};

export type authReducerActionsType = any;

// eslint-disable-next-line default-param-last
export const authReducer = (state: any = initialState, actions: any) => {
  switch (actions) {
    case 'AUTH/SET-IS-LOGGED-IN':
    case 'AUTH/SET-IS-LOGGED-OUT': {
      return { ...state, ...actions.payload };
    }
    default: {
      return state;
    }
  }
};

export const setLogin = (payload: any) => {
  return {
    type: 'AUTH/SET-IS-LOGGED-IN',
    payload,
  } as const;
};
export const authMeTC = (): AppThunk => async dispatch => {
  dispatch(setStatus('loading'));
  try {
    await authApi.me();
    dispatch(setAuthorized(true));
    dispatch(setStatus('succeeded'));
  } catch (err) {
    dispatch(setError(err));
    dispatch(setStatus('failed'));
  }
};

export const logoutTC = (): AppThunk => async dispatch => {
  dispatch(setStatus('loading'));
  try {
    await authApi.logout();
    dispatch(setAuthorized(false));
    dispatch(setStatus('succeeded'));
  } catch (err) {
    dispatch(setError(err));
    dispatch(setStatus('failed'));
  }
};
