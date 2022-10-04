import React, { ChangeEvent, useState } from 'react';

import { Input } from '@mui/material';

type EditableSpanPropsType = {
  title: string;
  callback: (title: string) => void;
  disabled?: boolean;
};

const EditableSpan = React.memo(
  ({ title, callback, disabled }: EditableSpanPropsType) => {
    const [edit, setEdit] = useState(false);
    const [newTitle, setNewTitle] = useState<string>(title);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setNewTitle(e.currentTarget.value);
    };

    const onBlurHandler = () => {
      setEdit(!edit);
      callback(newTitle);
    };

    const onDoubleClickHandler = () => {
      if (!disabled) {
        setEdit(true);
      }
    };

    return edit ? (
      <Input
        style={{ fontWeight: '500', color: '#3A354D', maxWidth: '150px' }}
        value={newTitle}
        autoFocus
        onChange={onChangeHandler}
        onBlur={onBlurHandler}
      />
    ) : (
      <span
        style={{ fontWeight: '500', color: '#3A354D', padding: '10px 0' }}
        onDoubleClick={onDoubleClickHandler}
      >
        {title}
      </span>
    );
  },
);

export default EditableSpan;
