import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: initialStateType = {
  status: 'idle',
  error: null,
  isInitialized: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setStatusRTK(state, action: PayloadAction<RequestStatus>) {
      state.status = action.payload;
    },
    setErrorRTK(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    setAuthorizedRTK(state, action: PayloadAction<boolean>) {
      state.isInitialized = action.payload;
    },
  },
});

export const { setStatusRTK, setErrorRTK, setAuthorizedRTK } = appSlice.actions;

export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed';
type initialStateType = {
  status: RequestStatus;
  error: string | null;
  isInitialized: boolean;
};
