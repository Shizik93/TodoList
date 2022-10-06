import { AxiosResponse } from 'axios';

import { TaskType } from '../Reducers/taskReducer';

import { instance } from './axios/axiosInstance';
import { GetTasksResponse, ResponseType, UpdateTaskModelType } from './types';

export const taskApi = {
  getTasks: (todolistId: string) => {
    return instance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`);
  },
  createTask: (todolistId: string, title: string) => {
    return instance.post<
      { title: string },
      AxiosResponse<ResponseType<{ item: TaskType }>>
    >(`/todo-lists/${todolistId}/tasks`, { title });
  },
  deleteTask: (todolistId: string, taskId: string) => {
    return instance.delete<{ title: string }, ResponseType>(
      `/todo-lists/${todolistId}/tasks/${taskId}`,
    );
  },
  updateTask: (todolistId: string, taskId: string, model: UpdateTaskModelType) => {
    return instance.put<
      UpdateTaskModelType,
      AxiosResponse<ResponseType<{ item: TaskType }>>
    >(`/todo-lists/${todolistId}/tasks/${taskId}`, model);
  },
};
