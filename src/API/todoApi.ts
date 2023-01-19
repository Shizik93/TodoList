import { AxiosResponse } from 'axios';

import { TodolistType } from '../toolkitRedux/todolistSlice';

import { instance } from './axios/axiosInstance';
import { ResponseType } from './types';

export const todoApi = {
  fetchTodolists: () => {
    return instance.get<Array<TodolistType>>('/todo-lists');
  },
  createNewTodolist: (title: string) => {
    return instance.post<
      { title: string },
      AxiosResponse<ResponseType<{ item: TodolistType }>>
    >('/todo-lists', { title });
  },
  updateTodolist: (title: string, id: string) => {
    return instance.put<{ title: string }, AxiosResponse<ResponseType>>(
      `/todo-lists/${id}`,
      { title },
    );
  },
  deleteTodolist: (id: string) => {
    return instance.delete<{ title: string }, ResponseType>(`/todo-lists/${id}`);
  },
};
