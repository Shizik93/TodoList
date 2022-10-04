import React, { useEffect, useState } from 'react';

import { Delete } from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../../Hooks/hooks';
import { RequestStatusType } from '../../../Reducers/appReducer';
import {
  addNewTaskTC,
  fetchTasksTC,
  removeTaskTC,
  updateTaskTC,
} from '../../../Reducers/taskReducer';
import {
  changeTodolistFilterAC,
  changeTodolistTitleTC,
  FilterValuesType,
  removeTodolistTC,
} from '../../../Reducers/todolistReducer';
import EditableSpan from '../../EditableSpan';
import FullInput from '../../FullInput';
import Task from '../../Task';

type TodolistPropsType = {
  entityStatus: RequestStatusType;
  todolistId: string;
  title: string;
  filter: FilterValuesType;
  demo?: boolean;
};

const Todolist = ({
  todolistId,
  title,
  demo,
  filter,
  entityStatus,
}: TodolistPropsType) => {
  const completeStatus = 2;
  const activeStatus = 0;
  const [value, setValue] = useState('');
  const tasks = useAppSelector(state => state.tasks);
  const dispatch = useAppDispatch();
  const removeTodolistHandler = () => {
    dispatch(removeTodolistTC(todolistId));
  };
  const changeTodolistTitle = (title: string) => {
    dispatch(changeTodolistTitleTC(todolistId, title));
  };
  const createNewTaskHandler = () => {
    dispatch(addNewTaskTC(todolistId, value));
    setValue('');
  };
  const removeTask = (id: string) => {
    dispatch(removeTaskTC(todolistId, id));
  };
  const updateTasksTitle = (id: string, title: string) => {
    dispatch(updateTaskTC(title, id, todolistId));
  };

  const changeFilter = (filter: FilterValuesType) => {
    dispatch(changeTodolistFilterAC(todolistId, filter));
  };

  useEffect(() => {
    dispatch(fetchTasksTC(todolistId));
  }, []);

  let tasksForTodolist = tasks[todolistId];

  if (filter === 'active') {
    tasksForTodolist = tasks[todolistId].filter(t => t.status === activeStatus);
  }
  if (filter === 'completed') {
    tasksForTodolist = tasks[todolistId].filter(t => t.status === completeStatus);
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
