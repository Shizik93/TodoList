import { taskApi } from '../API/taskApi';
import { UpdateTaskModelType } from '../API/types';
import { AppRootStateType, AppThunk } from '../Store/store';
import { setStatusRTK } from '../toolkitRedux/appSlice';
import { handleServerAppError, handleServerNetworkError } from '../Utils/error-utils';

import { createNewTodolist, setTodolists } from './todolistReducer';

const initialState: TasksStateType = {};

export const taskReducer = (
  // eslint-disable-next-line default-param-last
  state: TasksStateType = initialState,
  action: taskReducerActionsType,
): TasksStateType => {
  switch (action.type) {
    case 'TASK/SET-TASKS': {
      return { ...state, [action.todolistId]: action.payload };
    }

    case 'TASK/ADD-TASK': {
      return {
        ...state,
        [action.task.todoListId]: [action.task, ...state[action.task.todoListId]],
      };
    }
    case 'TASK/REMOVE-TASK': {
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].filter(ts => ts.id !== action.id),
      };
    }
    case 'TASK/UPDATE-TASK': {
      return {
        ...state,
        [action.task.todoListId]: state[action.task.todoListId].map(ts =>
          ts.id === action.task.id ? { ...ts, ...action.task } : ts,
        ),
      };
    }
    case 'TODO/CREATE-NEW-TODO-LIST':
      return { ...state, [action.payload.id]: [] };
    case 'TODO/SET-TODO-LISTS': {
      const copyState = { ...state };

      action.payload.forEach(tl => {
        copyState[tl.id] = [];
      });

      return copyState;
    }
    default:
      return state;
  }
};

export const fetchTasksTC =
  (todolistId: string): AppThunk =>
  async dispatch => {
    dispatch(setStatusRTK('loading'));
    try {
      const tasks = await taskApi.getTasks(todolistId);

      dispatch(setTasks(tasks.data.items, todolistId));
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
      dispatch(removeTask(id, todolistId));
      dispatch(setStatusRTK('succeeded'));
    } catch (err) {
      handleServerNetworkError(err as Error, dispatch);
    }
  };

export const updateTaskTC =
  (domainModel: UpdateDomainTaskModelType, id: string, todolistID: string): AppThunk =>
  async (dispatch, getState: () => AppRootStateType) => {
    const state = getState();
    const task = state.tasks[todolistID].find(t => t.id === id);

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

export const setTasks = (payload: Array<TaskType>, todolistId: string) => {
  return {
    type: 'TASK/SET-TASKS',
    payload,
    todolistId,
  } as const;
};
export const addNewTask = (task: TaskType) => ({ type: 'TASK/ADD-TASK', task } as const);

export const removeTask = (id: string, todolistId: string) => {
  return {
    type: 'TASK/REMOVE-TASK',
    id,
    todolistId,
  } as const;
};

export const updateTask = (task: TaskType) => {
  return {
    type: 'TASK/UPDATE-TASK',
    task,
  } as const;
};

export const changeTaskStatus = (status: boolean, id: string) => {
  return {
    type: 'CHANGE-TASK-STATUS',
    id,
    status,
  } as const;
};

export type taskReducerActionsType =
  | ReturnType<typeof changeTaskStatus>
  | ReturnType<typeof addNewTask>
  | ReturnType<typeof removeTask>
  | ReturnType<typeof updateTask>
  | ReturnType<typeof setTasks>
  | ReturnType<typeof createNewTodolist>
  | ReturnType<typeof setTodolists>;

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
