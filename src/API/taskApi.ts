import { instance } from './axios/axiosInstance';

export const taskApi = {
  getTasks: (todolistId: string) => {
    return instance.get(`/todo-lists/${todolistId}/tasks`).then(res => res.data);
  },
  createTask: (todolistId: string, title: string) => {
    return instance
      .post(`/todo-lists/${todolistId}/tasks`, { title })
      .then(res => res.data);
  },
  deleteTask: (todolistId: string, taskId: string) => {
    return instance.delete(`/todo-lists/${todolistId}/tasks/${taskId}`);
  },
  updateTask: (todolistId: string, taskId: string, model: UpdateTaskModelType) => {
    return instance
      .put(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
      .then(res => res.data);
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
