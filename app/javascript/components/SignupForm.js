import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';

const SignupForm = ({ changeMode }) => {
  const [username, setUsername] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Username:', username);
  };

  return (
    <Container className="d-flex flex-column align-items-center bg-light p-2">
      <h2>Register New User</h2>
      <Form
        onSubmit={handleSubmit}
        className="d-flex flex-column p-2 gap-2 w-100"
      >
        <Form.Group controlId="username">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={handleUsernameChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Register
        </Button>
        <Button variant="link" onClick={changeMode}>
          Already have an account? Log in here
        </Button>
      </Form>
    </Container>
  );
};

export default SignupForm;
