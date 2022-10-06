import React from 'react';

import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import { Navigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../Hooks/hooks';
import { loginTC } from '../../Reducers/authReducer';

const Login = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validate: values => {
      const errors: FormikErrorType = {};
      const minLengthPassword = 4;

      if (!values.email) {
        errors.email = 'Required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }
      if (!values.password) {
        errors.email = 'Required';
      } else if (values.password.length < minLengthPassword) {
        errors.password = 'Invalid password';
      }

      return errors;
    },
    onSubmit: values => {
      dispatch(loginTC(values.email, values.password, values.rememberMe));
      formik.resetForm();
    },
  });

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <Grid
      style={{
        marginRight: '0px',
        marginTop: '25px',
        borderRadius: '3px',
        backgroundColor: 'white',
        width: '350px',
        height: '450px',
      }}
      container
      justifyContent="center"
    >
      <Grid item justifyContent="center">
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <FormLabel>
              <p>
                To log in get registered
                <a
                  href="https://social-network.samuraijs.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  {' '}
                  here
                </a>
              </p>
              <p>or use common test account credentials:</p>
              <p>Email: free@samuraijs.com</p>
              <p>Password: free</p>
            </FormLabel>
            <FormGroup>
              <TextField
                label="Email"
                margin="normal"
                {...formik.getFieldProps('email')}
              />

              {formik.touched.email && formik.errors.email && (
                <div style={{ color: 'red', marginBottom: '20px' }}>
                  {formik.errors.email}
                </div>
              )}

              <TextField
                type="password"
                label="Password"
                {...formik.getFieldProps('password')}
              />

              {formik.touched.password && formik.errors.password && (
                <div style={{ color: 'red' }}>{formik.errors.password}</div>
              )}

              <FormControlLabel
                label="Remember me"
                control={<Checkbox checked={formik.values.rememberMe} />}
                {...formik.getFieldProps('rememberMe')}
              />
              <Button type="submit" variant="contained" color="primary">
                Login
              </Button>
            </FormGroup>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  );
};

export default Login;

// =============================Types=============================

type FormikErrorType = {
  email?: string;
  password?: string;
  rememberMe?: boolean;
};
