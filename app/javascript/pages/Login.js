import React, { useEffect, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
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
    <Container
      className="d-flex flex-column justify-content-center align-items-center gap-3 login-page"
      style={{ height: '100vh' }}
      fluid
    >
      <h2>
        {mode === 'login' ? 'Log In To Existing Account' : 'Register New User'}
      </h2>
      {userData.status === 'error' && (
        <p className="text-danger">{userData.error}</p>
      )}
      <Form
        onSubmit={handleSubmit}
        className="d-flex flex-column p-3 text-dark bg-white rounded gap-3 w-100 login-form"
      >
        <Form.Group controlId="username">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={handleUsernameChange}
          />
        </Form.Group>
        <Button variant="success" type="submit">
          {mode === 'login' ? 'Log In' : 'Register'}
        </Button>
        <Button variant="link" onClick={changeMode}>
          {mode === 'login'
            ? 'New User? Sign up here'
            : 'Already have an account? Log in here'}
        </Button>
      </Form>
    </Container>
  );
}

export default Login;
