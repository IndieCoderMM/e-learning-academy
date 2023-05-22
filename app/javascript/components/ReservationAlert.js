import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { getUserReservations } from '../store/reservation';

const ReservationAlert = () => {
  const currentUser = useSelector((state) => state.user);
  const reservationData = useSelector((state) => state.reservations);
  const dispatch = useDispatch();

  const [state, setState] = useState({
    show: false,
    variant: '',
    title: '',
    p: '',
  });
  useEffect(() => {
    if (currentUser.id == null) {
      setState({
        show: true,
        variant: 'info',
        title: "Looks like you haven't logged in yet!",
        p: 'Please log in with your username to view your enrolled courses.',
      });
    } else if (reservationData.status === 'error') {
      setState({
        show: true,
        variant: 'danger',
        title: 'Oops! There was an error!',
        p: reservationData.error,
      });
    }
  }, [currentUser, reservationData]);

  const tryAgain = () => {
    dispatch(getUserReservations(currentUser.id));
    setState((state) => ({ ...state, show: false }));
  };

  return (
    <div className="p-2">
      <Alert variant={state.variant} show={state.show}>
        <Alert.Heading>{state.title}</Alert.Heading>
        <p>{state.p}</p>
        <hr />
        <div className="d-flex justify-content-end gap-2">
          <Button as={Link} to="/" variant="outline-dark">
            Back to Home
          </Button>
          {currentUser.id == null ? (
            <Button as={Link} to="/login" variant="outline-primary">
              Log In
            </Button>
          ) : (
            <Button onClick={tryAgain} variant="outline-primary">
              Try Again
            </Button>
          )}
        </div>
      </Alert>
    </div>
  );
};

export default ReservationAlert;
