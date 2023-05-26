import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { coursesActions } from '../store/coursesSlice';

const DeleteCourseAlert = () => {
  const currentUserId = useSelector((state) => state.user.id);
  const courses = useSelector((state) => state.courses.courses);
  const dispatch = useDispatch();

  const [state, setState] = useState({
    show: false,
    variant: '',
    title: '',
    p: '',
  });
  useEffect(() => {
    if (currentUserId == null) {
      setState({
        show: true,
        status: 'unauthenticated',
        variant: 'info',
        title: "Looks like you haven't logged in yet!",
        p: 'Please log in with your username to be able to delete a course.',
      });
    } else if (courses.status === 'error') {
      setState({
        show: true,
        status: 'error',
        variant: 'danger',
        title: 'Oops! There was an error!',
        p: courses.error,
      });
    } else {
      setState((state) => ({ ...state, show: false }));
    }
  }, [currentUserId, courses]);

  const tryAgain = () => {
    dispatch(coursesActions.fetchCourses(currentUserId));
    setState((state) => ({ ...state, show: false }));
  };

  const buttonToDisplay = {
    unauthenticated: (
      <Button as={Link} to="/login" variant="outline-primary">
        Log In
      </Button>
    ),
    error: (
      <Button onClick={tryAgain} variant="outline-primary">
        Try Again
      </Button>
    ),
    empty: (
      <Button onClick={tryAgain} variant="outline-primary">
        Enroll Now
      </Button>
    ),
  };

  return (
    <div>
      <Alert variant={state.variant} show={state.show} className="w-75 mx-auto">
        <Alert.Heading>{state.title}</Alert.Heading>
        <p>{state.p}</p>
        <hr />
        <div className="d-flex justify-content-end gap-2">
          <Button as={Link} to="/" variant="outline-dark">
            Back to Home
          </Button>
          {buttonToDisplay[state.status]}
        </div>
      </Alert>
    </div>
  );
};

export default DeleteCourseAlert;
