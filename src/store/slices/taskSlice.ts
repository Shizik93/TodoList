import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { createNewTodolist, removeTodolist, setTodolists } from './todolistSlice';

const initialState: TasksStateType = {};

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setTasks(
      state,
      action: PayloadAction<{ tasks: Array<TaskType>; todolistId: string }>,
    ) {
      state[action.payload.todolistId] = action.payload.tasks;
    },
    addNewTask(state, action: PayloadAction<TaskType>) {
      state[action.payload.todoListId].unshift(action.payload);
    },
    removeTask(state, action: PayloadAction<{ id: string; todolistId: string }>) {
      const task = state[action.payload.todolistId];
      const index = task.findIndex(t => t.id === action.payload.id);

      task.splice(index, 1);
    },

    updateTask(state, action: PayloadAction<TaskType>) {
      const tasks = state[action.payload.todoListId];
      const index = tasks.findIndex(t => t.id === action.payload.id);

      tasks[index] = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(createNewTodolist, (state, action) => {
      state[action.payload.id] = [];
    });
    builder.addCase(setTodolists, (state, action) => {
      action.payload.forEach(todo => {
        state[todo.id] = [];
      });
    });
    builder.addCase(removeTodolist, (state, action) => {
      delete state[action.payload];
    });
  },
});

export const { setTasks, addNewTask, removeTask, updateTask } = taskSlice.actions;

export type UpdateDomainTaskModelType = {
  title?: string;
  description?: string;
  status?: number;
  priority?: number;
  startDate?: string;
  deadline?: string;
};

export type TaskType = {
  description: string;
  title: string;
  completed: boolean;
  status: number;
  priority: number;
  startDate: string;
  deadline: string;
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
};

export type TasksStateType = {
  [key: string]: Array<TaskType>;
};
