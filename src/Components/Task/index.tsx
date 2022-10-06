import React, { ChangeEvent, ReactElement } from 'react';

import { Delete } from '@mui/icons-material';
import { Checkbox, IconButton } from '@mui/material';

import { RequestStatusType } from '../../Reducers/appReducer';
import EditableSpan from '../EditableSpan';
import { TaskStatuses } from '../Todolist';

const Task = ({
  id,
  title,
  status,
  removeTask,
  updateTask,
  entityStatus,
  changeTaskStatus,
}: TaskPropsType): ReactElement => {
  const removeTaskHandler = () => {
    removeTask(id);
  };
  const updateTaskHandler = (title: string) => {
    updateTask(id, title);
  };
  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    changeTaskStatus(
      id,
      e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.Active,
    );
  };

  const isDisabledChangeTask = entityStatus === 'loading';

  return (
    <div style={{ minWidth: '200px', display: 'flex', justifyContent: 'space-Between' }}>
      <Checkbox
        style={{ color: '#7F77E0' }}
        onChange={changeTaskStatusHandler}
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

type TaskPropsType = {
  id: string;
  title: string;
  status: number;
  removeTask: (id: string) => void;
  updateTask: (id: string, title: string) => void;
  changeTaskStatus: (id: string, value: number) => void;
  entityStatus: RequestStatusType;
};
