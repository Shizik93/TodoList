import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { ResponseType } from '../API/types';
import { setErrorRTK, setStatusRTK } from '../store/slices/appSlice';
import { AppRootStateType } from '../store/store';

export const handleServerAppError = <T>(
  data: ResponseType<T>,
  dispatch: ThunkDispatch<AppRootStateType, unknown, AnyAction>,
) => {
  if (data.messages.length) {
    dispatch(setErrorRTK(data.messages[0]));
  } else {
    dispatch(setErrorRTK('Some error occurred'));
  }
  dispatch(setStatusRTK('failed'));
};

export const handleServerNetworkError = (
  error: { message: string },
  dispatch: ThunkDispatch<AppRootStateType, unknown, AnyAction>,
) => {
  dispatch(setErrorRTK(error.message ? error.message : 'Some error occurred'));
  dispatch(setStatusRTK('failed'));
};
