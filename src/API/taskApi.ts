import { AxiosResponse } from 'axios';

import { TaskType } from '../Reducers/taskReducer';

import { instance } from './axios/axiosInstance';
import { ResponseType } from './todoApi';

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

export type UpdateTaskModelType = {
  title: string;
  description: string;
  status: number;
  priority: number;
  startDate: string;
  deadline: string;
};

type GetTasksResponse = {
  error: string | null;
  totalCount: number;
  items: Array<TaskType>;
};
