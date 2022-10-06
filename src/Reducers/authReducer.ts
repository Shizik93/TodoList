import { authApi } from '../API/authApi';
import { AppThunk } from '../Store/store';

import { setAuthorized, setError, setStatus } from './appReducer';

const initialState = {
  isLoggedIn: false,
};

type InitialStateType = {
  isLoggedIn: boolean;
};
export type authReducerActionsType = ReturnType<typeof setIsLoggedInAC>;

export const authReducer = (
  // eslint-disable-next-line default-param-last
  state: InitialStateType = initialState,
  action: authReducerActionsType,
): InitialStateType => {
  switch (action.type) {
    case 'login/SET-IS-LOGGED-IN':
      return { ...state, isLoggedIn: action.value };
    default:
      return state;
  }
};

export const setIsLoggedInAC = (value: boolean) =>
  ({ type: 'login/SET-IS-LOGGED-IN', value } as const);

export const authMeTC = (): AppThunk => async dispatch => {
  dispatch(setStatus('loading'));
  try {
    const response = await authApi.me();

    if (response.resultCode === 0) {
      dispatch(setAuthorized(true));
      dispatch(setIsLoggedInAC(true));
      dispatch(setStatus('succeeded'));
    } else {
      dispatch(setAuthorized(true));
      dispatch(setError(response.messages[0]));
      dispatch(setStatus('failed'));
    }
  } catch (err) {
    dispatch(setError(err));
    dispatch(setStatus('failed'));
  }
};

export const logoutTC = (): AppThunk => async dispatch => {
  dispatch(setStatus('loading'));
  try {
    await authApi.logout();
    dispatch(setIsLoggedInAC(false));
    dispatch(setStatus('succeeded'));
  } catch (err) {
    dispatch(setError(err));
    dispatch(setStatus('failed'));
  }
};
export const loginTC =
  (email: string, password: string, rememberMe: boolean): AppThunk =>
  async dispatch => {
    dispatch(setStatus('loading'));
    try {
      await authApi.login(email, password, rememberMe);
      dispatch(setIsLoggedInAC(true));
      dispatch(setStatus('succeeded'));
    } catch (err) {
      dispatch(setError(err));
      dispatch(setStatus('failed'));
    }
  };
