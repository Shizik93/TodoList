import { authApi } from '../../API/authApi';
import { handleServerNetworkError } from '../../utils/error-utils';
import { setAuthorizedRTK, setErrorRTK, setStatusRTK } from '../slices/appSlice';
import { setIsLogged } from '../slices/authSlice';
import { AppThunk } from '../store';

export const authMeTC = (): AppThunk => async dispatch => {
  dispatch(setStatusRTK('loading'));
  try {
    const response = await authApi.me();

    if (response.data.resultCode === 0) {
      dispatch(setAuthorizedRTK(true));
      dispatch(setIsLogged(true));
      dispatch(setStatusRTK('succeeded'));
    } else {
      dispatch(setAuthorizedRTK(true));
      dispatch(setErrorRTK(response.data.messages[0]));
      dispatch(setStatusRTK('failed'));
    }
  } catch (err) {
    handleServerNetworkError(err as Error, dispatch);
  }
};

export const logoutTC = (): AppThunk => async dispatch => {
  dispatch(setStatusRTK('loading'));
  try {
    await authApi.logout();
    dispatch(setIsLogged(false));
    dispatch(setStatusRTK('succeeded'));
  } catch (err) {
    handleServerNetworkError(err as Error, dispatch);
  }
};

export const loginTC =
  (email: string, password: string, rememberMe: boolean): AppThunk =>
  async dispatch => {
    dispatch(setStatusRTK('loading'));
    try {
      await authApi.login(email, password, rememberMe);
      dispatch(setIsLogged(true));
      dispatch(setStatusRTK('succeeded'));
    } catch (err) {
      handleServerNetworkError(err as Error, dispatch);
    }
  };
