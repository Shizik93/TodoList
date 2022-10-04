import React, { ChangeEvent, useState } from 'react';

type EditableSpanType = {
  title: string;
  callback: (title: string) => void;
};
const EditableSpan = ({ title, callback }: EditableSpanType) => {
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(title);
  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {edit ? (
        <input
          type="text"
          onChange={changeTitle}
          onBlur={() => {
            callback(value);
            setEdit(false);
          }}
          defaultValue={value}
        />
      ) : (
        <span
          onDoubleClick={() => {
            setEdit(true);
          }}
        >
          {title}
        </span>
      )}
    </>
  );
};

export default EditableSpan;
