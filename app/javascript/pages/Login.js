import React, { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../store/user';

function Login() {
  const [username, setUsername] = useState('');
  const [mode, setMode] = useState('login');
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeMode = () => {
    setMode((current) => {
      if (current === 'login') return 'signup';
      return 'login';
    });
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (mode === 'login') {
      dispatch(loginUser({ username }));
    } else {
      dispatch(registerUser({ username }));
    }
  };

  useEffect(() => {
    if (userData.status === 'success') {
      navigate('/');
    }
  }, [userData, navigate]);

  return (
    <section className="page form-page">
      <div className="styled-form-container">
        <h2 className="page__title">
          {mode === 'login'
            ? 'Log In To Existing Account'
            : 'Register New User'}
        </h2>
        {userData.status === 'error' && (
          <Alert variant="danger">{userData.error}</Alert>
        )}
        <form onSubmit={handleSubmit} className="styled-form">
          <div className="styled-form__field">
            <label>Username:</label>
            <input
              type="text"
              value={username}
              autoFocus
              onChange={handleUsernameChange}
              className="styled-form__input"
            />
          </div>
          <button className="styled-form__action w-50" type="submit">
            {mode === 'login' ? 'Log In' : 'Register'}
          </button>
          <hr />
          <div className="w-100">
            <p className="fs-4 fw-bold">
              {mode === 'login' ? 'New User?' : 'Already have an account?'}
            </p>
            <button
              type="button"
              className="styled-form__action w-50"
              onClick={changeMode}
            >
              {mode === 'login' ? 'Sign up here' : 'Log in here'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Login;

