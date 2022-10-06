import React, { ReactElement, useEffect } from 'react';

import { Delete } from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../Hooks/hooks';
import { RequestStatusType } from '../../Reducers/appReducer';
import {
  addNewTaskTC,
  fetchTasksTC,
  removeTaskTC,
  updateTaskTC,
} from '../../Reducers/taskReducer';
import {
  changeTodolistFilter,
  changeTodolistTitleTC,
  FilterValuesType,
  removeTodolistTC,
} from '../../Reducers/todolistReducer';
import EditableSpan from '../EditableSpan';
import FullInput from '../FullInput';
import Task from '../Task';

const Todolist = ({
  todolistId,
  title,
  filter,
  entityStatus,
}: TodolistPropsType): ReactElement => {
  const tasks = useAppSelector(state => state.tasks);

  const dispatch = useAppDispatch();
  const changeTaskStatus = (id: string, status: number) => {
    dispatch(updateTaskTC({ status }, id, todolistId));
  };
  const removeTodolistHandler = () => {
    dispatch(removeTodolistTC(todolistId));
  };
  const changeTodolistTitle = (title: string) => {
    dispatch(changeTodolistTitleTC(todolistId, title));
  };
  const createNewTaskHandler = (title: string) => {
    dispatch(addNewTaskTC(todolistId, title));
  };
  const removeTask = (id: string) => {
    dispatch(removeTaskTC(todolistId, id));
  };
  const updateTasksTitle = (id: string, title: string) => {
    dispatch(updateTaskTC({ title }, id, todolistId));
  };

  const changeFilter = (filter: FilterValuesType) => {
    dispatch(changeTodolistFilter(todolistId, filter));
  };

  useEffect(() => {
    dispatch(fetchTasksTC(todolistId));
  }, [dispatch]);

  let tasksForTodolist = tasks[todolistId];

  if (filter === 'active') {
    tasksForTodolist = tasks[todolistId].filter(t => t.status === TaskStatuses.Active);
  }
  if (filter === 'completed') {
    tasksForTodolist = tasks[todolistId].filter(t => t.status === TaskStatuses.Completed);
  }

  return (
    <div>
      <h3
        style={{
          minWidth: '250px',
          display: 'flex',
          justifyContent: 'space-between',
          color: '#3A354D',
        }}
      >
        <EditableSpan
          title={title}
          callback={changeTodolistTitle}
          disabled={entityStatus === 'loading'}
        />
        <IconButton
          color="inherit"
          aria-label="delete"
          onClick={removeTodolistHandler}
          disabled={entityStatus === 'loading'}
        >
          <Delete />
        </IconButton>
      </h3>
      <FullInput callback={createNewTaskHandler} disabled={entityStatus} />
      {tasksForTodolist.length ? (
        tasksForTodolist.map(task => {
          return (
            <Task
              key={task.id}
              id={task.id}
              title={task.title}
              status={task.status}
              removeTask={removeTask}
              updateTask={updateTasksTitle}
              changeTaskStatus={changeTaskStatus}
              entityStatus={entityStatus}
            />
          );
        })
      ) : (
        <div style={{ padding: '10px' }}>No tasks</div>
      )}
      <div>
        <Button
          variant={filter === 'all' ? 'outlined' : 'text'}
          color="success"
          onClick={() => changeFilter('all')}
        >
          All
        </Button>
        <Button
          variant={filter === 'active' ? 'outlined' : 'text'}
          color="error"
          onClick={() => changeFilter('active')}
        >
          Active
        </Button>
        <Button
          variant={filter === 'completed' ? 'outlined' : 'text'}
          color="secondary"
          onClick={() => changeFilter('completed')}
        >
          Completed
        </Button>
      </div>
    </div>
  );
};

export default Todolist;

type TodolistPropsType = {
  entityStatus: RequestStatusType;
  todolistId: string;
  title: string;
  filter: FilterValuesType;
};

export const TaskStatuses = { Active: 0, Completed: 2 };
