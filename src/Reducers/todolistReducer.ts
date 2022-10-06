import { todoApi } from '../API/todoApi';
import { AppThunk } from '../Store/store';
import { handleServerNetworkError } from '../Utils/error-utils';

import { RequestStatusType, setStatus } from './appReducer';

const initialState: Array<TodolistDomainType> = [];

export const todolistReducer = (
  // eslint-disable-next-line default-param-last
  state: Array<TodolistDomainType> = initialState,
  action: todolistActionsType,
): Array<TodolistDomainType> => {
  switch (action.type) {
    case 'TODO/SET-TODO-LISTS': {
      return action.payload.map(tl => ({ ...tl, filter: 'all', entityStatus: 'idle' }));
    }
    case 'TODO/CREATE-NEW-TODO-LIST': {
      return [{ ...action.payload, filter: 'all', entityStatus: 'idle' }, ...state];
    }
    case 'TODO/REMOVE-TODO-LIST': {
      return state.filter(tl => tl.id !== action.id);
    }
    case 'TODO/CHANGE-TODO-LIST-TITLE': {
      return state.map(tl => (tl.id === action.id ? { ...tl, title: action.title } : tl));
    }
    case 'TODO/CHANGE-TODOLIST-FILTER':
      return state.map(tl =>
        tl.id === action.id ? { ...tl, filter: action.filter } : tl,
      );

    default: {
      return state;
    }
  }
};

export const fetchTodolistsTC = (): AppThunk => async dispatch => {
  dispatch(setStatus('loading'));
  try {
    const todolists = await todoApi.fetchTodolists();

    dispatch(setTodolists(todolists.data));
    dispatch(setStatus('succeeded'));
  } catch (err) {
    handleServerNetworkError(err as Error, dispatch);
  }
};

export const removeTodolistTC =
  (id: string): AppThunk =>
  async dispatch => {
    dispatch(setStatus('loading'));
    try {
      await todoApi.deleteTodolist(id);
      dispatch(removeTodolist(id));
      dispatch(setStatus('succeeded'));
    } catch (err) {
      handleServerNetworkError(err as Error, dispatch);
    }
  };

export const createNewTodolistTC =
  (title: string): AppThunk =>
  async dispatch => {
    dispatch(setStatus('loading'));
    try {
      const todolist = await todoApi.createNewTodolist(title);

      dispatch(createNewTodolist(todolist.data.data.item));
      dispatch(setStatus('succeeded'));
    } catch (err) {
      handleServerNetworkError(err as Error, dispatch);
    }
  };

export const changeTodolistTitleTC =
  (id: string, title: string): AppThunk =>
  async dispatch => {
    dispatch(setStatus('loading'));
    try {
      await todoApi.updateTodolist(title, id);
      dispatch(chaneTodolistTitle(id, title));
      dispatch(setStatus('succeeded'));
    } catch (err) {
      handleServerNetworkError(err as Error, dispatch);
    }
  };

export const setTodolists = (payload: Array<TodolistType>) => {
  return {
    type: 'TODO/SET-TODO-LISTS',
    payload,
  } as const;
};

export const removeTodolist = (id: string) => {
  return {
    type: 'TODO/REMOVE-TODO-LIST',
    id,
  } as const;
};

export const createNewTodolist = (payload: TodolistType) => {
  return {
    type: 'TODO/CREATE-NEW-TODO-LIST',
    payload,
  } as const;
};

export const chaneTodolistTitle = (id: string, title: string) => {
  return {
    type: 'TODO/CHANGE-TODO-LIST-TITLE',
    id,
    title,
  } as const;
};

export const changeTodolistFilter = (id: string, filter: FilterValuesType) =>
  ({
    type: 'TODO/CHANGE-TODOLIST-FILTER',
    id,
    filter,
  } as const);

export type TodolistType = {
  addedDate: string;
  id: string;
  order: number;
  title: string;
};
export type todolistActionsType =
  | ReturnType<typeof setTodolists>
  | ReturnType<typeof createNewTodolist>
  | ReturnType<typeof removeTodolist>
  | ReturnType<typeof chaneTodolistTitle>
  | ReturnType<typeof changeTodolistFilter>;
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType;
  entityStatus: RequestStatusType;
};
