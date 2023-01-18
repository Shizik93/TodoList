import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: InitialStateType = {
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsLogged(state, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload;
    },
  },
});

export default authSlice;
export const { setIsLogged } = authSlice.actions;

export type InitialStateType = {
  isLoggedIn: boolean;
};
