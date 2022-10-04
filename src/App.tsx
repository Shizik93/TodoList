import React, { useEffect } from 'react';

import './App.css';
import Login from './Components/Login';
import Todolists from './Components/Todolists';
import { useAppDispatch, useAppSelector } from './Hooks/hooks';
import { authMeTC } from './Reducers/authReducer';

const App = () => {
  const dispatch = useAppDispatch();
  const isAuthorized = useAppSelector(state => state.app.isAuthorized);

  useEffect(() => {
    dispatch(authMeTC());
  }, []);

  return isAuthorized ? <Todolists /> : <Login />;
};

export default App;
