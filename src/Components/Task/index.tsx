import React from 'react';

import { useDispatch } from 'react-redux';

import { ChangeTaskStatus } from '../../Reducers/taskReducer';
import EditableSpan from '../EditableSpan';

type TaskPropsType = {
  id: string;
  title: string;
  status: number;
  removeTask: (id: string) => void;
  updateTask: (id: string, title: string) => void;
};

const Task = ({ id, title, status, removeTask, updateTask }: TaskPropsType) => {
  const dispatch = useDispatch();
  const removeTaskHandler = () => {
    removeTask(id);
  };
  const updateTaskHandler = (title: string) => {
    updateTask(id, title);
  };

  return (
    <div>
      <li>
        <input
          onClick={() => {
            dispatch(ChangeTaskStatus(!status, id));
          }}
          type="checkbox"
          defaultChecked={!!status}
        />
        <EditableSpan title={title} callback={updateTaskHandler} />
        <button type="button" onClick={removeTaskHandler}>
          X
        </button>
      </li>
    </div>
  );
};

export default Task;
