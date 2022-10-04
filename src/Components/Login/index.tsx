import { useState } from 'react';

import { useDispatch } from 'react-redux';

import { authApi } from '../../API/authApi';
import { setAuthorized } from '../../Reducers/appReducer';

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <div>
      <input
        onChange={e => {
          setEmail(e.currentTarget.value);
        }}
        defaultValue={email}
        type="email"
      />
      <input
        onChange={e => {
          setPassword(e.currentTarget.value);
        }}
        defaultValue={password}
        type="password"
      />
      <input
        onChange={e => {
          setRememberMe(e.currentTarget.checked);
        }}
        defaultChecked={rememberMe}
        type="checkbox"
      />
      <button
        type="button"
        onClick={() => {
          authApi.login(email, password, rememberMe).then(() => {
            dispatch(setAuthorized(true));
          });
        }}
      >
        Login
      </button>
    </div>
  );
};

export default Login;
