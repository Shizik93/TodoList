import { ReactElement } from 'react';

import MenuIcon from '@mui/icons-material/Menu';
import { LinearProgress } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { useAppDispatch, useAppSelector } from '../../Hooks/hooks';
import { logoutTC } from '../../Reducers/authReducer';

const ButtonAppBar = (): ReactElement => {
  const status = useAppSelector(state => state.app.status);
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);

  const dispatch = useAppDispatch();

  const onClickButtonHandler = () => {
    dispatch(logoutTC());
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar style={{ backgroundColor: '#3A354D' }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Todolist
          </Typography>
          {isLoggedIn && (
            <Button color="inherit" onClick={onClickButtonHandler}>
              Logout
            </Button>
          )}
        </Toolbar>
        {status === 'loading' && <LinearProgress color="inherit" />}
      </AppBar>
    </Box>
  );
};

export default ButtonAppBar;
