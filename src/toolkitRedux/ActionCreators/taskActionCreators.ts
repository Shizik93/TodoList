import { taskApi } from '../../API/taskApi';
import { UpdateTaskModelType } from '../../API/types';
import { handleServerAppError, handleServerNetworkError } from '../../Utils/error-utils';
import { setStatusRTK } from '../appSlice';
import { AppRootStateType, AppThunk } from '../store';
import {
  addNewTask,
  removeTask,
  setTasks,
  UpdateDomainTaskModelType,
  updateTask,
} from '../taskSlice';

export const fetchTasksTC =
  (todolistId: string): AppThunk =>
  async dispatch => {
    dispatch(setStatusRTK('loading'));
    try {
      const response = await taskApi.getTasks(todolistId);
      const tasks = response.data.items;

      dispatch(setTasks({ tasks, todolistId }));
      dispatch(setStatusRTK('succeeded'));
    } catch (err) {
      handleServerNetworkError(err as Error, dispatch);
    }
  };

export const addNewTaskTC =
  (todolistId: string, title: string): AppThunk =>
  async dispatch => {
    dispatch(setStatusRTK('loading'));
    try {
      const task = await taskApi.createTask(todolistId, title);

      if (task.data.resultCode === 0) {
        dispatch(addNewTask(task.data.data.item));
        dispatch(setStatusRTK('succeeded'));
      } else {
        handleServerAppError(task.data, dispatch);
      }
    } catch (err) {
      handleServerNetworkError(err as Error, dispatch);
    }
  };

export const removeTaskTC =
  (todolistId: string, id: string): AppThunk =>
  async dispatch => {
    dispatch(setStatusRTK('loading'));
    try {
      await taskApi.deleteTask(todolistId, id);
      dispatch(removeTask({ id, todolistId }));
      dispatch(setStatusRTK('succeeded'));
    } catch (err) {
      handleServerNetworkError(err as Error, dispatch);
    }
  };

export const updateTaskTC =
  (domainModel: UpdateDomainTaskModelType, id: string, todolistID: string): AppThunk =>
  async (dispatch, getState: () => AppRootStateType) => {
    const state = getState();
    const task = state.tasks[todolistID].find((t: { id: string }) => t.id === id); /// /???????

    if (!task) {
      // throw new Error("task not found in the state");
      console.warn('task not found in the state');

      return;
    }

    const apiModel: UpdateTaskModelType = {
      deadline: task.deadline,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
      title: task.title,
      status: task.status,
      ...domainModel,
    };

    dispatch(setStatusRTK('loading'));
    try {
      const updateTasks = await taskApi.updateTask(todolistID, id, apiModel);

      if (updateTasks.data.resultCode === 0) {
        dispatch(updateTask(updateTasks.data.data.item));
        dispatch(setStatusRTK('succeeded'));
      } else {
        handleServerAppError(updateTasks.data, dispatch);
      }
    } catch (err) {
      handleServerNetworkError(err as Error, dispatch);
    }
  };
