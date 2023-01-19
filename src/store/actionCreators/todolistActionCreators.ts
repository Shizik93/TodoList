import { todoApi } from '../../API/todoApi';
import { handleServerNetworkError } from '../../utils/error-utils';
import { setStatusRTK } from '../slices/appSlice';
import {
  changeTodolistTitle,
  createNewTodolist,
  removeTodolist,
  setTodolists,
} from '../slices/todolistSlice';
import { AppThunk } from '../store';

export const fetchTodolistsTC = (): AppThunk => async dispatch => {
  dispatch(setStatusRTK('loading'));
  try {
    const todolists = await todoApi.fetchTodolists();

    dispatch(setTodolists(todolists.data));
    dispatch(setStatusRTK('succeeded'));
  } catch (err) {
    handleServerNetworkError(err as Error, dispatch);
  }
};

export const removeTodolistTC =
  (id: string): AppThunk =>
  async dispatch => {
    dispatch(setStatusRTK('loading'));
    try {
      await todoApi.deleteTodolist(id);
      dispatch(removeTodolist(id));
      dispatch(setStatusRTK('succeeded'));
    } catch (err) {
      handleServerNetworkError(err as Error, dispatch);
    }
  };

export const createNewTodolistTC =
  (title: string): AppThunk =>
  async dispatch => {
    dispatch(setStatusRTK('loading'));
    try {
      const todolist = await todoApi.createNewTodolist(title);

      dispatch(createNewTodolist(todolist.data.data.item));
      dispatch(setStatusRTK('succeeded'));
    } catch (err) {
      handleServerNetworkError(err as Error, dispatch);
    }
  };

export const changeTodolistTitleTC =
  (id: string, title: string): AppThunk =>
  async dispatch => {
    dispatch(setStatusRTK('loading'));
    try {
      await todoApi.updateTodolist(title, id);
      dispatch(changeTodolistTitle({ id, title }));
      dispatch(setStatusRTK('succeeded'));
    } catch (err) {
      handleServerNetworkError(err as Error, dispatch);
    }
  };
