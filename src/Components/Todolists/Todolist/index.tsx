import React, { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../../Hooks/hooks';
import {
  addNewTaskTC,
  fetchTasksTC,
  removeTaskTC,
  updateTaskTC,
} from '../../../Reducers/taskReducer';
import {
  changeTodolistTitleTC,
  removeTodolistTC,
} from '../../../Reducers/todolistReducer';
import EditableSpan from '../../EditableSpan';
import Task from '../../Task';

type TodolistPropsType = {
  todolistId: string;
  title: string;
  demo?: boolean;
};

const Todolist = ({ todolistId, title, demo }: TodolistPropsType) => {
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

  useEffect(() => {
    dispatch(fetchTasksTC(todolistId));
  }, []);

  return (
    <div>
      <div>
        <h3>
          <EditableSpan title={title} callback={changeTodolistTitle} />
        </h3>
        <button type="button" onClick={removeTodolistHandler}>
          X
        </button>
        <div>
          <input
            value={value}
            onChange={e => {
              setValue(e.currentTarget.value);
            }}
          />
          <button type="button" onClick={createNewTaskHandler}>
            +
          </button>
        </div>
        <ul>
          {tasks[todolistId] &&
            tasks[todolistId].map(task => (
              <Task
                key={task.id}
                id={task.id}
                title={task.title}
                status={task.status}
                removeTask={removeTask}
                updateTask={updateTasksTitle}
              />
            ))}
        </ul>

        <div>
          <button type="button">All</button>
          <button type="button">Active</button>
          <button type="button">Completed</button>
        </div>
      </div>
    </div>
  );
};

export default Todolist;
