import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';

function Login() {
  const [username, setUsername] = useState('');
  const [mode, setMode] = useState('login');

  const changeMode = () => {
    setMode((current) => {
      console.log(current);
      if (current === 'login') return 'signup';
      else return 'login';
    });
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Username:', username);
  };

  return (
    <Container
      className="d-flex flex-column justify-content-center align-items-center gap-3 login-page"
      style={{ height: '100vh' }}
      fluid
    >
      <h2>
        {mode === 'login' ? 'Log In To Existing Account' : 'Register New User'}
      </h2>
      <Form
        onSubmit={handleSubmit}
        className="d-flex flex-column p-3 text-dark bg-white rounded gap-2 w-75"
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
