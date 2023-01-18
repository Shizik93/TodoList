import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { ResponseType } from '../API/types';
import { AppRootStateType } from '../Store/store';
import { setErrorRTK, setStatusRTK } from '../toolkitRedux/appSlice';

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
