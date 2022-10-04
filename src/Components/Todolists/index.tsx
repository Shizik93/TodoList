import React, { useEffect, useState } from 'react';

import { Grid, Paper } from '@mui/material';
import { Navigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../Hooks/hooks';
import { createNewTodolistTC, fetchTodolistsTC } from '../../Reducers/todolistReducer';
import FullInput from '../FullInput';

import Todolist from './Todolist';

const Todolists = ({ demo }: TodoListsPropsType) => {
  const isAuthorized = useAppSelector(state => state.app.isAuthorized);
  const todolists = useAppSelector(state => state.todolists);
  const dispatch = useAppDispatch();
  const [value, setValue] = useState('');
  const createNewTodolistHandler = () => {
    dispatch(createNewTodolistTC(value));
    setValue('');
  };

  useEffect(() => {
    if (demo) {
      return;
    }
    if (isAuthorized) {
      dispatch(fetchTodolistsTC());
    }
  }, [dispatch, demo, isAuthorized]);

  if (!isAuthorized) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Grid container style={{ padding: '20px' }}>
        <FullInput callback={createNewTodolistHandler} />
      </Grid>
      <Grid container spacing={3}>
        {todolists.map(el => {
          return (
            <Grid item key={el.id}>
              <Paper style={{ padding: '10px' }}>
                <Todolist
                  key={el.id}
                  todolistId={el.id}
                  title={el.title}
                  demo={demo}
                  filter={el.filter}
                  entityStatus={el.entityStatus}
                />
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default Todolists;

type TodoListsPropsType = {
  demo?: boolean;
};
