import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getUserReservations } from '../store/reservation';

function Reservation() {
  const reservationStatus = useSelector((state) => state.reservations.status);
  const reservationData = useSelector((state) => state.reservations.data);
  const currentUser = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (reservationStatus === 'idle') {
      dispatch(getUserReservations(currentUser.id));
    }
  }, [reservationStatus, dispatch]);

  console.log(reservationData);
  return (
    <Container>
      <h2>Enrolled Courses</h2>
    </Container>
  );
}

export default Reservation;

