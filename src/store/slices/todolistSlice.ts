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
      const index = state.findIndex(todo => todo.id === action.payload);

      state.splice(index, 1);
    },
    createNewTodolist(state, action: PayloadAction<TodolistType>) {
      state.unshift({ ...action.payload, filter: 'all', entityStatus: 'idle' });
    },
    changeTodolistTitle(state, action: PayloadAction<{ id: string; title: string }>) {
      const index = state.findIndex(todo => todo.id === action.payload.id);

      state[index].title = action.payload.title;
    },
    changeTodolistFilter(
      state,
      action: PayloadAction<{ id: string; filter: FilterValuesType }>,
    ) {
      const index = state.findIndex(todo => todo.id === action.payload.id);

      state[index].filter = action.payload.filter;
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
