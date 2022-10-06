import React, { useEffect } from 'react';

import { Grid, Paper } from '@mui/material';
import { Navigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../Hooks/hooks';
import { createNewTodolistTC, fetchTodolistsTC } from '../../Reducers/todolistReducer';
import FullInput from '../FullInput';

import Todolist from './Todolist';

const Todolists = () => {
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
  const todolists = useAppSelector(state => state.todolists);
  const dispatch = useAppDispatch();

  const createNewTodolistHandler = (title: string) => {
    dispatch(createNewTodolistTC(title));
  };

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchTodolistsTC());
    }
  }, [dispatch, isLoggedIn]);

  if (!isLoggedIn) {
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
