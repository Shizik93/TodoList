import { AxiosResponse } from 'axios';

import { TodolistType } from '../Reducers/todolistReducer';

import { instance } from './axios/axiosInstance';

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

export type ResponseType<D = {}> = {
  resultCode: number;
  messages: Array<string>;
  fieldsErrors: Array<string>;
  data: D;
};
