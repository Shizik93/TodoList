import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RequestStatus } from './appSlice';

const initialState: Array<TodolistDomainType> = [];

export const todolistSlice = createSlice({
  name: 'todolist',
  initialState,
  reducers: {
    setTodolists(state, action: PayloadAction<Array<TodolistType>>) {
      return action.payload.map(tl => ({ ...tl, filter: 'all', entityStatus: 'idle' }));
    },
    removeTodolist(state, action: PayloadAction<string>) {
      state = state.filter(tl => tl.id !== action.payload);
    },
    createNewTodolist(state, action: PayloadAction<TodolistType>) {
      state.unshift({ ...action.payload, filter: 'all', entityStatus: 'idle' });
    },
    changeTodolistTitle(state, action: PayloadAction<{ id: string; title: string }>) {
      state = state.map(tl =>
        tl.id === action.payload.id ? { ...tl, title: action.payload.title } : tl,
      );
    },
    changeTodolistFilter(
      state,
      action: PayloadAction<{ id: string; filter: FilterValuesType }>,
    ) {
      state = state.map(tl =>
        tl.id === action.payload.id ? { ...tl, filter: action.payload.filter } : tl,
      );
    },
  },
});

export type TodolistType = {
  addedDate: string;
  id: string;
  order: number;
  title: string;
};
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType;
  entityStatus: RequestStatus;
};
export const {
  setTodolists,
  changeTodolistTitle,
  removeTodolist,
  createNewTodolist,
  changeTodolistFilter,
} = todolistSlice.actions;
