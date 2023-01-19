import React, { ReactElement, useEffect } from 'react';

import './App.css';
import { CircularProgress, Container } from '@mui/material';
import { Routes, Route, Navigate } from 'react-router-dom';

import ButtonAppBar from './components/ButtonAppBar';
import { ErrorSnackbar } from './components/ErrorSnackbar';
import Login from './components/Login';
import Todolists from './components/Todolists';
import { useAppDispatch, useAppSelector } from './hooks/hooks';
import { authMeTC } from './store/actionCreators/authActionCreators';

const App = (): ReactElement => {
  const dispatch = useAppDispatch();

  const isInitialized = useAppSelector(state => state.app.isInitialized);

  useEffect(() => {
    dispatch(authMeTC());
  }, [dispatch]);
  if (!isInitialized) {
    return (
      <div style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="App">
      <ErrorSnackbar />
      <ButtonAppBar />
      <Container fixed>
        <Routes>
          <Route path="/" element={<Todolists />} />
          <Route path="/todolist" element={<Navigate to="/" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/404" element={<h1>404: PAGE NOT FOUND</h1>} />
          <Route path="*" element={<Navigate to="404" />} />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
