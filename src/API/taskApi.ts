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
  updateTask: (todolistId: string, taskId: string, title: string) => {
    return instance
      .put(`/todo-lists/${todolistId}/tasks/${taskId}`, { title })
      .then(res => res.data);
  },
};
