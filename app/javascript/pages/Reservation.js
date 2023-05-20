import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getUserReservations } from '../store/reservation';
import ReservedCourse from '../components/ReservedCourse';

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
      <Row>
        {reservationData.map((reservation) => (
          <Col key={reservation.id}>
            <ReservedCourse
              course={reservation.course}
              date={reservation.date}
              city={reservation.city}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Reservation;

