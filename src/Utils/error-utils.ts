import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { ResponseType } from '../API/types';
import { setError, setStatus } from '../Reducers/appReducer';
import { AppRootStateType } from '../Store/store';

export const handleServerAppError = <T>(
  data: ResponseType<T>,
  dispatch: ThunkDispatch<AppRootStateType, unknown, AnyAction>,
) => {
  if (data.messages.length) {
    dispatch(setError(data.messages[0]));
  } else {
    dispatch(setError('Some error occurred'));
  }
  dispatch(setStatus('failed'));
};

export const handleServerNetworkError = (
  error: { message: string },
  dispatch: ThunkDispatch<AppRootStateType, unknown, AnyAction>,
) => {
  dispatch(setError(error.message ? error.message : 'Some error occurred'));
  dispatch(setStatus('failed'));
};
