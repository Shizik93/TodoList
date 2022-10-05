import React from 'react';

import { Delete } from '@mui/icons-material';
import { Checkbox, IconButton } from '@mui/material';
import { useDispatch } from 'react-redux';

import { RequestStatusType } from '../../Reducers/appReducer';
import { ChangeTaskStatus } from '../../Reducers/taskReducer';
import EditableSpan from '../EditableSpan';
import { TaskStatuses } from '../Todolists/Todolist';

type TaskPropsType = {
  id: string;
  title: string;
  status: number;
  removeTask: (id: string) => void;
  updateTask: (id: string, title: string) => void;
  entityStatus: RequestStatusType;
};

const Task = ({
  id,
  title,
  status,
  removeTask,
  updateTask,
  entityStatus,
}: TaskPropsType) => {
  const dispatch = useDispatch();
  const removeTaskHandler = () => {
    removeTask(id);
  };
  const updateTaskHandler = (title: string) => {
    updateTask(id, title);
  };
  const isDisabledChangeTask = entityStatus === 'loading';

  return (
    <div style={{ minWidth: '200px', display: 'flex', justifyContent: 'space-Between' }}>
      <Checkbox
        style={{ color: '#7F77E0' }}
        checked={status === TaskStatuses.Completed}
        disabled={isDisabledChangeTask}
      />
      <EditableSpan
        title={title}
        callback={updateTaskHandler}
        disabled={isDisabledChangeTask}
      />
      <IconButton
        aria-label="delete"
        style={{ color: '#3A354D' }}
        disabled={isDisabledChangeTask}
      >
        <Delete onClick={removeTaskHandler} />
      </IconButton>
    </div>
  );
};

export default Task;
